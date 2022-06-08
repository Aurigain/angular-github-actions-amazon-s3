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

  isAdmin() {
    const token = this.cookie.get('_l_a_t');
    const decodeToken = this.utils.decodeToken(token);

    if (this.isauthenticated()) {
      try {
        const userType = decodeToken['user_group'];
        if (userType.includes('admin') || userType.includes('superadmin')) {
          console.log("superadminabab");
          return true;
        }
      } catch (e) {
        this.auth.logout();
        return false;
      }
    } else {
      return false;
    }

  }

  isSuperAdmin() {
    const token = this.cookie.get('_l_a_t');
    const decodeToken = this.utils.decodeToken(token);

    if (this.isauthenticated()) {
      try {
        const userType = decodeToken['user_group'];
        if (userType.includes('superadmin')) {
          console.log("superadminabab");
          return true;
        }
      } catch (e) {
        this.auth.logout();
        return false;
      }
    } else {
      return false;
    }

  }

  isAgent() {
    // console.log("aabbbbvv");
    const token = this.cookie.get('_l_a_t');
    const decodeToken = this.utils.decodeToken(token);
    // Check user type only if authenticated
    if (this.isauthenticated()) {
      try {
        const userType = decodeToken['user_group'];
        if (userType.includes('agent')) {
          console.log("superadminabab");
          return true;
        }
      } catch (e) {
        this.auth.logout();
        return false;
      }
    } else {
      return false;
    }

  }
  isCustomer(): boolean {
    // console.log("aabbbbvv");
    const token = this.cookie.get('_l_a_t');
    const decodeToken = this.utils.decodeToken(token);
    // Check user type only if authenticated
    if (this.isauthenticated()) {
      try {
        const userType = decodeToken['user_group'];
        if (userType.includes('customer')) {
          console.log("superadminabab");
          return true;
        }
      } catch (e) {
        this.auth.logout();
        return false;
      }
    } else {
      return false;
    }

  }
  isSalesManager(): boolean {
    // console.log("aabbbbvv");
    const token = this.cookie.get('_l_a_t');
    const decodeToken = this.utils.decodeToken(token);
    // Check user type only if authenticated
    if (this.isauthenticated()) {
      try {
        const userType = decodeToken['user_group'];
        if (userType.includes('salesManager')) {
          console.log("superadminabab");
          return true;
        }
      } catch (e) {
        this.auth.logout();
        return false;
      }
    } else {
      return false;
    }

  }
}
