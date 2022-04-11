import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/config/constants.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.tabelData = [];
   }
  currentStep: number = 1; 
  statusDetails: FormGroup;
  personalDetails: FormGroup;
  documentDetails: FormGroup;
  jewelleryDetails: FormGroup;
  appointmentDetails: FormGroup;
  tabelData:any

  currentUserId: number=null
  supervisors = ['Naina', 'Sunaina', 'Arpit', 'Manish', 'Durgesh'];
  p:any;
  Roles:any = ['supervisor', 'client', 'agent'];
  originalArray = [
    {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'active'},
    {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected',DateOfBirth: '0001-01-01T00:00:00', status: 'inactive'},
    {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending',DateOfBirth: '0001-01-01T00:00:00', status: 'Active'},
    {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'Active'},
    {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com',type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'InActive'},
    {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00', status: 'Active'},
    {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'Active'},
    {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'InActive'},
    {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', status: 'Active'},
    {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00',status: 'Active' },
  
    ];
  ngOnInit(): void {
    // this.currentUserId = this.route.snapshot.params['id'];
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.statusDetails = this.formbuilder.group({
      status: ['', [Validators.required,]]
    })

    for (let i = 0; i < this.originalArray.length; i++) {
      if (this.originalArray[i]['Id'] == this.currentUserId){
        this.statusDetails.patchValue({
          status: this.originalArray[i]['status'],
        })

        // console.log(this.originalArray[i]['status'])
      }
     
    }
  }

  saveStatusDetails(){
    
    const status = this.statusDetails.value.status;

    let formData = {
      status: status
    }

    console.log(formData);
    this.stepUp();
    this.personalDetails = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      address: ['', [Validators.required,]],
      role: ['', [Validators.required,]]
    })

    for (let i = 0; i < this.originalArray.length; i++) {
      if (this.originalArray[i]['Id'] == this.currentUserId){
        
        this.personalDetails.patchValue({
          name: this.originalArray[i]['FullName'],
        })
        // console.log(this.originalArray[i]['status'])
      }
     
    }
  }

  stepUp(){
    console.log("clicked")
    this.currentStep +=1;
    console.log(this.currentStep);
  }
  stepDown(){
    this.currentStep-=1;
    console.log(this.currentStep);
  }

  addJewellery(){
    // const jewelleryType = this.jewelleryDetails.value.jewelleryType;
    // const quantity = this.jewelleryDetails.value.quantity;
    // const weight = this.jewelleryDetails.value.weight;
    // const karats = this.jewelleryDetails.value.karats;

    this.tabelData.push(this.jewelleryDetails.value);
    this.jewelleryDetails.reset();

  }

  removeItem(item){
    this.tabelData.forEach((value, index) => {
      if(value == item){
        this.tabelData.splice(index,1)
      }
    })
  }

  savePersonalDetails(){
    this.stepUp();
    console.log("inside save personal details")
    let personalDetailData:any;
    const product = this.personalDetails.value.product;
    const name = this.personalDetails.value.name;
    const fatherName = this.personalDetails.value.fatherName;
    const dob = this.personalDetails.value.dob;
    const gender = this.personalDetails.value.gender;
    const email = this.personalDetails.value.email;
    const phoneNumber1 = this.personalDetails.value.phoneNumber1;
    const phoneNumber2 = this.personalDetails.value.phoneNumber2;
    const loanAmount = this.personalDetails.value.loanAmount;
    const loanPurpose = this.personalDetails.value.loanPurpose;
    const tenure = this.personalDetails.value.tenure;

    personalDetailData = {
      product: product,
      name: name,
      fatherName: fatherName,
      dob: dob,
      gender: gender,
      email: email,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      loanAmount: loanAmount,
      loanPurpose: loanPurpose,
      tenure: tenure,
    }

    console.log(personalDetailData);
    this.jewelleryDetails = this.formbuilder.group({
      jewelleryType: ['', [Validators.required,]],
      quantity: ['', [Validators.required]],
      weight: ['', [Validators.required,]],
      karats: ['', [Validators.required,]],
    })
    
    // this.documentDetails = this.formbuilder.group({
    //   documentType: ['', [Validators.required,]],
    //   documentNumber: ['', [Validators.required]],
    //   panNumber: ['', [Validators.required,]],
    //   pinCode: ['', [Validators.required,]],
    //   areaName: ['', [Validators.required,]],
    //   addressLine1: ['', [Validators.required,]],
    //   addressLine2: ['', [Validators.required,]],
    // })
  }
  
  // saveDocumentDetails(){
  //   this.stepUp();
  //   console.log("inside save document details")
  //   let documentDetailData:any;
  //   const documentType = this.documentDetails.value.documentType;
  //   const documentNumber = this.documentDetails.value.documentNumber;
  //   const panNumber = this.documentDetails.value.panNumber;
  //   const pinCode = this.documentDetails.value.pinCode;
  //   const areaName = this.documentDetails.value.areaName;
  //   const addressLine1 = this.documentDetails.value.addressLine1;
  //   const addressLine2 = this.documentDetails.value.addressLine2;

  //   documentDetailData = {
  //     documentType: documentType,
  //     documentNumber: documentNumber,
  //     panNumber: panNumber,
  //     pinCode: pinCode,
  //     areaName: areaName,
  //     addressLine1: addressLine1,
  //     addressLine2: addressLine2,
      
  //   }
  //   console.log(documentDetailData);

    
  // }

  saveJewelleryDetails(){
    this.stepUp();
    console.log(this.tabelData);
    
    this.appointmentDetails = this.formbuilder.group({
      branch: ['', [Validators.required,]],
      dateOfAppointment: ['', [Validators.required]],
      timeOfAppointment: ['', [Validators.required,]],
    })
  }

  saveForms(){

  const product = this.personalDetails.value.product;
  const name = this.personalDetails.value.name;
  const fatherName = this.personalDetails.value.fatherName;
  const dob = this.personalDetails.value.dob;
  const gender = this.personalDetails.value.gender;
  const email = this.personalDetails.value.email;
  const phoneNumber1 = this.personalDetails.value.phoneNumber1;
  const phoneNumber2 = this.personalDetails.value.phoneNumber2;
  const loanAmount = this.personalDetails.value.loanAmount;
  const loanPurpose = this.personalDetails.value.loanPurpose;
  const tenure = this.personalDetails.value.tenure;

  const documentType = this.documentDetails.value.documentType;
  const documentNumber = this.documentDetails.value.documentNumber;
  const panNumber = this.documentDetails.value.panNumber;
  const pinCode = this.documentDetails.value.pinCode;
  const areaName = this.documentDetails.value.areaName;
  const addressLine1 = this.documentDetails.value.addressLine1;
  const addressLine2 = this.documentDetails.value.addressLine2;

  const branch = this.appointmentDetails.value.branch;
  const dateOfAppointment= this.appointmentDetails.value.dateOfAppointment;
  const timeOfAppointment = this.appointmentDetails.value.timeofAppointment;

  let finalData= {
  product: product,
  name: name,
  fatherName: fatherName,
  dob: dob,
  gender: gender,
  email: email,
  phoneNumber1: phoneNumber1,
  phoneNumber2: phoneNumber2,
  loanAmount: loanAmount,
  loanPurpose: loanPurpose,
  tenure: tenure,

  documentType: documentType,
  documentNumber: documentNumber,
  panNumber: panNumber,
  pinCode: pinCode,
  areaName: areaName,
  addressLine1: addressLine1,
  addressLine2: addressLine2,

  jewelleryDetails: this.tabelData,

  branch: branch,
  dateOfAppointment: dateOfAppointment,
  timeOfAppointment: timeOfAppointment,
  }
  console.log("final form data", finalData);
  }

}
