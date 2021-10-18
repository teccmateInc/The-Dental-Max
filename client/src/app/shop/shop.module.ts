import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ShopRoutingModule } from './shop-routing.module';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AngularMaterialModule } from '../material-module';
@NgModule({
  imports: [
    CommonModule, FormsModule,ReactiveFormsModule,
    DataTablesModule, OwlDateTimeModule, OwlNativeDateTimeModule,
    ShopRoutingModule,
    AngularMaterialModule
  ],
  declarations: [CustomerAddComponent, SuppliersComponent]
})
export class ShopModule { }
