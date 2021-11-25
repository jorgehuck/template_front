import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Respuesta} from '../contracts/interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient) { }

  /** POST: add a new email to the server */
  addRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    return this.http.post<Respuesta>('/respuesta', respuesta, this.httpOptions).pipe(
      tap((newRespuesta: Respuesta) => console.log(`added email w/ id=${newRespuesta.id}`)),
      catchError(this.handleError<Respuesta>('addRespuesta'))
    );
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

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
