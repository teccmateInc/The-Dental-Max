import { ToastrService } from 'ngx-toastr';
import { Plan, PlanStages } from 'src/app/models/plan';
import { AdminService } from '../../services/admin.service';
import { PlanService } from 'src/app/services/plan.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PdfContainerComponent } from '../pdf-container/pdf-container.component';
import { MatDialog } from '@angular/material/dialog';
import { StagePopupComponent } from '../stage-popup/stage-popup.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  pdfComp: PdfContainerComponent;
  @ViewChild('Price') Price: ElementRef;
  @ViewChild('date') date: ElementRef;
  @ViewChild('message') message: ElementRef;

  stages: any = [
    {
      name: 'Default Stage',
      description: 'Default Stage Description'
    }
  ];

  @Input() id: any;
  bodydata = { PatientID: this.id, SelectedTeeth: null, tablename: null, price: null, date: null, message: null, stage: null };
  teeth18 = false; teeth17 = false; teeth16 = false; teeth15 = false; teeth14 = false; teeth13 = false; teeth12 = false; teeth11 = false;
  teeth21 = false; teeth22 = false; teeth23 = false; teeth24 = false; teeth25 = false; teeth26 = false; teeth27 = false; teeth28 = false;
  teeth48 = false; teeth47 = false; teeth46 = false; teeth45 = false; teeth44 = false; teeth43 = false; teeth42 = false; teeth41 = false;
  teeth31 = false; teeth32 = false; teeth33 = false; teeth34 = false; teeth35 = false; teeth36 = false; teeth37 = false; teeth38 = false;
  firstsection = false;
  secondsection = false;
  thirdsection = false;
  forthsection = false;

  selectedTeethValue = [];
  selectedTeethValueString: any;
  treatment: any;

  ortho = true;
  isDisabled = true;
  isCreateStageClicked = false;
  type = '';
  typeB = false;


  BoneRegenerationCSSArray = new Array();
  BoneRegeneration = false;

  RootCanalTreatmentValue: any;
  RestorativeBleach: any;
  RootCanalTreatmentCSSArray = new Array();
  rootCanalTreatment = false;

  apicectomy = false;
  apicectomyCssArray = new Array();


  Implant = false;
  ImplantCSSArray = new Array();

  RestorationValue = [];
  RBuccal = false;
  RBuccalCSSarray = new Array();
  RDistal = false;
  RDistalCSSarray = new Array();
  RLingual = false;
  RLingualCSSarray = new Array();
  RMesial = false;
  RMesialCSSarray = new Array();
  ROcclusal = false;
  ROcclusalCSSarray = new Array();

  RPost = false;
  RExternalBleach = false;
  RInternalBleach = false;

  RCoreBuildUp = false;

  CoreBuildUpValue = [];
  CBuccal = false;
  CBuccalCSSarray = new Array();
  CDistal = false;
  CDistalCSSarray = new Array();
  CLingual = false;
  CLingualCSSarray = new Array();
  CMesial = false;
  CMesialCSSarray = new Array();
  COcclusal = false;
  COcclusalCSSarray = new Array();

  provisionalRestoration = false;

  ProvisionalRestorationValue = [];
  PBuccal = false;
  PBuccalCSSarray = new Array();
  PDistal = false;
  PDistalCSSarray = new Array();
  PLingual = false;
  PLingualCSSarray = new Array();
  PMesial = false;
  PMesialCSSarray = new Array();
  POcclusal = false;
  POcclusalCSSarray = new Array();


  // 

  PVeneer = false;
  PVeneerCSSArray = new Array();

  POnlay = false;
  POnlayCSSArray = new Array();

  PCrown = false;
  PCrownCSSArray = new Array();

  DentureVar = false;
  ChromeCobalt = false;
  ChromeCobaltCssArray = new Array();
  Acrylic = false;
  AcrylicCssArray = new Array();
  DentureValue = [];


  constructor(public dialog: MatDialog, private adminService: AdminService, private toastrService: ToastrService, private planService: PlanService,private element: ElementRef) { }

  ngOnInit() {
  }


  teeth(mode, teethValue) {
    if (mode === 'tooth18') {
      if (this.teeth18 === false) {
        this.teeth18 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[18] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[18] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[18] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[18] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[18] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[18] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[18] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[18] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[18] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[18] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[18] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[18] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[18] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[18] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[18] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[18] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[18] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[18] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[18] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[18] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[18] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[18] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[18] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[18] = true; }



        this.selectedTeethValue.push(teethValue);
      } else {
        this.teeth18 = false;
        this.BoneRegenerationCSSArray[18] = false;
        this.RootCanalTreatmentCSSArray[18] = false;
        this.apicectomyCssArray[18] = false;
        this.ImplantCSSArray[18] = false;
        this.RBuccalCSSarray[18] = false; this.RDistalCSSarray[18] = false; this.ROcclusalCSSarray[18] = false; this.RLingualCSSarray[18] = false; this.RMesialCSSarray[18] = false;
        this.CBuccalCSSarray[18] = false; this.CDistalCSSarray[18] = false; this.COcclusalCSSarray[18] = false; this.CLingualCSSarray[18] = false; this.CMesialCSSarray[18] = false;
        this.PBuccalCSSarray[18] = false; this.PDistalCSSarray[18] = false; this.POcclusalCSSarray[18] = false; this.PLingualCSSarray[18] = false; this.PMesialCSSarray[18] = false;
        this.PVeneerCSSArray[18] = false;
        this.POnlayCSSArray[18] = false;
        this.PCrownCSSArray[18] = false;
        this.AcrylicCssArray[18] = false;
        this.ChromeCobaltCssArray[18] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 18);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth17') {
      if (this.teeth17 === false) {
        this.teeth17 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[17] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[17] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[17] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[17] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[17] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[17] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[17] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[17] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[17] = true; }
        if (this.CMesial === true) { this.CMesialCSSarray[17] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[17] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[17] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[17] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[17] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[17] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[17] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[17] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[17] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[17] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[17] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[17] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[17] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[17] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[17] = true; }


        this.selectedTeethValue.push(teethValue);
      } else {
        this.teeth17 = false;
        this.BoneRegenerationCSSArray[17] = false;
        this.RootCanalTreatmentCSSArray[17] = false;
        this.apicectomyCssArray[17] = false;
        this.RBuccalCSSarray[17] = false; this.RDistalCSSarray[17] = false; this.ROcclusalCSSarray[17] = false; this.RLingualCSSarray[17] = false; this.RMesialCSSarray[17] = false;
        this.CBuccalCSSarray[17] = false; this.CDistalCSSarray[17] = false; this.COcclusalCSSarray[17] = false; this.CLingualCSSarray[17] = false; this.CMesialCSSarray[17] = false;
        this.PBuccalCSSarray[17] = false; this.PDistalCSSarray[17] = false; this.POcclusalCSSarray[17] = false; this.PLingualCSSarray[17] = false; this.PMesialCSSarray[17] = false;
        this.PVeneerCSSArray[17] = false;
        this.POnlayCSSArray[17] = false;
        this.PCrownCSSArray[17] = false;
        this.AcrylicCssArray[17] = false;
        this.ChromeCobaltCssArray[17] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 17);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth16') {
      if (this.teeth16 === false) {
        this.teeth16 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[16] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[16] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[16] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[16] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[16] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[16] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[16] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[16] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[16] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[16] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[16] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[16] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[16] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[16] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[16] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[16] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[16] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[16] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[16] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[16] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[16] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[16] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[16] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[16] = true; }


        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth16 = false;
        this.BoneRegenerationCSSArray[16] = false;
        this.RootCanalTreatmentCSSArray[16] = false;
        this.apicectomyCssArray[16] = false;
        this.RBuccalCSSarray[16] = false; this.RDistalCSSarray[16] = false; this.ROcclusalCSSarray[16] = false; this.RLingualCSSarray[16] = false; this.RMesialCSSarray[16] = false;
        this.CBuccalCSSarray[16] = false; this.CDistalCSSarray[16] = false; this.COcclusalCSSarray[16] = false; this.CLingualCSSarray[16] = false; this.CMesialCSSarray[16] = false;
        this.PBuccalCSSarray[16] = false; this.PDistalCSSarray[16] = false; this.POcclusalCSSarray[16] = false; this.PLingualCSSarray[16] = false; this.PMesialCSSarray[16] = false;
        this.PVeneerCSSArray[16] = false;
        this.POnlayCSSArray[16] = false;
        this.PCrownCSSArray[16] = false;
        this.AcrylicCssArray[16] = false;
        this.ChromeCobaltCssArray[16] = false;

        const found = this.selectedTeethValue.findIndex(element => element === 16);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth15') {
      if (this.teeth15 === false) {
        this.teeth15 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[15] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[15] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[15] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[15] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[15] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[15] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[15] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[15] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[15] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[15] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[15] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[15] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[15] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[15] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[15] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[15] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[15] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[15] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[15] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[15] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[15] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[15] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[15] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[15] = true; }


        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth15 = false;
        this.BoneRegenerationCSSArray[15] = false;
        this.RootCanalTreatmentCSSArray[15] = false;
        this.apicectomyCssArray[15] = false;
        this.RBuccalCSSarray[15] = false; this.RDistalCSSarray[15] = false; this.ROcclusalCSSarray[15] = false; this.RLingualCSSarray[15] = false; this.RMesialCSSarray[15] = false;
        this.CBuccalCSSarray[15] = false; this.CDistalCSSarray[15] = false; this.COcclusalCSSarray[15] = false; this.CLingualCSSarray[15] = false; this.CMesialCSSarray[15] = false;
        this.PBuccalCSSarray[15] = false; this.PDistalCSSarray[15] = false; this.POcclusalCSSarray[15] = false; this.PLingualCSSarray[15] = false; this.PMesialCSSarray[15] = false;
        this.PVeneerCSSArray[15] = false;
        this.POnlayCSSArray[15] = false;
        this.PCrownCSSArray[15] = false;
        this.AcrylicCssArray[15] = false;
        this.ChromeCobaltCssArray[15] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 15);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth14') {
      if (this.teeth14 === false) {
        this.teeth14 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[14] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[14] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[14] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[14] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[14] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[14] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[14] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[14] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[14] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[14] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[14] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[14] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[14] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[14] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[14] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[14] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[14] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[14] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[14] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[14] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[14] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[14] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[14] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[14] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth14 = false;
        this.BoneRegenerationCSSArray[14] = false;
        this.RootCanalTreatmentCSSArray[14] = false;
        this.apicectomyCssArray[14] = false;
        this.RBuccalCSSarray[14] = false; this.RDistalCSSarray[14] = false; this.ROcclusalCSSarray[14] = false; this.RLingualCSSarray[14] = false; this.RMesialCSSarray[14] = false;
        this.CBuccalCSSarray[14] = false; this.CDistalCSSarray[14] = false; this.COcclusalCSSarray[14] = false; this.CLingualCSSarray[14] = false; this.CMesialCSSarray[14] = false;
        this.PBuccalCSSarray[14] = false; this.PDistalCSSarray[14] = false; this.POcclusalCSSarray[14] = false; this.PLingualCSSarray[14] = false; this.PMesialCSSarray[14] = false;
        this.PVeneerCSSArray[14] = false;
        this.POnlayCSSArray[14] = false;
        this.PCrownCSSArray[14] = false;
        this.AcrylicCssArray[14] = false;
        this.ChromeCobaltCssArray[14] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 14);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth13') {
      if (this.teeth13 === false) {
        this.teeth13 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[13] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[13] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[13] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[13] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[13] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[13] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[13] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[13] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[13] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[13] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[13] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[13] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[13] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[13] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[13] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[13] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[13] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[13] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[13] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[13] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[13] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[13] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[13] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[13] = true; }


        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth13 = false;
        this.BoneRegenerationCSSArray[13] = false;
        this.RootCanalTreatmentCSSArray[13] = false;
        this.apicectomyCssArray[13] = false;
        this.RBuccalCSSarray[13] = false; this.RDistalCSSarray[13] = false; this.ROcclusalCSSarray[13] = false; this.RLingualCSSarray[13] = false; this.RMesialCSSarray[13] = false;
        this.CBuccalCSSarray[13] = false; this.CDistalCSSarray[13] = false; this.COcclusalCSSarray[13] = false; this.CLingualCSSarray[13] = false; this.CMesialCSSarray[13] = false;
        this.PBuccalCSSarray[13] = false; this.PDistalCSSarray[13] = false; this.POcclusalCSSarray[13] = false; this.PLingualCSSarray[13] = false; this.PMesialCSSarray[13] = false;
        this.PVeneerCSSArray[13] = false;
        this.POnlayCSSArray[13] = false;
        this.PCrownCSSArray[13] = false;
        this.AcrylicCssArray[13] = false;
        this.ChromeCobaltCssArray[13] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 13);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth12') {
      if (this.teeth12 === false) {
        this.teeth12 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[12] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[12] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[12] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[12] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[12] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[12] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[12] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[12] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[12] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[12] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[12] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[12] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[12] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[12] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[12] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[12] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[12] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[12] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[12] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[12] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[12] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[12] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[12] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[12] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth12 = false;
        this.BoneRegenerationCSSArray[12] = false;
        this.RootCanalTreatmentCSSArray[12] = false;
        this.apicectomyCssArray[12] = false;
        this.RBuccalCSSarray[12] = false; this.RDistalCSSarray[12] = false; this.ROcclusalCSSarray[12] = false; this.RLingualCSSarray[12] = false; this.RMesialCSSarray[12] = false;
        this.CBuccalCSSarray[12] = false; this.CDistalCSSarray[12] = false; this.COcclusalCSSarray[12] = false; this.CLingualCSSarray[12] = false; this.CMesialCSSarray[12] = false;
        this.PBuccalCSSarray[12] = false; this.PDistalCSSarray[12] = false; this.POcclusalCSSarray[12] = false; this.PLingualCSSarray[12] = false; this.PMesialCSSarray[12] = false;
        this.PVeneerCSSArray[12] = false;
        this.POnlayCSSArray[12] = false;
        this.PCrownCSSArray[12] = false;
        this.AcrylicCssArray[12] = false;
        this.ChromeCobaltCssArray[12] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 12);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth11') {
      if (this.teeth11 === false) {
        this.teeth11 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[11] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[11] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[11] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[11] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[11] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[11] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[11] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[11] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[11] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[11] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[11] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[11] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[11] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[11] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[11] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[11] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[11] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[11] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[11] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[11] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[11] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[11] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[11] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[11] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth11 = false;
        this.BoneRegenerationCSSArray[11] = false;
        this.RootCanalTreatmentCSSArray[11] = false;
        this.apicectomyCssArray[11] = false;
        this.RBuccalCSSarray[11] = false; this.RDistalCSSarray[11] = false; this.ROcclusalCSSarray[11] = false; this.RLingualCSSarray[11] = false; this.RMesialCSSarray[11] = false;
        this.CBuccalCSSarray[11] = false; this.CDistalCSSarray[11] = false; this.COcclusalCSSarray[11] = false; this.CLingualCSSarray[11] = false; this.CMesialCSSarray[11] = false;
        this.PBuccalCSSarray[11] = false; this.PDistalCSSarray[11] = false; this.POcclusalCSSarray[11] = false; this.PLingualCSSarray[11] = false; this.PMesialCSSarray[11] = false;
        this.PVeneerCSSArray[11] = false;
        this.POnlayCSSArray[11] = false;
        this.PCrownCSSArray[11] = false;
        this.AcrylicCssArray[11] = false;
        this.ChromeCobaltCssArray[11] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 11);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth21') {
      if (this.teeth21 === false) {
        this.teeth21 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[21] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[21] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[21] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[21] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[21] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[21] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[21] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[21] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[21] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[21] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[21] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[21] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[21] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[21] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[21] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[21] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[21] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[21] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[21] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[21] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[21] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[21] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[21] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[21] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth21 = false;
        this.BoneRegenerationCSSArray[21] = false;
        this.RootCanalTreatmentCSSArray[21] = false;
        this.apicectomyCssArray[21] = false;
        this.RBuccalCSSarray[21] = false; this.RDistalCSSarray[21] = false; this.ROcclusalCSSarray[21] = false; this.RLingualCSSarray[21] = false; this.RMesialCSSarray[21] = false;
        this.CBuccalCSSarray[21] = false; this.CDistalCSSarray[21] = false; this.COcclusalCSSarray[21] = false; this.CLingualCSSarray[21] = false; this.CMesialCSSarray[21] = false;
        this.PBuccalCSSarray[21] = false; this.PDistalCSSarray[21] = false; this.POcclusalCSSarray[21] = false; this.PLingualCSSarray[21] = false; this.PMesialCSSarray[21] = false;
        this.PVeneerCSSArray[21] = false;
        this.POnlayCSSArray[21] = false;
        this.PCrownCSSArray[21] = false;
        this.AcrylicCssArray[21] = false;
        this.ChromeCobaltCssArray[21] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 21);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth22') {
      if (this.teeth22 === false) {
        this.teeth22 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[22] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[22] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[22] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[22] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[22] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[22] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[22] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[22] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[22] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[22] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[22] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[22] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[22] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[22] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[22] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[22] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[22] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[22] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[22] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[22] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[22] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[22] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[22] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[22] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth22 = false;
        this.BoneRegenerationCSSArray[22] = false;
        this.RootCanalTreatmentCSSArray[22] = false;
        this.apicectomyCssArray[22] = false;
        this.RBuccalCSSarray[22] = false; this.RDistalCSSarray[22] = false; this.ROcclusalCSSarray[22] = false; this.RLingualCSSarray[22] = false; this.RMesialCSSarray[22] = false;
        this.CBuccalCSSarray[22] = false; this.CDistalCSSarray[22] = false; this.COcclusalCSSarray[22] = false; this.CLingualCSSarray[22] = false; this.CMesialCSSarray[22] = false;
        this.PBuccalCSSarray[22] = false; this.PDistalCSSarray[22] = false; this.POcclusalCSSarray[22] = false; this.PLingualCSSarray[22] = false; this.PMesialCSSarray[22] = false;
        this.PVeneerCSSArray[22] = false;
        this.POnlayCSSArray[22] = false;
        this.PCrownCSSArray[22] = false;
        this.AcrylicCssArray[22] = false;
        this.ChromeCobaltCssArray[22] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 22);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth23') {
      if (this.teeth23 === false) {
        this.teeth23 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[23] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[23] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[23] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[23] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[23] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[23] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[23] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[23] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[23] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[23] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[23] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[23] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[23] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[23] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[23] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[23] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[23] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[23] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[23] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[23] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[23] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[23] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[23] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[23] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth23 = false;
        this.BoneRegenerationCSSArray[23] = false;
        this.RootCanalTreatmentCSSArray[23] = false;
        this.apicectomyCssArray[23] = false;
        this.RBuccalCSSarray[23] = false; this.RDistalCSSarray[23] = false; this.ROcclusalCSSarray[23] = false; this.RLingualCSSarray[23] = false; this.RMesialCSSarray[23] = false;
        this.CBuccalCSSarray[23] = false; this.CDistalCSSarray[23] = false; this.COcclusalCSSarray[23] = false; this.CLingualCSSarray[23] = false; this.CMesialCSSarray[23] = false;
        this.PBuccalCSSarray[23] = false; this.PDistalCSSarray[23] = false; this.POcclusalCSSarray[23] = false; this.PLingualCSSarray[23] = false; this.PMesialCSSarray[23] = false;
        this.PVeneerCSSArray[23] = false;
        this.POnlayCSSArray[23] = false;
        this.PCrownCSSArray[23] = false;
        this.AcrylicCssArray[23] = false;
        this.ChromeCobaltCssArray[23] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 23);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth24') {
      if (this.teeth24 === false) {
        this.teeth24 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[24] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[24] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[24] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[24] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[24] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[24] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[24] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[24] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[24] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[24] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[24] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[24] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[24] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[24] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[24] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[24] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[24] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[24] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[24] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[24] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[24] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[24] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[24] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[24] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth24 = false;
        this.BoneRegenerationCSSArray[24] = false;
        this.RootCanalTreatmentCSSArray[24] = false;
        this.apicectomyCssArray[24] = false;
        this.RBuccalCSSarray[24] = false; this.RDistalCSSarray[24] = false; this.ROcclusalCSSarray[24] = false; this.RLingualCSSarray[24] = false; this.RMesialCSSarray[24] = false;
        this.CBuccalCSSarray[24] = false; this.CDistalCSSarray[24] = false; this.COcclusalCSSarray[24] = false; this.CLingualCSSarray[24] = false; this.CMesialCSSarray[24] = false;
        this.PBuccalCSSarray[24] = false; this.PDistalCSSarray[24] = false; this.POcclusalCSSarray[24] = false; this.PLingualCSSarray[24] = false; this.PMesialCSSarray[24] = false;
        this.PVeneerCSSArray[24] = false;
        this.POnlayCSSArray[24] = false;
        this.PCrownCSSArray[24] = false;
        this.AcrylicCssArray[24] = false;
        this.ChromeCobaltCssArray[24] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 24);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth25') {
      if (this.teeth25 === false) {
        this.teeth25 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[25] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[25] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[25] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[25] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[25] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[25] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[25] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[25] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[25] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[25] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[25] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[25] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[25] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[25] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[25] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[25] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[25] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[25] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[25] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[25] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[25] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[25] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[25] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[25] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth25 = false;
        this.BoneRegenerationCSSArray[25] = false;
        this.RootCanalTreatmentCSSArray[25] = false;
        this.apicectomyCssArray[25] = false;
        this.RBuccalCSSarray[25] = false; this.RDistalCSSarray[25] = false; this.ROcclusalCSSarray[25] = false; this.RLingualCSSarray[25] = false; this.RMesialCSSarray[25] = false;
        this.CBuccalCSSarray[25] = false; this.CDistalCSSarray[25] = false; this.COcclusalCSSarray[25] = false; this.CLingualCSSarray[25] = false; this.CMesialCSSarray[25] = false;
        this.PBuccalCSSarray[25] = false; this.PDistalCSSarray[25] = false; this.POcclusalCSSarray[25] = false; this.PLingualCSSarray[25] = false; this.PMesialCSSarray[25] = false;
        this.PVeneerCSSArray[25] = false;
        this.POnlayCSSArray[25] = false;
        this.PCrownCSSArray[25] = false;
        this.AcrylicCssArray[25] = false;
        this.ChromeCobaltCssArray[25] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 25);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth26') {
      if (this.teeth26 === false) {
        this.teeth26 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[26] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[26] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[26] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[26] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[26] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[26] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[26] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[26] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[26] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[26] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[26] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[26] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[26] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[26] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[26] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[26] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[26] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[26] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[26] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[26] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[26] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[26] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[26] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[26] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth26 = false;
        this.BoneRegenerationCSSArray[26] = false;
        this.RootCanalTreatmentCSSArray[26] = false;
        this.apicectomyCssArray[26] = false;
        this.RBuccalCSSarray[26] = false; this.RDistalCSSarray[26] = false; this.ROcclusalCSSarray[26] = false; this.RLingualCSSarray[26] = false; this.RMesialCSSarray[26] = false;
        this.CBuccalCSSarray[26] = false; this.CDistalCSSarray[26] = false; this.COcclusalCSSarray[26] = false; this.CLingualCSSarray[26] = false; this.CMesialCSSarray[26] = false;
        this.PBuccalCSSarray[26] = false; this.PDistalCSSarray[26] = false; this.POcclusalCSSarray[26] = false; this.PLingualCSSarray[26] = false; this.PMesialCSSarray[26] = false;
        this.PVeneerCSSArray[26] = false;
        this.POnlayCSSArray[26] = false;
        this.PCrownCSSArray[26] = false;
        this.AcrylicCssArray[26] = false;
        this.ChromeCobaltCssArray[26] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 26);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth27') {
      if (this.teeth27 === false) {
        this.teeth27 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[27] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[27] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[27] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[27] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[27] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[27] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[27] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[27] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[27] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[27] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[27] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[27] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[27] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[27] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[27] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[27] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[27] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[27] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[27] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[27] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[27] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[27] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[27] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[27] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth27 = false;
        this.BoneRegenerationCSSArray[27] = false;
        this.RootCanalTreatmentCSSArray[27] = false;
        this.apicectomyCssArray[27] = false;
        this.RBuccalCSSarray[27] = false; this.RDistalCSSarray[27] = false; this.ROcclusalCSSarray[27] = false; this.RLingualCSSarray[27] = false; this.RMesialCSSarray[27] = false;
        this.CBuccalCSSarray[27] = false; this.CDistalCSSarray[27] = false; this.COcclusalCSSarray[27] = false; this.CLingualCSSarray[27] = false; this.CMesialCSSarray[27] = false;
        this.PBuccalCSSarray[27] = false; this.PDistalCSSarray[27] = false; this.POcclusalCSSarray[27] = false; this.PLingualCSSarray[27] = false; this.PMesialCSSarray[27] = false;
        this.PVeneerCSSArray[27] = false;
        this.POnlayCSSArray[27] = false;
        this.PCrownCSSArray[27] = false;
        this.AcrylicCssArray[27] = false;
        this.ChromeCobaltCssArray[27] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 27);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth28') {
      if (this.teeth28 === false) {
        this.teeth28 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[28] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[28] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[28] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[28] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[28] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[28] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[28] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[28] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[28] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[28] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[28] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[28] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[28] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[28] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[28] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[28] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[28] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[28] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[28] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[28] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[28] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[28] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[28] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[28] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth28 = false;
        this.BoneRegenerationCSSArray[28] = false;
        this.RootCanalTreatmentCSSArray[28] = false;
        this.apicectomyCssArray[28] = false;
        this.RBuccalCSSarray[28] = false; this.RDistalCSSarray[28] = false; this.ROcclusalCSSarray[28] = false; this.RLingualCSSarray[28] = false; this.RMesialCSSarray[28] = false;
        this.CBuccalCSSarray[28] = false; this.CDistalCSSarray[28] = false; this.COcclusalCSSarray[28] = false; this.CLingualCSSarray[28] = false; this.CMesialCSSarray[28] = false;
        this.PBuccalCSSarray[28] = false; this.PDistalCSSarray[28] = false; this.POcclusalCSSarray[28] = false; this.PLingualCSSarray[28] = false; this.PMesialCSSarray[28] = false;
        this.PVeneerCSSArray[28] = false;
        this.POnlayCSSArray[28] = false;
        this.PCrownCSSArray[28] = false;
        this.AcrylicCssArray[28] = false;
        this.ChromeCobaltCssArray[28] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 28);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth48') {
      if (this.teeth48 === false) {
        this.teeth48 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[48] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[48] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[48] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[48] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[48] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[48] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[48] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[48] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[48] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[48] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[48] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[48] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[48] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[48] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[48] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[48] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[48] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[48] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[48] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[48] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[48] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[48] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[48] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[48] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth48 = false;
        this.BoneRegenerationCSSArray[48] = false;
        this.RootCanalTreatmentCSSArray[48] = false;
        this.apicectomyCssArray[48] = false;
        this.RBuccalCSSarray[48] = false; this.RDistalCSSarray[48] = false; this.ROcclusalCSSarray[48] = false; this.RLingualCSSarray[48] = false; this.RMesialCSSarray[48] = false;
        this.CBuccalCSSarray[48] = false; this.CDistalCSSarray[48] = false; this.COcclusalCSSarray[48] = false; this.CLingualCSSarray[48] = false; this.CMesialCSSarray[48] = false;
        this.PBuccalCSSarray[48] = false; this.PDistalCSSarray[48] = false; this.POcclusalCSSarray[48] = false; this.PLingualCSSarray[48] = false; this.PMesialCSSarray[48] = false;
        this.PVeneerCSSArray[48] = false;
        this.POnlayCSSArray[48] = false;
        this.PCrownCSSArray[48] = false;
        this.AcrylicCssArray[48] = false;
        this.ChromeCobaltCssArray[48] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 48);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth47') {
      if (this.teeth47 === false) {
        this.teeth47 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[47] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[47] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[47] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[47] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[47] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[47] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[47] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[47] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[47] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[47] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[47] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[47] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[47] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[47] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[47] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[47] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[47] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[47] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[47] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[47] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[47] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[47] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[47] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[47] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth47 = false;
        this.BoneRegenerationCSSArray[47] = false;
        this.RootCanalTreatmentCSSArray[47] = false;
        this.apicectomyCssArray[47] = false;
        this.RBuccalCSSarray[47] = false; this.RDistalCSSarray[47] = false; this.ROcclusalCSSarray[47] = false; this.RLingualCSSarray[47] = false; this.RMesialCSSarray[47] = false;
        this.CBuccalCSSarray[47] = false; this.CDistalCSSarray[47] = false; this.COcclusalCSSarray[47] = false; this.CLingualCSSarray[47] = false; this.CMesialCSSarray[47] = false;
        this.PBuccalCSSarray[47] = false; this.PDistalCSSarray[47] = false; this.POcclusalCSSarray[47] = false; this.PLingualCSSarray[47] = false; this.PMesialCSSarray[47] = false;
        this.PVeneerCSSArray[47] = false;
        this.POnlayCSSArray[47] = false;
        this.PCrownCSSArray[47] = false;
        this.AcrylicCssArray[47] = false;
        this.ChromeCobaltCssArray[47] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 47);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth46') {
      if (this.teeth46 === false) {
        this.teeth46 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[46] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[46] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[46] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[46] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[46] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[46] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[46] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[46] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[46] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[46] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[46] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[46] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[46] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[46] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[46] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[46] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[46] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[46] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[46] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[46] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[46] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[46] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[46] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[46] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth46 = false;
        this.BoneRegenerationCSSArray[46] = false;
        this.RootCanalTreatmentCSSArray[46] = false;
        this.apicectomyCssArray[46] = false;
        this.RBuccalCSSarray[46] = false; this.RDistalCSSarray[46] = false; this.ROcclusalCSSarray[46] = false; this.RLingualCSSarray[46] = false; this.RMesialCSSarray[46] = false;
        this.CBuccalCSSarray[46] = false; this.CDistalCSSarray[46] = false; this.COcclusalCSSarray[46] = false; this.CLingualCSSarray[46] = false; this.CMesialCSSarray[46] = false;
        this.PBuccalCSSarray[46] = false; this.PDistalCSSarray[46] = false; this.POcclusalCSSarray[46] = false; this.PLingualCSSarray[46] = false; this.PMesialCSSarray[46] = false;
        this.PVeneerCSSArray[46] = false;
        this.POnlayCSSArray[46] = false;
        this.PCrownCSSArray[46] = false;
        this.AcrylicCssArray[46] = false;
        this.ChromeCobaltCssArray[46] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 46);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth45') {
      if (this.teeth45 === false) {
        this.teeth45 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[45] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[45] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[45] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[45] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[45] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[45] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[45] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[45] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[45] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[45] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[45] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[45] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[45] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[45] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[45] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[45] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[45] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[45] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[45] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[45] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[45] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[45] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[45] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[45] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth45 = false;
        this.BoneRegenerationCSSArray[45] = false;
        this.RootCanalTreatmentCSSArray[45] = false;
        this.apicectomyCssArray[45] = false;
        this.RBuccalCSSarray[45] = false; this.RDistalCSSarray[45] = false; this.ROcclusalCSSarray[45] = false; this.RLingualCSSarray[45] = false; this.RMesialCSSarray[45] = false;
        this.CBuccalCSSarray[45] = false; this.CDistalCSSarray[45] = false; this.COcclusalCSSarray[45] = false; this.CLingualCSSarray[45] = false; this.CMesialCSSarray[45] = false;
        this.PBuccalCSSarray[45] = false; this.PDistalCSSarray[45] = false; this.POcclusalCSSarray[45] = false; this.PLingualCSSarray[45] = false; this.PMesialCSSarray[45] = false;
        this.PVeneerCSSArray[45] = false;
        this.POnlayCSSArray[45] = false;
        this.PCrownCSSArray[45] = false;
        this.AcrylicCssArray[45] = false;
        this.ChromeCobaltCssArray[45] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 45);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth44') {
      if (this.teeth44 === false) {
        this.teeth44 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[44] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[44] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[44] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[44] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[44] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[44] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[44] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[44] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[44] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[44] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[44] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[44] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[44] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[44] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[44] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[44] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[44] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[44] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[44] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[44] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[44] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[44] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[44] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[44] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth44 = false;
        this.BoneRegenerationCSSArray[44] = false;
        this.RootCanalTreatmentCSSArray[44] = false;
        this.apicectomyCssArray[44] = false;
        this.RBuccalCSSarray[44] = false; this.RDistalCSSarray[44] = false; this.ROcclusalCSSarray[44] = false; this.RLingualCSSarray[44] = false; this.RMesialCSSarray[44] = false;
        this.CBuccalCSSarray[44] = false; this.CDistalCSSarray[44] = false; this.COcclusalCSSarray[44] = false; this.CLingualCSSarray[44] = false; this.CMesialCSSarray[44] = false;
        this.PBuccalCSSarray[44] = false; this.PDistalCSSarray[44] = false; this.POcclusalCSSarray[44] = false; this.PLingualCSSarray[44] = false; this.PMesialCSSarray[44] = false;
        this.PVeneerCSSArray[44] = false;
        this.POnlayCSSArray[44] = false;
        this.PCrownCSSArray[44] = false;
        this.AcrylicCssArray[44] = false;
        this.ChromeCobaltCssArray[44] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 44);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth43') {
      if (this.teeth43 === false) {
        this.teeth43 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[43] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[43] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[43] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[43] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[43] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[43] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[43] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[43] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[43] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[43] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[43] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[43] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[43] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[43] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[43] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[43] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[43] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[43] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[43] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[43] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[43] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[43] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[43] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[43] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth43 = false;
        this.BoneRegenerationCSSArray[43] = false;
        this.RootCanalTreatmentCSSArray[43] = false;
        this.apicectomyCssArray[43] = false;
        this.RBuccalCSSarray[43] = false; this.RDistalCSSarray[43] = false; this.ROcclusalCSSarray[43] = false; this.RLingualCSSarray[43] = false; this.RMesialCSSarray[43] = false;
        this.CBuccalCSSarray[43] = false; this.CDistalCSSarray[43] = false; this.COcclusalCSSarray[43] = false; this.CLingualCSSarray[43] = false; this.CMesialCSSarray[43] = false;
        this.PBuccalCSSarray[43] = false; this.PDistalCSSarray[43] = false; this.POcclusalCSSarray[43] = false; this.PLingualCSSarray[43] = false; this.PMesialCSSarray[43] = false;
        this.PVeneerCSSArray[43] = false;
        this.POnlayCSSArray[43] = false;
        this.PCrownCSSArray[43] = false;
        this.AcrylicCssArray[43] = false;
        this.ChromeCobaltCssArray[43] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 43);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth42') {
      if (this.teeth42 === false) {
        this.teeth42 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[42] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[42] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[42] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[42] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[42] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[42] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[42] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[42] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[42] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[42] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[42] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[42] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[42] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[42] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[42] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[42] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[42] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[42] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[42] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[42] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[42] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[42] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[42] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[42] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth42 = false;
        this.BoneRegenerationCSSArray[42] = false;
        this.RootCanalTreatmentCSSArray[42] = false;
        this.apicectomyCssArray[42] = false;
        this.RBuccalCSSarray[42] = false; this.RDistalCSSarray[42] = false; this.ROcclusalCSSarray[42] = false; this.RLingualCSSarray[42] = false; this.RMesialCSSarray[42] = false;
        this.CBuccalCSSarray[42] = false; this.CDistalCSSarray[42] = false; this.COcclusalCSSarray[42] = false; this.CLingualCSSarray[42] = false; this.CMesialCSSarray[42] = false;
        this.PBuccalCSSarray[42] = false; this.PDistalCSSarray[42] = false; this.POcclusalCSSarray[42] = false; this.PLingualCSSarray[42] = false; this.PMesialCSSarray[42] = false;
        this.PVeneerCSSArray[42] = false;
        this.POnlayCSSArray[42] = false;
        this.PCrownCSSArray[42] = false;
        this.AcrylicCssArray[42] = false;
        this.ChromeCobaltCssArray[42] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 42);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth41') {
      if (this.teeth41 === false) {
        this.teeth41 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[41] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[41] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[41] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[41] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[41] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[41] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[41] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[41] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[41] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[41] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[41] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[41] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[41] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[41] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[41] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[41] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[41] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[41] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[41] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[41] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[41] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[41] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[41] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[41] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth41 = false;
        this.BoneRegenerationCSSArray[41] = false;
        this.RootCanalTreatmentCSSArray[41] = false;
        this.apicectomyCssArray[41] = false;
        this.RBuccalCSSarray[41] = false; this.RDistalCSSarray[41] = false; this.ROcclusalCSSarray[41] = false; this.RLingualCSSarray[41] = false; this.RMesialCSSarray[41] = false;
        this.CBuccalCSSarray[41] = false; this.CDistalCSSarray[41] = false; this.COcclusalCSSarray[41] = false; this.CLingualCSSarray[41] = false; this.CMesialCSSarray[41] = false;
        this.PBuccalCSSarray[41] = false; this.PDistalCSSarray[41] = false; this.POcclusalCSSarray[41] = false; this.PLingualCSSarray[41] = false; this.PMesialCSSarray[41] = false;
        this.PVeneerCSSArray[41] = false;
        this.POnlayCSSArray[41] = false;
        this.PCrownCSSArray[41] = false;
        this.AcrylicCssArray[41] = false;
        this.ChromeCobaltCssArray[41] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 41);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth31') {
      if (this.teeth31 === false) {
        this.teeth31 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[31] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[31] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[31] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[31] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[31] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[31] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[31] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[31] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[31] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[31] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[31] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[31] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[31] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[31] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[31] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[31] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[31] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[31] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[31] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[31] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[31] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[31] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[31] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[31] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth31 = false;
        this.BoneRegenerationCSSArray[31] = false;
        this.RootCanalTreatmentCSSArray[31] = false;
        this.apicectomyCssArray[31] = false;
        this.RBuccalCSSarray[31] = false; this.RDistalCSSarray[31] = false; this.ROcclusalCSSarray[31] = false; this.RLingualCSSarray[31] = false; this.RMesialCSSarray[31] = false;
        this.CBuccalCSSarray[31] = false; this.CDistalCSSarray[31] = false; this.COcclusalCSSarray[31] = false; this.CLingualCSSarray[31] = false; this.CMesialCSSarray[31] = false;
        this.PBuccalCSSarray[31] = false; this.PDistalCSSarray[31] = false; this.POcclusalCSSarray[31] = false; this.PLingualCSSarray[31] = false; this.PMesialCSSarray[31] = false;
        this.PVeneerCSSArray[31] = false;
        this.POnlayCSSArray[31] = false;
        this.PCrownCSSArray[31] = false;
        this.AcrylicCssArray[31] = false;
        this.ChromeCobaltCssArray[31] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 31);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth32') {
      if (this.teeth32 === false) {
        this.teeth32 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[32] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[32] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[32] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[32] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[32] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[32] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[32] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[32] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[32] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[32] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[32] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[32] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[32] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[32] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[32] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[32] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[32] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[32] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[32] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[32] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[32] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[32] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[32] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[32] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth32 = false;
        this.BoneRegenerationCSSArray[32] = false;
        this.RootCanalTreatmentCSSArray[32] = false;
        this.apicectomyCssArray[32] = false;
        this.RBuccalCSSarray[32] = false; this.RDistalCSSarray[32] = false; this.ROcclusalCSSarray[32] = false; this.RLingualCSSarray[32] = false; this.RMesialCSSarray[32] = false;
        this.CBuccalCSSarray[32] = false; this.CDistalCSSarray[32] = false; this.COcclusalCSSarray[32] = false; this.CLingualCSSarray[32] = false; this.CMesialCSSarray[32] = false;
        this.PBuccalCSSarray[32] = false; this.PDistalCSSarray[32] = false; this.POcclusalCSSarray[32] = false; this.PLingualCSSarray[32] = false; this.PMesialCSSarray[32] = false;
        this.PVeneerCSSArray[32] = false;
        this.POnlayCSSArray[32] = false;
        this.PCrownCSSArray[32] = false;
        this.AcrylicCssArray[32] = false;
        this.ChromeCobaltCssArray[32] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 32);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth33') {
      if (this.teeth33 === false) {
        this.teeth33 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[33] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[33] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[33] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[33] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[33] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[33] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[33] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[33] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[33] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[33] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[33] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[33] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[33] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[33] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[33] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[33] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[33] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[33] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[33] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[33] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[33] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[33] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[33] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[33] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth33 = false;
        this.BoneRegenerationCSSArray[33] = false;
        this.RootCanalTreatmentCSSArray[33] = false;
        this.apicectomyCssArray[33] = false;
        this.RBuccalCSSarray[33] = false; this.RDistalCSSarray[33] = false; this.ROcclusalCSSarray[33] = false; this.RLingualCSSarray[33] = false; this.RMesialCSSarray[33] = false;
        this.CBuccalCSSarray[33] = false; this.CDistalCSSarray[33] = false; this.COcclusalCSSarray[33] = false; this.CLingualCSSarray[33] = false; this.CMesialCSSarray[33] = false;
        this.PBuccalCSSarray[33] = false; this.PDistalCSSarray[33] = false; this.POcclusalCSSarray[33] = false; this.PLingualCSSarray[33] = false; this.PMesialCSSarray[33] = false;
        this.PVeneerCSSArray[33] = false;
        this.POnlayCSSArray[33] = false;
        this.PCrownCSSArray[33] = false;
        this.AcrylicCssArray[33] = false;
        this.ChromeCobaltCssArray[33] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 33);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth34') {
      if (this.teeth34 === false) {
        this.teeth34 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[34] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[34] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[34] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[34] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[34] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[34] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[34] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[34] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[34] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[34] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[34] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[34] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[34] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[34] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[34] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[34] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[34] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[34] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[34] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[34] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[34] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[34] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[34] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[34] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth34 = false;
        this.BoneRegenerationCSSArray[34] = false;
        this.RootCanalTreatmentCSSArray[34] = false;
        this.apicectomyCssArray[34] = false;
        this.RBuccalCSSarray[34] = false; this.RDistalCSSarray[34] = false; this.ROcclusalCSSarray[34] = false; this.RLingualCSSarray[34] = false; this.RMesialCSSarray[34] = false;
        this.CBuccalCSSarray[34] = false; this.CDistalCSSarray[34] = false; this.COcclusalCSSarray[34] = false; this.CLingualCSSarray[34] = false; this.CMesialCSSarray[34] = false;
        this.PBuccalCSSarray[34] = false; this.PDistalCSSarray[34] = false; this.POcclusalCSSarray[34] = false; this.PLingualCSSarray[34] = false; this.PMesialCSSarray[34] = false;
        this.PVeneerCSSArray[34] = false;
        this.POnlayCSSArray[34] = false;
        this.PCrownCSSArray[34] = false;
        this.AcrylicCssArray[34] = false;
        this.ChromeCobaltCssArray[34] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 34);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth35') {
      if (this.teeth35 === false) {
        this.teeth35 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[35] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[35] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[35] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[35] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[35] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[35] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[35] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[35] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[35] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[35] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[35] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[35] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[35] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[35] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[35] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[35] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[35] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[35] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[35] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[35] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[35] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[35] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[35] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[35] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth35 = false;
        this.BoneRegenerationCSSArray[35] = false;
        this.RootCanalTreatmentCSSArray[35] = false;
        this.apicectomyCssArray[35] = false;
        this.RBuccalCSSarray[35] = false; this.RDistalCSSarray[35] = false; this.ROcclusalCSSarray[35] = false; this.RLingualCSSarray[35] = false; this.RMesialCSSarray[35] = false;
        this.CBuccalCSSarray[35] = false; this.CDistalCSSarray[35] = false; this.COcclusalCSSarray[35] = false; this.CLingualCSSarray[35] = false; this.CMesialCSSarray[35] = false;
        this.PBuccalCSSarray[35] = false; this.PDistalCSSarray[35] = false; this.POcclusalCSSarray[35] = false; this.PLingualCSSarray[35] = false; this.PMesialCSSarray[35] = false;
        this.PVeneerCSSArray[35] = false;
        this.POnlayCSSArray[35] = false;
        this.PCrownCSSArray[35] = false;
        this.AcrylicCssArray[35] = false;
        this.ChromeCobaltCssArray[35] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 35);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth36') {
      if (this.teeth36 === false) {
        this.teeth36 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[36] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[36] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[36] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[36] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[36] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[36] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[36] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[36] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[36] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[36] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[36] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[36] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[36] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[36] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[36] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[36] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[36] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[36] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[36] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[36] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[36] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[36] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[36] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[36] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth36 = false;
        this.BoneRegenerationCSSArray[36] = false;
        this.RootCanalTreatmentCSSArray[36] = false;
        this.apicectomyCssArray[36] = false;
        this.RBuccalCSSarray[36] = false; this.RDistalCSSarray[36] = false; this.ROcclusalCSSarray[36] = false; this.RLingualCSSarray[36] = false; this.RMesialCSSarray[36] = false;
        this.CBuccalCSSarray[36] = false; this.CDistalCSSarray[36] = false; this.COcclusalCSSarray[36] = false; this.CLingualCSSarray[36] = false; this.CMesialCSSarray[36] = false;
        this.PBuccalCSSarray[36] = false; this.PDistalCSSarray[36] = false; this.POcclusalCSSarray[36] = false; this.PLingualCSSarray[36] = false; this.PMesialCSSarray[36] = false;
        this.PVeneerCSSArray[36] = false;
        this.POnlayCSSArray[36] = false;
        this.PCrownCSSArray[36] = false;
        this.AcrylicCssArray[36] = false;
        this.ChromeCobaltCssArray[36] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 36);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth37') {
      if (this.teeth37 === false) {
        this.teeth37 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[37] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[37] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[37] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[37] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[37] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[37] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[37] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[37] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[37] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[37] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[37] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[37] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[37] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[37] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[37] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[37] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[37] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[37] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[37] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[37] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[37] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[37] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[37] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[37] = true; }

        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth37 = false;
        this.BoneRegenerationCSSArray[37] = false;
        this.RootCanalTreatmentCSSArray[37] = false;
        this.apicectomyCssArray[37] = false;
        this.RBuccalCSSarray[37] = false; this.RDistalCSSarray[37] = false; this.ROcclusalCSSarray[37] = false; this.RLingualCSSarray[37] = false; this.RMesialCSSarray[37] = false;
        this.CBuccalCSSarray[37] = false; this.CDistalCSSarray[37] = false; this.COcclusalCSSarray[37] = false; this.CLingualCSSarray[37] = false; this.CMesialCSSarray[37] = false;
        this.PBuccalCSSarray[37] = false; this.PDistalCSSarray[37] = false; this.POcclusalCSSarray[37] = false; this.PLingualCSSarray[37] = false; this.PMesialCSSarray[37] = false;
        this.PVeneerCSSArray[37] = false;
        this.POnlayCSSArray[37] = false;
        this.PCrownCSSArray[37] = false;
        this.AcrylicCssArray[37] = false;
        this.ChromeCobaltCssArray[37] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 37);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    if (mode === 'tooth38') {
      if (this.teeth38 === false) {
        this.teeth38 = true;
        if (this.BoneRegeneration === true) { this.BoneRegenerationCSSArray[38] = true; }
        if (this.rootCanalTreatment === true) { this.RootCanalTreatmentCSSArray[38] = true; }
        if (this.apicectomy === true) { this.apicectomyCssArray[38] = true; }
        if (this.Implant === true) { this.ImplantCSSArray[38] = true; }
        if (this.RMesial === true) { this.RMesialCSSarray[38] = true; }
        if (this.RDistal === true) { this.RDistalCSSarray[38] = true; }
        if (this.RLingual === true) { this.RLingualCSSarray[38] = true; }
        if (this.ROcclusal === true) { this.ROcclusalCSSarray[38] = true; }
        if (this.RBuccal === true) { this.RBuccalCSSarray[38] = true; }

        if (this.CMesial === true) { this.CMesialCSSarray[38] = true; }
        if (this.CDistal === true) { this.CDistalCSSarray[38] = true; }
        if (this.CLingual === true) { this.CLingualCSSarray[38] = true; }
        if (this.COcclusal === true) { this.COcclusalCSSarray[38] = true; }
        if (this.CBuccal === true) { this.CBuccalCSSarray[38] = true; }

        if (this.PMesial === true) { this.PMesialCSSarray[38] = true; }
        if (this.PDistal === true) { this.PDistalCSSarray[38] = true; }
        if (this.PLingual === true) { this.PLingualCSSarray[38] = true; }
        if (this.POcclusal === true) { this.POcclusalCSSarray[38] = true; }
        if (this.PBuccal === true) { this.PBuccalCSSarray[38] = true; }

        if (this.PVeneer === true) { this.PVeneerCSSArray[38] = true; }
        if (this.POnlay === true) { this.POnlayCSSArray[38] = true; }
        if (this.PCrown === true) { this.PCrownCSSArray[38] = true; }

        if (this.Acrylic === true) { this.AcrylicCssArray[38] = true; }
        if (this.ChromeCobalt === true) { this.ChromeCobaltCssArray[38] = true; }



        this.selectedTeethValue.push(teethValue);

      } else {
        this.teeth38 = false;
        this.BoneRegenerationCSSArray[38] = false;
        this.RootCanalTreatmentCSSArray[38] = false;
        this.apicectomyCssArray[38] = false;
        this.RBuccalCSSarray[38] = false; this.RDistalCSSarray[38] = false; this.ROcclusalCSSarray[38] = false; this.RLingualCSSarray[38] = false; this.RMesialCSSarray[38] = false;
        this.CBuccalCSSarray[38] = false; this.CDistalCSSarray[38] = false; this.COcclusalCSSarray[38] = false; this.CLingualCSSarray[38] = false; this.CMesialCSSarray[38] = false;
        this.PBuccalCSSarray[38] = false; this.PDistalCSSarray[38] = false; this.POcclusalCSSarray[38] = false; this.PLingualCSSarray[38] = false; this.PMesialCSSarray[38] = false;
        this.PVeneerCSSArray[38] = false;
        this.POnlayCSSArray[38] = false;
        this.PCrownCSSArray[38] = false;
        this.AcrylicCssArray[38] = false;
        this.ChromeCobaltCssArray[38] = false;
        const found = this.selectedTeethValue.findIndex(element => element === 38);
        this.selectedTeethValue.splice(found, 1);
      }
    }
    this.selectedTeethValueString = this.selectedTeethValue.join();
  }



  //  multiselection
  multiSelectTeeth(id) {
    if (id === '1') {
      if (this.teeth18 === false && this.teeth17 === false && this.teeth16 === false && this.teeth15 === false &&
        this.teeth14 === false && this.teeth13 === false && this.teeth12 === false && this.teeth11 === false) {
        this.teeth18 = true; this.teeth17 = true; this.teeth16 = true; this.teeth15 = true; this.teeth14 = true; this.teeth13 = true;
        this.teeth12 = true; this.teeth11 = true;
        if (this.BoneRegeneration === true) {
          this.BoneRegenerationCSSArray[18] = true;
          this.BoneRegenerationCSSArray[17] = true;
          this.BoneRegenerationCSSArray[16] = true;
          this.BoneRegenerationCSSArray[15] = true;
          this.BoneRegenerationCSSArray[14] = true;
          this.BoneRegenerationCSSArray[13] = true;
          this.BoneRegenerationCSSArray[12] = true;
          this.BoneRegenerationCSSArray[11] = true;
        }
        if (this.rootCanalTreatment === true) {
          this.RootCanalTreatmentCSSArray[18] = true;
          this.RootCanalTreatmentCSSArray[17] = true;
          this.RootCanalTreatmentCSSArray[16] = true;
          this.RootCanalTreatmentCSSArray[15] = true;
          this.RootCanalTreatmentCSSArray[14] = true;
          this.RootCanalTreatmentCSSArray[13] = true;
          this.RootCanalTreatmentCSSArray[12] = true;
          this.RootCanalTreatmentCSSArray[11] = true;
        }
        if (this.apicectomy === true) {
          this.apicectomyCssArray[18] = true;
          this.apicectomyCssArray[17] = true;
          this.apicectomyCssArray[16] = true;
          this.apicectomyCssArray[15] = true;
          this.apicectomyCssArray[14] = true;
          this.apicectomyCssArray[13] = true;
          this.apicectomyCssArray[12] = true;
          this.apicectomyCssArray[11] = true;
        }
        if (this.Implant === true) {
          this.ImplantCSSArray[18] = true;
          this.ImplantCSSArray[17] = true;
          this.ImplantCSSArray[16] = true;
          this.ImplantCSSArray[15] = true;
          this.ImplantCSSArray[14] = true;
          this.ImplantCSSArray[13] = true;
          this.ImplantCSSArray[12] = true;
          this.ImplantCSSArray[11] = true;

        }
        if (this.RMesial === true) {
          this.RMesialCSSarray[18] = true;
          this.RMesialCSSarray[17] = true;
          this.RMesialCSSarray[16] = true;
          this.RMesialCSSarray[15] = true;
          this.RMesialCSSarray[14] = true;
          this.RMesialCSSarray[13] = true;
          this.RMesialCSSarray[12] = true;
          this.RMesialCSSarray[11] = true;

        }
        if (this.RDistal === true) {
          this.RDistalCSSarray[18] = true;
          this.RDistalCSSarray[17] = true;
          this.RDistalCSSarray[16] = true;
          this.RDistalCSSarray[15] = true;
          this.RDistalCSSarray[14] = true;
          this.RDistalCSSarray[13] = true;
          this.RDistalCSSarray[12] = true;
          this.RDistalCSSarray[11] = true;

        }
        if (this.RLingual === true) {
          this.RLingualCSSarray[18] = true;
          this.RLingualCSSarray[17] = true;
          this.RLingualCSSarray[16] = true;
          this.RLingualCSSarray[15] = true;
          this.RLingualCSSarray[14] = true;
          this.RLingualCSSarray[13] = true;
          this.RLingualCSSarray[12] = true;
          this.RLingualCSSarray[11] = true;

        }
        if (this.ROcclusal === true) {
          this.ROcclusalCSSarray[18] = true;
          this.ROcclusalCSSarray[17] = true;
          this.ROcclusalCSSarray[16] = true;
          this.ROcclusalCSSarray[15] = true;
          this.ROcclusalCSSarray[14] = true;
          this.ROcclusalCSSarray[13] = true;
          this.ROcclusalCSSarray[12] = true;
          this.ROcclusalCSSarray[11] = true;

        }
        if (this.RBuccal === true) {
          this.RBuccalCSSarray[18] = true;
          this.RBuccalCSSarray[17] = true;
          this.RBuccalCSSarray[16] = true;
          this.RBuccalCSSarray[15] = true;
          this.RBuccalCSSarray[14] = true;
          this.RBuccalCSSarray[13] = true;
          this.RBuccalCSSarray[12] = true;
          this.RBuccalCSSarray[11] = true;

        }

        if (this.CMesial === true) {
          this.CMesialCSSarray[18] = true;
          this.CMesialCSSarray[17] = true;
          this.CMesialCSSarray[16] = true;
          this.CMesialCSSarray[15] = true;
          this.CMesialCSSarray[14] = true;
          this.CMesialCSSarray[13] = true;
          this.CMesialCSSarray[12] = true;
          this.CMesialCSSarray[11] = true;

        }
        if (this.CDistal === true) {
          this.CDistalCSSarray[18] = true;
          this.CDistalCSSarray[17] = true;
          this.CDistalCSSarray[16] = true;
          this.CDistalCSSarray[15] = true;
          this.CDistalCSSarray[14] = true;
          this.CDistalCSSarray[13] = true;
          this.CDistalCSSarray[12] = true;
          this.CDistalCSSarray[11] = true;

        }
        if (this.CLingual === true) {
          this.CLingualCSSarray[18] = true;
          this.CLingualCSSarray[17] = true;
          this.CLingualCSSarray[16] = true;
          this.CLingualCSSarray[15] = true;
          this.CLingualCSSarray[14] = true;
          this.CLingualCSSarray[13] = true;
          this.CLingualCSSarray[12] = true;
          this.CLingualCSSarray[11] = true;

        }
        if (this.COcclusal === true) {
          this.COcclusalCSSarray[18] = true;
          this.COcclusalCSSarray[17] = true;
          this.COcclusalCSSarray[16] = true;
          this.COcclusalCSSarray[15] = true;
          this.COcclusalCSSarray[14] = true;
          this.COcclusalCSSarray[13] = true;
          this.COcclusalCSSarray[12] = true;
          this.COcclusalCSSarray[11] = true;

        }
        if (this.CBuccal === true) {
          this.CBuccalCSSarray[18] = true;
          this.CBuccalCSSarray[17] = true;
          this.CBuccalCSSarray[16] = true;
          this.CBuccalCSSarray[15] = true;
          this.CBuccalCSSarray[14] = true;
          this.CBuccalCSSarray[13] = true;
          this.CBuccalCSSarray[12] = true;
          this.CBuccalCSSarray[11] = true;

        }

        if (this.PMesial === true) {
          this.PMesialCSSarray[18] = true;
          this.PMesialCSSarray[17] = true;
          this.PMesialCSSarray[16] = true;
          this.PMesialCSSarray[15] = true;
          this.PMesialCSSarray[14] = true;
          this.PMesialCSSarray[13] = true;
          this.PMesialCSSarray[12] = true;
          this.PMesialCSSarray[11] = true;

        }
        if (this.PDistal === true) {
          this.PDistalCSSarray[18] = true;
          this.PDistalCSSarray[17] = true;
          this.PDistalCSSarray[16] = true;
          this.PDistalCSSarray[15] = true;
          this.PDistalCSSarray[14] = true;
          this.PDistalCSSarray[13] = true;
          this.PDistalCSSarray[12] = true;
          this.PDistalCSSarray[11] = true;

        }
        if (this.PLingual === true) {
          this.PLingualCSSarray[18] = true;
          this.PLingualCSSarray[17] = true;
          this.PLingualCSSarray[16] = true;
          this.PLingualCSSarray[15] = true;
          this.PLingualCSSarray[14] = true;
          this.PLingualCSSarray[13] = true;
          this.PLingualCSSarray[12] = true;
          this.PLingualCSSarray[11] = true;

        }
        if (this.POcclusal === true) {
          this.POcclusalCSSarray[18] = true;
          this.POcclusalCSSarray[17] = true;
          this.POcclusalCSSarray[16] = true;
          this.POcclusalCSSarray[15] = true;
          this.POcclusalCSSarray[14] = true;
          this.POcclusalCSSarray[13] = true;
          this.POcclusalCSSarray[12] = true;
          this.POcclusalCSSarray[11] = true;

        }
        if (this.PBuccal === true) {
          this.PBuccalCSSarray[18] = true;
          this.PBuccalCSSarray[17] = true;
          this.PBuccalCSSarray[16] = true;
          this.PBuccalCSSarray[15] = true;
          this.PBuccalCSSarray[14] = true;
          this.PBuccalCSSarray[13] = true;
          this.PBuccalCSSarray[12] = true;
          this.PBuccalCSSarray[11] = true;

        }

        if (this.PVeneer === true) {
          this.PVeneerCSSArray[18] = true;
          this.PVeneerCSSArray[17] = true;
          this.PVeneerCSSArray[16] = true;
          this.PVeneerCSSArray[15] = true;
          this.PVeneerCSSArray[14] = true;
          this.PVeneerCSSArray[13] = true;
          this.PVeneerCSSArray[12] = true;
          this.PVeneerCSSArray[11] = true;

        }
        if (this.POnlay === true) {
          this.POnlayCSSArray[18] = true;
          this.POnlayCSSArray[17] = true;
          this.POnlayCSSArray[16] = true;
          this.POnlayCSSArray[15] = true;
          this.POnlayCSSArray[14] = true;
          this.POnlayCSSArray[13] = true;
          this.POnlayCSSArray[12] = true;
          this.POnlayCSSArray[11] = true;

        }
        if (this.PCrown === true) {
          this.PCrownCSSArray[18] = true;
          this.PCrownCSSArray[17] = true;
          this.PCrownCSSArray[16] = true;
          this.PCrownCSSArray[15] = true;
          this.PCrownCSSArray[14] = true;
          this.PCrownCSSArray[13] = true;
          this.PCrownCSSArray[12] = true;
          this.PCrownCSSArray[11] = true;

        }

        if (this.Acrylic === true) {
          this.AcrylicCssArray[18] = true;
          this.AcrylicCssArray[17] = true;
          this.AcrylicCssArray[16] = true;
          this.AcrylicCssArray[15] = true;
          this.AcrylicCssArray[14] = true;
          this.AcrylicCssArray[13] = true;
          this.AcrylicCssArray[12] = true;
          this.AcrylicCssArray[11] = true;

        }
        if (this.ChromeCobalt === true) {
          this.ChromeCobaltCssArray[18] = true;
          this.ChromeCobaltCssArray[17] = true;
          this.ChromeCobaltCssArray[16] = true;
          this.ChromeCobaltCssArray[15] = true;
          this.ChromeCobaltCssArray[14] = true;
          this.ChromeCobaltCssArray[13] = true;
          this.ChromeCobaltCssArray[12] = true;
          this.ChromeCobaltCssArray[11] = true;

        }
        this.selectedTeethValue.push(18, 17, 16, 15, 14, 13, 12, 11);

      } else {
        this.teeth18 = false; this.teeth17 = false; this.teeth16 = false; this.teeth15 = false;
        this.teeth14 = false; this.teeth13 = false; this.teeth12 = false; this.teeth11 = false;
        const found18 = this.selectedTeethValue.findIndex(element => element === 18);

        this.BoneRegenerationCSSArray[18] = false;
        this.BoneRegenerationCSSArray[17] = false;
        this.BoneRegenerationCSSArray[16] = false;
        this.BoneRegenerationCSSArray[15] = false;
        this.BoneRegenerationCSSArray[14] = false;
        this.BoneRegenerationCSSArray[13] = false;
        this.BoneRegenerationCSSArray[12] = false;
        this.BoneRegenerationCSSArray[11] = false;

        this.RootCanalTreatmentCSSArray[18] = false;
        this.RootCanalTreatmentCSSArray[17] = false;
        this.RootCanalTreatmentCSSArray[16] = false;
        this.RootCanalTreatmentCSSArray[15] = false;
        this.RootCanalTreatmentCSSArray[14] = false;
        this.RootCanalTreatmentCSSArray[13] = false;
        this.RootCanalTreatmentCSSArray[12] = false;
        this.RootCanalTreatmentCSSArray[11] = false;

        this.apicectomyCssArray[18] = false;
        this.apicectomyCssArray[17] = false;
        this.apicectomyCssArray[16] = false;
        this.apicectomyCssArray[15] = false;
        this.apicectomyCssArray[14] = false;
        this.apicectomyCssArray[13] = false;
        this.apicectomyCssArray[12] = false;
        this.apicectomyCssArray[11] = false;

        this.ImplantCSSArray[18] = false;
        this.ImplantCSSArray[17] = false;
        this.ImplantCSSArray[16] = false;
        this.ImplantCSSArray[15] = false;
        this.ImplantCSSArray[14] = false;
        this.ImplantCSSArray[13] = false;
        this.ImplantCSSArray[12] = false;
        this.ImplantCSSArray[11] = false;

        this.RMesialCSSarray[18] = false;
        this.RMesialCSSarray[17] = false;
        this.RMesialCSSarray[16] = false;
        this.RMesialCSSarray[15] = false;
        this.RMesialCSSarray[14] = false;
        this.RMesialCSSarray[13] = false;
        this.RMesialCSSarray[12] = false;
        this.RMesialCSSarray[11] = false;

        this.RDistalCSSarray[18] = false;
        this.RDistalCSSarray[17] = false;
        this.RDistalCSSarray[16] = false;
        this.RDistalCSSarray[15] = false;
        this.RDistalCSSarray[14] = false;
        this.RDistalCSSarray[13] = false;
        this.RDistalCSSarray[12] = false;
        this.RDistalCSSarray[11] = false;

        this.RLingualCSSarray[18] = false;
        this.RLingualCSSarray[17] = false;
        this.RLingualCSSarray[16] = false;
        this.RLingualCSSarray[15] = false;
        this.RLingualCSSarray[14] = false;
        this.RLingualCSSarray[13] = false;
        this.RLingualCSSarray[12] = false;
        this.RLingualCSSarray[11] = false;

        this.ROcclusalCSSarray[18] = false;
        this.ROcclusalCSSarray[17] = false;
        this.ROcclusalCSSarray[16] = false;
        this.ROcclusalCSSarray[15] = false;
        this.ROcclusalCSSarray[14] = false;
        this.ROcclusalCSSarray[13] = false;
        this.ROcclusalCSSarray[12] = false;
        this.ROcclusalCSSarray[11] = false;

        this.RBuccalCSSarray[18] = false;
        this.RBuccalCSSarray[17] = false;
        this.RBuccalCSSarray[16] = false;
        this.RBuccalCSSarray[15] = false;
        this.RBuccalCSSarray[14] = false;
        this.RBuccalCSSarray[13] = false;
        this.RBuccalCSSarray[12] = false;
        this.RBuccalCSSarray[11] = false;

        this.CMesialCSSarray[18] = false;
        this.CMesialCSSarray[17] = false;
        this.CMesialCSSarray[16] = false;
        this.CMesialCSSarray[15] = false;
        this.CMesialCSSarray[14] = false;
        this.CMesialCSSarray[13] = false;
        this.CMesialCSSarray[12] = false;
        this.CMesialCSSarray[11] = false;

        this.CDistalCSSarray[18] = false;
        this.CDistalCSSarray[17] = false;
        this.CDistalCSSarray[16] = false;
        this.CDistalCSSarray[15] = false;
        this.CDistalCSSarray[14] = false;
        this.CDistalCSSarray[13] = false;
        this.CDistalCSSarray[12] = false;
        this.CDistalCSSarray[11] = false;

        this.CLingualCSSarray[18] = false;
        this.CLingualCSSarray[17] = false;
        this.CLingualCSSarray[16] = false;
        this.CLingualCSSarray[15] = false;
        this.CLingualCSSarray[14] = false;
        this.CLingualCSSarray[13] = false;
        this.CLingualCSSarray[12] = false;
        this.CLingualCSSarray[11] = false;

        this.COcclusalCSSarray[18] = false;
        this.COcclusalCSSarray[17] = false;
        this.COcclusalCSSarray[16] = false;
        this.COcclusalCSSarray[15] = false;
        this.COcclusalCSSarray[14] = false;
        this.COcclusalCSSarray[13] = false;
        this.COcclusalCSSarray[12] = false;
        this.COcclusalCSSarray[11] = false;

        this.CBuccalCSSarray[18] = false;
        this.CBuccalCSSarray[17] = false;
        this.CBuccalCSSarray[16] = false;
        this.CBuccalCSSarray[15] = false;
        this.CBuccalCSSarray[14] = false;
        this.CBuccalCSSarray[13] = false;
        this.CBuccalCSSarray[12] = false;
        this.CBuccalCSSarray[11] = false;


        this.PMesialCSSarray[18] = false;
        this.PMesialCSSarray[17] = false;
        this.PMesialCSSarray[16] = false;
        this.PMesialCSSarray[15] = false;
        this.PMesialCSSarray[14] = false;
        this.PMesialCSSarray[13] = false;
        this.PMesialCSSarray[12] = false;
        this.PMesialCSSarray[11] = false;

        this.PDistalCSSarray[18] = false;
        this.PDistalCSSarray[17] = false;
        this.PDistalCSSarray[16] = false;
        this.PDistalCSSarray[15] = false;
        this.PDistalCSSarray[14] = false;
        this.PDistalCSSarray[13] = false;
        this.PDistalCSSarray[12] = false;
        this.PDistalCSSarray[11] = false;

        this.PLingualCSSarray[18] = false;
        this.PLingualCSSarray[17] = false;
        this.PLingualCSSarray[16] = false;
        this.PLingualCSSarray[15] = false;
        this.PLingualCSSarray[14] = false;
        this.PLingualCSSarray[13] = false;
        this.PLingualCSSarray[12] = false;
        this.PLingualCSSarray[11] = false;

        this.POcclusalCSSarray[18] = false;
        this.POcclusalCSSarray[17] = false;
        this.POcclusalCSSarray[16] = false;
        this.POcclusalCSSarray[15] = false;
        this.POcclusalCSSarray[14] = false;
        this.POcclusalCSSarray[13] = false;
        this.POcclusalCSSarray[12] = false;
        this.POcclusalCSSarray[11] = false;

        this.PBuccalCSSarray[18] = false;
        this.PBuccalCSSarray[17] = false;
        this.PBuccalCSSarray[16] = false;
        this.PBuccalCSSarray[15] = false;
        this.PBuccalCSSarray[14] = false;
        this.PBuccalCSSarray[13] = false;
        this.PBuccalCSSarray[12] = false;
        this.PBuccalCSSarray[11] = false;


        this.PVeneerCSSArray[18] = false;
        this.PVeneerCSSArray[17] = false;
        this.PVeneerCSSArray[16] = false;
        this.PVeneerCSSArray[15] = false;
        this.PVeneerCSSArray[14] = false;
        this.PVeneerCSSArray[13] = false;
        this.PVeneerCSSArray[12] = false;
        this.PVeneerCSSArray[11] = false;

        this.POnlayCSSArray[18] = false;
        this.POnlayCSSArray[17] = false;
        this.POnlayCSSArray[16] = false;
        this.POnlayCSSArray[15] = false;
        this.POnlayCSSArray[14] = false;
        this.POnlayCSSArray[13] = false;
        this.POnlayCSSArray[12] = false;
        this.POnlayCSSArray[11] = false;

        this.PCrownCSSArray[18] = false;
        this.PCrownCSSArray[17] = false;
        this.PCrownCSSArray[16] = false;
        this.PCrownCSSArray[15] = false;
        this.PCrownCSSArray[14] = false;
        this.PCrownCSSArray[13] = false;
        this.PCrownCSSArray[12] = false;
        this.PCrownCSSArray[11] = false;


        this.AcrylicCssArray[18] = false;
        this.AcrylicCssArray[17] = false;
        this.AcrylicCssArray[16] = false;
        this.AcrylicCssArray[15] = false;
        this.AcrylicCssArray[14] = false;
        this.AcrylicCssArray[13] = false;
        this.AcrylicCssArray[12] = false;
        this.AcrylicCssArray[11] = false;

        this.ChromeCobaltCssArray[18] = false;
        this.ChromeCobaltCssArray[17] = false;
        this.ChromeCobaltCssArray[16] = false;
        this.ChromeCobaltCssArray[15] = false;
        this.ChromeCobaltCssArray[14] = false;
        this.ChromeCobaltCssArray[13] = false;
        this.ChromeCobaltCssArray[12] = false;
        this.ChromeCobaltCssArray[11] = false;

        this.selectedTeethValue.splice(found18, 8);
      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }

    if (id === '2') {
      if (this.teeth21 === false && this.teeth22 === false && this.teeth23 === false && this.teeth24 === false && this.teeth25 === false &&
        this.teeth26 === false && this.teeth27 === false && this.teeth28 === false) {
        this.teeth21 = true; this.teeth22 = true; this.teeth23 = true; this.teeth24 = true; this.teeth25 = true; this.teeth26 = true;
        this.teeth27 = true; this.teeth28 = true;
        if (this.BoneRegeneration === true) {
          this.BoneRegenerationCSSArray[18] = true;
          this.BoneRegenerationCSSArray[22] = true;
          this.BoneRegenerationCSSArray[23] = true;
          this.BoneRegenerationCSSArray[24] = true;
          this.BoneRegenerationCSSArray[25] = true;
          this.BoneRegenerationCSSArray[26] = true;
          this.BoneRegenerationCSSArray[27] = true;
          this.BoneRegenerationCSSArray[28] = true;
        }
        if (this.rootCanalTreatment === true) {
          this.RootCanalTreatmentCSSArray[21] = true;
          this.RootCanalTreatmentCSSArray[22] = true;
          this.RootCanalTreatmentCSSArray[23] = true;
          this.RootCanalTreatmentCSSArray[24] = true;
          this.RootCanalTreatmentCSSArray[25] = true;
          this.RootCanalTreatmentCSSArray[26] = true;
          this.RootCanalTreatmentCSSArray[27] = true;
          this.RootCanalTreatmentCSSArray[28] = true;
        }
        if (this.apicectomy === true) {
          this.apicectomyCssArray[21] = true;
          this.apicectomyCssArray[22] = true;
          this.apicectomyCssArray[23] = true;
          this.apicectomyCssArray[24] = true;
          this.apicectomyCssArray[25] = true;
          this.apicectomyCssArray[26] = true;
          this.apicectomyCssArray[27] = true;
          this.apicectomyCssArray[28] = true;
        }
        if (this.Implant === true) {
          this.ImplantCSSArray[21] = true;
          this.ImplantCSSArray[22] = true;
          this.ImplantCSSArray[23] = true;
          this.ImplantCSSArray[24] = true;
          this.ImplantCSSArray[25] = true;
          this.ImplantCSSArray[26] = true;
          this.ImplantCSSArray[27] = true;
          this.ImplantCSSArray[28] = true;

        }
        if (this.RMesial === true) {
          this.RMesialCSSarray[21] = true;
          this.RMesialCSSarray[22] = true;
          this.RMesialCSSarray[23] = true;
          this.RMesialCSSarray[24] = true;
          this.RMesialCSSarray[25] = true;
          this.RMesialCSSarray[26] = true;
          this.RMesialCSSarray[27] = true;
          this.RMesialCSSarray[28] = true;

        }
        if (this.RDistal === true) {
          this.RDistalCSSarray[21] = true;
          this.RDistalCSSarray[22] = true;
          this.RDistalCSSarray[23] = true;
          this.RDistalCSSarray[24] = true;
          this.RDistalCSSarray[25] = true;
          this.RDistalCSSarray[26] = true;
          this.RDistalCSSarray[27] = true;
          this.RDistalCSSarray[28] = true;

        }
        if (this.RLingual === true) {
          this.RLingualCSSarray[21] = true;
          this.RLingualCSSarray[22] = true;
          this.RLingualCSSarray[23] = true;
          this.RLingualCSSarray[24] = true;
          this.RLingualCSSarray[25] = true;
          this.RLingualCSSarray[26] = true;
          this.RLingualCSSarray[27] = true;
          this.RLingualCSSarray[28] = true;

        }
        if (this.ROcclusal === true) {
          this.ROcclusalCSSarray[21] = true;
          this.ROcclusalCSSarray[22] = true;
          this.ROcclusalCSSarray[23] = true;
          this.ROcclusalCSSarray[24] = true;
          this.ROcclusalCSSarray[25] = true;
          this.ROcclusalCSSarray[26] = true;
          this.ROcclusalCSSarray[27] = true;
          this.ROcclusalCSSarray[28] = true;

        }
        if (this.RBuccal === true) {
          this.RBuccalCSSarray[21] = true;
          this.RBuccalCSSarray[22] = true;
          this.RBuccalCSSarray[23] = true;
          this.RBuccalCSSarray[24] = true;
          this.RBuccalCSSarray[25] = true;
          this.RBuccalCSSarray[26] = true;
          this.RBuccalCSSarray[27] = true;
          this.RBuccalCSSarray[28] = true;

        }

        if (this.CMesial === true) {
          this.CMesialCSSarray[21] = true;
          this.CMesialCSSarray[22] = true;
          this.CMesialCSSarray[23] = true;
          this.CMesialCSSarray[24] = true;
          this.CMesialCSSarray[25] = true;
          this.CMesialCSSarray[26] = true;
          this.CMesialCSSarray[27] = true;
          this.CMesialCSSarray[28] = true;

        }
        if (this.CDistal === true) {
          this.CDistalCSSarray[21] = true;
          this.CDistalCSSarray[22] = true;
          this.CDistalCSSarray[23] = true;
          this.CDistalCSSarray[24] = true;
          this.CDistalCSSarray[25] = true;
          this.CDistalCSSarray[26] = true;
          this.CDistalCSSarray[27] = true;
          this.CDistalCSSarray[28] = true;

        }
        if (this.CLingual === true) {
          this.CLingualCSSarray[21] = true;
          this.CLingualCSSarray[22] = true;
          this.CLingualCSSarray[23] = true;
          this.CLingualCSSarray[24] = true;
          this.CLingualCSSarray[25] = true;
          this.CLingualCSSarray[26] = true;
          this.CLingualCSSarray[27] = true;
          this.CLingualCSSarray[28] = true;

        }
        if (this.COcclusal === true) {
          this.COcclusalCSSarray[21] = true;
          this.COcclusalCSSarray[22] = true;
          this.COcclusalCSSarray[23] = true;
          this.COcclusalCSSarray[24] = true;
          this.COcclusalCSSarray[25] = true;
          this.COcclusalCSSarray[26] = true;
          this.COcclusalCSSarray[27] = true;
          this.COcclusalCSSarray[28] = true;

        }
        if (this.CBuccal === true) {
          this.CBuccalCSSarray[21] = true;
          this.CBuccalCSSarray[22] = true;
          this.CBuccalCSSarray[23] = true;
          this.CBuccalCSSarray[24] = true;
          this.CBuccalCSSarray[25] = true;
          this.CBuccalCSSarray[26] = true;
          this.CBuccalCSSarray[27] = true;
          this.CBuccalCSSarray[28] = true;

        }

        if (this.PMesial === true) {
          this.PMesialCSSarray[21] = true;
          this.PMesialCSSarray[22] = true;
          this.PMesialCSSarray[23] = true;
          this.PMesialCSSarray[24] = true;
          this.PMesialCSSarray[25] = true;
          this.PMesialCSSarray[26] = true;
          this.PMesialCSSarray[27] = true;
          this.PMesialCSSarray[28] = true;

        }
        if (this.PDistal === true) {
          this.PDistalCSSarray[21] = true;
          this.PDistalCSSarray[22] = true;
          this.PDistalCSSarray[23] = true;
          this.PDistalCSSarray[24] = true;
          this.PDistalCSSarray[25] = true;
          this.PDistalCSSarray[26] = true;
          this.PDistalCSSarray[27] = true;
          this.PDistalCSSarray[28] = true;

        }
        if (this.PLingual === true) {
          this.PLingualCSSarray[21] = true;
          this.PLingualCSSarray[22] = true;
          this.PLingualCSSarray[23] = true;
          this.PLingualCSSarray[24] = true;
          this.PLingualCSSarray[25] = true;
          this.PLingualCSSarray[26] = true;
          this.PLingualCSSarray[27] = true;
          this.PLingualCSSarray[28] = true;

        }
        if (this.POcclusal === true) {
          this.POcclusalCSSarray[21] = true;
          this.POcclusalCSSarray[22] = true;
          this.POcclusalCSSarray[23] = true;
          this.POcclusalCSSarray[24] = true;
          this.POcclusalCSSarray[25] = true;
          this.POcclusalCSSarray[26] = true;
          this.POcclusalCSSarray[27] = true;
          this.POcclusalCSSarray[28] = true;

        }
        if (this.PBuccal === true) {
          this.PBuccalCSSarray[21] = true;
          this.PBuccalCSSarray[22] = true;
          this.PBuccalCSSarray[23] = true;
          this.PBuccalCSSarray[24] = true;
          this.PBuccalCSSarray[25] = true;
          this.PBuccalCSSarray[26] = true;
          this.PBuccalCSSarray[27] = true;
          this.PBuccalCSSarray[28] = true;

        }

        if (this.PVeneer === true) {
          this.PVeneerCSSArray[21] = true;
          this.PVeneerCSSArray[22] = true;
          this.PVeneerCSSArray[23] = true;
          this.PVeneerCSSArray[24] = true;
          this.PVeneerCSSArray[25] = true;
          this.PVeneerCSSArray[26] = true;
          this.PVeneerCSSArray[27] = true;
          this.PVeneerCSSArray[28] = true;

        }
        if (this.POnlay === true) {
          this.POnlayCSSArray[21] = true;
          this.POnlayCSSArray[22] = true;
          this.POnlayCSSArray[23] = true;
          this.POnlayCSSArray[24] = true;
          this.POnlayCSSArray[25] = true;
          this.POnlayCSSArray[26] = true;
          this.POnlayCSSArray[27] = true;
          this.POnlayCSSArray[28] = true;

        }
        if (this.PCrown === true) {
          this.PCrownCSSArray[21] = true;
          this.PCrownCSSArray[22] = true;
          this.PCrownCSSArray[23] = true;
          this.PCrownCSSArray[24] = true;
          this.PCrownCSSArray[25] = true;
          this.PCrownCSSArray[26] = true;
          this.PCrownCSSArray[27] = true;
          this.PCrownCSSArray[28] = true;

        }

        if (this.Acrylic === true) {
          this.AcrylicCssArray[21] = true;
          this.AcrylicCssArray[22] = true;
          this.AcrylicCssArray[23] = true;
          this.AcrylicCssArray[24] = true;
          this.AcrylicCssArray[25] = true;
          this.AcrylicCssArray[26] = true;
          this.AcrylicCssArray[27] = true;
          this.AcrylicCssArray[28] = true;

        }
        if (this.ChromeCobalt === true) {
          this.ChromeCobaltCssArray[21] = true;
          this.ChromeCobaltCssArray[22] = true;
          this.ChromeCobaltCssArray[23] = true;
          this.ChromeCobaltCssArray[24] = true;
          this.ChromeCobaltCssArray[25] = true;
          this.ChromeCobaltCssArray[26] = true;
          this.ChromeCobaltCssArray[27] = true;
          this.ChromeCobaltCssArray[28] = true;

        }
        this.selectedTeethValue.push(21, 22, 23, 24, 25, 26, 27, 28);

      } else {
        this.teeth21 = false; this.teeth22 = false; this.teeth23 = false; this.teeth24 = false; this.teeth25 = false;
        this.teeth26 = false; this.teeth27 = false; this.teeth28 = false;
        const found21 = this.selectedTeethValue.findIndex(element => element === 21);

        this.BoneRegenerationCSSArray[21] = false;
        this.BoneRegenerationCSSArray[22] = false;
        this.BoneRegenerationCSSArray[23] = false;
        this.BoneRegenerationCSSArray[24] = false;
        this.BoneRegenerationCSSArray[25] = false;
        this.BoneRegenerationCSSArray[26] = false;
        this.BoneRegenerationCSSArray[27] = false;
        this.BoneRegenerationCSSArray[28] = false;

        this.RootCanalTreatmentCSSArray[21] = false;
        this.RootCanalTreatmentCSSArray[22] = false;
        this.RootCanalTreatmentCSSArray[23] = false;
        this.RootCanalTreatmentCSSArray[24] = false;
        this.RootCanalTreatmentCSSArray[25] = false;
        this.RootCanalTreatmentCSSArray[26] = false;
        this.RootCanalTreatmentCSSArray[27] = false;
        this.RootCanalTreatmentCSSArray[28] = false;

        this.apicectomyCssArray[21] = false;
        this.apicectomyCssArray[22] = false;
        this.apicectomyCssArray[23] = false;
        this.apicectomyCssArray[24] = false;
        this.apicectomyCssArray[25] = false;
        this.apicectomyCssArray[26] = false;
        this.apicectomyCssArray[27] = false;
        this.apicectomyCssArray[28] = false;

        this.ImplantCSSArray[21] = false;
        this.ImplantCSSArray[22] = false;
        this.ImplantCSSArray[23] = false;
        this.ImplantCSSArray[24] = false;
        this.ImplantCSSArray[25] = false;
        this.ImplantCSSArray[26] = false;
        this.ImplantCSSArray[27] = false;
        this.ImplantCSSArray[28] = false;

        this.RMesialCSSarray[21] = false;
        this.RMesialCSSarray[22] = false;
        this.RMesialCSSarray[23] = false;
        this.RMesialCSSarray[24] = false;
        this.RMesialCSSarray[25] = false;
        this.RMesialCSSarray[26] = false;
        this.RMesialCSSarray[27] = false;
        this.RMesialCSSarray[28] = false;

        this.RDistalCSSarray[21] = false;
        this.RDistalCSSarray[22] = false;
        this.RDistalCSSarray[23] = false;
        this.RDistalCSSarray[24] = false;
        this.RDistalCSSarray[25] = false;
        this.RDistalCSSarray[26] = false;
        this.RDistalCSSarray[27] = false;
        this.RDistalCSSarray[28] = false;

        this.RLingualCSSarray[21] = false;
        this.RLingualCSSarray[22] = false;
        this.RLingualCSSarray[23] = false;
        this.RLingualCSSarray[24] = false;
        this.RLingualCSSarray[25] = false;
        this.RLingualCSSarray[26] = false;
        this.RLingualCSSarray[27] = false;
        this.RLingualCSSarray[28] = false;

        this.ROcclusalCSSarray[21] = false;
        this.ROcclusalCSSarray[22] = false;
        this.ROcclusalCSSarray[23] = false;
        this.ROcclusalCSSarray[24] = false;
        this.ROcclusalCSSarray[25] = false;
        this.ROcclusalCSSarray[26] = false;
        this.ROcclusalCSSarray[27] = false;
        this.ROcclusalCSSarray[28] = false;

        this.RBuccalCSSarray[21] = false;
        this.RBuccalCSSarray[22] = false;
        this.RBuccalCSSarray[23] = false;
        this.RBuccalCSSarray[24] = false;
        this.RBuccalCSSarray[25] = false;
        this.RBuccalCSSarray[26] = false;
        this.RBuccalCSSarray[27] = false;
        this.RBuccalCSSarray[28] = false;


        this.CMesialCSSarray[21] = false;
        this.CMesialCSSarray[22] = false;
        this.CMesialCSSarray[23] = false;
        this.CMesialCSSarray[24] = false;
        this.CMesialCSSarray[25] = false;
        this.CMesialCSSarray[26] = false;
        this.CMesialCSSarray[27] = false;
        this.CMesialCSSarray[28] = false;

        this.CDistalCSSarray[21] = false;
        this.CDistalCSSarray[22] = false;
        this.CDistalCSSarray[23] = false;
        this.CDistalCSSarray[24] = false;
        this.CDistalCSSarray[25] = false;
        this.CDistalCSSarray[26] = false;
        this.CDistalCSSarray[27] = false;
        this.CDistalCSSarray[28] = false;

        this.CLingualCSSarray[21] = false;
        this.CLingualCSSarray[22] = false;
        this.CLingualCSSarray[23] = false;
        this.CLingualCSSarray[24] = false;
        this.CLingualCSSarray[25] = false;
        this.CLingualCSSarray[26] = false;
        this.CLingualCSSarray[27] = false;
        this.CLingualCSSarray[28] = false;

        this.COcclusalCSSarray[21] = false;
        this.COcclusalCSSarray[22] = false;
        this.COcclusalCSSarray[23] = false;
        this.COcclusalCSSarray[24] = false;
        this.COcclusalCSSarray[25] = false;
        this.COcclusalCSSarray[26] = false;
        this.COcclusalCSSarray[27] = false;
        this.COcclusalCSSarray[28] = false;

        this.CBuccalCSSarray[21] = false;
        this.CBuccalCSSarray[22] = false;
        this.CBuccalCSSarray[23] = false;
        this.CBuccalCSSarray[24] = false;
        this.CBuccalCSSarray[25] = false;
        this.CBuccalCSSarray[26] = false;
        this.CBuccalCSSarray[27] = false;
        this.CBuccalCSSarray[28] = false;


        this.PMesialCSSarray[21] = false;
        this.PMesialCSSarray[22] = false;
        this.PMesialCSSarray[23] = false;
        this.PMesialCSSarray[24] = false;
        this.PMesialCSSarray[25] = false;
        this.PMesialCSSarray[26] = false;
        this.PMesialCSSarray[27] = false;
        this.PMesialCSSarray[28] = false;

        this.PDistalCSSarray[21] = false;
        this.PDistalCSSarray[22] = false;
        this.PDistalCSSarray[23] = false;
        this.PDistalCSSarray[24] = false;
        this.PDistalCSSarray[25] = false;
        this.PDistalCSSarray[26] = false;
        this.PDistalCSSarray[27] = false;
        this.PDistalCSSarray[28] = false;

        this.PLingualCSSarray[21] = false;
        this.PLingualCSSarray[22] = false;
        this.PLingualCSSarray[23] = false;
        this.PLingualCSSarray[24] = false;
        this.PLingualCSSarray[25] = false;
        this.PLingualCSSarray[26] = false;
        this.PLingualCSSarray[27] = false;
        this.PLingualCSSarray[28] = false;

        this.POcclusalCSSarray[21] = false;
        this.POcclusalCSSarray[22] = false;
        this.POcclusalCSSarray[23] = false;
        this.POcclusalCSSarray[24] = false;
        this.POcclusalCSSarray[25] = false;
        this.POcclusalCSSarray[26] = false;
        this.POcclusalCSSarray[27] = false;
        this.POcclusalCSSarray[28] = false;

        this.PBuccalCSSarray[21] = false;
        this.PBuccalCSSarray[22] = false;
        this.PBuccalCSSarray[23] = false;
        this.PBuccalCSSarray[24] = false;
        this.PBuccalCSSarray[25] = false;
        this.PBuccalCSSarray[26] = false;
        this.PBuccalCSSarray[27] = false;
        this.PBuccalCSSarray[28] = false;


        this.PVeneerCSSArray[21] = false;
        this.PVeneerCSSArray[22] = false;
        this.PVeneerCSSArray[23] = false;
        this.PVeneerCSSArray[24] = false;
        this.PVeneerCSSArray[25] = false;
        this.PVeneerCSSArray[26] = false;
        this.PVeneerCSSArray[27] = false;
        this.PVeneerCSSArray[28] = false;

        this.POnlayCSSArray[21] = false;
        this.POnlayCSSArray[22] = false;
        this.POnlayCSSArray[23] = false;
        this.POnlayCSSArray[24] = false;
        this.POnlayCSSArray[25] = false;
        this.POnlayCSSArray[26] = false;
        this.POnlayCSSArray[27] = false;
        this.POnlayCSSArray[28] = false;

        this.PCrownCSSArray[21] = false;
        this.PCrownCSSArray[22] = false;
        this.PCrownCSSArray[23] = false;
        this.PCrownCSSArray[24] = false;
        this.PCrownCSSArray[25] = false;
        this.PCrownCSSArray[26] = false;
        this.PCrownCSSArray[27] = false;
        this.PCrownCSSArray[28] = false;


        this.AcrylicCssArray[21] = false;
        this.AcrylicCssArray[22] = false;
        this.AcrylicCssArray[23] = false;
        this.AcrylicCssArray[24] = false;
        this.AcrylicCssArray[25] = false;
        this.AcrylicCssArray[26] = false;
        this.AcrylicCssArray[27] = false;
        this.AcrylicCssArray[28] = false;

        this.ChromeCobaltCssArray[21] = false;
        this.ChromeCobaltCssArray[22] = false;
        this.ChromeCobaltCssArray[23] = false;
        this.ChromeCobaltCssArray[24] = false;
        this.ChromeCobaltCssArray[25] = false;
        this.ChromeCobaltCssArray[26] = false;
        this.ChromeCobaltCssArray[27] = false;
        this.ChromeCobaltCssArray[28] = false;

        this.selectedTeethValue.splice(found21, 8);
      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }

    if (id === '3') {
      if (this.teeth48 === false && this.teeth47 === false && this.teeth46 === false && this.teeth45 === false && this.teeth44 === false && this.teeth43 === false &&
        this.teeth42 === false && this.teeth41 === false) {
        this.teeth48 = true; this.teeth47 = true; this.teeth46 = true; this.teeth45 = true; this.teeth44 = true;
        this.teeth43 = true; this.teeth42 = true; this.teeth41 = true;
        if (this.BoneRegeneration === true) {
          this.BoneRegenerationCSSArray[48] = true;
          this.BoneRegenerationCSSArray[47] = true;
          this.BoneRegenerationCSSArray[46] = true;
          this.BoneRegenerationCSSArray[45] = true;
          this.BoneRegenerationCSSArray[44] = true;
          this.BoneRegenerationCSSArray[43] = true;
          this.BoneRegenerationCSSArray[42] = true;
          this.BoneRegenerationCSSArray[41] = true;

        }
        if (this.rootCanalTreatment === true) {
          this.RootCanalTreatmentCSSArray[48] = true;
          this.RootCanalTreatmentCSSArray[47] = true;
          this.RootCanalTreatmentCSSArray[46] = true;
          this.RootCanalTreatmentCSSArray[45] = true;
          this.RootCanalTreatmentCSSArray[44] = true;
          this.RootCanalTreatmentCSSArray[43] = true;
          this.RootCanalTreatmentCSSArray[42] = true;
          this.RootCanalTreatmentCSSArray[41] = true;

        }
        if (this.apicectomy === true) {
          this.apicectomyCssArray[48] = true;
          this.apicectomyCssArray[47] = true;
          this.apicectomyCssArray[46] = true;
          this.apicectomyCssArray[45] = true;
          this.apicectomyCssArray[44] = true;
          this.apicectomyCssArray[43] = true;
          this.apicectomyCssArray[42] = true;
          this.apicectomyCssArray[41] = true;

        }
        if (this.Implant === true) {
          this.ImplantCSSArray[48] = true;
          this.ImplantCSSArray[47] = true;
          this.ImplantCSSArray[46] = true;
          this.ImplantCSSArray[45] = true;
          this.ImplantCSSArray[44] = true;
          this.ImplantCSSArray[43] = true;
          this.ImplantCSSArray[42] = true;
          this.ImplantCSSArray[41] = true;

        }
        if (this.RMesial === true) {
          this.RMesialCSSarray[48] = true;
          this.RMesialCSSarray[47] = true;
          this.RMesialCSSarray[46] = true;
          this.RMesialCSSarray[45] = true;
          this.RMesialCSSarray[44] = true;
          this.RMesialCSSarray[43] = true;
          this.RMesialCSSarray[42] = true;
          this.RMesialCSSarray[41] = true;

        }
        if (this.RDistal === true) {
          this.RDistalCSSarray[48] = true;
          this.RDistalCSSarray[47] = true;
          this.RDistalCSSarray[46] = true;
          this.RDistalCSSarray[45] = true;
          this.RDistalCSSarray[44] = true;
          this.RDistalCSSarray[43] = true;
          this.RDistalCSSarray[42] = true;
          this.RDistalCSSarray[41] = true;

        }
        if (this.RLingual === true) {
          this.RLingualCSSarray[48] = true;
          this.RLingualCSSarray[47] = true;
          this.RLingualCSSarray[46] = true;
          this.RLingualCSSarray[45] = true;
          this.RLingualCSSarray[44] = true;
          this.RLingualCSSarray[43] = true;
          this.RLingualCSSarray[42] = true;
          this.RLingualCSSarray[41] = true;

        }
        if (this.ROcclusal === true) {
          this.ROcclusalCSSarray[48] = true;
          this.ROcclusalCSSarray[47] = true;
          this.ROcclusalCSSarray[46] = true;
          this.ROcclusalCSSarray[45] = true;
          this.ROcclusalCSSarray[44] = true;
          this.ROcclusalCSSarray[43] = true;
          this.ROcclusalCSSarray[42] = true;
          this.ROcclusalCSSarray[41] = true;

        }
        if (this.RBuccal === true) {
          this.RBuccalCSSarray[48] = true;
          this.RBuccalCSSarray[47] = true;
          this.RBuccalCSSarray[46] = true;
          this.RBuccalCSSarray[45] = true;
          this.RBuccalCSSarray[44] = true;
          this.RBuccalCSSarray[43] = true;
          this.RBuccalCSSarray[42] = true;
          this.RBuccalCSSarray[41] = true;

        }

        if (this.CMesial === true) {
          this.CMesialCSSarray[48] = true;
          this.CMesialCSSarray[47] = true;
          this.CMesialCSSarray[46] = true;
          this.CMesialCSSarray[45] = true;
          this.CMesialCSSarray[44] = true;
          this.CMesialCSSarray[43] = true;
          this.CMesialCSSarray[42] = true;
          this.CMesialCSSarray[41] = true;

        }
        if (this.CDistal === true) {
          this.CDistalCSSarray[48] = true;
          this.CDistalCSSarray[47] = true;
          this.CDistalCSSarray[46] = true;
          this.CDistalCSSarray[45] = true;
          this.CDistalCSSarray[44] = true;
          this.CDistalCSSarray[43] = true;
          this.CDistalCSSarray[42] = true;
          this.CDistalCSSarray[41] = true;

        }
        if (this.CLingual === true) {
          this.CLingualCSSarray[48] = true;
          this.CLingualCSSarray[47] = true;
          this.CLingualCSSarray[46] = true;
          this.CLingualCSSarray[45] = true;
          this.CLingualCSSarray[44] = true;
          this.CLingualCSSarray[43] = true;
          this.CLingualCSSarray[42] = true;
          this.CLingualCSSarray[41] = true;

        }
        if (this.COcclusal === true) {
          this.COcclusalCSSarray[48] = true;
          this.COcclusalCSSarray[47] = true;
          this.COcclusalCSSarray[46] = true;
          this.COcclusalCSSarray[45] = true;
          this.COcclusalCSSarray[44] = true;
          this.COcclusalCSSarray[43] = true;
          this.COcclusalCSSarray[42] = true;
          this.COcclusalCSSarray[41] = true;

        }
        if (this.CBuccal === true) {
          this.CBuccalCSSarray[48] = true;
          this.CBuccalCSSarray[47] = true;
          this.CBuccalCSSarray[46] = true;
          this.CBuccalCSSarray[45] = true;
          this.CBuccalCSSarray[44] = true;
          this.CBuccalCSSarray[43] = true;
          this.CBuccalCSSarray[42] = true;
          this.CBuccalCSSarray[41] = true;

        }

        if (this.PMesial === true) {
          this.PMesialCSSarray[48] = true;
          this.PMesialCSSarray[47] = true;
          this.PMesialCSSarray[46] = true;
          this.PMesialCSSarray[45] = true;
          this.PMesialCSSarray[44] = true;
          this.PMesialCSSarray[43] = true;
          this.PMesialCSSarray[42] = true;
          this.PMesialCSSarray[41] = true;

        }
        if (this.PDistal === true) {
          this.PDistalCSSarray[48] = true;
          this.PDistalCSSarray[47] = true;
          this.PDistalCSSarray[46] = true;
          this.PDistalCSSarray[45] = true;
          this.PDistalCSSarray[44] = true;
          this.PDistalCSSarray[43] = true;
          this.PDistalCSSarray[42] = true;
          this.PDistalCSSarray[41] = true;

        }
        if (this.PLingual === true) {
          this.PLingualCSSarray[48] = true;
          this.PLingualCSSarray[47] = true;
          this.PLingualCSSarray[46] = true;
          this.PLingualCSSarray[45] = true;
          this.PLingualCSSarray[44] = true;
          this.PLingualCSSarray[43] = true;
          this.PLingualCSSarray[42] = true;
          this.PLingualCSSarray[41] = true;

        }
        if (this.POcclusal === true) {
          this.POcclusalCSSarray[48] = true;
          this.POcclusalCSSarray[47] = true;
          this.POcclusalCSSarray[46] = true;
          this.POcclusalCSSarray[45] = true;
          this.POcclusalCSSarray[44] = true;
          this.POcclusalCSSarray[43] = true;
          this.POcclusalCSSarray[42] = true;
          this.POcclusalCSSarray[41] = true;

        }
        if (this.PBuccal === true) {
          this.PBuccalCSSarray[48] = true;
          this.PBuccalCSSarray[47] = true;
          this.PBuccalCSSarray[46] = true;
          this.PBuccalCSSarray[45] = true;
          this.PBuccalCSSarray[44] = true;
          this.PBuccalCSSarray[43] = true;
          this.PBuccalCSSarray[42] = true;
          this.PBuccalCSSarray[41] = true;

        }

        if (this.PVeneer === true) {
          this.PVeneerCSSArray[48] = true;
          this.PVeneerCSSArray[47] = true;
          this.PVeneerCSSArray[46] = true;
          this.PVeneerCSSArray[45] = true;
          this.PVeneerCSSArray[44] = true;
          this.PVeneerCSSArray[43] = true;
          this.PVeneerCSSArray[42] = true;
          this.PVeneerCSSArray[41] = true;

        }
        if (this.POnlay === true) {
          this.POnlayCSSArray[48] = true;
          this.POnlayCSSArray[47] = true;
          this.POnlayCSSArray[46] = true;
          this.POnlayCSSArray[45] = true;
          this.POnlayCSSArray[44] = true;
          this.POnlayCSSArray[43] = true;
          this.POnlayCSSArray[42] = true;
          this.POnlayCSSArray[41] = true;

        }
        if (this.PCrown === true) {
          this.PCrownCSSArray[48] = true;
          this.PCrownCSSArray[47] = true;
          this.PCrownCSSArray[46] = true;
          this.PCrownCSSArray[45] = true;
          this.PCrownCSSArray[44] = true;
          this.PCrownCSSArray[43] = true;
          this.PCrownCSSArray[42] = true;
          this.PCrownCSSArray[41] = true;

        }

        if (this.Acrylic === true) {
          this.AcrylicCssArray[48] = true;
          this.AcrylicCssArray[47] = true;
          this.AcrylicCssArray[46] = true;
          this.AcrylicCssArray[45] = true;
          this.AcrylicCssArray[44] = true;
          this.AcrylicCssArray[43] = true;
          this.AcrylicCssArray[42] = true;
          this.AcrylicCssArray[41] = true;

        }
        if (this.ChromeCobalt === true) {
          this.ChromeCobaltCssArray[48] = true;
          this.ChromeCobaltCssArray[47] = true;
          this.ChromeCobaltCssArray[46] = true;
          this.ChromeCobaltCssArray[45] = true;
          this.ChromeCobaltCssArray[44] = true;
          this.ChromeCobaltCssArray[43] = true;
          this.ChromeCobaltCssArray[42] = true;
          this.ChromeCobaltCssArray[41] = true;

        }
        this.selectedTeethValue.push(48, 47, 46, 45, 44, 43, 42, 41);

      } else {
        this.teeth48 = false; this.teeth47 = false; this.teeth46 = false; this.teeth45 = false; this.teeth44 = false;
        this.teeth43 = false; this.teeth42 = false; this.teeth41 = false;
        const found48 = this.selectedTeethValue.findIndex(element => element === 48);
        this.BoneRegenerationCSSArray[48] = false;
        this.BoneRegenerationCSSArray[47] = false;
        this.BoneRegenerationCSSArray[46] = false;
        this.BoneRegenerationCSSArray[45] = false;
        this.BoneRegenerationCSSArray[44] = false;
        this.BoneRegenerationCSSArray[43] = false;
        this.BoneRegenerationCSSArray[42] = false;
        this.BoneRegenerationCSSArray[41] = false;

        this.RootCanalTreatmentCSSArray[48] = false;
        this.RootCanalTreatmentCSSArray[47] = false;
        this.RootCanalTreatmentCSSArray[46] = false;
        this.RootCanalTreatmentCSSArray[45] = false;
        this.RootCanalTreatmentCSSArray[44] = false;
        this.RootCanalTreatmentCSSArray[43] = false;
        this.RootCanalTreatmentCSSArray[42] = false;
        this.RootCanalTreatmentCSSArray[41] = false;

        this.apicectomyCssArray[48] = false;
        this.apicectomyCssArray[47] = false;
        this.apicectomyCssArray[46] = false;
        this.apicectomyCssArray[45] = false;
        this.apicectomyCssArray[44] = false;
        this.apicectomyCssArray[43] = false;
        this.apicectomyCssArray[42] = false;
        this.apicectomyCssArray[41] = false;

        this.ImplantCSSArray[48] = false;
        this.ImplantCSSArray[47] = false;
        this.ImplantCSSArray[46] = false;
        this.ImplantCSSArray[45] = false;
        this.ImplantCSSArray[44] = false;
        this.ImplantCSSArray[43] = false;
        this.ImplantCSSArray[42] = false;
        this.ImplantCSSArray[41] = false;

        this.RMesialCSSarray[48] = false;
        this.RMesialCSSarray[47] = false;
        this.RMesialCSSarray[46] = false;
        this.RMesialCSSarray[45] = false;
        this.RMesialCSSarray[44] = false;
        this.RMesialCSSarray[43] = false;
        this.RMesialCSSarray[42] = false;
        this.RMesialCSSarray[41] = false;

        this.RDistalCSSarray[48] = false;
        this.RDistalCSSarray[47] = false;
        this.RDistalCSSarray[46] = false;
        this.RDistalCSSarray[45] = false;
        this.RDistalCSSarray[44] = false;
        this.RDistalCSSarray[43] = false;
        this.RDistalCSSarray[42] = false;
        this.RDistalCSSarray[41] = false;

        this.RLingualCSSarray[48] = false;
        this.RLingualCSSarray[47] = false;
        this.RLingualCSSarray[46] = false;
        this.RLingualCSSarray[45] = false;
        this.RLingualCSSarray[44] = false;
        this.RLingualCSSarray[43] = false;
        this.RLingualCSSarray[42] = false;
        this.RLingualCSSarray[41] = false;

        this.ROcclusalCSSarray[48] = false;
        this.ROcclusalCSSarray[47] = false;
        this.ROcclusalCSSarray[46] = false;
        this.ROcclusalCSSarray[45] = false;
        this.ROcclusalCSSarray[44] = false;
        this.ROcclusalCSSarray[43] = false;
        this.ROcclusalCSSarray[42] = false;
        this.ROcclusalCSSarray[41] = false;

        this.RBuccalCSSarray[48] = false;
        this.RBuccalCSSarray[47] = false;
        this.RBuccalCSSarray[46] = false;
        this.RBuccalCSSarray[45] = false;
        this.RBuccalCSSarray[44] = false;
        this.RBuccalCSSarray[43] = false;
        this.RBuccalCSSarray[42] = false;
        this.RBuccalCSSarray[41] = false;


        this.CMesialCSSarray[48] = false;
        this.CMesialCSSarray[47] = false;
        this.CMesialCSSarray[46] = false;
        this.CMesialCSSarray[45] = false;
        this.CMesialCSSarray[44] = false;
        this.CMesialCSSarray[43] = false;
        this.CMesialCSSarray[42] = false;
        this.CMesialCSSarray[41] = false;

        this.CDistalCSSarray[48] = false;
        this.CDistalCSSarray[47] = false;
        this.CDistalCSSarray[46] = false;
        this.CDistalCSSarray[45] = false;
        this.CDistalCSSarray[44] = false;
        this.CDistalCSSarray[43] = false;
        this.CDistalCSSarray[42] = false;
        this.CDistalCSSarray[41] = false;

        this.CLingualCSSarray[48] = false;
        this.CLingualCSSarray[47] = false;
        this.CLingualCSSarray[46] = false;
        this.CLingualCSSarray[45] = false;
        this.CLingualCSSarray[44] = false;
        this.CLingualCSSarray[43] = false;
        this.CLingualCSSarray[42] = false;
        this.CLingualCSSarray[41] = false;

        this.COcclusalCSSarray[48] = false;
        this.COcclusalCSSarray[47] = false;
        this.COcclusalCSSarray[46] = false;
        this.COcclusalCSSarray[45] = false;
        this.COcclusalCSSarray[44] = false;
        this.COcclusalCSSarray[43] = false;
        this.COcclusalCSSarray[42] = false;
        this.COcclusalCSSarray[41] = false;

        this.CBuccalCSSarray[48] = false;
        this.CBuccalCSSarray[47] = false;
        this.CBuccalCSSarray[46] = false;
        this.CBuccalCSSarray[45] = false;
        this.CBuccalCSSarray[44] = false;
        this.CBuccalCSSarray[43] = false;
        this.CBuccalCSSarray[42] = false;
        this.CBuccalCSSarray[41] = false;


        this.PMesialCSSarray[48] = false;
        this.PMesialCSSarray[47] = false;
        this.PMesialCSSarray[46] = false;
        this.PMesialCSSarray[45] = false;
        this.PMesialCSSarray[44] = false;
        this.PMesialCSSarray[43] = false;
        this.PMesialCSSarray[42] = false;
        this.PMesialCSSarray[41] = false;

        this.PDistalCSSarray[48] = false;
        this.PDistalCSSarray[47] = false;
        this.PDistalCSSarray[46] = false;
        this.PDistalCSSarray[45] = false;
        this.PDistalCSSarray[44] = false;
        this.PDistalCSSarray[43] = false;
        this.PDistalCSSarray[42] = false;
        this.PDistalCSSarray[41] = false;

        this.PLingualCSSarray[48] = false;
        this.PLingualCSSarray[47] = false;
        this.PLingualCSSarray[46] = false;
        this.PLingualCSSarray[45] = false;
        this.PLingualCSSarray[44] = false;
        this.PLingualCSSarray[43] = false;
        this.PLingualCSSarray[42] = false;
        this.PLingualCSSarray[41] = false;

        this.POcclusalCSSarray[48] = false;
        this.POcclusalCSSarray[47] = false;
        this.POcclusalCSSarray[46] = false;
        this.POcclusalCSSarray[45] = false;
        this.POcclusalCSSarray[44] = false;
        this.POcclusalCSSarray[43] = false;
        this.POcclusalCSSarray[42] = false;
        this.POcclusalCSSarray[41] = false;

        this.PBuccalCSSarray[48] = false;
        this.PBuccalCSSarray[47] = false;
        this.PBuccalCSSarray[46] = false;
        this.PBuccalCSSarray[45] = false;
        this.PBuccalCSSarray[44] = false;
        this.PBuccalCSSarray[43] = false;
        this.PBuccalCSSarray[42] = false;
        this.PBuccalCSSarray[41] = false;


        this.PVeneerCSSArray[48] = false;
        this.PVeneerCSSArray[47] = false;
        this.PVeneerCSSArray[46] = false;
        this.PVeneerCSSArray[45] = false;
        this.PVeneerCSSArray[44] = false;
        this.PVeneerCSSArray[43] = false;
        this.PVeneerCSSArray[42] = false;
        this.PVeneerCSSArray[41] = false;

        this.POnlayCSSArray[48] = false;
        this.POnlayCSSArray[47] = false;
        this.POnlayCSSArray[46] = false;
        this.POnlayCSSArray[45] = false;
        this.POnlayCSSArray[44] = false;
        this.POnlayCSSArray[43] = false;
        this.POnlayCSSArray[42] = false;
        this.POnlayCSSArray[41] = false;

        this.PCrownCSSArray[48] = false;
        this.PCrownCSSArray[47] = false;
        this.PCrownCSSArray[46] = false;
        this.PCrownCSSArray[45] = false;
        this.PCrownCSSArray[44] = false;
        this.PCrownCSSArray[43] = false;
        this.PCrownCSSArray[42] = false;
        this.PCrownCSSArray[41] = false;


        this.AcrylicCssArray[48] = false;
        this.AcrylicCssArray[47] = false;
        this.AcrylicCssArray[46] = false;
        this.AcrylicCssArray[45] = false;
        this.AcrylicCssArray[44] = false;
        this.AcrylicCssArray[43] = false;
        this.AcrylicCssArray[42] = false;
        this.AcrylicCssArray[41] = false;

        this.ChromeCobaltCssArray[48] = false;
        this.ChromeCobaltCssArray[47] = false;
        this.ChromeCobaltCssArray[46] = false;
        this.ChromeCobaltCssArray[45] = false;
        this.ChromeCobaltCssArray[44] = false;
        this.ChromeCobaltCssArray[43] = false;
        this.ChromeCobaltCssArray[42] = false;
        this.ChromeCobaltCssArray[41] = false;

        this.selectedTeethValue.splice(found48, 8);
      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }

    if (id === '4') {
      if (this.teeth31 === false && this.teeth32 === false && this.teeth33 === false && this.teeth34 === false && this.teeth35 === false && this.teeth36 === false && this.teeth37 === false &&
        this.teeth38 === false) {
        this.teeth31 = true; this.teeth32 = true; this.teeth33 = true; this.teeth34 = true; this.teeth35 = true;
        this.teeth36 = true; this.teeth37 = true; this.teeth38 = true;
        if (this.BoneRegeneration === true) {
          this.BoneRegenerationCSSArray[31] = true;
          this.BoneRegenerationCSSArray[32] = true;
          this.BoneRegenerationCSSArray[33] = true;
          this.BoneRegenerationCSSArray[34] = true;
          this.BoneRegenerationCSSArray[35] = true;
          this.BoneRegenerationCSSArray[36] = true;
          this.BoneRegenerationCSSArray[37] = true;
          this.BoneRegenerationCSSArray[38] = true;

        }
        if (this.rootCanalTreatment === true) {
          this.RootCanalTreatmentCSSArray[31] = true;
          this.RootCanalTreatmentCSSArray[32] = true;
          this.RootCanalTreatmentCSSArray[33] = true;
          this.RootCanalTreatmentCSSArray[34] = true;
          this.RootCanalTreatmentCSSArray[35] = true;
          this.RootCanalTreatmentCSSArray[36] = true;
          this.RootCanalTreatmentCSSArray[37] = true;
          this.RootCanalTreatmentCSSArray[38] = true;

        }
        if (this.apicectomy === true) {
          this.apicectomyCssArray[31] = true;
          this.apicectomyCssArray[32] = true;
          this.apicectomyCssArray[33] = true;
          this.apicectomyCssArray[34] = true;
          this.apicectomyCssArray[35] = true;
          this.apicectomyCssArray[36] = true;
          this.apicectomyCssArray[37] = true;
          this.apicectomyCssArray[38] = true;

        }
        if (this.Implant === true) {
          this.ImplantCSSArray[31] = true;
          this.ImplantCSSArray[32] = true;
          this.ImplantCSSArray[33] = true;
          this.ImplantCSSArray[34] = true;
          this.ImplantCSSArray[35] = true;
          this.ImplantCSSArray[36] = true;
          this.ImplantCSSArray[37] = true;
          this.ImplantCSSArray[38] = true;

        }
        if (this.RMesial === true) {
          this.RMesialCSSarray[31] = true;
          this.RMesialCSSarray[32] = true;
          this.RMesialCSSarray[33] = true;
          this.RMesialCSSarray[34] = true;
          this.RMesialCSSarray[35] = true;
          this.RMesialCSSarray[36] = true;
          this.RMesialCSSarray[37] = true;
          this.RMesialCSSarray[38] = true;

        }
        if (this.RDistal === true) {
          this.RDistalCSSarray[31] = true;
          this.RDistalCSSarray[32] = true;
          this.RDistalCSSarray[33] = true;
          this.RDistalCSSarray[34] = true;
          this.RDistalCSSarray[35] = true;
          this.RDistalCSSarray[36] = true;
          this.RDistalCSSarray[37] = true;
          this.RDistalCSSarray[38] = true;

        }
        if (this.RLingual === true) {
          this.RLingualCSSarray[31] = true;
          this.RLingualCSSarray[32] = true;
          this.RLingualCSSarray[33] = true;
          this.RLingualCSSarray[34] = true;
          this.RLingualCSSarray[35] = true;
          this.RLingualCSSarray[36] = true;
          this.RLingualCSSarray[37] = true;
          this.RLingualCSSarray[38] = true;

        }
        if (this.ROcclusal === true) {
          this.ROcclusalCSSarray[31] = true;
          this.ROcclusalCSSarray[32] = true;
          this.ROcclusalCSSarray[33] = true;
          this.ROcclusalCSSarray[34] = true;
          this.ROcclusalCSSarray[35] = true;
          this.ROcclusalCSSarray[36] = true;
          this.ROcclusalCSSarray[37] = true;
          this.ROcclusalCSSarray[38] = true;

        }
        if (this.RBuccal === true) {
          this.RBuccalCSSarray[31] = true;
          this.RBuccalCSSarray[32] = true;
          this.RBuccalCSSarray[33] = true;
          this.RBuccalCSSarray[34] = true;
          this.RBuccalCSSarray[35] = true;
          this.RBuccalCSSarray[36] = true;
          this.RBuccalCSSarray[37] = true;
          this.RBuccalCSSarray[38] = true;

        }

        if (this.CMesial === true) {
          this.CMesialCSSarray[31] = true;
          this.CMesialCSSarray[32] = true;
          this.CMesialCSSarray[33] = true;
          this.CMesialCSSarray[34] = true;
          this.CMesialCSSarray[35] = true;
          this.CMesialCSSarray[36] = true;
          this.CMesialCSSarray[37] = true;
          this.CMesialCSSarray[38] = true;

        }
        if (this.CDistal === true) {
          this.CDistalCSSarray[31] = true;
          this.CDistalCSSarray[32] = true;
          this.CDistalCSSarray[33] = true;
          this.CDistalCSSarray[34] = true;
          this.CDistalCSSarray[35] = true;
          this.CDistalCSSarray[36] = true;
          this.CDistalCSSarray[37] = true;
          this.CDistalCSSarray[38] = true;

        }
        if (this.CLingual === true) {
          this.CLingualCSSarray[31] = true;
          this.CLingualCSSarray[32] = true;
          this.CLingualCSSarray[33] = true;
          this.CLingualCSSarray[34] = true;
          this.CLingualCSSarray[35] = true;
          this.CLingualCSSarray[36] = true;
          this.CLingualCSSarray[37] = true;
          this.CLingualCSSarray[38] = true;

        }
        if (this.COcclusal === true) {
          this.COcclusalCSSarray[31] = true;
          this.COcclusalCSSarray[32] = true;
          this.COcclusalCSSarray[33] = true;
          this.COcclusalCSSarray[34] = true;
          this.COcclusalCSSarray[35] = true;
          this.COcclusalCSSarray[36] = true;
          this.COcclusalCSSarray[37] = true;
          this.COcclusalCSSarray[38] = true;

        }
        if (this.CBuccal === true) {
          this.CBuccalCSSarray[31] = true;
          this.CBuccalCSSarray[32] = true;
          this.CBuccalCSSarray[33] = true;
          this.CBuccalCSSarray[34] = true;
          this.CBuccalCSSarray[35] = true;
          this.CBuccalCSSarray[36] = true;
          this.CBuccalCSSarray[37] = true;
          this.CBuccalCSSarray[38] = true;

        }

        if (this.PMesial === true) {
          this.PMesialCSSarray[31] = true;
          this.PMesialCSSarray[32] = true;
          this.PMesialCSSarray[33] = true;
          this.PMesialCSSarray[34] = true;
          this.PMesialCSSarray[35] = true;
          this.PMesialCSSarray[36] = true;
          this.PMesialCSSarray[37] = true;
          this.PMesialCSSarray[38] = true;

        }
        if (this.PDistal === true) {
          this.PDistalCSSarray[31] = true;
          this.PDistalCSSarray[32] = true;
          this.PDistalCSSarray[33] = true;
          this.PDistalCSSarray[34] = true;
          this.PDistalCSSarray[35] = true;
          this.PDistalCSSarray[36] = true;
          this.PDistalCSSarray[37] = true;
          this.PDistalCSSarray[38] = true;

        }
        if (this.PLingual === true) {
          this.PLingualCSSarray[31] = true;
          this.PLingualCSSarray[32] = true;
          this.PLingualCSSarray[33] = true;
          this.PLingualCSSarray[34] = true;
          this.PLingualCSSarray[35] = true;
          this.PLingualCSSarray[36] = true;
          this.PLingualCSSarray[37] = true;
          this.PLingualCSSarray[38] = true;

        }
        if (this.POcclusal === true) {
          this.POcclusalCSSarray[31] = true;
          this.POcclusalCSSarray[32] = true;
          this.POcclusalCSSarray[33] = true;
          this.POcclusalCSSarray[34] = true;
          this.POcclusalCSSarray[35] = true;
          this.POcclusalCSSarray[36] = true;
          this.POcclusalCSSarray[37] = true;
          this.POcclusalCSSarray[38] = true;

        }
        if (this.PBuccal === true) {
          this.PBuccalCSSarray[31] = true;
          this.PBuccalCSSarray[32] = true;
          this.PBuccalCSSarray[33] = true;
          this.PBuccalCSSarray[34] = true;
          this.PBuccalCSSarray[35] = true;
          this.PBuccalCSSarray[36] = true;
          this.PBuccalCSSarray[37] = true;
          this.PBuccalCSSarray[38] = true;

        }

        if (this.PVeneer === true) {
          this.PVeneerCSSArray[31] = true;
          this.PVeneerCSSArray[32] = true;
          this.PVeneerCSSArray[33] = true;
          this.PVeneerCSSArray[34] = true;
          this.PVeneerCSSArray[35] = true;
          this.PVeneerCSSArray[36] = true;
          this.PVeneerCSSArray[37] = true;
          this.PVeneerCSSArray[38] = true;

        }
        if (this.POnlay === true) {
          this.POnlayCSSArray[31] = true;
          this.POnlayCSSArray[32] = true;
          this.POnlayCSSArray[33] = true;
          this.POnlayCSSArray[34] = true;
          this.POnlayCSSArray[35] = true;
          this.POnlayCSSArray[36] = true;
          this.POnlayCSSArray[37] = true;
          this.POnlayCSSArray[38] = true;

        }
        if (this.PCrown === true) {
          this.PCrownCSSArray[31] = true;
          this.PCrownCSSArray[32] = true;
          this.PCrownCSSArray[33] = true;
          this.PCrownCSSArray[34] = true;
          this.PCrownCSSArray[35] = true;
          this.PCrownCSSArray[36] = true;
          this.PCrownCSSArray[37] = true;
          this.PCrownCSSArray[38] = true;

        }

        if (this.Acrylic === true) {
          this.AcrylicCssArray[31] = true;
          this.AcrylicCssArray[32] = true;
          this.AcrylicCssArray[33] = true;
          this.AcrylicCssArray[34] = true;
          this.AcrylicCssArray[35] = true;
          this.AcrylicCssArray[36] = true;
          this.AcrylicCssArray[37] = true;
          this.AcrylicCssArray[38] = true;

        }
        if (this.ChromeCobalt === true) {
          this.ChromeCobaltCssArray[31] = true;
          this.ChromeCobaltCssArray[32] = true;
          this.ChromeCobaltCssArray[33] = true;
          this.ChromeCobaltCssArray[34] = true;
          this.ChromeCobaltCssArray[35] = true;
          this.ChromeCobaltCssArray[36] = true;
          this.ChromeCobaltCssArray[37] = true;
          this.ChromeCobaltCssArray[38] = true;

        }
        this.selectedTeethValue.push(31, 32, 33, 34, 35, 36, 37, 38);

      } else {
        this.teeth31 = false; this.teeth32 = false; this.teeth33 = false; this.teeth34 = false; this.teeth35 = false;
        this.teeth36 = false; this.teeth37 = false; this.teeth38 = false;
        const found31 = this.selectedTeethValue.findIndex(element => element === 31);
        this.BoneRegenerationCSSArray[31] = false;
        this.BoneRegenerationCSSArray[32] = false;
        this.BoneRegenerationCSSArray[33] = false;
        this.BoneRegenerationCSSArray[34] = false;
        this.BoneRegenerationCSSArray[35] = false;
        this.BoneRegenerationCSSArray[36] = false;
        this.BoneRegenerationCSSArray[37] = false;
        this.BoneRegenerationCSSArray[38] = false;

        this.RootCanalTreatmentCSSArray[31] = false;
        this.RootCanalTreatmentCSSArray[32] = false;
        this.RootCanalTreatmentCSSArray[33] = false;
        this.RootCanalTreatmentCSSArray[34] = false;
        this.RootCanalTreatmentCSSArray[35] = false;
        this.RootCanalTreatmentCSSArray[36] = false;
        this.RootCanalTreatmentCSSArray[37] = false;
        this.RootCanalTreatmentCSSArray[38] = false;

        this.apicectomyCssArray[31] = false;
        this.apicectomyCssArray[32] = false;
        this.apicectomyCssArray[33] = false;
        this.apicectomyCssArray[34] = false;
        this.apicectomyCssArray[35] = false;
        this.apicectomyCssArray[36] = false;
        this.apicectomyCssArray[37] = false;
        this.apicectomyCssArray[38] = false;

        this.ImplantCSSArray[31] = false;
        this.ImplantCSSArray[32] = false;
        this.ImplantCSSArray[33] = false;
        this.ImplantCSSArray[34] = false;
        this.ImplantCSSArray[35] = false;
        this.ImplantCSSArray[36] = false;
        this.ImplantCSSArray[37] = false;
        this.ImplantCSSArray[38] = false;

        this.RMesialCSSarray[31] = false;
        this.RMesialCSSarray[32] = false;
        this.RMesialCSSarray[33] = false;
        this.RMesialCSSarray[34] = false;
        this.RMesialCSSarray[35] = false;
        this.RMesialCSSarray[36] = false;
        this.RMesialCSSarray[37] = false;
        this.RMesialCSSarray[38] = false;

        this.RDistalCSSarray[31] = false;
        this.RDistalCSSarray[32] = false;
        this.RDistalCSSarray[33] = false;
        this.RDistalCSSarray[34] = false;
        this.RDistalCSSarray[35] = false;
        this.RDistalCSSarray[36] = false;
        this.RDistalCSSarray[37] = false;
        this.RDistalCSSarray[38] = false;

        this.RLingualCSSarray[31] = false;
        this.RLingualCSSarray[32] = false;
        this.RLingualCSSarray[33] = false;
        this.RLingualCSSarray[34] = false;
        this.RLingualCSSarray[35] = false;
        this.RLingualCSSarray[36] = false;
        this.RLingualCSSarray[37] = false;
        this.RLingualCSSarray[38] = false;

        this.ROcclusalCSSarray[31] = false;
        this.ROcclusalCSSarray[32] = false;
        this.ROcclusalCSSarray[33] = false;
        this.ROcclusalCSSarray[34] = false;
        this.ROcclusalCSSarray[35] = false;
        this.ROcclusalCSSarray[36] = false;
        this.ROcclusalCSSarray[37] = false;
        this.ROcclusalCSSarray[38] = false;

        this.RBuccalCSSarray[31] = false;
        this.RBuccalCSSarray[32] = false;
        this.RBuccalCSSarray[33] = false;
        this.RBuccalCSSarray[34] = false;
        this.RBuccalCSSarray[35] = false;
        this.RBuccalCSSarray[36] = false;
        this.RBuccalCSSarray[37] = false;
        this.RBuccalCSSarray[38] = false;

        this.CMesialCSSarray[31] = false;
        this.CMesialCSSarray[32] = false;
        this.CMesialCSSarray[33] = false;
        this.CMesialCSSarray[34] = false;
        this.CMesialCSSarray[35] = false;
        this.CMesialCSSarray[36] = false;
        this.CMesialCSSarray[37] = false;
        this.CMesialCSSarray[38] = false;

        this.CDistalCSSarray[31] = false;
        this.CDistalCSSarray[32] = false;
        this.CDistalCSSarray[33] = false;
        this.CDistalCSSarray[34] = false;
        this.CDistalCSSarray[35] = false;
        this.CDistalCSSarray[36] = false;
        this.CDistalCSSarray[37] = false;
        this.CDistalCSSarray[38] = false;

        this.CLingualCSSarray[31] = false;
        this.CLingualCSSarray[32] = false;
        this.CLingualCSSarray[33] = false;
        this.CLingualCSSarray[34] = false;
        this.CLingualCSSarray[35] = false;
        this.CLingualCSSarray[36] = false;
        this.CLingualCSSarray[37] = false;
        this.CLingualCSSarray[38] = false;

        this.COcclusalCSSarray[31] = false;
        this.COcclusalCSSarray[32] = false;
        this.COcclusalCSSarray[33] = false;
        this.COcclusalCSSarray[34] = false;
        this.COcclusalCSSarray[35] = false;
        this.COcclusalCSSarray[36] = false;
        this.COcclusalCSSarray[37] = false;
        this.COcclusalCSSarray[38] = false;

        this.CBuccalCSSarray[31] = false;
        this.CBuccalCSSarray[32] = false;
        this.CBuccalCSSarray[33] = false;
        this.CBuccalCSSarray[34] = false;
        this.CBuccalCSSarray[35] = false;
        this.CBuccalCSSarray[36] = false;
        this.CBuccalCSSarray[37] = false;
        this.CBuccalCSSarray[38] = false;


        this.PMesialCSSarray[31] = false;
        this.PMesialCSSarray[32] = false;
        this.PMesialCSSarray[33] = false;
        this.PMesialCSSarray[34] = false;
        this.PMesialCSSarray[35] = false;
        this.PMesialCSSarray[36] = false;
        this.PMesialCSSarray[37] = false;
        this.PMesialCSSarray[38] = false;

        this.PDistalCSSarray[31] = false;
        this.PDistalCSSarray[32] = false;
        this.PDistalCSSarray[33] = false;
        this.PDistalCSSarray[34] = false;
        this.PDistalCSSarray[35] = false;
        this.PDistalCSSarray[36] = false;
        this.PDistalCSSarray[37] = false;
        this.PDistalCSSarray[38] = false;

        this.PLingualCSSarray[31] = false;
        this.PLingualCSSarray[32] = false;
        this.PLingualCSSarray[33] = false;
        this.PLingualCSSarray[34] = false;
        this.PLingualCSSarray[35] = false;
        this.PLingualCSSarray[36] = false;
        this.PLingualCSSarray[37] = false;
        this.PLingualCSSarray[38] = false;

        this.POcclusalCSSarray[31] = false;
        this.POcclusalCSSarray[32] = false;
        this.POcclusalCSSarray[33] = false;
        this.POcclusalCSSarray[34] = false;
        this.POcclusalCSSarray[35] = false;
        this.POcclusalCSSarray[36] = false;
        this.POcclusalCSSarray[37] = false;
        this.POcclusalCSSarray[38] = false;

        this.PBuccalCSSarray[31] = false;
        this.PBuccalCSSarray[32] = false;
        this.PBuccalCSSarray[33] = false;
        this.PBuccalCSSarray[34] = false;
        this.PBuccalCSSarray[35] = false;
        this.PBuccalCSSarray[36] = false;
        this.PBuccalCSSarray[37] = false;
        this.PBuccalCSSarray[38] = false;


        this.PVeneerCSSArray[31] = false;
        this.PVeneerCSSArray[32] = false;
        this.PVeneerCSSArray[33] = false;
        this.PVeneerCSSArray[34] = false;
        this.PVeneerCSSArray[35] = false;
        this.PVeneerCSSArray[36] = false;
        this.PVeneerCSSArray[37] = false;
        this.PVeneerCSSArray[38] = false;

        this.POnlayCSSArray[31] = false;
        this.POnlayCSSArray[32] = false;
        this.POnlayCSSArray[33] = false;
        this.POnlayCSSArray[34] = false;
        this.POnlayCSSArray[35] = false;
        this.POnlayCSSArray[36] = false;
        this.POnlayCSSArray[37] = false;
        this.POnlayCSSArray[38] = false;

        this.PCrownCSSArray[31] = false;
        this.PCrownCSSArray[32] = false;
        this.PCrownCSSArray[33] = false;
        this.PCrownCSSArray[34] = false;
        this.PCrownCSSArray[35] = false;
        this.PCrownCSSArray[36] = false;
        this.PCrownCSSArray[37] = false;
        this.PCrownCSSArray[38] = false;

        this.AcrylicCssArray[31] = false;
        this.AcrylicCssArray[32] = false;
        this.AcrylicCssArray[33] = false;
        this.AcrylicCssArray[34] = false;
        this.AcrylicCssArray[35] = false;
        this.AcrylicCssArray[36] = false;
        this.AcrylicCssArray[37] = false;
        this.AcrylicCssArray[38] = false;

        this.ChromeCobaltCssArray[31] = false;
        this.ChromeCobaltCssArray[32] = false;
        this.ChromeCobaltCssArray[33] = false;
        this.ChromeCobaltCssArray[34] = false;
        this.ChromeCobaltCssArray[35] = false;
        this.ChromeCobaltCssArray[36] = false;
        this.ChromeCobaltCssArray[37] = false;
        this.ChromeCobaltCssArray[38] = false;

        this.selectedTeethValue.splice(found31, 8);
      }
      this.selectedTeethValueString = this.selectedTeethValue.join();
    }
  }


  // tab 1
  PreventionHygieneTeb(value) {
    this.treatment = value;
  }

  // tab 2
  Periotab(value) {
    this.treatment = value;
    if (this.selectedTeethValue.length > 0) {
      if (value === 'Bone Regeneration') {
        this.BoneRegeneration = true;
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.BoneRegenerationCSSArray[this.selectedTeethValue[i]] = true;
        }
      } else {
        this.BoneRegeneration = false;
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.BoneRegenerationCSSArray[this.selectedTeethValue[i]] = false;
        }
      }
    }
  }

  //  tab 3
  Endodontics(value) {
    this.treatment = value;
    this.rootCanalTreatment = false;
    this.apicectomy = false;
  }

  RootCanalTreatment(value) {
    this.rootCanalTreatment = true;
    this.apicectomy = false;
    this.RootCanalTreatmentValue = value;
    if (this.selectedTeethValue.length > 0 && this.rootCanalTreatment === true) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.RootCanalTreatmentCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  RootCanalReTreatment(value) {
    this.rootCanalTreatment = true;
    this.apicectomy = false;
    this.RootCanalTreatmentValue = value;
    if (this.selectedTeethValue.length > 0 && this.rootCanalTreatment === true) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.RootCanalTreatmentCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  RootCanalReTreatmentInstrumentRemoval(value) {
    this.rootCanalTreatment = true;
    this.apicectomy = false;
    this.RootCanalTreatmentValue = value;
    if (this.selectedTeethValue.length > 0 && this.rootCanalTreatment === true) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.RootCanalTreatmentCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  Apicectomy(value) {
    this.rootCanalTreatment = false;
    this.apicectomy = true;
    this.RootCanalTreatmentValue = value;
    if (this.selectedTeethValue.length > 0 && this.apicectomy === true) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.apicectomyCssArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  SurgeryImplants(value) {
    this.treatment = value;
    if (value === 'Implant') {
      this.Implant = true;
    }
  }


  // 
  RestorationVal(value) {
    this.treatment = value;
    this.RestorativeBleach = "";
    // if (value === "Restoration") {
    //   this.restorativeBleach = true;
    // } else {
    //   this.restorativeBleach = false;
    // }
  }

  Restoration(event, value) {
    this.RPost = false;
    this.RExternalBleach = false;
    this.RInternalBleach = false;
    this.RCoreBuildUp = false;
    this.provisionalRestoration = false;

    if (value === 'Buccal') {
      if (event.target.checked === true) {
        this.RBuccal = true;
        this.RestorationValue.push(value);
        this.RestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.RBuccalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.RBuccal = false;
        const findValue = this.RestorationValue.indexOf(value);
        this.RestorationValue.splice(findValue, 1);
        this.RestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.RBuccalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Distal') {
      if (event.target.checked === true) {
        this.RDistal = true;
        this.RestorationValue.push(value);
        this.RestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.RDistalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.RDistal = false;
        const findValue = this.RestorationValue.indexOf(value);
        this.RestorationValue.splice(findValue, 1);
        this.RestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.RDistalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Lingual') {
      if (event.target.checked === true) {
        this.RLingual = true;
        this.RestorationValue.push(value);
        this.RestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.RLingualCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.RLingual = false;
        const findValue = this.RestorationValue.indexOf(value);
        this.RestorationValue.splice(findValue, 1);
        this.RestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.RLingualCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Mesial') {
      if (event.target.checked === true) {
        this.RMesial = true;
        this.RestorationValue.push(value);
        this.RestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.RMesialCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.RMesial = false;
        const findValue = this.RestorationValue.indexOf(value);
        this.RestorationValue.splice(findValue, 1);
        this.RestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.RMesialCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Occlusal') {
      if (event.target.checked === true) {
        this.ROcclusal = true;
        this.RestorationValue.push(value);
        this.RestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.ROcclusalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.ROcclusal = false;
        const findValue = this.RestorationValue.indexOf(value);
        this.RestorationValue.splice(findValue, 1);
        this.RestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ROcclusalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    this.RestorativeBleach = "";
    if (this.RestorationValue && this.RestorationValue.length > 0) {
      this.RestorationValue.forEach(element => {
        this.RestorativeBleach += element + ", ";
      });
    }

  }

  Post(value) {
    this.treatment = value;
    this.ROcclusal = false;
    this.RMesial = false;
    this.RLingual = false;
    this.RDistal = false;
    this.RBuccal = false;
    this.RPost = true;
    this.RExternalBleach = false;
    this.RInternalBleach = false;
    this.RCoreBuildUp = false;
    this.provisionalRestoration = false;


  }
  Splint(value) {
    this.treatment = value;
  }

  ExternalBleach(value) {
    this.treatment = value;
    this.ROcclusal = false;
    this.RMesial = false;
    this.RLingual = false;
    this.RDistal = false;
    this.RBuccal = false;
    this.RPost = false;
    this.RExternalBleach = true;
    this.RInternalBleach = false;
    this.RCoreBuildUp = false;
    this.provisionalRestoration = false;
  }
  InternalBleach(value) {
    this.treatment = value;
    this.ROcclusal = false;
    this.RMesial = false;
    this.RLingual = false;
    this.RDistal = false;
    this.RBuccal = false;
    this.RPost = false;
    this.RExternalBleach = false;
    this.RInternalBleach = true;
    this.RCoreBuildUp = false;
    this.provisionalRestoration = false;


  }

  CoreBuildUp(value) {
    this.treatment = value;
    this.RCoreBuildUp = true;
    this.ROcclusal = false;
    this.RMesial = false;
    this.RLingual = false;
    this.RDistal = false;
    this.RBuccal = false;
    this.RPost = false;
    this.RExternalBleach = false;
    this.RInternalBleach = false;
    this.provisionalRestoration = false;

  }

  CoreBuildUpCheckbox(event, value) {
    if (value === 'Buccal') {
      if (event.target.checked === true) {
        this.CBuccal = true;
        this.CoreBuildUpValue.push(value);
        this.CoreBuildUpValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.CBuccalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.CBuccal = false;
        const findValue = this.CoreBuildUpValue.indexOf(value);
        this.CoreBuildUpValue.splice(findValue, 1);
        this.CoreBuildUpValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.CBuccalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Distal') {
      if (event.target.checked === true) {
        this.CDistal = true;
        this.CoreBuildUpValue.push(value);
        this.CoreBuildUpValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.CDistalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.CDistal = false;
        const findValue = this.CoreBuildUpValue.indexOf(value);
        this.CoreBuildUpValue.splice(findValue, 1);
        this.CoreBuildUpValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.CDistalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Lingual') {
      if (event.target.checked === true) {
        this.CLingual = true;
        this.CoreBuildUpValue.push(value);
        this.CoreBuildUpValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.CLingualCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.CLingual = false;
        const findValue = this.CoreBuildUpValue.indexOf(value);
        this.CoreBuildUpValue.splice(findValue, 1);
        this.CoreBuildUpValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.CLingualCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Mesial') {
      if (event.target.checked === true) {
        this.CMesial = true;
        this.CoreBuildUpValue.push(value);
        this.CoreBuildUpValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.CMesialCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.CMesial = false;
        const findValue = this.CoreBuildUpValue.indexOf(value);
        this.CoreBuildUpValue.splice(findValue, 1);
        this.CoreBuildUpValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.CMesialCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Occlusal') {
      if (event.target.checked === true) {
        this.COcclusal = true;
        this.CoreBuildUpValue.push(value);
        this.CoreBuildUpValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.COcclusalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.COcclusal = false;
        const findValue = this.CoreBuildUpValue.indexOf(value);
        this.CoreBuildUpValue.splice(findValue, 1);
        this.CoreBuildUpValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.COcclusalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    this.RestorativeBleach = "";
    if (this.CoreBuildUpValue && this.CoreBuildUpValue.length > 0) {
      this.CoreBuildUpValue.forEach(element => {
        this.RestorativeBleach += element + ", ";
      });
    }
  }

  ProvisionalRestoration(value) {
    this.treatment = value;
    this.provisionalRestoration = true;
    this.RCoreBuildUp = false;
    this.ROcclusal = false;
    this.RMesial = false;
    this.RLingual = false;
    this.RDistal = false;
    this.RBuccal = false;
    this.RPost = false;
    this.RExternalBleach = false;
    this.RInternalBleach = false;
  }

  ProvisionalRestorationCheckbox(event, value) {
    if (value === 'Buccal') {
      if (event.target.checked === true) {
        this.PBuccal = true;
        this.ProvisionalRestorationValue.push(value);
        this.ProvisionalRestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.PBuccalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.PBuccal = false;
        const findValue = this.ProvisionalRestorationValue.indexOf(value);
        this.ProvisionalRestorationValue.splice(findValue, 1);
        this.ProvisionalRestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PBuccalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Distal') {
      if (event.target.checked === true) {
        this.PDistal = true;
        this.ProvisionalRestorationValue.push(value);
        this.ProvisionalRestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.PDistalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.PDistal = false;
        const findValue = this.ProvisionalRestorationValue.indexOf(value);
        this.ProvisionalRestorationValue.splice(findValue, 1);
        this.ProvisionalRestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PDistalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Lingual') {
      if (event.target.checked === true) {
        this.PLingual = true;
        this.ProvisionalRestorationValue.push(value);
        this.ProvisionalRestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.PLingualCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.PLingual = false;
        const findValue = this.ProvisionalRestorationValue.indexOf(value);
        this.ProvisionalRestorationValue.splice(findValue, 1);
        this.ProvisionalRestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PLingualCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Mesial') {
      if (event.target.checked === true) {
        this.PMesial = true;
        this.ProvisionalRestorationValue.push(value);
        this.ProvisionalRestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.PMesialCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.PMesial = false;
        const findValue = this.ProvisionalRestorationValue.indexOf(value);
        this.ProvisionalRestorationValue.splice(findValue, 1);
        this.ProvisionalRestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.PMesialCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    if (value === 'Occlusal') {
      if (event.target.checked === true) {
        this.POcclusal = true;
        this.ProvisionalRestorationValue.push(value);
        this.ProvisionalRestorationValue.join();
        if (this.selectedTeethValue.length > 0) {
          for (var i = 0; i < this.selectedTeethValue.length; i++) {
            this.POcclusalCSSarray[this.selectedTeethValue[i]] = true;
          }
        }
      } else {
        this.POcclusal = false;
        const findValue = this.ProvisionalRestorationValue.indexOf(value);
        this.ProvisionalRestorationValue.splice(findValue, 1);
        this.ProvisionalRestorationValue.toString();
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.POcclusalCSSarray[this.selectedTeethValue[i]] = false;
        }
      }
    }
    this.RestorativeBleach = "";
    if (this.ProvisionalRestorationValue && this.ProvisionalRestorationValue.length > 0) {
      this.ProvisionalRestorationValue.forEach(element => {
        this.RestorativeBleach += element + ", ";
      });
    }
  }

  ProsthodonticsVeneer(value) {
    this.treatment = value;
    this.PVeneer = true;
    this.POnlay = false;
    this.PCrown = false;
    this.DentureVar = false;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.PVeneerCSSArray[this.selectedTeethValue[i]] = true;
      }
    }

  }
  ProsthodonticsOnlay(value) {
    this.treatment = value;
    this.POnlay = true;
    this.PVeneer = false;
    this.PCrown = false;
    this.DentureVar = false;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.POnlayCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  ProsthodonticsTag(value) {
    this.treatment = value;
  }
  ProsthodonticsCrown(value) {
    this.treatment = value;
    this.PCrown = true;
    this.POnlay = false;
    this.PVeneer = false;
    this.DentureVar = false;
    if (this.selectedTeethValue.length > 0) {
      for (var i = 0; i < this.selectedTeethValue.length; i++) {
        this.PCrownCSSArray[this.selectedTeethValue[i]] = true;
      }
    }
  }

  Denture(value) {
    this.treatment = value;
    this.PCrown = false;
    this.POnlay = false;
    this.PVeneer = false;
    this.DentureVar = true;
  }

  DentureRadio(value) {
    if (value === 'Chrome Cobalt') {
      this.ChromeCobalt = true;
      this.Acrylic = false;
      const findvalue = this.DentureValue.indexOf('Chrome Cobalt');
      const findDvalue = this.DentureValue.indexOf('Acrylic');
      if (findvalue === -1) { this.DentureValue.push(value); }
      if (findDvalue !== -1) { this.DentureValue.splice(findDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.ChromeCobalt === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ChromeCobaltCssArray[this.selectedTeethValue[i]] = true;
        }
      }

      if (this.selectedTeethValue.length > 0 && this.Acrylic === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.AcrylicCssArray[this.selectedTeethValue[i]] = false;
        }
      }

    } else if (value === 'Acrylic') {
      this.ChromeCobalt = false;
      this.Acrylic = true;
      const findvalue = this.DentureValue.indexOf('Acrylic');
      const findDvalue = this.DentureValue.indexOf('Chrome Cobalt');
      if (findvalue === -1) { this.DentureValue.push(value); }
      if (findDvalue !== -1) { this.DentureValue.splice(findDvalue, 1); }
      if (this.selectedTeethValue.length > 0 && this.Acrylic === true) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.AcrylicCssArray[this.selectedTeethValue[i]] = true;
        }
      }
      if (this.selectedTeethValue.length > 0 && this.ChromeCobalt === false) {
        for (var i = 0; i < this.selectedTeethValue.length; i++) {
          this.ChromeCobaltCssArray[this.selectedTeethValue[i]] = false;
        }
      }

    }
  }

  //  othro tab plan section

  OrthoTab(value) {
    this.treatment = value;
    if (value === 'Fixed Braces') { this.typeB = true; } else if (value !== 'Fixed Braces') { this.typeB = false; }
  }

  FixedBraces(value) {
    this.type = value;
  }

  // Tmj Occlusion Muscles
  TmjOcclusionMuscles(value) {
    this.treatment = value;
  }

  // Other
  Other(value) {
    this.treatment = value;
  }

  pl_form(tablename, price, date, message, stage) {

    this.bodydata.PatientID = this.id; this.bodydata.tablename = tablename; this.bodydata.price = price;
    this.bodydata.date = date; this.bodydata.message = message; this.bodydata.stage = stage;
    this.bodydata.SelectedTeeth = this.selectedTeethValueString;
    console.log(this.bodydata, 'this.bodydata');
    this.adminService.pl_form(this.bodydata).subscribe(data => {
      this.showSuccess('teeth Plan', 'data saved');
      console.log(data, 'pl_form');
    });
    var surface = "";
    if (tablename === "Restoration" || tablename === "Core Build Up" || tablename === "Provisional Restoration") {
      surface = this.RestorativeBleach;
    } else if (tablename === "Root Canal Treatment" || tablename === "Root Canal Re-Treatment"
      || tablename === "Root Canal Re-Treatment & Instrument Removal") {
      surface = this.RootCanalTreatmentValue;
    }
    this.onAddItemClicked(tablename, price, date, surface, message, stage);
    this.treatment = "";
    this.type = "";
    this.RootCanalTreatmentValue = "";
    this.selectedTeethValueString = "";
    this.Price.nativeElement.value = "";
    this.date.nativeElement.value = "";
    this.message.nativeElement.value = "";
    this.RestorativeBleach = "";
  }

  onAddItemClicked(tag: any, price: any, date: Date, surface: any, observation: any, stage: any) {
    var plan: Plan = {
      Tag: tag, Teeths: this.selectedTeethValueString, Price: (+price), Date: date,
      Surface: surface, Observation: observation,
    };
    var index = this.planService.planStages.findIndex((item) => item.StageName === stage);
    if (index > -1) {
      this.planService.planStages[index]
      this.planService.planStages[index].StageTotal = this.planService.planStages[index].StageTotal + (+price);
      this.planService.planStages[index].Plans.push(plan);
    } else {
      var planStage: PlanStages = {
        StageName: stage, Plans: [plan], StageTotal: (+price)
      }
      this.planService.planStages.push(planStage);
    }

    this.showSuccess('Item Created', 'Item added with sucess to plans');
    //this.pdfComp = new PdfContainerComponent(this.planService,this.element);
    //this.pdfComp.getUpdatedTeethsPlan();
  }

  showSuccess(display, Message) {
    this.toastrService.success(display, Message);
  }

  showFailure(error, Message) {
    this.toastrService.error(error, Message);
  }

  onStageValueChanged(event) {
    if (event.target.value === "Create New Stage") {

      this.isCreateStageClicked = true;
      const dialogRef = this.dialog.open(StagePopupComponent, {
        width: '350px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    }
    else
      this.isCreateStageClicked = false;

  }
}