import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';
import { UserServiceService } from './services/user/user-service.service';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {;

  constructor(
    private router: Router,
    private userServiceService: UserServiceService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('login') > 0
      || request.url.indexOf('signup') > 0
      || request.url == 'https://api.ipify.org/?format=json') {

      if (request.url == 'https://api.ipify.org/?format=json') {
        const secretheader = request.clone({ setHeaders: { "Content-Type": "application/json" } });
        return next.handle(secretheader);
      } else {
        const secretheader = request.clone({ setHeaders: {lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en' } });
        return next.handle(secretheader);
      }

    

    }
    else {
     
      // sending incoming request by appending token to header
      return next.handle(request.clone({ setHeaders: { access_token:localStorage.getItem('accessToken'), lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en', ip: localStorage.getItem('ip') ? localStorage.getItem('ip') : "192.169.1.50" } }))
        .catch(error => {
          // to handle 401 unauthorized token and generating refresh token appending it to header
          
          if (error instanceof HttpErrorResponse && error.status === 401) {

            return this.userServiceService.createNewToken().switchMap((res: any) => {
              const newreq = request.clone({ setHeaders: { access_token: res.accessToken } });
              return next.handle(newreq);
            });
          } else {
            return throwError(error);
          }
        }
        );
    }

  }
}
