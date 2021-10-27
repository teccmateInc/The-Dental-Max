import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanAddComponent } from './plan-add/plan-add.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { PricesComponent } from './prices/prices.component';
const routes: Routes = [
  {path: 'patient/:PatientID' , component: PatientComponent},
  {path: 'plan-list' , component: PlanListComponent},
  {path: 'plan/:PatientID' , component: PlanAddComponent},
  {path: 'plan-detail/:PlanID' , component: PlanDetailsComponent},
  {path: 'documents' , component: DocumentsComponent},
  {path: 'prices' , component: PricesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
