import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Email } from '../contracts/interfaces/email';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamoService {
  constructor(private http: HttpClient) {}

  list(paginator: any, sort: any, search: any) {
    // const {pageIndex, pageSize} = paginator;
    // const {direction, active} = sort;

    let params = new HttpParams()
      .set('search', search)
    //   .set('pageIndex', pageIndex)
    //   .set('pageSize', (pageSize) ? pageSize : 5)
    //   .set('sortDir', direction)
    //   .set('sortActive', active)

    return (
      this.http
        // .get('/reclamo', {params})
        .get<any[]>('/reclamo', {params})
        .pipe(catchError(this.handleError('reclamosList', [])))
    );
  }

  show(id: any) {
    return this.http
      .get('/reclamo/' + id)
      .pipe(catchError(this.handleError('reclamosShow', [])));
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
