import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmailsGridComponent} from "./emails-grid.component";

const routes: Routes = [
  {path: '', component: EmailsGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsGridRoutingModule {
}
