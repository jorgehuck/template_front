import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailsGridComponent } from './emails-grid.component';
import { EmailsGridRoutingModule } from './emails-grid-routing.module';
import { EmailsModule } from 'src/app/components/emails/emails.module';

@NgModule({
  declarations: [
    EmailsGridComponent,
  ],
  imports: [
    CommonModule,
    EmailsGridRoutingModule,
    EmailsModule,
  ]
})
export class EmailsGridModule { }
