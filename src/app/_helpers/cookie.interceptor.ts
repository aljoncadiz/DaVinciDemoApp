import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({withCredentials: true})

    return next.handle(request);
  }
}

export const cookieInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true }
];