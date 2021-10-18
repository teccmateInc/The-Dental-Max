import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../models/user';
import { LoginService } from '../services/login.service';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 user: User = { UserID: 0, Name: '' , Email: '', Password: ''};
 loginUser = { userEmail: '' , userPassword: ''};
  constructor(private adminService: AdminService, private loginService: LoginService,
    private toastrService: ToastrService, private router: Router) { }

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
    
  }

  userRegister() {
    this.adminService.userRegister(this.user).subscribe(data => {
      this.showSuccess(data[0].Email, 'has been Registerd in successfully');
             this.loginUser.userEmail = data[0].Email;
             this.loginUser.userPassword = data[0].Password;
    if ( data[0] ) {
      this.loginService.validateUser(this.loginUser)
     .subscribe( (data1: any) => {

     if ( data1[0]) {
       localStorage.setItem('LoggedINUser', JSON.stringify(data1[0]));
       window.localStorage.setItem('isLoggedIn', 'true' );
       this.showSuccess(data1[0].Email, 'has been logged in successfully');
       this.router.navigate(['/dashboard']);
     }
     });
    }});
  }

  showSuccess(display, Message) {
    this.toastrService.success(display , Message );
  }
  
  showFailure(error, Message) {
    this.toastrService.error(error, Message);
  }

}
