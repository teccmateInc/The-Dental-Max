import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
// Layout Modules
import { CommonLayoutComponent } from './common/common-layout.component';
// import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

// Directives
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Routing Module
import { AppRoutes } from './app.routing';
// webcam
import { WebcamModule } from 'ngx-webcam';

// App Component
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { cardPortletRefresh, cardPortletDelete, Cards_Directives } from './shared/directives/cards.directive';
import { registerLocaleData } from '@angular/common';
import localeHi from '@angular/common/locales/hi';
import localeHiExtra from '@angular/common/locales/extra/hi';
import { NgxPrintModule } from 'ngx-print';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OpenLinkInNewWindowDirective } from './olinw.directive';
import { QzTrayService } from './qz-tray.service';
import { LoginComponent } from './common/login.component';
import { ForgetPasswordComponent } from './common/forget-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Page404Component } from './common/page404.component';
import { Page500Component } from './common/page500.component';
import { SignupComponent } from './common/signup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMaterialModule } from './material-module';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

registerLocaleData(localeHi, 'hi-HI', localeHiExtra);

@NgModule({
  imports: [
    AngularMaterialModule,
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, onSameUrlNavigation: 'reload' }),
    NgbModule,
    FormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    CommonModule,
    NgxBarcodeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TagInputModule,
    NgxPrintModule,
    WebcamModule,
    MomentModule,
    Ng2SearchPipeModule,
    NgxSmartModalModule.forChild(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true,
      progressAnimation: 'increasing',
      easing: 'ease-out',
      closeButton: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    Sidebar_Directives,
    cardPortletRefresh,
    Cards_Directives,
    cardPortletDelete,
    OpenLinkInNewWindowDirective,
    LoginComponent,
    ForgetPasswordComponent,
    Page404Component,
    Page500Component,
    SignupComponent,
  ],
  providers: [NgxSmartModalService, QzTrayService, { provide: LOCALE_ID, useValue: 'en-in' }],
  bootstrap: [AppComponent]
})


export class AppModule { }
