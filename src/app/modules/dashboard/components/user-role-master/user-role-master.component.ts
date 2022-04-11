import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-role-master',
  templateUrl: './user-role-master.component.html',
  styleUrls: ['./user-role-master.component.scss']
})
export class UserRoleMasterComponent implements OnInit {

  Roles:any = ['supervisor', 'client', 'agent'];
  rowFilter: number = 1;
  updateStatusForm:FormGroup;
  AppointmentDetailForm:FormGroup;
  suc
  successMsg: any;
  constructor(
    private formbuilder: FormBuilder,
  ) { }

  deleteUser(id){
    this.successMsg = null;

    if (confirm("Do you really want to delete this user?")){
      //Api call to delete user
      for (let i = 0; i < this.originalArray.length; i++) {

        if (this.originalArray[i]['Id'] == id){

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

  get pinCode(){
    return this.AppointmentDetailForm.get('pinCode');
  }

  p:number = 1;

  selectedForm: FormGroup;
  originalArray = [
  {Id: 10018, roleName: 'supervisor', status:'active'},
  {Id: 10017, roleName: 'client', status:'inactive'},
  {Id: 10016, roleName: 'agent',status:'inactive' },
  {Id: 10015, roleName: 'Regional Manager', status:'active'},
  {Id: 10014, roleName: 'Zonal Manager', status:'active'},
  {Id: 10013, roleName: ' State Head ', status:'inactive'},

  ];


  filterArray = [];


  itemsFilter(value){
    this.rowFilter = value;
  }

  filter(query: string){
    this.filterArray = [];
    console.log(query);
      this.filterArray = (query) ? this.originalArray.filter(p => p.roleName.toLowerCase().includes(query.toLowerCase())) : this.originalArray;
      console.log(this.filterArray);
      this.rowFilter = this.filterArray.length;
  }

  // searchedCategory(){
  //   this.filterArray = [];
  //   let category = this.selectedForm.value.selectCategory;
  //   this.filterArray = (category) ? this.originalArray
  //   .filter(p => p.type.includes(category)) : this.originalArray;
  //   console.log(this.filterArray);
  // }

  changeStatus(){
    const status = this.updateStatusForm.value.status;
    const remark = this.updateStatusForm.value.remark;

    let formData = {
      status: status,
      remark: remark
    }
    console.log(formData);
  }
  submitAppointmentDetails(){
    const pinCode = this.AppointmentDetailForm.value.pinCode;
    const branch = this.AppointmentDetailForm.value.branch;
    const dateOfAppointment = this.AppointmentDetailForm.value.dateOfAppointment;
    const timeOfAppointment = this.AppointmentDetailForm.value.timeOfAppointment;

  }

  ngOnInit(): void {
    // this.filterArray = this.originalArray;
    this.filter('');
    this.selectedForm = this.formbuilder.group({
      selectCategory: ['']
     })
     console.log(this.originalArray);

    this.updateStatusForm = this.formbuilder.group({
      status : ['', Validators.required],
      remark : [''],
    })

    this.AppointmentDetailForm = this.formbuilder.group({
      pinCode : ['', Validators.required],
      branch : ['', Validators.required],
      dateOfAppointment : ['', Validators.required],
      timeOfAppointment : ['', Validators.required],
    })
  }


}
