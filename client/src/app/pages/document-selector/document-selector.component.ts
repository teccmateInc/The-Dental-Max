import { MatDialogRef } from '@angular/material';
import { DocumentsContent } from './doumentContent';
import { PlanService } from 'src/app/services/plan.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportDocument } from 'src/app/models/report.document';
import { ToastrService } from 'ngx-toastr';
import { PdfContainerComponent } from '../pdf-container/pdf-container.component';

@Component({
  selector: 'app-document-selector',
  templateUrl: './document-selector.component.html',
  styleUrls: ['./document-selector.component.css']
})
export class DocumentSelectorComponent implements OnInit {

  documentNames: any;

  @ViewChild('documents') documents;
  pdfComp: any;

  constructor(private toastrService: ToastrService, private dialogRef: MatDialogRef<DocumentSelectorComponent>, private element: ElementRef, private _planService: PlanService,) {
    this.documentNames = [
      { name: "Consent Form for Dental Implants", content: DocumentsContent.ConsentFormForDentalImplants },
      { name: "Consent Form for Endodontic Treatments", content: DocumentsContent.CONSENTFORMFORENDODONTICTREATMENTS },
      { name: "Consent Form for Orthodontics", content: DocumentsContent.CONSENTFORORTHODONTICS },
      { name: "Payment Options", content: DocumentsContent.PAYMENTOPTIONS },
      { name: "Treatment Maintenance Program and Costs", content: DocumentsContent.TREATMENTMAINTENANCEPROGRAMANDCOSTS },
      { name: "Treatment Warranties", content: DocumentsContent.TREATMENTWARRANTIES },
    ];
  }

  ngOnInit() {
    this.pdfComp = new PdfContainerComponent(this._planService, this.element);
  }

  addDocuments() {
    this.documents.selectedOptions.selected.map(item => {
      var doc = new ReportDocument();
      doc.name = item.value.name;
      doc.content = item.value.content;

      this._planService.reportDocuments.push(doc);
    });
    this.showSuccess('The Document wass added success to the report.', 'Document added');
    this.closeDialog();
    this.pdfComp.getUpdatedDocuments();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSuccess(display, Message) {
    this.toastrService.success(display, Message);
  }
}

