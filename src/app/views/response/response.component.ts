import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamoService } from '../../services/reclamo.service';
import { RespuestaService } from '../../services/respuesta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';
import { TemplatesEmailsService } from '../../services/templates-emails.service';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class ResponseComponent {
  public show_message = false;
  public message = 'Se Respondió el Reclamo exitosamente.';
  public fileName = '';
  public fileB64 = '';
  public requiredFileType =
    'application/pdf,application/vnd.ms-excel,image/*,.doc,.docx,application/msword,.zip';
  public archivos: any = [];
  public lisTemplates: any = [];

  public id: any = '';
  public rd: any = {};
  public d: any = {
    descripcion: '',
  };

  formGroup = new FormGroup({
    reclamoId: new FormControl(),
    usuario: new FormControl(),
    respuesta: new FormControl(),
    template_id: new FormControl(),
    archivo_b64: new FormControl(),
    archivo_name: new FormControl(),
  });

  @ViewChild('defaultRTE')
  private rteObj: RichTextEditorComponent;

  constructor(
    public reclamoService: ReclamoService,
    public respuestaService: RespuestaService,
    private templateService: TemplatesEmailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getReclamo();
  }

  /**
   *
   */
  getReclamo() {
    this.reclamoService.show(this.id).subscribe((r: any) => {
      this.rd = r;

      if (r.Respuesta.length != 0) {
        console.log('si respuesta');
        this.message = 'El reclamo ya se respondió anteriormente.';
        this.show_message = true;
      }

      this.templateService.getList(r.origen_id).subscribe((_templates) => {
        console.log('getList', _templates);
        this.lisTemplates = _templates;
      });

      console.log(r);
    });
  }

  async fileInputChange(e: any) {
    console.log('fileInputChange');

    const files = e.target.files;
    if (!files) {
      return;
    }
    // let base64: any = [];
    // Onload of file read the file content
    for (let file of files) {
      console.log('archivo size: ', file.size / 1024);

      // si el archivo tiene más de 10M evitamos que lo suba
      if (file.size / 1024 > 10000) {
        this.toastr.error(
          `El tamaño del archivo ${file.name} supera los 10M. Pruebe con otro archivo más liviano.`,
          'Límite de tamaño'
        );
        continue;
      }

      const r = await this.fileRead(file);
      this.fileName = `${file.name}; ${this.fileName}`;

      // this.fileB64 = <string>r;

      this.archivos.push({ fileB64: r, fileName: file.name });
    }

    console.log(this.archivos);
  }

  /**
   *
   * @param file
   * @returns
   */
  fileRead(file: any) {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  // fileUpload() {}

  /**
   *
   */
  onSubmit() {
    console.log('onSubmit', this.formGroup.value);

    // Si el form no es válido no pasa
    if (!this.formGroup.valid) return;

    this.openDialog();

    const data = this.formGroup.value;
    data.reclamoId = this.id;
    data.archivos = this.archivos;

    console.log('onSubmit', data);
    try {
      this.respuestaService.addRespuesta(data).subscribe((newRespuesta) => {
        console.log('response: ', newRespuesta);
        this.show_message = true;
        this.dialog.closeAll();
      });
    } catch (e) {
      console.error('atrapado');
      // TODO informar el error
    } finally {
      this.formGroup.reset();
    }
  }

  /**
   *
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(SpinnerComponent);

    dialogRef.afterClosed().subscribe((response) => {
      console.log('The dialog was closed', response);
    });
  }

  click() {
    console.log('click');
    // $event.preventDefault()
    // this.fileInputChange($event);
  }
}
