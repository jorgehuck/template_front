import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesEmailsRoutingModule } from './templates-emails-routing.module';
import { TemplatesEmailsComponent } from './templates-emails.component';
import { SharedModule } from '../shared/shared.module';

// Angular material
import { RequestsComponent } from './requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatesEmailsModalComponent } from './templates-emails-modal/templates-emails-modal.component';
import { TemplatesEmailsEditModalComponent } from './templates-emails-edit-modal/templates-emails-edit-modal.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    TemplatesEmailsComponent,
    RequestsComponent,
    TemplatesEmailsModalComponent,
    TemplatesEmailsEditModalComponent
  ],
  imports: [
    RichTextEditorModule,
    CommonModule,
    TemplatesEmailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TemplatesEmailsComponent,
  ]
  
})
export class TemplatesEmailsModule {}
