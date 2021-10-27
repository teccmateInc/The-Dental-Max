import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent implements OnInit {
  LoggedOnUser: any;
  public app: any;
  public headerThemes: any;
  public changeHeader: any;
  public sidenavThemes: any;
  public changeSidenav: any;
  public headerSelected: any;
  public sidenavSelected: any;
  public searchActived: any;
  public searchModel: any;

  constructor(private _router: Router, private _route: ActivatedRoute) {
      this.app = {
          layout: {
              sidePanelOpen: false,
              isMenuOpened: true,
              isMenuCollapsed: true,
              themeConfigOpen: false,
              rtlActived: false,
              searchActived: false
          }
      };

      this.headerThemes = ['header-default', 'header-primary', 'header-info', 'header-success', 'header-danger', 'header-dark'];
      this.changeHeader = changeHeader;

      function changeHeader(headerTheme) {
          this.headerSelected = headerTheme;
      }

      this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
      this.changeSidenav = changeSidenav;

      function changeSidenav(sidenavTheme) {
          this.sidenavSelected = sidenavTheme;
      }
  }


  ngOnInit() {
    this.LoggedOnUser =  JSON.parse(localStorage.getItem('LoggedINUser'));
    this.headerSelected = 'header-primary';
    this.app.layout.isMenuCollapsed = false;
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
