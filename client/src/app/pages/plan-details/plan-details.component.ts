import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { element } from '@angular/core/src/render3/instructions';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
// PDF generator logic
import { PdfContainerComponent } from "../pdf-container/pdf-container.component";
import { PlanService } from 'src/app/services/plan.service';
import { Diagnose } from 'src/app/models/diagnose';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { MatDialog } from '@angular/material/dialog';
import { DocumentSelectorComponent } from '../document-selector/document-selector.component';
import { PhotoTemplatesComponent } from '../photo-templates/photo-templates.component';

export class Tooth {
  constructor(num: number, section: number) {
    this.num = num;
    this.section = section;
    this.row = (section === 3 || section === 4) ? 2 : 1;
  };

  num = 0;
  section = 0;
  isActive = false;
  row = 0;
  diagnosis = {
    // tab 1
    caries: {
      buccal: false,
      distal: false,
      lingual: false,
      mesial: false,
      occlusal: false,
    },
    fracture: {
      crown: false,
      root: false,
    },
    severelyDamaged: false,
    wear: {
      mild: false,
      moderate: false,
      severe: false,
    },
    // tab 2
    plaqueHygiene: {
      mild: false,
      moderate: false,
      severe: false,
    },
    gingivitis: {
      mild: false,
      moderate: false,
      severe: false,
    },
    gingivalRecession: {
      mild: false,
      moderate: false,
      severe: false,
    },
    periodontitis: {
      mild: false,
      moderate: false,
      severe: false,
    },
    mobility: {
      mild: false,
      moderate: false,
      severe: false,
    },
    gummySmile: false,
    gingivalOvergrowth: false,
    largeMaxillarySinus: false,
    // tab 3
    necrosis: false,
    rootCanalTreatment: {
      satisfactory: false,
      unsatisfactory: false,
    },
    apicalLesion: {
      mild: false,
      moderate: false,
      severe: false,
    },
    brokenInstrumentInCanal: false,
    rootResorption: {
      external: false,
      internal: false,
    },
    // tab 4
    missingTeeth: false,
    implant: {
      ok: false,
      malpositioned: false,
      withBoneLoss: false,
      withGingivalRecession: false,
    },
    impactedTeeth: false,
    impactedAndInfectedTeeth: false,
    largeMaxillarySinusMissing: false,
    // tab 5
    restoration: false,
    post: {
      ok: false,
      unsatisfactory: false,
    },
    splint: {
      ok: false,
      unsatisfactory: false,
    },
    discoloredTeeth: false,
    // tab 6
    veneer: {
      ok: false,
      leaking: false,
      worn: false,
      fractured: false,
      discolored: false,
      unaesthetic: false
    },
    crown: {
      ok: false,
      leaking: false,
      worn: false,
      fractured: false,
      discolored: false,
      unaesthetic: false
    },
    onlay: {
      ok: false,
      leaking: false,
      worn: false,
      fractured: false,
      discolored: false,
      unaesthetic: false
    },
    bridge: {
      ok: false,
      leaking: false,
      worn: false,
      fractured: false,
      discolored: false,
      unaesthetic: false
    },
    denture: {
      ok: false,
      leaking: false,
      worn: false,
      fractured: false,
      discolored: false,
      unaesthetic: false
    },
    other: null
  }
}

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {

  @ViewChild(PdfContainerComponent) pdfComp: PdfContainerComponent;

  selectedRestorationSurface: "";
  selectedRestorationDegree: "";
  selectedRestorationDegreeArray: any = [];
  selectedVeneerArray: any = [];
  selectedVeneer = "";
  selectedCrownArray: any = [];
  selectedCrown = "";
  selectedOnlay = "";
  selectedOnlayArray: any = []
  selectedBridge = "";
  selectedBridgeArray: any = []
  selectedDenture = "";
  selectedDentureArray: any = []

  postSelectedValue = "";
  splintSelectedValue = "";
  // --- DIAGNOSIS TABS

  // --- CariesFracturesWear
  observation: string;
  OtherName: string;
  SelectedCaries: any = [];
  CariesForms = { Buccal: false, Distal: false, Lingual: false, Mesial: false, Occlusal: false };
  FractureForms = { Fracturevalue: '' };
  SeverelyDamagedForms = { SeverelyDamaged: false };
  WearForms = { Wearvalue: '' };
  // --- PerioBone
  PlaqueHygieneForms = { PlaqueHygienevalue: '' };
  GingivitisForms = { Gingivitisvalue: '' };
  GingivalRecessionForms = { GingivalRecessionvalue: '' };
  PeriodontitisForms = { Periodontitisvalue: '' };
  MobilityForms = { Mobilityvalue: '' };
  GummySmileForms = { GummySmile: false };
  GingivalOvergrowthForms = { GingivalOvergrowth: false };
  LargeMaxillarySinusForms = { LargeMaxillarySinus: false };
  // --- Endodontics
  NecrosisForms = { Necrosis: false };
  RootCanalTreatmentForms = { RootCanalTreatmentvalue: '' };
  ApicalLesioForms = { ApicalLesiovalue: '' };
  BrokenInstrumentinCanalForms = { BrokenInstrumentinCanal: false };
  RootResorptionForms = { External: false, Internal: false };
  // --- MissingTeethImplants
  MissingTeethForms = { MissingTeeth: false };
  ImplantForms = { OK: false, Malpositioned: false, Withboneloss: false, Withgingivalrecession: false };
  ImpactedTeethForms = { ImpactedTeeth: false };
  ImpactedInfectedTeethForms = { ImpactedInfectedTeeth: false };
  LargeMaxillarySinusForm = { LargeMaxillarySinus: false };
  // --- RestorativeColor TODO
  // --- Prosthodontics
  VeneerForms = {
    Ok: false,
    Leaking: false,
    Worn: false,
    Fractured: false,
    Discolored: false,
    Unaesthetic: false
  };
  CrownForms = {
    Ok: false,
    Leaking: false,
    Worn: false,
    Fractured: false,
    Discolored: false,
    Unaesthetic: false
  };
  OnlayForms = {
    Ok: false,
    Leaking: false,
    Worn: false,
    Fractured: false,
    Discolored: false,
    Unaesthetic: false
  };
  BridgeForms = {
    Ok: false,
    Leaking: false,
    Worn: false,
    Fractured: false,
    Discolored: false,
    Unaesthetic: false
  };
  DentureForms = {
    Ok: false,
    Leaking: false,
    Worn: false,
    Fractured: false,
    Discolored: false,
    Unaesthetic: false
  };

  patientName: any;
  patientname: any; // TODO why one more?
  patientN = false;
  planName: any;

  //  ------------checkbox hide-----------
  ok = false;
  other = false;
  // -------------main----------------
  cariesTagValue: any; CariesFracturesWear = true; FractureValue = '';
  WearValue = ''; PerioBone = false; Endodontics = false; MissingteethImplants = false;
  RestorativeColor = false;
  Prosthodontics = false;
  OtherTab = false;
  OrtoFacialTMJ = false;

  // --- OrtoFacialTMJ
  classI = true; classII = false; classIII = false;
  class1 = true; class2 = false; class3 = false;
  class11 = true; class12 = false; class13 = false;
  classIV = true; classV = false;
  crowding1 = true; crowding2 = false;
  spacing1 = true; spacing2 = false;
  posterior1 = true; posterior2 = false;
  skeletal1 = true; skeletal2 = false;
  oftHide = false; facial = false; malocclusion = false; tmj = false;
  // ----------------

  //  CARIES
  caries = [];
  cariesActive = false;

  Buccalchecked = false;
  Distalchecked = false;
  Lingualchecked = false;
  Mesialchecked = false;
  Occlusalchecked = false;

  BuccalCSSarray = new Array();
  DistalCSSarray = new Array();
  MesialCSSarray = new Array();
  LingualCSSarray = new Array();
  OcclusalCSSarray = new Array();

  BuccalTeethActive = [];
  DistalTeethActive = [];
  LingualTeethActive = [];
  MesialTeethActive = [];
  OcclusalTeethActive = [];


  //  fracture section
  fractureActive = false; crownSection = false; rootSection = false;
  fractures = []; crownCSSarray = new Array(); rootCSSarray = new Array();

  // SeverelyDamaged
  severalDamaged = false; severalDamagedLabel = []; severalDamagedCSSarray = new Array();

  //  wear section
  wearActive = false; wear = []; MildSection = false; ModerateSection = false; SevereSection = false;
  MildCSSarray = new Array(); ModerateCSSarray = new Array(); SevereCSSarray = new Array();
  // -------------------------Perio Bone Section----------------------
  PlaqueHygieneDegree = []; GingivitisDegree = []; MobilityDegree = []; Periotagvalue: any;

  GingivalRecessionactive = true; GingivalRecessionDegree = []; GingivalRecessionMild = false;
  GingivalRecessionMildCSSArray = new Array(); GingivalRecessionModerate = false; GingivalRecessionModerateCSSArray = new Array();
  GingivalRecessionSevere = false; GingivalRecessionSevereCSSArray = new Array();

  PeriodontitisActive = true; PeriodontitisDegree = []; PeriodontitisMild = false; PeriodontitisMildCSSArray = new Array();
  PeriodontitisModerate = false; PeriodontitisModerateCSSArray = new Array(); PeriodontitisSevere = false;
  PeriodontitisSevereCSSArray = new Array();

  GummSmileActive = false; GummSmileCSSArray = new Array();

  GingivalOvergrowthActive = false; GingivalOvergrowthCSSArray = new Array();

  // tab 3
  ApicalLesionDegree = []; necrosisCSSArray = new Array(); necrosis = false; RootCanalTreatment = false;

  SatisfactoryCSSArray = new Array(); saticfactory = false;
  UnsatisfactoryCSSArray = new Array(); unsatisfactory = false;

  ApicalLesionMild = false; ApicalLesionMildCSSArray = new Array();
  ApicalLesionModerate = false; ApicalLesionModerateCSSArray = new Array();
  ApicalLesionSevere = false; ApicalLesionSevereCSSArray = new Array();
  BrokenInstrumentinCanal = false; BrokenInstrumentinCanalCSSArray = new Array();

  RootResorption = []; InternalCSSarray = new Array(); Internalchecked = false; ExternalCSSarray = new Array(); Externalchecked = false;

  // tab 5
  okk = false; otherr = false; checkBoxValue = []; checkBoxOk = []; otherCSSArray = new Array(); okCSSArray = new Array();
  teethhidden = false; MissingTeethActive = false; MissingTeethCSSArray = new Array();
  ImpactedTeethActive = false; ImpactedTeethCSSArray = new Array();
  ImpactedInfectedTeethActive = false; ImpactedInfectedTeethCSSArray = new Array();
  LargeMaxillarySinusActive = false; LargeMaxillarySinusCSSArray = new Array();

  // tab 6

  postokCSSArray = new Array(); postok = false;
  postunsatisfactoryCSSArray = new Array(); postunsatisfactory = false;
  DiscoloredTeethActive = false; DiscoloredCSSArray = new Array();

  // tab 7
  vOk = false; vLeaking = false; vWorn = false; vFractured = false; vDiscolored = false; vUnaesthetic = false;
  veneerok = false; veneerother = false; veneercheckBoxValue = []; veneercheckBoxOk = []; veneerotherCSSArray = new Array();
  veneerokCSSArray = new Array();

  cOk = false; cLeaking = false; cWorn = false; cFractured = false; cDiscolored = false; cUnaesthetic = false; crownok = false;
  crownother = false; crowncheckBoxValue = []; crowncheckBoxOk = []; crownotherCSSArray = new Array(); crownokCSSArray = new Array();

  oOk = false; oLeaking = false; oWorn = false; oFractured = false; oDiscolored = false; oUnaesthetic = false; onlayok = false;
  onlayother = false; onlaycheckBoxValue = []; onlaycheckBoxOk = []; onlayotherCSSArray = new Array(); onlayokCSSArray = new Array();
  bridgeok = false; bridgeother = false;
  dentureok = false; dentureother = false;

  // Restorative Color
  ROK = false; ROther = false; RestorativeOk = false; RestorativeOther = false; RColor = [];
  ColorBuccalchecked = false; ColorBuccalCSSArray = new Array(); ColorDistalchecked = false;
  ColorDistalCSSArray = new Array(); ColorLingualchecked = false; ColorLingualCSSArray = new Array();
  ColorMesialchecked = false; ColorMesialCSSArray = new Array(); ColorOcclusalchecked = false;
  ColorOcclusalCSSArray = new Array();

  firstFormGroup: FormGroup; secondFormGroup: FormGroup; selectedTeethValue = [];
  selectedTeethValueString: any; isDisabled = true;
  len = 5;
  teeth18 = false; teeth17 = false; teeth16 = false; teeth15 = false; teeth14 = false; teeth13 = false; teeth12 = false; teeth11 = false;
  teeth21 = false; teeth22 = false; teeth23 = false; teeth24 = false; teeth25 = false; teeth26 = false; teeth27 = false; teeth28 = false;
  teeth48 = false; teeth47 = false; teeth46 = false; teeth45 = false; teeth44 = false; teeth43 = false; teeth42 = false; teeth41 = false;
  teeth31 = false; teeth32 = false; teeth33 = false; teeth34 = false; teeth35 = false; teeth36 = false; teeth37 = false; teeth38 = false;
  firstsection = false; secondsection = false; thirdsection = false; forthsection = false;
  PatientID: any;
  // public PatientID = parseInt(this.route.snapshot.paramMap.get('PatientID'), 10);
  public PlanID = parseInt(this.route.snapshot.paramMap.get('PlanID'));

  public teethArr: Tooth[] = [];
  public activeTab: string = "";

  // PDF
  @ViewChild(PdfContainerComponent) pdfContainer: PdfContainerComponent;
  @ViewChild('pdfContainer') content;
  public dentist = JSON.parse(localStorage.getItem("LoggedINUser"));
  public currentDate = (new Date()).toLocaleDateString('en-GB');
  nativeWindow: any;
  isPlanPricesCheckd = true;
  selectedColor

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private adminService: AdminService,
    private router: Router, private toastrService: ToastrService, private planService: PlanService, private dialog: MatDialog,) {
    this.selectedColor = '#3EA8C9';
  }

  ngOnInit() {
    this.__initTeeth();

    if (this.PlanID !== null || this.PlanID !== undefined) {
      this.adminService.getByID('getPlanByID', this.PlanID).subscribe(data => {
        this.patientName = data[0].PatientName;
        this.patientname = data[0].PatientName;
        this.PatientID = data[0].PatientID;
        this.planName = data[0].PlanName;
        
        this.getDiagnosisByPatientID(this.PatientID, 'getDiagnosisByPatientID', 'caries');
      });
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    
  }

  private __initTeeth() {
    // Populate this.teethArr:
    // an array of objects like {num: 18, isActive: false, ...}
    // this.teethArr will have the right tooth order (18, 17, 16, ..., 38)
    let sectors = [1, 2, 4, 3];
    let teethNums = [8, 7, 6, 5, 4, 3, 2, 1];
    let reverseTeethNums = [...teethNums].reverse();
    let temp: number[];
    for (let i = 0; i < sectors.length; i++) {
      if (sectors[i] === 2 || sectors[i] === 3) {
        temp = reverseTeethNums;
      } else {
        temp = teethNums;
      }
      for (let k = 0; k < temp.length; k++) {
        this.teethArr.push(
          new Tooth(parseInt(`${sectors[i]}${temp[k]}`), sectors[i])
        );
      }
    }

  }

  // generatePdf() { // TODO
  //   // html2pdf()
  //   // second 
  //   // var doc = new jspdf();
  //   // doc.addHTML(this.content.nativeElement, function() {
  //   //    doc.save("report.pdf");
  //   // });

  //   //  var data = document.getElementById('pdfContainer');
  //   // html2canvas(data).then(canvas => {
  //   //   const contentDataURL = canvas.toDataURL('image/png')  
  //   //   let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //   //   // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //   //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
  //   //   pdf.save('Filename.pdf');   
  //   // }); 
  // }

  getDiagnosisByPatientID(id, mode, tblName) {
    this.adminService.getDiagnosisByPatientID(id, mode, tblName).subscribe(data => {
      //console.log(data, 'getDiagnosisByPatientID');
    });
  }

  public toggleTooth(num: number) {
    console.log(`[ DEBUG ] toggleTooth: num ${num}`);
    if (this.selectedTeethValue.includes(num)) {
      this.selectedTeethValue = this.selectedTeethValue.filter(n => n != num);
    } else {
      this.selectedTeethValue.push(num);
    }
    this.selectedTeethValueString = this.selectedTeethValue.join();
    this.teethArr.forEach(t => {
      if (t.num === num)
        console.log("[ DEBUG ] tooth: ", t);
    });
    this.teethArr.forEach(t => {
      if (t.num === num) {
        t.isActive = !t.isActive;
      }
    })
  }

  public toggleTeethSection(section: number) {
    const limit = (this.teethArr.length / 4) * section;
    for (let i = 0; i < limit; i++) {
      this.toggleTooth(this.teethArr[i].num);
    }
  }

  public isDiagnosisTrue(complexDiagnosis: string): boolean {
    // Used for finding if a complex diagnosis true (a diagnosis which value is
    // not boolean, but an object of booleans, like Tooth.diagnosis.gingivalRecession)
    if (this.selectedTeethValue.length > 0) {
      for (let i = 0; i < this.teethArr.length; i++) {
        if (this.selectedTeethValue.includes(this.teethArr[i].num)) {
          return Object.values(this.teethArr[i].diagnosis[complexDiagnosis]).includes(true)
        }
      }
    }
  }

  public updateTooth(tooth: Tooth) {
    for (let i = 0; i < this.teethArr.length; i++) {
      if (this.teethArr[i].num === tooth.num) {
        this.teethArr[i] = tooth;
        break;
      }
    }
    console.log("in parent", tooth);
    this.toggleTooth(tooth.num);
  }

  public setTabActive(tabName: string) {
    this.activeTab = tabName;
    this.OtherName = "";
  }

  public setDiagnosis(event, category: string, diagnosisValue: string) {
    const isChecked = event.target.checked;
    //Caries Checks
    if (isChecked && !this.SelectedCaries.includes(diagnosisValue) && category === "caries")
      this.SelectedCaries.push(diagnosisValue);
    if (!isChecked && this.SelectedCaries.includes(diagnosisValue) && category === "caries") {
      this.SelectedCaries.forEach((element, index) => {
        if (element == diagnosisValue) this.SelectedCaries.splice(index, 1);
      });
    }

    //Fracture Check
    if (isChecked && category === "fracture")
      this.FractureValue = diagnosisValue;

    // Find all selected tooth in teethArr and set diagnosis to each.
    for (let i = 0; i < this.teethArr.length; i++) {
      if (this.selectedTeethValue.includes(this.teethArr[i].num)) {
        if (!diagnosisValue) {
          console.log(`what ${category} ${diagnosisValue}`);
          this.teethArr[i].diagnosis[category] = isChecked;
        } else {
          console.log(`[ DEBUG ] setDiagnosis: ${category} && ${diagnosisValue} are set`);
          this.teethArr[i].diagnosis[category][diagnosisValue] = isChecked;
        }
      }
    }
    this.cariesTagValue = category;
  }

  public getSelectedDiagnosis() {
    // Because we set an equal diagnosis to each selected tooth,
    // we can just get the first selected tooth in order to get diagnosis which represents all teeth
    let diagnosisData = null;
    if (this.selectedTeethValue.length > 0) {
      this.teethArr.forEach(t => {
        if (this.selectedTeethValue.includes(t.num)) {
          diagnosisData = t.diagnosis;
        }
      });
    } else {
      diagnosisData = this.teethArr[0].diagnosis;
    }

    return diagnosisData;
  }

  public setDiagnosisOther() { // TODO

  }

  teeth(mode, teethValue) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        this.CarriesTeethFn();
        this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.ColorCssFn(mode);
        this.teeth18 = true; this.selectedTeethValue.push(teethValue);
        // if (this.Mesialchecked === true ) {this.MesialCSSarray[18] = true;}
        // if (this.Distalchecked === true ) {  this.DistalCSSarray[18] = true;}
        // if (this.Lingualchecked === true ) { this.LingualCSSarray[18] = true;}
        // if (this.Occlusalchecked === true ) {this.OcclusalCSSarray[18] = true;}
        // if (this.Buccalchecked === true ) { this.BuccalCSSarray[18] = true;}

        console.log(`[ DEBUG ] teeth: ${mode} ${teethValue}`);

        if (this.rootSection === true) { this.rootCSSarray[18] = true; }
        if (this.crownSection === true) { this.crownCSSarray[18] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[18] = true; }

        if (this.MildSection === true) { this.MildCSSarray[18] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[18] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[18] = true; }
        // 
        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[18] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[18] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[18] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[18] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[18] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[18] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[18] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[18] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[18] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[18] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[18] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[18] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[18] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[18] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[18] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[18] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[18] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[18] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[18] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[18] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[18] = true;
        }

        if (this.okk === true) { this.okCSSArray[18] = true; }
        if (this.otherr === true) { this.otherCSSArray[18] = true; }

        if (this.postok === true) { this.postokCSSArray[18] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[18] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[18] = true; }


      }
      else {
        this.ColorCssFn(mode);
        this.CarriesTeethFn();
        this.vaneerFnValue(mode);
        this.crownFnValue(mode);
        this.onlayFnValue(mode);
        // this.BuccalCSSarray[18] = false; this.DistalCSSarray[18] = false; this.OcclusalCSSarray[18] = false;this.LingualCSSarray[18] = false;this.MesialCSSarray[18] = false; 
        this.teeth18 = false;
        this.crownCSSarray[18] = false;
        this.rootCSSarray[18] = false;
        this.severalDamagedCSSarray[18] = false;
        this.MildCSSarray[18] = false;
        this.ModerateCSSarray[18] = false;
        this.SevereCSSarray[18] = false;
        this.GingivalRecessionMildCSSArray[18] = false;
        this.GingivalRecessionModerateCSSArray[18] = false;
        this.GingivalRecessionSevereCSSArray[18] = false;
        this.PeriodontitisMildCSSArray[18] = false;
        this.PeriodontitisModerateCSSArray[18] = false;
        this.PeriodontitisSevereCSSArray[18] = false;
        this.GummSmileCSSArray[18] = false;
        this.GingivalOvergrowthCSSArray[18] = false;
        this.necrosisCSSArray[18] = false;
        this.SatisfactoryCSSArray[18] = false;
        this.UnsatisfactoryCSSArray[18] = false;
        this.ApicalLesionMildCSSArray[18] = false;
        this.ApicalLesionModerateCSSArray[18] = false;
        this.ApicalLesionSevereCSSArray[18] = false;
        this.BrokenInstrumentinCanalCSSArray[18] = false;
        this.InternalCSSarray[18] = false;
        this.ExternalCSSarray[18] = false;
        this.MissingTeethCSSArray[18] = false;
        this.ImpactedTeethCSSArray[18] = false;
        this.ImpactedInfectedTeethCSSArray[18] = false;
        this.LargeMaxillarySinusCSSArray[18] = false;
        this.okCSSArray[18] = false;
        this.otherCSSArray[18] = false;
        this.postokCSSArray[18] = false;
        this.postunsatisfactoryCSSArray[18] = false;
        this.DiscoloredCSSArray[18] = false;

        const found = this.selectedTeethValue.findIndex(element => element === 18);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        this.CarriesTeethFn(); this.ColorCssFn(mode);
        this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth17 = true; this.selectedTeethValue.push(teethValue);
        // if (this.Mesialchecked === true ) {this.MesialCSSarray[17] = true;}
        // if (this.Distalchecked === true ) {  this.DistalCSSarray[17] = true;}
        // if (this.Lingualchecked === true ) { this.LingualCSSarray[17] = true;}
        // if (this.Occlusalchecked === true ) {this.OcclusalCSSarray[17] = true;}
        // if (this.Buccalchecked === true ) { this.BuccalCSSarray[17] = true;}

        if (this.rootSection === true) { this.rootCSSarray[17] = true; }
        if (this.crownSection === true) { this.crownCSSarray[17] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[17] = true; }

        if (this.MildSection === true) { this.MildCSSarray[17] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[17] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[17] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[17] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[17] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[17] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[17] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[17] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[17] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[17] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[17] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[17] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[17] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[17] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[17] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[17] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[17] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[17] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[17] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[17] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[17] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[17] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[17] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[17] = true;
        }

        if (this.okk === true) { this.okCSSArray[17] = true; }
        if (this.otherr === true) { this.otherCSSArray[17] = true; }

        if (this.postok === true) { this.postokCSSArray[17] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[17] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[17] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.vaneerFnValue(mode);
        this.crownFnValue(mode);
        this.CarriesTeethFn();
        // this.BuccalCSSarray[17] = false; this.DistalCSSarray[17] = false; this.OcclusalCSSarray[17] = false;this.LingualCSSarray[17] = false;this.MesialCSSarray[17] = false; 
        this.teeth17 = false;
        this.crownCSSarray[17] = false;
        this.rootCSSarray[17] = false;
        this.severalDamagedCSSarray[17] = false;
        this.MildCSSarray[17] = false;
        this.ModerateCSSarray[17] = false;
        this.SevereCSSarray[17] = false;
        this.GingivalRecessionMildCSSArray[17] = false;
        this.GingivalRecessionModerateCSSArray[17] = false;
        this.GingivalRecessionSevereCSSArray[17] = false;
        this.PeriodontitisMildCSSArray[17] = false;
        this.PeriodontitisModerateCSSArray[17] = false;
        this.PeriodontitisSevereCSSArray[17] = false;
        this.GummSmileCSSArray[17] = false;
        this.GingivalOvergrowthCSSArray[17] = false;
        this.necrosisCSSArray[17] = false;
        this.SatisfactoryCSSArray[17] = false;
        this.UnsatisfactoryCSSArray[17] = false;
        this.ApicalLesionMildCSSArray[17] = false;
        this.ApicalLesionModerateCSSArray[17] = false;
        this.ApicalLesionSevereCSSArray[17] = false;
        this.BrokenInstrumentinCanalCSSArray[17] = false;
        this.InternalCSSarray[17] = false;
        this.ExternalCSSarray[17] = false;
        this.MissingTeethCSSArray[17] = false;
        this.ImpactedTeethCSSArray[17] = false;
        this.ImpactedInfectedTeethCSSArray[17] = false;
        this.LargeMaxillarySinusCSSArray[17] = false;
        this.okCSSArray[17] = false;
        this.otherCSSArray[17] = false;
        this.postokCSSArray[17] = false;
        this.postunsatisfactoryCSSArray[17] = false;
        this.DiscoloredCSSArray[17] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 17);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        this.ColorCssFn(mode);
        this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.vaneerFnValue(mode); this.crownFnValue(mode); this.teeth16 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[16] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[16] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[16] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[16] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[16] = true; }

        if (this.rootSection === true) { this.rootCSSarray[16] = true; }
        if (this.crownSection === true) { this.crownCSSarray[16] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[16] = true; }

        if (this.MildSection === true) { this.MildCSSarray[16] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[16] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[16] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[16] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[16] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[16] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[16] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[16] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[16] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[16] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[16] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[16] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[16] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[16] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[16] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[16] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[16] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[16] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[16] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[16] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[16] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[16] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[16] = true; }
        if (this.LargeMaxillarySinusActive === true) { this.LargeMaxillarySinusCSSArray[16] = true; }

        if (this.okk === true) { this.okCSSArray[16] = true; }
        if (this.otherr === true) { this.otherCSSArray[16] = true; }

        if (this.postok === true) { this.postokCSSArray[16] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[16] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[16] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[16] = false; this.DistalCSSarray[16] = false; this.OcclusalCSSarray[16] = false; this.LingualCSSarray[16] = false; this.MesialCSSarray[16] = false; this.teeth16 = false;
        this.crownCSSarray[16] = false;
        this.rootCSSarray[16] = false;
        this.severalDamagedCSSarray[16] = false;
        this.MildCSSarray[16] = false;
        this.ModerateCSSarray[16] = false;
        this.SevereCSSarray[16] = false;
        this.GingivalRecessionMildCSSArray[16] = false;
        this.GingivalRecessionModerateCSSArray[16] = false;
        this.GingivalRecessionSevereCSSArray[16] = false;
        this.PeriodontitisMildCSSArray[16] = false;
        this.PeriodontitisModerateCSSArray[16] = false;
        this.PeriodontitisSevereCSSArray[16] = false;
        this.GummSmileCSSArray[16] = false;
        this.GingivalOvergrowthCSSArray[16] = false;
        this.necrosisCSSArray[16] = false;
        this.SatisfactoryCSSArray[16] = false;
        this.UnsatisfactoryCSSArray[16] = false;
        this.ApicalLesionMildCSSArray[16] = false;
        this.ApicalLesionModerateCSSArray[16] = false;
        this.ApicalLesionSevereCSSArray[16] = false;
        this.BrokenInstrumentinCanalCSSArray[16] = false;
        this.InternalCSSarray[16] = false;
        this.ExternalCSSarray[16] = false;
        this.MissingTeethCSSArray[16] = false;
        this.ImpactedTeethCSSArray[16] = false;
        this.ImpactedInfectedTeethCSSArray[16] = false;
        this.LargeMaxillarySinusCSSArray[16] = false;
        this.okCSSArray[16] = false;
        this.otherCSSArray[16] = false;
        this.postokCSSArray[16] = false;
        this.postunsatisfactoryCSSArray[16] = false;
        this.DiscoloredCSSArray[16] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 16);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        this.ColorCssFn(mode);
        this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.vaneerFnValue(mode); this.teeth15 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[15] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[15] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[15] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[15] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[15] = true; }

        if (this.rootSection === true) { this.rootCSSarray[15] = true; }
        if (this.crownSection === true) { this.crownCSSarray[15] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[15] = true; }

        if (this.MildSection === true) { this.MildCSSarray[15] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[15] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[15] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[15] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[15] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[15] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[15] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[15] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[15] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[15] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[15] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[15] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[15] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[15] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[15] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[15] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[15] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[15] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[15] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[15] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[15] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[15] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[15] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[15] = true;
        }

        if (this.okk === true) { this.okCSSArray[15] = true; }
        if (this.otherr === true) { this.otherCSSArray[15] = true; }

        if (this.postok === true) { this.postokCSSArray[15] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[15] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[15] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[15] = false;
        this.DistalCSSarray[15] = false; this.OcclusalCSSarray[15] = false; this.LingualCSSarray[15] = false; this.MesialCSSarray[15] = false; this.teeth15 = false;
        this.crownCSSarray[15] = false;
        this.rootCSSarray[15] = false;
        this.severalDamagedCSSarray[15] = false;
        this.MildCSSarray[15] = false;
        this.ModerateCSSarray[15] = false;
        this.SevereCSSarray[15] = false;
        this.GingivalRecessionMildCSSArray[15] = false;
        this.GingivalRecessionModerateCSSArray[15] = false;
        this.GingivalRecessionSevereCSSArray[15] = false;
        this.PeriodontitisMildCSSArray[15] = false;
        this.PeriodontitisModerateCSSArray[15] = false;
        this.PeriodontitisSevereCSSArray[15] = false;
        this.GummSmileCSSArray[15] = false;
        this.GingivalOvergrowthCSSArray[15] = false;
        this.necrosisCSSArray[15] = false;
        this.SatisfactoryCSSArray[15] = false;
        this.UnsatisfactoryCSSArray[15] = false;
        this.ApicalLesionMildCSSArray[15] = false;
        this.ApicalLesionModerateCSSArray[15] = false;
        this.ApicalLesionSevereCSSArray[15] = false;
        this.BrokenInstrumentinCanalCSSArray[15] = false;
        this.InternalCSSarray[15] = false;
        this.ExternalCSSarray[15] = false;
        this.MissingTeethCSSArray[15] = false;
        this.ImpactedTeethCSSArray[15] = false;
        this.ImpactedInfectedTeethCSSArray[15] = false;
        this.LargeMaxillarySinusCSSArray[15] = false;
        this.okCSSArray[15] = false;
        this.otherCSSArray[15] = false;
        this.postokCSSArray[15] = false;
        this.postunsatisfactoryCSSArray[15] = false;
        this.DiscoloredCSSArray[15] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 15);
        this.selectedTeethValue.splice(found, 1);
      }
    }

    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth14 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[14] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[14] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[14] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[14] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[14] = true; }

        if (this.rootSection === true) { this.rootCSSarray[14] = true; }
        if (this.crownSection === true) { this.crownCSSarray[14] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[14] = true; }

        if (this.MildSection === true) { this.MildCSSarray[14] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[14] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[14] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[14] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[14] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[14] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[14] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[14] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[14] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[14] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[14] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[14] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[14] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[14] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[14] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[14] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[14] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[14] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[14] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[14] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[14] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[14] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[14] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[14] = true;
        }

        if (this.okk === true) { this.okCSSArray[14] = true; }
        if (this.otherr === true) { this.otherCSSArray[14] = true; }

        if (this.postok === true) { this.postokCSSArray[14] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[14] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[14] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[14] = false; this.DistalCSSarray[14] = false; this.OcclusalCSSarray[14] = false; this.LingualCSSarray[14] = false; this.MesialCSSarray[14] = false; this.teeth14 = false;
        this.crownCSSarray[14] = false;
        this.rootCSSarray[14] = false;
        this.severalDamagedCSSarray[14] = false;
        this.MildCSSarray[14] = false;
        this.ModerateCSSarray[14] = false;
        this.SevereCSSarray[14] = false;
        this.GingivalRecessionMildCSSArray[14] = false;
        this.GingivalRecessionModerateCSSArray[14] = false;
        this.GingivalRecessionSevereCSSArray[14] = false;
        this.PeriodontitisMildCSSArray[14] = false;
        this.PeriodontitisModerateCSSArray[14] = false;
        this.PeriodontitisSevereCSSArray[14] = false;
        this.GummSmileCSSArray[14] = false;
        this.GingivalOvergrowthCSSArray[14] = false;
        this.necrosisCSSArray[14] = false;
        this.SatisfactoryCSSArray[14] = false;
        this.UnsatisfactoryCSSArray[14] = false;
        this.ApicalLesionMildCSSArray[14] = false;
        this.ApicalLesionModerateCSSArray[14] = false;
        this.ApicalLesionSevereCSSArray[14] = false;
        this.BrokenInstrumentinCanalCSSArray[14] = false;
        this.InternalCSSarray[14] = false;
        this.ExternalCSSarray[14] = false;
        this.MissingTeethCSSArray[14] = false;
        this.ImpactedTeethCSSArray[14] = false;
        this.ImpactedInfectedTeethCSSArray[14] = false;
        this.LargeMaxillarySinusCSSArray[14] = false;
        this.okCSSArray[14] = false;
        this.otherCSSArray[14] = false;
        this.postokCSSArray[14] = false;
        this.postunsatisfactoryCSSArray[14] = false;
        this.DiscoloredCSSArray[14] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 14);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth13 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[13] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[13] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[13] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[13] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[13] = true; }

        if (this.rootSection === true) { this.rootCSSarray[13] = true; }
        if (this.crownSection === true) { this.crownCSSarray[13] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[13] = true; }

        if (this.MildSection === true) { this.MildCSSarray[13] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[13] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[13] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[13] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[13] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[13] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[13] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[13] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[13] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[13] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[13] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[13] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[13] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[13] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[13] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[13] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[13] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[13] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[13] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[13] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[13] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[13] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[13] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[13] = true;
        }

        if (this.okk === true) { this.okCSSArray[13] = true; }
        if (this.otherr === true) { this.otherCSSArray[13] = true; }

        if (this.postok === true) { this.postokCSSArray[13] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[13] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[13] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[13] = false; this.DistalCSSarray[13] = false; this.OcclusalCSSarray[13] = false; this.LingualCSSarray[13] = false; this.MesialCSSarray[13] = false; this.teeth13 = false;
        this.crownCSSarray[13] = false;
        this.rootCSSarray[13] = false;
        this.severalDamagedCSSarray[13] = false;
        this.MildCSSarray[13] = false;
        this.ModerateCSSarray[13] = false;
        this.SevereCSSarray[13] = false;
        this.GingivalRecessionMildCSSArray[13] = false;
        this.GingivalRecessionModerateCSSArray[13] = false;
        this.GingivalRecessionSevereCSSArray[13] = false;
        this.PeriodontitisMildCSSArray[13] = false;
        this.PeriodontitisModerateCSSArray[13] = false;
        this.PeriodontitisSevereCSSArray[13] = false;
        this.GummSmileCSSArray[13] = false;
        this.GingivalOvergrowthCSSArray[13] = false;
        this.necrosisCSSArray[13] = false;
        this.SatisfactoryCSSArray[13] = false;
        this.UnsatisfactoryCSSArray[13] = false;
        this.ApicalLesionMildCSSArray[13] = false;
        this.ApicalLesionModerateCSSArray[13] = false;
        this.ApicalLesionSevereCSSArray[13] = false;
        this.BrokenInstrumentinCanalCSSArray[13] = false;
        this.InternalCSSarray[13] = false;
        this.ExternalCSSarray[13] = false;
        this.MissingTeethCSSArray[13] = false;
        this.ImpactedTeethCSSArray[13] = false;
        this.ImpactedInfectedTeethCSSArray[13] = false;
        this.LargeMaxillarySinusCSSArray[13] = false;
        this.okCSSArray[13] = false;
        this.otherCSSArray[13] = false;
        this.postokCSSArray[13] = false;
        this.postunsatisfactoryCSSArray[13] = false;
        this.DiscoloredCSSArray[13] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 13);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth12 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[12] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[12] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[12] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[12] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[12] = true; }

        if (this.rootSection === true) { this.rootCSSarray[12] = true; }
        if (this.crownSection === true) { this.crownCSSarray[12] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[12] = true; }

        if (this.MildSection === true) { this.MildCSSarray[12] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[12] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[12] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[12] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[12] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[12] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[12] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[12] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[12] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[12] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[12] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[12] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[12] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[12] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[12] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[12] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[12] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[12] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[12] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[12] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[12] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[12] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[12] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[12] = true;
        }

        if (this.okk === true) { this.okCSSArray[12] = true; }
        if (this.otherr === true) { this.otherCSSArray[12] = true; }

        if (this.postok === true) { this.postokCSSArray[12] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[12] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[12] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[12] = false; this.DistalCSSarray[12] = false; this.OcclusalCSSarray[12] = false; this.LingualCSSarray[12] = false; this.MesialCSSarray[12] = false; this.teeth12 = false;
        this.crownCSSarray[12] = false;
        this.rootCSSarray[12] = false;
        this.severalDamagedCSSarray[12] = false;
        this.MildCSSarray[12] = false;
        this.ModerateCSSarray[12] = false;
        this.SevereCSSarray[12] = false;
        this.GingivalRecessionMildCSSArray[12] = false;
        this.GingivalRecessionModerateCSSArray[12] = false;
        this.GingivalRecessionSevereCSSArray[12] = false;
        this.PeriodontitisMildCSSArray[12] = false;
        this.PeriodontitisModerateCSSArray[12] = false;
        this.PeriodontitisSevereCSSArray[12] = false;
        this.GummSmileCSSArray[12] = false;
        this.GingivalOvergrowthCSSArray[12] = false;
        this.necrosisCSSArray[12] = false;
        this.SatisfactoryCSSArray[12] = false;
        this.UnsatisfactoryCSSArray[12] = false;
        this.ApicalLesionMildCSSArray[12] = false;
        this.ApicalLesionModerateCSSArray[12] = false;
        this.ApicalLesionSevereCSSArray[12] = false;
        this.BrokenInstrumentinCanalCSSArray[12] = false;
        this.InternalCSSarray[12] = false;
        this.ExternalCSSarray[12] = false;
        this.MissingTeethCSSArray[12] = false;
        this.ImpactedTeethCSSArray[12] = false;
        this.ImpactedInfectedTeethCSSArray[12] = false;
        this.LargeMaxillarySinusCSSArray[12] = false;
        this.okCSSArray[12] = false;
        this.otherCSSArray[12] = false;
        this.postokCSSArray[12] = false;
        this.postunsatisfactoryCSSArray[12] = false;
        this.DiscoloredCSSArray[12] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 12);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth11 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[11] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[11] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[11] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[11] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[11] = true; }

        if (this.rootSection === true) { this.rootCSSarray[11] = true; }
        if (this.crownSection === true) { this.crownCSSarray[11] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[11] = true; }

        if (this.MildSection === true) { this.MildCSSarray[11] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[11] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[11] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[11] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[11] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[11] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[11] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[11] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[11] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[11] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[11] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[11] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[11] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[11] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[11] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[11] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[11] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[11] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[11] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[11] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[11] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[11] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[11] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[11] = true;
        }

        if (this.okk === true) { this.okCSSArray[11] = true; }
        if (this.otherr === true) { this.otherCSSArray[11] = true; }

        if (this.postok === true) { this.postokCSSArray[11] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[11] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[11] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[11] = false; this.DistalCSSarray[11] = false; this.OcclusalCSSarray[11] = false; this.LingualCSSarray[11] = false; this.MesialCSSarray[11] = false; this.teeth11 = false;
        this.crownCSSarray[11] = false;
        this.rootCSSarray[11] = false;
        this.severalDamagedCSSarray[11] = false;
        this.MildCSSarray[11] = false;
        this.ModerateCSSarray[11] = false;
        this.SevereCSSarray[11] = false;
        this.GingivalRecessionMildCSSArray[11] = false;
        this.GingivalRecessionModerateCSSArray[11] = false;
        this.GingivalRecessionSevereCSSArray[11] = false;
        this.PeriodontitisMildCSSArray[11] = false;
        this.PeriodontitisModerateCSSArray[11] = false;
        this.PeriodontitisSevereCSSArray[11] = false;
        this.GummSmileCSSArray[11] = false;
        this.GingivalOvergrowthCSSArray[11] = false;
        this.necrosisCSSArray[11] = false;
        this.SatisfactoryCSSArray[11] = false;
        this.UnsatisfactoryCSSArray[11] = false;
        this.ApicalLesionMildCSSArray[11] = false;
        this.ApicalLesionModerateCSSArray[11] = false;
        this.ApicalLesionSevereCSSArray[11] = false;
        this.BrokenInstrumentinCanalCSSArray[11] = false;
        this.InternalCSSarray[11] = false;
        this.ExternalCSSarray[11] = false;
        this.MissingTeethCSSArray[11] = false;
        this.ImpactedTeethCSSArray[11] = false;
        this.ImpactedInfectedTeethCSSArray[11] = false;
        this.LargeMaxillarySinusCSSArray[11] = false;
        this.okCSSArray[11] = false;
        this.otherCSSArray[11] = false;
        this.postokCSSArray[11] = false;
        this.postunsatisfactoryCSSArray[11] = false;
        this.DiscoloredCSSArray[11] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 11);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth21 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[21] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[21] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[21] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[21] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[21] = true; }

        if (this.rootSection === true) { this.rootCSSarray[21] = true; }
        if (this.crownSection === true) { this.crownCSSarray[21] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[21] = true; }

        if (this.MildSection === true) { this.MildCSSarray[21] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[21] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[21] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[21] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[21] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[21] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[21] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[21] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[21] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[21] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[21] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[21] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[21] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[21] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[21] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[21] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[21] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[21] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[21] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[21] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[21] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[21] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[21] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[21] = true;
        }

        if (this.okk === true) { this.okCSSArray[21] = true; }
        if (this.otherr === true) { this.otherCSSArray[21] = true; }

        if (this.postok === true) { this.postokCSSArray[21] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[21] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[21] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[21] = false; this.DistalCSSarray[21] = false; this.OcclusalCSSarray[21] = false; this.LingualCSSarray[21] = false; this.MesialCSSarray[21] = false; this.teeth21 = false;
        this.crownCSSarray[21] = false;
        this.rootCSSarray[21] = false;
        this.severalDamagedCSSarray[21] = false;
        this.MildCSSarray[21] = false;
        this.ModerateCSSarray[21] = false;
        this.SevereCSSarray[21] = false;
        this.GingivalRecessionMildCSSArray[21] = false;
        this.GingivalRecessionModerateCSSArray[21] = false;
        this.GingivalRecessionSevereCSSArray[21] = false;
        this.PeriodontitisMildCSSArray[21] = false;
        this.PeriodontitisModerateCSSArray[21] = false;
        this.PeriodontitisSevereCSSArray[21] = false;
        this.GummSmileCSSArray[21] = false;
        this.GingivalOvergrowthCSSArray[21] = false;
        this.necrosisCSSArray[21] = false;
        this.SatisfactoryCSSArray[21] = false;
        this.UnsatisfactoryCSSArray[21] = false;
        this.ApicalLesionMildCSSArray[21] = false;
        this.ApicalLesionModerateCSSArray[21] = false;
        this.ApicalLesionSevereCSSArray[21] = false;
        this.BrokenInstrumentinCanalCSSArray[21] = false;
        this.InternalCSSarray[21] = false;
        this.ExternalCSSarray[21] = false;
        this.MissingTeethCSSArray[21] = false;
        this.ImpactedTeethCSSArray[21] = false;
        this.ImpactedInfectedTeethCSSArray[21] = false;
        this.LargeMaxillarySinusCSSArray[21] = false;
        this.okCSSArray[21] = false;
        this.otherCSSArray[21] = false;
        this.postokCSSArray[21] = false;
        this.postunsatisfactoryCSSArray[21] = false;
        this.DiscoloredCSSArray[21] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 21);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth22 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[22] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[22] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[22] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[22] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[22] = true; }

        if (this.rootSection === true) { this.rootCSSarray[22] = true; }
        if (this.crownSection === true) { this.crownCSSarray[22] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[22] = true; }

        if (this.MildSection === true) { this.MildCSSarray[22] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[22] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[22] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[22] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[22] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[22] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[22] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[22] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[22] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[22] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[22] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[22] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[22] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[22] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[22] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[22] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[22] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[22] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[22] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[22] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[22] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[22] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[22] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[22] = true;
        }

        if (this.okk === true) { this.okCSSArray[22] = true; }
        if (this.otherr === true) { this.otherCSSArray[22] = true; }

        if (this.postok === true) { this.postokCSSArray[22] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[22] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[22] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[22] = false; this.DistalCSSarray[22] = false; this.OcclusalCSSarray[22] = false; this.LingualCSSarray[22] = false; this.MesialCSSarray[22] = false; this.teeth22 = false;
        this.crownCSSarray[22] = false;
        this.rootCSSarray[22] = false;
        this.severalDamagedCSSarray[22] = false;
        this.MildCSSarray[22] = false;
        this.ModerateCSSarray[22] = false;
        this.SevereCSSarray[22] = false;
        this.GingivalRecessionMildCSSArray[22] = false;
        this.GingivalRecessionModerateCSSArray[22] = false;
        this.GingivalRecessionSevereCSSArray[22] = false;
        this.PeriodontitisMildCSSArray[22] = false;
        this.PeriodontitisModerateCSSArray[22] = false;
        this.PeriodontitisSevereCSSArray[22] = false;
        this.GummSmileCSSArray[22] = false;
        this.GingivalOvergrowthCSSArray[22] = false;
        this.necrosisCSSArray[22] = false;
        this.SatisfactoryCSSArray[22] = false;
        this.UnsatisfactoryCSSArray[22] = false;
        this.ApicalLesionMildCSSArray[22] = false;
        this.ApicalLesionModerateCSSArray[22] = false;
        this.ApicalLesionSevereCSSArray[22] = false;
        this.BrokenInstrumentinCanalCSSArray[22] = false;
        this.InternalCSSarray[22] = false;
        this.ExternalCSSarray[22] = false;
        this.MissingTeethCSSArray[22] = false;
        this.ImpactedTeethCSSArray[22] = false;
        this.ImpactedInfectedTeethCSSArray[22] = false;
        this.LargeMaxillarySinusCSSArray[22] = false;
        this.okCSSArray[22] = false;
        this.otherCSSArray[22] = false;
        this.postokCSSArray[22] = false;
        this.postunsatisfactoryCSSArray[22] = false;
        this.DiscoloredCSSArray[22] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 22);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth23 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[23] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[23] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[23] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[23] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[23] = true; }

        if (this.rootSection === true) { this.rootCSSarray[23] = true; }
        if (this.crownSection === true) { this.crownCSSarray[23] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[23] = true; }

        if (this.MildSection === true) { this.MildCSSarray[23] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[23] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[23] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[23] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[23] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[23] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[23] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[23] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[23] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[23] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[23] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[23] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[23] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[23] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[23] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[23] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[23] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[23] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[23] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[23] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[23] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[23] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[23] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[23] = true;
        }

        if (this.okk === true) { this.okCSSArray[23] = true; }
        if (this.otherr === true) { this.otherCSSArray[23] = true; }

        if (this.postok === true) { this.postokCSSArray[23] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[23] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[23] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[23] = false; this.DistalCSSarray[23] = false; this.OcclusalCSSarray[23] = false; this.LingualCSSarray[23] = false; this.MesialCSSarray[23] = false; this.teeth23 = false;
        this.crownCSSarray[23] = false;
        this.rootCSSarray[23] = false;
        this.severalDamagedCSSarray[23] = false;
        this.MildCSSarray[23] = false;
        this.ModerateCSSarray[23] = false;
        this.SevereCSSarray[23] = false;
        this.GingivalRecessionMildCSSArray[23] = false;
        this.GingivalRecessionModerateCSSArray[23] = false;
        this.GingivalRecessionSevereCSSArray[23] = false;
        this.PeriodontitisMildCSSArray[23] = false;
        this.PeriodontitisModerateCSSArray[23] = false;
        this.PeriodontitisSevereCSSArray[23] = false;
        this.GummSmileCSSArray[23] = false;
        this.GingivalOvergrowthCSSArray[23] = false;
        this.necrosisCSSArray[23] = false;
        this.SatisfactoryCSSArray[23] = false;
        this.UnsatisfactoryCSSArray[23] = false;
        this.ApicalLesionMildCSSArray[23] = false;
        this.ApicalLesionModerateCSSArray[23] = false;
        this.ApicalLesionSevereCSSArray[23] = false;
        this.BrokenInstrumentinCanalCSSArray[23] = false;
        this.InternalCSSarray[23] = false;
        this.ExternalCSSarray[23] = false;
        this.MissingTeethCSSArray[23] = false;
        this.ImpactedTeethCSSArray[23] = false;
        this.ImpactedInfectedTeethCSSArray[23] = false;
        this.LargeMaxillarySinusCSSArray[23] = false;
        this.okCSSArray[23] = false;
        this.otherCSSArray[23] = false;
        this.postokCSSArray[23] = false;
        this.postunsatisfactoryCSSArray[23] = false;
        this.DiscoloredCSSArray[23] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 23);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth24 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[24] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[24] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[24] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[24] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[24] = true; }

        if (this.rootSection === true) { this.rootCSSarray[24] = true; }
        if (this.crownSection === true) { this.crownCSSarray[24] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[24] = true; }

        if (this.MildSection === true) { this.MildCSSarray[24] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[24] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[24] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[24] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[24] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[24] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[24] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[24] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[24] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[24] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[24] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[24] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[24] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[24] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[24] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[24] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[24] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[24] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[24] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[24] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[24] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[24] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[24] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[24] = true;
        }

        if (this.okk === true) { this.okCSSArray[24] = true; }
        if (this.otherr === true) { this.otherCSSArray[24] = true; }

        if (this.postok === true) { this.postokCSSArray[24] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[24] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[24] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[24] = false; this.DistalCSSarray[24] = false; this.OcclusalCSSarray[24] = false; this.LingualCSSarray[24] = false; this.MesialCSSarray[24] = false; this.teeth24 = false;
        this.crownCSSarray[24] = false;
        this.rootCSSarray[24] = false;
        this.severalDamagedCSSarray[24] = false;
        this.MildCSSarray[24] = false;
        this.ModerateCSSarray[24] = false;
        this.SevereCSSarray[24] = false;
        this.GingivalRecessionMildCSSArray[24] = false;
        this.GingivalRecessionModerateCSSArray[24] = false;
        this.GingivalRecessionSevereCSSArray[24] = false;
        this.PeriodontitisMildCSSArray[24] = false;
        this.PeriodontitisModerateCSSArray[24] = false;
        this.PeriodontitisSevereCSSArray[24] = false;
        this.GummSmileCSSArray[24] = false;
        this.GingivalOvergrowthCSSArray[24] = false;
        this.necrosisCSSArray[24] = false;
        this.SatisfactoryCSSArray[24] = false;
        this.UnsatisfactoryCSSArray[24] = false;
        this.ApicalLesionMildCSSArray[24] = false;
        this.ApicalLesionModerateCSSArray[24] = false;
        this.ApicalLesionSevereCSSArray[24] = false;
        this.BrokenInstrumentinCanalCSSArray[24] = false;
        this.InternalCSSarray[24] = false;
        this.ExternalCSSarray[24] = false;
        this.MissingTeethCSSArray[24] = false;
        this.ImpactedTeethCSSArray[24] = false;
        this.ImpactedInfectedTeethCSSArray[24] = false;
        this.LargeMaxillarySinusCSSArray[24] = false;
        this.okCSSArray[24] = false;
        this.otherCSSArray[24] = false;
        this.postokCSSArray[24] = false;
        this.postunsatisfactoryCSSArray[24] = false;
        this.DiscoloredCSSArray[24] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 24);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth25 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[25] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[25] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[25] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[25] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[25] = true; }

        if (this.rootSection === true) { this.rootCSSarray[25] = true; }
        if (this.crownSection === true) { this.crownCSSarray[25] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[25] = true; }

        if (this.MildSection === true) { this.MildCSSarray[25] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[25] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[25] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[25] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[25] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[25] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[25] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[25] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[25] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[25] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[25] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[25] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[25] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[25] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[25] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[25] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[25] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[25] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[25] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[25] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[25] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[25] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[25] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[25] = true;
        }

        if (this.okk === true) { this.okCSSArray[25] = true; }
        if (this.otherr === true) { this.otherCSSArray[25] = true; }

        if (this.postok === true) { this.postokCSSArray[25] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[25] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[25] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.BuccalCSSarray[25] = false; this.DistalCSSarray[25] = false; this.OcclusalCSSarray[25] = false; this.LingualCSSarray[25] = false; this.MesialCSSarray[25] = false; this.teeth25 = false;
        this.crownCSSarray[25] = false;
        this.rootCSSarray[25] = false;
        this.severalDamagedCSSarray[25] = false;
        this.MildCSSarray[25] = false;
        this.ModerateCSSarray[25] = false;
        this.SevereCSSarray[25] = false;
        this.GingivalRecessionMildCSSArray[25] = false;
        this.GingivalRecessionModerateCSSArray[25] = false;
        this.GingivalRecessionSevereCSSArray[25] = false;
        this.PeriodontitisMildCSSArray[25] = false;
        this.PeriodontitisModerateCSSArray[25] = false;
        this.PeriodontitisSevereCSSArray[25] = false;
        this.GummSmileCSSArray[25] = false;
        this.GingivalOvergrowthCSSArray[25] = false;
        this.necrosisCSSArray[25] = false;
        this.SatisfactoryCSSArray[25] = false;
        this.UnsatisfactoryCSSArray[25] = false;
        this.ApicalLesionMildCSSArray[25] = false;
        this.ApicalLesionModerateCSSArray[25] = false;
        this.ApicalLesionSevereCSSArray[25] = false;
        this.BrokenInstrumentinCanalCSSArray[25] = false;
        this.InternalCSSarray[25] = false;
        this.ExternalCSSarray[25] = false;
        this.MissingTeethCSSArray[25] = false;
        this.ImpactedTeethCSSArray[25] = false;
        this.ImpactedInfectedTeethCSSArray[25] = false;
        this.LargeMaxillarySinusCSSArray[25] = false;
        this.okCSSArray[25] = false;
        this.otherCSSArray[25] = false;
        this.postokCSSArray[25] = false;
        this.postunsatisfactoryCSSArray[25] = false;
        this.DiscoloredCSSArray[25] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 25);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode);
        this.teeth26 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[26] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[26] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[26] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[26] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[26] = true; }

        if (this.rootSection === true) { this.rootCSSarray[26] = true; }
        if (this.crownSection === true) { this.crownCSSarray[26] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[26] = true; }

        if (this.MildSection === true) { this.MildCSSarray[26] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[26] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[26] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[26] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[26] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[26] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[26] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[26] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[26] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[26] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[26] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[26] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[26] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[26] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[26] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[26] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[26] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[26] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[26] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[26] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[26] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[26] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[26] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[26] = true;
        }

        if (this.okk === true) { this.okCSSArray[26] = true; }
        if (this.otherr === true) { this.otherCSSArray[26] = true; }

        if (this.postok === true) { this.postokCSSArray[26] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[26] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[26] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[26] = false; this.DistalCSSarray[26] = false; this.OcclusalCSSarray[26] = false; this.LingualCSSarray[26] = false; this.MesialCSSarray[26] = false; this.teeth26 = false;
        this.crownCSSarray[26] = false;
        this.rootCSSarray[26] = false;
        this.severalDamagedCSSarray[26] = false;
        this.MildCSSarray[26] = false;
        this.ModerateCSSarray[26] = false;
        this.SevereCSSarray[26] = false;
        this.GingivalRecessionMildCSSArray[26] = false;
        this.GingivalRecessionModerateCSSArray[26] = false;
        this.GingivalRecessionSevereCSSArray[26] = false;
        this.PeriodontitisMildCSSArray[26] = false;
        this.PeriodontitisModerateCSSArray[26] = false;
        this.PeriodontitisSevereCSSArray[26] = false;
        this.GummSmileCSSArray[26] = false;
        this.GingivalOvergrowthCSSArray[26] = false;
        this.necrosisCSSArray[26] = false;
        this.SatisfactoryCSSArray[26] = false;
        this.UnsatisfactoryCSSArray[26] = false;
        this.ApicalLesionMildCSSArray[26] = false;
        this.ApicalLesionModerateCSSArray[26] = false;
        this.ApicalLesionSevereCSSArray[26] = false;
        this.BrokenInstrumentinCanalCSSArray[26] = false;
        this.InternalCSSarray[26] = false;
        this.ExternalCSSarray[26] = false;
        this.MissingTeethCSSArray[26] = false;
        this.ImpactedTeethCSSArray[26] = false;
        this.ImpactedInfectedTeethCSSArray[26] = false;
        this.LargeMaxillarySinusCSSArray[26] = false;
        this.okCSSArray[26] = false;
        this.otherCSSArray[26] = false;
        this.postokCSSArray[26] = false;
        this.postunsatisfactoryCSSArray[26] = false;
        this.DiscoloredCSSArray[26] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 26);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth27') {
      if (this.teeth27 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth27 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[27] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[27] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[27] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[27] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[27] = true; }

        if (this.rootSection === true) { this.rootCSSarray[27] = true; }
        if (this.crownSection === true) { this.crownCSSarray[27] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[27] = true; }

        if (this.MildSection === true) { this.MildCSSarray[27] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[27] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[27] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[27] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[27] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[27] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[27] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[27] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[27] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[27] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[27] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[27] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[27] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[27] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[27] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[27] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[27] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[27] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[27] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[27] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[27] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[27] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[27] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[27] = true;
        }

        if (this.okk === true) { this.okCSSArray[27] = true; }
        if (this.otherr === true) { this.otherCSSArray[27] = true; }

        if (this.postok === true) { this.postokCSSArray[27] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[27] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[27] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[27] = false; this.DistalCSSarray[27] = false; this.OcclusalCSSarray[27] = false; this.LingualCSSarray[27] = false; this.MesialCSSarray[27] = false; this.teeth27 = false;
        this.crownCSSarray[27] = false;
        this.rootCSSarray[27] = false;
        this.severalDamagedCSSarray[27] = false;
        this.MildCSSarray[27] = false;
        this.ModerateCSSarray[27] = false;
        this.SevereCSSarray[27] = false;
        this.GingivalRecessionMildCSSArray[27] = false;
        this.GingivalRecessionModerateCSSArray[27] = false;
        this.GingivalRecessionSevereCSSArray[27] = false;
        this.PeriodontitisMildCSSArray[27] = false;
        this.PeriodontitisModerateCSSArray[27] = false;
        this.PeriodontitisSevereCSSArray[27] = false;
        this.GummSmileCSSArray[27] = false;
        this.GingivalOvergrowthCSSArray[27] = false;
        this.necrosisCSSArray[27] = false;
        this.SatisfactoryCSSArray[27] = false;
        this.UnsatisfactoryCSSArray[27] = false;
        this.ApicalLesionMildCSSArray[27] = false;
        this.ApicalLesionModerateCSSArray[27] = false;
        this.ApicalLesionSevereCSSArray[27] = false;
        this.BrokenInstrumentinCanalCSSArray[27] = false;
        this.InternalCSSarray[27] = false;
        this.ExternalCSSarray[27] = false;
        this.MissingTeethCSSArray[27] = false;
        this.ImpactedTeethCSSArray[27] = false;
        this.ImpactedInfectedTeethCSSArray[27] = false;
        this.LargeMaxillarySinusCSSArray[27] = false;
        this.okCSSArray[27] = false;
        this.otherCSSArray[27] = false;
        this.postokCSSArray[27] = false;
        this.postunsatisfactoryCSSArray[27] = false;
        this.DiscoloredCSSArray[27] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 27);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth28 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[28] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[28] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[28] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[28] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[28] = true; }

        if (this.rootSection === true) { this.rootCSSarray[28] = true; }
        if (this.crownSection === true) { this.crownCSSarray[28] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[28] = true; }

        if (this.MildSection === true) { this.MildCSSarray[28] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[28] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[28] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[28] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[28] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[28] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[28] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[28] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[28] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[28] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[28] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[28] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[28] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[28] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[28] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[28] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[28] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[28] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[28] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[28] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[28] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[28] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[28] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[28] = true;
        }

        if (this.okk === true) { this.okCSSArray[28] = true; }
        if (this.otherr === true) { this.otherCSSArray[28] = true; }

        if (this.postok === true) { this.postokCSSArray[28] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[28] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[28] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[28] = false; this.DistalCSSarray[28] = false; this.OcclusalCSSarray[28] = false; this.LingualCSSarray[28] = false; this.MesialCSSarray[28] = false; this.teeth28 = false;
        this.crownCSSarray[28] = false;
        this.rootCSSarray[28] = false;
        this.severalDamagedCSSarray[28] = false;
        this.MildCSSarray[28] = false;
        this.ModerateCSSarray[28] = false;
        this.SevereCSSarray[28] = false;
        this.GingivalRecessionMildCSSArray[28] = false;
        this.GingivalRecessionModerateCSSArray[28] = false;
        this.GingivalRecessionSevereCSSArray[28] = false;
        this.PeriodontitisMildCSSArray[28] = false;
        this.PeriodontitisModerateCSSArray[28] = false;
        this.PeriodontitisSevereCSSArray[28] = false;
        this.GummSmileCSSArray[28] = false;
        this.GingivalOvergrowthCSSArray[28] = false;
        this.necrosisCSSArray[28] = false;
        this.SatisfactoryCSSArray[28] = false;
        this.UnsatisfactoryCSSArray[28] = false;
        this.ApicalLesionMildCSSArray[28] = false;
        this.ApicalLesionModerateCSSArray[28] = false;
        this.ApicalLesionSevereCSSArray[28] = false;
        this.BrokenInstrumentinCanalCSSArray[28] = false;
        this.InternalCSSarray[28] = false;
        this.ExternalCSSarray[28] = false;
        this.MissingTeethCSSArray[28] = false;
        this.ImpactedTeethCSSArray[28] = false;
        this.ImpactedInfectedTeethCSSArray[28] = false;
        this.LargeMaxillarySinusCSSArray[28] = false;
        this.okCSSArray[28] = false;
        this.otherCSSArray[28] = false;
        this.postokCSSArray[28] = false;
        this.postunsatisfactoryCSSArray[28] = false;
        this.DiscoloredCSSArray[28] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 28);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth48 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[48] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[48] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[48] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[48] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[48] = true; }

        if (this.rootSection === true) { this.rootCSSarray[48] = true; }
        if (this.crownSection === true) { this.crownCSSarray[48] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[48] = true; }

        if (this.MildSection === true) { this.MildCSSarray[48] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[48] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[48] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[48] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[48] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[48] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[48] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[48] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[48] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[48] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[48] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[48] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[48] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[48] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[48] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[48] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[48] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[48] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[48] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[48] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[48] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[48] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[48] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[48] = true;
        }

        if (this.okk === true) { this.okCSSArray[48] = true; }
        if (this.otherr === true) { this.otherCSSArray[48] = true; }

        if (this.postok === true) { this.postokCSSArray[48] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[48] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[48] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[48] = false; this.DistalCSSarray[48] = false; this.OcclusalCSSarray[48] = false; this.LingualCSSarray[48] = false; this.MesialCSSarray[48] = false; this.teeth48 = false;
        this.crownCSSarray[48] = false;
        this.rootCSSarray[48] = false;
        this.severalDamagedCSSarray[48] = false;
        this.MildCSSarray[48] = false;
        this.ModerateCSSarray[48] = false;
        this.SevereCSSarray[48] = false;
        this.GingivalRecessionMildCSSArray[48] = false;
        this.GingivalRecessionModerateCSSArray[48] = false;
        this.GingivalRecessionSevereCSSArray[48] = false;
        this.PeriodontitisMildCSSArray[48] = false;
        this.PeriodontitisModerateCSSArray[48] = false;
        this.PeriodontitisSevereCSSArray[48] = false;
        this.GummSmileCSSArray[48] = false;
        this.GingivalOvergrowthCSSArray[48] = false;
        this.necrosisCSSArray[48] = false;
        this.SatisfactoryCSSArray[48] = false;
        this.UnsatisfactoryCSSArray[48] = false;
        this.ApicalLesionMildCSSArray[48] = false;
        this.ApicalLesionModerateCSSArray[48] = false;
        this.ApicalLesionSevereCSSArray[48] = false;
        this.BrokenInstrumentinCanalCSSArray[48] = false;
        this.InternalCSSarray[48] = false;
        this.ExternalCSSarray[48] = false;
        this.MissingTeethCSSArray[48] = false;
        this.ImpactedTeethCSSArray[48] = false;
        this.ImpactedInfectedTeethCSSArray[48] = false;
        this.LargeMaxillarySinusCSSArray[48] = false;
        this.okCSSArray[48] = false;
        this.otherCSSArray[48] = false;
        this.postokCSSArray[48] = false;
        this.postunsatisfactoryCSSArray[48] = false;
        this.DiscoloredCSSArray[48] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 48);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth47 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[47] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[47] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[47] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[47] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[47] = true; }

        if (this.rootSection === true) { this.rootCSSarray[47] = true; }
        if (this.crownSection === true) { this.crownCSSarray[47] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[47] = true; }

        if (this.MildSection === true) { this.MildCSSarray[47] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[47] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[47] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[47] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[47] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[47] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[47] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[47] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[47] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[47] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[47] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[47] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[47] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[47] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[47] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[47] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[47] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[47] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[47] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[47] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[47] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[47] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[47] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[47] = true;
        }

        if (this.okk === true) { this.okCSSArray[47] = true; }
        if (this.otherr === true) { this.otherCSSArray[47] = true; }

        if (this.postok === true) { this.postokCSSArray[47] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[47] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[47] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[47] = false; this.DistalCSSarray[47] = false; this.OcclusalCSSarray[47] = false; this.LingualCSSarray[47] = false; this.MesialCSSarray[47] = false; this.teeth47 = false;
        this.crownCSSarray[47] = false;
        this.rootCSSarray[47] = false;
        this.severalDamagedCSSarray[47] = false;
        this.MildCSSarray[47] = false;
        this.ModerateCSSarray[47] = false;
        this.SevereCSSarray[47] = false;
        this.GingivalRecessionMildCSSArray[47] = false;
        this.GingivalRecessionModerateCSSArray[47] = false;
        this.GingivalRecessionSevereCSSArray[47] = false;
        this.PeriodontitisMildCSSArray[47] = false;
        this.PeriodontitisModerateCSSArray[47] = false;
        this.PeriodontitisSevereCSSArray[47] = false;
        this.GummSmileCSSArray[47] = false;
        this.GingivalOvergrowthCSSArray[47] = false;
        this.necrosisCSSArray[47] = false;
        this.SatisfactoryCSSArray[47] = false;
        this.UnsatisfactoryCSSArray[47] = false;
        this.ApicalLesionMildCSSArray[47] = false;
        this.ApicalLesionModerateCSSArray[47] = false;
        this.ApicalLesionSevereCSSArray[47] = false;
        this.BrokenInstrumentinCanalCSSArray[47] = false;
        this.InternalCSSarray[47] = false;
        this.ExternalCSSarray[47] = false;
        this.MissingTeethCSSArray[47] = false;
        this.ImpactedTeethCSSArray[47] = false;
        this.ImpactedInfectedTeethCSSArray[47] = false;
        this.LargeMaxillarySinusCSSArray[47] = false;
        this.okCSSArray[47] = false;
        this.otherCSSArray[47] = false;
        this.postokCSSArray[47] = false;
        this.postunsatisfactoryCSSArray[47] = false;
        this.DiscoloredCSSArray[47] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 47);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth46 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[46] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[46] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[46] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[46] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[46] = true; }

        if (this.rootSection === true) { this.rootCSSarray[46] = true; }
        if (this.crownSection === true) { this.crownCSSarray[46] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[46] = true; }

        if (this.MildSection === true) { this.MildCSSarray[46] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[46] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[46] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[46] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[46] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[46] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[46] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[46] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[46] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[46] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[46] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[46] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[46] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[46] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[46] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[46] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[46] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[46] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[46] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[46] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[46] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[46] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[46] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[46] = true;
        }

        if (this.okk === true) { this.okCSSArray[46] = true; }
        if (this.otherr === true) { this.otherCSSArray[46] = true; }

        if (this.postok === true) { this.postokCSSArray[46] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[46] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[46] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[46] = false; this.DistalCSSarray[46] = false; this.OcclusalCSSarray[46] = false; this.LingualCSSarray[46] = false; this.MesialCSSarray[46] = false; this.teeth46 = false;
        this.crownCSSarray[46] = false;
        this.rootCSSarray[46] = false;
        this.severalDamagedCSSarray[46] = false;
        this.MildCSSarray[46] = false;
        this.ModerateCSSarray[46] = false;
        this.SevereCSSarray[46] = false;
        this.GingivalRecessionMildCSSArray[46] = false;
        this.GingivalRecessionModerateCSSArray[46] = false;
        this.GingivalRecessionSevereCSSArray[46] = false;
        this.PeriodontitisMildCSSArray[46] = false;
        this.PeriodontitisModerateCSSArray[46] = false;
        this.PeriodontitisSevereCSSArray[46] = false;
        this.GummSmileCSSArray[46] = false;
        this.GingivalOvergrowthCSSArray[46] = false;
        this.necrosisCSSArray[46] = false;
        this.SatisfactoryCSSArray[46] = false;
        this.UnsatisfactoryCSSArray[46] = false;
        this.ApicalLesionMildCSSArray[46] = false;
        this.ApicalLesionModerateCSSArray[46] = false;
        this.ApicalLesionSevereCSSArray[46] = false;
        this.BrokenInstrumentinCanalCSSArray[46] = false;
        this.InternalCSSarray[46] = false;
        this.ExternalCSSarray[46] = false;
        this.MissingTeethCSSArray[46] = false;
        this.ImpactedTeethCSSArray[46] = false;
        this.ImpactedInfectedTeethCSSArray[46] = false;
        this.LargeMaxillarySinusCSSArray[46] = false;
        this.okCSSArray[46] = false;
        this.otherCSSArray[46] = false;
        this.postokCSSArray[46] = false;
        this.postunsatisfactoryCSSArray[46] = false;
        this.DiscoloredCSSArray[46] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 46);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth45 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[45] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[45] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[45] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[45] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[45] = true; }

        if (this.rootSection === true) { this.rootCSSarray[45] = true; }
        if (this.crownSection === true) { this.crownCSSarray[45] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[45] = true; }

        if (this.MildSection === true) { this.MildCSSarray[45] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[45] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[45] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[45] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[45] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[45] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[45] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[45] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[45] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[45] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[45] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[45] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[45] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[45] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[45] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[45] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[45] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[45] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[45] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[45] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[45] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[45] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[45] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[45] = true;
        }

        if (this.okk === true) { this.okCSSArray[45] = true; }
        if (this.otherr === true) { this.otherCSSArray[45] = true; }

        if (this.postok === true) { this.postokCSSArray[45] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[45] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[45] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[45] = false; this.DistalCSSarray[45] = false; this.OcclusalCSSarray[45] = false; this.LingualCSSarray[45] = false; this.MesialCSSarray[45] = false; this.teeth45 = false;
        this.crownCSSarray[45] = false;
        this.rootCSSarray[45] = false;
        this.severalDamagedCSSarray[45] = false;
        this.MildCSSarray[45] = false;
        this.ModerateCSSarray[45] = false;
        this.SevereCSSarray[45] = false;
        this.GingivalRecessionMildCSSArray[45] = false;
        this.GingivalRecessionModerateCSSArray[45] = false;
        this.GingivalRecessionSevereCSSArray[45] = false;
        this.PeriodontitisMildCSSArray[45] = false;
        this.PeriodontitisModerateCSSArray[45] = false;
        this.PeriodontitisSevereCSSArray[45] = false;
        this.GummSmileCSSArray[45] = false;
        this.GingivalOvergrowthCSSArray[45] = false;
        this.necrosisCSSArray[45] = false;
        this.SatisfactoryCSSArray[45] = false;
        this.UnsatisfactoryCSSArray[45] = false;
        this.ApicalLesionMildCSSArray[45] = false;
        this.ApicalLesionModerateCSSArray[45] = false;
        this.ApicalLesionSevereCSSArray[45] = false;
        this.BrokenInstrumentinCanalCSSArray[45] = false;
        this.InternalCSSarray[45] = false;
        this.ExternalCSSarray[45] = false;
        this.MissingTeethCSSArray[45] = false;
        this.ImpactedTeethCSSArray[45] = false;
        this.ImpactedInfectedTeethCSSArray[45] = false;
        this.LargeMaxillarySinusCSSArray[45] = false;
        this.okCSSArray[45] = false;
        this.otherCSSArray[45] = false;
        this.postokCSSArray[45] = false;
        this.postunsatisfactoryCSSArray[45] = false;
        this.DiscoloredCSSArray[45] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 45);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth44 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[44] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[44] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[44] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[44] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[44] = true; }

        if (this.rootSection === true) { this.rootCSSarray[44] = true; }
        if (this.crownSection === true) { this.crownCSSarray[44] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[44] = true; }

        if (this.MildSection === true) { this.MildCSSarray[44] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[44] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[44] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[44] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[44] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[44] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[44] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[44] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[44] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[44] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[44] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[44] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[44] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[44] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[44] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[44] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[44] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[44] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[44] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[44] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[44] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[44] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[44] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[44] = true;
        }

        if (this.okk === true) { this.okCSSArray[44] = true; }
        if (this.otherr === true) { this.otherCSSArray[44] = true; }

        if (this.postok === true) { this.postokCSSArray[44] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[44] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[44] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[44] = false; this.DistalCSSarray[44] = false; this.OcclusalCSSarray[44] = false; this.LingualCSSarray[44] = false; this.MesialCSSarray[44] = false; this.teeth44 = false;
        this.crownCSSarray[44] = false;
        this.rootCSSarray[44] = false;
        this.severalDamagedCSSarray[44] = false;
        this.MildCSSarray[44] = false;
        this.ModerateCSSarray[44] = false;
        this.SevereCSSarray[44] = false;
        this.GingivalRecessionMildCSSArray[44] = false;
        this.GingivalRecessionModerateCSSArray[44] = false;
        this.GingivalRecessionSevereCSSArray[44] = false;
        this.PeriodontitisMildCSSArray[44] = false;
        this.PeriodontitisModerateCSSArray[44] = false;
        this.PeriodontitisSevereCSSArray[44] = false;
        this.GummSmileCSSArray[44] = false;
        this.GingivalOvergrowthCSSArray[44] = false;
        this.necrosisCSSArray[44] = false;
        this.SatisfactoryCSSArray[44] = false;
        this.UnsatisfactoryCSSArray[44] = false;
        this.ApicalLesionMildCSSArray[44] = false;
        this.ApicalLesionModerateCSSArray[44] = false;
        this.ApicalLesionSevereCSSArray[44] = false;
        this.BrokenInstrumentinCanalCSSArray[44] = false;
        this.InternalCSSarray[44] = false;
        this.ExternalCSSarray[44] = false;
        this.MissingTeethCSSArray[44] = false;
        this.ImpactedTeethCSSArray[44] = false;
        this.ImpactedInfectedTeethCSSArray[44] = false;
        this.LargeMaxillarySinusCSSArray[44] = false;
        this.okCSSArray[44] = false;
        this.otherCSSArray[44] = false;
        this.postokCSSArray[44] = false;
        this.postunsatisfactoryCSSArray[44] = false;
        this.DiscoloredCSSArray[44] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 44);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth43 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[43] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[43] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[43] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[43] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[43] = true; }

        if (this.rootSection === true) { this.rootCSSarray[43] = true; }
        if (this.crownSection === true) { this.crownCSSarray[43] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[43] = true; }

        if (this.MildSection === true) { this.MildCSSarray[43] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[43] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[43] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[43] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[43] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[43] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[43] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[43] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[43] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[43] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[43] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[43] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[43] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[43] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[43] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[43] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[43] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[43] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[43] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[43] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[43] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[43] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[43] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[43] = true;
        }

        if (this.okk === true) { this.okCSSArray[43] = true; }
        if (this.otherr === true) { this.otherCSSArray[43] = true; }

        if (this.postok === true) { this.postokCSSArray[43] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[43] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[43] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[43] = false; this.DistalCSSarray[43] = false; this.OcclusalCSSarray[43] = false; this.LingualCSSarray[43] = false; this.MesialCSSarray[43] = false; this.teeth43 = false;
        this.crownCSSarray[43] = false;
        this.rootCSSarray[43] = false;
        this.severalDamagedCSSarray[43] = false;
        this.MildCSSarray[43] = false;
        this.ModerateCSSarray[43] = false;
        this.SevereCSSarray[43] = false;
        this.GingivalRecessionMildCSSArray[43] = false;
        this.GingivalRecessionModerateCSSArray[43] = false;
        this.GingivalRecessionSevereCSSArray[43] = false;
        this.PeriodontitisMildCSSArray[43] = false;
        this.PeriodontitisModerateCSSArray[43] = false;
        this.PeriodontitisSevereCSSArray[43] = false;
        this.GummSmileCSSArray[43] = false;
        this.GingivalOvergrowthCSSArray[43] = false;
        this.necrosisCSSArray[43] = false;
        this.SatisfactoryCSSArray[43] = false;
        this.UnsatisfactoryCSSArray[43] = false;
        this.ApicalLesionMildCSSArray[43] = false;
        this.ApicalLesionModerateCSSArray[43] = false;
        this.ApicalLesionSevereCSSArray[43] = false;
        this.BrokenInstrumentinCanalCSSArray[43] = false;
        this.InternalCSSarray[43] = false;
        this.ExternalCSSarray[43] = false;
        this.MissingTeethCSSArray[43] = false;
        this.ImpactedTeethCSSArray[43] = false;
        this.ImpactedInfectedTeethCSSArray[43] = false;
        this.LargeMaxillarySinusCSSArray[43] = false;
        this.okCSSArray[43] = false;
        this.otherCSSArray[43] = false;
        this.postokCSSArray[43] = false;
        this.postunsatisfactoryCSSArray[43] = false;
        this.DiscoloredCSSArray[43] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 43);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth42 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[42] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[42] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[42] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[42] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[42] = true; }

        if (this.rootSection === true) { this.rootCSSarray[42] = true; }
        if (this.crownSection === true) { this.crownCSSarray[42] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[42] = true; }

        if (this.MildSection === true) { this.MildCSSarray[42] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[42] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[42] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[42] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[42] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[42] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[42] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[42] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[42] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[42] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[42] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[42] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[42] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[42] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[42] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[42] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[42] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[42] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[42] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[42] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[42] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[42] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[42] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[42] = true;
        }

        if (this.okk === true) { this.okCSSArray[42] = true; }
        if (this.otherr === true) { this.otherCSSArray[42] = true; }

        if (this.postok === true) { this.postokCSSArray[42] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[42] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[42] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[42] = false; this.DistalCSSarray[42] = false; this.OcclusalCSSarray[42] = false; this.LingualCSSarray[42] = false; this.MesialCSSarray[42] = false; this.teeth42 = false;
        this.crownCSSarray[42] = false;
        this.rootCSSarray[42] = false;
        this.severalDamagedCSSarray[42] = false;
        this.MildCSSarray[42] = false;
        this.ModerateCSSarray[42] = false;
        this.SevereCSSarray[42] = false;
        this.GingivalRecessionMildCSSArray[42] = false;
        this.GingivalRecessionModerateCSSArray[42] = false;
        this.GingivalRecessionSevereCSSArray[42] = false;
        this.PeriodontitisMildCSSArray[42] = false;
        this.PeriodontitisModerateCSSArray[42] = false;
        this.PeriodontitisSevereCSSArray[42] = false;
        this.GummSmileCSSArray[42] = false;
        this.GingivalOvergrowthCSSArray[42] = false;
        this.necrosisCSSArray[42] = false;
        this.SatisfactoryCSSArray[42] = false;
        this.UnsatisfactoryCSSArray[42] = false;
        this.ApicalLesionMildCSSArray[42] = false;
        this.ApicalLesionModerateCSSArray[42] = false;
        this.ApicalLesionSevereCSSArray[42] = false;
        this.BrokenInstrumentinCanalCSSArray[42] = false;
        this.InternalCSSarray[42] = false;
        this.ExternalCSSarray[42] = false;
        this.MissingTeethCSSArray[42] = false;
        this.ImpactedTeethCSSArray[42] = false;
        this.ImpactedInfectedTeethCSSArray[42] = false;
        this.LargeMaxillarySinusCSSArray[42] = false;
        this.okCSSArray[42] = false;
        this.otherCSSArray[42] = false;
        this.postokCSSArray[42] = false;
        this.postunsatisfactoryCSSArray[42] = false;
        this.DiscoloredCSSArray[42] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 42);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth41 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[41] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[41] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[41] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[41] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[41] = true; }

        if (this.rootSection === true) { this.rootCSSarray[41] = true; }
        if (this.crownSection === true) { this.crownCSSarray[41] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[41] = true; }

        if (this.MildSection === true) { this.MildCSSarray[41] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[41] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[41] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[41] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[41] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[41] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[41] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[41] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[41] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[41] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[41] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[41] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[41] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[41] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[41] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[41] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[41] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[41] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[41] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[41] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[41] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[41] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[41] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[41] = true;
        }

        if (this.okk === true) { this.okCSSArray[41] = true; }
        if (this.otherr === true) { this.otherCSSArray[41] = true; }

        if (this.postok === true) { this.postokCSSArray[41] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[41] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[41] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[41] = false; this.DistalCSSarray[41] = false; this.OcclusalCSSarray[41] = false; this.LingualCSSarray[41] = false; this.MesialCSSarray[41] = false; this.teeth41 = false;
        this.crownCSSarray[41] = false;
        this.rootCSSarray[41] = false;
        this.severalDamagedCSSarray[41] = false;
        this.MildCSSarray[41] = false;
        this.ModerateCSSarray[41] = false;
        this.SevereCSSarray[41] = false;
        this.GingivalRecessionMildCSSArray[41] = false;
        this.GingivalRecessionModerateCSSArray[41] = false;
        this.GingivalRecessionSevereCSSArray[41] = false;
        this.PeriodontitisMildCSSArray[41] = false;
        this.PeriodontitisModerateCSSArray[41] = false;
        this.PeriodontitisSevereCSSArray[41] = false;
        this.GummSmileCSSArray[41] = false;
        this.GingivalOvergrowthCSSArray[41] = false;
        this.necrosisCSSArray[41] = false;
        this.SatisfactoryCSSArray[41] = false;
        this.UnsatisfactoryCSSArray[41] = false;
        this.ApicalLesionMildCSSArray[41] = false;
        this.ApicalLesionModerateCSSArray[41] = false;
        this.ApicalLesionSevereCSSArray[41] = false;
        this.BrokenInstrumentinCanalCSSArray[41] = false;
        this.InternalCSSarray[41] = false;
        this.ExternalCSSarray[41] = false;
        this.MissingTeethCSSArray[41] = false;
        this.ImpactedTeethCSSArray[41] = false;
        this.ImpactedInfectedTeethCSSArray[41] = false;
        this.LargeMaxillarySinusCSSArray[41] = false;
        this.okCSSArray[41] = false;
        this.otherCSSArray[41] = false;
        this.postokCSSArray[41] = false;
        this.postunsatisfactoryCSSArray[41] = false;
        this.DiscoloredCSSArray[41] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 41);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth31 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[31] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[31] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[31] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[31] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[31] = true; }

        if (this.rootSection === true) { this.rootCSSarray[31] = true; }
        if (this.crownSection === true) { this.crownCSSarray[31] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[31] = true; }

        if (this.MildSection === true) { this.MildCSSarray[31] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[31] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[31] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[31] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[31] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[31] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[31] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[31] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[31] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[31] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[31] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[31] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[31] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[31] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[31] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[31] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[31] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[31] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[31] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[31] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[31] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[31] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[31] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[31] = true;
        }
        if (this.okk === true) { this.okCSSArray[31] = true; }
        if (this.otherr === true) { this.otherCSSArray[31] = true; }

        if (this.postok === true) { this.postokCSSArray[31] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[31] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[31] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[31] = false; this.DistalCSSarray[31] = false; this.OcclusalCSSarray[31] = false; this.LingualCSSarray[31] = false; this.MesialCSSarray[31] = false; this.teeth31 = false;
        this.crownCSSarray[31] = false;
        this.rootCSSarray[31] = false;
        this.severalDamagedCSSarray[31] = false;
        this.MildCSSarray[31] = false;
        this.ModerateCSSarray[31] = false;
        this.SevereCSSarray[31] = false;
        this.GingivalRecessionMildCSSArray[31] = false;
        this.GingivalRecessionModerateCSSArray[31] = false;
        this.GingivalRecessionSevereCSSArray[31] = false;
        this.PeriodontitisMildCSSArray[31] = false;
        this.PeriodontitisModerateCSSArray[31] = false;
        this.PeriodontitisSevereCSSArray[31] = false;
        this.GummSmileCSSArray[31] = false;
        this.GingivalOvergrowthCSSArray[31] = false;
        this.necrosisCSSArray[31] = false;
        this.SatisfactoryCSSArray[31] = false;
        this.UnsatisfactoryCSSArray[31] = false;
        this.ApicalLesionMildCSSArray[31] = false;
        this.ApicalLesionModerateCSSArray[31] = false;
        this.ApicalLesionSevereCSSArray[31] = false;
        this.BrokenInstrumentinCanalCSSArray[31] = false;
        this.InternalCSSarray[31] = false;
        this.ExternalCSSarray[31] = false;
        this.MissingTeethCSSArray[31] = false;
        this.ImpactedTeethCSSArray[31] = false;
        this.ImpactedInfectedTeethCSSArray[31] = false;
        this.LargeMaxillarySinusCSSArray[31] = false;
        this.okCSSArray[31] = false;
        this.otherCSSArray[31] = false;
        this.postokCSSArray[31] = false;
        this.postunsatisfactoryCSSArray[31] = false;
        this.DiscoloredCSSArray[31] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 31);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth32 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[32] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[32] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[32] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[32] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[32] = true; }

        if (this.rootSection === true) { this.rootCSSarray[32] = true; }
        if (this.crownSection === true) { this.crownCSSarray[32] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[32] = true; }

        if (this.MildSection === true) { this.MildCSSarray[32] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[32] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[32] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[32] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[32] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[32] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[32] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[32] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[32] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[32] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[32] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[32] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[32] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[32] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[32] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[32] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[32] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[32] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[32] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[32] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[32] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[32] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[32] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[32] = true;
        }
        if (this.okk === true) { this.okCSSArray[32] = true; }
        if (this.otherr === true) { this.otherCSSArray[32] = true; }

        if (this.postok === true) { this.postokCSSArray[32] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[32] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[32] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[32] = false; this.DistalCSSarray[32] = false; this.OcclusalCSSarray[32] = false; this.LingualCSSarray[32] = false; this.MesialCSSarray[32] = false; this.teeth32 = false;
        this.crownCSSarray[32] = false;
        this.rootCSSarray[32] = false;
        this.severalDamagedCSSarray[32] = false;
        this.MildCSSarray[32] = false;
        this.ModerateCSSarray[32] = false;
        this.SevereCSSarray[32] = false;
        this.GingivalRecessionMildCSSArray[32] = false;
        this.GingivalRecessionModerateCSSArray[32] = false;
        this.GingivalRecessionSevereCSSArray[32] = false;
        this.PeriodontitisMildCSSArray[32] = false;
        this.PeriodontitisModerateCSSArray[32] = false;
        this.PeriodontitisSevereCSSArray[32] = false;
        this.GummSmileCSSArray[32] = false;
        this.GingivalOvergrowthCSSArray[32] = false;
        this.necrosisCSSArray[32] = false;
        this.SatisfactoryCSSArray[32] = false;
        this.UnsatisfactoryCSSArray[32] = false;
        this.ApicalLesionMildCSSArray[32] = false;
        this.ApicalLesionModerateCSSArray[32] = false;
        this.ApicalLesionSevereCSSArray[32] = false;
        this.BrokenInstrumentinCanalCSSArray[32] = false;
        this.InternalCSSarray[32] = false;
        this.ExternalCSSarray[32] = false;
        this.MissingTeethCSSArray[32] = false;
        this.ImpactedTeethCSSArray[32] = false;
        this.ImpactedInfectedTeethCSSArray[32] = false;
        this.LargeMaxillarySinusCSSArray[32] = false;
        this.okCSSArray[32] = false;
        this.otherCSSArray[32] = false;
        this.postokCSSArray[32] = false;
        this.postunsatisfactoryCSSArray[32] = false;
        this.DiscoloredCSSArray[32] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 32);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth33 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[33] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[33] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[33] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[33] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[33] = true; }

        if (this.rootSection === true) { this.rootCSSarray[33] = true; }
        if (this.crownSection === true) { this.crownCSSarray[33] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[33] = true; }

        if (this.MildSection === true) { this.MildCSSarray[33] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[33] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[33] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[33] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[33] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[33] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[33] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[33] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[33] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[33] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[33] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[33] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[33] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[33] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[33] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[33] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[33] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[33] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[33] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[33] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[33] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[33] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[33] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[33] = true;
        }
        if (this.okk === true) { this.okCSSArray[33] = true; }
        if (this.otherr === true) { this.otherCSSArray[33] = true; }

        if (this.postok === true) { this.postokCSSArray[33] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[33] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[33] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[33] = false; this.DistalCSSarray[33] = false; this.OcclusalCSSarray[33] = false; this.LingualCSSarray[33] = false; this.MesialCSSarray[33] = false; this.teeth33 = false;
        this.crownCSSarray[33] = false;
        this.rootCSSarray[33] = false;
        this.severalDamagedCSSarray[33] = false;
        this.MildCSSarray[33] = false;
        this.ModerateCSSarray[33] = false;
        this.SevereCSSarray[33] = false;
        this.GingivalRecessionMildCSSArray[33] = false;
        this.GingivalRecessionModerateCSSArray[33] = false;
        this.GingivalRecessionSevereCSSArray[33] = false;
        this.PeriodontitisMildCSSArray[33] = false;
        this.PeriodontitisModerateCSSArray[33] = false;
        this.PeriodontitisSevereCSSArray[33] = false;
        this.GummSmileCSSArray[33] = false;
        this.GingivalOvergrowthCSSArray[33] = false;
        this.necrosisCSSArray[33] = false;
        this.SatisfactoryCSSArray[33] = false;
        this.UnsatisfactoryCSSArray[33] = false;
        this.ApicalLesionMildCSSArray[33] = false;
        this.ApicalLesionModerateCSSArray[33] = false;
        this.ApicalLesionSevereCSSArray[33] = false;
        this.BrokenInstrumentinCanalCSSArray[33] = false;
        this.InternalCSSarray[33] = false;
        this.ExternalCSSarray[33] = false;
        this.MissingTeethCSSArray[33] = false;
        this.ImpactedTeethCSSArray[33] = false;
        this.ImpactedInfectedTeethCSSArray[33] = false;
        this.LargeMaxillarySinusCSSArray[33] = false;
        this.okCSSArray[33] = false;
        this.otherCSSArray[33] = false;
        this.postokCSSArray[33] = false;
        this.postunsatisfactoryCSSArray[33] = false;
        this.DiscoloredCSSArray[33] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 33);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth34 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[34] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[34] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[34] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[34] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[34] = true; }

        if (this.rootSection === true) { this.rootCSSarray[34] = true; }
        if (this.crownSection === true) { this.crownCSSarray[34] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[34] = true; }

        if (this.MildSection === true) { this.MildCSSarray[34] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[34] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[34] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[34] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[34] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[34] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[34] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[34] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[34] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[34] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[34] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[34] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[34] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[34] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[34] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[34] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[34] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[34] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[34] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[34] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[34] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[34] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[34] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[34] = true;
        }

        if (this.okk === true) { this.okCSSArray[34] = true; }
        if (this.otherr === true) { this.otherCSSArray[34] = true; }

        if (this.postok === true) { this.postokCSSArray[34] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[34] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[34] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[34] = false; this.DistalCSSarray[34] = false; this.OcclusalCSSarray[34] = false; this.LingualCSSarray[34] = false; this.MesialCSSarray[34] = false; this.teeth34 = false;
        this.crownCSSarray[34] = false;
        this.rootCSSarray[34] = false;
        this.severalDamagedCSSarray[34] = false;
        this.MildCSSarray[34] = false;
        this.ModerateCSSarray[34] = false;
        this.SevereCSSarray[34] = false;
        this.GingivalRecessionMildCSSArray[34] = false;
        this.GingivalRecessionModerateCSSArray[34] = false;
        this.GingivalRecessionSevereCSSArray[34] = false;
        this.PeriodontitisMildCSSArray[34] = false;
        this.PeriodontitisModerateCSSArray[34] = false;
        this.PeriodontitisSevereCSSArray[34] = false;
        this.GummSmileCSSArray[34] = false;
        this.GingivalOvergrowthCSSArray[34] = false;
        this.necrosisCSSArray[34] = false;
        this.SatisfactoryCSSArray[34] = false;
        this.UnsatisfactoryCSSArray[34] = false;
        this.ApicalLesionMildCSSArray[34] = false;
        this.ApicalLesionModerateCSSArray[34] = false;
        this.ApicalLesionSevereCSSArray[34] = false;
        this.BrokenInstrumentinCanalCSSArray[34] = false;
        this.InternalCSSarray[34] = false;
        this.ExternalCSSarray[34] = false;
        this.MissingTeethCSSArray[34] = false;
        this.ImpactedTeethCSSArray[34] = false;
        this.ImpactedInfectedTeethCSSArray[34] = false;
        this.LargeMaxillarySinusCSSArray[34] = false;
        this.okCSSArray[34] = false;
        this.otherCSSArray[34] = false;
        this.postokCSSArray[34] = false;
        this.postunsatisfactoryCSSArray[34] = false;
        this.DiscoloredCSSArray[34] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 34);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth35 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[35] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[35] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[35] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[35] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[35] = true; }

        if (this.rootSection === true) { this.rootCSSarray[35] = true; }
        if (this.crownSection === true) { this.crownCSSarray[35] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[35] = true; }

        if (this.MildSection === true) { this.MildCSSarray[35] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[35] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[35] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[35] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[35] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[35] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[35] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[35] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[35] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[35] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[35] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[35] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[35] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[35] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[35] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[35] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[35] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[35] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[35] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[35] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[35] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[35] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[35] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[35] = true;
        }

        if (this.okk === true) { this.okCSSArray[35] = true; }
        if (this.otherr === true) { this.otherCSSArray[35] = true; }

        if (this.postok === true) { this.postokCSSArray[35] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[35] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[35] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[35] = false; this.DistalCSSarray[35] = false; this.OcclusalCSSarray[35] = false; this.LingualCSSarray[35] = false; this.MesialCSSarray[35] = false; this.teeth35 = false;
        this.crownCSSarray[35] = false;
        this.rootCSSarray[35] = false;
        this.severalDamagedCSSarray[35] = false;
        this.MildCSSarray[35] = false;
        this.ModerateCSSarray[35] = false;
        this.SevereCSSarray[35] = false;
        this.GingivalRecessionMildCSSArray[35] = false;
        this.GingivalRecessionModerateCSSArray[35] = false;
        this.GingivalRecessionSevereCSSArray[35] = false;
        this.PeriodontitisMildCSSArray[35] = false;
        this.PeriodontitisModerateCSSArray[35] = false;
        this.PeriodontitisSevereCSSArray[35] = false;
        this.GummSmileCSSArray[35] = false;
        this.GingivalOvergrowthCSSArray[35] = false;
        this.necrosisCSSArray[35] = false;
        this.SatisfactoryCSSArray[35] = false;
        this.UnsatisfactoryCSSArray[35] = false;
        this.ApicalLesionMildCSSArray[35] = false;
        this.ApicalLesionModerateCSSArray[35] = false;
        this.ApicalLesionSevereCSSArray[35] = false;
        this.BrokenInstrumentinCanalCSSArray[35] = false;
        this.InternalCSSarray[35] = false;
        this.ExternalCSSarray[35] = false;
        this.MissingTeethCSSArray[35] = false;
        this.ImpactedTeethCSSArray[35] = false;
        this.ImpactedInfectedTeethCSSArray[35] = false;
        this.LargeMaxillarySinusCSSArray[35] = false;
        this.okCSSArray[35] = false;
        this.otherCSSArray[35] = false;
        this.postokCSSArray[35] = false;
        this.postunsatisfactoryCSSArray[35] = false;
        this.DiscoloredCSSArray[35] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 35);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth36 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[36] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[36] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[36] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[36] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[36] = true; }

        if (this.rootSection === true) { this.rootCSSarray[36] = true; }
        if (this.crownSection === true) { this.crownCSSarray[36] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[36] = true; }

        if (this.MildSection === true) { this.MildCSSarray[36] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[36] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[36] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[36] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[36] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[36] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[36] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[36] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[36] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[36] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[36] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[36] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[36] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[36] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[36] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[36] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[36] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[36] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[36] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[36] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[36] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[36] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[36] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[36] = true;
        }

        if (this.okk === true) { this.okCSSArray[36] = true; }
        if (this.otherr === true) { this.otherCSSArray[36] = true; }

        if (this.postok === true) { this.postokCSSArray[36] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[36] = true; }

        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[36] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[36] = false; this.DistalCSSarray[36] = false; this.OcclusalCSSarray[36] = false; this.LingualCSSarray[36] = false; this.MesialCSSarray[36] = false; this.teeth36 = false;
        this.crownCSSarray[36] = false;
        this.rootCSSarray[36] = false;
        this.severalDamagedCSSarray[36] = false;
        this.MildCSSarray[36] = false;
        this.ModerateCSSarray[36] = false;
        this.SevereCSSarray[36] = false;
        this.GingivalRecessionMildCSSArray[36] = false;
        this.GingivalRecessionModerateCSSArray[36] = false;
        this.GingivalRecessionSevereCSSArray[36] = false;
        this.PeriodontitisMildCSSArray[36] = false;
        this.PeriodontitisModerateCSSArray[36] = false;
        this.PeriodontitisSevereCSSArray[36] = false;
        this.GummSmileCSSArray[36] = false;
        this.GingivalOvergrowthCSSArray[36] = false;
        this.necrosisCSSArray[36] = false;
        this.SatisfactoryCSSArray[36] = false;
        this.UnsatisfactoryCSSArray[36] = false;
        this.ApicalLesionMildCSSArray[36] = false;
        this.ApicalLesionModerateCSSArray[36] = false;
        this.ApicalLesionSevereCSSArray[36] = false;
        this.BrokenInstrumentinCanalCSSArray[36] = false;
        this.InternalCSSarray[36] = false;
        this.ExternalCSSarray[36] = false;
        this.MissingTeethCSSArray[36] = false;
        this.ImpactedTeethCSSArray[36] = false;
        this.ImpactedInfectedTeethCSSArray[36] = false;
        this.LargeMaxillarySinusCSSArray[36] = false;
        this.okCSSArray[36] = false;
        this.otherCSSArray[36] = false;
        this.postokCSSArray[36] = false;
        this.postunsatisfactoryCSSArray[36] = false;
        this.DiscoloredCSSArray[36] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 36);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth37 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[37] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[37] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[37] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[37] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[37] = true; }

        if (this.rootSection === true) { this.rootCSSarray[37] = true; }
        if (this.crownSection === true) { this.crownCSSarray[37] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[37] = true; }

        if (this.MildSection === true) { this.MildCSSarray[37] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[37] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[37] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[37] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[37] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[37] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[37] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[37] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[37] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[37] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[37] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[37] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[37] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[37] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[37] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[37] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[37] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[37] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[37] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[37] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[37] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[37] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[37] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[37] = true;
        }

        if (this.okk === true) { this.okCSSArray[37] = true; }
        if (this.otherr === true) { this.otherCSSArray[37] = true; }

        if (this.postok === true) { this.postokCSSArray[37] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[37] = true; }


        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[37] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[37] = false; this.DistalCSSarray[37] = false; this.OcclusalCSSarray[37] = false; this.LingualCSSarray[37] = false; this.MesialCSSarray[37] = false; this.teeth37 = false;
        this.crownCSSarray[37] = false;
        this.rootCSSarray[37] = false;
        this.severalDamagedCSSarray[37] = false;
        this.MildCSSarray[37] = false;
        this.ModerateCSSarray[37] = false;
        this.SevereCSSarray[37] = false;
        this.GingivalRecessionMildCSSArray[37] = false;
        this.GingivalRecessionModerateCSSArray[37] = false;
        this.GingivalRecessionSevereCSSArray[37] = false;
        this.PeriodontitisMildCSSArray[37] = false;
        this.PeriodontitisModerateCSSArray[37] = false;
        this.PeriodontitisSevereCSSArray[37] = false;
        this.GummSmileCSSArray[37] = false;
        this.GingivalOvergrowthCSSArray[37] = false;
        this.necrosisCSSArray[37] = false;
        this.SatisfactoryCSSArray[37] = false;
        this.UnsatisfactoryCSSArray[37] = false;
        this.ApicalLesionMildCSSArray[37] = false;
        this.ApicalLesionModerateCSSArray[37] = false;
        this.ApicalLesionSevereCSSArray[37] = false;
        this.BrokenInstrumentinCanalCSSArray[37] = false;
        this.InternalCSSarray[37] = false;
        this.ExternalCSSarray[37] = false;
        this.MissingTeethCSSArray[37] = false;
        this.ImpactedTeethCSSArray[37] = false;
        this.ImpactedInfectedTeethCSSArray[37] = false;
        this.LargeMaxillarySinusCSSArray[37] = false;
        this.okCSSArray[37] = false;
        this.otherCSSArray[37] = false;
        this.postokCSSArray[37] = false;
        this.postunsatisfactoryCSSArray[37] = false;
        this.DiscoloredCSSArray[37] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 37);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.teeth38 = true; this.selectedTeethValue.push(teethValue);
        if (this.Mesialchecked === true) { this.MesialCSSarray[38] = true; }
        if (this.Distalchecked === true) { this.DistalCSSarray[38] = true; }
        if (this.Lingualchecked === true) { this.LingualCSSarray[38] = true; }
        if (this.Occlusalchecked === true) { this.OcclusalCSSarray[38] = true; }
        if (this.Buccalchecked === true) { this.BuccalCSSarray[38] = true; }

        if (this.rootSection === true) { this.rootCSSarray[38] = true; }
        if (this.crownSection === true) { this.crownCSSarray[38] = true; }
        if (this.severalDamaged === true) { this.severalDamagedCSSarray[38] = true; }

        if (this.MildSection === true) { this.MildCSSarray[38] = true; }
        if (this.ModerateSection === true) { this.ModerateCSSarray[38] = true; }
        if (this.SevereSection === true) { this.SevereCSSarray[38] = true; }

        if (this.GingivalRecessionMild === true) { this.GingivalRecessionMildCSSArray[38] = true; }
        if (this.GingivalRecessionModerate === true) { this.GingivalRecessionModerateCSSArray[38] = true; }
        if (this.GingivalRecessionSevere === true) { this.GingivalRecessionSevereCSSArray[38] = true; }

        if (this.PeriodontitisMild === true) { this.PeriodontitisMildCSSArray[38] = true; }
        if (this.PeriodontitisModerate === true) { this.PeriodontitisModerateCSSArray[38] = true; }
        if (this.PeriodontitisSevere === true) { this.PeriodontitisSevereCSSArray[38] = true; }

        if (this.GummSmileActive === true) { this.GummSmileCSSArray[38] = true; }
        if (this.GingivalOvergrowthActive === true) { this.GingivalOvergrowthCSSArray[38] = true; }

        if (this.necrosis === true) { this.necrosisCSSArray[38] = true; }

        if (this.saticfactory === true) { this.SatisfactoryCSSArray[38] = true; }
        if (this.unsatisfactory === true) { this.UnsatisfactoryCSSArray[38] = true; }

        if (this.ApicalLesionMild === true) { this.ApicalLesionMildCSSArray[38] = true; }
        if (this.ApicalLesionModerate === true) { this.ApicalLesionModerateCSSArray[38] = true; }
        if (this.ApicalLesionSevere === true) { this.ApicalLesionSevereCSSArray[38] = true; }
        if (this.BrokenInstrumentinCanal === true) { this.BrokenInstrumentinCanalCSSArray[38] = true; }
        if (this.Internalchecked === true) { this.InternalCSSarray[38] = true; }
        if (this.Externalchecked === true) { this.ExternalCSSarray[38] = true; }

        if (this.MissingTeethActive === true) { this.MissingTeethCSSArray[38] = true; }
        if (this.ImpactedTeethActive === true) { this.ImpactedTeethCSSArray[38] = true; }
        if (this.ImpactedInfectedTeethActive === true) { this.ImpactedInfectedTeethCSSArray[38] = true; }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[38] = true;
        }

        if (this.okk === true) { this.okCSSArray[38] = true; }
        if (this.otherr === true) { this.otherCSSArray[38] = true; }

        if (this.postok === true) { this.postokCSSArray[38] = true; }
        if (this.postunsatisfactory === true) { this.postunsatisfactoryCSSArray[38] = true; }
        if (this.DiscoloredTeethActive === true) { this.DiscoloredCSSArray[38] = true; }


      }
      else {
        this.ColorCssFn(mode); this.vaneerFnValue(mode); this.crownFnValue(mode); this.onlayFnValue(mode); this.BuccalCSSarray[38] = false; this.DistalCSSarray[38] = false; this.OcclusalCSSarray[38] = false; this.LingualCSSarray[38] = false; this.MesialCSSarray[38] = false; this.teeth38 = false;
        this.crownCSSarray[38] = false;
        this.rootCSSarray[38] = false;
        this.severalDamagedCSSarray[38] = false;
        this.MildCSSarray[38] = false;
        this.ModerateCSSarray[38] = false;
        this.SevereCSSarray[38] = false;
        this.GingivalRecessionMildCSSArray[38] = false;
        this.GingivalRecessionModerateCSSArray[38] = false;
        this.GingivalRecessionSevereCSSArray[38] = false;
        this.PeriodontitisMildCSSArray[38] = false;
        this.PeriodontitisModerateCSSArray[38] = false;
        this.PeriodontitisSevereCSSArray[38] = false;
        this.GummSmileCSSArray[38] = false;
        this.GingivalOvergrowthCSSArray[38] = false;
        this.necrosisCSSArray[38] = false;
        this.SatisfactoryCSSArray[38] = false;
        this.UnsatisfactoryCSSArray[38] = false;
        this.ApicalLesionMildCSSArray[38] = false;
        this.ApicalLesionModerateCSSArray[38] = false;
        this.ApicalLesionSevereCSSArray[38] = false;
        this.BrokenInstrumentinCanalCSSArray[38] = false;
        this.InternalCSSarray[38] = false;
        this.ExternalCSSarray[38] = false;
        this.MissingTeethCSSArray[38] = false;
        this.ImpactedTeethCSSArray[38] = false;
        this.ImpactedInfectedTeethCSSArray[38] = false;
        this.LargeMaxillarySinusCSSArray[38] = false;
        this.okCSSArray[38] = false;
        this.otherCSSArray[38] = false;
        this.postokCSSArray[38] = false;
        this.postunsatisfactoryCSSArray[38] = false;
        this.DiscoloredCSSArray[38] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 38);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    this.selectedTeethValueString = this.selectedTeethValue.join();
  }

  multiSelectTeeth(id) {
    if (id === '1') {
      if (this.teeth18 === false && this.teeth17 === false && this.teeth16 === false && this.teeth15 === false &&
        this.teeth14 === false && this.teeth13 === false && this.teeth12 === false && this.teeth11 === false) {
        this.teeth18 = true; this.teeth17 = true; this.teeth16 = true; this.teeth15 = true; this.teeth14 = true; this.teeth13 = true;
        this.teeth12 = true; this.teeth11 = true;
        this.selectedTeethValue.push(18, 17, 16, 15, 14, 13, 12, 11);
        if (this.Buccalchecked === true) {
          this.BuccalCSSarray[18] = true; this.BuccalCSSarray[17] = true; this.BuccalCSSarray[16] = true; this.BuccalCSSarray[15] = true;
          this.BuccalCSSarray[14] = true; this.BuccalCSSarray[13] = true; this.BuccalCSSarray[12] = true; this.BuccalCSSarray[11] = true;
        }
        if (this.Mesialchecked === true) {
          this.MesialCSSarray[18] = true; this.MesialCSSarray[17] = true; this.MesialCSSarray[16] = true; this.MesialCSSarray[15] = true;
          this.MesialCSSarray[14] = true; this.MesialCSSarray[13] = true; this.MesialCSSarray[12] = true; this.MesialCSSarray[11] = true;
        }
        if (this.Distalchecked === true) {
          this.DistalCSSarray[18] = true; this.DistalCSSarray[17] = true; this.DistalCSSarray[16] = true; this.DistalCSSarray[15] = true;
          this.DistalCSSarray[14] = true; this.DistalCSSarray[13] = true; this.DistalCSSarray[12] = true; this.DistalCSSarray[11] = true;
        }
        if (this.Lingualchecked === true) {
          this.LingualCSSarray[18] = true; this.LingualCSSarray[17] = true; this.LingualCSSarray[16] = true;
          this.LingualCSSarray[15] = true; this.LingualCSSarray[14] = true; this.LingualCSSarray[13] = true;
          this.LingualCSSarray[12] = true; this.LingualCSSarray[11] = true;
        }
        if (this.Occlusalchecked === true) {
          this.OcclusalCSSarray[18] = true; this.OcclusalCSSarray[17] = true;
          this.OcclusalCSSarray[16] = true;
          this.OcclusalCSSarray[15] = true; this.OcclusalCSSarray[14] = true; this.OcclusalCSSarray[13] = true;
          this.OcclusalCSSarray[12] = true; this.OcclusalCSSarray[11] = true;
        }
        if (this.rootSection === true) {
          this.rootCSSarray[18] = true; this.rootCSSarray[17] = true; this.rootCSSarray[16] = true; this.rootCSSarray[15] = true;
          this.rootCSSarray[14] = true; this.rootCSSarray[13] = true; this.rootCSSarray[12] = true; this.rootCSSarray[11] = true;
        }
        if (this.crownSection === true) {
          this.crownCSSarray[18] = true; this.crownCSSarray[17] = true; this.crownCSSarray[16] = true; this.crownCSSarray[15] = true;
          this.crownCSSarray[14] = true; this.crownCSSarray[13] = true; this.crownCSSarray[12] = true;
          this.crownCSSarray[11] = true;
        }
        if (this.severalDamaged === true) {
          this.severalDamagedCSSarray[18] = true; this.severalDamagedCSSarray[17] = true; this.severalDamagedCSSarray[16] = true;
          this.severalDamagedCSSarray[15] = true; this.severalDamagedCSSarray[14] = true; this.severalDamagedCSSarray[13] = true;
          this.severalDamagedCSSarray[12] = true; this.severalDamagedCSSarray[11] = true;
        }
        if (this.MildSection === true) {
          this.MildCSSarray[18] = true; this.MildCSSarray[17] = true; this.MildCSSarray[16] = true; this.MildCSSarray[15] = true;
          this.MildCSSarray[14] = true; this.MildCSSarray[13] = true; this.MildCSSarray[12] = true; this.MildCSSarray[11] = true;
        }
        if (this.ModerateSection === true) {
          this.ModerateCSSarray[18] = true; this.ModerateCSSarray[17] = true; this.ModerateCSSarray[16] = true;
          this.ModerateCSSarray[15] = true; this.ModerateCSSarray[14] = true; this.ModerateCSSarray[13] = true;
          this.ModerateCSSarray[12] = true; this.ModerateCSSarray[11] = true;
        }
        if (this.SevereSection === true) {
          this.SevereCSSarray[18] = true; this.SevereCSSarray[17] = true; this.SevereCSSarray[16] = true;
          this.SevereCSSarray[15] = true; this.SevereCSSarray[14] = true; this.SevereCSSarray[13] = true;
          this.SevereCSSarray[12] = true; this.SevereCSSarray[11] = true;
        }
        if (this.GingivalRecessionMild === true) {
          this.GingivalRecessionMildCSSArray[18] = true; this.GingivalRecessionMildCSSArray[17] = true;
          this.GingivalRecessionMildCSSArray[16] = true; this.GingivalRecessionMildCSSArray[15] = true;
          this.GingivalRecessionMildCSSArray[14] = true; this.GingivalRecessionMildCSSArray[13] = true;
          this.GingivalRecessionMildCSSArray[12] = true; this.GingivalRecessionMildCSSArray[11] = true;
        }
        if (this.GingivalRecessionModerate === true) {
          this.GingivalRecessionModerateCSSArray[18] = true; this.GingivalRecessionModerateCSSArray[17] = true;
          this.GingivalRecessionModerateCSSArray[16] = true; this.GingivalRecessionModerateCSSArray[15] = true;
          this.GingivalRecessionModerateCSSArray[14] = true; this.GingivalRecessionModerateCSSArray[13] = true;
          this.GingivalRecessionModerateCSSArray[12] = true; this.GingivalRecessionModerateCSSArray[11] = true;
        }
        if (this.GingivalRecessionSevere === true) {
          this.GingivalRecessionSevereCSSArray[18] = true; this.GingivalRecessionSevereCSSArray[17] = true;
          this.GingivalRecessionSevereCSSArray[16] = true; this.GingivalRecessionSevereCSSArray[15] = true;
          this.GingivalRecessionSevereCSSArray[14] = true; this.GingivalRecessionSevereCSSArray[13] = true;
          this.GingivalRecessionSevereCSSArray[12] = true; this.GingivalRecessionSevereCSSArray[11] = true;
        }

        if (this.PeriodontitisMild === true) {
          this.PeriodontitisMildCSSArray[18] = true;
          this.PeriodontitisMildCSSArray[17] = true;
          this.PeriodontitisMildCSSArray[16] = true;
          this.PeriodontitisMildCSSArray[15] = true;
          this.PeriodontitisMildCSSArray[14] = true;
          this.PeriodontitisMildCSSArray[13] = true;
          this.PeriodontitisMildCSSArray[12] = true;
          this.PeriodontitisMildCSSArray[11] = true;
        }
        if (this.PeriodontitisModerate === true) {
          this.PeriodontitisModerateCSSArray[18] = true;
          this.PeriodontitisModerateCSSArray[17] = true;
          this.PeriodontitisModerateCSSArray[16] = true;
          this.PeriodontitisModerateCSSArray[15] = true;
          this.PeriodontitisModerateCSSArray[14] = true;
          this.PeriodontitisModerateCSSArray[13] = true;
          this.PeriodontitisModerateCSSArray[12] = true;
          this.PeriodontitisModerateCSSArray[11] = true;
        }
        if (this.PeriodontitisSevere === true) {
          this.PeriodontitisSevereCSSArray[18] = true;
          this.PeriodontitisSevereCSSArray[17] = true;
          this.PeriodontitisSevereCSSArray[16] = true;
          this.PeriodontitisSevereCSSArray[15] = true;
          this.PeriodontitisSevereCSSArray[14] = true;
          this.PeriodontitisSevereCSSArray[13] = true;
          this.PeriodontitisSevereCSSArray[12] = true;
          this.PeriodontitisSevereCSSArray[11] = true;
        }
        if (this.GummSmileActive === true) {
          this.GummSmileCSSArray[18] = true;
          this.GummSmileCSSArray[17] = true;
          this.GummSmileCSSArray[16] = true;
          this.GummSmileCSSArray[15] = true;
          this.GummSmileCSSArray[14] = true;
          this.GummSmileCSSArray[13] = true;
          this.GummSmileCSSArray[12] = true;
          this.GummSmileCSSArray[11] = true;
        }
        if (this.GingivalOvergrowthActive === true) {
          this.GingivalOvergrowthCSSArray[18] = true;
          this.GingivalOvergrowthCSSArray[17] = true;
          this.GingivalOvergrowthCSSArray[16] = true;
          this.GingivalOvergrowthCSSArray[15] = true;
          this.GingivalOvergrowthCSSArray[14] = true;
          this.GingivalOvergrowthCSSArray[13] = true;
          this.GingivalOvergrowthCSSArray[12] = true;
          this.GingivalOvergrowthCSSArray[11] = true;
        }
        if (this.necrosis === true) {
          this.necrosisCSSArray[18] = true;
          this.necrosisCSSArray[17] = true;
          this.necrosisCSSArray[16] = true;
          this.necrosisCSSArray[15] = true;
          this.necrosisCSSArray[14] = true;
          this.necrosisCSSArray[13] = true;
          this.necrosisCSSArray[12] = true;
          this.necrosisCSSArray[11] = true;
        }

        if (this.saticfactory === true) {
          this.SatisfactoryCSSArray[18] = true;
          this.SatisfactoryCSSArray[17] = true;
          this.SatisfactoryCSSArray[16] = true;
          this.SatisfactoryCSSArray[15] = true;
          this.SatisfactoryCSSArray[14] = true;
          this.SatisfactoryCSSArray[13] = true;
          this.SatisfactoryCSSArray[12] = true;
          this.SatisfactoryCSSArray[11] = true;
        }
        if (this.unsatisfactory === true) {
          this.UnsatisfactoryCSSArray[18] = true;
          this.UnsatisfactoryCSSArray[17] = true;
          this.UnsatisfactoryCSSArray[16] = true;
          this.UnsatisfactoryCSSArray[15] = true;
          this.UnsatisfactoryCSSArray[14] = true;
          this.UnsatisfactoryCSSArray[13] = true;
          this.UnsatisfactoryCSSArray[12] = true;
          this.UnsatisfactoryCSSArray[11] = true;
        }

        if (this.ApicalLesionMild === true) {
          this.ApicalLesionMildCSSArray[18] = true;
          this.ApicalLesionMildCSSArray[17] = true;
          this.ApicalLesionMildCSSArray[16] = true;
          this.ApicalLesionMildCSSArray[15] = true;
          this.ApicalLesionMildCSSArray[14] = true;
          this.ApicalLesionMildCSSArray[13] = true;
          this.ApicalLesionMildCSSArray[12] = true;
          this.ApicalLesionMildCSSArray[11] = true;
        }
        if (this.ApicalLesionModerate === true) {
          this.ApicalLesionModerateCSSArray[18] = true;
          this.ApicalLesionModerateCSSArray[17] = true;
          this.ApicalLesionModerateCSSArray[16] = true;
          this.ApicalLesionModerateCSSArray[15] = true;
          this.ApicalLesionModerateCSSArray[14] = true;
          this.ApicalLesionModerateCSSArray[13] = true;
          this.ApicalLesionModerateCSSArray[12] = true;
          this.ApicalLesionModerateCSSArray[11] = true;
        }
        if (this.ApicalLesionSevere === true) {
          this.ApicalLesionSevereCSSArray[18] = true;
          this.ApicalLesionSevereCSSArray[17] = true;
          this.ApicalLesionSevereCSSArray[16] = true;
          this.ApicalLesionSevereCSSArray[15] = true;
          this.ApicalLesionSevereCSSArray[14] = true;
          this.ApicalLesionSevereCSSArray[13] = true;
          this.ApicalLesionSevereCSSArray[12] = true;
          this.ApicalLesionSevereCSSArray[11] = true;
        }
        if (this.BrokenInstrumentinCanal === true) {
          this.BrokenInstrumentinCanalCSSArray[18] = true;
          this.BrokenInstrumentinCanalCSSArray[17] = true;
          this.BrokenInstrumentinCanalCSSArray[16] = true;
          this.BrokenInstrumentinCanalCSSArray[15] = true;
          this.BrokenInstrumentinCanalCSSArray[14] = true;
          this.BrokenInstrumentinCanalCSSArray[13] = true;
          this.BrokenInstrumentinCanalCSSArray[12] = true;
          this.BrokenInstrumentinCanalCSSArray[11] = true;
        }
        if (this.Internalchecked === true) {
          this.InternalCSSarray[18] = true;
          this.InternalCSSarray[17] = true;
          this.InternalCSSarray[16] = true;
          this.InternalCSSarray[15] = true;
          this.InternalCSSarray[14] = true;
          this.InternalCSSarray[13] = true;
          this.InternalCSSarray[12] = true;
          this.InternalCSSarray[11] = true;
        }
        if (this.Externalchecked === true) {
          this.ExternalCSSarray[18] = true;
          this.ExternalCSSarray[17] = true;
          this.ExternalCSSarray[16] = true;
          this.ExternalCSSarray[15] = true;
          this.ExternalCSSarray[14] = true;
          this.ExternalCSSarray[13] = true;
          this.ExternalCSSarray[12] = true;
          this.ExternalCSSarray[11] = true;
        }
        if (this.MissingTeethActive === true) {
          this.MissingTeethCSSArray[18] = true;
          this.MissingTeethCSSArray[17] = true;
          this.MissingTeethCSSArray[16] = true;
          this.MissingTeethCSSArray[15] = true;
          this.MissingTeethCSSArray[14] = true;
          this.MissingTeethCSSArray[13] = true;
          this.MissingTeethCSSArray[12] = true;
          this.MissingTeethCSSArray[11] = true;

        }
        if (this.ImpactedTeethActive === true) {
          this.ImpactedTeethCSSArray[18] = true;
          this.ImpactedTeethCSSArray[17] = true;
          this.ImpactedTeethCSSArray[16] = true;
          this.ImpactedTeethCSSArray[15] = true;
          this.ImpactedTeethCSSArray[14] = true;
          this.ImpactedTeethCSSArray[13] = true;
          this.ImpactedTeethCSSArray[12] = true;
          this.ImpactedTeethCSSArray[11] = true;
        }
        if (this.ImpactedInfectedTeethActive === true) {
          this.ImpactedInfectedTeethCSSArray[18] = true;
          this.ImpactedInfectedTeethCSSArray[17] = true;
          this.ImpactedInfectedTeethCSSArray[16] = true;
          this.ImpactedInfectedTeethCSSArray[15] = true;
          this.ImpactedInfectedTeethCSSArray[14] = true;
          this.ImpactedInfectedTeethCSSArray[13] = true;
          this.ImpactedInfectedTeethCSSArray[12] = true;
          this.ImpactedInfectedTeethCSSArray[11] = true;
        }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[18] = true;
          this.LargeMaxillarySinusCSSArray[17] = true;
          this.LargeMaxillarySinusCSSArray[16] = true;
          this.LargeMaxillarySinusCSSArray[15] = true;
          this.LargeMaxillarySinusCSSArray[14] = true;
          this.LargeMaxillarySinusCSSArray[13] = true;
          this.LargeMaxillarySinusCSSArray[12] = true;
          this.LargeMaxillarySinusCSSArray[11] = true;
        }
        if (this.okk === true) {
          this.okCSSArray[18] = true;
          this.okCSSArray[17] = true;
          this.okCSSArray[16] = true;
          this.okCSSArray[15] = true;
          this.okCSSArray[14] = true;
          this.okCSSArray[13] = true;
          this.okCSSArray[12] = true;
          this.okCSSArray[11] = true;
        }
        if (this.otherr === true) {
          this.otherCSSArray[18] = true;
          this.otherCSSArray[17] = true;
          this.otherCSSArray[16] = true;
          this.otherCSSArray[15] = true;
          this.otherCSSArray[14] = true;
          this.otherCSSArray[13] = true;
          this.otherCSSArray[12] = true;
          this.otherCSSArray[11] = true;
        }

        if (this.postok === true) {
          this.postokCSSArray[18] = true;
          this.postokCSSArray[17] = true;
          this.postokCSSArray[16] = true;
          this.postokCSSArray[15] = true;
          this.postokCSSArray[14] = true;
          this.postokCSSArray[13] = true;
          this.postokCSSArray[12] = true;
          this.postokCSSArray[11] = true;
        }
        if (this.postunsatisfactory === true) {
          this.postunsatisfactoryCSSArray[18] = true;
          this.postunsatisfactoryCSSArray[17] = true;
          this.postunsatisfactoryCSSArray[16] = true;
          this.postunsatisfactoryCSSArray[15] = true;
          this.postunsatisfactoryCSSArray[14] = true;
          this.postunsatisfactoryCSSArray[13] = true;
          this.postunsatisfactoryCSSArray[12] = true;
          this.postunsatisfactoryCSSArray[11] = true;
        }
        if (this.DiscoloredTeethActive === true) {
          this.DiscoloredCSSArray[18] = true;
          this.DiscoloredCSSArray[17] = true;
          this.DiscoloredCSSArray[16] = true;
          this.DiscoloredCSSArray[15] = true;
          this.DiscoloredCSSArray[14] = true;
          this.DiscoloredCSSArray[13] = true;
          this.DiscoloredCSSArray[12] = true;
          this.DiscoloredCSSArray[11] = true;
        }

      } else {
        this.teeth18 = false; this.teeth17 = false; this.teeth16 = false; this.teeth15 = false;
        this.teeth14 = false; this.teeth13 = false; this.teeth12 = false; this.teeth11 = false;
        const found18 = this.selectedTeethValue.findIndex(element => element === 18);
        this.selectedTeethValue.splice(found18, 8);
        this.BuccalCSSarray[18] = false;
        this.BuccalCSSarray[17] = false;
        this.BuccalCSSarray[16] = false;
        this.BuccalCSSarray[15] = false;
        this.BuccalCSSarray[14] = false;
        this.BuccalCSSarray[13] = false;
        this.BuccalCSSarray[12] = false;
        this.BuccalCSSarray[11] = false;

        this.LingualCSSarray[18] = false;
        this.LingualCSSarray[17] = false;
        this.LingualCSSarray[16] = false;
        this.LingualCSSarray[15] = false;
        this.LingualCSSarray[14] = false;
        this.LingualCSSarray[13] = false;
        this.LingualCSSarray[12] = false;
        this.LingualCSSarray[11] = false;

        this.DistalCSSarray[18] = false;
        this.DistalCSSarray[17] = false;
        this.DistalCSSarray[16] = false;
        this.DistalCSSarray[15] = false;
        this.DistalCSSarray[14] = false;
        this.DistalCSSarray[13] = false;
        this.DistalCSSarray[12] = false;
        this.DistalCSSarray[11] = false;

        this.OcclusalCSSarray[18] = false;
        this.OcclusalCSSarray[17] = false;
        this.OcclusalCSSarray[16] = false;
        this.OcclusalCSSarray[15] = false;
        this.OcclusalCSSarray[14] = false;
        this.OcclusalCSSarray[13] = false;
        this.OcclusalCSSarray[12] = false;
        this.OcclusalCSSarray[11] = false;

        this.MesialCSSarray[18] = false;
        this.MesialCSSarray[17] = false;
        this.MesialCSSarray[16] = false;
        this.MesialCSSarray[15] = false;
        this.MesialCSSarray[14] = false;
        this.MesialCSSarray[13] = false;
        this.MesialCSSarray[12] = false;
        this.MesialCSSarray[11] = false;

        this.rootCSSarray[18] = false;
        this.rootCSSarray[17] = false;
        this.rootCSSarray[16] = false;
        this.rootCSSarray[15] = false;
        this.rootCSSarray[14] = false;
        this.rootCSSarray[13] = false;
        this.rootCSSarray[12] = false;
        this.rootCSSarray[11] = false;

        this.crownCSSarray[18] = false;
        this.crownCSSarray[17] = false;
        this.crownCSSarray[16] = false;
        this.crownCSSarray[15] = false;
        this.crownCSSarray[14] = false;
        this.crownCSSarray[13] = false;
        this.crownCSSarray[12] = false;
        this.crownCSSarray[11] = false;

        this.severalDamagedCSSarray[18] = false;
        this.severalDamagedCSSarray[17] = false;
        this.severalDamagedCSSarray[16] = false;
        this.severalDamagedCSSarray[15] = false;
        this.severalDamagedCSSarray[14] = false;
        this.severalDamagedCSSarray[13] = false;
        this.severalDamagedCSSarray[12] = false;
        this.severalDamagedCSSarray[11] = false;

        this.MildCSSarray[18] = false;
        this.MildCSSarray[17] = false;
        this.MildCSSarray[16] = false;
        this.MildCSSarray[15] = false;
        this.MildCSSarray[14] = false;
        this.MildCSSarray[13] = false;
        this.MildCSSarray[12] = false;
        this.MildCSSarray[11] = false;

        this.ModerateCSSarray[18] = false;
        this.ModerateCSSarray[17] = false;
        this.ModerateCSSarray[16] = false;
        this.ModerateCSSarray[15] = false;
        this.ModerateCSSarray[14] = false;
        this.ModerateCSSarray[13] = false;
        this.ModerateCSSarray[12] = false;
        this.ModerateCSSarray[11] = false;

        this.SevereCSSarray[18] = false;
        this.SevereCSSarray[17] = false;
        this.SevereCSSarray[16] = false;
        this.SevereCSSarray[15] = false;
        this.SevereCSSarray[14] = false;
        this.SevereCSSarray[13] = false;
        this.SevereCSSarray[12] = false;
        this.SevereCSSarray[11] = false;

        this.GingivalRecessionMildCSSArray[18] = false;
        this.GingivalRecessionMildCSSArray[17] = false;
        this.GingivalRecessionMildCSSArray[16] = false;
        this.GingivalRecessionMildCSSArray[15] = false;
        this.GingivalRecessionMildCSSArray[14] = false;
        this.GingivalRecessionMildCSSArray[13] = false;
        this.GingivalRecessionMildCSSArray[12] = false;
        this.GingivalRecessionMildCSSArray[11] = false;


        this.GingivalRecessionModerateCSSArray[18] = false;
        this.GingivalRecessionModerateCSSArray[17] = false;
        this.GingivalRecessionModerateCSSArray[16] = false;
        this.GingivalRecessionModerateCSSArray[15] = false;
        this.GingivalRecessionModerateCSSArray[14] = false;
        this.GingivalRecessionModerateCSSArray[13] = false;
        this.GingivalRecessionModerateCSSArray[12] = false;
        this.GingivalRecessionModerateCSSArray[11] = false;


        this.GingivalRecessionSevereCSSArray[18] = false;
        this.GingivalRecessionSevereCSSArray[17] = false;
        this.GingivalRecessionSevereCSSArray[16] = false;
        this.GingivalRecessionSevereCSSArray[15] = false;
        this.GingivalRecessionSevereCSSArray[14] = false;
        this.GingivalRecessionSevereCSSArray[13] = false;
        this.GingivalRecessionSevereCSSArray[12] = false;
        this.GingivalRecessionSevereCSSArray[11] = false;


        this.PeriodontitisMildCSSArray[18] = false;
        this.PeriodontitisMildCSSArray[17] = false;
        this.PeriodontitisMildCSSArray[16] = false;
        this.PeriodontitisMildCSSArray[15] = false;
        this.PeriodontitisMildCSSArray[14] = false;
        this.PeriodontitisMildCSSArray[13] = false;
        this.PeriodontitisMildCSSArray[12] = false;
        this.PeriodontitisMildCSSArray[11] = false;


        this.PeriodontitisModerateCSSArray[18] = false;
        this.PeriodontitisModerateCSSArray[17] = false;
        this.PeriodontitisModerateCSSArray[16] = false;
        this.PeriodontitisModerateCSSArray[15] = false;
        this.PeriodontitisModerateCSSArray[14] = false;
        this.PeriodontitisModerateCSSArray[13] = false;
        this.PeriodontitisModerateCSSArray[12] = false;
        this.PeriodontitisModerateCSSArray[11] = false;


        this.PeriodontitisSevereCSSArray[18] = false;
        this.PeriodontitisSevereCSSArray[17] = false;
        this.PeriodontitisSevereCSSArray[16] = false;
        this.PeriodontitisSevereCSSArray[15] = false;
        this.PeriodontitisSevereCSSArray[14] = false;
        this.PeriodontitisSevereCSSArray[13] = false;
        this.PeriodontitisSevereCSSArray[12] = false;
        this.PeriodontitisSevereCSSArray[11] = false;

        this.GummSmileCSSArray[18] = false;
        this.GummSmileCSSArray[17] = false;
        this.GummSmileCSSArray[16] = false;
        this.GummSmileCSSArray[15] = false;
        this.GummSmileCSSArray[14] = false;
        this.GummSmileCSSArray[13] = false;
        this.GummSmileCSSArray[12] = false;
        this.GummSmileCSSArray[11] = false;

        this.GingivalOvergrowthCSSArray[18] = false;
        this.GingivalOvergrowthCSSArray[17] = false;
        this.GingivalOvergrowthCSSArray[16] = false;
        this.GingivalOvergrowthCSSArray[15] = false;
        this.GingivalOvergrowthCSSArray[14] = false;
        this.GingivalOvergrowthCSSArray[13] = false;
        this.GingivalOvergrowthCSSArray[12] = false;
        this.GingivalOvergrowthCSSArray[11] = false;

        this.necrosisCSSArray[18] = false;
        this.necrosisCSSArray[17] = false;
        this.necrosisCSSArray[16] = false;
        this.necrosisCSSArray[15] = false;
        this.necrosisCSSArray[14] = false;
        this.necrosisCSSArray[13] = false;
        this.necrosisCSSArray[12] = false;
        this.necrosisCSSArray[11] = false;

        this.SatisfactoryCSSArray[18] = false;
        this.SatisfactoryCSSArray[17] = false;
        this.SatisfactoryCSSArray[16] = false;
        this.SatisfactoryCSSArray[15] = false;
        this.SatisfactoryCSSArray[14] = false;
        this.SatisfactoryCSSArray[13] = false;
        this.SatisfactoryCSSArray[12] = false;
        this.SatisfactoryCSSArray[11] = false;

        this.UnsatisfactoryCSSArray[18] = false;
        this.UnsatisfactoryCSSArray[17] = false;
        this.UnsatisfactoryCSSArray[16] = false;
        this.UnsatisfactoryCSSArray[15] = false;
        this.UnsatisfactoryCSSArray[14] = false;
        this.UnsatisfactoryCSSArray[13] = false;
        this.UnsatisfactoryCSSArray[12] = false;
        this.UnsatisfactoryCSSArray[11] = false;

        this.ApicalLesionMildCSSArray[18] = false;
        this.ApicalLesionMildCSSArray[17] = false;
        this.ApicalLesionMildCSSArray[16] = false;
        this.ApicalLesionMildCSSArray[15] = false;
        this.ApicalLesionMildCSSArray[14] = false;
        this.ApicalLesionMildCSSArray[13] = false;
        this.ApicalLesionMildCSSArray[12] = false;
        this.ApicalLesionMildCSSArray[11] = false;


        this.ApicalLesionModerateCSSArray[18] = false;
        this.ApicalLesionModerateCSSArray[17] = false;
        this.ApicalLesionModerateCSSArray[16] = false;
        this.ApicalLesionModerateCSSArray[15] = false;
        this.ApicalLesionModerateCSSArray[14] = false;
        this.ApicalLesionModerateCSSArray[13] = false;
        this.ApicalLesionModerateCSSArray[12] = false;
        this.ApicalLesionModerateCSSArray[11] = false;

        this.ApicalLesionSevereCSSArray[18] = false;
        this.ApicalLesionSevereCSSArray[17] = false;
        this.ApicalLesionSevereCSSArray[16] = false;
        this.ApicalLesionSevereCSSArray[15] = false;
        this.ApicalLesionSevereCSSArray[14] = false;
        this.ApicalLesionSevereCSSArray[13] = false;
        this.ApicalLesionSevereCSSArray[12] = false;
        this.ApicalLesionSevereCSSArray[11] = false;

        this.BrokenInstrumentinCanalCSSArray[18] = false;
        this.BrokenInstrumentinCanalCSSArray[17] = false;
        this.BrokenInstrumentinCanalCSSArray[16] = false;
        this.BrokenInstrumentinCanalCSSArray[15] = false;
        this.BrokenInstrumentinCanalCSSArray[14] = false;
        this.BrokenInstrumentinCanalCSSArray[13] = false;
        this.BrokenInstrumentinCanalCSSArray[12] = false;
        this.BrokenInstrumentinCanalCSSArray[11] = false;

        this.InternalCSSarray[18] = false;
        this.InternalCSSarray[17] = false;
        this.InternalCSSarray[16] = false;
        this.InternalCSSarray[15] = false;
        this.InternalCSSarray[14] = false;
        this.InternalCSSarray[13] = false;
        this.InternalCSSarray[12] = false;
        this.InternalCSSarray[11] = false;

        this.ExternalCSSarray[18] = false;
        this.ExternalCSSarray[17] = false;
        this.ExternalCSSarray[16] = false;
        this.ExternalCSSarray[15] = false;
        this.ExternalCSSarray[14] = false;
        this.ExternalCSSarray[13] = false;
        this.ExternalCSSarray[12] = false;
        this.ExternalCSSarray[11] = false;

        this.MissingTeethCSSArray[18] = false;
        this.MissingTeethCSSArray[17] = false;
        this.MissingTeethCSSArray[16] = false;
        this.MissingTeethCSSArray[15] = false;
        this.MissingTeethCSSArray[14] = false;
        this.MissingTeethCSSArray[13] = false;
        this.MissingTeethCSSArray[12] = false;
        this.MissingTeethCSSArray[11] = false;

        this.ImpactedTeethCSSArray[18] = false;
        this.ImpactedTeethCSSArray[17] = false;
        this.ImpactedTeethCSSArray[16] = false;
        this.ImpactedTeethCSSArray[15] = false;
        this.ImpactedTeethCSSArray[14] = false;
        this.ImpactedTeethCSSArray[13] = false;
        this.ImpactedTeethCSSArray[12] = false;
        this.ImpactedTeethCSSArray[11] = false;

        this.ImpactedInfectedTeethCSSArray[18] = false;
        this.ImpactedInfectedTeethCSSArray[17] = false;
        this.ImpactedInfectedTeethCSSArray[16] = false;
        this.ImpactedInfectedTeethCSSArray[15] = false;
        this.ImpactedInfectedTeethCSSArray[14] = false;
        this.ImpactedInfectedTeethCSSArray[13] = false;
        this.ImpactedInfectedTeethCSSArray[12] = false;
        this.ImpactedInfectedTeethCSSArray[11] = false;

        this.LargeMaxillarySinusCSSArray[18] = false;
        this.LargeMaxillarySinusCSSArray[17] = false;
        this.LargeMaxillarySinusCSSArray[16] = false;
        this.LargeMaxillarySinusCSSArray[15] = false;
        this.LargeMaxillarySinusCSSArray[14] = false;
        this.LargeMaxillarySinusCSSArray[13] = false;
        this.LargeMaxillarySinusCSSArray[12] = false;
        this.LargeMaxillarySinusCSSArray[11] = false;


        this.okCSSArray[18] = false;
        this.okCSSArray[17] = false;
        this.okCSSArray[16] = false;
        this.okCSSArray[15] = false;
        this.okCSSArray[14] = false;
        this.okCSSArray[13] = false;
        this.okCSSArray[12] = false;
        this.okCSSArray[11] = false;

        this.otherCSSArray[18] = false;
        this.otherCSSArray[17] = false;
        this.otherCSSArray[16] = false;
        this.otherCSSArray[15] = false;
        this.otherCSSArray[14] = false;
        this.otherCSSArray[13] = false;
        this.otherCSSArray[12] = false;
        this.otherCSSArray[11] = false;

        this.postokCSSArray[18] = false;
        this.postokCSSArray[17] = false;
        this.postokCSSArray[16] = false;
        this.postokCSSArray[15] = false;
        this.postokCSSArray[14] = false;
        this.postokCSSArray[13] = false;
        this.postokCSSArray[12] = false;
        this.postokCSSArray[11] = false;

        this.postunsatisfactoryCSSArray[18] = false;
        this.postunsatisfactoryCSSArray[17] = false;
        this.postunsatisfactoryCSSArray[16] = false;
        this.postunsatisfactoryCSSArray[15] = false;
        this.postunsatisfactoryCSSArray[14] = false;
        this.postunsatisfactoryCSSArray[13] = false;
        this.postunsatisfactoryCSSArray[12] = false;
        this.postunsatisfactoryCSSArray[11] = false;

        this.DiscoloredCSSArray[18] = false;
        this.DiscoloredCSSArray[17] = false;
        this.DiscoloredCSSArray[16] = false;
        this.DiscoloredCSSArray[15] = false;
        this.DiscoloredCSSArray[14] = false;
        this.DiscoloredCSSArray[13] = false;
        this.DiscoloredCSSArray[12] = false;
        this.DiscoloredCSSArray[11] = false;



      } this.selectedTeethValueString = this.selectedTeethValue.join();
    }
    if (id === '2') {
      if (this.teeth21 === false && this.teeth22 === false && this.teeth23 === false && this.teeth24 === false && this.teeth25 === false && this.teeth26 === false && this.teeth27 === false && this.teeth28 === false) {
        this.teeth21 = true; this.teeth22 = true; this.teeth23 = true; this.teeth24 = true; this.teeth25 = true; this.teeth26 = true;
        this.teeth27 = true; this.teeth28 = true;
        this.selectedTeethValue.push(21, 22, 23, 24, 25, 26, 27, 28);
        if (this.Buccalchecked === true) {
          this.BuccalCSSarray[21] = true;
          this.BuccalCSSarray[22] = true;
          this.BuccalCSSarray[23] = true;
          this.BuccalCSSarray[24] = true;
          this.BuccalCSSarray[25] = true;
          this.BuccalCSSarray[26] = true;
          this.BuccalCSSarray[27] = true;
          this.BuccalCSSarray[28] = true;
        }
        if (this.Lingualchecked === true) {
          this.LingualCSSarray[21] = true;
          this.LingualCSSarray[22] = true;
          this.LingualCSSarray[23] = true;
          this.LingualCSSarray[24] = true;
          this.LingualCSSarray[25] = true;
          this.LingualCSSarray[26] = true;
          this.LingualCSSarray[27] = true;
          this.LingualCSSarray[28] = true;
        }
        if (this.Distalchecked === true) {
          this.DistalCSSarray[21] = true;
          this.DistalCSSarray[22] = true;
          this.DistalCSSarray[23] = true;
          this.DistalCSSarray[24] = true;
          this.DistalCSSarray[25] = true;
          this.DistalCSSarray[26] = true;
          this.DistalCSSarray[27] = true;
          this.DistalCSSarray[28] = true;
        }

        if (this.Mesialchecked === true) {
          this.MesialCSSarray[21] = true;
          this.MesialCSSarray[22] = true;
          this.MesialCSSarray[23] = true;
          this.MesialCSSarray[24] = true;
          this.MesialCSSarray[25] = true;
          this.MesialCSSarray[26] = true;
          this.MesialCSSarray[27] = true;
          this.MesialCSSarray[28] = true;
        }

        if (this.Occlusalchecked === true) {
          this.OcclusalCSSarray[21] = true;
          this.OcclusalCSSarray[22] = true;
          this.OcclusalCSSarray[23] = true;
          this.OcclusalCSSarray[24] = true;
          this.OcclusalCSSarray[25] = true;
          this.OcclusalCSSarray[26] = true;
          this.OcclusalCSSarray[27] = true;
          this.OcclusalCSSarray[28] = true;
        }

        if (this.rootSection === true) {
          this.rootCSSarray[21] = true;
          this.rootCSSarray[22] = true;
          this.rootCSSarray[23] = true;
          this.rootCSSarray[24] = true;
          this.rootCSSarray[25] = true;
          this.rootCSSarray[26] = true;
          this.rootCSSarray[27] = true;
          this.rootCSSarray[28] = true;
        }
        if (this.crownSection === true) {
          this.crownCSSarray[21] = true;
          this.crownCSSarray[22] = true;
          this.crownCSSarray[23] = true;
          this.crownCSSarray[24] = true;
          this.crownCSSarray[25] = true;
          this.crownCSSarray[26] = true;
          this.crownCSSarray[27] = true;
          this.crownCSSarray[28] = true;
        }
        if (this.severalDamaged === true) {
          this.severalDamagedCSSarray[21] = true;
          this.severalDamagedCSSarray[22] = true;
          this.severalDamagedCSSarray[23] = true;
          this.severalDamagedCSSarray[24] = true;
          this.severalDamagedCSSarray[25] = true;
          this.severalDamagedCSSarray[26] = true;
          this.severalDamagedCSSarray[27] = true;
          this.severalDamagedCSSarray[28] = true;

        }
        if (this.MildSection === true) {
          this.MildCSSarray[21] = true;
          this.MildCSSarray[22] = true;
          this.MildCSSarray[23] = true;
          this.MildCSSarray[24] = true;
          this.MildCSSarray[25] = true;
          this.MildCSSarray[26] = true;
          this.MildCSSarray[27] = true;
          this.MildCSSarray[28] = true;
        }
        if (this.ModerateSection === true) {
          this.ModerateCSSarray[21] = true;
          this.ModerateCSSarray[22] = true;
          this.ModerateCSSarray[23] = true;
          this.ModerateCSSarray[24] = true;
          this.ModerateCSSarray[25] = true;
          this.ModerateCSSarray[26] = true;
          this.ModerateCSSarray[27] = true;
          this.ModerateCSSarray[28] = true;
        }
        if (this.SevereSection === true) {
          this.SevereCSSarray[21] = true;
          this.SevereCSSarray[22] = true;
          this.SevereCSSarray[23] = true;
          this.SevereCSSarray[24] = true;
          this.SevereCSSarray[25] = true;
          this.SevereCSSarray[26] = true;
          this.SevereCSSarray[27] = true;
          this.SevereCSSarray[28] = true;
        }
        if (this.GingivalRecessionMild === true) {
          this.GingivalRecessionMildCSSArray[21] = true;
          this.GingivalRecessionMildCSSArray[22] = true;
          this.GingivalRecessionMildCSSArray[23] = true;
          this.GingivalRecessionMildCSSArray[24] = true;
          this.GingivalRecessionMildCSSArray[25] = true;
          this.GingivalRecessionMildCSSArray[26] = true;
          this.GingivalRecessionMildCSSArray[27] = true;
          this.GingivalRecessionMildCSSArray[28] = true;
        }
        if (this.GingivalRecessionModerate === true) {
          this.GingivalRecessionModerateCSSArray[21] = true;
          this.GingivalRecessionModerateCSSArray[22] = true;
          this.GingivalRecessionModerateCSSArray[23] = true;
          this.GingivalRecessionModerateCSSArray[24] = true;
          this.GingivalRecessionModerateCSSArray[25] = true;
          this.GingivalRecessionModerateCSSArray[26] = true;
          this.GingivalRecessionModerateCSSArray[27] = true;
          this.GingivalRecessionModerateCSSArray[28] = true;
        }
        if (this.GingivalRecessionSevere === true) {
          this.GingivalRecessionSevereCSSArray[21] = true;
          this.GingivalRecessionSevereCSSArray[22] = true;
          this.GingivalRecessionSevereCSSArray[23] = true;
          this.GingivalRecessionSevereCSSArray[24] = true;
          this.GingivalRecessionSevereCSSArray[25] = true;
          this.GingivalRecessionSevereCSSArray[26] = true;
          this.GingivalRecessionSevereCSSArray[27] = true;
          this.GingivalRecessionSevereCSSArray[28] = true;
        }

        if (this.PeriodontitisMild === true) {
          this.PeriodontitisMildCSSArray[21] = true;
          this.PeriodontitisMildCSSArray[22] = true;
          this.PeriodontitisMildCSSArray[23] = true;
          this.PeriodontitisMildCSSArray[24] = true;
          this.PeriodontitisMildCSSArray[25] = true;
          this.PeriodontitisMildCSSArray[26] = true;
          this.PeriodontitisMildCSSArray[27] = true;
          this.PeriodontitisMildCSSArray[28] = true;
        }
        if (this.PeriodontitisModerate === true) {
          this.PeriodontitisModerateCSSArray[21] = true;
          this.PeriodontitisModerateCSSArray[22] = true;
          this.PeriodontitisModerateCSSArray[23] = true;
          this.PeriodontitisModerateCSSArray[24] = true;
          this.PeriodontitisModerateCSSArray[25] = true;
          this.PeriodontitisModerateCSSArray[26] = true;
          this.PeriodontitisModerateCSSArray[27] = true;
          this.PeriodontitisModerateCSSArray[28] = true;
        }
        if (this.PeriodontitisSevere === true) {
          this.PeriodontitisSevereCSSArray[21] = true;
          this.PeriodontitisSevereCSSArray[22] = true;
          this.PeriodontitisSevereCSSArray[23] = true;
          this.PeriodontitisSevereCSSArray[24] = true;
          this.PeriodontitisSevereCSSArray[25] = true;
          this.PeriodontitisSevereCSSArray[26] = true;
          this.PeriodontitisSevereCSSArray[27] = true;
          this.PeriodontitisSevereCSSArray[28] = true;
        }
        if (this.GummSmileActive === true) {
          this.GummSmileCSSArray[21] = true;
          this.GummSmileCSSArray[22] = true;
          this.GummSmileCSSArray[23] = true;
          this.GummSmileCSSArray[24] = true;
          this.GummSmileCSSArray[25] = true;
          this.GummSmileCSSArray[26] = true;
          this.GummSmileCSSArray[27] = true;
          this.GummSmileCSSArray[28] = true;
        }
        if (this.GingivalOvergrowthActive === true) {
          this.GingivalOvergrowthCSSArray[21] = true;
          this.GingivalOvergrowthCSSArray[22] = true;
          this.GingivalOvergrowthCSSArray[23] = true;
          this.GingivalOvergrowthCSSArray[24] = true;
          this.GingivalOvergrowthCSSArray[25] = true;
          this.GingivalOvergrowthCSSArray[26] = true;
          this.GingivalOvergrowthCSSArray[27] = true;
          this.GingivalOvergrowthCSSArray[28] = true;
        }
        if (this.necrosis === true) {
          this.necrosisCSSArray[21] = true;
          this.necrosisCSSArray[22] = true;
          this.necrosisCSSArray[23] = true;
          this.necrosisCSSArray[24] = true;
          this.necrosisCSSArray[25] = true;
          this.necrosisCSSArray[26] = true;
          this.necrosisCSSArray[27] = true;
          this.necrosisCSSArray[28] = true;
        }

        if (this.saticfactory === true) {
          this.SatisfactoryCSSArray[21] = true;
          this.SatisfactoryCSSArray[22] = true;
          this.SatisfactoryCSSArray[23] = true;
          this.SatisfactoryCSSArray[24] = true;
          this.SatisfactoryCSSArray[25] = true;
          this.SatisfactoryCSSArray[26] = true;
          this.SatisfactoryCSSArray[27] = true;
          this.SatisfactoryCSSArray[28] = true;
        }
        if (this.unsatisfactory === true) {
          this.UnsatisfactoryCSSArray[21] = true;
          this.UnsatisfactoryCSSArray[22] = true;
          this.UnsatisfactoryCSSArray[23] = true;
          this.UnsatisfactoryCSSArray[24] = true;
          this.UnsatisfactoryCSSArray[25] = true;
          this.UnsatisfactoryCSSArray[26] = true;
          this.UnsatisfactoryCSSArray[27] = true;
          this.UnsatisfactoryCSSArray[28] = true;
        }

        if (this.ApicalLesionMild === true) {
          this.ApicalLesionMildCSSArray[21] = true;
          this.ApicalLesionMildCSSArray[22] = true;
          this.ApicalLesionMildCSSArray[23] = true;
          this.ApicalLesionMildCSSArray[24] = true;
          this.ApicalLesionMildCSSArray[25] = true;
          this.ApicalLesionMildCSSArray[26] = true;
          this.ApicalLesionMildCSSArray[27] = true;
          this.ApicalLesionMildCSSArray[28] = true;
        }
        if (this.ApicalLesionModerate === true) {
          this.ApicalLesionModerateCSSArray[21] = true;
          this.ApicalLesionModerateCSSArray[22] = true;
          this.ApicalLesionModerateCSSArray[23] = true;
          this.ApicalLesionModerateCSSArray[24] = true;
          this.ApicalLesionModerateCSSArray[25] = true;
          this.ApicalLesionModerateCSSArray[26] = true;
          this.ApicalLesionModerateCSSArray[27] = true;
          this.ApicalLesionModerateCSSArray[28] = true;
        }
        if (this.ApicalLesionSevere === true) {
          this.ApicalLesionSevereCSSArray[21] = true;
          this.ApicalLesionSevereCSSArray[22] = true;
          this.ApicalLesionSevereCSSArray[23] = true;
          this.ApicalLesionSevereCSSArray[24] = true;
          this.ApicalLesionSevereCSSArray[25] = true;
          this.ApicalLesionSevereCSSArray[26] = true;
          this.ApicalLesionSevereCSSArray[27] = true;
          this.ApicalLesionSevereCSSArray[28] = true;
        }
        if (this.BrokenInstrumentinCanal === true) {
          this.BrokenInstrumentinCanalCSSArray[21] = true;
          this.BrokenInstrumentinCanalCSSArray[22] = true;
          this.BrokenInstrumentinCanalCSSArray[23] = true;
          this.BrokenInstrumentinCanalCSSArray[24] = true;
          this.BrokenInstrumentinCanalCSSArray[25] = true;
          this.BrokenInstrumentinCanalCSSArray[26] = true;
          this.BrokenInstrumentinCanalCSSArray[27] = true;
          this.BrokenInstrumentinCanalCSSArray[28] = true;
        }
        if (this.Internalchecked === true) {
          this.InternalCSSarray[21] = true;
          this.InternalCSSarray[22] = true;
          this.InternalCSSarray[23] = true;
          this.InternalCSSarray[24] = true;
          this.InternalCSSarray[25] = true;
          this.InternalCSSarray[26] = true;
          this.InternalCSSarray[27] = true;
          this.InternalCSSarray[28] = true;
        }
        if (this.Externalchecked === true) {
          this.ExternalCSSarray[21] = true;
          this.ExternalCSSarray[22] = true;
          this.ExternalCSSarray[23] = true;
          this.ExternalCSSarray[24] = true;
          this.ExternalCSSarray[25] = true;
          this.ExternalCSSarray[26] = true;
          this.ExternalCSSarray[27] = true;
          this.ExternalCSSarray[28] = true;
        }
        if (this.MissingTeethActive === true) {
          this.MissingTeethCSSArray[21] = true;
          this.MissingTeethCSSArray[22] = true;
          this.MissingTeethCSSArray[23] = true;
          this.MissingTeethCSSArray[24] = true;
          this.MissingTeethCSSArray[25] = true;
          this.MissingTeethCSSArray[26] = true;
          this.MissingTeethCSSArray[27] = true;
          this.MissingTeethCSSArray[28] = true;

        }
        if (this.ImpactedTeethActive === true) {
          this.ImpactedTeethCSSArray[21] = true;
          this.ImpactedTeethCSSArray[22] = true;
          this.ImpactedTeethCSSArray[23] = true;
          this.ImpactedTeethCSSArray[24] = true;
          this.ImpactedTeethCSSArray[25] = true;
          this.ImpactedTeethCSSArray[26] = true;
          this.ImpactedTeethCSSArray[27] = true;
          this.ImpactedTeethCSSArray[28] = true;
        }
        if (this.ImpactedInfectedTeethActive === true) {
          this.ImpactedInfectedTeethCSSArray[21] = true;
          this.ImpactedInfectedTeethCSSArray[22] = true;
          this.ImpactedInfectedTeethCSSArray[23] = true;
          this.ImpactedInfectedTeethCSSArray[24] = true;
          this.ImpactedInfectedTeethCSSArray[25] = true;
          this.ImpactedInfectedTeethCSSArray[26] = true;
          this.ImpactedInfectedTeethCSSArray[27] = true;
          this.ImpactedInfectedTeethCSSArray[28] = true;
        }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[21] = true;
          this.LargeMaxillarySinusCSSArray[22] = true;
          this.LargeMaxillarySinusCSSArray[23] = true;
          this.LargeMaxillarySinusCSSArray[24] = true;
          this.LargeMaxillarySinusCSSArray[25] = true;
          this.LargeMaxillarySinusCSSArray[26] = true;
          this.LargeMaxillarySinusCSSArray[27] = true;
          this.LargeMaxillarySinusCSSArray[28] = true;
        }
        if (this.okk === true) {
          this.okCSSArray[21] = true;
          this.okCSSArray[22] = true;
          this.okCSSArray[23] = true;
          this.okCSSArray[24] = true;
          this.okCSSArray[25] = true;
          this.okCSSArray[26] = true;
          this.okCSSArray[27] = true;
          this.okCSSArray[28] = true;
        }
        if (this.otherr === true) {
          this.otherCSSArray[21] = true;
          this.otherCSSArray[22] = true;
          this.otherCSSArray[23] = true;
          this.otherCSSArray[24] = true;
          this.otherCSSArray[25] = true;
          this.otherCSSArray[26] = true;
          this.otherCSSArray[27] = true;
          this.otherCSSArray[28] = true;
        }

        if (this.postok === true) {
          this.postokCSSArray[21] = true;
          this.postokCSSArray[22] = true;
          this.postokCSSArray[23] = true;
          this.postokCSSArray[24] = true;
          this.postokCSSArray[25] = true;
          this.postokCSSArray[26] = true;
          this.postokCSSArray[27] = true;
          this.postokCSSArray[28] = true;
        }
        if (this.postunsatisfactory === true) {
          this.postunsatisfactoryCSSArray[21] = true;
          this.postunsatisfactoryCSSArray[22] = true;
          this.postunsatisfactoryCSSArray[23] = true;
          this.postunsatisfactoryCSSArray[24] = true;
          this.postunsatisfactoryCSSArray[25] = true;
          this.postunsatisfactoryCSSArray[26] = true;
          this.postunsatisfactoryCSSArray[27] = true;
          this.postunsatisfactoryCSSArray[28] = true;
        }

        if (this.DiscoloredTeethActive === true) {
          this.DiscoloredCSSArray[21] = true;
          this.DiscoloredCSSArray[22] = true;
          this.DiscoloredCSSArray[23] = true;
          this.DiscoloredCSSArray[24] = true;
          this.DiscoloredCSSArray[25] = true;
          this.DiscoloredCSSArray[26] = true;
          this.DiscoloredCSSArray[27] = true;
          this.DiscoloredCSSArray[28] = true;
        }
      } else {
        this.teeth21 = false; this.teeth22 = false; this.teeth23 = false; this.teeth24 = false; this.teeth25 = false;
        this.teeth26 = false; this.teeth27 = false; this.teeth28 = false;
        const found21 = this.selectedTeethValue.findIndex(element => element === 21);
        this.selectedTeethValue.splice(found21, 8);
        this.BuccalCSSarray[21] = false;
        this.BuccalCSSarray[22] = false;
        this.BuccalCSSarray[23] = false;
        this.BuccalCSSarray[24] = false;
        this.BuccalCSSarray[25] = false;
        this.BuccalCSSarray[26] = false;
        this.BuccalCSSarray[27] = false;
        this.BuccalCSSarray[28] = false;

        this.LingualCSSarray[21] = false;
        this.LingualCSSarray[22] = false;
        this.LingualCSSarray[23] = false;
        this.LingualCSSarray[24] = false;
        this.LingualCSSarray[25] = false;
        this.LingualCSSarray[26] = false;
        this.LingualCSSarray[27] = false;
        this.LingualCSSarray[28] = false;

        this.MesialCSSarray[21] = false;
        this.MesialCSSarray[22] = false;
        this.MesialCSSarray[23] = false;
        this.MesialCSSarray[24] = false;
        this.MesialCSSarray[25] = false;
        this.MesialCSSarray[26] = false;
        this.MesialCSSarray[27] = false;
        this.MesialCSSarray[28] = false;

        this.OcclusalCSSarray[21] = false;
        this.OcclusalCSSarray[22] = false;
        this.OcclusalCSSarray[23] = false;
        this.OcclusalCSSarray[24] = false;
        this.OcclusalCSSarray[25] = false;
        this.OcclusalCSSarray[26] = false;
        this.OcclusalCSSarray[27] = false;
        this.OcclusalCSSarray[28] = false;

        this.DistalCSSarray[21] = false;
        this.DistalCSSarray[22] = false;
        this.DistalCSSarray[23] = false;
        this.DistalCSSarray[24] = false;
        this.DistalCSSarray[25] = false;
        this.DistalCSSarray[26] = false;
        this.DistalCSSarray[27] = false;
        this.DistalCSSarray[28] = false;

        this.rootCSSarray[21] = false;
        this.rootCSSarray[22] = false;
        this.rootCSSarray[23] = false;
        this.rootCSSarray[24] = false;
        this.rootCSSarray[25] = false;
        this.rootCSSarray[26] = false;
        this.rootCSSarray[27] = false;
        this.rootCSSarray[28] = false;

        this.crownCSSarray[21] = false;
        this.crownCSSarray[22] = false;
        this.crownCSSarray[23] = false;
        this.crownCSSarray[24] = false;
        this.crownCSSarray[25] = false;
        this.crownCSSarray[26] = false;
        this.crownCSSarray[27] = false;
        this.crownCSSarray[28] = false;

        this.severalDamagedCSSarray[21] = false;
        this.severalDamagedCSSarray[22] = false;
        this.severalDamagedCSSarray[23] = false;
        this.severalDamagedCSSarray[24] = false;
        this.severalDamagedCSSarray[25] = false;
        this.severalDamagedCSSarray[26] = false;
        this.severalDamagedCSSarray[27] = false;
        this.severalDamagedCSSarray[28] = false;

        this.MildCSSarray[21] = false;
        this.MildCSSarray[22] = false;
        this.MildCSSarray[23] = false;
        this.MildCSSarray[24] = false;
        this.MildCSSarray[25] = false;
        this.MildCSSarray[26] = false;
        this.MildCSSarray[27] = false;
        this.MildCSSarray[28] = false;

        this.ModerateCSSarray[21] = false;
        this.ModerateCSSarray[22] = false;
        this.ModerateCSSarray[23] = false;
        this.ModerateCSSarray[24] = false;
        this.ModerateCSSarray[25] = false;
        this.ModerateCSSarray[26] = false;
        this.ModerateCSSarray[27] = false;
        this.ModerateCSSarray[28] = false;

        this.SevereCSSarray[21] = false;
        this.SevereCSSarray[22] = false;
        this.SevereCSSarray[23] = false;
        this.SevereCSSarray[24] = false;
        this.SevereCSSarray[25] = false;
        this.SevereCSSarray[26] = false;
        this.SevereCSSarray[27] = false;
        this.SevereCSSarray[28] = false;

        this.GingivalRecessionMildCSSArray[21] = false;
        this.GingivalRecessionMildCSSArray[22] = false;
        this.GingivalRecessionMildCSSArray[23] = false;
        this.GingivalRecessionMildCSSArray[24] = false;
        this.GingivalRecessionMildCSSArray[25] = false;
        this.GingivalRecessionMildCSSArray[26] = false;
        this.GingivalRecessionMildCSSArray[27] = false;
        this.GingivalRecessionMildCSSArray[28] = false;

        this.GingivalRecessionModerateCSSArray[21] = false;
        this.GingivalRecessionModerateCSSArray[22] = false;
        this.GingivalRecessionModerateCSSArray[23] = false;
        this.GingivalRecessionModerateCSSArray[24] = false;
        this.GingivalRecessionModerateCSSArray[25] = false;
        this.GingivalRecessionModerateCSSArray[26] = false;
        this.GingivalRecessionModerateCSSArray[27] = false;
        this.GingivalRecessionModerateCSSArray[28] = false;


        this.GingivalRecessionSevereCSSArray[21] = false;
        this.GingivalRecessionSevereCSSArray[22] = false;
        this.GingivalRecessionSevereCSSArray[23] = false;
        this.GingivalRecessionSevereCSSArray[24] = false;
        this.GingivalRecessionSevereCSSArray[25] = false;
        this.GingivalRecessionSevereCSSArray[26] = false;
        this.GingivalRecessionSevereCSSArray[27] = false;
        this.GingivalRecessionSevereCSSArray[28] = false;


        this.PeriodontitisMildCSSArray[21] = false;
        this.PeriodontitisMildCSSArray[22] = false;
        this.PeriodontitisMildCSSArray[23] = false;
        this.PeriodontitisMildCSSArray[24] = false;
        this.PeriodontitisMildCSSArray[25] = false;
        this.PeriodontitisMildCSSArray[26] = false;
        this.PeriodontitisMildCSSArray[27] = false;
        this.PeriodontitisMildCSSArray[28] = false;


        this.PeriodontitisModerateCSSArray[21] = false;
        this.PeriodontitisModerateCSSArray[22] = false;
        this.PeriodontitisModerateCSSArray[23] = false;
        this.PeriodontitisModerateCSSArray[24] = false;
        this.PeriodontitisModerateCSSArray[25] = false;
        this.PeriodontitisModerateCSSArray[26] = false;
        this.PeriodontitisModerateCSSArray[27] = false;
        this.PeriodontitisModerateCSSArray[28] = false;


        this.PeriodontitisSevereCSSArray[21] = false;
        this.PeriodontitisSevereCSSArray[22] = false;
        this.PeriodontitisSevereCSSArray[23] = false;
        this.PeriodontitisSevereCSSArray[24] = false;
        this.PeriodontitisSevereCSSArray[25] = false;
        this.PeriodontitisSevereCSSArray[26] = false;
        this.PeriodontitisSevereCSSArray[27] = false;
        this.PeriodontitisSevereCSSArray[28] = false;

        this.GummSmileCSSArray[21] = false;
        this.GummSmileCSSArray[22] = false;
        this.GummSmileCSSArray[23] = false;
        this.GummSmileCSSArray[24] = false;
        this.GummSmileCSSArray[25] = false;
        this.GummSmileCSSArray[26] = false;
        this.GummSmileCSSArray[27] = false;
        this.GummSmileCSSArray[28] = false;

        this.GingivalOvergrowthCSSArray[21] = false;
        this.GingivalOvergrowthCSSArray[22] = false;
        this.GingivalOvergrowthCSSArray[23] = false;
        this.GingivalOvergrowthCSSArray[24] = false;
        this.GingivalOvergrowthCSSArray[25] = false;
        this.GingivalOvergrowthCSSArray[26] = false;
        this.GingivalOvergrowthCSSArray[27] = false;
        this.GingivalOvergrowthCSSArray[28] = false;

        this.necrosisCSSArray[21] = false;
        this.necrosisCSSArray[22] = false;
        this.necrosisCSSArray[23] = false;
        this.necrosisCSSArray[24] = false;
        this.necrosisCSSArray[25] = false;
        this.necrosisCSSArray[26] = false;
        this.necrosisCSSArray[27] = false;
        this.necrosisCSSArray[28] = false;

        this.SatisfactoryCSSArray[21] = false;
        this.SatisfactoryCSSArray[22] = false;
        this.SatisfactoryCSSArray[23] = false;
        this.SatisfactoryCSSArray[24] = false;
        this.SatisfactoryCSSArray[25] = false;
        this.SatisfactoryCSSArray[26] = false;
        this.SatisfactoryCSSArray[27] = false;
        this.SatisfactoryCSSArray[28] = false;

        this.UnsatisfactoryCSSArray[21] = false;
        this.UnsatisfactoryCSSArray[22] = false;
        this.UnsatisfactoryCSSArray[23] = false;
        this.UnsatisfactoryCSSArray[24] = false;
        this.UnsatisfactoryCSSArray[25] = false;
        this.UnsatisfactoryCSSArray[26] = false;
        this.UnsatisfactoryCSSArray[27] = false;
        this.UnsatisfactoryCSSArray[28] = false;

        this.ApicalLesionMildCSSArray[21] = false;
        this.ApicalLesionMildCSSArray[22] = false;
        this.ApicalLesionMildCSSArray[23] = false;
        this.ApicalLesionMildCSSArray[24] = false;
        this.ApicalLesionMildCSSArray[25] = false;
        this.ApicalLesionMildCSSArray[26] = false;
        this.ApicalLesionMildCSSArray[27] = false;
        this.ApicalLesionMildCSSArray[28] = false;

        this.ApicalLesionModerateCSSArray[21] = false;
        this.ApicalLesionModerateCSSArray[22] = false;
        this.ApicalLesionModerateCSSArray[23] = false;
        this.ApicalLesionModerateCSSArray[24] = false;
        this.ApicalLesionModerateCSSArray[25] = false;
        this.ApicalLesionModerateCSSArray[26] = false;
        this.ApicalLesionModerateCSSArray[27] = false;
        this.ApicalLesionModerateCSSArray[28] = false;

        this.ApicalLesionSevereCSSArray[21] = false;
        this.ApicalLesionSevereCSSArray[22] = false;
        this.ApicalLesionSevereCSSArray[23] = false;
        this.ApicalLesionSevereCSSArray[24] = false;
        this.ApicalLesionSevereCSSArray[25] = false;
        this.ApicalLesionSevereCSSArray[26] = false;
        this.ApicalLesionSevereCSSArray[27] = false;
        this.ApicalLesionSevereCSSArray[28] = false;

        this.BrokenInstrumentinCanalCSSArray[21] = false;
        this.BrokenInstrumentinCanalCSSArray[22] = false;
        this.BrokenInstrumentinCanalCSSArray[23] = false;
        this.BrokenInstrumentinCanalCSSArray[24] = false;
        this.BrokenInstrumentinCanalCSSArray[25] = false;
        this.BrokenInstrumentinCanalCSSArray[26] = false;
        this.BrokenInstrumentinCanalCSSArray[27] = false;
        this.BrokenInstrumentinCanalCSSArray[28] = false;

        this.InternalCSSarray[21] = false;
        this.InternalCSSarray[22] = false;
        this.InternalCSSarray[23] = false;
        this.InternalCSSarray[24] = false;
        this.InternalCSSarray[25] = false;
        this.InternalCSSarray[26] = false;
        this.InternalCSSarray[27] = false;
        this.InternalCSSarray[28] = false;

        this.ExternalCSSarray[21] = false;
        this.ExternalCSSarray[22] = false;
        this.ExternalCSSarray[23] = false;
        this.ExternalCSSarray[24] = false;
        this.ExternalCSSarray[25] = false;
        this.ExternalCSSarray[26] = false;
        this.ExternalCSSarray[27] = false;
        this.ExternalCSSarray[28] = false;

        this.MissingTeethCSSArray[21] = false;
        this.MissingTeethCSSArray[22] = false;
        this.MissingTeethCSSArray[23] = false;
        this.MissingTeethCSSArray[24] = false;
        this.MissingTeethCSSArray[25] = false;
        this.MissingTeethCSSArray[26] = false;
        this.MissingTeethCSSArray[27] = false;
        this.MissingTeethCSSArray[28] = false;

        this.ImpactedTeethCSSArray[21] = false;
        this.ImpactedTeethCSSArray[22] = false;
        this.ImpactedTeethCSSArray[23] = false;
        this.ImpactedTeethCSSArray[24] = false;
        this.ImpactedTeethCSSArray[25] = false;
        this.ImpactedTeethCSSArray[26] = false;
        this.ImpactedTeethCSSArray[27] = false;
        this.ImpactedTeethCSSArray[28] = false;

        this.ImpactedInfectedTeethCSSArray[21] = false;
        this.ImpactedInfectedTeethCSSArray[22] = false;
        this.ImpactedInfectedTeethCSSArray[23] = false;
        this.ImpactedInfectedTeethCSSArray[24] = false;
        this.ImpactedInfectedTeethCSSArray[25] = false;
        this.ImpactedInfectedTeethCSSArray[26] = false;
        this.ImpactedInfectedTeethCSSArray[27] = false;
        this.ImpactedInfectedTeethCSSArray[28] = false;

        this.LargeMaxillarySinusCSSArray[21] = false;
        this.LargeMaxillarySinusCSSArray[22] = false;
        this.LargeMaxillarySinusCSSArray[23] = false;
        this.LargeMaxillarySinusCSSArray[24] = false;
        this.LargeMaxillarySinusCSSArray[25] = false;
        this.LargeMaxillarySinusCSSArray[26] = false;
        this.LargeMaxillarySinusCSSArray[27] = false;
        this.LargeMaxillarySinusCSSArray[28] = false;

        this.okCSSArray[21] = false;
        this.okCSSArray[22] = false;
        this.okCSSArray[23] = false;
        this.okCSSArray[24] = false;
        this.okCSSArray[25] = false;
        this.okCSSArray[26] = false;
        this.okCSSArray[27] = false;
        this.okCSSArray[28] = false;

        this.otherCSSArray[21] = false;
        this.otherCSSArray[22] = false;
        this.otherCSSArray[23] = false;
        this.otherCSSArray[24] = false;
        this.otherCSSArray[25] = false;
        this.otherCSSArray[26] = false;
        this.otherCSSArray[27] = false;
        this.otherCSSArray[28] = false;

        this.postokCSSArray[21] = false;
        this.postokCSSArray[22] = false;
        this.postokCSSArray[23] = false;
        this.postokCSSArray[24] = false;
        this.postokCSSArray[25] = false;
        this.postokCSSArray[26] = false;
        this.postokCSSArray[27] = false;
        this.postokCSSArray[28] = false;

        this.postunsatisfactoryCSSArray[21] = false;
        this.postunsatisfactoryCSSArray[22] = false;
        this.postunsatisfactoryCSSArray[23] = false;
        this.postunsatisfactoryCSSArray[24] = false;
        this.postunsatisfactoryCSSArray[25] = false;
        this.postunsatisfactoryCSSArray[26] = false;
        this.postunsatisfactoryCSSArray[27] = false;
        this.postunsatisfactoryCSSArray[28] = false;

        this.DiscoloredCSSArray[21] = false;
        this.DiscoloredCSSArray[22] = false;
        this.DiscoloredCSSArray[23] = false;
        this.DiscoloredCSSArray[24] = false;
        this.DiscoloredCSSArray[25] = false;
        this.DiscoloredCSSArray[26] = false;
        this.DiscoloredCSSArray[27] = false;
        this.DiscoloredCSSArray[28] = false;


      } this.selectedTeethValueString = this.selectedTeethValue.join();
    }
    if (id === '3') {
      if (this.teeth48 === false && this.teeth47 === false && this.teeth46 === false && this.teeth45 === false && this.teeth44 === false && this.teeth43 === false && this.teeth42 === false && this.teeth41 === false) {
        this.teeth48 = true; this.teeth47 = true; this.teeth46 = true; this.teeth45 = true; this.teeth44 = true;
        this.teeth43 = true; this.teeth42 = true; this.teeth41 = true;
        this.selectedTeethValue.push(48, 47, 46, 45, 44, 43, 42, 41);
        if (this.Buccalchecked === true) {
          this.BuccalCSSarray[48] = true;
          this.BuccalCSSarray[47] = true;
          this.BuccalCSSarray[46] = true;
          this.BuccalCSSarray[45] = true;
          this.BuccalCSSarray[44] = true;
          this.BuccalCSSarray[43] = true;
          this.BuccalCSSarray[42] = true;
          this.BuccalCSSarray[41] = true;
        }
        if (this.Lingualchecked === true) {
          this.LingualCSSarray[48] = true;
          this.LingualCSSarray[47] = true;
          this.LingualCSSarray[46] = true;
          this.LingualCSSarray[45] = true;
          this.LingualCSSarray[44] = true;
          this.LingualCSSarray[43] = true;
          this.LingualCSSarray[42] = true;
          this.LingualCSSarray[41] = true;
        }
        if (this.Distalchecked === true) {
          this.DistalCSSarray[48] = true;
          this.DistalCSSarray[47] = true;
          this.DistalCSSarray[46] = true;
          this.DistalCSSarray[45] = true;
          this.DistalCSSarray[44] = true;
          this.DistalCSSarray[43] = true;
          this.DistalCSSarray[42] = true;
          this.DistalCSSarray[41] = true;
        }
        if (this.Occlusalchecked === true) {
          this.OcclusalCSSarray[48] = true;
          this.OcclusalCSSarray[47] = true;
          this.OcclusalCSSarray[46] = true;
          this.OcclusalCSSarray[45] = true;
          this.OcclusalCSSarray[44] = true;
          this.OcclusalCSSarray[43] = true;
          this.OcclusalCSSarray[42] = true;
          this.OcclusalCSSarray[41] = true;
        }
        if (this.Mesialchecked === true) {
          this.MesialCSSarray[48] = true;
          this.MesialCSSarray[47] = true;
          this.MesialCSSarray[46] = true;
          this.MesialCSSarray[45] = true;
          this.MesialCSSarray[44] = true;
          this.MesialCSSarray[43] = true;
          this.MesialCSSarray[42] = true;
          this.MesialCSSarray[41] = true;

        }


        if (this.rootSection === true) {
          this.rootCSSarray[48] = true;
          this.rootCSSarray[47] = true;
          this.rootCSSarray[46] = true;
          this.rootCSSarray[45] = true;
          this.rootCSSarray[44] = true;
          this.rootCSSarray[43] = true;
          this.rootCSSarray[42] = true;
          this.rootCSSarray[41] = true;
        }
        if (this.crownSection === true) {
          this.crownCSSarray[48] = true;
          this.crownCSSarray[47] = true;
          this.crownCSSarray[46] = true;
          this.crownCSSarray[45] = true;
          this.crownCSSarray[44] = true;
          this.crownCSSarray[43] = true;
          this.crownCSSarray[42] = true;
          this.crownCSSarray[41] = true;
        }
        if (this.severalDamaged === true) {
          this.severalDamagedCSSarray[48] = true;
          this.severalDamagedCSSarray[47] = true;
          this.severalDamagedCSSarray[46] = true;
          this.severalDamagedCSSarray[45] = true;
          this.severalDamagedCSSarray[44] = true;
          this.severalDamagedCSSarray[43] = true;
          this.severalDamagedCSSarray[42] = true;
          this.severalDamagedCSSarray[41] = true;

        }
        if (this.MildSection === true) {
          this.MildCSSarray[48] = true;
          this.MildCSSarray[47] = true;
          this.MildCSSarray[46] = true;
          this.MildCSSarray[45] = true;
          this.MildCSSarray[44] = true;
          this.MildCSSarray[43] = true;
          this.MildCSSarray[42] = true;
          this.MildCSSarray[41] = true;
        }
        if (this.ModerateSection === true) {
          this.ModerateCSSarray[48] = true;
          this.ModerateCSSarray[47] = true;
          this.ModerateCSSarray[46] = true;
          this.ModerateCSSarray[45] = true;
          this.ModerateCSSarray[44] = true;
          this.ModerateCSSarray[43] = true;
          this.ModerateCSSarray[42] = true;
          this.ModerateCSSarray[41] = true;
        }
        if (this.SevereSection === true) {

          this.SevereCSSarray[48] = true;
          this.SevereCSSarray[47] = true;
          this.SevereCSSarray[46] = true;
          this.SevereCSSarray[45] = true;
          this.SevereCSSarray[44] = true;
          this.SevereCSSarray[43] = true;
          this.SevereCSSarray[42] = true;
          this.SevereCSSarray[41] = true;
        }
        if (this.GingivalRecessionMild === true) {
          this.GingivalRecessionMildCSSArray[48] = true;
          this.GingivalRecessionMildCSSArray[47] = true;
          this.GingivalRecessionMildCSSArray[46] = true;
          this.GingivalRecessionMildCSSArray[45] = true;
          this.GingivalRecessionMildCSSArray[44] = true;
          this.GingivalRecessionMildCSSArray[43] = true;
          this.GingivalRecessionMildCSSArray[42] = true;
          this.GingivalRecessionMildCSSArray[41] = true;
        }
        if (this.GingivalRecessionModerate === true) {
          this.GingivalRecessionModerateCSSArray[48] = true;
          this.GingivalRecessionModerateCSSArray[47] = true;
          this.GingivalRecessionModerateCSSArray[46] = true;
          this.GingivalRecessionModerateCSSArray[45] = true;
          this.GingivalRecessionModerateCSSArray[44] = true;
          this.GingivalRecessionModerateCSSArray[43] = true;
          this.GingivalRecessionModerateCSSArray[42] = true;
          this.GingivalRecessionModerateCSSArray[41] = true;
        }
        if (this.GingivalRecessionSevere === true) {
          this.GingivalRecessionSevereCSSArray[48] = true;
          this.GingivalRecessionSevereCSSArray[47] = true;
          this.GingivalRecessionSevereCSSArray[46] = true;
          this.GingivalRecessionSevereCSSArray[45] = true;
          this.GingivalRecessionSevereCSSArray[44] = true;
          this.GingivalRecessionSevereCSSArray[43] = true;
          this.GingivalRecessionSevereCSSArray[42] = true;
          this.GingivalRecessionSevereCSSArray[41] = true;
        }

        if (this.PeriodontitisMild === true) {
          this.PeriodontitisMildCSSArray[48] = true;
          this.PeriodontitisMildCSSArray[47] = true;
          this.PeriodontitisMildCSSArray[46] = true;
          this.PeriodontitisMildCSSArray[45] = true;
          this.PeriodontitisMildCSSArray[44] = true;
          this.PeriodontitisMildCSSArray[43] = true;
          this.PeriodontitisMildCSSArray[42] = true;
          this.PeriodontitisMildCSSArray[41] = true;
        }
        if (this.PeriodontitisModerate === true) {
          this.PeriodontitisModerateCSSArray[48] = true;
          this.PeriodontitisModerateCSSArray[47] = true;
          this.PeriodontitisModerateCSSArray[46] = true;
          this.PeriodontitisModerateCSSArray[45] = true;
          this.PeriodontitisModerateCSSArray[44] = true;
          this.PeriodontitisModerateCSSArray[43] = true;
          this.PeriodontitisModerateCSSArray[42] = true;
          this.PeriodontitisModerateCSSArray[41] = true;
        }
        if (this.PeriodontitisSevere === true) {
          this.PeriodontitisSevereCSSArray[48] = true;
          this.PeriodontitisSevereCSSArray[47] = true;
          this.PeriodontitisSevereCSSArray[46] = true;
          this.PeriodontitisSevereCSSArray[45] = true;
          this.PeriodontitisSevereCSSArray[44] = true;
          this.PeriodontitisSevereCSSArray[43] = true;
          this.PeriodontitisSevereCSSArray[42] = true;
          this.PeriodontitisSevereCSSArray[41] = true;
        }
        if (this.GummSmileActive === true) {
          this.GummSmileCSSArray[48] = true;
          this.GummSmileCSSArray[47] = true;
          this.GummSmileCSSArray[46] = true;
          this.GummSmileCSSArray[45] = true;
          this.GummSmileCSSArray[44] = true;
          this.GummSmileCSSArray[43] = true;
          this.GummSmileCSSArray[42] = true;
          this.GummSmileCSSArray[41] = true;
        }
        if (this.GingivalOvergrowthActive === true) {
          this.GingivalOvergrowthCSSArray[48] = true;
          this.GingivalOvergrowthCSSArray[47] = true;
          this.GingivalOvergrowthCSSArray[46] = true;
          this.GingivalOvergrowthCSSArray[45] = true;
          this.GingivalOvergrowthCSSArray[44] = true;
          this.GingivalOvergrowthCSSArray[43] = true;
          this.GingivalOvergrowthCSSArray[42] = true;
          this.GingivalOvergrowthCSSArray[41] = true;
        }
        if (this.necrosis === true) {
          this.necrosisCSSArray[48] = true;
          this.necrosisCSSArray[47] = true;
          this.necrosisCSSArray[46] = true;
          this.necrosisCSSArray[45] = true;
          this.necrosisCSSArray[44] = true;
          this.necrosisCSSArray[43] = true;
          this.necrosisCSSArray[42] = true;
          this.necrosisCSSArray[41] = true;
        }

        if (this.saticfactory === true) {
          this.SatisfactoryCSSArray[48] = true;
          this.SatisfactoryCSSArray[47] = true;
          this.SatisfactoryCSSArray[46] = true;
          this.SatisfactoryCSSArray[45] = true;
          this.SatisfactoryCSSArray[44] = true;
          this.SatisfactoryCSSArray[43] = true;
          this.SatisfactoryCSSArray[42] = true;
          this.SatisfactoryCSSArray[41] = true;
        }

        if (this.unsatisfactory === true) {
          this.UnsatisfactoryCSSArray[48] = true;
          this.UnsatisfactoryCSSArray[47] = true;
          this.UnsatisfactoryCSSArray[46] = true;
          this.UnsatisfactoryCSSArray[45] = true;
          this.UnsatisfactoryCSSArray[44] = true;
          this.UnsatisfactoryCSSArray[43] = true;
          this.UnsatisfactoryCSSArray[42] = true;
          this.UnsatisfactoryCSSArray[41] = true;

        }

        if (this.ApicalLesionMild === true) {
          this.ApicalLesionMildCSSArray[48] = true;
          this.ApicalLesionMildCSSArray[47] = true;
          this.ApicalLesionMildCSSArray[46] = true;
          this.ApicalLesionMildCSSArray[45] = true;
          this.ApicalLesionMildCSSArray[44] = true;
          this.ApicalLesionMildCSSArray[43] = true;
          this.ApicalLesionMildCSSArray[42] = true;
          this.ApicalLesionMildCSSArray[41] = true;

        }
        if (this.ApicalLesionModerate === true) {
          this.ApicalLesionModerateCSSArray[48] = true;
          this.ApicalLesionModerateCSSArray[47] = true;
          this.ApicalLesionModerateCSSArray[46] = true;
          this.ApicalLesionModerateCSSArray[45] = true;
          this.ApicalLesionModerateCSSArray[44] = true;
          this.ApicalLesionModerateCSSArray[43] = true;
          this.ApicalLesionModerateCSSArray[42] = true;
          this.ApicalLesionModerateCSSArray[41] = true;

        }
        if (this.ApicalLesionSevere === true) {
          this.ApicalLesionSevereCSSArray[48] = true;
          this.ApicalLesionSevereCSSArray[47] = true;
          this.ApicalLesionSevereCSSArray[46] = true;
          this.ApicalLesionSevereCSSArray[45] = true;
          this.ApicalLesionSevereCSSArray[44] = true;
          this.ApicalLesionSevereCSSArray[43] = true;
          this.ApicalLesionSevereCSSArray[42] = true;
          this.ApicalLesionSevereCSSArray[41] = true;

        }
        if (this.BrokenInstrumentinCanal === true) {
          this.BrokenInstrumentinCanalCSSArray[48] = true;
          this.BrokenInstrumentinCanalCSSArray[47] = true;
          this.BrokenInstrumentinCanalCSSArray[46] = true;
          this.BrokenInstrumentinCanalCSSArray[45] = true;
          this.BrokenInstrumentinCanalCSSArray[44] = true;
          this.BrokenInstrumentinCanalCSSArray[43] = true;
          this.BrokenInstrumentinCanalCSSArray[42] = true;
          this.BrokenInstrumentinCanalCSSArray[41] = true;

        }
        if (this.Internalchecked === true) {
          this.InternalCSSarray[48] = true;
          this.InternalCSSarray[47] = true;
          this.InternalCSSarray[46] = true;
          this.InternalCSSarray[45] = true;
          this.InternalCSSarray[44] = true;
          this.InternalCSSarray[43] = true;
          this.InternalCSSarray[42] = true;
          this.InternalCSSarray[41] = true;

        }
        if (this.Externalchecked === true) {
          this.ExternalCSSarray[48] = true;
          this.ExternalCSSarray[47] = true;
          this.ExternalCSSarray[46] = true;
          this.ExternalCSSarray[45] = true;
          this.ExternalCSSarray[44] = true;
          this.ExternalCSSarray[43] = true;
          this.ExternalCSSarray[42] = true;
          this.ExternalCSSarray[41] = true;

        }
        if (this.MissingTeethActive === true) {
          this.MissingTeethCSSArray[48] = true;
          this.MissingTeethCSSArray[47] = true;
          this.MissingTeethCSSArray[46] = true;
          this.MissingTeethCSSArray[45] = true;
          this.MissingTeethCSSArray[44] = true;
          this.MissingTeethCSSArray[43] = true;
          this.MissingTeethCSSArray[42] = true;
          this.MissingTeethCSSArray[41] = true;

        }
        if (this.ImpactedTeethActive === true) {
          this.ImpactedTeethCSSArray[48] = true;
          this.ImpactedTeethCSSArray[47] = true;
          this.ImpactedTeethCSSArray[46] = true;
          this.ImpactedTeethCSSArray[45] = true;
          this.ImpactedTeethCSSArray[44] = true;
          this.ImpactedTeethCSSArray[43] = true;
          this.ImpactedTeethCSSArray[42] = true;
          this.ImpactedTeethCSSArray[41] = true;
        }
        if (this.ImpactedInfectedTeethActive === true) {
          this.ImpactedInfectedTeethCSSArray[48] = true;
          this.ImpactedInfectedTeethCSSArray[47] = true;
          this.ImpactedInfectedTeethCSSArray[46] = true;
          this.ImpactedInfectedTeethCSSArray[45] = true;
          this.ImpactedInfectedTeethCSSArray[44] = true;
          this.ImpactedInfectedTeethCSSArray[43] = true;
          this.ImpactedInfectedTeethCSSArray[42] = true;
          this.ImpactedInfectedTeethCSSArray[41] = true;
        }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[48] = true;
          this.LargeMaxillarySinusCSSArray[47] = true;
          this.LargeMaxillarySinusCSSArray[46] = true;
          this.LargeMaxillarySinusCSSArray[45] = true;
          this.LargeMaxillarySinusCSSArray[44] = true;
          this.LargeMaxillarySinusCSSArray[43] = true;
          this.LargeMaxillarySinusCSSArray[42] = true;
          this.LargeMaxillarySinusCSSArray[41] = true;
        }
        if (this.okk === true) {
          this.okCSSArray[48] = true;
          this.okCSSArray[47] = true;
          this.okCSSArray[46] = true;
          this.okCSSArray[45] = true;
          this.okCSSArray[44] = true;
          this.okCSSArray[43] = true;
          this.okCSSArray[42] = true;
          this.okCSSArray[41] = true;
        }
        if (this.otherr === true) {
          this.otherCSSArray[48] = true;
          this.otherCSSArray[47] = true;
          this.otherCSSArray[46] = true;
          this.otherCSSArray[45] = true;
          this.otherCSSArray[44] = true;
          this.otherCSSArray[43] = true;
          this.otherCSSArray[42] = true;
          this.otherCSSArray[41] = true;
        }

        if (this.postok === true) {
          this.postokCSSArray[48] = true;
          this.postokCSSArray[47] = true;
          this.postokCSSArray[46] = true;
          this.postokCSSArray[45] = true;
          this.postokCSSArray[44] = true;
          this.postokCSSArray[43] = true;
          this.postokCSSArray[42] = true;
          this.postokCSSArray[41] = true;
        }
        if (this.postunsatisfactory === true) {
          this.postunsatisfactoryCSSArray[48] = true;
          this.postunsatisfactoryCSSArray[47] = true;
          this.postunsatisfactoryCSSArray[46] = true;
          this.postunsatisfactoryCSSArray[45] = true;
          this.postunsatisfactoryCSSArray[44] = true;
          this.postunsatisfactoryCSSArray[43] = true;
          this.postunsatisfactoryCSSArray[42] = true;
          this.postunsatisfactoryCSSArray[41] = true;
        }

        if (this.DiscoloredTeethActive === true) {
          this.DiscoloredCSSArray[48] = true;
          this.DiscoloredCSSArray[47] = true;
          this.DiscoloredCSSArray[46] = true;
          this.DiscoloredCSSArray[45] = true;
          this.DiscoloredCSSArray[44] = true;
          this.DiscoloredCSSArray[43] = true;
          this.DiscoloredCSSArray[42] = true;
          this.DiscoloredCSSArray[41] = true;
        }
      } else {
        this.teeth48 = false; this.teeth47 = false; this.teeth46 = false; this.teeth45 = false; this.teeth44 = false;
        this.teeth43 = false; this.teeth42 = false; this.teeth41 = false;
        const found48 = this.selectedTeethValue.findIndex(element => element === 48);
        this.selectedTeethValue.splice(found48, 8);
        this.BuccalCSSarray[48] = false;
        this.BuccalCSSarray[47] = false;
        this.BuccalCSSarray[46] = false;
        this.BuccalCSSarray[45] = false;
        this.BuccalCSSarray[44] = false;
        this.BuccalCSSarray[43] = false;
        this.BuccalCSSarray[42] = false;
        this.BuccalCSSarray[41] = false;

        this.LingualCSSarray[48] = false;
        this.LingualCSSarray[47] = false;
        this.LingualCSSarray[46] = false;
        this.LingualCSSarray[45] = false;
        this.LingualCSSarray[44] = false;
        this.LingualCSSarray[43] = false;
        this.LingualCSSarray[42] = false;
        this.LingualCSSarray[41] = false;

        this.MesialCSSarray[48] = false;
        this.MesialCSSarray[47] = false;
        this.MesialCSSarray[46] = false;
        this.MesialCSSarray[45] = false;
        this.MesialCSSarray[44] = false;
        this.MesialCSSarray[43] = false;
        this.MesialCSSarray[42] = false;
        this.MesialCSSarray[41] = false;

        this.DistalCSSarray[48] = false;
        this.DistalCSSarray[47] = false;
        this.DistalCSSarray[46] = false;
        this.DistalCSSarray[45] = false;
        this.DistalCSSarray[44] = false;
        this.DistalCSSarray[43] = false;
        this.DistalCSSarray[42] = false;
        this.DistalCSSarray[41] = false;

        this.OcclusalCSSarray[48] = false;
        this.OcclusalCSSarray[47] = false;
        this.OcclusalCSSarray[46] = false;
        this.OcclusalCSSarray[45] = false;
        this.OcclusalCSSarray[44] = false;
        this.OcclusalCSSarray[43] = false;
        this.OcclusalCSSarray[42] = false;
        this.OcclusalCSSarray[41] = false;

        this.rootCSSarray[48] = false;
        this.rootCSSarray[47] = false;
        this.rootCSSarray[46] = false;
        this.rootCSSarray[45] = false;
        this.rootCSSarray[44] = false;
        this.rootCSSarray[43] = false;
        this.rootCSSarray[42] = false;
        this.rootCSSarray[41] = false;

        this.crownCSSarray[48] = false;
        this.crownCSSarray[47] = false;
        this.crownCSSarray[46] = false;
        this.crownCSSarray[45] = false;
        this.crownCSSarray[44] = false;
        this.crownCSSarray[43] = false;
        this.crownCSSarray[42] = false;
        this.crownCSSarray[41] = false;

        this.severalDamagedCSSarray[48] = false;
        this.severalDamagedCSSarray[47] = false;
        this.severalDamagedCSSarray[46] = false;
        this.severalDamagedCSSarray[45] = false;
        this.severalDamagedCSSarray[44] = false;
        this.severalDamagedCSSarray[43] = false;
        this.severalDamagedCSSarray[42] = false;
        this.severalDamagedCSSarray[41] = false;

        this.MildCSSarray[48] = false;
        this.MildCSSarray[47] = false;
        this.MildCSSarray[46] = false;
        this.MildCSSarray[45] = false;
        this.MildCSSarray[44] = false;
        this.MildCSSarray[43] = false;
        this.MildCSSarray[42] = false;
        this.MildCSSarray[41] = false;

        this.ModerateCSSarray[48] = false;
        this.ModerateCSSarray[47] = false;
        this.ModerateCSSarray[46] = false;
        this.ModerateCSSarray[45] = false;
        this.ModerateCSSarray[44] = false;
        this.ModerateCSSarray[43] = false;
        this.ModerateCSSarray[42] = false;
        this.ModerateCSSarray[41] = false;

        this.SevereCSSarray[48] = false;
        this.SevereCSSarray[47] = false;
        this.SevereCSSarray[46] = false;
        this.SevereCSSarray[45] = false;
        this.SevereCSSarray[44] = false;
        this.SevereCSSarray[43] = false;
        this.SevereCSSarray[42] = false;
        this.SevereCSSarray[41] = false;

        this.GingivalRecessionMildCSSArray[48] = false;
        this.GingivalRecessionMildCSSArray[47] = false;
        this.GingivalRecessionMildCSSArray[46] = false;
        this.GingivalRecessionMildCSSArray[45] = false;
        this.GingivalRecessionMildCSSArray[44] = false;
        this.GingivalRecessionMildCSSArray[43] = false;
        this.GingivalRecessionMildCSSArray[42] = false;
        this.GingivalRecessionMildCSSArray[41] = false;


        this.GingivalRecessionModerateCSSArray[48] = false;
        this.GingivalRecessionModerateCSSArray[47] = false;
        this.GingivalRecessionModerateCSSArray[46] = false;
        this.GingivalRecessionModerateCSSArray[45] = false;
        this.GingivalRecessionModerateCSSArray[44] = false;
        this.GingivalRecessionModerateCSSArray[43] = false;
        this.GingivalRecessionModerateCSSArray[42] = false;
        this.GingivalRecessionModerateCSSArray[41] = false;


        this.GingivalRecessionSevereCSSArray[48] = false;
        this.GingivalRecessionSevereCSSArray[47] = false;
        this.GingivalRecessionSevereCSSArray[46] = false;
        this.GingivalRecessionSevereCSSArray[45] = false;
        this.GingivalRecessionSevereCSSArray[44] = false;
        this.GingivalRecessionSevereCSSArray[43] = false;
        this.GingivalRecessionSevereCSSArray[42] = false;
        this.GingivalRecessionSevereCSSArray[41] = false;


        this.PeriodontitisMildCSSArray[48] = false;
        this.PeriodontitisMildCSSArray[47] = false;
        this.PeriodontitisMildCSSArray[46] = false;
        this.PeriodontitisMildCSSArray[45] = false;
        this.PeriodontitisMildCSSArray[44] = false;
        this.PeriodontitisMildCSSArray[43] = false;
        this.PeriodontitisMildCSSArray[42] = false;
        this.PeriodontitisMildCSSArray[41] = false;


        this.PeriodontitisModerateCSSArray[48] = false;
        this.PeriodontitisModerateCSSArray[47] = false;
        this.PeriodontitisModerateCSSArray[46] = false;
        this.PeriodontitisModerateCSSArray[45] = false;
        this.PeriodontitisModerateCSSArray[44] = false;
        this.PeriodontitisModerateCSSArray[43] = false;
        this.PeriodontitisModerateCSSArray[42] = false;
        this.PeriodontitisModerateCSSArray[41] = false;


        this.PeriodontitisSevereCSSArray[48] = false;
        this.PeriodontitisSevereCSSArray[47] = false;
        this.PeriodontitisSevereCSSArray[46] = false;
        this.PeriodontitisSevereCSSArray[45] = false;
        this.PeriodontitisSevereCSSArray[44] = false;
        this.PeriodontitisSevereCSSArray[43] = false;
        this.PeriodontitisSevereCSSArray[42] = false;
        this.PeriodontitisSevereCSSArray[41] = false;

        this.GummSmileCSSArray[48] = false;
        this.GummSmileCSSArray[47] = false;
        this.GummSmileCSSArray[46] = false;
        this.GummSmileCSSArray[45] = false;
        this.GummSmileCSSArray[44] = false;
        this.GummSmileCSSArray[43] = false;
        this.GummSmileCSSArray[42] = false;
        this.GummSmileCSSArray[41] = false;

        this.GingivalOvergrowthCSSArray[48] = false;
        this.GingivalOvergrowthCSSArray[47] = false;
        this.GingivalOvergrowthCSSArray[46] = false;
        this.GingivalOvergrowthCSSArray[45] = false;
        this.GingivalOvergrowthCSSArray[44] = false;
        this.GingivalOvergrowthCSSArray[43] = false;
        this.GingivalOvergrowthCSSArray[42] = false;
        this.GingivalOvergrowthCSSArray[41] = false;

        this.necrosisCSSArray[48] = false;
        this.necrosisCSSArray[47] = false;
        this.necrosisCSSArray[46] = false;
        this.necrosisCSSArray[45] = false;
        this.necrosisCSSArray[44] = false;
        this.necrosisCSSArray[43] = false;
        this.necrosisCSSArray[42] = false;
        this.necrosisCSSArray[41] = false;

        this.SatisfactoryCSSArray[48] = false;
        this.SatisfactoryCSSArray[47] = false;
        this.SatisfactoryCSSArray[46] = false;
        this.SatisfactoryCSSArray[45] = false;
        this.SatisfactoryCSSArray[44] = false;
        this.SatisfactoryCSSArray[43] = false;
        this.SatisfactoryCSSArray[42] = false;
        this.SatisfactoryCSSArray[41] = false;

        this.UnsatisfactoryCSSArray[48] = false;
        this.UnsatisfactoryCSSArray[47] = false;
        this.UnsatisfactoryCSSArray[46] = false;
        this.UnsatisfactoryCSSArray[45] = false;
        this.UnsatisfactoryCSSArray[44] = false;
        this.UnsatisfactoryCSSArray[43] = false;
        this.UnsatisfactoryCSSArray[42] = false;
        this.UnsatisfactoryCSSArray[41] = false;


        this.ApicalLesionMildCSSArray[48] = false;
        this.ApicalLesionMildCSSArray[47] = false;
        this.ApicalLesionMildCSSArray[46] = false;
        this.ApicalLesionMildCSSArray[45] = false;
        this.ApicalLesionMildCSSArray[44] = false;
        this.ApicalLesionMildCSSArray[43] = false;
        this.ApicalLesionMildCSSArray[42] = false;
        this.ApicalLesionMildCSSArray[41] = false;

        this.ApicalLesionModerateCSSArray[48] = false;
        this.ApicalLesionModerateCSSArray[47] = false;
        this.ApicalLesionModerateCSSArray[46] = false;
        this.ApicalLesionModerateCSSArray[45] = false;
        this.ApicalLesionModerateCSSArray[44] = false;
        this.ApicalLesionModerateCSSArray[43] = false;
        this.ApicalLesionModerateCSSArray[42] = false;
        this.ApicalLesionModerateCSSArray[41] = false;

        this.ApicalLesionSevereCSSArray[48] = false;
        this.ApicalLesionSevereCSSArray[47] = false;
        this.ApicalLesionSevereCSSArray[46] = false;
        this.ApicalLesionSevereCSSArray[45] = false;
        this.ApicalLesionSevereCSSArray[44] = false;
        this.ApicalLesionSevereCSSArray[43] = false;
        this.ApicalLesionSevereCSSArray[42] = false;
        this.ApicalLesionSevereCSSArray[41] = false;

        this.BrokenInstrumentinCanalCSSArray[48] = false;
        this.BrokenInstrumentinCanalCSSArray[47] = false;
        this.BrokenInstrumentinCanalCSSArray[46] = false;
        this.BrokenInstrumentinCanalCSSArray[45] = false;
        this.BrokenInstrumentinCanalCSSArray[44] = false;
        this.BrokenInstrumentinCanalCSSArray[43] = false;
        this.BrokenInstrumentinCanalCSSArray[42] = false;
        this.BrokenInstrumentinCanalCSSArray[41] = false;

        this.InternalCSSarray[48] = false;
        this.InternalCSSarray[47] = false;
        this.InternalCSSarray[46] = false;
        this.InternalCSSarray[45] = false;
        this.InternalCSSarray[44] = false;
        this.InternalCSSarray[43] = false;
        this.InternalCSSarray[42] = false;
        this.InternalCSSarray[41] = false;

        this.ExternalCSSarray[48] = false;
        this.ExternalCSSarray[47] = false;
        this.ExternalCSSarray[46] = false;
        this.ExternalCSSarray[45] = false;
        this.ExternalCSSarray[44] = false;
        this.ExternalCSSarray[43] = false;
        this.ExternalCSSarray[42] = false;
        this.ExternalCSSarray[41] = false;

        this.MissingTeethCSSArray[48] = false;
        this.MissingTeethCSSArray[47] = false;
        this.MissingTeethCSSArray[46] = false;
        this.MissingTeethCSSArray[45] = false;
        this.MissingTeethCSSArray[44] = false;
        this.MissingTeethCSSArray[43] = false;
        this.MissingTeethCSSArray[42] = false;
        this.MissingTeethCSSArray[41] = false;

        this.ImpactedTeethCSSArray[48] = false;
        this.ImpactedTeethCSSArray[47] = false;
        this.ImpactedTeethCSSArray[46] = false;
        this.ImpactedTeethCSSArray[45] = false;
        this.ImpactedTeethCSSArray[44] = false;
        this.ImpactedTeethCSSArray[43] = false;
        this.ImpactedTeethCSSArray[42] = false;
        this.ImpactedTeethCSSArray[41] = false;

        this.ImpactedInfectedTeethCSSArray[48] = false;
        this.ImpactedInfectedTeethCSSArray[47] = false;
        this.ImpactedInfectedTeethCSSArray[46] = false;
        this.ImpactedInfectedTeethCSSArray[45] = false;
        this.ImpactedInfectedTeethCSSArray[44] = false;
        this.ImpactedInfectedTeethCSSArray[43] = false;
        this.ImpactedInfectedTeethCSSArray[42] = false;
        this.ImpactedInfectedTeethCSSArray[41] = false;

        this.LargeMaxillarySinusCSSArray[48] = false;
        this.LargeMaxillarySinusCSSArray[47] = false;
        this.LargeMaxillarySinusCSSArray[46] = false;
        this.LargeMaxillarySinusCSSArray[45] = false;
        this.LargeMaxillarySinusCSSArray[44] = false;
        this.LargeMaxillarySinusCSSArray[43] = false;
        this.LargeMaxillarySinusCSSArray[42] = false;
        this.LargeMaxillarySinusCSSArray[41] = false;


        this.okCSSArray[48] = false;
        this.okCSSArray[47] = false;
        this.okCSSArray[46] = false;
        this.okCSSArray[45] = false;
        this.okCSSArray[44] = false;
        this.okCSSArray[43] = false;
        this.okCSSArray[42] = false;
        this.okCSSArray[41] = false;

        this.otherCSSArray[48] = false;
        this.otherCSSArray[47] = false;
        this.otherCSSArray[46] = false;
        this.otherCSSArray[45] = false;
        this.otherCSSArray[44] = false;
        this.otherCSSArray[43] = false;
        this.otherCSSArray[42] = false;
        this.otherCSSArray[41] = false;

        this.postokCSSArray[48] = false;
        this.postokCSSArray[47] = false;
        this.postokCSSArray[46] = false;
        this.postokCSSArray[45] = false;
        this.postokCSSArray[44] = false;
        this.postokCSSArray[43] = false;
        this.postokCSSArray[42] = false;
        this.postokCSSArray[41] = false;

        this.postunsatisfactoryCSSArray[48] = false;
        this.postunsatisfactoryCSSArray[47] = false;
        this.postunsatisfactoryCSSArray[46] = false;
        this.postunsatisfactoryCSSArray[45] = false;
        this.postunsatisfactoryCSSArray[44] = false;
        this.postunsatisfactoryCSSArray[43] = false;
        this.postunsatisfactoryCSSArray[42] = false;
        this.postunsatisfactoryCSSArray[41] = false;

        this.DiscoloredCSSArray[48] = false;
        this.DiscoloredCSSArray[47] = false;
        this.DiscoloredCSSArray[46] = false;
        this.DiscoloredCSSArray[45] = false;
        this.DiscoloredCSSArray[44] = false;
        this.DiscoloredCSSArray[43] = false;
        this.DiscoloredCSSArray[42] = false;
        this.DiscoloredCSSArray[41] = false;

      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }
    if (id === '4') {
      if (this.teeth31 === false && this.teeth32 === false && this.teeth33 === false && this.teeth34 === false && this.teeth35 === false && this.teeth36 === false && this.teeth37 === false && this.teeth38 === false) {
        this.teeth31 = true; this.teeth32 = true; this.teeth33 = true; this.teeth34 = true; this.teeth35 = true;
        this.teeth36 = true; this.teeth37 = true; this.teeth38 = true;
        this.selectedTeethValue.push(31, 32, 33, 34, 35, 36, 37, 38);
        if (this.Buccalchecked === true) {
          this.BuccalCSSarray[31] = true;
          this.BuccalCSSarray[32] = true;
          this.BuccalCSSarray[33] = true;
          this.BuccalCSSarray[34] = true;
          this.BuccalCSSarray[35] = true;
          this.BuccalCSSarray[36] = true;
          this.BuccalCSSarray[37] = true;
          this.BuccalCSSarray[38] = true;
        }
        if (this.Lingualchecked === true) {
          this.LingualCSSarray[31] = true;
          this.LingualCSSarray[32] = true;
          this.LingualCSSarray[33] = true;
          this.LingualCSSarray[34] = true;
          this.LingualCSSarray[35] = true;
          this.LingualCSSarray[36] = true;
          this.LingualCSSarray[37] = true;
          this.LingualCSSarray[38] = true;
        }
        if (this.Mesialchecked === true) {
          this.MesialCSSarray[31] = true;
          this.MesialCSSarray[32] = true;
          this.MesialCSSarray[33] = true;
          this.MesialCSSarray[34] = true;
          this.MesialCSSarray[35] = true;
          this.MesialCSSarray[36] = true;
          this.MesialCSSarray[37] = true;
          this.MesialCSSarray[38] = true;
        }
        if (this.Distalchecked === true) {
          this.DistalCSSarray[31] = true;
          this.DistalCSSarray[32] = true;
          this.DistalCSSarray[33] = true;
          this.DistalCSSarray[34] = true;
          this.DistalCSSarray[35] = true;
          this.DistalCSSarray[36] = true;
          this.DistalCSSarray[37] = true;
          this.DistalCSSarray[38] = true;
        }
        if (this.Occlusalchecked === true) {
          this.OcclusalCSSarray[31] = true;
          this.OcclusalCSSarray[32] = true;
          this.OcclusalCSSarray[33] = true;
          this.OcclusalCSSarray[34] = true;
          this.OcclusalCSSarray[35] = true;
          this.OcclusalCSSarray[36] = true;
          this.OcclusalCSSarray[37] = true;
          this.OcclusalCSSarray[38] = true;
        }


        if (this.rootSection === true) {
          this.rootCSSarray[31] = true;
          this.rootCSSarray[32] = true;
          this.rootCSSarray[33] = true;
          this.rootCSSarray[34] = true;
          this.rootCSSarray[35] = true;
          this.rootCSSarray[36] = true;
          this.rootCSSarray[37] = true;
          this.rootCSSarray[38] = true;
        }
        if (this.crownSection === true) {
          this.crownCSSarray[31] = true;
          this.crownCSSarray[32] = true;
          this.crownCSSarray[33] = true;
          this.crownCSSarray[34] = true;
          this.crownCSSarray[35] = true;
          this.crownCSSarray[36] = true;
          this.crownCSSarray[37] = true;
          this.crownCSSarray[38] = true;
        }
        if (this.severalDamaged === true) {
          this.severalDamagedCSSarray[31] = true;
          this.severalDamagedCSSarray[32] = true;
          this.severalDamagedCSSarray[33] = true;
          this.severalDamagedCSSarray[34] = true;
          this.severalDamagedCSSarray[35] = true;
          this.severalDamagedCSSarray[36] = true;
          this.severalDamagedCSSarray[37] = true;
          this.severalDamagedCSSarray[38] = true;
        }
        if (this.MildSection === true) {
          this.MildCSSarray[31] = true;
          this.MildCSSarray[32] = true;
          this.MildCSSarray[33] = true;
          this.MildCSSarray[34] = true;
          this.MildCSSarray[35] = true;
          this.MildCSSarray[36] = true;
          this.MildCSSarray[37] = true;
          this.MildCSSarray[38] = true;
        }
        if (this.ModerateSection === true) {
          this.ModerateCSSarray[31] = true;
          this.ModerateCSSarray[32] = true;
          this.ModerateCSSarray[33] = true;
          this.ModerateCSSarray[34] = true;
          this.ModerateCSSarray[35] = true;
          this.ModerateCSSarray[36] = true;
          this.ModerateCSSarray[37] = true;
          this.ModerateCSSarray[38] = true;
        }
        if (this.SevereSection === true) {
          this.SevereCSSarray[31] = true;
          this.SevereCSSarray[32] = true;
          this.SevereCSSarray[33] = true;
          this.SevereCSSarray[34] = true;
          this.SevereCSSarray[35] = true;
          this.SevereCSSarray[36] = true;
          this.SevereCSSarray[37] = true;
          this.SevereCSSarray[38] = true;
        }
        if (this.GingivalRecessionMild === true) {
          this.GingivalRecessionMildCSSArray[31] = true;
          this.GingivalRecessionMildCSSArray[32] = true;
          this.GingivalRecessionMildCSSArray[33] = true;
          this.GingivalRecessionMildCSSArray[34] = true;
          this.GingivalRecessionMildCSSArray[35] = true;
          this.GingivalRecessionMildCSSArray[36] = true;
          this.GingivalRecessionMildCSSArray[37] = true;
          this.GingivalRecessionMildCSSArray[38] = true;
        }
        if (this.GingivalRecessionModerate === true) {
          this.GingivalRecessionModerateCSSArray[31] = true;
          this.GingivalRecessionModerateCSSArray[32] = true;
          this.GingivalRecessionModerateCSSArray[33] = true;
          this.GingivalRecessionModerateCSSArray[34] = true;
          this.GingivalRecessionModerateCSSArray[35] = true;
          this.GingivalRecessionModerateCSSArray[36] = true;
          this.GingivalRecessionModerateCSSArray[37] = true;
          this.GingivalRecessionModerateCSSArray[38] = true;
        }
        if (this.GingivalRecessionSevere === true) {
          this.GingivalRecessionSevereCSSArray[31] = true;
          this.GingivalRecessionSevereCSSArray[32] = true;
          this.GingivalRecessionSevereCSSArray[33] = true;
          this.GingivalRecessionSevereCSSArray[34] = true;
          this.GingivalRecessionSevereCSSArray[35] = true;
          this.GingivalRecessionSevereCSSArray[36] = true;
          this.GingivalRecessionSevereCSSArray[37] = true;
          this.GingivalRecessionSevereCSSArray[38] = true;
        }

        if (this.PeriodontitisMild === true) {
          this.PeriodontitisMildCSSArray[31] = true;
          this.PeriodontitisMildCSSArray[32] = true;
          this.PeriodontitisMildCSSArray[33] = true;
          this.PeriodontitisMildCSSArray[34] = true;
          this.PeriodontitisMildCSSArray[35] = true;
          this.PeriodontitisMildCSSArray[36] = true;
          this.PeriodontitisMildCSSArray[37] = true;
          this.PeriodontitisMildCSSArray[38] = true;
        }
        if (this.PeriodontitisModerate === true) {
          this.PeriodontitisModerateCSSArray[31] = true;
          this.PeriodontitisModerateCSSArray[32] = true;
          this.PeriodontitisModerateCSSArray[33] = true;
          this.PeriodontitisModerateCSSArray[34] = true;
          this.PeriodontitisModerateCSSArray[35] = true;
          this.PeriodontitisModerateCSSArray[36] = true;
          this.PeriodontitisModerateCSSArray[37] = true;
          this.PeriodontitisModerateCSSArray[38] = true;
        }
        if (this.PeriodontitisSevere === true) {
          this.PeriodontitisSevereCSSArray[31] = true;
          this.PeriodontitisSevereCSSArray[32] = true;
          this.PeriodontitisSevereCSSArray[33] = true;
          this.PeriodontitisSevereCSSArray[34] = true;
          this.PeriodontitisSevereCSSArray[35] = true;
          this.PeriodontitisSevereCSSArray[36] = true;
          this.PeriodontitisSevereCSSArray[37] = true;
          this.PeriodontitisSevereCSSArray[38] = true;
        }
        if (this.GummSmileActive === true) {
          this.GummSmileCSSArray[31] = true;
          this.GummSmileCSSArray[32] = true;
          this.GummSmileCSSArray[33] = true;
          this.GummSmileCSSArray[34] = true;
          this.GummSmileCSSArray[35] = true;
          this.GummSmileCSSArray[36] = true;
          this.GummSmileCSSArray[37] = true;
          this.GummSmileCSSArray[38] = true;
        }
        if (this.GingivalOvergrowthActive === true) {
          this.GingivalOvergrowthCSSArray[31] = true;
          this.GingivalOvergrowthCSSArray[32] = true;
          this.GingivalOvergrowthCSSArray[33] = true;
          this.GingivalOvergrowthCSSArray[34] = true;
          this.GingivalOvergrowthCSSArray[35] = true;
          this.GingivalOvergrowthCSSArray[36] = true;
          this.GingivalOvergrowthCSSArray[37] = true;
          this.GingivalOvergrowthCSSArray[38] = true;
        }
        if (this.necrosis === true) {
          this.necrosisCSSArray[31] = true;
          this.necrosisCSSArray[32] = true;
          this.necrosisCSSArray[33] = true;
          this.necrosisCSSArray[34] = true;
          this.necrosisCSSArray[35] = true;
          this.necrosisCSSArray[36] = true;
          this.necrosisCSSArray[37] = true;
          this.necrosisCSSArray[38] = true;
        }

        if (this.saticfactory === true) {
          this.SatisfactoryCSSArray[31] = true;
          this.SatisfactoryCSSArray[32] = true;
          this.SatisfactoryCSSArray[33] = true;
          this.SatisfactoryCSSArray[34] = true;
          this.SatisfactoryCSSArray[35] = true;
          this.SatisfactoryCSSArray[36] = true;
          this.SatisfactoryCSSArray[37] = true;
          this.SatisfactoryCSSArray[38] = true;
        }
        if (this.unsatisfactory === true) {
          this.UnsatisfactoryCSSArray[31] = true;
          this.UnsatisfactoryCSSArray[32] = true;
          this.UnsatisfactoryCSSArray[33] = true;
          this.UnsatisfactoryCSSArray[35] = true;
          this.UnsatisfactoryCSSArray[35] = true;
          this.UnsatisfactoryCSSArray[36] = true;
          this.UnsatisfactoryCSSArray[37] = true;
          this.UnsatisfactoryCSSArray[38] = true;
        }

        if (this.ApicalLesionMild === true) {
          this.ApicalLesionMildCSSArray[31] = true;
          this.ApicalLesionMildCSSArray[32] = true;
          this.ApicalLesionMildCSSArray[33] = true;
          this.ApicalLesionMildCSSArray[35] = true;
          this.ApicalLesionMildCSSArray[35] = true;
          this.ApicalLesionMildCSSArray[36] = true;
          this.UnsatisfactoryCSSArray[37] = true;
          this.ApicalLesionMildCSSArray[38] = true;
        }
        if (this.ApicalLesionModerate === true) {
          this.ApicalLesionModerateCSSArray[31] = true;
          this.ApicalLesionModerateCSSArray[32] = true;
          this.ApicalLesionModerateCSSArray[33] = true;
          this.ApicalLesionModerateCSSArray[35] = true;
          this.ApicalLesionModerateCSSArray[35] = true;
          this.ApicalLesionModerateCSSArray[36] = true;
          this.ApicalLesionModerateCSSArray[37] = true;
          this.ApicalLesionModerateCSSArray[38] = true;
        }
        if (this.ApicalLesionSevere === true) {
          this.ApicalLesionSevereCSSArray[31] = true;
          this.ApicalLesionSevereCSSArray[32] = true;
          this.ApicalLesionSevereCSSArray[33] = true;
          this.ApicalLesionSevereCSSArray[35] = true;
          this.ApicalLesionSevereCSSArray[35] = true;
          this.ApicalLesionSevereCSSArray[36] = true;
          this.ApicalLesionSevereCSSArray[37] = true;
          this.ApicalLesionSevereCSSArray[38] = true;
        }
        if (this.BrokenInstrumentinCanal === true) {
          this.BrokenInstrumentinCanalCSSArray[31] = true;
          this.BrokenInstrumentinCanalCSSArray[32] = true;
          this.BrokenInstrumentinCanalCSSArray[33] = true;
          this.BrokenInstrumentinCanalCSSArray[35] = true;
          this.BrokenInstrumentinCanalCSSArray[35] = true;
          this.BrokenInstrumentinCanalCSSArray[36] = true;
          this.BrokenInstrumentinCanalCSSArray[37] = true;
          this.BrokenInstrumentinCanalCSSArray[38] = true;
        }
        if (this.Internalchecked === true) {
          this.InternalCSSarray[31] = true;
          this.InternalCSSarray[32] = true;
          this.InternalCSSarray[33] = true;
          this.InternalCSSarray[35] = true;
          this.InternalCSSarray[35] = true;
          this.InternalCSSarray[36] = true;
          this.InternalCSSarray[37] = true;
          this.InternalCSSarray[38] = true;
        }
        if (this.Externalchecked === true) {
          this.ExternalCSSarray[31] = true;
          this.ExternalCSSarray[32] = true;
          this.ExternalCSSarray[33] = true;
          this.ExternalCSSarray[35] = true;
          this.ExternalCSSarray[35] = true;
          this.ExternalCSSarray[36] = true;
          this.ExternalCSSarray[37] = true;
          this.ExternalCSSarray[38] = true;
        }
        if (this.MissingTeethActive === true) {
          this.MissingTeethCSSArray[31] = true;
          this.MissingTeethCSSArray[32] = true;
          this.MissingTeethCSSArray[33] = true;
          this.MissingTeethCSSArray[34] = true;
          this.MissingTeethCSSArray[35] = true;
          this.MissingTeethCSSArray[36] = true;
          this.MissingTeethCSSArray[37] = true;
          this.MissingTeethCSSArray[38] = true;

        }
        if (this.ImpactedTeethActive === true) {
          this.ImpactedTeethCSSArray[31] = true;
          this.ImpactedTeethCSSArray[32] = true;
          this.ImpactedTeethCSSArray[33] = true;
          this.ImpactedTeethCSSArray[34] = true;
          this.ImpactedTeethCSSArray[35] = true;
          this.ImpactedTeethCSSArray[36] = true;
          this.ImpactedTeethCSSArray[37] = true;
          this.ImpactedTeethCSSArray[38] = true;
        }
        if (this.ImpactedInfectedTeethActive === true) {
          this.ImpactedInfectedTeethCSSArray[31] = true;
          this.ImpactedInfectedTeethCSSArray[32] = true;
          this.ImpactedInfectedTeethCSSArray[33] = true;
          this.ImpactedInfectedTeethCSSArray[34] = true;
          this.ImpactedInfectedTeethCSSArray[35] = true;
          this.ImpactedInfectedTeethCSSArray[36] = true;
          this.ImpactedInfectedTeethCSSArray[37] = true;
          this.ImpactedInfectedTeethCSSArray[38] = true;
        }
        if (this.LargeMaxillarySinusActive === true) {
          this.LargeMaxillarySinusCSSArray[31] = true;
          this.LargeMaxillarySinusCSSArray[32] = true;
          this.LargeMaxillarySinusCSSArray[33] = true;
          this.LargeMaxillarySinusCSSArray[34] = true;
          this.LargeMaxillarySinusCSSArray[35] = true;
          this.LargeMaxillarySinusCSSArray[36] = true;
          this.LargeMaxillarySinusCSSArray[37] = true;
          this.LargeMaxillarySinusCSSArray[38] = true;
        }
        if (this.okk === true) {
          this.okCSSArray[31] = true;
          this.okCSSArray[32] = true;
          this.okCSSArray[33] = true;
          this.okCSSArray[34] = true;
          this.okCSSArray[35] = true;
          this.okCSSArray[36] = true;
          this.okCSSArray[37] = true;
          this.okCSSArray[38] = true;
        }
        if (this.otherr === true) {
          this.otherCSSArray[31] = true;
          this.otherCSSArray[32] = true;
          this.otherCSSArray[33] = true;
          this.otherCSSArray[34] = true;
          this.otherCSSArray[35] = true;
          this.otherCSSArray[36] = true;
          this.otherCSSArray[37] = true;
          this.otherCSSArray[38] = true;
        }

        if (this.postok === true) {
          this.postokCSSArray[31] = true;
          this.postokCSSArray[32] = true;
          this.postokCSSArray[33] = true;
          this.postokCSSArray[34] = true;
          this.postokCSSArray[35] = true;
          this.postokCSSArray[36] = true;
          this.postokCSSArray[37] = true;
          this.postokCSSArray[38] = true;
        }
        if (this.postunsatisfactory === true) {
          this.postunsatisfactoryCSSArray[31] = true;
          this.postunsatisfactoryCSSArray[32] = true;
          this.postunsatisfactoryCSSArray[33] = true;
          this.postunsatisfactoryCSSArray[34] = true;
          this.postunsatisfactoryCSSArray[35] = true;
          this.postunsatisfactoryCSSArray[36] = true;
          this.postunsatisfactoryCSSArray[37] = true;
          this.postunsatisfactoryCSSArray[38] = true;
        }

        if (this.DiscoloredTeethActive === true) {
          this.DiscoloredCSSArray[31] = true;
          this.DiscoloredCSSArray[32] = true;
          this.DiscoloredCSSArray[33] = true;
          this.DiscoloredCSSArray[34] = true;
          this.DiscoloredCSSArray[35] = true;
          this.DiscoloredCSSArray[36] = true;
          this.DiscoloredCSSArray[37] = true;
          this.DiscoloredCSSArray[38] = true;
        }

      } else {
        this.teeth31 = false; this.teeth32 = false; this.teeth33 = false; this.teeth34 = false; this.teeth35 = false;
        this.teeth36 = false; this.teeth37 = false; this.teeth38 = false;
        const found31 = this.selectedTeethValue.findIndex(element => element === 31);
        
        this.selectedTeethValue.splice(found31, 8);
        
        this.LingualCSSarray[31] = false;
        this.LingualCSSarray[32] = false;
        this.LingualCSSarray[33] = false;
        this.LingualCSSarray[34] = false;
        this.LingualCSSarray[35] = false;
        this.LingualCSSarray[36] = false;
        this.LingualCSSarray[37] = false;
        this.LingualCSSarray[38] = false;

        
        
        this.BuccalCSSarray[31] = false;
        this.BuccalCSSarray[32] = false;
        this.BuccalCSSarray[33] = false;
        this.BuccalCSSarray[34] = false;
        this.BuccalCSSarray[35] = false;
        this.BuccalCSSarray[36] = false;
        this.BuccalCSSarray[37] = false;
        this.BuccalCSSarray[38] = false;


        
        
        this.MesialCSSarray[31] = false;
        this.MesialCSSarray[32] = false;
        this.MesialCSSarray[33] = false;
        this.MesialCSSarray[34] = false;
        this.MesialCSSarray[35] = false;
        this.MesialCSSarray[36] = false;
        this.MesialCSSarray[37] = false;
        this.MesialCSSarray[38] = false;

        this.DistalCSSarray[31] = false;
        this.DistalCSSarray[32] = false;
        this.DistalCSSarray[33] = false;
        this.DistalCSSarray[34] = false;
        this.DistalCSSarray[35] = false;
        this.DistalCSSarray[36] = false;
        this.DistalCSSarray[37] = false;
        this.DistalCSSarray[38] = false;

        this.OcclusalCSSarray[31] = false;
        this.OcclusalCSSarray[32] = false;
        this.OcclusalCSSarray[33] = false;
        this.OcclusalCSSarray[34] = false;
        this.OcclusalCSSarray[35] = false;
        this.OcclusalCSSarray[36] = false;
        this.OcclusalCSSarray[37] = false;
        this.OcclusalCSSarray[38] = false;

        this.rootCSSarray[31] = false;
        this.rootCSSarray[32] = false;
        this.rootCSSarray[33] = false;
        this.rootCSSarray[34] = false;
        this.rootCSSarray[35] = false;
        this.rootCSSarray[36] = false;
        this.rootCSSarray[37] = false;
        this.rootCSSarray[38] = false;

        this.crownCSSarray[31] = false;
        this.crownCSSarray[32] = false;
        this.crownCSSarray[33] = false;
        this.crownCSSarray[34] = false;
        this.crownCSSarray[35] = false;
        this.crownCSSarray[36] = false;
        this.crownCSSarray[37] = false;
        this.crownCSSarray[38] = false;

        this.severalDamagedCSSarray[31] = false;
        this.severalDamagedCSSarray[32] = false;
        this.severalDamagedCSSarray[33] = false;
        this.severalDamagedCSSarray[34] = false;
        this.severalDamagedCSSarray[35] = false;
        this.severalDamagedCSSarray[36] = false;
        this.severalDamagedCSSarray[37] = false;
        this.severalDamagedCSSarray[38] = false;


        this.MildCSSarray[31] = false;
        this.MildCSSarray[32] = false;
        this.MildCSSarray[33] = false;
        this.MildCSSarray[34] = false;
        this.MildCSSarray[35] = false;
        this.MildCSSarray[36] = false;
        this.MildCSSarray[37] = false;
        this.MildCSSarray[38] = false;

        this.ModerateCSSarray[31] = false;
        this.ModerateCSSarray[32] = false;
        this.ModerateCSSarray[33] = false;
        this.ModerateCSSarray[34] = false;
        this.ModerateCSSarray[35] = false;
        this.ModerateCSSarray[36] = false;
        this.ModerateCSSarray[37] = false;
        this.ModerateCSSarray[38] = false;

        this.SevereCSSarray[31] = false;
        this.SevereCSSarray[32] = false;
        this.SevereCSSarray[33] = false;
        this.SevereCSSarray[34] = false;
        this.SevereCSSarray[35] = false;
        this.SevereCSSarray[36] = false;
        this.SevereCSSarray[37] = false;
        this.SevereCSSarray[38] = false;

        this.GingivalRecessionMildCSSArray[31] = false;
        this.GingivalRecessionMildCSSArray[32] = false;
        this.GingivalRecessionMildCSSArray[33] = false;
        this.GingivalRecessionMildCSSArray[34] = false;
        this.GingivalRecessionMildCSSArray[35] = false;
        this.GingivalRecessionMildCSSArray[36] = false;
        this.GingivalRecessionMildCSSArray[37] = false;
        this.GingivalRecessionMildCSSArray[38] = false;

        this.GingivalRecessionModerateCSSArray[31] = false;
        this.GingivalRecessionModerateCSSArray[32] = false;
        this.GingivalRecessionModerateCSSArray[33] = false;
        this.GingivalRecessionModerateCSSArray[34] = false;
        this.GingivalRecessionModerateCSSArray[35] = false;
        this.GingivalRecessionModerateCSSArray[36] = false;
        this.GingivalRecessionModerateCSSArray[37] = false;
        this.GingivalRecessionModerateCSSArray[38] = false;

        this.GingivalRecessionSevereCSSArray[31] = false;
        this.GingivalRecessionSevereCSSArray[32] = false;
        this.GingivalRecessionSevereCSSArray[33] = false;
        this.GingivalRecessionSevereCSSArray[34] = false;
        this.GingivalRecessionSevereCSSArray[35] = false;
        this.GingivalRecessionSevereCSSArray[36] = false;
        this.GingivalRecessionSevereCSSArray[37] = false;
        this.GingivalRecessionSevereCSSArray[38] = false;

        this.PeriodontitisMildCSSArray[31] = false;
        this.PeriodontitisMildCSSArray[32] = false;
        this.PeriodontitisMildCSSArray[33] = false;
        this.PeriodontitisMildCSSArray[34] = false;
        this.PeriodontitisMildCSSArray[35] = false;
        this.PeriodontitisMildCSSArray[36] = false;
        this.PeriodontitisMildCSSArray[37] = false;
        this.PeriodontitisMildCSSArray[38] = false;

        this.PeriodontitisModerateCSSArray[31] = false;
        this.PeriodontitisModerateCSSArray[32] = false;
        this.PeriodontitisModerateCSSArray[33] = false;
        this.PeriodontitisModerateCSSArray[34] = false;
        this.PeriodontitisModerateCSSArray[35] = false;
        this.PeriodontitisModerateCSSArray[36] = false;
        this.PeriodontitisModerateCSSArray[37] = false;
        this.PeriodontitisModerateCSSArray[38] = false;

        this.PeriodontitisSevereCSSArray[31] = false;
        this.PeriodontitisSevereCSSArray[32] = false;
        this.PeriodontitisSevereCSSArray[33] = false;
        this.PeriodontitisSevereCSSArray[34] = false;
        this.PeriodontitisSevereCSSArray[35] = false;
        this.PeriodontitisSevereCSSArray[36] = false;
        this.PeriodontitisSevereCSSArray[37] = false;
        this.PeriodontitisSevereCSSArray[38] = false;

        this.GummSmileCSSArray[31] = false;
        this.GummSmileCSSArray[32] = false;
        this.GummSmileCSSArray[33] = false;
        this.GummSmileCSSArray[34] = false;
        this.GummSmileCSSArray[35] = false;
        this.GummSmileCSSArray[36] = false;
        this.GummSmileCSSArray[37] = false;
        this.GummSmileCSSArray[38] = false;

        this.GingivalOvergrowthCSSArray[31] = false;
        this.GingivalOvergrowthCSSArray[32] = false;
        this.GingivalOvergrowthCSSArray[33] = false;
        this.GingivalOvergrowthCSSArray[34] = false;
        this.GingivalOvergrowthCSSArray[35] = false;
        this.GingivalOvergrowthCSSArray[36] = false;
        this.GingivalOvergrowthCSSArray[37] = false;
        this.GingivalOvergrowthCSSArray[38] = false;

        this.necrosisCSSArray[31] = false;
        this.necrosisCSSArray[32] = false;
        this.necrosisCSSArray[33] = false;
        this.necrosisCSSArray[34] = false;
        this.necrosisCSSArray[35] = false;
        this.necrosisCSSArray[36] = false;
        this.necrosisCSSArray[37] = false;
        this.necrosisCSSArray[38] = false;

        this.SatisfactoryCSSArray[31] = false;
        this.SatisfactoryCSSArray[32] = false;
        this.SatisfactoryCSSArray[33] = false;
        this.SatisfactoryCSSArray[34] = false;
        this.SatisfactoryCSSArray[35] = false;
        this.SatisfactoryCSSArray[36] = false;
        this.SatisfactoryCSSArray[37] = false;
        this.SatisfactoryCSSArray[38] = false;

        this.UnsatisfactoryCSSArray[31] = false;
        this.UnsatisfactoryCSSArray[32] = false;
        this.UnsatisfactoryCSSArray[33] = false;
        this.UnsatisfactoryCSSArray[35] = false;
        this.UnsatisfactoryCSSArray[35] = false;
        this.UnsatisfactoryCSSArray[36] = false;
        this.UnsatisfactoryCSSArray[37] = false;
        this.UnsatisfactoryCSSArray[38] = false;

        this.ApicalLesionMildCSSArray[31] = false;
        this.ApicalLesionMildCSSArray[32] = false;
        this.ApicalLesionMildCSSArray[33] = false;
        this.ApicalLesionMildCSSArray[35] = false;
        this.ApicalLesionMildCSSArray[35] = false;
        this.ApicalLesionMildCSSArray[36] = false;
        this.UnsatisfactoryCSSArray[37] = false;
        this.ApicalLesionMildCSSArray[38] = false;

        this.ApicalLesionModerateCSSArray[31] = false;
        this.ApicalLesionModerateCSSArray[32] = false;
        this.ApicalLesionModerateCSSArray[33] = false;
        this.ApicalLesionModerateCSSArray[35] = false;
        this.ApicalLesionModerateCSSArray[35] = false;
        this.ApicalLesionModerateCSSArray[36] = false;
        this.ApicalLesionModerateCSSArray[37] = false;
        this.ApicalLesionModerateCSSArray[38] = false;

        this.ApicalLesionSevereCSSArray[31] = false;
        this.ApicalLesionSevereCSSArray[32] = false;
        this.ApicalLesionSevereCSSArray[33] = false;
        this.ApicalLesionSevereCSSArray[35] = false;
        this.ApicalLesionSevereCSSArray[35] = false;
        this.ApicalLesionSevereCSSArray[36] = false;
        this.ApicalLesionSevereCSSArray[37] = false;
        this.ApicalLesionSevereCSSArray[38] = false;

        this.BrokenInstrumentinCanalCSSArray[31] = false;
        this.BrokenInstrumentinCanalCSSArray[32] = false;
        this.BrokenInstrumentinCanalCSSArray[33] = false;
        this.BrokenInstrumentinCanalCSSArray[35] = false;
        this.BrokenInstrumentinCanalCSSArray[35] = false;
        this.BrokenInstrumentinCanalCSSArray[36] = false;
        this.BrokenInstrumentinCanalCSSArray[37] = false;
        this.BrokenInstrumentinCanalCSSArray[38] = false;

        this.InternalCSSarray[31] = false;
        this.InternalCSSarray[32] = false;
        this.InternalCSSarray[33] = false;
        this.InternalCSSarray[35] = false;
        this.InternalCSSarray[35] = false;
        this.InternalCSSarray[36] = false;
        this.InternalCSSarray[37] = false;
        this.InternalCSSarray[38] = false;

        this.ExternalCSSarray[31] = false;
        this.ExternalCSSarray[32] = false;
        this.ExternalCSSarray[33] = false;
        this.ExternalCSSarray[35] = false;
        this.ExternalCSSarray[35] = false;
        this.ExternalCSSarray[36] = false;
        this.ExternalCSSarray[37] = false;
        this.ExternalCSSarray[38] = false;

        this.MissingTeethCSSArray[31] = false;
        this.MissingTeethCSSArray[32] = false;
        this.MissingTeethCSSArray[33] = false;
        this.MissingTeethCSSArray[34] = false;
        this.MissingTeethCSSArray[35] = false;
        this.MissingTeethCSSArray[36] = false;
        this.MissingTeethCSSArray[37] = false;
        this.MissingTeethCSSArray[38] = false;

        this.ImpactedTeethCSSArray[31] = false;
        this.ImpactedTeethCSSArray[32] = false;
        this.ImpactedTeethCSSArray[33] = false;
        this.ImpactedTeethCSSArray[34] = false;
        this.ImpactedTeethCSSArray[35] = false;
        this.ImpactedTeethCSSArray[36] = false;
        this.ImpactedTeethCSSArray[37] = false;
        this.ImpactedTeethCSSArray[38] = false;

        this.ImpactedInfectedTeethCSSArray[31] = false;
        this.ImpactedInfectedTeethCSSArray[32] = false;
        this.ImpactedInfectedTeethCSSArray[33] = false;
        this.ImpactedInfectedTeethCSSArray[34] = false;
        this.ImpactedInfectedTeethCSSArray[35] = false;
        this.ImpactedInfectedTeethCSSArray[36] = false;
        this.ImpactedInfectedTeethCSSArray[37] = false;
        this.ImpactedInfectedTeethCSSArray[38] = false;

        this.LargeMaxillarySinusCSSArray[31] = false;
        this.LargeMaxillarySinusCSSArray[32] = false;
        this.LargeMaxillarySinusCSSArray[33] = false;
        this.LargeMaxillarySinusCSSArray[34] = false;
        this.LargeMaxillarySinusCSSArray[35] = false;
        this.LargeMaxillarySinusCSSArray[36] = false;
        this.LargeMaxillarySinusCSSArray[37] = false;
        this.LargeMaxillarySinusCSSArray[38] = false;


        this.okCSSArray[31] = false;
        this.okCSSArray[32] = false;
        this.okCSSArray[33] = false;
        this.okCSSArray[34] = false;
        this.okCSSArray[35] = false;
        this.okCSSArray[36] = false;
        this.okCSSArray[37] = false;
        this.okCSSArray[38] = false;

        this.otherCSSArray[31] = false;
        this.otherCSSArray[32] = false;
        this.otherCSSArray[33] = false;
        this.otherCSSArray[34] = false;
        this.otherCSSArray[35] = false;
        this.otherCSSArray[36] = false;
        this.otherCSSArray[37] = false;
        this.otherCSSArray[38] = false;

        this.postokCSSArray[31] = false;
        this.postokCSSArray[32] = false;
        this.postokCSSArray[33] = false;
        this.postokCSSArray[34] = false;
        this.postokCSSArray[35] = false;
        this.postokCSSArray[36] = false;
        this.postokCSSArray[37] = false;
        this.postokCSSArray[38] = false;

        this.postunsatisfactoryCSSArray[31] = false;
        this.postunsatisfactoryCSSArray[32] = false;
        this.postunsatisfactoryCSSArray[33] = false;
        this.postunsatisfactoryCSSArray[34] = false;
        this.postunsatisfactoryCSSArray[35] = false;
        this.postunsatisfactoryCSSArray[36] = false;
        this.postunsatisfactoryCSSArray[37] = false;
        this.postunsatisfactoryCSSArray[38] = false;

        this.DiscoloredCSSArray[31] = false;
        this.DiscoloredCSSArray[32] = false;
        this.DiscoloredCSSArray[33] = false;
        this.DiscoloredCSSArray[34] = false;
        this.DiscoloredCSSArray[35] = false;
        this.DiscoloredCSSArray[36] = false;
        this.DiscoloredCSSArray[37] = false;
        this.DiscoloredCSSArray[38] = false;

      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }
  }

  showOFT() {
    if (this.oftHide === false) {
      this.oftHide = true; this.malocclusion = true; this.facial = false; this.tmj = false;
    } else { this.malocclusion = true; this.facial = false; this.tmj = false; }
  }
  showFacial() { this.facial = true; this.malocclusion = false; this.tmj = false; this.oftHide = true; }

  TMJ() { this.facial = false; this.malocclusion = false; this.tmj = true; this.oftHide = true; }

  resetshowOFT() { if (this.oftHide === true) { this.oftHide = false; this.malocclusion = false; this.tmj = false; this.facial = false; } }



  Button1() {
    if (this.classII === false && this.classI === true) { this.classI = false; this.classII = true; }
    else if (this.classIII === true && this.classI === false) {
      this.classII = true; this.classI = false; this.classIII = false;
    } else if (this.classII === true && this.classI === false) { this.classI = true; this.classII = false; }
  }
  Button2() {
    if (this.classIII === false && this.classI === true) { this.classI = false; this.classIII = true; }
    else if (this.classII === true && this.classI === false) { this.classIII = true; this.classI = false; this.classII = false; }
    else if (this.classIII === true && this.classI === false) { this.classI = true; this.classIII = false; }
  }

  buttonT1() {
    if (this.class2 === false && this.class1 === true) { this.class1 = false; this.class2 = true; }
    else if (this.class3 === true && this.class1 === false) {
      this.class2 = true; this.class1 = false; this.class3 = false;
    } else if (this.class2 === true && this.class1 === false) { this.class1 = true; this.class2 = false; }
  }
  buttonT2() {
    if (this.class3 === false && this.class1 === true) { this.class1 = false; this.class3 = true; }
    else if (this.class2 === true && this.class1 === false) { this.class3 = true; this.class1 = false; this.class2 = false; }
    else if (this.class3 === true && this.class1 === false) { this.class1 = true; this.class3 = false; }
  }
  buttonT11() {
    if (this.class12 === false && this.class11 === true) { this.class11 = false; this.class12 = true; } else if
      (this.class13 === true && this.class11 === false) {
      this.class12 = true; this.class11 = false; this.class13 = false;
    } else if (this.class12 === true && this.class11 === false) { this.class11 = true; this.class12 = false; }
  }
  buttonT12() {
    if (this.class13 === false && this.class11 === true) { this.class11 = false; this.class13 = true; } else if
      (this.class12 === true && this.class11 === false) { this.class13 = true; this.class11 = false; this.class12 = false; } else if
      (this.class13 === true && this.class11 === false) { this.class11 = true; this.class13 = false; }
  }
  Button11() { if (this.classV === false) { this.classV = true; this.classIV = false; } else { this.classV = false; this.classIV = true; } }

  Button12() {
    if (this.crowding2 === false) { this.crowding2 = true; this.crowding1 = false; } else {
      this.crowding2 = false;
      this.crowding1 = true;
    }
  }

  Button13() {
    if (this.spacing2 === false) { this.spacing2 = true; this.spacing1 = false; } else {
      this.spacing2 = false; this.spacing1 = true;
    }
  }

  Button14() {
    if (this.posterior2 === false) { this.posterior2 = true; this.posterior1 = false; } else { this.posterior2 = false; this.posterior1 = true; }
  }

  Button15() {
    if (this.skeletal2 === false) { this.skeletal2 = true; this.skeletal1 = false; } else { this.skeletal2 = false; this.skeletal1 = true; }
  }


  //  caries section 


  CariesCheked(event, value) {
    if (value === 'Buccal') {
      if (event.target.checked === true) {
        this.Buccalchecked = true;
        this.caries.push(value);
        this.caries.toString();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.BuccalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Buccalchecked = false;
        const findValue = this.caries.indexOf(value);
        this.caries.splice(findValue, 1);
        this.caries.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.BuccalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Distal') {
      if (event.target.checked === true) {
        this.Distalchecked = true;
        this.caries.push(value);
        this.caries.toString();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.DistalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Distalchecked = false;
        const findValue = this.caries.indexOf(value);
        this.caries.splice(findValue, 1);
        this.caries.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.DistalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Lingual') {
      if (event.target.checked === true) {
        this.Lingualchecked = true;
        this.caries.push(value);
        this.caries.toString();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.LingualCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Lingualchecked = false;
        const findValue = this.caries.indexOf(value);
        this.caries.splice(findValue, 1);
        this.caries.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.LingualCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Mesial') {
      if (event.target.checked === true) {
        this.Mesialchecked = true;
        this.caries.push(value);
        this.caries.toString();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.MesialCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Mesialchecked = false;
        const findValue = this.caries.indexOf(value);
        this.caries.splice(findValue, 1);
        this.caries.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.MesialCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Occlusal') {
      if (event.target.checked === true) {
        this.Occlusalchecked = true;
        this.caries.push(value);
        this.caries.toString();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.OcclusalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Occlusalchecked = false;
        const findValue = this.caries.indexOf(value);
        this.caries.splice(findValue, 1);
        this.caries.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.OcclusalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }


  }



  CarriesTeethFn() {
    if (this.teeth18 === false) {
      if (this.Mesialchecked === true) { this.MesialCSSarray[18] = true; }
      if (this.Distalchecked === true) { this.DistalCSSarray[18] = true; }
      if (this.Lingualchecked === true) { this.LingualCSSarray[18] = true; }
      if (this.Occlusalchecked === true) { this.OcclusalCSSarray[18] = true; }
      if (this.Buccalchecked === true) { this.BuccalCSSarray[18] = true; }
    } else {
      this.BuccalCSSarray[18] = false; this.DistalCSSarray[18] = false; this.OcclusalCSSarray[18] = false;
      this.LingualCSSarray[18] = false; this.MesialCSSarray[18] = false;
    }
    if (this.teeth17 === false) {
      if (this.Mesialchecked === true) { this.MesialCSSarray[17] = true; }
      if (this.Distalchecked === true) { this.DistalCSSarray[17] = true; }
      if (this.Lingualchecked === true) { this.LingualCSSarray[17] = true; }
      if (this.Occlusalchecked === true) { this.OcclusalCSSarray[17] = true; }
      if (this.Buccalchecked === true) { this.BuccalCSSarray[17] = true; }
    } else {
      this.BuccalCSSarray[17] = false; this.DistalCSSarray[17] = false; this.OcclusalCSSarray[17] = false;
      this.LingualCSSarray[17] = false; this.MesialCSSarray[17] = false;
    }
  }

  // fracture section

  fracture(event, value) {
    this.FractureValue = value;
    if (value === 'Crown') {
      this.crownSection = true;
      this.rootSection = false;
      const findvalue = this.fractures.indexOf('Crown');
      const findDvalue = this.fractures.indexOf('Root');
      if (findvalue === -1) { this.fractures.push(value); }
      if (findDvalue !== -1) { this.fractures.splice(findDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.crownSection === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownCSSarray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.rootSection === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.rootCSSarray[this.selectedTeethValue[i]] = false;
        }
      }

    } else if (value === 'Root') {
      this.crownSection = false;
      this.rootSection = true;
      const findvalue = this.fractures.indexOf('Root');
      const findDvalue = this.fractures.indexOf('Crown');
      if (findvalue === -1) { this.fractures.push(value); }
      if (findDvalue !== -1) { this.fractures.splice(findDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.rootSection === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.rootCSSarray[this.selectedTeethValue[i]] = true;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.crownSection === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownCSSarray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  resetData(value) {
    this.Periotagvalue = value;
    if (value === 'caries') {
      this.cariesActive = true;
      this.fractureActive = false;
      this.severalDamaged = false;
      this.wearActive = false;

    } else if (value === 'fracture') {
      this.fractureActive = true;
      this.cariesActive = false;
      this.severalDamaged = false;
      this.wearActive = false;

    } else if (value === 'Severely Damaged') {
      this.severalDamaged = true;
      this.fractureActive = false;
      this.cariesActive = false;
      this.wearActive = false;


    } else if (value === 'Wear') {
      this.severalDamaged = false;
      this.fractureActive = false;
      this.cariesActive = false;
      this.wearActive = true;

    }
  }

  //  right panel  function 
  ActiveRightPenel(value) {
    if (value === 'CariesFracturesWear') {
      this.CariesFracturesWear = true;
      this.PerioBone = false;
      this.Endodontics = false;
      this.MissingteethImplants = false
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'PerioBone') {
      this.CariesFracturesWear = false;
      this.PerioBone = true;
      this.Endodontics = false;
      this.MissingteethImplants = false;
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'Endodontics') {
      this.Endodontics = true;
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.MissingteethImplants = false;
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'Missing teeth Implants') {
      this.Endodontics = false;
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.RestorativeColor = false;
      this.MissingteethImplants = true;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'Restorative Color') {
      this.RestorativeColor = true;
      this.Endodontics = false;
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.MissingteethImplants = false
      this.teethhidden = false;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'Prosthodontics') {
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.Endodontics = false;
      this.MissingteethImplants = false;
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = true;
      this.OtherTab = false;
      this.OrtoFacialTMJ = false;
    } else if (value === 'Other') {
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.Endodontics = false;
      this.MissingteethImplants = false;
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = false;
      this.OtherTab = true;
      this.OrtoFacialTMJ = false;
    } else if (value === 'OrtoFacialTMJ') {
      this.CariesFracturesWear = false;
      this.PerioBone = false;
      this.Endodontics = false;
      this.MissingteethImplants = false;
      this.teethhidden = false;
      this.RestorativeColor = false;
      this.Prosthodontics = false;
      this.OtherTab = false;
      this.OrtoFacialTMJ = true;
    }

  }

  // SeverelyDamaged section

  SeverelyDamaged() {
    this.SeverelyDamagedForms.SeverelyDamaged = true;
    this.severalDamaged = true;
    this.fractureActive = false;
    this.cariesActive = false;
    this.wearActive = false;
    const findvalue = this.severalDamagedLabel.indexOf('Severely Damaged');
    if (findvalue === -1) { this.severalDamagedLabel.push('Severely Damaged'); }
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.severalDamagedCSSarray[this.selectedTeethValue[i]] = true;
        this.teethArr.forEach(element => {
          if (element.num === this.selectedTeethValue[i])
            element.diagnosis.severelyDamaged = true;
        });
      }
    }
  }

  Wear(value) {
    this.WearValue = value;
    if (value === 'Mild') {
      this.MildSection = true;
      this.SevereSection = false;
      this.ModerateSection = false;
      const findvalue = this.wear.indexOf('Mild');
      const findSevereDvalue = this.wear.indexOf('Severe');
      const findModeratevalue = this.wear.indexOf('Moderate');

      if (findvalue === -1) { this.wear.push(value); }
      if (findSevereDvalue !== -1) { this.wear.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.wear.splice(findModeratevalue, 1); }

      if (this.selectedTeethValue.length > 0 && this.MildSection === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.MildCSSarray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.SevereSection === false || this.ModerateSection === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ModerateCSSarray[this.selectedTeethValue[i]] = false;
          this.SevereCSSarray[this.selectedTeethValue[i]] = false;

        }
      }

    } else if (value === 'Moderate') {
      this.MildSection = false;
      this.SevereSection = false;
      this.ModerateSection = true;
      const findvalue = this.wear.indexOf('Moderate');
      const findSevereDvalue = this.wear.indexOf('Severe');
      const findMildvalue = this.wear.indexOf('Mild');

      if (findvalue === -1) { this.wear.push(value); }
      if (findSevereDvalue !== -1) { this.wear.splice(findSevereDvalue, 1); }
      if (findMildvalue !== -1) { this.wear.splice(findMildvalue, 1); }

      if (this.selectedTeethValue.length > 0 && this.ModerateSection === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ModerateCSSarray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.SevereSection === false || this.MildSection === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.SevereCSSarray[this.selectedTeethValue[i]] = false;
          this.MildCSSarray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Severe') {
      this.MildSection = false;
      this.SevereSection = true;
      this.ModerateSection = false;
      const findvalue = this.wear.indexOf('Severe');
      const findModerateDvalue = this.wear.indexOf('Moderate');
      const findMildvalue = this.wear.indexOf('Mild');

      if (findvalue === -1) { this.wear.push(value); }
      if (findModerateDvalue !== -1) { this.wear.splice(findModerateDvalue, 1); }
      if (findMildvalue !== -1) { this.wear.splice(findMildvalue, 1); }

      if (this.selectedTeethValue.length > 0 && this.SevereSection === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.SevereCSSarray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.MildSection === false || this.ModerateSection === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ModerateCSSarray[this.selectedTeethValue[i]] = false;
          this.MildCSSarray[this.selectedTeethValue[i]] = false;

        }
      }
    }
  }

  //  second teb perio bone
  PlaqueHygiene(value) {
    if (value === 'Mild') {
      const findvalue = this.PlaqueHygieneDegree.indexOf('Mild');
      const findSevereDvalue = this.PlaqueHygieneDegree.indexOf('Severe');
      const findModeratevalue = this.PlaqueHygieneDegree.indexOf('Moderate');

      if (findvalue === -1) { this.PlaqueHygieneDegree.push(value); }
      if (findSevereDvalue !== -1) { this.PlaqueHygieneDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.PlaqueHygieneDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Severe') {
      const findvalue = this.wear.indexOf('Severe');
      const findMildDvalue = this.PlaqueHygieneDegree.indexOf('Mild');
      const findModeratevalue = this.PlaqueHygieneDegree.indexOf('Moderate');

      if (findvalue === -1) { this.PlaqueHygieneDegree.push(value); }
      if (findMildDvalue !== -1) { this.PlaqueHygieneDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.PlaqueHygieneDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Moderate') {
      const findvalue = this.PlaqueHygieneDegree.indexOf('Moderate');
      const findSevereDvalue = this.PlaqueHygieneDegree.indexOf('Severe');
      const findMildDvalue = this.PlaqueHygieneDegree.indexOf('Mild');

      if (findvalue === -1) { this.PlaqueHygieneDegree.push(value); }
      if (findSevereDvalue !== -1) { this.PlaqueHygieneDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.PlaqueHygieneDegree.splice(findMildDvalue, 1); }
    }

  }

  Gingivitis(value) {
    if (value === 'Mild') {
      const findvalue = this.GingivitisDegree.indexOf('Mild');
      const findSevereDvalue = this.GingivitisDegree.indexOf('Severe');
      const findModeratevalue = this.GingivitisDegree.indexOf('Moderate');

      if (findvalue === -1) { this.GingivitisDegree.push(value); }
      if (findSevereDvalue !== -1) { this.GingivitisDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.GingivitisDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Severe') {
      const findvalue = this.GingivitisDegree.indexOf('Severe');
      const findMildDvalue = this.GingivitisDegree.indexOf('Mild');
      const findModeratevalue = this.GingivitisDegree.indexOf('Moderate');

      if (findvalue === -1) { this.GingivitisDegree.push(value); }
      if (findMildDvalue !== -1) { this.GingivitisDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.GingivitisDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Moderate') {
      const findvalue = this.GingivitisDegree.indexOf('Moderate');
      const findSevereDvalue = this.GingivitisDegree.indexOf('Severe');
      const findMildDvalue = this.GingivitisDegree.indexOf('Mild');

      if (findvalue === -1) { this.GingivitisDegree.push(value); }
      if (findSevereDvalue !== -1) { this.GingivitisDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.GingivitisDegree.splice(findMildDvalue, 1); }
    }

  }
  GingivalRecession(value) {
    if (value === 'Mild') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.GingivalRecessionMild = true;
      this.GingivalRecessionModerate = false;
      this.GingivalRecessionSevere = false;
      const findvalue = this.GingivalRecessionDegree.indexOf('Mild');
      const findSevereDvalue = this.GingivalRecessionDegree.indexOf('Severe');
      const findModeratevalue = this.GingivalRecessionDegree.indexOf('Moderate');
      if (findvalue === -1) { this.GingivalRecessionDegree.push(value); }
      if (findSevereDvalue !== -1) { this.GingivalRecessionDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.GingivalRecessionDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionMild === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionMildCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionSevere === false || this.GingivalRecessionModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.GingivalRecessionSevereCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Severe') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.GingivalRecessionMild = false;
      this.GingivalRecessionModerate = false;
      this.GingivalRecessionSevere = true;
      const findvalue = this.GingivalRecessionDegree.indexOf('Severe');
      const findMildDvalue = this.GingivalRecessionDegree.indexOf('Mild');
      const findModeratevalue = this.GingivalRecessionDegree.indexOf('Moderate');

      if (findvalue === -1) { this.GingivalRecessionDegree.push(value); }
      if (findMildDvalue !== -1) { this.GingivalRecessionDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.GingivalRecessionDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionSevere === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionSevereCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionMild === false || this.GingivalRecessionModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.GingivalRecessionMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Moderate') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.GingivalRecessionMild = false;
      this.GingivalRecessionModerate = true;
      this.GingivalRecessionSevere = false;
      const findvalue = this.GingivalRecessionDegree.indexOf('Moderate');
      const findSevereDvalue = this.GingivalRecessionDegree.indexOf('Severe');
      const findMildDvalue = this.GingivalRecessionDegree.indexOf('Mild');

      if (findvalue === -1) { this.GingivalRecessionDegree.push(value); }
      if (findSevereDvalue !== -1) { this.GingivalRecessionDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.GingivalRecessionDegree.splice(findMildDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionModerate === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionModerateCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.GingivalRecessionMild === false || this.GingivalRecessionSevere === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.GingivalRecessionSevereCSSArray[this.selectedTeethValue[i]] = false;
          this.GingivalRecessionMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    }

  }

  Periodontitis(value) {
    if (value === 'Mild') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.PeriodontitisMild = true;
      this.PeriodontitisModerate = false;
      this.PeriodontitisSevere = false;
      const findvalue = this.PeriodontitisDegree.indexOf('Mild');
      const findSevereDvalue = this.PeriodontitisDegree.indexOf('Severe');
      const findModeratevalue = this.PeriodontitisDegree.indexOf('Moderate');
      if (findvalue === -1) { this.PeriodontitisDegree.push(value); }
      if (findSevereDvalue !== -1) { this.PeriodontitisDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.PeriodontitisDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.PeriodontitisMild === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisMildCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.PeriodontitisSevere === false || this.PeriodontitisModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.PeriodontitisSevereCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Severe') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.PeriodontitisMild = false;
      this.PeriodontitisModerate = false;
      this.PeriodontitisSevere = true;
      const findvalue = this.PeriodontitisDegree.indexOf('Severe');
      const findMildDvalue = this.PeriodontitisDegree.indexOf('Mild');
      const findModeratevalue = this.PeriodontitisDegree.indexOf('Moderate');

      if (findvalue === -1) { this.PeriodontitisDegree.push(value); }
      if (findMildDvalue !== -1) { this.PeriodontitisDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.PeriodontitisDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.PeriodontitisSevere === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisSevereCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.PeriodontitisMild === false || this.PeriodontitisModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.PeriodontitisMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Moderate') {
      this.GingivalRecessionactive = false;
      this.PeriodontitisActive = false;
      this.PeriodontitisMild = false;
      this.PeriodontitisModerate = true;
      this.PeriodontitisSevere = false;
      const findvalue = this.PeriodontitisDegree.indexOf('Moderate');
      const findSevereDvalue = this.PeriodontitisDegree.indexOf('Severe');
      const findMildDvalue = this.PeriodontitisDegree.indexOf('Mild');

      if (findvalue === -1) { this.PeriodontitisDegree.push(value); }
      if (findSevereDvalue !== -1) { this.PeriodontitisDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.PeriodontitisDegree.splice(findMildDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.PeriodontitisModerate === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisModerateCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.PeriodontitisMild === false || this.PeriodontitisSevere === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PeriodontitisSevereCSSArray[this.selectedTeethValue[i]] = false;
          this.PeriodontitisMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    }
  }


  Mobility(value) {
    if (value === 'Mild') {
      const findvalue = this.MobilityDegree.indexOf('Mild');
      const findSevereDvalue = this.MobilityDegree.indexOf('Severe');
      const findModeratevalue = this.MobilityDegree.indexOf('Moderate');

      if (findvalue === -1) { this.MobilityDegree.push(value); }
      if (findSevereDvalue !== -1) { this.MobilityDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.MobilityDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Severe') {
      const findvalue = this.MobilityDegree.indexOf('Severe');
      const findMildDvalue = this.MobilityDegree.indexOf('Mild');
      const findModeratevalue = this.MobilityDegree.indexOf('Moderate');

      if (findvalue === -1) { this.MobilityDegree.push(value); }
      if (findMildDvalue !== -1) { this.MobilityDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.MobilityDegree.splice(findModeratevalue, 1); }
    } else if (value === 'Moderate') {
      const findvalue = this.MobilityDegree.indexOf('Moderate');
      const findSevereDvalue = this.MobilityDegree.indexOf('Severe');
      const findMildDvalue = this.MobilityDegree.indexOf('Mild');

      if (findvalue === -1) { this.MobilityDegree.push(value); }
      if (findSevereDvalue !== -1) { this.MobilityDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.MobilityDegree.splice(findMildDvalue, 1); }
    }
  }

  GummSmile() {
    this.GummSmileActive = true;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.GummSmileCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  GingivalOvergrowth() {
    this.GingivalOvergrowthActive = true;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.GingivalOvergrowthCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  periotagvalue(value) {
    this.Periotagvalue = value;
    if (value === 'Gingival Recession') {
      this.GingivalRecessionactive = true;
      this.GummSmileActive = false;
      this.GingivalOvergrowthActive = false;
      this.MissingteethImplants = false;
      // this.PeriodontitisActive = true;
    } else if (value === 'Plaque & Hygiene') {
      this.PeriodontitisActive = true;
      this.GingivalRecessionactive = true;

    } else if (value === 'Periodontitis') {
      if (this.PeriodontitisMild === true || this.PeriodontitisModerate === true || this.PeriodontitisSevere === true) {
        this.PeriodontitisActive = false;

      }

      this.GingivalRecessionactive = false;
      this.GummSmileActive = false;
      this.GingivalOvergrowthActive = false;
      this.MissingteethImplants = false;

    } else if (value === 'Gummy Smile') {
      // this.PeriodontitisActive = true;
      this.GummySmileForms.GummySmile = true;
      this.GingivalRecessionactive = false;
      this.GingivalOvergrowthActive = false;
      this.MissingteethImplants = false;

    } else if (value === 'Gingival Overgrowth') {
      // this.PeriodontitisActive = true;
      this.GingivalOvergrowthForms.GingivalOvergrowth = true;
      this.GingivalRecessionactive = false;
      this.GummSmileActive = false;
      this.MissingteethImplants = false;

    } else if (value === 'Large Maxillary Sinus') {
      this.LargeMaxillarySinusForms.LargeMaxillarySinus = true;

    } else if (value === 'Missing teeth Implants') {
      // this.PeriodontitisActive = true;
      this.GingivalRecessionactive = false;
      this.GummSmileActive = false;
      this.MissingteethImplants = true;

    } else if (value === 'Implant') {
      this.MissingTeethActive = true;
      this.teethhidden = true;
    } else if (value === 'Mobility') {
      this.PeriodontitisActive = true;
      this.GingivalRecessionactive = true;
    }
  }
  //  tab Endodontics 

  Endodonistic(value) {
    this.Periotagvalue = value;
    if (value === 'Necrosis') {
      this.NecrosisForms.Necrosis = true;
      this.necrosis = true;
      this.saticfactory = false;
      this.unsatisfactory = false;
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = false;
      this.BrokenInstrumentinCanal = false;
      this.Internalchecked = false;
      this.Externalchecked = false;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.necrosisCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
    } else if (value === 'Root Canal Treatment') {
      this.necrosis = false;
      this.saticfactory = true;
      this.unsatisfactory = true;
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = false;
      this.BrokenInstrumentinCanal = false;
      this.Internalchecked = false;
      this.Externalchecked = false;
    } else if (value === 'Apical Lesio') {
      this.necrosis = false;
      this.saticfactory = false;
      this.unsatisfactory = false;
      this.BrokenInstrumentinCanal = false;
      this.Internalchecked = false;
      this.Externalchecked = false;
      // this.ApicalLesionMild = true;
      // this.ApicalLesionModerate = true;
      // this.ApicalLesionSevere = true;
    } else if (value === 'Broken Instrument in Canal') {
      this.BrokenInstrumentinCanalForms.BrokenInstrumentinCanal = true;
      this.BrokenInstrumentinCanal = true;
      this.necrosis = false;
      this.saticfactory = false;
      this.unsatisfactory = false;
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = false;
      this.Internalchecked = false;
      this.Externalchecked = false;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.BrokenInstrumentinCanalCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
    } else if (value === 'Root Resorption') {
      this.BrokenInstrumentinCanal = false;
      this.necrosis = false;
      this.saticfactory = false;
      this.unsatisfactory = false;
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = false;
    }


  }

  RootCanalTreatmentValue(value) {
    if (value === 'Satisfactory') {
      this.saticfactory = true;
      this.unsatisfactory = false;
      if (this.selectedTeethValue.length > 0 && this.saticfactory === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.SatisfactoryCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.unsatisfactory === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.UnsatisfactoryCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    } else if (value === 'Unsatisfactory') {
      this.saticfactory = false;
      this.unsatisfactory = true;
      if (this.selectedTeethValue.length > 0 && this.saticfactory === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.SatisfactoryCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.unsatisfactory === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.UnsatisfactoryCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
    }
  }


  ApicalLesion(value) {
    if (value === 'Mild') {

      this.ApicalLesionMild = true;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = false;


      const findvalue = this.ApicalLesionDegree.indexOf('Mild');
      const findSevereDvalue = this.ApicalLesionDegree.indexOf('Severe');
      const findModeratevalue = this.ApicalLesionDegree.indexOf('Moderate');
      if (findvalue === -1) { this.ApicalLesionDegree.push(value); }
      if (findSevereDvalue !== -1) { this.ApicalLesionDegree.splice(findSevereDvalue, 1); }
      if (findModeratevalue !== -1) { this.ApicalLesionDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.ApicalLesionMild === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionMildCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.ApicalLesionSevere === false || this.ApicalLesionModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.ApicalLesionSevereCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Severe') {
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = false;
      this.ApicalLesionSevere = true;

      const findvalue = this.ApicalLesionDegree.indexOf('Severe');
      const findMildDvalue = this.ApicalLesionDegree.indexOf('Mild');
      const findModeratevalue = this.ApicalLesionDegree.indexOf('Moderate');

      if (findvalue === -1) { this.ApicalLesionDegree.push(value); }
      if (findMildDvalue !== -1) { this.ApicalLesionDegree.splice(findMildDvalue, 1); }
      if (findModeratevalue !== -1) { this.ApicalLesionDegree.splice(findModeratevalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.ApicalLesionSevere === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionSevereCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.ApicalLesionMild === false || this.ApicalLesionModerate === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionModerateCSSArray[this.selectedTeethValue[i]] = false;
          this.ApicalLesionMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    } else if (value === 'Moderate') {
      this.ApicalLesionMild = false;
      this.ApicalLesionModerate = true;
      this.ApicalLesionSevere = false;

      const findvalue = this.ApicalLesionDegree.indexOf('Moderate');
      const findSevereDvalue = this.ApicalLesionDegree.indexOf('Severe');
      const findMildDvalue = this.ApicalLesionDegree.indexOf('Mild');

      if (findvalue === -1) { this.ApicalLesionDegree.push(value); }
      if (findSevereDvalue !== -1) { this.ApicalLesionDegree.splice(findSevereDvalue, 1); }
      if (findMildDvalue !== -1) { this.ApicalLesionDegree.splice(findMildDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.ApicalLesionModerate === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionModerateCSSArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.ApicalLesionMild === false || this.ApicalLesionSevere === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ApicalLesionSevereCSSArray[this.selectedTeethValue[i]] = false;
          this.ApicalLesionMildCSSArray[this.selectedTeethValue[i]] = false;

        }
      }
    }
  }

  RootResorptionChecked(event, value) {
    if (value === 'Internal') {
      if (event.target.checked === true) {
        this.Internalchecked = true;
        this.RootResorption.push(value);
        this.RootResorption.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.InternalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Internalchecked = false;
        const findValue = this.RootResorption.indexOf(value);
        this.RootResorption.splice(findValue, 1);
        this.RootResorption.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.InternalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'External') {
      if (event.target.checked === true) {
        this.Externalchecked = true;
        this.RootResorption.push(value);
        this.RootResorption.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ExternalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.Externalchecked = false;
        const findValue = this.RootResorption.indexOf(value);
        this.RootResorption.splice(findValue, 1);
        this.RootResorption.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ExternalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
  }


  //  tab 5

  MissingTeethImplements(value) {
    this.teethhidden = true;
    if (value === 'Missing Teeth') {
      //  form data 
      this.MissingTeethForms.MissingTeeth = true;
      this.MissingTeethActive = true;
      this.ImpactedTeethActive = false;
      this.ImpactedInfectedTeethActive = false;
      this.LargeMaxillarySinusActive = false;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.MissingTeethCSSArray[this.selectedTeethValue[i]] = true;

        }
      }
    } else if (value === 'Impacted Teeth') {
      //  from data
      this.ImpactedTeethForms.ImpactedTeeth = true;
      this.MissingTeethActive = false;
      this.ImpactedTeethActive = true;
      this.ImpactedInfectedTeethActive = false;
      this.LargeMaxillarySinusActive = false;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ImpactedTeethCSSArray[this.selectedTeethValue[i]] = true;

        }
      }

    } else if (value === 'Impacted & Infected Teeth') {
      //  form data
      this.ImpactedInfectedTeethForms.ImpactedInfectedTeeth = true;
      this.MissingTeethActive = false;
      this.ImpactedTeethActive = false;
      this.ImpactedInfectedTeethActive = true;
      this.LargeMaxillarySinusActive = false;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ImpactedInfectedTeethCSSArray[this.selectedTeethValue[i]] = true;

        }
      }

    } else if (value === 'Large Maxillary Sinus') {
      //  form data
      this.LargeMaxillarySinusForm.LargeMaxillarySinus = true;
      this.MissingTeethActive = false;
      this.ImpactedTeethActive = false;
      this.ImpactedInfectedTeethActive = false;
      this.LargeMaxillarySinusActive = true;
      if (this.selectedTeethValue.length > 0) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.LargeMaxillarySinusCSSArray[this.selectedTeethValue[i]] = true;

        }
      }

    }
  }

  checkboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.other === false) {
      this.other = true;
      this.ImplantForms.Malpositioned = false;
      this.ImplantForms.Withboneloss = false;
      this.ImplantForms.Withgingivalrecession = false;
    } else if (value === 'other' && this.ok === false) {
      this.ok = true;
    } else if (value === 'OK' && this.other === true) {
      this.other = false;
      this.ImplantForms.Malpositioned = false;
      this.ImplantForms.Withboneloss = false;
      this.ImplantForms.Withgingivalrecession = false;
    } else if (value === 'other' && this.ok === true) {
      this.ok = false;
      this.ImplantForms.OK = false;
    }
    this.valueFunction(checkboxValue, event);
    this.fn(checkboxValue);
  }

  fn(checkboxValue) {
    if (checkboxValue === 'OK') { this.okk = true; this.otherr = false; }
    if (checkboxValue !== 'OK') { this.otherr = true; this.okk = false; }
  }

  valueFunction(checkboxValue, event) {
    if (checkboxValue === 'OK') {
      if (event.target.checked === true) {
        this.checkBoxValue = [];
        this.checkBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.okCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.checkBoxOk.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.okCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }

    if (checkboxValue === 'Malpositioned') {
      const find = this.checkBoxValue.indexOf('OK');
      if (find !== -1) { this.checkBoxValue = []; }
      if (event.target.checked === true) {
        this.checkBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.otherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.checkBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.otherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'With bone loss') {
      const find = this.checkBoxValue.indexOf('OK');
      if (find !== -1) { this.checkBoxValue = []; }
      if (event.target.checked === true) {
        this.checkBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.otherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.checkBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.otherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'With gingival recession') {
      const find = this.checkBoxValue.indexOf('OK');
      if (find !== -1) { this.checkBoxValue = []; }
      if (event.target.checked === true) {
        this.checkBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.otherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.checkBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.otherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  //  tab 6
  post(value) {
    this.postSelectedValue = value;
    if (value === 'OK') {
      this.postok = true;
      this.postunsatisfactory = false;
      if (this.selectedTeethValue.length > 0 && this.postok === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.postokCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.postunsatisfactory === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.postunsatisfactoryCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    } else if (value === 'Unsatisfactory') {
      this.postok = false;
      this.postunsatisfactory = true;
      if (this.selectedTeethValue.length > 0 && this.postok === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.postokCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.postunsatisfactory === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.postunsatisfactoryCSSArray[this.selectedTeethValue[i]] = true;
        }
      }
    }
  }

  Splint(value) {
    this.splintSelectedValue = value;
  }

  DiscoloredTeeth() {
    this.postok = false;
    this.postunsatisfactory = false;
    this.DiscoloredTeethActive = true;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.DiscoloredCSSArray[this.selectedTeethValue[i]] = true;
      }
    }

  }

  // tab 7

  prosthodonticstagvalue(value) {
    this.Periotagvalue = value;
  }

  // tab 8
  OrtoFacialTMJTabtagvalue(value) {
    this.Periotagvalue = value;
  }

  // tab 9

  otherTabtagvalue(value) {
    this.Periotagvalue = value;
  }

  VeneercheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.veneerother === false) {
      this.veneerother = true;
    } else if (value === 'other' && this.veneerok === false) {
      this.veneerok = true;
    } else if (value === 'OK' && this.veneerother === true) {
      this.veneerother = false;
    } else if (value === 'other' && this.veneerok === true) {
      this.veneerok = false;
    }
    this.VeneervalueFunction(checkboxValue, event);

    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedVeneerArray = [];
    }
    if (value === 'other' && isChecked && this.selectedVeneerArray.indexOf('OK') > -1) {
      const findValue = this.selectedVeneerArray.indexOf('OK');
      this.selectedVeneerArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedVeneerArray.includes(checkboxValue)) {
      this.selectedVeneerArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedVeneerArray.includes(checkboxValue)) {
      const findValue = this.selectedVeneerArray.indexOf(value);
      this.selectedVeneerArray.splice(findValue, 1);
    }
    this.selectedVeneer = "";
    this.selectedVeneerArray.forEach((element: string) => {
      this.selectedVeneer += element + ", "
    });
  }

  Veneerfn(checkboxValue) {
    if (checkboxValue === 'OK') { this.veneerok = true; this.veneerother = false; }
    if (checkboxValue !== 'OK') { this.veneerother = true; this.veneerok = false; }
  }


  VeneervalueFunction(checkboxValue, event) {
    if (checkboxValue === 'OK') {
      this.vOk = true; this.vLeaking = false; this.vWorn = false; this.vFractured = false; this.vDiscolored = false; this.vUnaesthetic = false;
      if (event.target.checked === true) {
        this.veneercheckBoxValue = [];
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerokCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxOk.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerokCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }

    if (checkboxValue === 'Leaking') {
      this.vOk = false; this.vLeaking = true; this.vWorn = false; this.vFractured = false; this.vDiscolored = false; this.vUnaesthetic = false;
      const find = this.veneercheckBoxValue.indexOf('OK');
      if (find !== -1) { this.veneercheckBoxValue = []; }
      if (event.target.checked === true) {
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Worn') {
      this.vOk = false; this.vLeaking = false; this.vWorn = true; this.vFractured = false; this.vDiscolored = false; this.vUnaesthetic = false;
      const find = this.veneercheckBoxValue.indexOf('OK');
      if (find !== -1) { this.veneercheckBoxValue = []; }
      if (event.target.checked === true) {
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Fractured') {
      this.vOk = false; this.vLeaking = false; this.vWorn = false; this.vFractured = true; this.vDiscolored = false; this.vUnaesthetic = false;
      const find = this.veneercheckBoxValue.indexOf('OK');
      if (find !== -1) { this.veneercheckBoxValue = []; }
      if (event.target.checked === true) {
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Discolored') {
      this.vOk = false; this.vLeaking = false; this.vWorn = false; this.vFractured = false; this.vDiscolored = true; this.vUnaesthetic = false;
      const find = this.veneercheckBoxValue.indexOf('OK');
      if (find !== -1) { this.veneercheckBoxValue = []; }
      if (event.target.checked === true) {
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Unaesthetic') {
      this.vOk = false; this.vLeaking = false; this.vWorn = false; this.vFractured = false; this.vDiscolored = false; this.vUnaesthetic = true;
      const find = this.veneercheckBoxValue.indexOf('OK');
      if (find !== -1) { this.veneercheckBoxValue = []; }
      if (event.target.checked === true) {
        this.veneercheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.veneerotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.veneercheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.veneerotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  vaneerFnValue(mode) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[18] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[18] = true; }
      } else { this.veneerokCSSArray[18] = false; this.veneerotherCSSArray[18] = false; }
    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[17] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[17] = true; }
      } else { this.veneerokCSSArray[17] = false; this.veneerotherCSSArray[17] = false; }
    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[16] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[16] = true; }
      } else { this.veneerokCSSArray[16] = false; this.veneerotherCSSArray[16] = false; }
    }


    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[15] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[15] = true; }
      } else { this.veneerokCSSArray[15] = false; this.veneerotherCSSArray[15] = false; }
    }

    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[14] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[14] = true; }
      } else { this.veneerokCSSArray[14] = false; this.veneerotherCSSArray[14] = false; }
    }

    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[13] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[13] = true; }
      } else { this.veneerokCSSArray[13] = false; this.veneerotherCSSArray[13] = false; }
    }

    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[12] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[12] = true; }
      } else { this.veneerokCSSArray[12] = false; this.veneerotherCSSArray[12] = false; }
    }

    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[11] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[11] = true; }
      } else { this.veneerokCSSArray[11] = false; this.veneerotherCSSArray[11] = false; }
    }

    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[21] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[21] = true; }
      } else { this.veneerokCSSArray[21] = false; this.veneerotherCSSArray[21] = false; }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[22] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[22] = true; }
      } else { this.veneerokCSSArray[22] = false; this.veneerotherCSSArray[22] = false; }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[23] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[23] = true; }
      } else { this.veneerokCSSArray[23] = false; this.veneerotherCSSArray[23] = false; }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[24] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[24] = true; }
      } else { this.veneerokCSSArray[24] = false; this.veneerotherCSSArray[24] = false; }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[25] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[25] = true; }
      } else { this.veneerokCSSArray[25] = false; this.veneerotherCSSArray[25] = false; }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[26] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[26] = true; }
      } else { this.veneerokCSSArray[26] = false; this.veneerotherCSSArray[26] = false; }
    }
    if (mode === 'tooth27') {
      if (this.teeth27 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[27] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[27] = true; }
      } else { this.veneerokCSSArray[27] = false; this.veneerotherCSSArray[27] = false; }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[28] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[28] = true; }
      } else { this.veneerokCSSArray[28] = false; this.veneerotherCSSArray[28] = false; }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[48] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[48] = true; }
      } else { this.veneerokCSSArray[48] = false; this.veneerotherCSSArray[48] = false; }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[47] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[47] = true; }
      } else { this.veneerokCSSArray[47] = false; this.veneerotherCSSArray[47] = false; }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[46] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[46] = true; }
      } else { this.veneerokCSSArray[46] = false; this.veneerotherCSSArray[46] = false; }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[45] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[45] = true; }
      } else { this.veneerokCSSArray[45] = false; this.veneerotherCSSArray[45] = false; }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[44] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[44] = true; }
      } else { this.veneerokCSSArray[44] = false; this.veneerotherCSSArray[44] = false; }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[43] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[43] = true; }
      } else { this.veneerokCSSArray[43] = false; this.veneerotherCSSArray[43] = false; }
    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[42] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[42] = true; }
      } else { this.veneerokCSSArray[42] = false; this.veneerotherCSSArray[42] = false; }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[41] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[41] = true; }
      } else { this.veneerokCSSArray[41] = false; this.veneerotherCSSArray[41] = false; }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[31] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[31] = true; }
      } else { this.veneerokCSSArray[31] = false; this.veneerotherCSSArray[31] = false; }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[32] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[32] = true; }
      } else { this.veneerokCSSArray[32] = false; this.veneerotherCSSArray[32] = false; }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[33] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[33] = true; }
      } else { this.veneerokCSSArray[33] = false; this.veneerotherCSSArray[33] = false; }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[34] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[34] = true; }
      } else { this.veneerokCSSArray[34] = false; this.veneerotherCSSArray[34] = false; }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[35] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[35] = true; }
      } else { this.veneerokCSSArray[35] = false; this.veneerotherCSSArray[35] = false; }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[36] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[36] = true; }
      } else { this.veneerokCSSArray[36] = false; this.veneerotherCSSArray[36] = false; }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[37] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[37] = true; }
      } else { this.veneerokCSSArray[37] = false; this.veneerotherCSSArray[37] = false; }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        if (this.veneerok === true) { this.veneerokCSSArray[38] = true; }
        if (this.veneerother === true) { this.veneerotherCSSArray[38] = true; }
      } else { this.veneerokCSSArray[38] = false; this.veneerotherCSSArray[38] = false; }
    }

  }

  CrowncheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.crownother === false) {
      this.crownother = true;
    } else if (value === 'other' && this.crownok === false) {
      this.crownok = true;
    } else if (value === 'OK' && this.crownother === true) {
      this.crownother = false;
    } else if (value === 'other' && this.crownok === true) {
      this.crownok = false;
    }
    this.CrownvalueFunction(checkboxValue, event);

    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedCrownArray = [];
    }
    if (value === 'other' && isChecked && this.selectedCrownArray.indexOf('OK') > -1) {
      const findValue = this.selectedCrownArray.indexOf('OK');
      this.selectedCrownArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedCrownArray.includes(checkboxValue)) {
      this.selectedCrownArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedCrownArray.includes(checkboxValue)) {
      const findValue = this.selectedCrownArray.indexOf(value);
      this.selectedCrownArray.splice(findValue, 1);
    }
    this.selectedCrown = "";
    this.selectedCrownArray.forEach((element: string) => {
      this.selectedCrown += element + ", "
    });
  }

  CrownvalueFunction(checkboxValue, event) {
    if (checkboxValue === 'OK') {
      this.cOk = true; this.cLeaking = false; this.cWorn = false; this.cFractured = false; this.cDiscolored = false; this.cUnaesthetic = false;
      if (event.target.checked === true) {
        this.crowncheckBoxValue = [];
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownokCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxOk.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownokCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }

    if (checkboxValue === 'Leaking') {
      this.cOk = false; this.cLeaking = true; this.cWorn = false; this.cFractured = false; this.cDiscolored = false; this.cUnaesthetic = false;
      const find = this.crowncheckBoxValue.indexOf('OK');
      if (find !== -1) { this.crowncheckBoxValue = []; }
      if (event.target.checked === true) {
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Worn') {
      this.cOk = false; this.cLeaking = false; this.cWorn = true; this.cFractured = false; this.cDiscolored = false; this.cUnaesthetic = false;
      const find = this.crowncheckBoxValue.indexOf('OK');
      if (find !== -1) { this.crowncheckBoxValue = []; }
      if (event.target.checked === true) {
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Fractured') {
      this.cOk = false; this.cLeaking = false; this.cWorn = false; this.cFractured = true; this.cDiscolored = false; this.cUnaesthetic = false;
      const find = this.crowncheckBoxValue.indexOf('OK');
      if (find !== -1) { this.crowncheckBoxValue = []; }
      if (event.target.checked === true) {
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Discolored') {
      this.cOk = false; this.cLeaking = false; this.cWorn = false; this.cFractured = false; this.cDiscolored = true; this.cUnaesthetic = false;
      const find = this.crowncheckBoxValue.indexOf('OK');
      if (find !== -1) { this.crowncheckBoxValue = []; }
      if (event.target.checked === true) {
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Unaesthetic') {
      this.cOk = false; this.cLeaking = false; this.cWorn = false; this.cFractured = false; this.cDiscolored = false; this.cUnaesthetic = true;
      const find = this.crowncheckBoxValue.indexOf('OK');
      if (find !== -1) { this.crowncheckBoxValue = []; }
      if (event.target.checked === true) {
        this.crowncheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.crownotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.crowncheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.crownotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  crownFnValue(mode) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        if (this.crownok === true) { this.crownokCSSArray[18] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[18] = true; }
      } else { this.crownokCSSArray[18] = false; this.crownotherCSSArray[18] = false; }
    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        if (this.crownok === true) { this.crownokCSSArray[17] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[17] = true; }
      } else { this.crownokCSSArray[17] = false; this.crownotherCSSArray[17] = false; }
    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        if (this.crownok === true) { this.crownokCSSArray[16] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[16] = true; }
      } else { this.crownokCSSArray[16] = false; this.crownotherCSSArray[16] = false; }
    }


    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        if (this.crownok === true) { this.crownokCSSArray[15] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[15] = true; }
      } else { this.crownokCSSArray[15] = false; this.crownotherCSSArray[15] = false; }
    }

    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        if (this.crownok === true) { this.crownokCSSArray[14] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[14] = true; }
      } else { this.crownokCSSArray[14] = false; this.crownotherCSSArray[14] = false; }
    }

    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        if (this.crownok === true) { this.crownokCSSArray[13] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[13] = true; }
      } else { this.crownokCSSArray[13] = false; this.crownotherCSSArray[13] = false; }
    }

    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        if (this.crownok === true) { this.crownokCSSArray[12] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[12] = true; }
      } else { this.crownokCSSArray[12] = false; this.crownotherCSSArray[12] = false; }
    }

    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        if (this.crownok === true) { this.crownokCSSArray[11] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[11] = true; }
      } else { this.crownokCSSArray[11] = false; this.crownotherCSSArray[11] = false; }
    }

    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        if (this.crownok === true) { this.crownokCSSArray[21] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[21] = true; }
      } else { this.crownokCSSArray[21] = false; this.crownotherCSSArray[21] = false; }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        if (this.crownok === true) { this.crownokCSSArray[22] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[22] = true; }
      } else { this.crownokCSSArray[22] = false; this.crownotherCSSArray[22] = false; }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        if (this.crownok === true) { this.crownokCSSArray[23] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[23] = true; }
      } else { this.crownokCSSArray[23] = false; this.crownotherCSSArray[23] = false; }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        if (this.crownok === true) { this.crownokCSSArray[24] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[24] = true; }
      } else { this.crownokCSSArray[24] = false; this.crownotherCSSArray[24] = false; }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        if (this.crownok === true) { this.crownokCSSArray[25] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[25] = true; }
      } else { this.crownokCSSArray[25] = false; this.crownotherCSSArray[25] = false; }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        if (this.crownok === true) { this.crownokCSSArray[26] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[26] = true; }
      } else { this.crownokCSSArray[26] = false; this.crownotherCSSArray[26] = false; }
    }
    if (mode === 'tooth27') {
      if (this.teeth27 === false) {
        if (this.crownok === true) { this.crownokCSSArray[27] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[27] = true; }
      } else { this.crownokCSSArray[27] = false; this.crownotherCSSArray[27] = false; }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        if (this.crownok === true) { this.crownokCSSArray[28] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[28] = true; }
      } else { this.crownokCSSArray[28] = false; this.crownotherCSSArray[28] = false; }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        if (this.crownok === true) { this.crownokCSSArray[48] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[48] = true; }
      } else { this.crownokCSSArray[48] = false; this.crownotherCSSArray[48] = false; }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        if (this.crownok === true) { this.crownokCSSArray[47] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[47] = true; }
      } else { this.crownokCSSArray[47] = false; this.crownotherCSSArray[47] = false; }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        if (this.crownok === true) { this.crownokCSSArray[46] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[46] = true; }
      } else { this.crownokCSSArray[46] = false; this.crownotherCSSArray[46] = false; }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        if (this.crownok === true) { this.crownokCSSArray[45] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[45] = true; }
      } else { this.crownokCSSArray[45] = false; this.crownotherCSSArray[45] = false; }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        if (this.crownok === true) { this.crownokCSSArray[44] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[44] = true; }
      } else { this.crownokCSSArray[44] = false; this.crownotherCSSArray[44] = false; }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        if (this.crownok === true) { this.crownokCSSArray[43] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[43] = true; }
      } else { this.crownokCSSArray[43] = false; this.crownotherCSSArray[43] = false; }
    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        if (this.crownok === true) { this.crownokCSSArray[42] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[42] = true; }
      } else { this.crownokCSSArray[42] = false; this.crownotherCSSArray[42] = false; }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        if (this.crownok === true) { this.crownokCSSArray[41] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[41] = true; }
      } else { this.crownokCSSArray[41] = false; this.crownotherCSSArray[41] = false; }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        if (this.crownok === true) { this.crownokCSSArray[31] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[31] = true; }
      } else { this.crownokCSSArray[31] = false; this.crownotherCSSArray[31] = false; }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        if (this.crownok === true) { this.crownokCSSArray[32] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[32] = true; }
      } else { this.crownokCSSArray[32] = false; this.crownotherCSSArray[32] = false; }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        if (this.crownok === true) { this.crownokCSSArray[33] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[33] = true; }
      } else { this.crownokCSSArray[33] = false; this.crownotherCSSArray[33] = false; }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        if (this.crownok === true) { this.crownokCSSArray[34] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[34] = true; }
      } else { this.crownokCSSArray[34] = false; this.crownotherCSSArray[34] = false; }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        if (this.crownok === true) { this.crownokCSSArray[35] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[35] = true; }
      } else { this.crownokCSSArray[35] = false; this.crownotherCSSArray[35] = false; }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        if (this.crownok === true) { this.crownokCSSArray[36] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[36] = true; }
      } else { this.crownokCSSArray[36] = false; this.crownotherCSSArray[36] = false; }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        if (this.crownok === true) { this.crownokCSSArray[37] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[37] = true; }
      } else { this.crownokCSSArray[37] = false; this.crownotherCSSArray[37] = false; }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        if (this.crownok === true) { this.crownokCSSArray[38] = true; }
        if (this.crownother === true) { this.crownotherCSSArray[38] = true; }
      } else { this.crownokCSSArray[38] = false; this.crownotherCSSArray[38] = false; }
    }
  }

  OnlaycheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.onlayother === false) {
      this.onlayother = true;
    } else if (value === 'other' && this.onlayok === false) {
      this.onlayok = true;
    } else if (value === 'OK' && this.onlayother === true) {
      this.onlayother = false;
    } else if (value === 'other' && this.onlayok === true) {
      this.onlayok = false;
    }
    this.OnlayvalueFunction(checkboxValue, event);

    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedOnlayArray = [];
    }
    if (value === 'other' && isChecked && this.selectedOnlayArray.indexOf('OK') > -1) {
      const findValue = this.selectedOnlayArray.indexOf('OK');
      this.selectedOnlayArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedOnlayArray.includes(checkboxValue)) {
      this.selectedOnlayArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedOnlayArray.includes(checkboxValue)) {
      const findValue = this.selectedOnlayArray.indexOf(value);
      this.selectedOnlayArray.splice(findValue, 1);
    }
    this.selectedOnlay = "";
    this.selectedOnlayArray.forEach((element: string) => {
      this.selectedOnlay += element + ", "
    });
  }

  OnlayvalueFunction(checkboxValue, event) {
    if (checkboxValue === 'OK') {
      this.oOk = true; this.oLeaking = false; this.oWorn = false; this.oFractured = false; this.oDiscolored = false; this.oUnaesthetic = false;
      if (event.target.checked === true) {
        this.onlaycheckBoxValue = [];
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayokCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        const findvalue = this.checkBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxOk.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayokCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }

    if (checkboxValue === 'Leaking') {
      this.oOk = false; this.oLeaking = true; this.oWorn = false; this.oFractured = false; this.oDiscolored = false; this.oUnaesthetic = false;
      const find = this.onlaycheckBoxValue.indexOf('OK');
      if (find !== -1) { this.onlaycheckBoxValue = []; }
      if (event.target.checked === true) {
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Worn') {
      this.oOk = false; this.oLeaking = false; this.oWorn = true; this.oFractured = false; this.oDiscolored = false; this.oUnaesthetic = false;
      const find = this.onlaycheckBoxValue.indexOf('OK');
      if (find !== -1) { this.onlaycheckBoxValue = []; }
      if (event.target.checked === true) {
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }

    if (checkboxValue === 'Fractured') {
      this.oOk = false; this.oLeaking = false; this.oWorn = false; this.oFractured = true; this.oDiscolored = false; this.oUnaesthetic = false;
      const find = this.onlaycheckBoxValue.indexOf('OK');
      if (find !== -1) { this.onlaycheckBoxValue = []; }
      if (event.target.checked === true) {
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Discolored') {
      this.oOk = false; this.oLeaking = false; this.oWorn = false; this.oFractured = false; this.oDiscolored = true; this.oUnaesthetic = false;
      const find = this.onlaycheckBoxValue.indexOf('OK');
      if (find !== -1) { this.onlaycheckBoxValue = []; }
      if (event.target.checked === true) {
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
    if (checkboxValue === 'Unaesthetic') {
      this.oOk = false; this.oLeaking = false; this.oWorn = false; this.oFractured = false; this.oDiscolored = false; this.oUnaesthetic = true;
      const find = this.onlaycheckBoxValue.indexOf('OK');
      if (find !== -1) { this.onlaycheckBoxValue = []; }
      if (event.target.checked === true) {
        this.onlaycheckBoxValue.push(checkboxValue);
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.onlayotherCSSArray[this.selectedTeethValue[i]] = true;
          }
        }

      } else {
        const findvalue = this.veneercheckBoxValue.indexOf(checkboxValue);
        this.onlaycheckBoxValue.splice(findvalue, 1);
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.onlayotherCSSArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  onlayFnValue(mode) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[18] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[18] = true; }
      } else { this.onlayokCSSArray[18] = false; this.onlayotherCSSArray[18] = false; }
    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[17] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[17] = true; }
      } else { this.onlayokCSSArray[17] = false; this.onlayotherCSSArray[17] = false; }
    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[16] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[16] = true; }
      } else { this.onlayokCSSArray[16] = false; this.onlayotherCSSArray[16] = false; }
    }


    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[15] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[15] = true; }
      } else { this.onlayokCSSArray[15] = false; this.onlayotherCSSArray[15] = false; }
    }

    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[14] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[14] = true; }
      } else { this.onlayokCSSArray[14] = false; this.onlayotherCSSArray[14] = false; }
    }

    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[13] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[13] = true; }
      } else { this.onlayokCSSArray[13] = false; this.onlayotherCSSArray[13] = false; }
    }

    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[12] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[12] = true; }
      } else { this.onlayokCSSArray[12] = false; this.onlayotherCSSArray[12] = false; }
    }

    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[11] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[11] = true; }
      } else { this.onlayokCSSArray[11] = false; this.onlayotherCSSArray[11] = false; }
    }

    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[21] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[21] = true; }
      } else { this.onlayokCSSArray[21] = false; this.onlayotherCSSArray[21] = false; }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[22] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[22] = true; }
      } else { this.onlayokCSSArray[22] = false; this.onlayotherCSSArray[22] = false; }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[23] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[23] = true; }
      } else { this.onlayokCSSArray[23] = false; this.onlayotherCSSArray[23] = false; }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[24] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[24] = true; }
      } else { this.onlayokCSSArray[24] = false; this.onlayotherCSSArray[24] = false; }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[25] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[25] = true; }
      } else { this.onlayokCSSArray[25] = false; this.onlayotherCSSArray[25] = false; }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[26] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[26] = true; }
      } else { this.onlayokCSSArray[26] = false; this.onlayotherCSSArray[26] = false; }
    }
    if (mode === 'tooth27') {
      if (this.teeth27 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[27] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[27] = true; }
      } else { this.onlayokCSSArray[27] = false; this.onlayotherCSSArray[27] = false; }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[28] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[28] = true; }
      } else { this.onlayokCSSArray[28] = false; this.onlayotherCSSArray[28] = false; }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[48] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[48] = true; }
      } else { this.onlayokCSSArray[48] = false; this.onlayotherCSSArray[48] = false; }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[47] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[47] = true; }
      } else { this.onlayokCSSArray[47] = false; this.onlayotherCSSArray[47] = false; }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[46] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[46] = true; }
      } else { this.onlayokCSSArray[46] = false; this.onlayotherCSSArray[46] = false; }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[45] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[45] = true; }
      } else { this.onlayokCSSArray[45] = false; this.onlayotherCSSArray[45] = false; }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[44] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[44] = true; }
      } else { this.onlayokCSSArray[44] = false; this.onlayotherCSSArray[44] = false; }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[43] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[43] = true; }
      } else { this.onlayokCSSArray[43] = false; this.onlayotherCSSArray[43] = false; }
    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[42] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[42] = true; }
      } else { this.onlayokCSSArray[42] = false; this.onlayotherCSSArray[42] = false; }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[41] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[41] = true; }
      } else { this.onlayokCSSArray[41] = false; this.onlayotherCSSArray[41] = false; }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[31] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[31] = true; }
      } else { this.onlayokCSSArray[31] = false; this.onlayotherCSSArray[31] = false; }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[32] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[32] = true; }
      } else { this.onlayokCSSArray[32] = false; this.onlayotherCSSArray[32] = false; }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[33] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[33] = true; }
      } else { this.onlayokCSSArray[33] = false; this.onlayotherCSSArray[33] = false; }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[34] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[34] = true; }
      } else { this.onlayokCSSArray[34] = false; this.onlayotherCSSArray[34] = false; }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[35] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[35] = true; }
      } else { this.onlayokCSSArray[35] = false; this.onlayotherCSSArray[35] = false; }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[36] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[36] = true; }
      } else { this.onlayokCSSArray[36] = false; this.onlayotherCSSArray[36] = false; }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[37] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[37] = true; }
      } else { this.onlayokCSSArray[37] = false; this.onlayotherCSSArray[37] = false; }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        if (this.onlayok === true) { this.onlayokCSSArray[38] = true; }
        if (this.onlayother === true) { this.onlayotherCSSArray[38] = true; }
      } else { this.onlayokCSSArray[38] = false; this.onlayotherCSSArray[38] = false; }
    }
  }

  BridgecheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.bridgeother === false) {
      this.bridgeother = true;
    } else if (value === 'other' && this.bridgeok === false) {
      this.bridgeok = true;
    } else if (value === 'OK' && this.bridgeother === true) {
      this.bridgeother = false;
    } else if (value === 'other' && this.bridgeok === true) {
      this.bridgeok = false;
    }

    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedBridgeArray = [];
    }
    if (value === 'other' && isChecked && this.selectedBridgeArray.indexOf('OK') > -1) {
      const findValue = this.selectedBridgeArray.indexOf('OK');
      this.selectedBridgeArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedBridgeArray.includes(checkboxValue)) {
      this.selectedBridgeArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedBridgeArray.includes(checkboxValue)) {
      const findValue = this.selectedBridgeArray.indexOf(value);
      this.selectedBridgeArray.splice(findValue, 1);
    }
    this.selectedBridge = "";
    this.selectedBridgeArray.forEach((element: string) => {
      this.selectedBridge += element + ", "
    });
  }

  DenturecheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.dentureother === false) {
      this.dentureother = true;
    } else if (value === 'other' && this.dentureok === false) {
      this.dentureok = true;
    } else if (value === 'OK' && this.dentureother === true) {
      this.dentureother = false;
    } else if (value === 'other' && this.dentureok === true) {
      this.dentureok = false;
    }
    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedDentureArray = [];
    }
    if (value === 'other' && isChecked && this.selectedDentureArray.indexOf('OK') > -1) {
      const findValue = this.selectedDentureArray.indexOf('OK');
      this.selectedDentureArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedDentureArray.includes(checkboxValue)) {
      this.selectedDentureArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedDentureArray.includes(checkboxValue)) {
      const findValue = this.selectedDentureArray.indexOf(value);
      this.selectedDentureArray.splice(findValue, 1);
    }
    this.selectedDenture = "";
    this.selectedDentureArray.forEach((element: string) => {
      this.selectedDenture += element + ", "
    });
  }

  RestorationColorcheckboxHide(value, checkboxValue, event) {
    if (value === 'OK' && this.RestorativeOther === false) {
      this.RestorativeOther = true; this.ROK = true; this.ROther = false;
    } else if (value === 'other' && this.RestorativeOk === false) {
      this.RestorativeOk = true; this.ROther = true; this.ROK = false;
    } else if (value === 'OK' && this.RestorativeOther === true) {
      this.RestorativeOther = false; this.ROK = true; this.ROther = false;
    } else if (value === 'other' && this.RestorativeOk === true) {
      this.RestorativeOk = false; this.ROther = true; this.ROK = false;
    }
    var isChecked = event.target.checked;
    if (value === 'OK' && isChecked) {
      this.selectedRestorationDegreeArray = [];
    }
    if (value === 'other' && isChecked && this.selectedRestorationDegreeArray.indexOf('OK') > -1) {
      const findValue = this.selectedRestorationDegreeArray.indexOf('OK');
      this.selectedRestorationDegreeArray.splice(findValue, 1);
    }
    if (isChecked && !this.selectedRestorationDegreeArray.includes(checkboxValue)) {
      this.selectedRestorationDegreeArray.push(checkboxValue);
    }
    if (!isChecked && this.selectedRestorationDegreeArray.includes(checkboxValue)) {
      const findValue = this.selectedRestorationDegreeArray.indexOf(value);
      this.selectedRestorationDegreeArray.splice(findValue, 1);
    }
    this.selectedRestorationDegree = "";
    this.selectedRestorationDegreeArray.forEach(element => {
      this.selectedRestorationDegree += element + ", "
    });
  }

  RestorationColor(event, value) {
    if (value === 'Buccal') {
      if (event.target.checked === true) {
        this.ColorBuccalchecked = true;
        this.RColor.push(value);
        this.RColor.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ColorBuccalCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ColorBuccalchecked = false;
        const findValue = this.RColor.indexOf(value);
        this.RColor.splice(findValue, 1);
        this.RColor.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ColorBuccalCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Distal') {
      if (event.target.checked === true) {
        this.ColorDistalchecked = true;
        this.RColor.push(value);
        this.RColor.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ColorDistalCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ColorDistalchecked = false;
        const findValue = this.RColor.indexOf(value);
        this.RColor.splice(findValue, 1);
        this.RColor.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ColorDistalCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Lingual') {
      if (event.target.checked === true) {
        this.ColorLingualchecked = true;
        this.RColor.push(value);
        this.RColor.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ColorLingualCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ColorLingualchecked = false;
        const findValue = this.RColor.indexOf(value);
        this.RColor.splice(findValue, 1);
        this.RColor.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ColorLingualCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Mesial') {
      if (event.target.checked === true) {
        this.ColorMesialchecked = true;
        this.RColor.push(value);
        this.RColor.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ColorMesialCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ColorMesialchecked = false;
        const findValue = this.RColor.indexOf(value);
        this.RColor.splice(findValue, 1);
        this.RColor.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ColorMesialCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Occlusal') {
      if (event.target.checked === true) {
        this.ColorOcclusalchecked = true;
        this.RColor.push(value);
        this.RColor.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ColorOcclusalCSSArray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ColorOcclusalchecked = false;
        const findValue = this.RColor.indexOf(value);
        this.RColor.splice(findValue, 1);
        this.RColor.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ColorOcclusalCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    this.selectedRestorationSurface = "";
    this.RColor.forEach(element => {
      this.selectedRestorationSurface += element + ","
    });
  }

  ColorCssFn(mode) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[18] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[18] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[18] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[18] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[18] = true; }
      } else {
        this.ColorMesialCSSArray[18] = false; this.ColorDistalCSSArray[18] = false;
        this.ColorLingualCSSArray[18] = false; this.ColorOcclusalCSSArray[18] = false;
        this.ColorBuccalCSSArray[18] = false;
      }

    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[17] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[17] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[17] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[17] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[17] = true; }
      } else {
        this.ColorMesialCSSArray[17] = false; this.ColorDistalCSSArray[17] = false;
        this.ColorLingualCSSArray[17] = false; this.ColorOcclusalCSSArray[17] = false;
        this.ColorBuccalCSSArray[17] = false;
      }

    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[16] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[16] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[16] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[16] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[16] = true; }
      } else {
        this.ColorMesialCSSArray[16] = false; this.ColorDistalCSSArray[16] = false;
        this.ColorLingualCSSArray[16] = false; this.ColorOcclusalCSSArray[16] = false;
        this.ColorBuccalCSSArray[16] = false;
      }
    }

    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[15] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[15] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[15] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[15] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[15] = true; }
      } else {
        this.ColorMesialCSSArray[15] = false; this.ColorDistalCSSArray[15] = false;
        this.ColorLingualCSSArray[15] = false; this.ColorOcclusalCSSArray[15] = false;
        this.ColorBuccalCSSArray[15] = false;
      }
    }

    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[14] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[14] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[14] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[14] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[14] = true; }
      } else {
        this.ColorMesialCSSArray[14] = false; this.ColorDistalCSSArray[14] = false;
        this.ColorLingualCSSArray[14] = false; this.ColorOcclusalCSSArray[14] = false;
        this.ColorBuccalCSSArray[14] = false;
      }
    }

    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[13] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[13] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[13] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[13] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[13] = true; }
      } else {
        this.ColorMesialCSSArray[13] = false; this.ColorDistalCSSArray[13] = false;
        this.ColorLingualCSSArray[13] = false; this.ColorOcclusalCSSArray[13] = false;
        this.ColorBuccalCSSArray[13] = false;
      }
    }

    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[12] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[12] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[12] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[12] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[12] = true; }
      } else {
        this.ColorMesialCSSArray[12] = false; this.ColorDistalCSSArray[12] = false;
        this.ColorLingualCSSArray[12] = false; this.ColorOcclusalCSSArray[12] = false;
        this.ColorBuccalCSSArray[12] = false;
      }
    }

    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[11] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[11] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[11] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[11] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[11] = true; }
      } else {
        this.ColorMesialCSSArray[11] = false; this.ColorDistalCSSArray[11] = false;
        this.ColorLingualCSSArray[11] = false; this.ColorOcclusalCSSArray[11] = false;
        this.ColorBuccalCSSArray[11] = false;
      }
    }

    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[21] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[21] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[21] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[21] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[21] = true; }
      } else {
        this.ColorMesialCSSArray[21] = false; this.ColorDistalCSSArray[21] = false;
        this.ColorLingualCSSArray[21] = false; this.ColorOcclusalCSSArray[21] = false;
        this.ColorBuccalCSSArray[21] = false;
      }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[22] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[22] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[22] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[22] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[22] = true; }
      } else {
        this.ColorMesialCSSArray[22] = false; this.ColorDistalCSSArray[22] = false;
        this.ColorLingualCSSArray[22] = false; this.ColorOcclusalCSSArray[22] = false;
        this.ColorBuccalCSSArray[22] = false;
      }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[23] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[23] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[23] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[23] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[23] = true; }
      } else {
        this.ColorMesialCSSArray[23] = false; this.ColorDistalCSSArray[23] = false;
        this.ColorLingualCSSArray[23] = false; this.ColorOcclusalCSSArray[23] = false;
        this.ColorBuccalCSSArray[23] = false;
      }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[24] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[24] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[24] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[24] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[24] = true; }
      } else {
        this.ColorMesialCSSArray[24] = false; this.ColorDistalCSSArray[24] = false;
        this.ColorLingualCSSArray[24] = false; this.ColorOcclusalCSSArray[24] = false;
        this.ColorBuccalCSSArray[24] = false;
      }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[25] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[25] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[25] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[25] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[25] = true; }
      } else {
        this.ColorMesialCSSArray[25] = false; this.ColorDistalCSSArray[25] = false;
        this.ColorLingualCSSArray[25] = false; this.ColorOcclusalCSSArray[25] = false;
        this.ColorBuccalCSSArray[25] = false;
      }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[26] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[26] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[26] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[26] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[26] = true; }
      } else {
        this.ColorMesialCSSArray[26] = false; this.ColorDistalCSSArray[26] = false;
        this.ColorLingualCSSArray[26] = false; this.ColorOcclusalCSSArray[26] = false;
        this.ColorBuccalCSSArray[26] = false;
      }
    }
    if (mode === 'tooth27') {

      if (this.teeth27 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[27] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[27] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[27] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[27] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[27] = true; }
      } else {
        this.ColorMesialCSSArray[27] = false; this.ColorDistalCSSArray[27] = false;
        this.ColorLingualCSSArray[27] = false; this.ColorOcclusalCSSArray[27] = false;
        this.ColorBuccalCSSArray[27] = false;
      }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[28] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[28] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[28] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[28] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[28] = true; }
      } else {
        this.ColorMesialCSSArray[28] = false; this.ColorDistalCSSArray[28] = false;
        this.ColorLingualCSSArray[28] = false; this.ColorOcclusalCSSArray[28] = false;
        this.ColorBuccalCSSArray[28] = false;
      }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[48] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[48] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[48] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[48] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[48] = true; }
      } else {
        this.ColorMesialCSSArray[48] = false; this.ColorDistalCSSArray[48] = false;
        this.ColorLingualCSSArray[48] = false; this.ColorOcclusalCSSArray[48] = false;
        this.ColorBuccalCSSArray[48] = false;
      }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[47] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[47] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[47] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[47] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[47] = true; }
      } else {
        this.ColorMesialCSSArray[47] = false; this.ColorDistalCSSArray[47] = false;
        this.ColorLingualCSSArray[47] = false; this.ColorOcclusalCSSArray[47] = false;
        this.ColorBuccalCSSArray[47] = false;
      }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[46] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[46] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[46] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[46] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[46] = true; }
      } else {
        this.ColorMesialCSSArray[46] = false; this.ColorDistalCSSArray[46] = false;
        this.ColorLingualCSSArray[46] = false; this.ColorOcclusalCSSArray[46] = false;
        this.ColorBuccalCSSArray[46] = false;
      }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[45] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[45] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[45] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[45] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[45] = true; }
      } else {
        this.ColorMesialCSSArray[45] = false; this.ColorDistalCSSArray[45] = false;
        this.ColorLingualCSSArray[45] = false; this.ColorOcclusalCSSArray[45] = false;
        this.ColorBuccalCSSArray[45] = false;
      }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[44] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[44] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[44] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[44] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[44] = true; }
      } else {
        this.ColorMesialCSSArray[44] = false; this.ColorDistalCSSArray[44] = false;
        this.ColorLingualCSSArray[44] = false; this.ColorOcclusalCSSArray[44] = false;
        this.ColorBuccalCSSArray[44] = false;
      }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[43] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[43] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[43] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[43] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[43] = true; }
      } else {
        this.ColorMesialCSSArray[43] = false; this.ColorDistalCSSArray[43] = false;
        this.ColorLingualCSSArray[43] = false; this.ColorOcclusalCSSArray[43] = false;
        this.ColorBuccalCSSArray[43] = false;
      }

    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[42] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[42] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[42] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[42] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[42] = true; }
      } else {
        this.ColorMesialCSSArray[42] = false; this.ColorDistalCSSArray[42] = false;
        this.ColorLingualCSSArray[42] = false; this.ColorOcclusalCSSArray[42] = false;
        this.ColorBuccalCSSArray[42] = false;
      }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[41] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[41] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[41] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[41] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[41] = true; }
      } else {
        this.ColorMesialCSSArray[41] = false; this.ColorDistalCSSArray[41] = false;
        this.ColorLingualCSSArray[41] = false; this.ColorOcclusalCSSArray[41] = false;
        this.ColorBuccalCSSArray[41] = false;
      }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[31] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[31] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[31] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[31] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[31] = true; }
      } else {
        this.ColorMesialCSSArray[31] = false; this.ColorDistalCSSArray[31] = false;
        this.ColorLingualCSSArray[31] = false; this.ColorOcclusalCSSArray[31] = false;
        this.ColorBuccalCSSArray[31] = false;
      }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[32] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[32] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[32] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[32] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[32] = true; }
      } else {
        this.ColorMesialCSSArray[32] = false; this.ColorDistalCSSArray[32] = false;
        this.ColorLingualCSSArray[32] = false; this.ColorOcclusalCSSArray[32] = false;
        this.ColorBuccalCSSArray[32] = false;
      }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[33] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[33] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[33] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[33] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[33] = true; }
      } else {
        this.ColorMesialCSSArray[33] = false; this.ColorDistalCSSArray[33] = false;
        this.ColorLingualCSSArray[33] = false; this.ColorOcclusalCSSArray[33] = false;
        this.ColorBuccalCSSArray[33] = false;
      }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[34] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[34] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[34] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[34] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[34] = true; }
      } else {
        this.ColorMesialCSSArray[34] = false; this.ColorDistalCSSArray[34] = false;
        this.ColorLingualCSSArray[34] = false; this.ColorOcclusalCSSArray[34] = false;
        this.ColorBuccalCSSArray[34] = false;
      }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[35] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[35] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[35] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[35] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[35] = true; }
      } else {
        this.ColorMesialCSSArray[35] = false; this.ColorDistalCSSArray[35] = false;
        this.ColorLingualCSSArray[35] = false; this.ColorOcclusalCSSArray[35] = false;
        this.ColorBuccalCSSArray[35] = false;
      }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[36] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[36] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[36] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[36] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[36] = true; }
      } else {
        this.ColorMesialCSSArray[36] = false; this.ColorDistalCSSArray[36] = false;
        this.ColorLingualCSSArray[36] = false; this.ColorOcclusalCSSArray[36] = false;
        this.ColorBuccalCSSArray[36] = false;
      }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[37] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[37] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[37] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[37] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[37] = true; }
      } else {
        this.ColorMesialCSSArray[37] = false; this.ColorDistalCSSArray[37] = false;
        this.ColorLingualCSSArray[37] = false; this.ColorOcclusalCSSArray[37] = false;
        this.ColorBuccalCSSArray[37] = false;
      }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        if (this.ColorMesialchecked === true) { this.ColorMesialCSSArray[38] = true; }
        if (this.ColorDistalchecked === true) { this.ColorDistalCSSArray[38] = true; }
        if (this.ColorLingualchecked === true) { this.ColorLingualCSSArray[38] = true; }
        if (this.ColorOcclusalchecked === true) { this.ColorOcclusalCSSArray[38] = true; }
        if (this.ColorBuccalchecked === true) { this.ColorBuccalCSSArray[38] = true; }
      } else {
        this.ColorMesialCSSArray[38] = false; this.ColorDistalCSSArray[38] = false;
        this.ColorLingualCSSArray[38] = false; this.ColorOcclusalCSSArray[38] = false;
        this.ColorBuccalCSSArray[38] = false;
      }
    }

  }

  hidePatientName() {
    if (this.patientN === false) {
      this.patientN = true;
    } else if (this.patientN === true) {
      this.patientN = false;
    }
  }

  /*public submitForm() {
    this.adminService.saveTeethDiagnose();
  }*/

  updatePlanName() {
    const data = { PlanID: this.PlanID, PlanName: this.planName };
    this.adminService.updatePlanName(data).subscribe(data1 => {
      this.planName = data1.PlanName;
      this.patientN = false;
      this.showSuccess('Patient update Successfully', 'Patient updated');
    });
  }

  CariesFormSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Caries Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnose(this.CariesForms, this.cariesTagValue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Caries save', 'data saved');
      });
    var selectedSurface = ""
    this.SelectedCaries.forEach((element: string) => {
      selectedSurface += element + ",";
    });
    this.onAddItemClicked(this.cariesTagValue, selectedSurface, "", this.observation);
  }

  FractureFormSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Fracture Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnose(this.FractureForms, this.FractureValue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Fracture save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked("Fracture", "", this.FractureValue, this.observation);

  }

  SeverelyDamagedFormSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Severely Damaged Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnose(this.SeverelyDamagedForms, this.cariesTagValue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Severely Damaged save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked("Severely Damaged", "", "", this.observation);
  }

  WearFormsSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Wear Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnose(this.WearForms, this.cariesTagValue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Wear save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked("Wear", "", this.WearForms.Wearvalue, this.observation);
  }


  PlaqueHygieneFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.PlaqueHygieneForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Plaque & Hygiene save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.PlaqueHygieneForms.PlaqueHygienevalue, this.observation);
  }

  GingivitisFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.GingivitisForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Gingivitis save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.GingivitisForms.Gingivitisvalue, this.observation);
  }

  GingivalRecessionFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.GingivalRecessionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Gingival Recession save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.GingivalRecessionForms.GingivalRecessionvalue, this.observation);
  }

  PeriodontitisFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.PeriodontitisForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Periodontitis save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.PeriodontitisForms.Periodontitisvalue, this.observation);
  }

  MobilityFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.MobilityForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Mobility save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.MobilityForms.Mobilityvalue, this.observation);
  }

  GummySmileFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.GummySmileForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('GummySmile save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  GingivalOvergrowthFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.GingivalOvergrowthForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Gingival Overgrowth save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  LargeMaxillarySinusFormsSubmit() {
    this.adminService.saveTeethDiagnosePerioBone(this.LargeMaxillarySinusForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Large Maxillary Sinus save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  necrosisFormsSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Necrosis Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseEndodontics(this.NecrosisForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Necrosis save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  rootCanalTreatmentFormsSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Root Canal Treatment Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseEndodontics(this.RootCanalTreatmentForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Root Canal Treatment save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.RootCanalTreatmentForms.RootCanalTreatmentvalue, this.observation);
  }

  apicalLesioFormsSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Apical Lesio Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseEndodontics(this.ApicalLesioForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Apical Lesio save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", this.ApicalLesioForms.ApicalLesiovalue, this.observation);
  }

  brokenInstrumentinCanalForms() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Broken Instrument in Canal Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseEndodontics(this.BrokenInstrumentinCanalForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Broken Instrument in Canal save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  rootResorptionForms() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Root Resorption Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseEndodontics(this.RootResorptionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Root Resorption save', 'data saved');
        console.log(data);
      });
    var respDegree = "";
    if (this.RootResorptionForms.External) {
      respDegree = "External";
    } if (this.RootResorptionForms.Internal && respDegree.includes("External")) {
      respDegree += ", Internal"
    } else if (this.RootResorptionForms.Internal) {
      respDegree = "Internal";
    }
    this.onAddItemClicked(this.Periotagvalue, "", respDegree, this.observation);
  }

  missingTeeth() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Missing Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Missing Teeth save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  implantTeeth() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Implant Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseMissingTeethImplants(this.ImplantForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Implant Teeth save', 'data saved');
        console.log(data);
      });
    this.checkBoxValue;
    var implantDegree = "";
    this.checkBoxValue.forEach(element => {
      implantDegree += element + " , ";
    });
    this.onAddItemClicked(this.Periotagvalue, "", implantDegree, this.observation);
    this.checkBoxValue = [];
  }

  impactedTeeth() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Impacted Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Impacted Teeth save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  impactedInfectedTeeth() {
    if (!this.selectedTeethValueString) {
      this.showFailure('impacted & Infected Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('Impacted & Infected Teeth save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  largeMaxillarySinus() {
    if (!this.selectedTeethValueString) {
      this.showFailure('large Maxillary Sinus Not Saved', 'Please select a teeth first');
      return;
    }
    this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
      this.selectedTeethValueString, this.PatientID).subscribe(data => {
        this.showSuccess('large Maxillary Sinus save', 'data saved');
        console.log(data);
      });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  restorationSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Restoration Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    if (!this.RColor) {
      this.showFailure('Restoration Teeth Not Saved', 'Please select a surface first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });
    var restorationSurface = "";
    this.RColor.forEach(element => {
      restorationSurface += element + " , "
    });
    this.onAddItemClicked(this.Periotagvalue, restorationSurface, this.selectedRestorationDegree, this.observation);
  }

  postSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Post Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });
    this.onAddItemClicked(this.Periotagvalue, "", this.postSelectedValue, this.observation);
  }

  splintSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Splint Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });
    this.onAddItemClicked(this.Periotagvalue, "", this.splintSelectedValue, this.observation);
  }

  discoloredTeetSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Discolored Teeth Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });
    this.onAddItemClicked(this.Periotagvalue, "", "", this.observation);
  }

  veneerSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Veneer Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });

    this.onAddItemClicked(this.Periotagvalue, "", this.selectedVeneer, this.observation);
    this.selectedVeneer = "";
    this.selectedVeneerArray = [];
  }

  crownSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Crown Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });

    this.onAddItemClicked(this.Periotagvalue, "", this.selectedCrown, this.observation);
    this.selectedCrown = "";
    this.selectedCrownArray = [];
  }

  onlaySubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Onlay Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });

    this.onAddItemClicked(this.Periotagvalue, "", this.selectedOnlay, this.observation);
    this.selectedOnlay = "";
    this.selectedOnlayArray = [];
  }

  bridgeSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Bridge Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });

    this.onAddItemClicked(this.Periotagvalue, "", this.selectedBridge, this.observation);
    this.selectedBridge = "";
    this.selectedBridgeArray = [];
  }

  dentureSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Denture Not Saved', 'Please select a teeth first');
      return;
    }
    // this.adminService.saveTeethDiagnoseMissingTeethImplants(this.RootResorptionForms, this.Periotagvalue,
    //   this.selectedTeethValueString, this.PatientID).subscribe(data => {
    //     this.showSuccess('large Maxillary Sinus save', 'data saved');
    //     console.log(data);
    //   });

    this.onAddItemClicked(this.Periotagvalue, "", this.selectedDenture, this.observation);
    this.selectedDenture = "";
    this.selectedDentureArray = [];
  }

  otherTabSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Other Not Saved', 'Please select a teeth first');
      return;
    }
    this.onAddItemClicked(this.OtherName, "", "", this.observation);
    this.OtherName = "";
  }

  malocclusionSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Malocclusion Not Saved', 'Please select a teeth first');
      return;
    }
  }

  facialSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('Facial Not Saved', 'Please select a teeth first');
      return;
    }
  }

  tmjMusclesSubmit() {
    if (!this.selectedTeethValueString) {
      this.showFailure('TMJ & Muscles Not Saved', 'Please select a teeth first');
      return;
    }
  }

  showSuccess(display, Message) {
    this.toastrService.success(display, Message);
  }

  showFailure(error, Message) {
    this.toastrService.error(error, Message);
  }

  onAddItemClicked(tag: any, surface: any, degree: any, observation: any) {
    var dignose: Diagnose = {
      Tag: tag, Teeths: this.selectedTeethValueString,
      Surface: surface, DegreeStatus: degree, Observation: observation
    };
    this.planService.diagnosis.push(dignose);
    this.showSuccess('Item Created', 'Item added with sucess to diagnosis');
    this.observation = "";
    this.selectedTeethValueString = "";
    this.selectedTeethValue = [];
    this.Periotagvalue = "";
    this.planService.teethArray = this.teethArr
    this.pdfComp.getUpdatedTeethsDiagnosis();
  }

  onReportClicked() {
    this.planService.teethArray = this.teethArr
    this.pdfComp.getUpdatedTeethsDiagnosis();
    this.pdfComp.getUpdatedTeethsPlan();
  }

  getReportHtml() {
    const conten = this.pdfContainer.getHTML().replace(/<!-[\S\s]*?-->/gm, '').replace(/_ngcontent-[\S\s]*?=""/gm, '');
    //const color = this.pdfContainer.getColor();
    const color = this.selectedColor;
    var htmlContent = this.pdfContainer.getHTML();
    const rand = Math.floor(Math.random() * 1000);
    var data = document.getElementById('pdf-container');
    // add html document tags
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Dental Max</title><style type="text/css">.page { border-right-color: ${color}; } .text-main-color { color: ${color}; }</style><link rel="stylesheet" href="http://localhost:4200/src/styles.css"></head><body>${conten}</body></html>`;
    return htmlContent;
  }

  generatePdf() {
    var data = this.getReportHtml();
    //html to pdf format
    var html = htmlToPdfmake(data);
    //, styles: styles.style 
    const documentDefinition = { content: html, };
    pdfMake.createPdf(documentDefinition).open();
  }

  onConfigurationChange(event, value) {
    this.pdfContainer.onConfigChange(event, value);
    if (value === 'includePlanPrices') {
      this.isPlanPricesCheckd = event;
    }
  }

  changeColor(color: any) {
    this.selectedColor = color;
    this.pdfContainer.onColorChange(this.selectedColor);
  }

  showDocumentListPopup() {
    const dialogRef = this.dialog.open(DocumentSelectorComponent);
    this.pdfContainer.getUpdatedDocuments();
  }

  showPhotoTemplatesPopup() {
    const dialogRef = this.dialog.open(PhotoTemplatesComponent);
  }

}
