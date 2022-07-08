import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/config/constants.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';

@Component({
  selector: 'app-add-balance-transfer-leads',
  templateUrl: './add-balance-transfer-leads.component.html',
  styleUrls: ['./add-balance-transfer-leads.component.scss']
})
export class AddBalanceTransferLeadsComponent implements OnInit {
  currentUserId: number;
  permanentPinCodeDetail
  pinCodeDetail;
  fetchBranchDetail
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private route: ActivatedRoute,
    private router: Router,
    private misc: MiscellaneousService,
    private toastr: ToastrService,
    private networkRequest: NetworkRequestService,
    private loginservice: LoginService
  ) {
    this.tabelData = [];
  }
  currentStep: number = 1;
  personalDetailsForm: FormGroup;
  documentDetailsForm: FormGroup;
  jewelleryDetailsForm: FormGroup;
  appointmentDetailsForm: FormGroup;
  addressDetailsForm: FormGroup;
  existingLoanDetailsForm: FormGroup;
  documentUploadDetailsForm: FormGroup;
  loanDetails: FormGroup;
  tabelData: any;

  leadDetails;
  documentDetails;
  appointmentDetails;
  addressDetails;
  pincodeDetail;
  profileData
  accountTransferDetails;

  originalArray = [
    { Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'active' },
    { Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'inactive' },
    { Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },
    { Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },
    { Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'InActive' },
    { Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },
    { Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },
    { Id: 10011, FullName: 'testui', FatherName: 'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'InActive' },
    { Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },
    { Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar', Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', status: 'Active' },

  ];


  get loanAccountNumber() {
    return this.loanDetails.get('loanAccountNumber')
  }
  get loanAmount() {
    return this.loanDetails.get('loanAmount')
  }
  get loanDate() {
    return this.loanDetails.get('loanDate')
  }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchBTLeadDetail(this.currentUserId);

    this.personalDetailsForm = this.formbuilder.group({
      // product: ['', [Validators.required,]],
      name: ['', [Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      fatherName: ['', [Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      gender: [''],
      phoneNumber1: ['', [Validators.pattern(this.conts.PHONE.pattern)]],
    })

    this.loanDetails = this.formbuilder.group({
      existing_loan_account_number: [''],
      outstanding_loan_amount: [''],
    })

    this.addressDetailsForm = this.formbuilder.group({
      pinCode: [''],
      city: [''],
      state: [''],
      addressLine1: [''],
      addressLine2: [''],
      permanent_address_line1: [''],
      permanent_address_line2: [''],
      permanent_pincode: [''],
      permanent_city: [''],
      permanent_state: [''],
    })

    this.jewelleryDetailsForm = this.formbuilder.group({
      weight_of_gold_grams: [''],
      gross_weight_gold: [''],
      karat: [''],
    })

    this.existingLoanDetailsForm = this.formbuilder.group({
      existing_loan_account_number: [''],
      outstanding_loan_amount: [''],
    })

    this.appointmentDetailsForm = this.formbuilder.group({
      // bank: ['', [Validators.required,]],
      ifsc: [''],
      bank: [],
      branch: [],
      appointment_date: [''],
      appointment_time: [''],
    })
    this.documentDetailsForm = this.formbuilder.group({
      documentType: ['', [Validators.required,]],
      documentNumber: ['', [Validators.required]],
      documentTypePOA: ['', [Validators.required,]],
      documentNumberPOA: ['', [Validators.required]],
      panNumber: ['', [Validators.required,]],
    })

    this.documentUploadDetailsForm = this.formbuilder.group({
      customerPhoto: ['', [Validators.required,]],
      blankCheck1: ['', [Validators.required]],
      blankCheck2: ['', [Validators.required]],
      kycPOI: ['', [Validators.required,]],
      kycPOA: ['', [Validators.required,]],
      loanDocument: ['', [Validators.required]],
      foreclosureLetter: ['', [Validators.required,]],
      atmWithdrawlSlip: ['', [Validators.required,]],
      promissoryNote: ['', [Validators.required,]],
      lastPageOfAgreement: ['', [Validators.required,]],
    })


  }

  fetchBTLeadDetail(id) {
    this.misc.leadLoanDetailById(id).subscribe(
      data => {
        console.log("bt lead detail:", data[0]);
        this.leadDetails = data[0];
        this.jewelleryDetailsForm.patchValue({
          weight_of_gold_grams: this.leadDetails['weight_of_gold_grams'],
          gross_weight_gold: this.leadDetails['gross_weight_gold'],
          karat: this.leadDetails['karat']
        })
        this.misc.fetchLeadProfileById(id).subscribe(
          data => {
            this.profileData = data[0]
            console.log("lead profile detail: ", this.profileData);

            this.personalDetailsForm.patchValue({
              name: this.profileData['fullname'],
              phoneNumber1: this.profileData['phonenumber'],
              fatherName: this.profileData['father_name'],
              gender: this.profileData['gender'],
            })
          },
          error => {
            console.log(error);
          }
        )
        this.fetchBTLeadDocumentDetails(id);
        this.fetchBTLeadAppointmentDetails(id);
        this.fetchBTLeadAccountTransferDetails(id);

        if (this.leadDetails['loan_type']['loan_type'] === 'bt_external') {
          this.fetchBTLeadAdressDetails(id)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  fetchBTLeadDocumentDetails(id) {
    this.misc.fetchLeadDocumentById(id).subscribe(data => {
      console.log("document details:", data[0]);
      this.documentDetails = data[0];
      // this.image.url.push(this.documentDetails['kyc_document_poa'])
      // this.image.url.push(this.documentDetails['kyc_document_poi'])
      // this.image.url.push(this.documentDetails['loan_document'])
      // this.image.url.push(this.documentDetails['security_cheque_1'])
      // this.image.url.push(this.documentDetails['security_cheque_2'])

      // if(this.documentDetails['promissory_note']){
      //   this.image.url.push(this.documentDetails['promissory_note'])
      // }
      // if(this.documentDetails['agreement_last_page']){
      //   this.image.url.push(this.documentDetails['agreement_last_page'])
      // }
      // if(this.documentDetails['security_cheque_transfer']){
      //   this.image.url.push(this.documentDetails['security_cheque_transfer'])
      // }
      // if(this.documentDetails['foreclousre_letter']){
      //   this.image.url.push(this.documentDetails['foreclousre_letter'])
      // }
      // if(this.documentDetails['atm_withdrawl']){
      //   this.image.url.push(this.documentDetails['atm_withdrawl'])
      // }

      // console.log(this.image.url)
    })
  }

  fetchBTLeadAppointmentDetails(id) {
    this.misc.fetchLeadAppointmentById(id).subscribe(data => {
      console.log("appointment details:", data[0]);
      this.appointmentDetails = data[0];
      this.appointmentDetailsForm.patchValue({
        ifsc: this.appointmentDetails['branch']['ifsc_code'],
        appointment_date: this.appointmentDetails['appointment_date'],
        appointment_time: this.appointmentDetails['appointment_time']
      })
      this.searchIFSC();
    })
  }

  fetchBTLeadAccountTransferDetails(id) {
    this.misc.fetchLeadAccountTransferDetailById(id).subscribe(data => {
      console.log("account transfer details:", data[0]);
      this.accountTransferDetails = data[0];
      this.loanDetails.patchValue({
        existing_loan_account_number: this.accountTransferDetails['existing_loan_account']['existing_loan_account_number'],
        outstanding_loan_amount: this.accountTransferDetails['existing_loan_account']['outstanding_loan_amount']
      })
    })
  }

  fetchBTLeadAdressDetails(id) {
    this.misc.fetchLeadAdressDetailById(id).subscribe(data => {
      console.log("address details:", data[0]);
      this.addressDetails = data[0];
      this.addressDetailsForm.patchValue({
        pinCode: this.addressDetails['pincode']['code'],
        addressLine1: this.addressDetails['address_line1'],
        addressLine2: this.addressDetails['address_line2'],
        permanent_address_line1: this.addressDetails['permanent_address_line1'],
        permanent_address_line2: this.addressDetails['permanent_address_line2'],
        permanent_pincode: this.addressDetails['permanent_pincode']['code']
      })
      this.searchPinCode();
      this.searchPermanentPinCode();
    })
  }


  searchPinCode() {
    const pincode = this.addressDetailsForm.value.pinCode;
    console.log(pincode.toString().length);
    if (pincode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pincode}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          this.pinCodeDetail = data['data'][0];
          this.addressDetailsForm.patchValue({
            city: this.pinCodeDetail['city'],
            state: this.pinCodeDetail['state'],
          })
        },
        error => {
          console.log("error", error);
        }
      );
    }
  }
  searchPermanentPinCode() {
    const pincode = this.addressDetailsForm.value.permanent_pincode;
    console.log(pincode.toString().length);
    if (pincode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pincode}`).subscribe(
        data => {
          console.log("permanent addres pincode data", data['data']);
          this.permanentPinCodeDetail = data['data'][0];
          this.addressDetailsForm.patchValue({
            permanent_city: this.permanentPinCodeDetail['city'],
            permanent_state: this.permanentPinCodeDetail['state'],
          })
        },
        error => {
          console.log("error", error);
        }
      );
    }
  }


  stepUp() {
    console.log("clicked")
    this.currentStep += 1;
    console.log(this.currentStep);
  }
  stepDown() {
    this.currentStep -= 1;
    console.log(this.currentStep);
  }

  addJewellery() {
    // const jewelleryType = this.jewelleryDetailsForm.value.jewelleryType;
    // const quantity = this.jewelleryDetailsForm.value.quantity;
    // const weight = this.jewelleryDetailsForm.value.weight;
    // const karats = this.jewelleryDetailsForm.value.karats;

    this.tabelData.push(this.jewelleryDetailsForm.value);
    this.jewelleryDetailsForm.reset();

  }

  removeItem(item) {
    this.tabelData.forEach((value, index) => {
      if (value == item) {
        this.tabelData.splice(index, 1)
      }
    })
  }

  savePersonalDetails() {

    console.log("inside save personal details")
    let personalDetailData: any;
    const name = this.personalDetailsForm.value.name;
    const phoneNumber1 = this.personalDetailsForm.value.phoneNumber1;
    const fatherName = this.personalDetailsForm.value.fatherName;
    const gender = this.personalDetailsForm.value.gender;

    personalDetailData = {
      fullname: name,
      phonenumber: phoneNumber1,
      gender: gender,
      father_name: fatherName,
    }
    console.log(personalDetailData);

    this.misc.updateLeadProfile(personalDetailData, this.profileData['id']).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Profile Updated Successfully", "Success")
        this.stepUp();
      }
    )

  }

  saveAddressDetailsForm() {
    const city = this.pinCodeDetail['cityId'];
    const state = this.pinCodeDetail['stateId'];
    const pincode = this.pinCodeDetail['id'];
    const addressLine1 = this.addressDetailsForm.value.addressLine1;
    const addressLine2 = this.addressDetailsForm.value.addressLine2;
    const permanent_address_line1 = this.addressDetailsForm.value.permanent_address_line1
    const permanent_address_line2 = this.addressDetailsForm.value.permanent_address_line2
    const permanent_pincode = this.permanentPinCodeDetail['id'];
    const permanent_city = this.permanentPinCodeDetail['cityId'];
    const permanent_state = this.permanentPinCodeDetail['stateId'];
    let addressDetailData = {
      city: city,
      state: state,
      pincode: pincode,
      address_line1: addressLine1,
      address_line2: addressLine2,
      permanent_address_line1: permanent_address_line1,
      permanent_address_line2: permanent_address_line2,
      permanent_pincode: permanent_pincode,
      permanent_city: permanent_city,
      permanent_state: permanent_state
    }
    console.log(addressDetailData);

    this.misc.updateLeadAddress(addressDetailData, this.addressDetails['id']).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Address Updated Successfully", "Success")
        this.stepUp();
      }
    )

  }



  savedocumentDetailsForm() {
    this.stepUp();

  }

  savebankDetailsForm() {
    this.stepUp();

  }

  savejewelleryDetailsForm() {
    // this.stepUp();
    const weight_of_gold_grams = this.jewelleryDetailsForm.value.weight_of_gold_grams
    const gross_weight_gold = this.jewelleryDetailsForm.value.gross_weight_gold
    const karat = this.jewelleryDetailsForm.value.karat

    let jewelleryData = {
      weight_of_gold_grams: weight_of_gold_grams,
      gross_weight_gold: gross_weight_gold,
      karat: karat
    }
    console.log(jewelleryData)

    this.misc.updateLeadJewellery(jewelleryData, this.leadDetails['id']).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Jewellery Data Updated Successfully", "Success")
        this.stepUp();
      }
    )

  }

  saveappointmentDetailsForm() {
    const appointment_date = this.appointmentDetailsForm.value.appointment_date;
    const appointment_time = this.appointmentDetailsForm.value.appointment_time;
    const ifsc = this.appointmentDetailsForm.value.ifsc;

    let appointmentDetailData = {
      appointment_date: appointment_date,
      appointment_time: appointment_time,
      ifsc: ifsc,
      lead: this.currentUserId
    }
    console.log(appointmentDetailData);

    this.misc.updateLeadAppointmentDetails(appointmentDetailData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Appointment Data Updated Successfully", "Success")
        this.stepUp();
      }
    )
  }

  saveexistingLoanDetailsForm() {
    // this.stepUp();
    const existing_loan_account_number = this.loanDetails.value.existing_loan_account_number
    const outstanding_loan_amount = this.loanDetails.value.outstanding_loan_amount

    let existingLoanData = {
      outstanding_loan_amount: outstanding_loan_amount,
      existing_loan_account_number: existing_loan_account_number
    }

    console.log(existingLoanData);

    this.misc.updateLeadLoanDetails(existingLoanData, this.accountTransferDetails['existing_loan_account']['id']).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Loan Data Updated Successfully", "Success")
        this.stepUp();
      }
    )


  }

  searchIFSC() {
    const ifscCode = this.appointmentDetailsForm.value.ifsc;
    if (ifscCode.length == 11) {
      this.loginservice.searchBank(ifscCode)
        .subscribe(
          data => {
            // console.log(data);
            this.fetchBranchDetail = data;
            console.log(this.fetchBranchDetail)
            this.appointmentDetailsForm.patchValue({
              bank: this.fetchBranchDetail['BANK'],
              branch: this.fetchBranchDetail['BRANCH']
            })
          },
          error => {
            // console.log("")
            this.toastr.error("Cannot Find Bank, Check the IFSC code again")
          }
        )
    }
  }
  saveForms() {

    const product = this.personalDetailsForm.value.product;
    const name = this.personalDetailsForm.value.name;
    const fatherName = this.personalDetailsForm.value.fatherName;
    const dob = this.personalDetailsForm.value.dob;
    const gender = this.personalDetailsForm.value.gender;
    const email = this.personalDetailsForm.value.email;
    const phoneNumber1 = this.personalDetailsForm.value.phoneNumber1;
    const phoneNumber2 = this.personalDetailsForm.value.phoneNumber2;
    const loanAmount = this.personalDetailsForm.value.loanAmount;
    const loanNumber = this.personalDetailsForm.value.loanNumber;
    const loanPurpose = this.personalDetailsForm.value.loanPurpose;

    const pinCode = this.addressDetailsForm.value.pinCode;
    const area = this.addressDetailsForm.value.area;
    const addressLine1 = this.addressDetailsForm.value.addressLine1;
    const addressLine2 = this.addressDetailsForm.value.addressLine2;

    const documentType = this.documentDetailsForm.value.documentType;
    const documentNumber = this.documentDetailsForm.value.documentNumber;
    const documentTypePOA = this.documentDetailsForm.value.documentTypePOA;
    const documentNumberPOA = this.documentDetailsForm.value.documentNumberPOA;
    const panNumber = this.documentDetailsForm.value.panNumber;


    const bank = this.appointmentDetailsForm.value.bank;
    const branch = this.appointmentDetailsForm.value.branch;
    const dateOfAppointment = this.appointmentDetailsForm.value.dateOfAppointment;
    const timeOfAppointment = this.appointmentDetailsForm.value.timeofAppointment;

    const bankName = this.existingLoanDetailsForm.value.bankName;
    const amountOld = this.existingLoanDetailsForm.value.amountOld;
    const dateOld = this.existingLoanDetailsForm.value.dateOld;
    const valuation = this.existingLoanDetailsForm.value.valuation;
    const outstandingAmount = this.existingLoanDetailsForm.value.outstandingAmount;
    const balanceTransferAmount = this.existingLoanDetailsForm.value.balanceTransferAmount;
    const requiredAmount = this.existingLoanDetailsForm.value.requiredAmount;
    const tenure = this.existingLoanDetailsForm.value.tenure;

    // const customerPhoto = this.documentUploadDetailsForm.value.customerPhoto;
    // const blankCheck1 = this.documentUploadDetailsForm.value.blankCheck1;
    // const blankCheck2= this.documentUploadDetailsForm.value.blankCheck2;
    // const kycPOA = this.documentUploadDetailsForm.value.kycPOA;
    // const kyc = this.documentUploadDetailsForm.value.kyc;
    // const loanDocument = this.documentUploadDetailsForm.value.loanDocument;
    // const foreclosureLetter = this.documentUploadDetailsForm.value.foreclosureLetter;
    // const atmWithdrawlSlip = this.documentUploadDetailsForm.value.atmWithdrawlSlip;
    // const promissoryNote = this.documentUploadDetailsForm.value.promissoryNote;
    // const lastPageOfAgreement = this.documentUploadDetailsForm.value.lastPageOfAgreement;

    let finalData: FormData = new FormData();
    finalData.append("product", product);
    finalData.append("name", name);
    finalData.append("fatherName", fatherName);
    finalData.append("dob", dob);
    finalData.append("gender", gender);
    finalData.append("email", email);
    finalData.append("phoneNumber1", phoneNumber1);
    finalData.append("phoneNumber2", phoneNumber2);
    finalData.append("loanAmount", loanAmount);
    finalData.append("loanNumber", loanNumber);
    finalData.append("loanPurpose", loanPurpose);
    finalData.append("pinCode", pinCode);
    finalData.append("area", area);
    finalData.append("addressLine1", addressLine1);
    finalData.append("addressLine2", addressLine2);
    finalData.append("documentType", documentType);
    finalData.append("documentNumber", documentNumber);
    finalData.append("documentTypePOA", documentTypePOA);
    finalData.append("documentNumberPOA", documentNumberPOA);
    finalData.append("jewelleryDetailsForm", this.tabelData);
    finalData.append("bank", bank);
    finalData.append("branch", branch);
    finalData.append("dateOfAppointment", dateOfAppointment);
    finalData.append("timeOfAppointment", timeOfAppointment);
    finalData.append("bankName", bankName);
    finalData.append("amountOld", amountOld);
    finalData.append("dateOld", dateOld);
    finalData.append("valuation", valuation);
    finalData.append("outstandingAmount", outstandingAmount);
    finalData.append("balanceTransferAmount", balanceTransferAmount);
    finalData.append("requiredAmount", requiredAmount);
    finalData.append("tenure", tenure);

    let customerPhoto: File;
    let blankCheck1: File;
    let blankCheck2: File;
    let kycPOI: File;
    let kycPOA: File;
    let loanDocument: File;
    let foreclosureLetter: File;
    let atmWithdrawlSlip: File;
    let promissoryNote: File;
    let lastPageOfAgreement: File;


    customerPhoto = (<HTMLInputElement>document.getElementById('customerPhoto')).files[0];
    finalData.append("cusomerPhoto", customerPhoto);

    blankCheck1 = (<HTMLInputElement>document.getElementById('blankCheck1')).files[0];
    finalData.append("blankCheck1", blankCheck1);

    blankCheck2 = (<HTMLInputElement>document.getElementById('blankCheck2')).files[0];
    finalData.append("blankCheck2", blankCheck2);

    kycPOI = (<HTMLInputElement>document.getElementById('kycPOI')).files[0];
    finalData.append("kycPOI", kycPOI);

    kycPOA = (<HTMLInputElement>document.getElementById('kycPOA')).files[0];
    finalData.append("kycPOA", kycPOA);

    loanDocument = (<HTMLInputElement>document.getElementById('loanDocument')).files[0];
    finalData.append("loanDocument", loanDocument);

    foreclosureLetter = (<HTMLInputElement>document.getElementById('foreclosureLetter')).files[0];
    finalData.append("foreclosureLetter", foreclosureLetter);

    atmWithdrawlSlip = (<HTMLInputElement>document.getElementById('atmWithdrawlSlip')).files[0];
    finalData.append("atmWithdrawlSlip", atmWithdrawlSlip);

    promissoryNote = (<HTMLInputElement>document.getElementById('promissoryNote')).files[0];
    finalData.append("promissoryNote", promissoryNote);

    lastPageOfAgreement = (<HTMLInputElement>document.getElementById('lastPageOfAgreement')).files[0];
    finalData.append("lastPageOfAgreement", lastPageOfAgreement);



    // let finalData= {
    // product: product,
    // name: name,
    // fatherName: fatherName,
    // dob: dob,
    // gender: gender,
    // email: email,
    // phoneNumber1: phoneNumber1,
    // phoneNumber2: phoneNumber2,
    // loanAmount: loanAmount,
    // loanNumber: loanNumber,
    // loanPurpose: loanPurpose,

    // pinCode: pinCode,
    // area: area,
    // addressLine1: addressLine1,
    // addressLine2: addressLine2,

    // documentType: documentType,
    // documentNumber: documentNumber,
    // documentTypePOA: documentTypePOA,
    // documentNumberPOA: documentNumberPOA,
    // panNumber: panNumber,


    // jewelleryDetailsForm: this.tabelData,

    // bank: bank,
    // branch: branch,
    // dateOfAppointment: dateOfAppointment,
    // timeOfAppointment: timeOfAppointment,

    // bankName: bankName,
    // amountOld: amountOld,
    // dateOld: dateOld,
    // valuation: valuation,
    // outstandingAmount: outstandingAmount,
    // balanceTransferAmount: balanceTransferAmount,
    // requiredAmount: requiredAmount,
    // tenure: tenure,
    // }





    // console.log("image form data", imageData);
    console.log("final form data", finalData);
  }
}
