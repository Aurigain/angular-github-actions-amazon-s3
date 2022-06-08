import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { SuperAdminNavbarComponent } from './super-admin-navbar/super-admin-navbar.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';

const routes: Routes = [
  {
    path: '', component: SuperAdminComponent,
    children: [
      {
        path: '', component: SuperAdminDashboardComponent
      },
      // {
      //   path: 'company-detail', component: CompanyDetailComponent
      // },
      {
        path: 'create-admin/:id', component: CreateAdminComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperAdminDashboardComponent,
    SuperAdminNavbarComponent,
    CompanyDetailComponent,
    CreateAdminComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgPipesModule,
    RouterModule.forChild(routes),
  ]
})
export class SuperAdminModule { }
