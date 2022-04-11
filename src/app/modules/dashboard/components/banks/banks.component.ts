import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/config/constants.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  rowFilter: number = 1;
  updateStatusForm:FormGroup;
  AppointmentDetailForm:FormGroup;
  suc
  successMsg: any;
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private auth: AuthService,
    private utils: UtilsService,
    private toastr: ToastrService,
    private networkRequest: NetworkRequestService,

  ) { }

  submitFile() {
    const excel = (<HTMLInputElement>document.getElementById('excel')).files[0];

    if (!excel) {
      this.toastr.error('Please upload excel file!', 'Error!', {
        timeOut: 4000,
      });
      return;
    }

    let formData: FormData = new FormData();
    formData.append("excel_file", excel);
    this.networkRequest.postFormData(formData, '/api/bulkdistrictupload/').subscribe(
      data => {
        console.log("Tags successfully updated", data);
        this.toastr.success('FTag created successfully!', 'Created!', {
          timeOut: 4000,
        });
      },
      error => {
        console.log("error ", error);
        this.toastr.error(error['message']['message'], 'Error!', {
          timeOut: 4000,
        });
      }
    )
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

  getStates() {
    this.networkRequest.getWithHeaders('/api/allstates/').subscribe(
      data => {
        console.log("states", data);
      },
      error => {
        console.log("error ", error);
        this.toastr.error(error['message']['message'], 'Error!', {
          timeOut: 4000,
        });
      }
    )
  }

  ngOnInit(): void {
    // this.filterArray = this.originalArray;
    this.filter('');
    this.getStates();
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
