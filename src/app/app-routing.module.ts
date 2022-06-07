import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule),
    // canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      // useHash: true
    }),

  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
