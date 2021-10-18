import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-photo-templates',
  templateUrl: './photo-templates.component.html',
  styleUrls: ['./photo-templates.component.css']
})
export class PhotoTemplatesComponent {

  //_document: ReportDocument;
  _document: any;
  editMode = false;

  // @ViewChild(PhotoTemplate1Component) template1: PhotoTemplate1Component;
  // @ViewChild(PhotoTemplate2Component) template2: PhotoTemplate2Component;
  // @ViewChild(PhotoTemplate3Component) template3: PhotoTemplate3Component;
  // @ViewChild(PhotoTemplate4Component) template4: PhotoTemplate4Component;

  constructor(
    //private store: Store<fromRoot.AppState>,
    private dialogRef: MatDialogRef<PhotoTemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) data?: any
  ) {
    if (data) {
      this._document = Object.assign({}, data.document);
      this.editMode = true;
    } else {
      //this._document = new ReportDocument('photoDocument');
    }
  }

  selectTemplate(template) {
    this._document.template = template;
  }

  editTemplate() {
    this.editMode = true;
  }

  saveTemplate() {
    //this._document.templateContent = this.getCurrentTemplate().getConfiguration();

    // if (this._document.id) {
    //   this.store.dispatch(new ReportActions.UpdateDocumentAction(this._document));
    // } else {
    //   this.store.dispatch(new ReportActions.AddPhotosDocumentAction(this._document));
    // }

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getCurrentTemplate() {
    // switch (this._document.template) {
    //   case 'template1':
    //     return this.template1;
    //   case 'template2':
    //     return this.template2;
    //   case 'template3':
    //     return this.template3;
    //   case 'template4':
    //     return this.template4;
    // }
  }
}