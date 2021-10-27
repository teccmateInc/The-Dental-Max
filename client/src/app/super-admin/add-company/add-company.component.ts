import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router) { }

  company: any = {
    CompanyID: null,
    CompanyName: null,
    Address: null,
    Country: null,
    State: null,
    City: null,
    MobileNo: null,
    AlternateNo: null,
    Email: null,
    Website: null,
    GSTNO: null,
    CINNO: null,
    Logo: null,
    ShopTimingFrom: null,
    ShopTimingTo: null,
    ClosedOn: null,
    WelcomeNote: null,
    Status: null,
    CreatedBy: null,
    CreatedOn: null,
    UpdatedBy: null,
    UpdatedOn: null
  };
  public companyid =  parseInt(this.route.snapshot.paramMap.get('CompanyID'), 10);

  ngOnInit() {
    if (this.companyid !== 0) {
      this.adminService.getDataById(this.companyid, 'getCompanyListByID').subscribe(data => {
        this.company = data[0];
        console.log(data[0], 'id data');
      }, (err) => { console.log(err);
        // this.showFailure(err, 'Error Loading Accommodation Data.');
      });
    }
  }

  saveCompany() {
    this.adminService.saveData(this.company, 'saveCompany').subscribe(data => {
      // this.showSuccess('Accomodation Updated Successfully', 'Accomodation Added');
      // this.router.navigate(['/pages/accomodation-list']);
    }, (err) => { console.log(err);
      // this.showFailure(err, 'Data not Saved');
    });
  }

}
