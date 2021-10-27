import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  {path: 'customer-add', component: CustomerAddComponent},
  {path: 'suppliers', component: SuppliersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
