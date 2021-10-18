import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Odontogram } from 'src/app/models/odontogram.model';
//import { Tooth } from '../plan-details/plan-details.component';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css']
})
export class OdontogramComponent implements OnInit {
  q1Selected$: Observable<boolean>;
  q2Selected$: Observable<boolean>;
  q3Selected$: Observable<boolean>;
  q4Selected$: Observable<boolean>;

  @Input() teeth: Odontogram = null;
  @Input() editable = true;
  @Input() showNumbering = false;
  @Input() numberSystem: string;
  @Input() active = true;
  isTeethsExist = false;

  // constructor(private store: Store<fromRoot.AppState>) {
  //   this.q1Selected$ = store.select(fromRoot.getOdontogramQ1Selected);
  //   this.q2Selected$ = store.select(fromRoot.getOdontogramQ2Selected);
  //   this.q3Selected$ = store.select(fromRoot.getOdontogramQ3Selected);
  //   this.q4Selected$ = store.select(fromRoot.getOdontogramQ4Selected);
  // }

  constructor() { }
  ngOnInit() {
    if (this.teeth)
      this.isTeethsExist = true;
  }

  // clearSelection() {
  //   this.store.dispatch(new OdontogramActions.ClearTeethSelectionAction());
  // }

  // toggleQuadrant1() {
  //   this.store.dispatch(new OdontogramActions.ToggleQuadrant1Action());
  // }

  // toggleQuadrant2() {
  //   this.store.dispatch(new OdontogramActions.ToggleQuadrant2Action());
  // }

  // toggleQuadrant3() {
  //   this.store.dispatch(new OdontogramActions.ToggleQuadrant3Action());
  // }

  // toggleQuadrant4() {
  //   this.store.dispatch(new OdontogramActions.ToggleQuadrant4Action());
  // }

  toggleTooth(toothNumber) {
    // if (this.editable) {
    //   this.store.dispatch(new OdontogramActions.ToggleToothAction(toothNumber));
    // }
  }
}