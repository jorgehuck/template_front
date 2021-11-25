import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './emails.component';

const routes: Routes = [
  { path: '', redirectTo: 'emails', pathMatch: 'full' },
  { path: 'emails', component: EmailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsRoutingModule { }
