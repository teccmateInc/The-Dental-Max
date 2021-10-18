import { Component, OnInit, Input, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Diagnose } from 'src/app/models/diagnose';
import { PlanStages } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { DiagnosisDescription } from 'src/app/shared/diagnosisDescription/diagnosis-description';
import { Tooth } from "../plan-details/plan-details.component";

interface IDiagnosisTable {
	title: string,
	teeth: number[],
	surface?: string,
	degree?: string,
	observations?: string
}

interface IPlanTable {
	title: string,
	teeth: number[],
	surface?: string,
	observations?: string,
	price?: number
}

export class DiagnosisDescs {
	Title: string;
	Description: string;
}

@Component({
	selector: 'app-pdf-container',
	templateUrl: './pdf-container.component.html',
	styleUrls: ['./pdf-container.component.css']
})
export class PdfContainerComponent implements AfterViewChecked {

	@ViewChild('pdfContainer') pdfContainer: ElementRef;
	public diagnosisTable: IDiagnosisTable[] = [];
	public planTable: IPlanTable[] = [];
	public treatmentTotal: number;
	diagnosisDescs: DiagnosisDescs[] = [];
	@Input("dentist") dentist;
	@Input("planName") planName;
	@Input("patientName") patientName;
	@Input("currentDate") currentDate;
	@Input("teethArr") teethArr: Tooth[];
	settings: any;
	diagnosis: Diagnose[];
	planStages: PlanStages[];
	isPlanExist: boolean;
	isDiagnosisUpdate: boolean;
	isPlanUpdate: boolean;
	splitDiagnosisProcess;
	splitPlanProcess;
	documentsUpdated = false;
	orthoMalocclusionsActive = false;
	orthoFacialActive = false;
	orthoTMJActive = false;
	documentsProcess;
	show360 = true;
	showDiagnosis = true;
	showPlan = true;
	showPlanPrices = true;
	showPlanDates = true;
	showPerItemPrice = true;
	showStagePrices = true;
	showTreatmentPrice = true;

	public perfectTeethArr: Tooth[] = [];

	constructor(private _planService: PlanService, private element: ElementRef) { }


	ngOnInit() {
		this.__initPerfectTeeth();
		this.element.nativeElement.style.setProperty('--main-color', '#3ea8c9');
	}

	private __initPerfectTeeth() {
		for (let i = 0; i < this.teethArr.length; i++) {
			this.perfectTeethArr[i] = new Tooth(this.teethArr[i].num, this.teethArr[i].section);
		}
	}

