import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/config/constants.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
@Component({
  selector: 'app-gold-loan',
  templateUrl: './gold-loan.component.html',
  styleUrls: ['./gold-loan.component.scss']
})
export class GoldLoanComponent implements OnInit {

  newLoanForm: FormGroup;
  detailForm: FormGroup;
  balanceTransferForm: FormGroup;
  otp: number;
  isChecked: boolean = false;

  isLoanForm: boolean = true;
  isOtpForm: boolean = false;

  sendOTP() {

  }

  submitOTP() {
    console.log(this.otp);
    this.detailForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
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
    private misc: MiscellaneousService,
  ) { }

  submitDetailForm() {
    const name = this.newLoanForm.value.name;
    const phone = this.newLoanForm.value.phone;
    const email = this.detailForm.value.email;
    const pinCode = this.detailForm.value.pinCode;
    const loanAmount = this.detailForm.value.loanAmount;
    const weightOfGold = this.detailForm.value.weightOfGold;
    const dateOfLoan = this.detailForm.value.dateOfLoan;

    // "fullname": "uday singh",
    // "email": "ud@ud.com",
    // "pincode": "110059",
    // "loan_amount_needed": 100,
    // "weight_of_gold_grams": 100,
    // "how_soon_need_loan_in_days":1,
    // "source":"web",
    // "phonenumber":"888888888"
    let detailFormData = {
      fullname: name,
      phone: phone,
      email: email,
      pinCode: pinCode,
      loan_amount_needed: loanAmount,
      weight_of_gold_grams: weightOfGold,
      how_soon_need_loan_in_days: dateOfLoan,
      source: "web"
    }

    console.log(detailFormData);

    this.misc.createFreshLeadWeb(detailFormData).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    )
  }
  get name() {
    return this.newLoanForm.get('name');
  }

  get phone() {
    return this.newLoanForm.get('phone');
  }

  get bName() {
    return this.balanceTransferForm.get('name');
  }

  get bPhone() {
    return this.balanceTransferForm.get('phone');
  }

  get bEmail() {
    return this.balanceTransferForm.get('email');
  }
  get bPinCode() {
    return this.balanceTransferForm.get('pinCode');
  }
  get bExistingLoanFrom() {
    return this.balanceTransferForm.get('existingLoanFrom');
  }
  get bCurrentOutstandingAmount() {
    return this.balanceTransferForm.get('currentOutstandingAmount');
  }


  submitLoanForm() {
    const name = this.newLoanForm.value.name;
    const phone = this.newLoanForm.value.phone;
    const subscribe = this.isChecked;

    const formData = {
      name: name,
      phone: phone,
      subscribe: subscribe,
    }

    console.log(formData);
    this.isLoanForm = false;
    this.isOtpForm = true;
  }

  submitBalanceTransferForm() {
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

    if (otp) {
      let otpData = {
        otp: otp,
      }
      console.log(otpData);
    }

  }

  onChange(event) {
    console.log(event.target.checked);
    this.isChecked = event.target.checked;
  }
  ngOnInit(): void {

    this.newLoanForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      subscribe: [],
    })

    this.balanceTransferForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      pinCode: ['', [Validators.required,]],
      existingLoanFrom: ['', [Validators.required]],
      currentOutstandingAmount: ['', [Validators.required]],
      subscribe: [],
      otp: [],
    })

  }

}
