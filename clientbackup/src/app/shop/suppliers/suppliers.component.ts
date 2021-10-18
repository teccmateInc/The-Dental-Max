import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<SuppliersComponent> = new Subject();

  constructor() { }

  ngOnInit() {
  }

}
