import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantsService } from 'src/app/config/constants.service';
import { ErrorHandlerService } from '../http/error-handler.service';
import { NetworkRequestService } from '../services/network-request.service';
import { UtilsService } from '../services/utils.service';
import { AuthService } from './auth.service';
import { ProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private errorHandler: ErrorHandlerService,
    private constsvc: ConstantsService,
    private http: HttpClient,
    private cookie: CookieService,
    private auth: AuthService,
    private router: Router,
    private profileservice: ProfileService,
    private networkRequest: NetworkRequestService,
    private utils: UtilsService,
  ) { }

  userProfileObj;

  forgotPassword(data: any) {
    return this.http.post(this.constsvc.forgotPasswordUrl, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  resetPassword(otp: any, data: any) {
    return this.http.put(`${this.constsvc.resetPasswordUrl}/${otp}`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  searchBank(ifscCode) {
    return this.http.get(`https://ifsc.razorpay.com/${ifscCode}/`)
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
            console.log(err);
          },
          complete: () => {
            // this.loginRedirect();
          }
        })
      } catch(err){
        console.log(err);
      }
    });
  }

  extraSteps(): Observable<any> {
    // console.log("extra steps", this.cookie.get('_l_a_t'));
    const decodeToken = this.utils.decodeToken(this.cookie.get('_l_a_t'));
    console.log("decoded token: ", decodeToken);
    return new Observable(observer => {
      // this.profileservice.refreshProfileData().subscribe(
      //   data => {
      //     console.log("profile data", data);
      //     localStorage.setItem('userProfile', JSON.stringify(data));
      //     this.profileservice.setUserProfileValue(data);
      //     observer.complete();
      //   },
      //   error => {
      //     observer.error('failed');
      //   }
      // )


      // this.networkRequest.getWithHeaders('/api/profile/').subscribe(
      //   data => {
      //     this.userProfileObj = data['profile'];

      //     observer.complete();
      //   },
      //   error => {
      //     observer.error('failed');
      //   }
      // );

    });

  }

  setToken(user) {
    try {
      this.cookie.set('_l_a_t', user['access'], this.constsvc.LOGIN_EXPIRY_TIME, '/');
      console.log("usertoken", this.cookie.get('_l_a_t'));
    } catch (err) {
      this.auth.logout();
    }
  }

  loginRedirect(){
    // this.router.navigateByUrl('/dashboard');
  }
}
