import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario, Usuario } from '../contracts/interfaces/usuario';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  login(usr: LoginUsuario): Observable<Usuario> {
    return this.http.post<Usuario>('/user/login', usr, this.httpOptions).pipe(
      tap((usrLogin: Usuario) => {
        console.log(`login usr=${usrLogin.username}`);
        this.setSession(usrLogin);
      }),
      // catchError(this.handleError<Usuario>('login'))
    );
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('username', authResult.username);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let expiration = localStorage.getItem('expires_at');
    if (expiration === null) expiration = '1440';

    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   *
   */
  getUsername() {    
    return localStorage.getItem('username');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // this.toastr.success('Hello world!', 'Toastr fun!');
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
