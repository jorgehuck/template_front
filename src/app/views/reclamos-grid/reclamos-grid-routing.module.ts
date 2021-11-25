import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReclamosGridComponent} from "./reclamos-grid.component";

const routes: Routes = [
  {path: '', component: ReclamosGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamosGridRoutingModule {
}
