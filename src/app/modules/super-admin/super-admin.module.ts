import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { TestSuperAdminComponent } from './test-super-admin/test-super-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { SuperAdminNavbarComponent } from './super-admin-navbar/super-admin-navbar.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';


const routes: Routes = [
  {
    path: '', component: SuperAdminComponent,
    children: [
      {
        path: '', component: SuperAdminDashboardComponent
      },
      {
        path: 'create-admin/:id', component: CreateAdminComponent
      },
      {
        path: 'company-details', component: CompanyDetailComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperAdminDashboardComponent,
    TestSuperAdminComponent,
    CreateAdminComponent,
    SuperAdminNavbarComponent,
    CompanyDetailComponent
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
  ],
  exports: [RouterModule]
})
export class SuperAdminModule { }
