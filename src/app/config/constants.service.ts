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
  loginApiUrl = `${environment.BASE_URL}/api/user/login/`;
  signupApiUrl = `${environment.BASE_URL}/api/users/register/`;
  apiAgent = `${environment.BASE_URL}/api/agent/`;
  selectQueryApi = `${environment.BASE_URL}/api/bank/contact_queries/`;
  fetchFreshLead = `${environment.BASE_URL}/api/lead/fetch_fresh_leads/`;
  userRoleApi = `${environment.BASE_URL}/api/user/user_role/`;
  freshLead = `${environment.BASE_URL}/api/lead/create/`;
  employeeApi = `${environment.BASE_URL}/api/agent/employee/`;
  contactUs = `${environment.BASE_URL}/api/bank/contact_us/`;
  fetchBranch = `${environment.BASE_URL}/api/bank/fetch_branch/`;
  rolePermissionMappingApi = `${environment.BASE_URL}/api/user/user_role_permission_mapping/`;
  fetchPermissionsApi = `${environment.BASE_URL}/api/user/user_permission/`;
  forgotPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  resetPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  getUpdateProfileUrl = `${environment.BASE_URL}/api/profile/`;
  LOGIN_EXPIRY_TIME = 7;
}
