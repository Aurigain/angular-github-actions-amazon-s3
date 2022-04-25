import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  constructor(
    private misc: MiscellaneousService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
  error;
  status: boolean = false;
  roleName;


  statusCheck(event) {

    this.status = event.target.checked;
  }

  submitRole() {
    const role_name = this.roleName;
    const is_active = this.status;

    const formData = {
      role_name: role_name,
      is_active: is_active,
      role_index: 9
    }

    console.log(formData);
    this.misc.createRole(formData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Role Created Successfully", "Sucess", {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/dashboard/user-role-master')
      },
      err => {
        this.error = err['message']['data'];
        if (this.error['role_index']) {
          this.toastr.error(this.error['role_index'])
        }
        if (this.error['role_name']) {
          this.toastr.error(this.error['role_name'])
        }
      }
    )

  }
  ngOnInit(): void {

  }

}
