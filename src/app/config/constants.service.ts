import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  BASE_URL;

  PHONE = {
    // pattern: /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/,
    pattern: /^[6-9]\d{9}$/,
    length: 10,
    otpLength: 6
  }

  constructor() { }

  // loginApiUrl = `${environment.BASE_URL}/api/users/login/`;
  loginApiUrl = `${environment.BASE_URL}/api/token/`;
  signupApiUrl = `${environment.BASE_URL}/api/users/register/`;
  apiAgent = `${environment.BASE_URL}/api/agent/`;
  forgotPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  resetPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  getUpdateProfileUrl = `${environment.BASE_URL}/api/profile/`;
  LOGIN_EXPIRY_TIME = 7;
}
