import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/config/constants.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';
@Component({
  selector: 'app-compliance-panel-detail',
  templateUrl: './compliance-panel-detail.component.html',
  styleUrls: ['./compliance-panel-detail.component.scss']
})
export class CompliancePanelDetailComponent implements OnInit {
  isPersonalDetailCorrect: boolean = false;
  isAccountTransferDetailCorrect: boolean = false;
  isFundingDetailCorrect: boolean = false;
  isDocumentDetailCorrect: boolean = false;
  isAppointmentDetailCorrect: boolean = false;
  currentUserId: number;
  nameChecker;
  nameRemark = "";
  addressChecker;
  addressRemark = "";
  photoChecker;
  photoRemark = "";
  // nameChecker;
  // nameRemark = "";

  nameRe = "";
  image = {
    url: ['']
  }


  dynamicImage = "https://eaadharcards.in/wp-content/uploads/2019/04/Aadhaar-Card-Sample.png";
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private route: ActivatedRoute,
    private router: Router,
    private misc: MiscellaneousService,
    private networkRequest: NetworkRequestService,
    private toastr: ToastrService

  ) {
    this.tabelData = [];
  }
  currentStep: number = 1;
  personalDetails;
  jewelleryDetails;
  appointmentDetails;
  addressDetails;
  existingLoanDetails;
  documentUploadDetails;
  loanDetails: FormGroup;
  tabelData: any;
  leadDetails
  profileData
  documentDetails;
  dataVerify;
  imageVerify;
  accountTransferDetails;

  existing_loan_status
  existing_loan_remark
  fund_transfer_status
  fund_transfer_remark
  appointment_status
  appointment_remark
  agreement_status
  agreement_remark

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

  loadImage(data, dynamicImage) {
    this.dataVerify = data;
    this.imageVerify = dynamicImage;
  }
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
    this.fetchBTLeadDetail(this.currentUserId)
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        if (params['step']) {
          this.currentStep = parseInt(params['step']);
        }
        // console.log(this.orderby); // price
      }
      );
    // this.personalDetails = this.formbuilder.group({

    //   name: [''],
    //   address: [''],
    //   customerPhoto: [''],
    //   phone: [''],
    //   gender: [''],
    //   alternateContact: [''],
    //   fatherName: [''],
    // })

    // this.loanDetails = this.formbuilder.group({
    //   loanAccountNumber: ['', [Validators.required,]],
    //   loanAmount: ['', [Validators.required,]],
    //   loanDate: ['', [Validators.required,]],
    // })

    // this.addressDetails = this.formbuilder.group({
    //   pinCode: ['', [Validators.required,]],
    //   area: ['', [Validators.required]],
    //   addressLine1: ['', [Validators.required,]],
    //   addressLine2: ['', [Validators.required]],
    // })

    // this.jewelleryDetails = this.formbuilder.group({
    //   jewelleryType: ['', [Validators.required,]],
    //   quantity: ['', [Validators.required]],
    //   weight: ['', [Validators.required,]],
    //   karats: ['', [Validators.required,]],
    // })

    // this.existingLoanDetails = this.formbuilder.group({
    //   bankName: ['', [Validators.required,]],
    //   amountOld: ['', [Validators.required]],
    //   dateOld: ['', [Validators.required,]],
    //   valuation: ['', [Validators.required,]],
    //   outstandingAmount: ['', [Validators.required,]],
    //   balanceTransferAmount: ['', [Validators.required,]],
    //   requiredAmount: ['', [Validators.required,]],
    //   tenure: ['', [Validators.required,]],
    // })

    // this.appointmentDetails = this.formbuilder.group({
    //   bank: ['', [Validators.required,]],
    //   branch: ['', [Validators.required,]],
    //   dateOfAppointment: ['', [Validators.required]],
    //   timeOfAppointment: ['', [Validators.required,]],
    // })
    // this.documentDetails = this.formbuilder.group({
    //   documentType: ['', [Validators.required,]],
    //   documentNumber: ['', [Validators.required]],
    //   documentTypePOA: ['', [Validators.required,]],
    //   documentNumberPOA: ['', [Validators.required]],
    //   panNumber: ['', [Validators.required,]],
    // })

    // this.documentUploadDetails = this.formbuilder.group({
    //   customerPhoto: ['', [Validators.required,]],
    //   blankCheck1: ['', [Validators.required]],
    //   blankCheck2: ['', [Validators.required]],
    //   kycPOI: ['', [Validators.required,]],
    //   kycPOA: ['', [Validators.required,]],
    //   loanDocument: ['', [Validators.required]],
    //   foreclosureLetter: ['', [Validators.required,]],
    //   atmWithdrawlSlip: ['', [Validators.required,]],
    //   promissoryNote: ['', [Validators.required,]],
    //   lastPageOfAgreement: ['', [Validators.required,]],
    // })

    // if (this.currentUserId !== 0){

    //   for (let i = 0; i < this.originalArray.length; i++) {
    //     if (this.originalArray[i]['Id'] == this.currentUserId){
    //       this.personalDetails.patchValue({
    //         name: this.originalArray[i]['FullName'],
    //       })
    //     }
    //   }
    // }
  }



  fetchBTLeadDetail(id) {
    this.misc.leadLoanDetailById(id).subscribe(
      data => {
        console.log("bt lead detail:", data[0]);
        this.leadDetails = data[0];
        // const id = data['lead']['id'];
        if (this.leadDetails['lead']['is_approved']) {
          this.nameChecker = "True";
          this.nameRemark = this.leadDetails['lead']['remarks']
          console.log("checker and remark are:", this.nameChecker, this.nameRemark)
        }
        else {
          this.nameChecker = "False";
          this.nameRemark = this.leadDetails['lead']['remarks']
          console.log("checker and remark are:", this.nameChecker, this.nameRemark)
        }

        this.misc.fetchLeadProfileById(id).subscribe(
          data => {
            this.profileData = data[0]
            console.log("lead profile detail: ", this.profileData);
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
      this.image.url.push(this.documentDetails['kyc_document_poa'])
      this.image.url.push(this.documentDetails['kyc_document_poi'])
      this.image.url.push(this.documentDetails['loan_document'])
      this.image.url.push(this.documentDetails['security_cheque_1'])
      this.image.url.push(this.documentDetails['security_cheque_2'])
      console.log(this.image.url)
      if (this.documentDetails['is_image_approved']) {
        this.photoChecker = "True";
        this.photoRemark = this.documentDetails['image_remarks']
      }
      else {
        this.photoChecker = "False";
        this.photoRemark = this.documentDetails['image_remarks']
      }
      if (this.documentDetails['is_docs_approved']) {
        this.agreement_status = "True";
        this.agreement_remark = this.documentDetails['docs_remarks']
      }
      else {
        this.agreement_status = "False";
        this.agreement_remark = this.documentDetails['docs_remarks']
      }
    })
  }

  fetchBTLeadAppointmentDetails(id) {
    this.misc.fetchLeadAppointmentById(id).subscribe(data => {
      console.log("appointment details:", data[0]);
      this.appointmentDetails = data[0];
      if (this.appointmentDetails['is_approved']) {
        this.appointment_status = "True";
        this.appointment_remark = this.appointmentDetails['remarks']
      }
      else {
        this.appointment_status = "False";
        this.appointment_remark = this.appointmentDetails['remarks']
      }
    })
  }

  fetchBTLeadAdressDetails(id) {
    this.misc.fetchLeadAdressDetailById(id).subscribe(
      data => {
        console.log("address details:", data[0]);
        this.addressDetails = data[0];
        if (this.addressDetails['is_approved']) {
          this.addressChecker = "True";
          this.addressRemark = this.addressDetails['remarks']
        }
        else {
          this.addressChecker = "False";
          this.addressRemark = this.addressDetails['remarks']
        }
      },
      error => {
        console.log("error", error);
      }
    )
  }

  fetchBTLeadAccountTransferDetails(id) {
    this.misc.fetchLeadAccountTransferDetailById(id).subscribe(data => {
      console.log("account transfer details:", data[0]);
      this.accountTransferDetails = data[0];
      if (this.accountTransferDetails['is_approved']) {
        this.fund_transfer_status = "True";
        this.fund_transfer_remark = this.accountTransferDetails['remarks']
      }
      else {
        this.fund_transfer_status = "False";
        this.fund_transfer_remark = this.accountTransferDetails['remarks']
      }
      if (this.accountTransferDetails['existing_loan_account']['is_approved']) {
        this.existing_loan_status = "True";
        this.existing_loan_remark = this.accountTransferDetails['existing_loan_account']['remarks']
      }
      else {
        this.existing_loan_status = "False";
        this.existing_loan_remark = this.accountTransferDetails['existing_loan_account']['remarks']
      }
    })
  }


  stepUp() {
    console.log("name remark is:", this.nameRe);
    console.log("clicked")
    this.currentStep += 1;
    console.log(this.currentStep);
  }
  stepDown() {
    this.currentStep -= 1;
    console.log(this.currentStep);
  }

  checkFinalStatus() {
    if (this.leadDetails['loan_type']['loan_type'] === 'bt_internal') {
      if (this.nameChecker === 'True' && this.photoChecker === 'True') {
        this.isPersonalDetailCorrect = true;
        console.log(this.nameChecker, this.photoChecker);
      }
    }
    if (this.leadDetails['loan_type']['loan_type'] === 'bt_external') {
      if (this.nameChecker === 'True' && this.addressChecker === 'True' && this.photoChecker === 'True') {
        this.isPersonalDetailCorrect = true;
        console.log(this.nameChecker, this.addressChecker, this.photoChecker);
      }
    }
    if (this.existing_loan_status==='True') {
      this.isAccountTransferDetailCorrect = true;
    }
    if (this.fund_transfer_status==='True') {
      this.isFundingDetailCorrect = true;
    }
    if (this.appointment_status==='True') {
      this.isDocumentDetailCorrect = true;
    }
    if (this.agreement_status==='True') {
      this.isAppointmentDetailCorrect = true;
    }
  }
  addJewellery() {
    // const jewelleryType = this.jewelleryDetails.value.jewelleryType;
    // const quantity = this.jewelleryDetails.value.quantity;
    // const weight = this.jewelleryDetails.value.weight;
    // const karats = this.jewelleryDetails.value.karats;

    this.tabelData.push(this.jewelleryDetails.value);
    this.jewelleryDetails.reset();

  }

  removeItem(item) {
    this.tabelData.forEach((value, index) => {
      if (value == item) {
        this.tabelData.splice(index, 1)
      }
    })
  }

  savePersonalDetails() {
    const nameChecker = this.nameChecker;
    const addressChecker = this.addressChecker;
    const photoChecker = this.photoChecker;
    const nameRemark = this.nameRemark;
    const addressRemark = this.addressRemark;
    const photoRemark = this.photoRemark;
    const existing_loan_status = this.existing_loan_status;
    const existing_loan_remark = this.existing_loan_remark;
    const fund_transfer_status = this.fund_transfer_status;
    const fund_transfer_remark = this.fund_transfer_remark;
    const appointment_status = this.appointment_status;
    const appointment_remark = this.appointment_remark;
    const agreement_status = this.agreement_status;
    const agreement_remark = this.agreement_remark;

    let personalData;
    if(this.leadDetails['loan_type']['loan_type'] === 'bt_internal'){
      personalData = {
        lead: this.currentUserId,
        personal_status: nameChecker,
        personal_details_remark: nameRemark,
        address_status: "True",
        address_remark: "not provided",
        customer_image_status: photoChecker,
        customer_image_status_remark: photoRemark,
        existing_loan_status: existing_loan_status,
        existing_loan_remark: existing_loan_remark,
        fund_transfer_status: fund_transfer_status,
        fund_transfer_remark: fund_transfer_remark,
        appointment_status: appointment_status,
        appointment_remark: appointment_remark,
        agreement_status: agreement_status,
        agreement_remark: agreement_remark,
      }
    }
    else {
      personalData = {
        lead: this.currentUserId,
        personal_status: nameChecker,
        personal_details_remark: nameRemark,
        address_status: addressChecker,
        address_remark: addressRemark,
        customer_image_status: photoChecker,
        customer_image_status_remark: photoRemark,
        existing_loan_status: existing_loan_status,
        existing_loan_remark: existing_loan_remark,
        fund_transfer_status: fund_transfer_status,
        fund_transfer_remark: fund_transfer_remark,
        appointment_status: appointment_status,
        appointment_remark: appointment_remark,
        agreement_status: agreement_status,
        agreement_remark: agreement_remark,
      }
    }

    console.log(personalData);

    this.misc.balanceTransferPreFinalApproval(personalData).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data['message'], "Success!");
      },
      error => {
        this.toastr.success(error['message']['message'], "Error!");
      }
    )

  }

  saveAddressDetails() {
    this.stepUp();


  }

  saveDocumentDetails() {
    this.stepUp();



  }

  saveJewelleryDetails() {
    this.stepUp();
    console.log(this.tabelData);


  }

  saveAppointmentDetails() {
    this.stepUp();


  }

  saveExistingLoanDetails() {
    this.stepUp();

  }

  saveForms() {

    const product = this.personalDetails.value.product;
    const name = this.personalDetails.value.name;
    const fatherName = this.personalDetails.value.fatherName;
    const dob = this.personalDetails.value.dob;
    const gender = this.personalDetails.value.gender;
    const email = this.personalDetails.value.email;
    const phoneNumber1 = this.personalDetails.value.phoneNumber1;
    const phoneNumber2 = this.personalDetails.value.phoneNumber2;
    const loanAmount = this.personalDetails.value.loanAmount;
    const loanNumber = this.personalDetails.value.loanNumber;
    const loanPurpose = this.personalDetails.value.loanPurpose;

    const pinCode = this.addressDetails.value.pinCode;
    const area = this.addressDetails.value.area;
    const addressLine1 = this.addressDetails.value.addressLine1;
    const addressLine2 = this.addressDetails.value.addressLine2;

    const documentType = this.documentDetails.value.documentType;
    const documentNumber = this.documentDetails.value.documentNumber;
    const documentTypePOA = this.documentDetails.value.documentTypePOA;
    const documentNumberPOA = this.documentDetails.value.documentNumberPOA;
    const panNumber = this.documentDetails.value.panNumber;


    const bank = this.appointmentDetails.value.bank;
    const branch = this.appointmentDetails.value.branch;
    const dateOfAppointment = this.appointmentDetails.value.dateOfAppointment;
    const timeOfAppointment = this.appointmentDetails.value.timeofAppointment;

    const bankName = this.existingLoanDetails.value.bankName;
    const amountOld = this.existingLoanDetails.value.amountOld;
    const dateOld = this.existingLoanDetails.value.dateOld;
    const valuation = this.existingLoanDetails.value.valuation;
    const outstandingAmount = this.existingLoanDetails.value.outstandingAmount;
    const balanceTransferAmount = this.existingLoanDetails.value.balanceTransferAmount;
    const requiredAmount = this.existingLoanDetails.value.requiredAmount;
    const tenure = this.existingLoanDetails.value.tenure;

    // const customerPhoto = this.documentUploadDetails.value.customerPhoto;
    // const blankCheck1 = this.documentUploadDetails.value.blankCheck1;
    // const blankCheck2= this.documentUploadDetails.value.blankCheck2;
    // const kycPOA = this.documentUploadDetails.value.kycPOA;
    // const kyc = this.documentUploadDetails.value.kyc;
    // const loanDocument = this.documentUploadDetails.value.loanDocument;
    // const foreclosureLetter = this.documentUploadDetails.value.foreclosureLetter;
    // const atmWithdrawlSlip = this.documentUploadDetails.value.atmWithdrawlSlip;
    // const promissoryNote = this.documentUploadDetails.value.promissoryNote;
    // const lastPageOfAgreement = this.documentUploadDetails.value.lastPageOfAgreement;

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
    finalData.append("jewelleryDetails", this.tabelData);
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


    // jewelleryDetails: this.tabelData,

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
