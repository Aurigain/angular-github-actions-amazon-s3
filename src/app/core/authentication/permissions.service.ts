import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../services/utils.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private cookie: CookieService,
    private utils: UtilsService,
    private auth: AuthService 
  ) { }

  isauthenticated(): boolean {
    const token = this.cookie.get('_l_a_t');
    if (!token) {
      return false;
    }

    const date = this.utils.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    if (date.valueOf() > new Date().valueOf()) {
      return true;
    } else {
      this.auth.logout();
      return false;
    }
  }
}
