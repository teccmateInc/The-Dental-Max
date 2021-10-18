import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-stage-popup',
  templateUrl: './stage-popup.component.html',
  styleUrls: ['./stage-popup.component.css']
})
export class StagePopupComponent implements OnInit {
  @ViewChild('stageName') StageName: ElementRef;
  @ViewChild('stageDescription') StageDescription: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<StagePopupComponent>,
    private planService: PlanService, private toastrService: ToastrService) { }

  ngOnInit() {
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(stageName, stageDescription) {
    this.planService.stages.push({
      name: stageName,
      description: stageDescription
    })
    this.showSuccess('Stage Added', 'The Stage was added successfully.');
    this.StageName.nativeElement.value = "";
    this.StageDescription.nativeElement.value = "";
    this.dialogRef.close();
  }

  showSuccess(display, Message) {
    this.toastrService.success(display, Message);
  }

}
