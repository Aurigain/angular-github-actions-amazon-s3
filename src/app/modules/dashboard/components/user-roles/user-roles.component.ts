import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }
  roleTitle:string = '';
  saveRoleFooter:string = '';
  successMsg:string;
  selectedForm: FormGroup;
  editUserForm: FormGroup;
  // addUserForm:FormGroup;
  addRoleForm:FormGroup;
  Roles:any = ['supervisor', 'client', 'agent'];
  p:any;
  currentUserId:number;
  originalArray = [
    {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00',Role: ''},
    {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected',DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending',DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', Role: ''},
    {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com',type: 'rejected', DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', Role: ''},
    {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00',Role: '' },
    {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', Role: ''},

    ];
  filterArray = [];
  fullname;
  fathername;


  createRole(){

    this.successMsg= null;
  }


  editUser(id){
    this.currentUserId = id;
    this.roleTitle = "Edit Role";
    this.saveRoleFooter = "Update";
    console.log(id);
    // this.fullname = null;
    // this.fathername = null;

    for (let i = 0; i < this.originalArray.length; i++) {
        if (this.originalArray[i]['Id'] == id) {

          console.log(this.originalArray[i]);

          this.editUserForm.patchValue({
            FullName: this.originalArray[i]['FullName'],
            Id: this.originalArray[i]['Id'],
          })

        }
      }


  }

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


  assignRole(id){
    this.currentUserId = id;
    this.roleTitle = "Assign Role";
    this.saveRoleFooter = "Save";
    console.log(id);
    // this.fullname = null;
    // this.fathername = null;

    for (let i = 0; i < this.originalArray.length; i++) {
        if (this.originalArray[i]['Id'] == id) {

          console.log(this.originalArray[i]);

          this.editUserForm.patchValue({
            FullName: this.originalArray[i]['FullName'],
            Id: this.originalArray[i]['Id'],
          })

        }
      }
  }


  filter(query: string){
    this.filterArray = [];
    console.log(query);

      // for (let i = 0; i < this.originalArray.length; i++) {
      //   if (this.originalArray[i]['name'] == query) {
      //     this.filterArray.push(this.originalArray[i]);
      //     console.log(this.filterArray);
      //   }
      // }

      this.filterArray = (query) ? this.originalArray.filter(p => p.FullName.toLowerCase().includes(query.toLowerCase())) : this.originalArray;
      console.log(this.filterArray);
  }

  searchedCategory(){
    this.filterArray = [];
    let category = this.selectedForm.value.selectCategory;
    // console.log(category);
    this.filterArray = (category) ? this.originalArray.filter(p => p.Role.includes(category)) : this.originalArray;
    console.log(this.filterArray);
  }


  submitEditedUser(){
    console.log("Inside Update Status")
    const Role = this.editUserForm.value.Role;

    for (let i = 0; i < this.originalArray.length; i++) {
      if (this.originalArray[i]['Id'] == this.currentUserId) {
        this.originalArray[i]['Role'] = Role;
        console.log(this.originalArray);
      }
    }


    let formData = {
      Role: Role
    }

    console.log(formData);
    this.successMsg = "Edit Success!";
  //////// API call to save data


  }

  submitCreatedRole(){
    console.log("Inside Submit Role")
    const Role = this.addRoleForm.value.Role;

    this.Roles.push(Role);
    console.log(this.Roles);

    let formData = {
      Role: Role
    }

    console.log(formData);
    this.successMsg = "Role Submitted Successfully!";
  //////// API call to save data
    this.toastr.success('Role Submitted Successfully!');

  }

  ngOnInit(): void {
    // this.filterArray = this.originalArray;
    this.filter('');
    this.selectedForm = this.formbuilder.group({
      selectCategory: ['']
     })
     console.log(this.originalArray);


     this.editUserForm = this.formbuilder.group({
       FullName: [''],
       Id: [''],
       Role: ['']
     })

     this.addRoleForm = this.formbuilder.group({
       Role: ['']
     })
  }

}
