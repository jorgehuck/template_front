import {environment} from "../../environments/environment";
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiUrl = environment.apiUrl
    const httpReq = req.clone(
      {
        url: apiUrl + req.url,
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )
    return next.handle(httpReq);
  }
}
