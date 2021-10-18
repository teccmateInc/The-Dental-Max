import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list.component';
import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {path: 'user/:StaffID', component: UserComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'add-shop', component: ShopAddComponent},
  {path: 'shop-list', component: ShopListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
