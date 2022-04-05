import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators'
import { ConstantsService } from 'src/app/config/constants.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../http/error-handler.service';
import { MiscellaneousService } from '../services/miscellaneous.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private consts: ConstantsService,
    private errorHandler: ErrorHandlerService,
    private cookie: CookieService,
    private misc: MiscellaneousService,
  ) { }
  loginOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  verfiyOptions = {
    'access': this.cookie.get('_l_a_t')
  };
  BASE_URL = environment.BASE_URL;
  // login(data: any, api: any) {
  //   return this.http.post(`${this.BASE_URL}${api}`, data, this.loginOptions)
  //     .pipe(
  //       catchError(this.misc.handleError)
  //     );
  // }

  // register(data: any, api: any) {
  //   return this.http.post(`${this.BASE_URL}${api}`, data, this.loginOptions)
  //     .pipe(
  //       catchError(this.misc.handleError)
  //     );
  // }

  getHeaderOption(): any {
    const token = this.cookie.get('_l_a_t');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }).set('Access-Control-Allow-Origin', '*')
      .set("Access-Control-Expose-Headers", "*"),
      // mode: 'no-cors'
    };
  }

  login(data: any) {
    return this.http.post(this.consts.loginApiUrl, data)
      .pipe(
        catchError(this.misc.handleError)
      );
  }

  register(data: any) {
    return this.http.post(this.consts.apiAgent, data)
      .pipe(
        catchError(this.misc.handleError)
      );
  }

  // login(data: any) {
  //   console.log("Inside Login service")
  //   return this.http.post(this.consts.loginApiUrl, data)
  //     .pipe(
  //       catchError(this.errorHandler.handleError)
  //     );
  // }
  signup(data: any) {

    console.log("Inside Signup service")
    return this.http.post(this.consts.signupApiUrl, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  logout() {
    this.cookie.deleteAll('/');
    this.cookie.deleteAll();
    sessionStorage.clear();
    location.replace('/');
  }
}
