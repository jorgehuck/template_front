import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MainLayoutModule } from './layout/main-layout/main-layout.module';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'response/:id',
    loadChildren: () =>
      import('./views/response/response.module').then((m) => m.ResponseModule),
  },
  {
    path: 'reclamos',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./views/reclamos-grid/reclamos-grid.module').then(
        (m) => m.ReclamosGridModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'emails',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./views/emails-grid/emails-grid.module').then(
        (m) => m.EmailsGridModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./views/templates-emails-grid/templates-emails-grid.module').then(
        (m) => m.TemplatesEmailsGridModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/reclamos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MainLayoutModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
