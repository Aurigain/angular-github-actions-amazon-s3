import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantsService } from 'src/app/config/constants.service';
import { ErrorHandlerService } from '../http/error-handler.service';
import { NetworkRequestService } from './network-request.service';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousService {

  constructor(
    private router: Router,
    private cookie: CookieService,
    private locationStrategy: LocationStrategy,
    private networkRequest: NetworkRequestService,
    private toastr: ToastrService,
    private consts: ConstantsService,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {
  }


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

  showMobileSidebar: Subject<boolean> = new Subject<boolean>();

  userProfileData: Subject<object> = new Subject<object>();
  userProfileChange: Subject<boolean> = new Subject<boolean>();

  // Handle Loader
  showLoaderSubject: Subject<object> = new Subject<object>();
  scrollToView: Subject<string> = new Subject<string>();
  showMenuSubject: Subject<string> = new Subject<string>()

  handleError(error: HttpErrorResponse) {

    let errorMessage: any;

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error['errors'].error}`);
    }
    // return an observable with a user-facing error message
    if (error.error['errors'].error) {
      errorMessage = error.error['errors'].error;
    } else {
      errorMessage = error.error['errors'];
    }
    return throwError({
      status: error.status,
      message: errorMessage
    });
  };

  sendOtp(phonenumber) {

    /*
     * Send Otp
     * Post Data: phone_number
     */


    return new Observable(observer => {
      this.showLoader('short');
      this.networkRequest.postWithHeader(JSON.stringify({ phone_number: phonenumber }), '/api/otp/')
        .subscribe(
          data => {
            console.log("otp sent", data);
            observer.next(data);
            this.hideLoader();
          },
          error => {
            observer.error(error);
            this.hideLoader();
          }
        );
    });
  }


  fetchAgents() {

    return this.http.get(this.consts.apiAgent, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchAgentsDetail(id) {
    return this.http.get(`${this.consts.apiAgent}${id}/`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  agentApproval(id) {
    return this.http.post(`${this.consts.apiAgent}${id}/approve/`, id)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  verifyOtp(otp, phonenumber) {

    /*
     * Verify Otp
     * Post Data: phone_number, otp
     * Process Login after phone verification
     */

    return new Observable(observer => {

      this.showLoader('short');

      const verificationData = JSON.stringify({ otp: otp, phone_number: phonenumber });
      this.networkRequest.postWithHeader(verificationData, '/api/otp/verify/')
        .subscribe(
          data => {
            console.log("verified")
            observer.next(data['phone_number']);
            this.hideLoader();
          },
          error => {
            observer.error(error['error'].reason);
            this.toastr.error(error['error'].reason, 'Error!', {
              timeOut: 4000,
            });
            this.hideLoader();
          }
        );
    });
  }


  formatAssessment(packages, categories) {
    const assessmentList = [];
    categories.forEach(category => {

      const packageList = packages.filter(pkg => {
        return pkg['course_details'].id === category.id;
      });

      if (packageList.length !== 0) {
        assessmentList.push({
          assessment: category,
          packages: packageList
        });
      }
    });

    return assessmentList;
  }


  userProfile() {
    return new Observable(observer => {
      this.networkRequest.getWithHeaders('/api/profile/').subscribe(
        data => {
          this.userProfileData.next(data['profile']);
          observer.next(data['profile']);
        }
      );
    });
  }

  /**
   * Intialize mathjax configurations
   */
  initializeMathJax(mathjax: any) {
    return new Observable(obserser => {
      eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, mathjax])');
      eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, mathjax])');
      obserser.next();
    });
  }


  showLoader(type = 'full') {
    this.showLoaderSubject.next({ visibility: true, type: type });
  }

  hideLoader() {
    this.showLoaderSubject.next({ visibility: false });
  }
}

