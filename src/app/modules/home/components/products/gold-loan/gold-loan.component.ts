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

  kyc_document_poa_img
loan_document_img
security_cheque_1_img

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
      loan_id: 1,
      company: 6
    }
    console.log(detailFormData);

    this.misc.createFreshLeadWeb(detailFormData).subscribe(
      data => {
        console.log(data);
        if (!data['data']['error']) {
          this.toastr.success("Lead Created Successfully", "Sucess", {
            timeOut: 4000,
          });
          this.detailForm.reset();
        }
        if (data['data']['error']) {
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
    return this.balanceTransferForm.get('fullname');
  }

  get bPhone() {
    return this.balanceTransferForm.get('mobile_number');
  }

  get gender() {
    return this.balanceTransferForm.get('gender');
  }
  get gross_weight_gold() {
    return this.balanceTransferForm.get('gross_weight_gold');
  }
  get net_weight_gold() {
    return this.balanceTransferForm.get('net_weight_gold');
  }
  get bank_ifsc_code() {
    return this.balanceTransferForm.get('bank_ifsc_code');
  }
  get appointment_date() {
    return this.balanceTransferForm.get('appointment_date');
  }
  get appointment_time() {
    return this.balanceTransferForm.get('appointment_time');
  }
  get karat() {
    return this.balanceTransferForm.get('karat');
  }
  get current_loan_account_number() {
    return this.balanceTransferForm.get('current_loan_account_number');
  }
  get outstanding_loan_amount() {
    return this.balanceTransferForm.get('outstanding_loan_amount');
  }
  get balance_transfer_amount() {
    return this.balanceTransferForm.get('balance_transfer_amount');
  }
  get security_cheque_1() {
    return this.balanceTransferForm.get('security_cheque_1');
  }
  get kyc_document_poa() {
    return this.balanceTransferForm.get('kyc_document_poa');
  }
  get loan_document() {
    return this.balanceTransferForm.get('loan_document');
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
        if (data['data']['error']) {
          this.toastr.error(data['data']['detail'], "Error!")
        }
        if (!data['data']['error']) {
          this.isLoanForm = false;
          this.isOtpForm = true;
          this.toastr.success("OTP sent successfully", "Success!");
        }
      });


    // console.log(formData);

  }

  submitBalanceTransferForm() {
    const fullname = this.balanceTransferForm.value.fullname;
    const mobile_number = this.balanceTransferForm.value.mobile_number;
    const gender = this.balanceTransferForm.value.gender;
    const gross_weight_gold = this.balanceTransferForm.value.gross_weight_gold
    const net_weight_gold = this.balanceTransferForm.value.net_weight_gold
    const karat = this.balanceTransferForm.value.karat
    const current_loan_account_number = this.balanceTransferForm.value.current_loan_account_number
    const outstanding_loan_amount = this.balanceTransferForm.value.outstanding_loan_amount
    const bank_ifsc_code = this.balanceTransferForm.value.bank_ifsc_code
    const appointment_date = this.balanceTransferForm.value.appointment_date
    const appointment_time = this.balanceTransferForm.value.appointment_time
    const balance_transfer_amount = this.balanceTransferForm.value.balance_transfer_amount;

    const security_cheque_1 = this.security_cheque_1_img;
    const kyc_document_poa =this.kyc_document_poa_img;
    const loan_document = this.loan_document_img;



    let formData = new FormData();
      formData.append("fullname", fullname)
      formData.append("mobile_number", mobile_number)
      formData.append("gender", gender)
      formData.append("gross_weight_gold", gross_weight_gold)
      formData.append("net_weight_gold", net_weight_gold)
      formData.append("karat", karat)
      formData.append("current_loan_account_number",current_loan_account_number),
      formData.append("outstanding_loan_amount", outstanding_loan_amount)
      formData.append("bank_ifsc_code", bank_ifsc_code)
      formData.append("appointment_date", appointment_date)
      formData.append("appointment_time", appointment_time)
      formData.append("balance_transfer_amount", balance_transfer_amount)
      formData.append("loan_id", "1")
      formData.append("security_cheque_1", security_cheque_1)
      formData.append("kyc_document_poa", kyc_document_poa)
      formData.append("loan_document", loan_document)

    console.log(formData);
    this.misc.createBTLeadWeb(formData).subscribe(
      data =>{
        console.log(data);

      },
      error =>{
        console.log(error)
      }
    )
  }

  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (event.target.id === 'kyc_document_poa') {
      this.kyc_document_poa_img = file;
      console.log(this.kyc_document_poa_img)
    }
    else if (event.target.id === 'loan_document') {
    this.loan_document_img = file;
    console.log(this.loan_document_img)
    }
    else if (event.target.id === 'security_cheque_1') {
    this.security_cheque_1_img = file;
    console.log(this.security_cheque_1_img)
    }
    console.log("filee",file)
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
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      mobile_number: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      gender: ['', [Validators.required]],

      gross_weight_gold: ['', [Validators.required,]],
      net_weight_gold: ['', [Validators.required]],
      karat: ['', [Validators.required]],

      current_loan_account_number: ['', [Validators.required]],
      outstanding_loan_amount: ['', [Validators.required]],

      bank_ifsc_code: ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      appointment_time: ['', [Validators.required]],

      balance_transfer_amount: ['', [Validators.required]],

      kyc_document_poa: ['', [Validators.required]],
      loan_document: ['', [Validators.required]],

      security_cheque_1: ['', [Validators.required]],

      subscribe: [],
      otp: [],
    })

  }

}
