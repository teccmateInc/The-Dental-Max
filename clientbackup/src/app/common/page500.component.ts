import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.css']
})
export class Page500Component implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Relinksys | 500');
  }

  ngOnInit() {
  }

}
