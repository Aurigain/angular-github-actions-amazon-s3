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

  regexAadhar = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  regexPAN = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  constructor() { }

  // loginApiUrl = `${environment.BASE_URL}/api/users/login/`;
  loginApiUrl = `${environment.BASE_URL}/api/user/login/`;
  signupApiUrl = `${environment.BASE_URL}/api/users/register/`;
  searchCompanyByName = `${environment.BASE_URL}/api/searchcompaniesbyname/`;
  fetchcompanydetails = `${environment.BASE_URL}/api/fetchcompanydetails/`;
  apiAgent = `${environment.BASE_URL}/api/agent/`;
  agentProfile = `${environment.BASE_URL}/api/profile/`;
  notificationList = `${environment.BASE_URL}/api/notifications_list/`;
  changeNotificationStatus = `${environment.BASE_URL}/api/change_notification_status/`;
  sendBulkNotification = `${environment.BASE_URL}/api/send_bulk_notifications/`;
  selectQueryApi = `${environment.BASE_URL}/api/bank/contact_queries/`;
  fetchFreshLead = `${environment.BASE_URL}/api/lead/fresh_loan_requests/`;
  fetchBTLead = `${environment.BASE_URL}/api/lead/bt_loan_requests/`;
  makerLeadList = `${environment.BASE_URL}/api/lead/maker_bt_lead_lists/`;
  checkerLeadList = `${environment.BASE_URL}/api/lead/checker_bt_lead_lists/`;
  all_loan_requests = `${environment.BASE_URL}/api/lead/all_loan_requests/`;
  all_loan_type = `${environment.BASE_URL}/api/loan/loan/`;
  pending_final_bt_loan_requests = `${environment.BASE_URL}/api/lead/pending_final_bt_loan_requests/`;
  fetchLeadDetail = `${environment.BASE_URL}/api/lead/loan_request_by_id/`;
  fetchLeadProfile = `${environment.BASE_URL}/api/lead/fetch_lead_profile/`;
  fetchLeadDocument = `${environment.BASE_URL}/api/lead/fetch_lead_documents/`;
  fetchLeadBtAccountTransfer = `${environment.BASE_URL}/api/lead/fetch_lead_btaccount_transfer/`;
  fetchLeadAppointment = `${environment.BASE_URL}/api/lead/fetch_lead_appointment/`;
  fetchLeadAddressDetail = `${environment.BASE_URL}/api/lead/fetch_lead_address/`;
  userRoleApi = `${environment.BASE_URL}/api/user/user_role/`;
  fetchrolesbycompany = `${environment.BASE_URL}/api/user/fetchrolesbycompany/`;
  freshLead = `${environment.BASE_URL}/api/lead/create/`;
  create_internal_bt_lead = `${environment.BASE_URL}/api/lead/create_internal_bt_lead/`;
  employeeApi = `${environment.BASE_URL}/api/agent/employee/`;
  fetch_employees_by_role = `${environment.BASE_URL}/api/agent/fetch_employees_by_role/`;
  updateLeadProfile = `${environment.BASE_URL}/api/lead/edit_lead_profile/`;
  updateLeadAddress = `${environment.BASE_URL}/api/lead/edit_lead_address/`;
  maker_bt_lead_approval = `${environment.BASE_URL}/api/lead/maker_bt_lead_approval/`;
  checker_bt_lead_approval = `${environment.BASE_URL}/api/lead/checker_bt_lead_approval/`;
  updateLeadJewellery = `${environment.BASE_URL}/api/lead/edit_lead_loan_request/`;
  updateLeadLoanDetails = `${environment.BASE_URL}/api/lead/edit_lead_loan_account_details/`;
  updateLeadLoanDocuments = `${environment.BASE_URL}/api/lead/update_lead_loan_request_documents/`;
  updateLeadAppointmentDetails = `${environment.BASE_URL}/api/lead/update_lead_appointment/`;
  updateAgentProfile = `${environment.BASE_URL}/api/agent/update_agent_profile/`;
  updateAgentAddress = `${environment.BASE_URL}/api/agent/update_agent_address/`;
  updateAgentKYC = `${environment.BASE_URL}/api/agent/update_agent_kyc/`;
  updateAgentBank = `${environment.BASE_URL}/api/bank/update_userbank/`;
  agentProfileDetail = `${environment.BASE_URL}/api/agent/fetch_employee_profile_details/`;
  agentKycDetail = `${environment.BASE_URL}/api/agent/fetch_employee_kyc_details/`;
  agentAddressDetail = `${environment.BASE_URL}/api/agent/fetch_employee_address_details/`;
  agentBankDetail = `${environment.BASE_URL}/api/bank/fetchuserbanks/`;
  contactUs = `${environment.BASE_URL}/api/bank/contact_us/`;
  fetchBranch = `${environment.BASE_URL}/api/bank/fetch_branch/`;
  rolePermissionMappingApi = `${environment.BASE_URL}/api/user/user_role_permission_mapping/`;
  companyAllowedLoans = `${environment.BASE_URL}/api/loan/company_allowed_loan/`;
  updatePassword = `${environment.BASE_URL}/api/user/updatepassword/`;
  resetpassword = `${environment.BASE_URL}/api/user/resetpassword/`;
  agentImageUpload = `${environment.BASE_URL}/api/agent/update_employee_images/`;
  fetchPermissionsApi = `${environment.BASE_URL}/api/user/user_permission/`;
  balanceTransferPreFinalApproval = `${environment.BASE_URL}/api/lead/bt_prefinal_approval/`;
  balanceTransferFinalApproval = `${environment.BASE_URL}/api/lead/bt_final_approval/`;
  rolesPermissionsApi = `${environment.BASE_URL}/api/user/rolepermissions/`;
  forgotPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  resetPasswordUrl = `https://jsonplaceholder.typicode.com/`;
  getUpdateProfileUrl = `${environment.BASE_URL}/api/profile/`;
  LOGIN_EXPIRY_TIME = 7;
}
