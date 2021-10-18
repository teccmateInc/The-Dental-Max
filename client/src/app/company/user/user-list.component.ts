import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../models/patient';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  show = false;
  PatientList = [];
  patient: Patient = {PatientID: 0 , Name: '', Email: '', Phone: '', Gender: '' , Notes: ''};
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    }

}
