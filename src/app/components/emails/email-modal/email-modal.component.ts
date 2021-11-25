import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../services/email.service';
import { Email } from 'src/app/contracts/interfaces/email';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css'],
})
export class EmailModalComponent implements OnInit {
  selected = '1';
  formVisible = true;

  formGroup = new FormGroup({
    email: new FormControl([
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]),
    origen_id: new FormControl(Validators.required),
  });

  /**
   *
   * @param emailService
   * @param dialogRef
   * @param data
   */
  constructor(
    private emailService: EmailService,
    public dialogRef: MatDialogRef<EmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   *
   */
  ngOnInit(): void {

  }

  /**
   *
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * onSubmit:
   * Envia el request de creacion al back
   */
  onSubmit() {
    // Si el form no es válido no pasa
    if (!this.formGroup.valid) return;

    this.formVisible = false;

    console.log('onSubmit', this.formGroup.value);
    const { email, origen_id } = this.formGroup.value;

    try {
      if (email) {
        this.emailService
          .addEmail({ email, origen_id })
          .subscribe((newEmail) => {
            console.log('response: ', newEmail);
            // this.nuevoEmail.emit(newEmail);

            // cierro el modal y retorno el nuevo email
            this.dialogRef.close(newEmail);
          });
      }
    } catch (e) {
      console.error('atrapado');
      // TODO informar el error
    } finally {
      this.formGroup.reset();
      this.formVisible = true;
    }
  }

  /**
   * Actualizo los datos
   */
  setValue( input: Email) {

    this.formGroup.patchValue({
      email: input.email,
      origen: `${input.origen_id}`,
    });
  }
}
