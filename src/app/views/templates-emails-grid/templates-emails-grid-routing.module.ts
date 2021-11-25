import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplatesEmailsGridComponent} from "./templates-emails-grid.component";

const routes: Routes = [
  {path: '', component: TemplatesEmailsGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesEmailsGridRoutingModule {
}
