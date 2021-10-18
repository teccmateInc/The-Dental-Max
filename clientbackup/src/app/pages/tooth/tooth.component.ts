import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tooth } from "../plan-details/plan-details.component";

@Component({
	selector: 'app-tooth',
	templateUrl: './tooth.component.html',
	styleUrls: ['./tooth.component.css']
})
export class ToothComponent implements OnInit {

	@Input("tooth") public tooth: Tooth;
	@Output() public toothEmitter = new EventEmitter<Tooth>();

	constructor() { }

	ngOnInit() {
		//console.log("ToothComponent", this.tooth);
	}

	public updateTooth(tooth: Tooth) {
		console.log("upd in child");
		this.toothEmitter.next(tooth);
	}

}
