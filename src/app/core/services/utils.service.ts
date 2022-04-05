import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ConstantsService } from 'src/app/config/constants.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private cookie: CookieService,
    private consts: ConstantsService
  ) { }

  decodeToken(token) {

    /**
     * Decode Token
     */

    let decoded: any;
    if (token) {
      try {
        decoded = jwt_decode(token);
      } catch (e) {
        decoded = null;
      }
    }

    return decoded;
  }

  getTokenExpirationDate(token: string): Date {

    /**
     * Return Token Expiry Date
     */

    const decoded_token = this.decodeToken(token);
    let date: any;

    if (decoded_token) {
      if (decoded_token.exp === undefined) {
        return null;
      }
      date = new Date(0);
      date.setUTCSeconds(decoded_token.exp);
    } else {
      return null;
    }

    return date;
  }
}
