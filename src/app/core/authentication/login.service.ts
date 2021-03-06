import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantsService } from 'src/app/config/constants.service';
import { ErrorHandlerService } from '../http/error-handler.service';
import { MiscellaneousService } from '../services/miscellaneous.service';
import { NetworkRequestService } from '../services/network-request.service';
import { UtilsService } from '../services/utils.service';
import { AuthService } from './auth.service';
import { ProfileService } from './user-profile.service';
import { map } from 'rxjs/operators';
import { SsrHandlerService } from '../services/ssr-handler.service';
import { PermissionsService } from './permissions.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private errorHandler: ErrorHandlerService,
    private ssrService: SsrHandlerService,
    private constsvc: ConstantsService,
    private http: HttpClient,
    private cookie: CookieService,
    private auth: AuthService,
    private router: Router,
    private profileservice: ProfileService,
    private networkRequest: NetworkRequestService,
    private utils: UtilsService,
    private misc: MiscellaneousService,
    private permissions: PermissionsService
  ) { }

  userProfileObj;
  userPermissions = [];

  forgotPassword(data: any) {
    return this.http.post(this.constsvc.forgotPasswordUrl, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // resetPassword(otp: any, data: any) {
  //   return this.http.put(`${this.constsvc.resetPasswordUrl}/${otp}`, data)
  //     .pipe(
  //       catchError(this.errorHandler.handleError)
  //     );
  // }

  updatePassword(data: any) {
    return this.http.put(`${this.constsvc.updatePassword}`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  resetPassword(data: any) {
    return this.http.put(`${this.constsvc.resetpassword}`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  searchBank(ifscCode) {
    // return this.http.get(`${this.constsvc.fetchBranch}?ifsc=${ifscCode}`)

    let httpOptions = {
      headers: new HttpHeaders({
        skip: "true",
        Accept: '*/*',
      })
    };
    return this.http.get(`https://ifsc.razorpay.com/${ifscCode}`, httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  processLogin(user: object) {
    console.log("process login");
    return new Observable(observer => {
      try {
        this.setToken(user);
        console.log("Token set successfully");
        this.extraSteps().subscribe({
          error: err => {
            console.log("error", err);
            this.auth.clearStorages();
          },
          complete: () => {
            console.log("inside compelete step")
            this.loginRedirect();
          }
        })
      } catch (err) {
        console.log(err);
      }
    });
  }

  extraSteps(): Observable<any> {
    const decodeToken = this.utils.decodeToken(this.cookie.get('_l_a_t'));
    console.log("decoded token: ", decodeToken);
    return new Observable(observer => {
      this.misc.userProfile().subscribe(
        data => {
          console.log("profile data:", data);

          this.ssrService.setItem('userProfile', JSON.stringify(data));
          this.misc.fetchPermissionsById(data['user_group']['id']).subscribe(
            data => {
              console.log("permissions data:", data);
              //@ts-ignore
              data.map((res) => {
                this.userPermissions.push(res['permission']['permission_name']);
              })
              console.log("usppppppppppppppp", this.userPermissions)
              this.ssrService.setItem('userPermissions', JSON.stringify(this.userPermissions));
              observer.complete();
            },
            error => {
              console.log("error:", error);
              observer.error("failed");
            }
          )
        }
      );
    });
  }
  // extraSteps(): Observable<any> {
  //   const decodeToken = this.utils.decodeToken(this.cookie.get('_l_a_t'));
  //   console.log("decoded token: ", decodeToken);
  //   return new Observable(observer => {
  //     this.profileservice.refreshProfileData().subscribe(
  //       data => {
  //         console.log("profile data", data);
  //         localStorage.setItem('userProfile', JSON.stringify(data));
  //         this.profileservice.setUserProfileValue(data);
  //         observer.complete();
  //       },
  //       error => {
  //         observer.error('failed');
  //       }
  //     )
  //   });
  // }

  setToken(user) {
    try {
      this.cookie.set('_l_a_t', user['data']['token'], this.constsvc.LOGIN_EXPIRY_TIME, '/');
      console.log("usertoken", this.cookie.get('_l_a_t'));
    } catch (err) {
      this.auth.logout();
    }
  }

  loginRedirect() {
    if (this.permissions.isSuperAdmin()) {
      this.router.navigateByUrl('/super-admin')
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }
}
