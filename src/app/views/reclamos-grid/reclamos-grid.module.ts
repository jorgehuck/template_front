import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamosGridRoutingModule } from './reclamos-grid-routing.module';
import { ReclamosGridComponent } from './reclamos-grid.component';
import { ReclamosModule } from 'src/app/components/reclamos/reclamos.module';


@NgModule({
  declarations: [ReclamosGridComponent],
  imports: [
    CommonModule,
    ReclamosGridRoutingModule,
    ReclamosModule
  ],
})
export class ReclamosGridModule {}
