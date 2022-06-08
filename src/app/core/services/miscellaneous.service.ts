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
import { SsrHandlerService } from './ssr-handler.service';

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
    private ssrService: SsrHandlerService,
  ) {
  }


  getHeaderOption(): any {
    const token = this.cookie.get('_l_a_t');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Token ' + token
      }).set('Access-Control-Allow-Origin', '*')
      // .set("Access-Control-Expose-Headers", "*"),
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
    let userData = this.ssrService.getItem('userProfile');
    userData = JSON.parse(userData);
    return this.http.get(`${this.consts.apiAgent}agent/?company=${userData['company']}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  searchComapnyByName(data: any) {
    return this.http.get(`${this.consts.searchCompanyByName}?name=${data}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getComapnyDetails(id) {
    return this.http.get(`${this.consts.fetchcompanydetails}${id}/`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  leadLoanDetailById(id) {

    return this.http.get(`${this.consts.fetchLeadDetail}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchLeadProfileById(id) {

    return this.http.get(`${this.consts.fetchLeadProfile}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchLeadDocumentById(id) {

    return this.http.get(`${this.consts.fetchLeadDocument}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchLeadAppointmentById(id) {

    return this.http.get(`${this.consts.fetchLeadAppointment}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchLeadAccountTransferDetailById(id) {

    return this.http.get(`${this.consts.fetchLeadBtAccountTransfer}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchLeadAdressDetailById(id) {

    return this.http.get(`${this.consts.fetchLeadAddressDetail}?lead=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  selectQuery() {

    return this.http.get(this.consts.selectQueryApi, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchFreshLead() {

    return this.http.get(this.consts.fetchFreshLead, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchBTLead() {

    return this.http.get(this.consts.fetchBTLead, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  FetchAllLoanRequests() {

    return this.http.get(`${this.consts.all_loan_requests}?lead_loan_type=bt`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  pendingFinalBtLoanRequests() {

    return this.http.get(`${this.consts.pending_final_bt_loan_requests}?lead_loan_type=bt`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchAllEmployees() {
    let userData = this.ssrService.getItem('userProfile');
    userData = JSON.parse(userData);

    return this.http.get(`${this.consts.employeeApi}?company=${userData['company']}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  userRoleMapping() {

    return this.http.get(this.consts.employeeApi, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchReportingPersonbyRole(id) {
    let userData = this.ssrService.getItem('userProfile');
    userData = JSON.parse(userData);
    return this.http.get(`${this.consts.fetch_employees_by_role}?role=${id}&company=${userData['company']}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchUserRoles() {
    let userData = this.ssrService.getItem('userProfile');
    userData = JSON.parse(userData);

    return this.http.get(`${this.consts.fetchrolesbycompany}?company=${userData['company']}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  superAdminFetchUserRoles(id) {
    return this.http.get(`${this.consts.fetchrolesbycompany}?company=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchUserRoleById(id) {

    return this.http.get(`${this.consts.userRoleApi}${id}/`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  uploadAgentImages(images) {
    return this.http.put(this.consts.agentImageUpload, images)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchPermissions() {

    return this.http.get(this.consts.fetchPermissionsApi, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchPermissionsById(user_group_id) {

    return this.http.get(`${this.consts.rolesPermissionsApi}?role=${user_group_id}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  createRole(data: any) {
    return this.http.post(this.consts.userRoleApi, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  createFreshLeadWeb(data: any) {
    return this.http.post(this.consts.freshLead, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  createBTLeadWeb(data: any) {
    return this.http.post(this.consts.create_internal_bt_lead, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  addEmployee(data: any) {
    return this.http.post(this.consts.employeeApi, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateLeadProfile(data, id) {
    return this.http.put(`${this.consts.updateLeadProfile}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateLeadAddress(data, id) {
    return this.http.put(`${this.consts.updateLeadAddress}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateLeadJewellery(data, id) {
    return this.http.put(`${this.consts.updateLeadJewellery}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateLeadLoanDetails(data, id) {
    return this.http.put(`${this.consts.updateLeadLoanDetails}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateLeadLoanDocuments(data) {
    return this.http.put(`${this.consts.updateLeadLoanDocuments}`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateLeadAppointmentDetails(data) {
    return this.http.put(`${this.consts.updateLeadAppointmentDetails}`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateEmployeeProfile(data, id) {
    return this.http.put(`${this.consts.updateAgentProfile}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateEmployeeAddress(data, id) {
    return this.http.put(`${this.consts.updateAgentAddress}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateEmployeeKYC(data, id) {
    return this.http.put(`${this.consts.updateAgentKYC}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  updateEmployeeBank(data, id) {
    return this.http.put(`${this.consts.updateAgentBank}${id}/`, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  balanceTransferPreFinalApproval(data: any) {
    return this.http.put(this.consts.balanceTransferPreFinalApproval, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  balanceTransferFinalApproval(data: any) {
    return this.http.put(this.consts.balanceTransferFinalApproval, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  createPermissions(data: any) {
    return this.http.post(this.consts.fetchPermissionsApi, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  contactUs(data: any) {
    return this.http.post(this.consts.contactUs, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  userRolePermissionsMapping(data: any) {
    return this.http.post(this.consts.rolePermissionMappingApi, data)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchAgentsDetail(id) {
    return this.http.get(`${this.consts.apiAgent}agent/${id}/`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  fetchEmployeeDetailById(id) {
    return this.http.get(`${this.consts.employeeApi}${id}/`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchAgentProfileDetailByUserName(username) {
    return this.http.get(`${this.consts.agentProfileDetail}?username=${username}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchAgentKycByUserName(username) {
    return this.http.get(`${this.consts.agentKycDetail}?username=${username}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchAgentAddressByUserName(username) {
    return this.http.get(`${this.consts.agentAddressDetail}?username=${username}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  fetchAgentBankByUserName(username) {
    return this.http.get(`${this.consts.agentBankDetail}?username=${username}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  agentApproval(id) {
    return this.http.put(`${this.consts.apiAgent}approve_agent/${id}/`, this.getHeaderOption())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
  agentDisApproval(data, id) {
    return this.http.put(`${this.consts.apiAgent}disapprove_agent/${id}/`, data)
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


  // userProfile() {
  //   return new Observable(observer => {
  //     this.networkRequest.getWithHeaders('/api/profile/').subscribe(
  //       data => {
  //         this.userProfileData.next(data['profile']);
  //         observer.next(data['profile']);
  //       }
  //     );
  //   });
  // }

  userProfile() {

    return this.http.get(`${this.consts.agentProfile}`, {
      headers: new HttpHeaders({
        'Authorization': `${this.cookie.get('_l_a_t')}`
      })
    })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
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

