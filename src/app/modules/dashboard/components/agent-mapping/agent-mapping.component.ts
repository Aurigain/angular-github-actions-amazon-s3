import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-mapping',
  templateUrl: './agent-mapping.component.html',
  styleUrls: ['./agent-mapping.component.scss']
})
export class AgentMappingComponent implements OnInit {


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
  ) { }

  successMsg:string;
  selectedForm: FormGroup;
  editUserForm: FormGroup;
  addUserForm:FormGroup;
  mapSupervisor:FormGroup;
  
  supervisors = ['Naina', 'Sunaina', 'Arpit', 'Manish', 'Durgesh'];
  p:any;
  
  originalArray = [
    {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00',},
    {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com',type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  
    ];
  filterArray = [];
  fullname;
  fathername;
  currentUserId:number;
  

  get selectSupervisor(){
    return this.mapSupervisor.get('selectSupervisor')
  }
  get location(){
    return this.mapSupervisor.get('location')
  }
  get pinCode(){
    return this.mapSupervisor.get('pinCode')
  }
  get workingDays(){
    return this.mapSupervisor.get('workingDays')
  }
  get workingHours(){
    return this.mapSupervisor.get('workingHours')
  }
  get capacity(){
    return this.mapSupervisor.get('capacity')
  }


  currentUser(id){
    this.currentUserId = id;
    console.log(this.currentUser);
  }

  createUser(){
    this.successMsg= null;
    
    // this.addUserForm = this.formbuilder.group({
    //   // FullName: [''],
    //   // FatherName: [''],
    //   // Dob: [''],
    //   // Email: [''],
    // })
  }

  
  editUser(id){
    console.log(id);
    // this.fullname = null;
    // this.fathername = null;

    for (let i = 0; i < this.originalArray.length; i++) {
        if (this.originalArray[i]['Id'] == id) {
          
          console.log(this.originalArray[i]);

          this.editUserForm.patchValue({
            FullName: this.originalArray[i]['FullName'],
            FatherName: this.originalArray[i]['FatherName'],
            Email: this.originalArray[i]['Email'],
            Dob: this.originalArray[i]['DateOfBirth'],
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


  submitEditedUser(){
    console.log("Inside Update Status")
    const FullName = this.editUserForm.value.FullName;
    const FatherName = this.editUserForm.value.FatherName;
    const Email = this.editUserForm.value.Email;
    const Dob = this.editUserForm.value.Dob;

    let formData = {
      FullName: FullName,
      FatherName: FatherName,
      Email: Email,
      Dob: Dob,
    }

    console.log(formData);
    this.successMsg = "Edit Success!";
  //////// API call to save data    
    
    
  }
  
  mappingSupervisor(){
    console.log("Inside Update Status")
    const selectSupervisor = this.mapSupervisor.value.name;
    const location = this.mapSupervisor.value.location;
    const pinCode = this.mapSupervisor.value.pinCode;
    const workingDays = this.mapSupervisor.value.workingDays;
    const workingHours = this.mapSupervisor.value.workingHours;
    const capacity = this.mapSupervisor.value.capacity;

    let formData = {
      selectSupervisor: selectSupervisor,
      location: location,
      pinCode: pinCode,
      workingDays: workingDays,
      workingHours: workingHours,
      capacity: capacity
    }

    console.log(formData);
    this.successMsg = "Mapping Success!";
  //////// API call to save data    
    
    
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
       FatherName: [''],
       type: [''],
       Dob: [''],
       Email: [''],
     })

     this.mapSupervisor = this.formbuilder.group({
       selectSupervisor: ['', [Validators.required,]],
       location: ['', [Validators.required]],
       pinCode: ['', [Validators.required]],
       workingDays: ['', [Validators.required]],
       workingHours: ['', [Validators.required]],
       capacity: ['', [Validators.required]],
     })
  }

}
