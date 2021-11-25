import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { EmailService } from '../../../services/email.service';
import { Email } from '../../../contracts/interfaces/email';
import { FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { EmailModalComponent } from '../email-modal/email-modal.component';
import { EmailEditModalComponent } from '../email-edit-modal/email-edit-modal.component';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'origen', 'createdAt', 'acciones'];
  dataSource = new MatTableDataSource<Email>();
  formGroup = this.formBuilder.group({ stringSearch: '' });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  /**
   *
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.refreshList();
  }

  /**
   * Buscador...
   */
  onSearch(): void {
    const { stringSearch } = this.formGroup.value;

    try {
      if (stringSearch) {

        this.emailService.search(stringSearch).subscribe((emails) => {

          if( emails.length != 0 ){
            this.dataSource.data = emails;
          } else {
            this.toastr.warning(
              `No se encontraron emails para su busqueda: ${stringSearch}`,
              'No hay datos'
            );
          }

          console.log("onSearch:", emails);
          
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

    const dialogRef = this.dialog.open(EmailModalComponent, {
      width: '500px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe((newEmail) => {
      console.log('The dialog was closed', newEmail);

      if( newEmail ){
        let tmp = this.dataSource.data;
        tmp.push(newEmail);
        this.dataSource.data = tmp;
      }
    });
  }

  /**
   *
   */
   openEditDialog(email: Email): void {

    const dialogRef = this.dialog.open(EmailEditModalComponent, {
      width: '500px',
      data: {email} 
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
  eliminar(email: Email) {
    console.log('eliminar', email);
    
    // eliminarlo de la grilla
    let tmp = this.dataSource.data;
    tmp.splice(tmp.indexOf(email), 1);
    this.dataSource.data = tmp;

    // eliminarlo del servicio
    if (email.id) {
      this.emailService.deleteEmail(email.id).subscribe(
        (delEmail: Email) => {
          console.log('eliminado: ', delEmail);
        },
        (error) => {
          // TODO: Agregar noticiaciones
          console.log('No se pudo eliminar: ', email);
        }
      );
    }
  }

  /**
   * Actualizar listado
   */
  refreshList(){
    this.emailService.getEmails().subscribe((emails) => {
      console.log(emails);

      this.dataSource.data = emails;
    });
  }
}
