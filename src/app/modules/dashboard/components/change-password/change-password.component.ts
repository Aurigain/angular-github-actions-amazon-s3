import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/authentication/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private loginservice: LoginService,
    private toastrService: ToastrService
  ) { }
  changePasswordForm: FormGroup;
  password
  ngOnInit(): void {
  }

  changePassword(){

    this.loginservice.updatePassword(this.password).subscribe(
      data =>{
        console.log(data);
        this.toastrService.success("Password Updated Successfully", "Success")
      }
    )
    }


}
