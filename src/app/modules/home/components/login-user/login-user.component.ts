import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { ConstantsService } from 'src/app/config/constants.service';
import { ConditionalExpr } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'src/app/core/authentication/permissions.service';
import { SsrHandlerService } from 'src/app/core/services/ssr-handler.service';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private conts: ConstantsService,
    private authservice: AuthService,
    private loginservice: LoginService,
    private toastr: ToastrService,
    private permissions: PermissionsService,
    private ssrService: SsrHandlerService,
  ) { }

  isLoginForm: boolean = true;
  username: string;
  password: string;
  email: string;
  otp: number;
  emailForm: FormGroup;
  successMsg: any;
  errors: any;
  signupForm: FormGroup;
  loginForm: FormGroup;


  switchRegisterForm() {
    this.isLoginForm = false;
    this.signupForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]]
    })
  }
  switchToLoginForm() {
    this.isLoginForm = true;
  }

  resetValidations() {
    this.errors = null;
  }
  signUp() {
    let finalData: any;
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const contactNumber = this.signupForm.value.contactNumber;
    const password = this.signupForm.value.password;

    finalData = {
      fullname: name,
      email: email,
      username: name,
      phonenumber: contactNumber,
      password: password,
    }

    console.log("finalData ", finalData);


    this.authservice.signup(finalData)
      .subscribe(
        user => {
          console.log(user, "student add")
          this.ssrService.setItem('token', user['token']);
          this.toastr.success("SignUp Successfully", "Success", {
            timeOut: 4000,
          });
          this.switchToLoginForm();
        },
        error => {
          console.log("Error section")
          this.errors = error['message']['error']['message'];
          // this.toastr.error(this.errors, "Error", {
          //   timeOut: 4000,
          // });
          console.log(this.errors);
          if (this.errors == 'Duplicate Field Value Entered') {
            this.errors = 'Phonenumber already exist'
            this.toastr.error(this.errors, "Error", {
              timeOut: 4000,
            });
          }
        }
      );
  }
  login() {
    this.successMsg = null;
    this.errors = null;
    const username = this.username;
    const password = this.password;

    if (!username || !password) {
      this.errors = "Please enter a username and password";
    }
    else if (!username) {
      this.errors = "Please enter a username"
    }
    else if (!password) {
      this.errors = "Please enter a password"
    }

    if (username && password) {
      const userObj = {
        username: username,
        password: password
      };

      console.log(userObj);
      // this.authservice.login(JSON.stringify(userObj), '/api/users/login/')
      this.authservice.login(userObj)
        .subscribe(
          user => {
            if (!user['data']['error']) {
              console.log("user", user);
              console.log("token is:", user['data']['token'])
              this.errors = '';
              console.log("login");
              this.successMsg = "Logged in successfully, loading...."
              this.toastr.success(this.successMsg, "Sucess", {
                timeOut: 4000,
              });
              this.loginservice.processLogin(user).subscribe();
              // localStorage.setItem('token', user['token']);
              // this.router.navigate(['/dashboard']);
            }
            else {
              this.toastr.error(user['data']['detail'], "Error", {
                timeOut: 4000,
              });
            }

          },
          error => {
            console.log("errorsection", error);
            this.successMsg = '';
            this.errors = error['message'];
            this.toastr.error(this.errors, "Error", {
              timeOut: 4000,
            });
            console.log(error, "aa ", error['message']);
          }
        )
    }
  }

  ngOnInit(): void {
    if(this.permissions.isauthenticated()){
      this.router.navigateByUrl('/')
    }
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
