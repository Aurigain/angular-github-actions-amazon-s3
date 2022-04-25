import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-role-mapping',
  templateUrl: './role-mapping.component.html',
  styleUrls: ['./role-mapping.component.scss']
})
export class RoleMappingComponent implements OnInit {

  roleMappingForm: FormGroup;
  Roles: any = ['supervisor', 'client', 'agent'];
  currentUserId: number;
  fetchPermissions;
  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
  ) { }

  submitRoleMapping() {
    const selectRole = this.roleMappingForm.value.selectRole;
    const dashboard = this.roleMappingForm.value.dashboard;
    const leads = this.roleMappingForm.value.leads;
    const master = this.roleMappingForm.value.master;
    const commission = this.roleMappingForm.value.commission;
    const employeeManagement = this.roleMappingForm.value.employeeManagement;
    const customerManagement = this.roleMappingForm.value.customerManagement;

    let formData = {
      selectRole: selectRole,
      dashboard: dashboard,
      leads: leads,
      master: master,
      commission: commission,
      employeeManagement: employeeManagement,
      customerManagement: customerManagement
    }
    console.log(formData);
  }

  fetchRoles() {
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

    this.fetchRoles();
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

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
