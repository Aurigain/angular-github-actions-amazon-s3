import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions.component.html',
  styleUrls: ['./add-permissions.component.scss']
})
export class AddPermissionsComponent implements OnInit {

  constructor(
    private misc: MiscellaneousService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  permissionName;
  permissionDescription;
  permissionIsActive;
  status;
  error;
  fetchPermissions;
  rowFilter = 1;
    p:number = 1;

  statusCheck(event) {

    this.status = event.target.checked;
  }

  itemsFilter(value) {
    this.rowFilter = value;
  }


  submitPermission(){
    const permission_name = this.permissionName;
    const is_active = this.status;
    const permission_desc = this.permissionDescription;

    const formData = {
      permission_name: permission_name,
      is_active: is_active,
      permission_desc: permission_desc
    }

    console.log(formData);
    this.misc.createPermissions(formData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Permissions Added Successfully", "Sucess", {
          timeOut: 3000,
        });
        window.location.reload();
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

  fetchAllPermissions(){

    this.misc.fetchPermissions().subscribe(
      data => {
        console.log(data['data']['results']);
        this.fetchPermissions = data['data']['results']
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
    this.fetchAllPermissions();
  }

}
