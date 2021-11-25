import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainLayoutRoutingModule} from './main-layout-routing.module';
import {MainLayoutComponent} from "./main-layout.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    // MatPaginator, MatSort, MatDialog, MatTableDataSource
  ]
})
export class MainLayoutModule {
}
