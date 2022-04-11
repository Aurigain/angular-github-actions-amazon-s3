import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
  ) { }

  selectedForm: FormGroup;
  editStatus: FormGroup;

  originalArray = [
  {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00',},
  {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com',type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'closed', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', },
  {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },

  ];
  filterArray = [];
  fullname;
  fathername;

  updateStatus(id){
    console.log(id);
    this.fullname = null;
    this.fathername = null;

    for (let i = 0; i < this.originalArray.length; i++) {
        if (this.originalArray[i]['Id'] == id) {
          
          console.log(this.originalArray[i]);
          this.fullname = this.originalArray[i]['FullName'];
          this.fathername = this.originalArray[i]['FatherName']
          
          // this.editStatus.patchValue({
          //   FullName: this.originalArray[i]['FullName'],
          //   FatherName: this.originalArray[i]['FatherName'],
          // })

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
    this.filterArray = (category) ? this.originalArray.filter(p => p.type.includes(category)) : this.originalArray; 
    console.log(this.filterArray);
  }


  submitUpdateStatus(){
    console.log("Inside Update Status")
    const type = this.editStatus.value.type;
    if (confirm("Do you really want to update "+ this.fullname + " status to " + type.toUpperCase() + " ?")){

  //////// API call to save data    
      console.log(type);
     
    }
    
    
  }

  ngOnInit(): void {
    // this.filterArray = this.originalArray;
    this.filter('');
    this.selectedForm = this.formbuilder.group({
      selectCategory: ['']    
     })
     console.log(this.originalArray);


     this.editStatus = this.formbuilder.group({
       FullName: [''],
       FatherName: [''],
       type: ['']
     })
  }


}