	getUpdatedTeethsDiagnosis() {
		this.teethArr = this._planService.teethArray;
		this.diagnosis = this._planService.diagnosis;
		if (this.diagnosis && this.diagnosis.length > 0) {
			this.isDiagnosisUpdate = true;
		}

		this.diagnosisDescs = [];

		this.diagnosis.forEach(element => {
			if (element.Tag === "caries" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Caries",
					Description: DiagnosisDescription.cariesDescription
				})
			} if (element.Tag === "Fracture" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Fracture",
					Description: DiagnosisDescription.FractureDescription
				})
			} if (element.Tag === "Severely Damaged" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Severely Damaged",
					Description: DiagnosisDescription.SeverelyDamaged
				})
			} if (element.Tag === "Wear" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Wear",
					Description: DiagnosisDescription.Wear
				})
			} if (element.Tag === "Plaque & Hygiene" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Dental Plaque and Oral Hygiene",
					Description: DiagnosisDescription.PlaqueHygiene
				})
			} if (element.Tag === "Gingivitis" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Gingivitis",
					Description: DiagnosisDescription.Gingivitis
				})
			} if (element.Tag === "Gingival Recession" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Gingival Recession",
					Description: DiagnosisDescription.GingivialRecession
				})
			} if (element.Tag === "Periodontitis" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Periodontitis",
					Description: DiagnosisDescription.Periodontitis
				})
			} if (element.Tag === "Mobility" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Mobility",
					Description: DiagnosisDescription.Mobility
				})
			} if (element.Tag === "Gummy Smile" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Gummy Smile",
					Description: DiagnosisDescription.GummySmile
				})
			} if (element.Tag === "Gingival Overgrowth" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Gingival Overgrowth",
					Description: DiagnosisDescription.GingivalOvergrowth
				})
			} if (element.Tag === "Large Maxillary Sinus" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Large Maxillary Sinus",
					Description: DiagnosisDescription.LargeMaxillarySinus
				})
			} if (element.Tag === "Necrosis" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Necrosis",
					Description: DiagnosisDescription.Necrosis
				})
			} if (element.Tag === "Root Canal Treatment" && element.DegreeStatus === "Unsatisfactory" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Root Canal Treatment",
					Description: DiagnosisDescription.RootCanalTreatmentNotOk
				})
			} if (element.Tag === "Root Canal Treatment" && element.DegreeStatus === "Satisfactory" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Root Canal Treatment",
					Description: DiagnosisDescription.RootCanalTreatmentOk
				})
			} if (element.Tag === "Apical Lesion" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Apical Lesion",
					Description: DiagnosisDescription.ApicalLesion
				})
			} if (element.Tag === "Broken Instrument in Canal" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Broken Instrument in Canal",
					Description: DiagnosisDescription.BrokenInstrument
				})
			} if (element.Tag === "Root Resorption" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Root Resorption",
					Description: DiagnosisDescription.RootResorption
				})
			} if (element.Tag === "Implant" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Implant Ok",
					Description: DiagnosisDescription.ImplantOk
				})
			} if (element.Tag === "Implant" && element.DegreeStatus.includes("Malpositioned") && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Implant Malpositioned",
					Description: DiagnosisDescription.ImplantMalpositioned
				})
			} if (element.Tag === "Implant" && element.DegreeStatus.includes("With bone loss") && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Implant with bone loss",
					Description: DiagnosisDescription.ImplantWithBoneLoss
				})
			} if (element.Tag === "Implant" && element.DegreeStatus.includes("With gingival recession") && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Implant with gum recession",
					Description: DiagnosisDescription.ImplantWithGumRecession
				})
			} if (element.Tag === "Impacted Teeth" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Impacted Teeth",
					Description: DiagnosisDescription.ImpactedTeeth
				})
			} if (element.Tag === "Large Maxillary Sinus" && this.diagnosisDescs.findIndex((item) => item.Title === element.Tag) < 0) {
				this.diagnosisDescs.push({
					Title: "Large Maxillary Sinus",
					Description: DiagnosisDescription.LargeMaxillarySinus
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Fractured",
					Description: DiagnosisDescription.RestorationFractured
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Worn",
					Description: DiagnosisDescription.RestorationWorn
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Unaesthetic",
					Description: DiagnosisDescription.RestorationUnaesthetic
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Discolored",
					Description: DiagnosisDescription.RestorationDiscolored
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Leaking",
					Description: DiagnosisDescription.RestorationLeaking
				})
			} if (element.Tag === "Restoration" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Restoration Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Restoration Ok",
					Description: DiagnosisDescription.RestorationOK
				})
			} if (element.Tag === "Post" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Post Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Post Ok",
					Description: DiagnosisDescription.PostOk
				})
			} if (element.Tag === "Post" && element.DegreeStatus.includes("Unsatisfactory") && this.diagnosisDescs.findIndex((item) => item.Title === "Post with Problem") < 0) {
				this.diagnosisDescs.push({
					Title: "Post with Problem",
					Description: DiagnosisDescription.PostProblem
				})
			} if (element.Tag === "Splint" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Splint Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Splint Ok",
					Description: DiagnosisDescription.SplintOk
				})
			} if (element.Tag === "Splint" && element.DegreeStatus.includes("Unsatisfactory") && this.diagnosisDescs.findIndex((item) => item.Title === "Splint with Problem") < 0) {
				this.diagnosisDescs.push({
					Title: "Splint with Problem",
					Description: DiagnosisDescription.SplintProblem
				})
			} if (element.Tag === "Discolored Teeth" && this.diagnosisDescs.findIndex((item) => item.Title === "Discolored Teeth") < 0) {
				this.diagnosisDescs.push({
					Title: "Discolored Teeth",
					Description: DiagnosisDescription.DiscoloredTeeth
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Ok",
					Description: DiagnosisDescription.VeneerOk
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Discolored",
					Description: DiagnosisDescription.VeneerDiscoloredTeeth
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Fractured",
					Description: DiagnosisDescription.VeneerFractured
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Leaking",
					Description: DiagnosisDescription.VeneerLeaking
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Unaesthetic",
					Description: DiagnosisDescription.VeneerUnaesthetic
				})
			} if (element.Tag === "Veneer" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Veneer Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Veneer Worn",
					Description: DiagnosisDescription.VeneerWorn
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Ok",
					Description: DiagnosisDescription.CrownOk
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Discolored",
					Description: DiagnosisDescription.CrownDiscoloredTeeth
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Fractured",
					Description: DiagnosisDescription.CrownFractured
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Leaking",
					Description: DiagnosisDescription.CrownLeaking
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Unaesthetic",
					Description: DiagnosisDescription.CrownUnaesthetic
				})
			} if (element.Tag === "Crown" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Crown Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Crown Worn",
					Description: DiagnosisDescription.CrownWorn
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Ok",
					Description: DiagnosisDescription.OnlayOk
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Discolored",
					Description: DiagnosisDescription.OnlayDiscoloredTeeth
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Fractured",
					Description: DiagnosisDescription.OnlayFractured
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Leaking",
					Description: DiagnosisDescription.OnlayLeaking
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Unaesthetic",
					Description: DiagnosisDescription.OnlayUnaesthetic
				})
			} if (element.Tag === "Onlay" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Onlay Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Onlay Worn",
					Description: DiagnosisDescription.OnlayWorn
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Ok",
					Description: DiagnosisDescription.BridgeOk
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Discolored",
					Description: DiagnosisDescription.BridgeDiscoloredTeeth
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Fractured",
					Description: DiagnosisDescription.BridgeFractured
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Leaking",
					Description: DiagnosisDescription.BridgeLeaking
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Unaesthetic",
					Description: DiagnosisDescription.BridgeUnaesthetic
				})
			} if (element.Tag === "Bridge" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Bridge Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Bridge Worn",
					Description: DiagnosisDescription.BridgeWorn
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Ok") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Ok") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Ok",
					Description: DiagnosisDescription.DentureOk
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Discolored") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Discolored") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Discolored",
					Description: DiagnosisDescription.DentureDiscoloredTeeth
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Fractured") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Fractured") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Fractured",
					Description: DiagnosisDescription.DentureFractured
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Leaking") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Leaking") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Leaking",
					Description: DiagnosisDescription.DentureLeaking
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Unaesthetic") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Unaesthetic") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Unaesthetic",
					Description: DiagnosisDescription.DentureUnaesthetic
				})
			} if (element.Tag === "Denture" && element.DegreeStatus.includes("Worn") && this.diagnosisDescs.findIndex((item) => item.Title === "Denture Worn") < 0) {
				this.diagnosisDescs.push({
					Title: "Denture Worn",
					Description: DiagnosisDescription.DentureWorn
				})
			}

		});
	}

	getUpdatedTeethsPlan() {
		this.planStages = this._planService.planStages;
		this.treatmentTotal = 0;
		if (this.planStages && this.planStages.length > 0) {
			this.isPlanExist = true;
			this.isPlanUpdate = true;
			this.planStages.forEach(element => {
				this.treatmentTotal = this.treatmentTotal + element.StageTotal;
			});
		}
	}

	getUpdatedDocuments(){
		var documents = this._planService.reportDocuments;
	}

	onConfigChange(isTrue: boolean, changedValue: string) {
		if (changedValue === 'include360') {
			this.show360 = isTrue;
		} if (changedValue === 'includeDiagnosis') {
			this.showDiagnosis = isTrue;
		} if (changedValue === 'includePlan') {
			this.showPlan = isTrue;
		} if (changedValue === 'includePlanPrices') {
			this.showPlanPrices = isTrue;
		} if (changedValue === 'includePlanDates') {
			this.showPlanDates = isTrue;
		} if (changedValue === 'includePerItem') {
			this.showPerItemPrice = isTrue;
		} if (changedValue === 'includeStagePrices') {
			this.showStagePrices = isTrue;
		} if (changedValue === 'includeTreatmentPrice') {
			this.showTreatmentPrice = isTrue;
		}
	}

	onColorChange(color: any) {
		this.element.nativeElement.style.setProperty('--main-color', color);
	}

	ngAfterViewChecked() {
		if (this.isDiagnosisUpdate) {

			if (this.splitDiagnosisProcess) {
				clearTimeout(this.splitDiagnosisProcess);
			}

			this.splitDiagnosisProcess = setTimeout(() => {
				this.splitSection('diagnosis');
			}, 100);
		}

		if (this.isPlanUpdate) {

			if (this.splitPlanProcess) {
				clearTimeout(this.splitPlanProcess);
			}

			this.splitPlanProcess = setTimeout(() => {
				this.splitSection('plan');
			}, 100);
		}

		if (this.documentsUpdated) {

			if (this.documentsProcess) {
				clearTimeout(this.documentsProcess);
			}

			this.documentsProcess = setTimeout(() => {
				this.splitDocuments();
				// this.fixPageNumbers();
			}, 100);
		}
	}

	private splitSection(sectionName) {

		// console.log('trying to split', sectionName);

		const section = this.element.nativeElement.querySelector(`#${sectionName}`);

		if (!section) {
			// console.log('  section not found');
			return false;
		}

		// set thead td width so if the table gets splitted the columns stays aligned
		const theads = section.querySelectorAll('thead');
		for (const thead of theads) {
			const ths = thead.querySelectorAll('th');
			for (const th of ths) {
				th.style.width = th.offsetWidth + 'px';
			}
		}

		// console.log('   split ' + sectionName + ' in action');

		if (sectionName === 'diagnosis') {
			this.isDiagnosisUpdate = false;
		} else if (sectionName === 'plan') {
			this.isPlanUpdate = false;
		} else {
			this.documentsUpdated = false;
		}

		const originalPage = section.querySelector('.page');

		originalPage.classList.remove('hidden');

		// remove old generated pages
		const generatedPages = section.querySelectorAll('.generated');
		for (const page of generatedPages) {
			page.parentNode.removeChild(page);
		}

		if (this.pageIsOverflowed(originalPage)) {

			const originalBody = originalPage.querySelector('.body');

			// set max height for a given page body
			// const maxHeight = originalBody.offsetHeight + 20;
			const maxHeight = 1000 + 20;

			// create a new empty page
			const currentPage = this.createPage(originalPage);
			section.append(currentPage);

			const currentBody = currentPage.querySelector('.body');

			const splitInfo = {
				'bodyContainer': currentBody,
				'container': null,
				'currentPageHeight': 0,
				'maxHeight': maxHeight,
				'section': section,
				'originalPage': originalPage
			};

			this.splitElement(originalBody, splitInfo);

			originalPage.classList.add('hidden');

			this.fixPageNumbers();
		}
	}

	private splitDocuments() {

		// document section
		const section = this.element.nativeElement.querySelector('#documents');

		if (!section) {
			return false;
		}

		this.documentsUpdated = false;

		const documents = section.querySelectorAll('.document');

		for (const document of documents) {
			this.splitSection(document.id);
			// this.splitSingleDocument(document);
		}

		this.fixPageNumbers();
	}

	private pageIsOverflowed(page) {
		const body = page.querySelector('.body');
		//var res =  body.scrollHeight > body.offsetHeight;
		var res = body.scrollHeight > 800;
		return res;
	}

	private fixPageNumbers() {
		let pageNumber = 1;
		const pages = this.element.nativeElement.querySelectorAll('.page:not(.hidden)');
		for (const page of pages) {
			const pgContainer = page.querySelector('.page-number');
			if (pgContainer) {
				pgContainer.innerHTML = pageNumber;
			}
			pageNumber++;
		}
	}

	private createPage(originalPage) {
		const newpage = document.createElement('div');
		newpage.setAttribute('class', 'page pdf-section generated');
		newpage.setAttribute('id', 'generatedPage');

		const header = originalPage.querySelector('.report-header').cloneNode(true);
		newpage.appendChild(header);

		const body = document.createElement('div');
		body.setAttribute('class', 'body ref' + Math.floor((Math.random() * 100) + 1));
		newpage.appendChild(body);

		const footer = originalPage.querySelector('.footer').cloneNode(true);
		newpage.appendChild(footer);

		return newpage;
	}

	private splitElement(_element, info, isSubElement = false) {

		// page elements to move
		const elements = _element.children;

		for (const element of <any>elements) {
			// get element height
			const elementHeight = this.getAbsoluteHeight(element); // element.scrollHeight;

			// console.log('current page height: ' + info.currentPageHeight + ' of ' + info.maxHeight);
			// console.log('element height: ', elementHeight, element);

			// console.log('calculated height: ', this.getAbsoluteHeight(element));

			// check if element fits page
			if (elementHeight + info.currentPageHeight > info.maxHeight) {
				// element will not fit
				// console.log('does not fit');

				// can we split the element ?
				if (element.classList.contains('splittable')) {
					// element can be split

					// create copy of the element and reset the items
					const newElementContainer = this.duplicateElement(element);
					info.bodyContainer.appendChild(newElementContainer);

					// console.log('duplicating element', newElementContainer, this.getAbsoluteHeight(newElementContainer));

					// adding the height of the new element container, for example, the table header
					info.currentPageHeight += this.getAbsoluteHeight(newElementContainer); // newElementContainer.scrollHeight;

					info.container = newElementContainer;

					this.splitElement(element.querySelector('.splittable-items'), info, true);
				} else {
					// element does not fit and can't be split, we need to create a new page for it
					const currentPage = this.createPage(info.originalPage);
					info.section.append(currentPage);
					info.bodyContainer = currentPage.querySelector('.body');

					// set height to 0
					info.currentPageHeight = 0;

					if (isSubElement) {
						// we need to add the element container to the new created page
						info.container = this.duplicateElement(info.container);
						info.bodyContainer.appendChild(info.container);

						info.currentPageHeight += this.getAbsoluteHeight(info.container); // info.container.scrollHeight;

						// element can't be split, add element to the new created page
						info.container.querySelector('.splittable-items').appendChild(element.cloneNode(true));
					} else {
						// element can't be split, add element to the new created page
						info.bodyContainer.appendChild(element.cloneNode(true));
					}

					// update current height
					info.currentPageHeight += elementHeight;
				}
			} else {
				// console.log('fit');
				// element fits, we can add the full element

				if (!isSubElement) {
					const el = element.cloneNode(true);
					info.bodyContainer.appendChild(el);
				} else {
					const el = element.cloneNode(true);

					if (!el.classList.contains('stage-price')) {
						info.container.querySelector('.splittable-items').appendChild(el);
					} else {
						info.container.parentElement.appendChild(el);
					}
				}

				// update current height
				info.currentPageHeight += elementHeight;
			}
		}
	}

	private getAbsoluteHeight(el) {
		// Get the DOM Node if you pass in a string
		el = (typeof el === 'string') ? document.querySelector(el) : el;

		const styles = window.getComputedStyle(el);
		const margin = parseFloat(styles['marginTop']) +
			parseFloat(styles['marginBottom']);

		return Math.ceil(el.offsetHeight + margin);
	}

	private duplicateElement(element) {
		const newElement = element.cloneNode(true);

		// remove items
		const itemsContainer = newElement.querySelector('.splittable-items');

		for (const item of itemsContainer.children) {
			itemsContainer.removeChild(item);
		}
		itemsContainer.innerHTML = '';

		newElement.classList.add('ref' + Math.floor((Math.random() * 100) + 1));

		return newElement;
	}

	getHTML() {
		return this.pdfContainer.nativeElement.innerHTML;
	}

	// getColor() {
	// 	return "#3ea8c9";
	// }

}
