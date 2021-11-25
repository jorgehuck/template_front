import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./main-layout.component";

const routes: Routes = [
  // {path: '', component: MainLayoutComponent}
  {path: '', redirectTo: '/reclamos', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {
}
