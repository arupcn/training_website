import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { DispatcherService } from "src/app/servicesDispatcher/dispatcher.service";
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUserUrl: string;
  constructor(
    private dispatcher: DispatcherService,
    private router: Router,
  ) {
    this.baseUserUrl =environment.baseUserUrl;
   }
    /**
   * Method: login
   * Purpose : user login
   * @param params The parameter for this method
   */
  login(params) {
    return new Promise((resolve, reject) => {
      this.dispatcher.post(this.baseUserUrl + "login", params).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * Method: signUp
   * Purpose : user Registration
   * @param params The parameter for this method
   */
  signUp(params) {
    return new Promise((resolve, reject) => {
      this.dispatcher
        .post(this.baseUserUrl + "signup", params)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

      /**
   * Method: dashboard
   * Purpose : dashboard
   * @param params The parameter for this method
   */
       dashboard() {
        return new Promise((resolve, reject) => {
          this.dispatcher.get(this.baseUserUrl + "dashboard",'').subscribe(
            (res: any) => {
              resolve(res);
            },
            err => {
              reject(err);
            }
          );
        });
      }

  /**
  * Method: createNewToken
  * Purpose: getting refreshed token from server
  */
   createNewToken() {
    let refreshToken = localStorage.getItem('refreshToken');
    return this.dispatcher.post(this.baseUserUrl + 'refreshToken', refreshToken)
      .pipe(tap((res: any) => {
        if (res.status) {
          localStorage.setItem('accessToken', res.result.accessToken);
        }
      }, err => {
        localStorage.clear();
        this.router.navigateByUrl('');
      }));
  }

}
