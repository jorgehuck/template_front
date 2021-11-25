import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Origen} from '../contracts/interfaces/origen';


@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  origenes: Origen[] = [];

  constructor(private http: HttpClient) {
  }

  getOrigenes(): Observable<Origen[]> {
    return this.http
      .get<Origen[]>('/origen')
      .pipe(catchError(this.handleError<Origen[]>('getOrigenes', [])));
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
