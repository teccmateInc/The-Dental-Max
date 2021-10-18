import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
planList = [];
searchText;
length = 0;
alertCopyData:any;
alertDeletePlanID: any;
  constructor(private adminService: AdminService ,
    private toastrService: ToastrService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.adminService.getList('getPlanList').subscribe(data => {
     this.length = data.length;
     this.planList = data;
    }, (err) => { console.log(err);
    });
  }

  createPlan(data) {
    this.router.navigate(['pages/plan-detail' + '/' + data.PlanID]);
  }
  
  alertPlan(data) {
    this.alertCopyData = {PatientID: data.PatientID , PatientName: data.PatientName , PlanName: data.PlanName };

  }

  copyPlan() {
    // const planData = {PatientID: data.PatientID , PatientName: data.PatientName , PlanName: data.PlanName };
    this.adminService.savePlanCopy(this.alertCopyData).subscribe(data => {
      this.showSuccess('Plan Duplicate Successfully', 'Plan Duplicate');

      this.adminService.getList('getPlanList').subscribe(data => {
        this.planList = data;
       }, (err) => { console.log(err);
       });
     }, (err) => { console.log(err);
     });
  }

  alertDeletePlan(id) {
    this.alertDeletePlanID = id;
  }

  deletePlan() {
    this.adminService.deletePatient( 'deletePlan' , this.alertDeletePlanID).subscribe(data => {
      this.showFailure('Plan delete Successfully', 'Plan delete');
      this.adminService.getList('getPlanList').subscribe(data => {
        this.planList = data;
       }, (err) => { console.log(err);
       });
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
