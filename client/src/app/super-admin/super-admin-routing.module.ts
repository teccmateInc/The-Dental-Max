import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'company-list', pathMatch: 'full'},
  {path: 'company-list', component: CompanyListComponent},
  {path: 'add-company/:CompanyID', component: AddCompanyComponent},
  {path: 'add-providers', component: AddProvidersComponent},
  {path: 'providers-list', component: ProvidersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
