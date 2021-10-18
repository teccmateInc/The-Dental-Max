import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {Patient} from '../../models/patient';
declare var $: any;
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    dtOptions: any = {};
    dtTrigger: Subject<CompanyListComponent> = new Subject();
 show = false;
 patient: Patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};
  constructor(private adminService: AdminService , private toastrService: ToastrService) { }

  companyList: any;

  ngOnInit() {

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      colReorder: true,
      dom: 'Bfrtip',

    buttons: [

      'colvis',
      'copy',
      'print',
      'excel',
      'csv',
      'pdf'
    ],
    select: true,
    responsive: true,
    retrieve: true,
  };
  this.patientList();
    }

    showScreen() {
      if (this.show === false) {
        this.show = true;
      } else {
        this.show = false;
      }

    }

    savePatient() {
      console.log(this.patient);
      this.adminService.savePatient(this.patient).subscribe(data => {
        console.log(data);
        this.showSuccess('User Add Successfully', 'User Added');
      }
  );
    }

    patientList () {
      this.adminService.getList('getPatientList').subscribe(data => {
        console.log(data, 'company data');
      }, (err) => { console.log(err);
        // this.showFailure(err, 'Data not Saved');
      });
    }


    showSuccess(display, Message) {
      this.toastrService.success(display , Message );
    }
    
    showFailure(error, Message) {
      this.toastrService.error(error, Message);
    }
}
