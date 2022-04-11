import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/config/constants.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  Roles:any = ['supervisor', 'client', 'agent'];

  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
  ) {
    this.tabelData = [];
   }
  currentStep: number = 1;
  personalDetails: FormGroup;
  bankDetails: FormGroup;
  kycDetailForm: FormGroup;
  otherPersonalDetails: FormGroup;
  tabelData:any

  ngOnInit(): void {

    this.personalDetails = this.formbuilder.group({

      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      employeeCode: ['', [Validators.required,]],
      location: ['', [Validators.required,]],
      designation: ['', [Validators.required,]],
      reportingPerson: ['', [Validators.required,]]
    })

    this.bankDetails = this.formbuilder.group({
      bankName: ['', [Validators.required,]],
      amountOld: ['', [Validators.required]],
      dateOld: ['', [Validators.required,]],
      valuation: ['', [Validators.required,]],
      outstandingAmount: ['', [Validators.required,]],
      balanceTransferAmount: ['', [Validators.required,]],
      requiredAmount: ['', [Validators.required,]],
      tenure: ['', [Validators.required,]],
    })

    this.kycDetailForm = this.formbuilder.group({
      qualification: [''],
      panNumber: ['', [Validators.required,]],
      adhaarNumber: ['', [Validators.required,]],
      occupation: ['', [Validators.required,]],
    })
  }

  get qualification(){
    return this.kycDetailForm.get('qualification');
  }
  get panNumber(){
    return this.kycDetailForm.get('panNumber');
  }
  get adhaarNumber(){
    return this.kycDetailForm.get('adhaarNumber');
  }
  get occupation(){
    return this.kycDetailForm.get('occupation');
  }

  saveBankDetails(){
    this.stepUp();
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
    const employeeCode = this.personalDetails.value.employeeCode;
    const location = this.personalDetails.value.location;
    const designation = this.personalDetails.value.designation;
    const reportingPerson = this.personalDetails.value.reportingPerson;


    personalDetailData = {

      name: name,
      email: employeeCode,
      phone: location,
      address: designation,
      role: reportingPerson
   }

    console.log(personalDetailData);

  }


  saveForms(){

    const name = this.personalDetails.value.name;
    const employeeCode = this.personalDetails.value.employeeCode;
    const location = this.personalDetails.value.location;
    const designation = this.personalDetails.value.designation;
    const reportingPerson = this.personalDetails.value.reportingPerson;

    const bankName = this.bankDetails.value.bankName;
    const amountOld = this.bankDetails.value.amountOld;
    const dateOld= this.bankDetails.value.dateOld;
    const valuation = this.bankDetails.value.valuation;
    const outstandingAmount = this.bankDetails.value.outstandingAmount;
    const balanceTransferAmount = this.bankDetails.value.balanceTransferAmount;
    const requiredAmount = this.bankDetails.value.requiredAmount;
    const tenure = this.bankDetails.value.tenure;


  let finalData= {
    name: name,
    employeeCode: employeeCode,
    location: location,
    designation: designation,
    reportingPerson: reportingPerson,

   bankName: bankName,
    amountOld: amountOld,
    dateOld: dateOld,
    valuation: valuation,
    outstandingAmount: outstandingAmount,
    balanceTransferAmount: balanceTransferAmount,
    requiredAmount: requiredAmount,
    tenure: tenure,

  jewelleryDetails: this.tabelData,

  }
  console.log("final form data", finalData);
  }
}
