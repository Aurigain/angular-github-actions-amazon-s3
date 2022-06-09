import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/authentication/login.service';
import { SsrHandlerService } from 'src/app/core/services/ssr-handler.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  userData
  constructor(
    private loginservice: LoginService,
    private toastrService: ToastrService,
    private ssrService: SsrHandlerService,
  ) { }
  changePasswordForm: FormGroup;
  password;
  ngOnInit(): void {
    const profiData = this.ssrService.getItem('userProfile');
    this.userData = JSON.parse(profiData);
    console.log(this.userData)
  }

  changePassword(){

    const user = this.userData['shareReferralCode'];
    const password  = this.password;

    let formData = {
      user: user,
      password: password
    }
    console.log(formData);
    this.loginservice.resetPassword(formData).subscribe(
      data =>{
        console.log(data);
        this.toastrService.success("Password Updated Successfully", "Success")
      }
    )
    }


}
