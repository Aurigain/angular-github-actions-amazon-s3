import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/config/constants.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private conts: ConstantsService,
    private authservice: AuthService,
    private loginService: LoginService,
    private misc: MiscellaneousService,
    private toastr: ToastrService,
    private networkRequest: NetworkRequestService
  ) { }

  isForgotPasswordForm:boolean = true;
  isOtpForm:boolean= false;
  passwordForm: boolean = false;
  username: string;
  password: string;
  confirmPassword: string;
  phonenumber: number;
  otp:number;
  emailForm:FormGroup;
  successMsg:any;
  errors: any;

  resetValidations() {
    this.errors = null;
  }

  submitPasswordForm(){
    this.successMsg = null;
    this.errors = null;
    if (this.password != this.confirmPassword) {
      this.errors = "Password and Confirm Password do not match";
      this.toastr.error("Password and Confirm Password do not match", 'Error!', {
        timeOut: 4000,
      });
      return;
    }
    if (this.password.length < 6) {
      this.errors = "Password can't be less than 6 characters";
      return;
    }
    const formData = {
      password: this.password
    }
    this.networkRequest.putWithHeaders(formData, '/api/resetpassword/').subscribe(
      data => {
        // Set Profile Status
        console.log("updated", data);
        this.successMsg = "Password reset successful...";
        this.router.navigateByUrl['/login'];
        // this.getProfile();
      },
      error => {
      }
    );
  }

  submitOtp(){
    this.isForgotPasswordForm = false;
    this.isOtpForm = true;
    this.successMsg = null;
    this.errors = null;
    this.misc.sendOtp(this.phonenumber).subscribe();
  }

  verifyOtp(){
    if (!this.otp) {
      this.toastr.error("Please enter OTP", 'Error!', {
        timeOut: 4000,
      });
      return;
    }
    this.misc.verifyOtp(this.otp, this.phonenumber).subscribe(
      data => {
        this.isForgotPasswordForm = false;
        this.isOtpForm = false;
        this.passwordForm = true;
        this.successMsg = null;
        this.errors = null;
      },
      error => {
        this.errors = error;
        this.misc.showLoader()
      }
    );
  }

  ngOnInit(): void {
  }

}
