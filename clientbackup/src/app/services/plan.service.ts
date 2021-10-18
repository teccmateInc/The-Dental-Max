import { Injectable } from '@angular/core';
import { Diagnose } from '../models/diagnose';
import { Plan, PlanStages } from '../models/plan';
import { ReportDocument } from '../models/report.document';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  public teethArray: any;
  public diagnosis: Diagnose[];
  public planStages: PlanStages[];
  public reportDocuments: ReportDocument[];
  public stages: any = [];
  constructor() {
    this.diagnosis = [];
    this.planStages = [];
    this.reportDocuments = [];
    this.stages = [
      {
        name: 'Default Stage',
        description: 'Default Stage Description'
      },
      {
        name: 'Create New Stage',
        description: 'Create New Stage Description'
      }
    ]
  }
}
