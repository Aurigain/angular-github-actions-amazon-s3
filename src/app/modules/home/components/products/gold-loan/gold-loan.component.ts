import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/config/constants.service';
@Component({
  selector: 'app-gold-loan',
  templateUrl: './gold-loan.component.html',
  styleUrls: ['./gold-loan.component.scss']
})
export class GoldLoanComponent implements OnInit {

  newLoanForm: FormGroup;
  detailForm: FormGroup;
  balanceTransferForm: FormGroup;
  otp:number;
  isChecked:boolean = false;

  isLoanForm:boolean = true;
  isOtpForm:boolean = false;

  sendOTP(){

  }

  submitOTP(){
    console.log (this.otp);
    this.detailForm = this.formbuilder.group({
      email: ['',[Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      pinCode: [''],
      loanAmount: [''],
      weightOfGold: [''],
      dateOfLoan: [''],
    })

    this.isOtpForm = false;
  }
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
  ) { }

  submitDetailForm(){
    const email = this.detailForm.value.email;
    const pinCode = this.detailForm.value.pinCode;
    const loanAmount = this.detailForm.value.loanAmount;
    const weightOfGold = this.detailForm.value.weightOfGold;
    const dateOfLoan = this.detailForm.value.dateOfLoan;

    let detailFormData = {
      email: email,
      pinCode: pinCode,
      loanAmount: loanAmount,
      weightOfGold: weightOfGold,
      dateOfLoan: dateOfLoan,
    }

    console.log(detailFormData);
    
  }
  get name(){
    return this.newLoanForm.get('name');
  }
  
  get phone(){
    return this.newLoanForm.get('phone');
  }

  get bName(){
    return this.balanceTransferForm.get('name');
  }
  
  get bPhone(){
    return this.balanceTransferForm.get('phone');
  }

  get bEmail(){
    return this.balanceTransferForm.get('email');
  }
  get bPinCode(){
    return this.balanceTransferForm.get('pinCode');
  }
  get bExistingLoanFrom(){
    return this.balanceTransferForm.get('existingLoanFrom');
  }
  get bCurrentOutstandingAmount(){
    return this.balanceTransferForm.get('currentOutstandingAmount');
  }


  submitLoanForm(){
    const name = this.newLoanForm.value.name;
    const phone = this.newLoanForm.value.phone;
    const subscribe = this.isChecked;
    
    const formData ={
      name: name,
      phone: phone,
      subscribe: subscribe,
    }

    console.log(formData);
    this.isLoanForm = false;
    this.isOtpForm = true;
  }
  
  submitBalanceTransferForm(){
    const name = this.balanceTransferForm.value.name;
    const phone = this.balanceTransferForm.value.phone;
    const email = this.balanceTransferForm.value.email;
    const pinCode = this.balanceTransferForm.value.pinCode;
    const existingLoanFrom = this.balanceTransferForm.value.existingLoanFrom;
    const currentOutstandingAmount = this.balanceTransferForm.value.currentOutstandingAmount;
    const subscribe = this.isChecked;
    const otp = this.balanceTransferForm.value.otp;
    let formData = {
      name: name,
      email: email,
      phone: phone,
      pinCode: pinCode,
      existingLoanFrom: existingLoanFrom,
      currentOutstandingAmount: currentOutstandingAmount,
      subscribe: subscribe,
    }
    console.log(formData);

    if(otp) {
      let otpData = {
        otp: otp,
      }
      console.log(otpData);
    }
    
  }

  onChange(event){
    console.log(event.target.checked);
    this.isChecked = event.target.checked;
  }
  ngOnInit(): void {

    this.newLoanForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      subscribe: [],
    })

    this.balanceTransferForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      email: ['',[Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      pinCode: ['',[Validators.required,]],
      existingLoanFrom: ['', [Validators.required]],
      currentOutstandingAmount: ['', [Validators.required]],
      subscribe: [],
      otp: [],
    })    

  }

}
