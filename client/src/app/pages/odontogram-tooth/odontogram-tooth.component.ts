import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { Tooth } from '../plan-details/plan-details.component';
import { Tooth } from 'src/app/models/odontogram.model';

@Component({
  selector: 'app-odontogram-tooth',
  templateUrl: './odontogram-tooth.component.html',
  styleUrls: ['./odontogram-tooth.component.css']
})
export class OdontogramToothComponent implements OnInit {
  @Input("tooth") tooth: Tooth;
  @Input() disabled = true;
  @Input() showNumbering = false;
  @Input() numberSystem: string;
  @Output() toggleTooth = new EventEmitter<number>();
  isToothExist = false;

  constructor() {
  }

  ngOnInit() {
    if (this.tooth)
      this.isToothExist = true;
  }

}