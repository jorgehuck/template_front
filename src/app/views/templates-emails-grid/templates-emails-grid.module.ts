import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesEmailsGridComponent } from './templates-emails-grid.component';
import { TemplatesEmailsGridRoutingModule } from './templates-emails-grid-routing.module';
import { TemplatesEmailsModule } from 'src/app/components/templates-emails/templates-emails.module';

@NgModule({
  declarations: [
    TemplatesEmailsGridComponent,
  ],
  imports: [
    CommonModule,
    TemplatesEmailsGridRoutingModule,
    TemplatesEmailsModule,
  ]
})
export class TemplatesEmailsGridModule { }
