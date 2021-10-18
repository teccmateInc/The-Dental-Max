import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {Patient} from '../../models/patient';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  show = false;
  searchText;
  length = 0;
  Planlength = 0;
  PatientList = [];
  planByPatientID = [];
  alertCopyData:any;
  alertDeletePlanID:any;
  getPatientID: any;
  public id = parseInt(this.route.snapshot.paramMap.get('PatientID'), 10);

  patient: Patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};

  constructor(private adminService: AdminService ,
     private toastrService: ToastrService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
  this.patientList();

  }

  showScreen() {
    if (this.show === false) {
      this.show = true;
      this.patient.PatientID = 0;
      this.patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};
    } else {
      this.show = false;
      this.patient.PatientID = 0;
      this.patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};

    }

  }

  savePatient() {
    this.adminService.savePatient(this.patient).subscribe(data => {
      console.log(data , 'data');
      this.show = false;
      // this.patientList();
      this.showSuccess('Patient Add Successfully', 'Patient Added');
    });
  }

  patientList () {
    this.adminService.getList('getPatientList').subscribe(data => {
      this.length = data.length;
      this.PatientList = data;
    }, (err) => { console.log(err);
      // this.showFailure(err, 'Data not Saved');
    });
  }

  editPatient(patientdata) {
    this.show = true;
    this.patient = patientdata;
    this.getPlanByPatientID(patientdata.PatientID);
    this.router.navigate(['pages/patient' + '/' +  patientdata.PatientID]);
  }

  deletePatient() {
    this.adminService.deletePatient('deletePatient' , this.patient.PatientID).subscribe( data => {
      this.patientList();
      this.ngOnInit();
      this.showFailure('Patient Delete Successfully', 'Patient Delete');
      this.show = false;
    }, (err) => { console.log(err);
    });
  }

  createPlan() {
    this.router.navigate(['pages/plan' + '/' +  this.patient.PatientID]);
  }
  createPlanbypatientid(data) {
    this.router.navigate(['pages/plan-detail' + '/' +data.PatientID]);
  }
  getPlanByPatientID(id) {
    this.getPatientID = id;
    this.adminService.getByID('getPlanByID' , id).subscribe( data => {
      this.planByPatientID = data;
      this.Planlength = data.length;
    }, (err) => { console.log(err);
    });
  }



  // alert code 

  alertPlan(data) {
    this.alertCopyData = {PatientID: data.PatientID , PatientName: data.PatientName , PlanName: data.PlanName };

  }

  copyPlan() {
    // const planData = {PatientID: data.PatientID , PatientName: data.PatientName , PlanName: data.PlanName };
    this.adminService.savePlanCopy(this.alertCopyData).subscribe(data => {
      this.showSuccess('Plan Duplicate Successfully', 'Plan Duplicate');

      // this.adminService.getList('getPlanList').subscribe(data => {
      //   this.planList = data;
      //  }, (err) => { console.log(err);
      //  });
      this. getPlanByPatientID(this.getPatientID);
     }, (err) => { console.log(err);
     });
  }

  alertDeletePlan(id) {
    this.alertDeletePlanID = id;
  }

  deletePlan() {
    this.adminService.deletePatient( 'deletePlan' ,this.alertDeletePlanID).subscribe(data => {
      this.showFailure('Plan delete Successfully', 'Plan delete');
      // this.adminService.getList('getPlanList').subscribe(data => {
      //   this.planList = data;
      //  }, (err) => { console.log(err);
      //  });
      this. getPlanByPatientID(this.getPatientID);
     }, (err) => { console.log(err);
     });
  }





  showSuccess(display, Message) {
    this.toastrService.success(display , Message );
  }
  
  showFailure(error, Message) {
    this.toastrService.error(error, Message);
  }


}
