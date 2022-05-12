import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-user-role-master',
  templateUrl: './user-role-master.component.html',
  styleUrls: ['./user-role-master.component.scss']
})
export class UserRoleMasterComponent implements OnInit {

  Roles: any = ['supervisor', 'client', 'agent'];
  rowFilter: number = 1;
  updateStatusForm: FormGroup;
  AppointmentDetailForm: FormGroup;
  suc
  successMsg: any;
  userRoles;
  constructor(
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    private misc: MiscellaneousService,
  ) { }

  deleteUser(id) {
    this.successMsg = null;

    if (confirm("Do you really want to delete this user?")) {
      //Api call to delete user
      for (let i = 0; i < this.originalArray.length; i++) {

        if (this.originalArray[i]['Id'] == id) {

          this.originalArray.splice(i, 1)
        }

      }
      console.log(this.originalArray);
      //  this.router.navigateByUrl('/user-list')
    }


    // for (let i = 0; i < this.originalArray.length; i++) {

    //   if (this.originalArray[i]['Id'] == id){

    //     this.originalArray.splice(i, 1)
    //   }

    // }
    // console.log(this.originalArray);
  }

  get pinCode() {
    return this.AppointmentDetailForm.get('pinCode');
  }

  p: number = 1;

  selectedForm: FormGroup;
  originalArray = [];


  filterArray = [];


  itemsFilter(value) {
    this.rowFilter = value;
  }

  filter(query: string) {
    this.filterArray = [];
    console.log(query);
    this.fetchUserRoles();
    this.filterArray = (query) ? this.userRoles.filter(p => p.role_name.toLowerCase().includes(query.toLowerCase())) : this.userRoles;
    console.log(this.filterArray);
    // this.rowFilter = this.filterArray.length;
  }

  // searchedCategory(){
  //   this.filterArray = [];
  //   let category = this.selectedForm.value.selectCategory;
  //   this.filterArray = (category) ? this.originalArray
  //   .filter(p => p.type.includes(category)) : this.originalArray;
  //   console.log(this.filterArray);
  // }

  changeStatus() {
    const status = this.updateStatusForm.value.status;
    const remark = this.updateStatusForm.value.remark;

    let formData = {
      status: status,
      remark: remark
    }
    console.log(formData);
  }
  submitAppointmentDetails() {
    const pinCode = this.AppointmentDetailForm.value.pinCode;
    const branch = this.AppointmentDetailForm.value.branch;
    const dateOfAppointment = this.AppointmentDetailForm.value.dateOfAppointment;
    const timeOfAppointment = this.AppointmentDetailForm.value.timeOfAppointment;

  }

  fetchUserRoles() {
    this.successMsg = null;
    this.misc.fetchUserRoles().subscribe(
      data => {
        console.log(data['data']);
        this.userRoles = data['data'];
        console.log(this.userRoles);
      }
    )
  }

  ngOnInit(): void {
    // this.filterArray = this.originalArray;
    // this.filter('');
    this.fetchUserRoles();
    this.selectedForm = this.formbuilder.group({
      selectCategory: ['']
    })

    this.updateStatusForm = this.formbuilder.group({
      status: ['', Validators.required],
      remark: [''],
    })

    this.AppointmentDetailForm = this.formbuilder.group({
      pinCode: ['', Validators.required],
      branch: ['', Validators.required],
      dateOfAppointment: ['', Validators.required],
      timeOfAppointment: ['', Validators.required],
    })
  }


}
