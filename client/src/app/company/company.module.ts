import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list.component';
import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { AngularMaterialModule } from '../material-module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    OwlDateTimeModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    DataTablesModule,
    FormsModule,
    CompanyRoutingModule
  ],
  declarations: [UserComponent, UserListComponent, ShopAddComponent, ShopListComponent]
})
export class CompanyModule { }
