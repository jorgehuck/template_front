import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResponseComponent} from "./response.component";

const routes: Routes = [
  {path: '', component: ResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseRoutingModule {
}
