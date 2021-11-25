import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../shared/shared.module';

// Angular material
import {NavbarComponent} from "./navbar/navbar.component";
import {RequestsComponent} from './requests/requests.component';
import {ResponseComponent} from "../response/response.component";

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    RequestsComponent,
    ResponseComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]

})
export class DashboardModule {
}
