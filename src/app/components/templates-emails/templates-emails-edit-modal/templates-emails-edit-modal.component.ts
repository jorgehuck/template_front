import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplatesEmailsService } from '../../../services/templates-emails.service';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-templates-email-edit-modal',
  templateUrl: './templates-emails-edit-modal.component.html',
  styleUrls: ['./templates-emails-edit-modal.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class TemplatesEmailsEditModalComponent implements OnInit {
  @ViewChild('updateRTE')
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
   * @param emailService
   * @param dialogRef
   * @param data
   */
  constructor(
    private templateService: TemplatesEmailsService,
    public dialogRef: MatDialogRef<TemplatesEmailsEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.listOrigenes = this.data.origenes;
    this.listTiposTemplates = this.data.tipos;
    
    console.log('constructor');
  }

  /**
   *
   */
  ngOnInit(): void {

    this.formGroup = new FormGroup({
      id: new FormControl(),
      contenido: new FormControl(null, Validators.required),
      origen_id: new FormControl(null, Validators.required),
      tipo_template_id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
    });
    this.setValue(this.data.template);

    console.log('ngOnInit');
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
    const { value } = this.formGroup;

    try {
      if (value) {
        this.templateService
          .updateTemplate(value)
          .subscribe((newTemplate: any) => {
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
  setValue(input: any) {
    console.log('setValue: ', input);

    this.formGroup.patchValue({
      id: input.id,
      contenido: `${input.contenido}`,
      nombre: `${input.nombre}`,
      origen_id: `${input.origen_id}`,
      tipo_template_id: `${input.tipo_template_id}`,
    });
  }
}
