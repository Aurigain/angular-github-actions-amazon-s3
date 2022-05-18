import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  error
  isOtpForm: boolean = false;

  sendOTP() {
    this.submitLoanForm();

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

    const phoneNumber = this.newLoanForm.value.phone;
    if (!this.otp) {
      this.toastr.error("Please enter OTP", 'Error!', {
        timeOut: 4000,
      });
      return;
    }

    this.misc.verifyOtp(this.otp, phoneNumber).subscribe(
      data => {
        console.log("verified data: ", data)
        this.toastr.success("OTP Verified Successfully", 'Success!', {
          timeOut: 4000,
        });
        this.isOtpForm = false;
      },
      error => {
        // this.errors = error;
        this.misc.showLoader()
      }
    );

  }
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private misc: MiscellaneousService,
    private toastr: ToastrService
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
      phonenumber: phone,
      email: email,
      pincode: pinCode,
      loan_amount_needed: loanAmount,
      weight_of_gold_grams: weightOfGold,
      how_soon_need_loan_in_days: dateOfLoan,
      source: "web",
      loan_id: 1
    }
    console.log(detailFormData);

    this.misc.createFreshLeadWeb(detailFormData).subscribe(
      data => {
        console.log(data);
        if(!data['data']['error']){
          this.toastr.success("Lead Created Successfully", "Sucess", {
            timeOut: 4000,
          });
          this.detailForm.reset();
        }
        if(data['data']['error']){
          this.error = data['data']['detail'];
          this.toastr.error(this.error, "Error", {
          timeOut: 4000,
        })
        }
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
    const phone = this.newLoanForm.value.phone;

    this.misc.sendOtp(phone).subscribe(
      data => {
        if(data['data']['error'])
        {
          this.toastr.error(data['data']['detail'], "Error!")
        }
        if(!data['data']['error']){
          this.isLoanForm = false;
          this.isOtpForm = true;
          this.toastr.success("OTP sent successfully", "Success!");
        }
      });


    // console.log(formData);

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
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      subscribe: [],
    })

    this.balanceTransferForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
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
