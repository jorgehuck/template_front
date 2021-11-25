import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReclamosComponent} from "./reclamos.component";

const routes: Routes = [
  {path: '', component: ReclamosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamosRoutingModule { }
