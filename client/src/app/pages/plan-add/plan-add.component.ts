import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import {Patient} from '../../models/patient';
import {PlanAdd} from '../../models/plan-add';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {

  show = false;
  hide = false;
  PatientList = [];
  patient: Patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};
  public id = parseInt(this.route.snapshot.paramMap.get('PatientID'), 10);
  planadd: PlanAdd = {PlanID: 0 , PatientID: this.id , PatientName: '', PlanName: ''};


  constructor(private _formBuilder: FormBuilder,private route: ActivatedRoute, private toastrService: ToastrService,
    private router: Router, private adminService: AdminService) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() { 
    this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['']
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['']
  });
    (function ($) {
      "use strict";
  
      $('.input2').each(function(){
          $(this).on('blur', function(){
              if((<string>$(this).val()).trim() != "") {
                  $(this).addClass('has-val');
              }
              else {
                  $(this).removeClass('has-val');
              }
          })    
      })
            
  })(jQuery);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    if (this.id != 0 ) {
      this.adminService.getByID('getPatientByID' , this.id).subscribe(data => {
       if (data.length != 0 ) {
        this.hide = true;
       }
        this.firstFormGroup.patchValue({
          firstCtrl: data[0].Name
        })
      }, (err) => { console.log(err);
      });
    }

  }

  searchPatient(searchTerm) {
    if (searchTerm.length > 3 ) {
      this.adminService.searchPatient('searchPatient',searchTerm).subscribe(data => {
        this.id = data[0].PatientID;
        if (data.length != 0 ) {
          this.hide = true;
         }
        this.firstFormGroup.patchValue({
          firstCtrl: data[0].Name
        })
       }, (err) => { console.log(err);
       });
    }
  }

  createPlan() {
    const planData = {PatientID: this.id , PatientName: this.firstFormGroup.value.firstCtrl , PlanName: this.secondFormGroup.value.secondCtrl };
    this.adminService.savePlan(planData).subscribe(data => {
      const retuenID = JSON.parse(JSON.stringify(data)).insertId;
    this.router.navigate(['pages/plan-detail' + '/' +  retuenID]);
     }, (err) => { console.log(err);
     });
  }

  savePatient() {
    this.adminService.savePatient(this.patient).subscribe(data => {
      console.log(data.insertId);
      this.adminService.getByID('getPatientByID' , data.insertId).subscribe( data => {
        this.id = data[0].PatientID;
        this.hide = true;
        this.firstFormGroup.patchValue({
          firstCtrl: data[0].Name
        })
      }, (err) => { console.log(err);
      });
      this.showSuccess('Patient Add Successfully', 'Patient Added');
    }
);
  }

  showSuccess(display, Message) {
    this.toastrService.success(display , Message );
  }
  
  showFailure(error, Message) {
    this.toastrService.error(error, Message);
  }

}
