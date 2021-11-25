import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { TemplateEmail } from '../../../contracts/interfaces/templates-email';
import { FormBuilder } from '@angular/forms';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { TemplatesEmailsModalComponent } from '../templates-emails-modal/templates-emails-modal.component';
import { TemplatesEmailsEditModalComponent } from '../templates-emails-edit-modal/templates-emails-edit-modal.component';

import { ToastrService } from 'ngx-toastr';

// dialogos
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

// servicios
import { TemplatesEmailsService } from '../../../services/templates-emails.service';
import { OrigenService } from '../../../services/origen.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent {
  displayedColumns: string[] = [
    'origen',
    'tipo',
    'nombre',
    'contenido',
    'createdAt',
    'acciones',
  ];
  dataSource = new MatTableDataSource<TemplateEmail>();
  formGroup = this.formBuilder.group({ stringSearch: '' });

  // arreglos
  listOrigenes: any = [];
  listTiposTemplates: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private templateService: TemplatesEmailsService,
    private origenService: OrigenService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.refreshList();

    // debo traer los origenes y los tipos de plantillas...
    this.templateService
      .getListTipos('Respuesta', 'body')
      .subscribe((_tipos) => {
        this.listTiposTemplates = _tipos;
      });

    this.origenService.getOrigenes().subscribe((_origenes) => {
      this.listOrigenes = _origenes;
    });
  }

  /**
   * Buscador...
   *
   * TODO: terminar
   */
  onSearch(): void {
    console.log('onSearch');

    const { stringSearch } = this.formGroup.value;

    try {
      if (stringSearch) {
        this.templateService.search(stringSearch).subscribe((_res) => {
          if (_res.length != 0) {
            this.dataSource.data = _res;
          } else {
            this.toastr.warning(
              `No se encontraron plantillas para su busqueda: ${stringSearch}`,
              'No hay datos'
            );
          }

          console.log('onSearch:', _res);
        });
      }
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
    const dialogRef = this.dialog.open(TemplatesEmailsModalComponent, {
      width: '75%',
      data: {
        origenes: this.listOrigenes,
        tipos: this.listTiposTemplates,
      },
    });

    dialogRef.afterClosed().subscribe((newEmail) => {
      if (newEmail) {
        let tmp = this.dataSource.data;
        tmp.unshift(newEmail);
        this.dataSource.data = tmp;
      }
    });
  }

  /**
   *
   */
  openEditDialog(template: TemplateEmail): void {
    const dialogRef = this.dialog.open(TemplatesEmailsEditModalComponent, {
      width: '75%',
      data: {
        template,
        origenes: this.listOrigenes,
        tipos: this.listTiposTemplates,
      },
    });

    dialogRef.afterClosed().subscribe((editEmail) => {
      console.log('The dialog was closed', editEmail);

      // TODO buscar y actualizar
      this.refreshList();
    });
  }

  /**
   * Se presionó Enter dentro del input de busqueda
   */
  onKeyUp(key: any) {
    if (key.keyCode == 13) {
      const { stringSearch } = this.formGroup.value;

      if (stringSearch === null || stringSearch.length === 0) {
        this.refreshList();
      }

      this.onSearch();
    }
  }

  /**
   *
   */
  eliminar(template: TemplateEmail) {
    console.log('eliminar', template);

    // TODO agregar confirmacion del usuario

    // eliminarlo de la grilla
    let tmp = this.dataSource.data;
    tmp.splice(tmp.indexOf(template), 1);
    this.dataSource.data = tmp;

    // eliminarlo del servicio
    if (template.id) {
      this.templateService.deleteTemplate(template.id).subscribe(
        (delEmail: TemplateEmail) => {
          console.log('eliminado: ', delEmail);
        },
        (error) => {
          // TODO: Agregar noticiaciones
          console.log('No se pudo eliminar: ', template);
        }
      );
    }
  }

  /**
   *
   */
  confirmarEliminar(template: TemplateEmail): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '25%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log('confirmarEliminar', response);
      if (response) {
        this.eliminar(template);
      }
    });
  }

  /**
   * Actualizar listado
   */
  refreshList() {
    this.templateService.getList().subscribe((_tem) => {
      console.log('refreshList', _tem);

      this.dataSource = new MatTableDataSource(_tem);
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Announce the change in sort state for assistive technology. */
  sortData(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.

    console.log('announceSortChange');
  }
}
