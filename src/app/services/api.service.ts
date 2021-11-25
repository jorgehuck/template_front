import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Hace un ping a la API para saber si es accesible
   */
  ping() {
    return this.http
      .get<any>('/servicio/ping')
      .pipe();
  }
}
