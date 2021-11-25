import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Email } from '../contracts/interfaces/email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  emails: Email[] = [];

  constructor(private http: HttpClient) {}

  getEmails(): Observable<Email[]> {
    return this.http
      .get<Email[]>('/email')
      .pipe(catchError(this.handleError<Email[]>('getEmails', [])));
  }

  /** GET email by id. Will 404 if id not found */
  getEmail(id: number): Observable<Email> {
    return this.http.get<Email>(`/email/${id}`).pipe(
      tap((_) => console.log(`fetched email id=${id}`)),
      catchError(this.handleError<Email>(`getEmail id=${id}`))
    );
  }

  /** GET search emails */
  search(key: string): Observable<Email[]> {
    return this.http.get<Email[]>(`/email/s/${key}`).pipe(
      tap((_) => console.log(`searched email key=${key}`)),
      catchError(this.handleError<Email[]>(`search key=${key}`))
    );
  }

  /** POST: add a new email to the server */
  addEmail(email: Email): Observable<Email> {
    console.log('addEmail: ', email);

    return this.http.post<Email>('/email', email, this.httpOptions).pipe(
      tap((newEmail: Email) => console.log('added email: ', newEmail)),
      catchError(this.handleError<Email>('addEmail'))
    );
  }

  /** PATCH: update the email on the server */
  updateEmail(email: Email): Observable<any> {
    return this.http.patch(`/email/${email.id}`, email, this.httpOptions).pipe(
      tap((_) => console.log(`updated email id=${email.id}`)),
      catchError(this.handleError<any>('updateEmail'))
    );
  }

  /** DELETE: delete the email from the server */
  deleteEmail(id: number): Observable<Email> {
    return this.http.delete<Email>(`/email/${id}`, this.httpOptions).pipe(
      tap((_) => console.log(`deleted email id=${id}`)),
      catchError(this.handleError<Email>('deleteEmail'))
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
