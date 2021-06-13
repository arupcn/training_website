import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
// tslint:disable-next-line: variable-name
constructor(private _http: HttpClient) { }


/*
 *get function
 * @param url
 * @param headers
 */

get(url, data = {}, headers = {}) {
  return this._http.get(url, { headers: headers, params: data }).pipe(
    catchError(this.handleError));
}
/*
*get function
* @param url
* @param headers
*/
put(url, data, headers = {}) {
  return this._http.put(url, data, headers).pipe(
    catchError(this.handleError));
}

/**
 * Post Function
 * @param url api url
 * @param data api data
 * @param headers api header
 */
post(url, data, headers = {}) {

  return this._http.post(url, data, headers).pipe(
    catchError(this.handleError));
}


/**
* delete _http Function
* @param url url
* @param data api data
* @param headers client secret key
*/
delete(url, data, headers = {}) {
  return this._http.delete(url, { params: data }).pipe(
    catchError(this.handleError));
}

// Error 
handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    if (error.error && error.error.message && error.status == 404) {
      return throwError(error);

    }
    msg = error.error && error.error.message ? error.error.message : error.message;
  }
  return throwError(error);
}

}
