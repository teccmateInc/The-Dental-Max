import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnChanges {

  availableColors: string[];

  @Input() selected: string;
  @Input() colors: string[];
  @Input() pickerPosition = 'top-left';
  @Output() change = new EventEmitter<string>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.availableColors = (this.colors.includes(this.selected) || !this.selected) ? [...this.colors] : [...this.colors, this.selected];
  }
}