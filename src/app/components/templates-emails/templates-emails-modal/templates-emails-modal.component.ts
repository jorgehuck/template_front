import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplatesEmailsService } from '../../../services/templates-emails.service';
import { Email } from 'src/app/contracts/interfaces/email';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-templates-emails-modal',
  templateUrl: './templates-emails-modal.component.html',
  styleUrls: ['./templates-emails-modal.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class TemplatesEmailsModalComponent {
  @ViewChild('createRTE')
  private rteObj: RichTextEditorComponent;

  selected = '1';
  formVisible = true;
  loading = false;
  // arreglos
  listOrigenes: any = [];
  listTiposTemplates: any = [];

  formGroup: FormGroup;

  /**
   *
   * @param templateService
   * @param dialogRef
   * @param data
   */
  constructor(
    private templateService: TemplatesEmailsService,
    public dialogRef: MatDialogRef<TemplatesEmailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('TemplatesEmailsModalComponent :: constructor', this.data);

    this.listOrigenes = this.data.origenes;
    this.listTiposTemplates = this.data.tipos;
  }

  /**
   * 
   */
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      contenido: new FormControl(null, Validators.required),
      origen_id: new FormControl(null, Validators.required),
      tipo_template_id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
    });
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
    this.loading = true;

    console.log('onSubmit', this.formGroup.value);

    try {
      if (this.formGroup.value.contenido) {
        // TODO evaluar si tiene saltos de lineas
        // reemplazar por <br>
        // console.log('contenido:', this.formGroup.value.contenido.replaceAll('\n', '<br>'));

        // this.formGroup.patchValue({
        //   contenido: this.formGroup.value.contenido.replaceAll('\n', '<br>')
        // });

        this.templateService
          .addTemplate({ ...this.formGroup.value })
          .subscribe((newTemplate) => {
            console.log('response: ', newTemplate);

            // cierro el modal y retorno el nuevo email
            this.dialogRef.close(newTemplate);
            this.loading = false;
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
  setValue(input: Email) {
    this.formGroup.patchValue({
      email: input.email,
      origen: `${input.origen_id}`,
    });
  }
}
