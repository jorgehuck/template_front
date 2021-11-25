import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TemplateEmail } from '../contracts/interfaces/templates-email';
import { TipoTemplateEmail } from '../contracts/interfaces/tipo-template-email';

@Injectable({
  providedIn: 'root',
})
export class TemplatesEmailsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private endpoint = "/templates";

  constructor(private http: HttpClient) {}

  getList(origen = 0): Observable<TemplateEmail[]> {
    
    let f_origen = '';  // filtro origen

    if( origen > 0 ){
      f_origen = `&origen=${origen}`;
    }

    return this.http
      .get<TemplateEmail[]>( `${this.endpoint}?tipo=Respuesta&subtipo=body${f_origen}` )
      .pipe(catchError(this.handleError<TemplateEmail[]>('getList', [])));
  }


  /**
   * 
   */

  getListTipos(type:string, subtype:string): Observable<TipoTemplateEmail[]> {
    return this.http
      .get<TipoTemplateEmail[]>( `${this.endpoint}/tipos?tipo=${type}&subtipo=${subtype}` )
      .pipe(catchError(this.handleError<TipoTemplateEmail[]>('getListTipos', [])));
  }

  /**
   *
   */
  search(stringSearch:string): Observable<TemplateEmail[]> {
    return this.http
      .get<TemplateEmail[]>( `${this.endpoint}/s/${stringSearch}` )
      .pipe(catchError(this.handleError<TemplateEmail[]>('getList', [])));
  }

  /** POST: add a new template to the server */
  addTemplate(input: TemplateEmail): Observable<TemplateEmail> {
    console.log('addTemplate: ', input);

    return this.http.post<TemplateEmail>( this.endpoint , input, this.httpOptions).pipe(
      tap((newTemplate: TemplateEmail) => console.log('added template: ', newTemplate)),
      catchError(this.handleError<TemplateEmail>('addTemplate'))
    );
  }

  /** DELETE: delete the template from the server */
  deleteTemplate(id: number): Observable<TemplateEmail> {
    return this.http.delete<TemplateEmail>(`${this.endpoint}/${id}`, this.httpOptions).pipe(
      tap((_) => console.log(`deleted template id=${id}`)),
      catchError(this.handleError<TemplateEmail>('deleteTemplate'))
    );
  }

  /** PATCH: update the email on the server */
  updateTemplate(template: TemplateEmail): Observable<any> {
    return this.http.patch(`${this.endpoint}/${template.id}`, template, this.httpOptions).pipe(
      tap((_) => console.log(`updated template id=${template.id}`)),
      catchError(this.handleError<any>('updateTemplate'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  //TODO esta funcion deberia refactorizarce y tenerla para todos los services
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
