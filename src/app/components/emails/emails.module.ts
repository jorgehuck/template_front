import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailsRoutingModule } from './emails-routing.module';
import { EmailsComponent } from './emails.component';
import { SharedModule } from '../shared/shared.module';

// Angular material
import { RequestsComponent } from './requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { EmailEditModalComponent } from './email-edit-modal/email-edit-modal.component';

@NgModule({
  declarations: [
    EmailsComponent,
    RequestsComponent,
    EmailModalComponent,
    EmailEditModalComponent
  ],
  imports: [
    CommonModule,
    EmailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EmailsComponent
  ]
  
})
export class EmailsModule {}
