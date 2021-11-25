import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesEmailsComponent } from './templates-emails.component';

const routes: Routes = [
  { path: '', redirectTo: 'emails', pathMatch: 'full' },
  { path: 'emails', component: TemplatesEmailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesEmailsRoutingModule { }
