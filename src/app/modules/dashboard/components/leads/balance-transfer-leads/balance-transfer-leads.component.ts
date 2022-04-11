import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-balance-transfer-leads',
  templateUrl: './balance-transfer-leads.component.html',
  styleUrls: ['./balance-transfer-leads.component.scss']
})
export class BalanceTransferLeadsComponent implements OnInit {
  rowFilter: number = 1;
  updateStatusForm:FormGroup;
  AppointmentDetailForm:FormGroup;
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
  {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: null, type: 'approved', DateOfBirth: '0001-01-01T00:00:00',},
  {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: null, type: 'rejected',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: null, type: 'pending',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: null, type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: null,type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },

  ];
  filterArray = [];
  
  
  itemsFilter(value){
    this.rowFilter = value;
  }

  filter(query: string){
    this.filterArray = [];
    console.log(query);   
      this.filterArray = (query) ? this.originalArray.filter(p => p.FullName.toLowerCase().includes(query.toLowerCase())) : this.originalArray; 
      console.log(this.filterArray);
      this.rowFilter = this.filterArray.length;
  }
    
  searchedCategory(){
    this.filterArray = [];
    let category = this.selectedForm.value.selectCategory;
    this.filterArray = (category) ? this.originalArray.filter(p => p.type.includes(category)) : this.originalArray; 
    console.log(this.filterArray);
  }

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
