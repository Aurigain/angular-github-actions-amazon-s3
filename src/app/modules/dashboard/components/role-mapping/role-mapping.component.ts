import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-mapping',
  templateUrl: './role-mapping.component.html',
  styleUrls: ['./role-mapping.component.scss']
})
export class RoleMappingComponent implements OnInit {

  roleMappingForm: FormGroup;
  Roles: any = ['supervisor', 'client', 'agent'];
  currentRoleId: number;
  fetchPermissions;
  successMsg = ''
  currentRole;

  selectedPermissions = [];
  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
    private toastr: ToastrService,
  ) { }

  submitRoleMapping() {
    console.log(this.selectedPermissions);
    const permissionArray = [];
    for(let i = 0; i < this.selectedPermissions.length; i++) {
      permissionArray.push(this.selectedPermissions[i]['id'])
    }
    let formData={
      role: this.currentRoleId,
      permissions: permissionArray
    }
    console.log(formData);
    this.misc.userRolePermissionsMapping(formData).subscribe(
      data => {
        console.log(data);
        if(data['data']['error']){
          this.toastr.error(data['data']['detail'], "Error", {
            timeOut: 4000,
          })
        }
        else{
          this.successMsg = data['data']['detail'];
        this.toastr.success( this.successMsg, "Sucess", {
          timeOut: 3000,
        });
        }
      },
      err => console.log(err)
    )
  }


  selectUnselectSinglePermission(id, event) {
    let count = 0;
    if (event.target.checked) {
      for (let i = 0; i < this.fetchPermissions.length; i++) {
        if (this.fetchPermissions[i]['id'] == id) {
          var element = <HTMLInputElement>document.getElementById(this.fetchPermissions[i]['id']);
          element.checked = true;
          this.selectedPermissions.push(this.fetchPermissions[i]);
        }
      }

      this.selectedPermissions = [...new Set(this.selectedPermissions.map(m => m))];
      for (let i = 0; i < this.selectedPermissions.length; i++) {
        for (let j = 0; j < this.fetchPermissions.length; j++) {
          if (this.selectedPermissions[i]['id'] == this.fetchPermissions[j]['id']) {
            count = count + 1;
          }
        }
      }

      // if (count == this.fetchPermissions.length) {
      //   var element = <HTMLInputElement> document.getElementById("flexCheckCheckedAll");
      //   element.checked = true;
      // }
    }
    else {
      for (let i = 0; i < this.selectedPermissions.length; i++) {
        if (this.selectedPermissions[i]['id'] == id) {
          this.selectedPermissions.splice(i, 1);
          var element = <HTMLInputElement>document.getElementById(id);
          element.checked = false;


          // var element = <HTMLInputElement> document.getElementById("flexCheckCheckedAll");
          // element.checked = false;
        }

      }
    }
  }

  fetchCurrentRole(id){
   this.misc.fetchUserRoleById(id).subscribe(
     data =>{
      this.currentRole = data['data']['role_name'];
      console.log("current Role is:", this.currentRole)
     },
     error =>{

     }
   )
  }

  fetchAllPermissions() {
    this.misc.fetchPermissions().subscribe(
      data => {
        console.log(data['data']);
        this.fetchPermissions = data['data']
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.successMsg = null;
    this.fetchAllPermissions();
    this.currentRoleId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentRoleId);
    this.fetchCurrentRole(this.currentRoleId)
    this.roleMappingForm = this.formbuilder.group({
      selectRole: ['', Validators.required],
      dashboard: [false],
      leads: [false],
      master: [false],
      commission: [false],
      employeeManagement: [false],
      customerManagement: [false],
    })
  }

}
