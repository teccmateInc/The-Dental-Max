import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material-module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagesRoutingModule } from './pages-routing.module';
import { PatientComponent } from './patient/patient.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanAddComponent } from './plan-add/plan-add.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { PlanComponent } from './plan/plan.component';
import { DocumentsComponent } from './documents/documents.component';
import { PricesComponent } from './prices/prices.component';
import { ThreesixtyComponent } from './diagnose/threesixty/threesixty.component';
import { PdfContainerComponent } from './pdf-container/pdf-container.component';
import { ToothComponent } from './tooth/tooth.component';
import { StagePopupComponent } from './stage-popup/stage-popup.component';
import { OdontogramComponent } from './odontogram/odontogram.component';
import { OdontogramToothComponent } from './odontogram-tooth/odontogram-tooth.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DocumentSelectorComponent } from './document-selector/document-selector.component';
import { PhotoTemplatesComponent } from './photo-templates/photo-templates.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ColorPickerModule
  ],
  declarations: [
    PatientComponent,
    PlanListComponent,
    PlanAddComponent,
    PlanDetailsComponent,
    PlanComponent,
    DocumentsComponent,
    PricesComponent,
    ThreesixtyComponent,
    PdfContainerComponent,
    ToothComponent,
    StagePopupComponent,
    OdontogramComponent,
    OdontogramToothComponent,
    ColorSelectorComponent,
    DocumentSelectorComponent,
    PhotoTemplatesComponent
  ],
  entryComponents: [StagePopupComponent, DocumentSelectorComponent, PhotoTemplatesComponent]
})
export class PagesModule { }
