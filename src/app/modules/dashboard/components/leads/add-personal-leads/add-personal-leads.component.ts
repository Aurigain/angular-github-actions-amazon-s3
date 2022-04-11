import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-personal-leads',
  templateUrl: './add-personal-leads.component.html',
  styleUrls: ['./add-personal-leads.component.scss']
})
export class AddPersonalLeadsComponent implements OnInit {
  currentUserId: number;
  personalLeadForm: FormGroup;
  personalDetails: FormGroup;
  kycDetailForm:FormGroup;
  bankDetailForm:FormGroup;
  sourceForm:FormGroup;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.personalDetails = this.formbuilder.group({
      name: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      addressLine1: ['', Validators.required],
    })

    this.kycDetailForm = this.formbuilder.group({
      income: ['', Validators.required],
      adharCard: ['', Validators.required],
      panCard: ['', Validators.required],
    })

    this.bankDetailForm = this.formbuilder.group({
      bankAccountNumber: ['', Validators.required],
      IFSC: ['', Validators.required],
      branchName: ['', Validators.required],
    })

    this.sourceForm = this.formbuilder.group({
      source: ['', Validators.required],
      commissionRate: ['', Validators.required]
    })

    if (this.currentUserId !== 0){

      for (let i = 0; i < this.originalArray.length; i++) {
        if (this.originalArray[i]['Id'] == this.currentUserId){
          console.log("inside")
          this.personalLeadForm.patchValue({
            name: this.originalArray[i]['FullName'],
          })
        }
      }
    }
  }

  currentStep: number = 1;

  appointmentDetails: FormGroup;
  loanDetails: FormGroup;
  tabelData:any

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
  get pinCode(){
    return this.appointmentDetails.get('pinCode');
  }
  get dateOfAppointment(){
    return this.appointmentDetails.get('dateOfAppointment');
  }
  get timeOfAppointment(){
    return this.appointmentDetails.get('timeOfAppointment');
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
  const pinCode = this.appointmentDetails.value.pinCode;
  const branch = this.appointmentDetails.value.branch;

  const loanAccountNumber = this.loanDetails.value.loanAccountNumber;
  const loanAmount = this.loanDetails.value.loanAmount;
  const loanDate = this.loanDetails.value.loanDate;

  let finalData= {
    name: name,
    phoneNumber1: phoneNumber1,

    pinCode: pinCode,
    branch: branch,
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

}
