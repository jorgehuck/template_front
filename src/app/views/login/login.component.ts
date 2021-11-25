import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

const ALIGN_OPTIONS = ['auto', 'start', 'center', 'baseline', 'end', 'stretch'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  alignTo = 'center';
  loading = false;

  formGroup = new FormGroup({
    username: new FormControl(),
    //   [
    //   Validators.required,
    //   Validators.minLength(4),
    // ]
    password: new FormControl(/*Validators.required*/),
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.hayServicio();

    // está loguado?
    if( this.usuarioService.isLoggedIn() ){
      console.log("ya está logueado");
      
      this.router.navigateByUrl('/reclamos');
    }
  }

  /**
   *
   */
  toggleAlignment() {
    let j = ALIGN_OPTIONS.indexOf(this.alignTo);
    this.alignTo = ALIGN_OPTIONS[(j + 1) % ALIGN_OPTIONS.length];
  }

  /**
   *
   */
  onLogin() {
    // this.openDialog();
    this.loading = true;

    const usr = this.formGroup.value;

    console.log('onLogin: ', usr);

    this.usuarioService.login(usr).subscribe(
      // sucess
      (login: any) => {
        console.log('onLogin response', login);

        if (login.token) {
          this.router.navigateByUrl('/reclamos'); // Main page
        } else {
          console.log("onLogin: sin token");
          
          // this.loginFail = true;
          if (login.httpStateCode) {
            if (login.httpStateCode === 401) {
              // TODO emitir aviso de error
              console.error('Error Login', login.httpStateCode);
            }
          }
        }
        this.loading = false;
      },
      // error
      (error: any) => {
        this.loading = false;

        this.toastr.error(
          'Compruebe su usuario y/o contraseña',
          'No se pudo iniciar sesión'
        );
        console.log('error: ', error);
      },
      // complete
      () => {
        console.log('complete');
        this.closeDialog();
      }
    );
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

  /**
   *
   */
  closeDialog(): void {
    this.dialog.closeAll();
  }

  /**
   * Hay servicio?
   */
  hayServicio() {
    this.apiService.ping().subscribe(
      // sucess
      (response: any) => console.log('hay Servicio'),

      // error: No HAY SERVICIO
      (error: any) => {
        this.toastr.error(
          'Compruebe que su red este funcionando.',
          'No hay servicio'
        );
        console.log('error: ', error);
      }
    );
  }
}
