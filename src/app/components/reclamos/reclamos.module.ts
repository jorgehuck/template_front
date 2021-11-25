import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ReclamosRoutingModule } from './reclamos-routing.module';
import { ReclamosComponent } from './reclamos.component';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReclamosModalComponent } from './reclamos-modal/reclamos-modal.component';

@NgModule({
  declarations: [
    ReclamosComponent,
    RequestsComponent,
    ReclamosModalComponent,
  ],
  imports: [
    CommonModule,
    ReclamosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ReclamosComponent
  ]
  
})
export class ReclamosModule {}
