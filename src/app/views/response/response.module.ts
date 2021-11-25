import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseRoutingModule } from './response-routing.module';
import { ResponseComponent } from './response.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [ResponseComponent],
  imports: [
    RichTextEditorModule,
    CommonModule,
    ResponseRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class ResponseModule {}
