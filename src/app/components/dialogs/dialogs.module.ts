import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule],
})
export class DialogsModule {}
