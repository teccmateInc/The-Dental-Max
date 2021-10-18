import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
// import { AuthenticationLayoutComponent } from './common/authentication-layout.component';
import { LoginComponent } from './common/login.component';
import { ForgetPasswordComponent } from './common/forget-password.component';

import { Page404Component } from './common/page404.component';
import { Page500Component } from './common/page500.component';
import { SignupComponent } from './common/signup.component';

export const AppRoutes: Routes = [
    {
    path: '',
    component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
      },
    {
      path: '500',
      component: Page500Component
      },
    {

        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule',
              },
              // {
              //   path: 'super-admin',
              //   loadChildren: './super-admin/super-admin.module#SuperAdminModule',
              // },
              // {
              //   path: 'company',
              //   loadChildren: './company/company.module#CompanyModule',
              //   runGuardsAndResolvers: 'always',
              // },
              // {
              //   path: 'shop',
              //   loadChildren: './shop/shop.module#ShopModule',
              //   runGuardsAndResolvers: 'always',
              // },
              {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                runGuardsAndResolvers: 'always',
              },
                    ]
    },
    {
      path: '**',
      component: Page404Component
      }
];

