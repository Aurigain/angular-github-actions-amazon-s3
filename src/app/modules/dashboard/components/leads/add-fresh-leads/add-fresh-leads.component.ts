import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/config/constants.service';
import { LoginService } from 'src/app/core/authentication/login.service';
@Component({
  selector: 'app-add-fresh-leads',
  templateUrl: './add-fresh-leads.component.html',
  styleUrls: ['./add-fresh-leads.component.scss']
})
export class AddFreshLeadsComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.tabelData = [];
   }

   sentOtpField: boolean = false;
   verifyOtpField: boolean = true;
   otpVerifiedSuccessfully: boolean = false;

  currentStep: number = 1;
  personalDetails: FormGroup;
  // documentDetails: FormGroup;
  // jewelleryDetails: FormGroup;
  appointmentDetails: FormGroup;
  loanDetails: FormGroup;
  tabelData:any

  currentUserId;

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

    get phoneNumber1(){
      return this.personalDetails.get('phoneNumber1');
    }

  get loanAccountNumber(){
    return this.loanDetails.get('loanAccountNumber')
  }
  get loanAmount(){
    return this.loanDetails.get('loanAmount')
  }
  get loanDate(){
    return this.loanDetails.get('loanDate')
  }
  get branch(){
    return this.appointmentDetails.get('branch');
  }
  get bankName(){
    return this.appointmentDetails.get('bankName');
  }
  get ifsc(){
    return this.appointmentDetails.get('ifsc');
  }
  get dateOfAppointment(){
    return this.appointmentDetails.get('dateOfAppointment');
  }
  get timeOfAppointment(){
    return this.appointmentDetails.get('timeOfAppointment');
  }
  ngOnInit(): void {

    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.personalDetails = this.formbuilder.group({
      // product: ['', [Validators.required,]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      phoneNumber1: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      // fatherName: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      // dob: ['', [Validators.required,]],
      // gender: ['', [Validators.required,]],
      // email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      // phoneNumber2: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      // loanAmount: ['', [Validators.required,]],
      // loanPurpose: ['', [Validators.required,]],
      // tenure: ['', [Validators.required,]]
    })

    this.loanDetails = this.formbuilder.group({
      loanAccountNumber: ['', [Validators.required,]],
      loanAmount: ['', [Validators.required,]],
      loanDate: ['', [Validators.required,]],
    })

    this.appointmentDetails = this.formbuilder.group({
          branch: ['', [Validators.required,]],
          bankName: ['', [Validators.required,]],
          ifsc: ['', [Validators.required,]],
          dateOfAppointment: ['', [Validators.required]],
          timeOfAppointment: ['', [Validators.required,]],
        })
  if (this.currentUserId !== 0){

    for (let i = 0; i < this.originalArray.length; i++) {
      if (this.originalArray[i]['Id'] == this.currentUserId){
        this.personalDetails.patchValue({
          name: this.originalArray[i]['FullName'],
        })
      }
    }
  }

  }

  sendOTP(phoneNumber){
    console.log(phoneNumber);
    this.sentOtpField = true;
    this.verifyOtpField = false
  }

  verifyOtp(){
    this.otpVerifiedSuccessfully = true;

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

  // addJewellery(){
  //   // const jewelleryType = this.jewelleryDetails.value.jewelleryType;
  //   // const quantity = this.jewelleryDetails.value.quantity;
  //   // const weight = this.jewelleryDetails.value.weight;
  //   // const karats = this.jewelleryDetails.value.karats;

  //   this.tabelData.push(this.jewelleryDetails.value);
  //   this.jewelleryDetails.reset();

  // }

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
    const name = this.personalDetails.value.name;
    const phoneNumber1 = this.personalDetails.value.phoneNumber1;
    // const product = this.personalDetails.value.product;
    // const fatherName = this.personalDetails.value.fatherName;
    // const dob = this.personalDetails.value.dob;
    // const gender = this.personalDetails.value.gender;
    // const email = this.personalDetails.value.email;
    // const phoneNumber2 = this.personalDetails.value.phoneNumber2;
    // const loanAmount = this.personalDetails.value.loanAmount;
    // const loanPurpose = this.personalDetails.value.loanPurpose;
    // const tenure = this.personalDetails.value.tenure;

    personalDetailData = {
      name: name,
      phoneNumber1: phoneNumber1,
      // fatherName: fatherName,
      // product: product,
      // dob: dob,
      // gender: gender,
      // email: email,
      // phoneNumber2: phoneNumber2,
      // loanAmount: loanAmount,
      // loanPurpose: loanPurpose,
      // tenure: tenure,
    }
    console.log(personalDetailData);

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

  //   this.jewelleryDetails = this.formbuilder.group({
  //     jewelleryType: ['', [Validators.required,]],
  //     quantity: ['', [Validators.required]],
  //     weight: ['', [Validators.required,]],
  //     karats: ['', [Validators.required,]],
  //   })
  // }

  // saveJewelleryDetails(){
  //   this.stepUp();
  //   console.log(this.tabelData);

  //
  // }

  saveForms(){

  const name = this.personalDetails.value.name;
  const phoneNumber1 = this.personalDetails.value.phoneNumber1;

  // const product = this.personalDetails.value.product;
  // const fatherName = this.personalDetails.value.fatherName;
  // const dob = this.personalDetails.value.dob;
  // const gender = this.personalDetails.value.gender;
  // const email = this.personalDetails.value.email;
  // const phoneNumber2 = this.personalDetails.value.phoneNumber2;
  // const loanAmount = this.personalDetails.value.loanAmount;
  // const loanPurpose = this.personalDetails.value.loanPurpose;
  // const tenure = this.personalDetails.value.tenure;

  // const documentType = this.documentDetails.value.documentType;
  // const documentNumber = this.documentDetails.value.documentNumber;
  // const panNumber = this.documentDetails.value.panNumber;
  // const pinCode = this.documentDetails.value.pinCode;
  // const areaName = this.documentDetails.value.areaName;
  // const addressLine1 = this.documentDetails.value.addressLine1;
  // const addressLine2 = this.documentDetails.value.addressLine2;

  // const branch = this.appointmentDetails.value.branch;

  const dateOfAppointment= this.appointmentDetails.value.dateOfAppointment;
  const timeOfAppointment = this.appointmentDetails.value.timeofAppointment;
  const ifsc = this.appointmentDetails.value.ifsc;
  const branch = this.appointmentDetails.value.branch;
  const bankName = this.appointmentDetails.value.bankName;

  const loanAccountNumber = this.loanDetails.value.loanAccountNumber;
  const loanAmount = this.loanDetails.value.loanAmount;
  const loanDate = this.loanDetails.value.loanDate;

  let finalData= {
    name: name,
    phoneNumber1: phoneNumber1,

    ifsc: ifsc,
    branch: branch,
    bankName: bankName,
    dateOfAppointment: dateOfAppointment,
    timeOfAppointment: timeOfAppointment,

    loanAmount: loanAmount,
    loanAccountNumber: loanAccountNumber,
    loanDate: loanDate,

    // product: product,
  // fatherName: fatherName,
  // dob: dob,
  // gender: gender,
  // email: email,
  // phoneNumber2: phoneNumber2,
  // loanAmount: loanAmount,
  // loanPurpose: loanPurpose,
  // tenure: tenure,

  // documentType: documentType,
  // documentNumber: documentNumber,
  // panNumber: panNumber,
  // pinCode: pinCode,
  // areaName: areaName,
  // addressLine1: addressLine1,
  // addressLine2: addressLine2,

  // jewelleryDetails: this.tabelData,

  // branch: branch,

  }
  console.log("final form data", finalData);
  }


  searchBank(ifscCode){
    console.log("searchBank", ifscCode);

    this.loginService.searchBank(ifscCode)
    .subscribe(
      user => {
        console.log("API is: ",user);

        this.appointmentDetails.patchValue({
          branch: user['BRANCH'],
          bankName: user['BANK']
        })
      },
      error => {
        console.log("Cannot Find Bank")
      }
    )

  }
}
