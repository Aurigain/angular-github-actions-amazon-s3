import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { ConstantsService } from 'src/app/config/constants.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-partner-us',
  templateUrl: './partner-us.component.html',
  styleUrls: ['./partner-us.component.scss']
})
export class PartnerUsComponent implements OnInit {

  count = 0;
  pinCodeDetail;
  authenticationForm: FormGroup;
  isAuthenticationForm: boolean = true;
  isBasicDetailForm: boolean = false;
  otp: number;
  sentOtpField: boolean = false;
  verifyOtpField: boolean = true;
  otpVerifiedSuccessfully: boolean = false;
  partner: boolean = true;
  partnerForm: FormGroup;
  basicDetailForm: FormGroup;
  addressDetailForm: FormGroup;
  kycDetailForm: FormGroup;
  bankDetailForm: FormGroup;
  refrralDetailForm: FormGroup;
  navText: string = "Partner Us"
  currentStep: number = 1;
  registrationData;
  isOtpForm: boolean = false;
  successForm: any = [];
  formCompleted: boolean = false;
  qualificationList: any;
  aadhar_front_image:File;
  aadhar_back_image:File;
  pan_image:File;
  cancelled_cheque:File;
  profile_image:File;
  fetchBranchDetail;
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private auth: AuthService,
    private utils: UtilsService,
    private toastr: ToastrService,
    private networkRequest: NetworkRequestService,
    private loginservice: LoginService,
    private cookie: CookieService,
    private misc: MiscellaneousService,

  ) { }
  errors;
  districts;
  states;
  selectedPinCode;
  banks;
  otpVerified: boolean = false;
  loaderActive = false;

  get first_name() {
    return this.authenticationForm.get('first_name');
  }
  get last_name() {
    return this.authenticationForm.get('last_name');
  }
  get phoneNumber1() {
    return this.authenticationForm.get('phoneNumber1');
  }
  get password() {
    return this.authenticationForm.get('password');
  }

  get fatherName() {
    return this.basicDetailForm.get('fatherName');
  }
  get dob() {
    return this.basicDetailForm.get('dob');
  }
  get email() {
    return this.basicDetailForm.get('email');
  }

  get gender() {
    return this.basicDetailForm.get('gender');
  }

  get pinCode() {
    return this.addressDetailForm.get('pinCode');
  }
  get addressLine1() {
    return this.addressDetailForm.get('addressLine1');
  }
  get addressLine2() {
    return this.addressDetailForm.get('addressLine2');
  }
  get city() {
    return this.addressDetailForm.get('city');
  }
  get state() {
    return this.addressDetailForm.get('state');
  }
  // get district() {
  //   return this.addressDetailForm.get('district');
  // }

  get qualification() {
    return this.kycDetailForm.get('qualification');
  }
  get panNumber() {
    return this.kycDetailForm.get('panNumber');
  }
  get adhaarNumber() {
    return this.kycDetailForm.get('adhaarNumber');
  }
  get occupation() {
    return this.kycDetailForm.get('occupation');
  }



  get bankName() {
    return this.bankDetailForm.get('bankName');
  }
  get branchName() {
    return this.bankDetailForm.get('branchName');
  }
  get accountNumber() {
    return this.bankDetailForm.get('accountNumber');
  }
  get ifscCode() {
    return this.bankDetailForm.get('ifscCode');
  }

  searchIFSC() {
    const ifscCode = this.bankDetailForm.value.ifscCode;
    if (ifscCode.length == 11) {
      this.loginservice.searchBank(ifscCode)
        .subscribe(
          data => {
            this.fetchBranchDetail= data['results'][0];
            console.log(this.fetchBranchDetail)
            this.bankDetailForm.patchValue({
              bankName: this.fetchBranchDetail['bank']['name'],
              branchName: this.fetchBranchDetail['name']
            })
          },
          error => {
            console.log("Cannot Find Bank")
          }
        )
    }
  }

  changeForm() {
    this.partner = false;
    this.navText = "Become Agent"
  }

  verifyOtp() {
    if (!this.otp) {
      this.toastr.error("Please enter OTP", 'Error!', {
        timeOut: 4000,
      });
      return;
    }
    const phoneNumber = this.authenticationForm.value.phoneNumber1;
    this.misc.verifyOtp(this.otp, phoneNumber).subscribe(
      data => {
        console.log("verified data: ", data)
        this.toastr.success("OTP Verified Successfully", 'Success!', {
          timeOut: 4000,
        });
        this.otpVerified = true;
        this.isOtpForm = false;
        this.isBasicDetailForm = true;
        this.stepUp(this.currentStep);
      },
      error => {
        this.errors = error;
        this.misc.showLoader()
      }
    );
  }

  searchCity() {
    const pinCode = this.addressDetailForm.value.pinCode;

    console.log(pinCode.toString().length);

    if(pinCode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pinCode}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          this.pinCodeDetail = data['data'][0];
          this.addressDetailForm.patchValue({
            city: this.pinCodeDetail['city'],
            state: this.pinCodeDetail['state']
          })
        },
        error => {
          console.log("error", error);
        }
      );
    }
  }

  onChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (event.target.id === 'aadhar_front_image') {
      this.aadhar_front_image = file;
    }
    else if (event.target.id === 'aadhar_back_image') {
    this.aadhar_back_image = file;
    }
    else if (event.target.id === 'pan_image') {
    this.pan_image = file;
    }
    else if (event.target.id === 'cancelled_cheque') {
    this.cancelled_cheque = file;
    }
    else if (event.target.id === 'profile_image') {
    this.profile_image = file;
    }
    // this.convertToBase64(id, file);
  }

  // convertToBase64(id, file: File) {
  //   const observable = new Observable((subscriber: Subscriber<any>) => {
  //     this.readFile(file, subscriber);
  //   });
  //   observable.subscribe((d) => {
  //     console.log("Image Url", d);
  //     if (id=== 'aadhar_front_image') {
  //       this.aadhar_front_image = d;
  //     }
  //     else if (id==='aadhar_back_image') {
  //       this.aadhar_back_image = d;
  //     }
  //     else if (id==='pan_image') {
  //       this.pan_image = d;
  //     }
  //     else if (id==='cancelled_cheque') {
  //       this.cancelled_cheque = d;
  //     }
  //     else if (id==='profile_image') {
  //       this.profile_image = d;
  //     }
  //   });
  // }

  // readFile(file: File, subscriber: Subscriber<any>) {
  //   const filereader = new FileReader();
  //   filereader.readAsDataURL(file);

  //   filereader.onload = () => {
  //     subscriber.next(filereader.result);
  //     subscriber.complete();
  //   };
  //   filereader.onerror = (error) => {
  //     subscriber.error(error);
  //     subscriber.complete();
  //   };
  // }

  submitAgentForm() {

    const first_name = this.authenticationForm.value.first_name;
    const last_name = this.authenticationForm.value.last_name;
    const phoneNumber1 = this.authenticationForm.value.phoneNumber1;
    const referralCode = this.authenticationForm.value.referralCode;
    const password = this.authenticationForm.value.password;

    const fatherName = this.basicDetailForm.value.fatherName;
    const dob = this.basicDetailForm.value.dob;
    const gender = this.basicDetailForm.value.gender;
    const email = this.basicDetailForm.value.email;

    const addressLine1 = this.addressDetailForm.value.addressLine1;
    const addressLine2 = this.addressDetailForm.value.addressLine2;
    const pinCode = this.pinCodeDetail['id'];
    const city = this.pinCodeDetail['cityId'];
    const state = this.pinCodeDetail['stateId'];

    const qualification = this.kycDetailForm.value.qualification;
    const adhaarNumber = this.kycDetailForm.value.adhaarNumber;
    const panNumber = this.kycDetailForm.value.panNumber;
    const occupation = this.kycDetailForm.value.occupation;

    const bankName = this.fetchBranchDetail['bank']['id'];
    const accountNumber = this.bankDetailForm.value.accountNumber;
    const ifscCode = this.fetchBranchDetail['ifsc_code'];
    const branchName = this.fetchBranchDetail['id'];

    const profile_image =  this.profile_image;
    const aadhar_front_image = this.aadhar_front_image;
    const aadhar_back_image = this.aadhar_back_image;
    const pan_image = this.pan_image;
    const cancelled_cheque = this.cancelled_cheque;

    const userObj = {
      basic_details: {
        first_name: first_name,
        last_name: last_name,
        phonenumber: phoneNumber1,
        referral_code: referralCode,
        password: password,
        father_name: fatherName,
        dob: dob,
        gender: gender,
        email: email,
        profile_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K"
      },
      kyc: {
        aadhar_number: adhaarNumber,
        occupation: occupation,
        pan_number: panNumber,
        qualification_id: qualification,
        aadhar_front_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K",
        aadhar_back_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K",
        pan_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K"
      },
      address: {
        address_line1: addressLine1,
        address_line2: addressLine2,
        pincode_id: pinCode,
        city: city,
        state: state,
      },
      bank_details: {
        account_number: accountNumber,
        id: bankName,
        branch: branchName,
        ifsc_code: ifscCode,
        cancelled_cheque: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K"
      },
    }

    console.log(userObj);

    if (first_name && phoneNumber1) {
      this.auth.register(userObj).subscribe(
        data => {
          console.log(data);
          this.toastr.success("Agent Added Successfully")
          const agentId = data['profileid']
          let formData = new FormData();
          formData.append("agent", agentId)
          formData.append("profile", profile_image)
          formData.append("aadhar_front",aadhar_front_image)
          formData.append("aadhar_back",aadhar_back_image)
          formData.append("pan",pan_image)
          formData.append("cancelled_cheque",cancelled_cheque)
          this.misc.uploadAgentImages(formData).subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log("Error", error);
            }
          )
        },
        error => {
          const emailError = error.message['email'];
          const phoneError = error.message['phonenumber'];

          this.errors = emailError ? emailError[0] : (phoneError ? phoneError[0] : '');
          this.toastr.error(this.errors, 'Error!', {
            timeOut: 4000,
          });
        }
      );
    }
  }

  // updateProfile() {
  //   var firstName = '';
  //   var fullname = (this.authenticationForm.value.name).split(' ');
  //   var lastName;
  //   if (fullname.length > 1) {
  //     for (let i = 0; i < fullname.length - 1; i++) {
  //       if (i == 0) {
  //         firstName = fullname[0];
  //       }
  //       else {
  //         firstName = firstName + ' ' + fullname[i];
  //       }

  //     }
  //     lastName = fullname[fullname.length - 1];
  //   }
  //   else {
  //     firstName = fullname[0];
  //     lastName = '';
  //   }

  //   const pincode = this.selectedPinCode;
  //   const city = this.addressDetailForm.value.city;
  //   // const city = this.addressDetailForm.value.city;
  //   const state = this.addressDetailForm.value.state;
  //   const addressLine1 = this.addressDetailForm.value.addressLine1;
  //   const addressLine2 = this.addressDetailForm.value.addressLine2;
  //   const fatherName = this.basicDetailForm.value.fatherName;
  //   const dob = this.basicDetailForm.value.dob;
  //   const gender = this.basicDetailForm.value.gender;
  //   const email = this.basicDetailForm.value.email;

  //   const formData = {
  //     first_name: firstName,
  //     last_name: lastName || '',
  //     address_line1: addressLine1 || null,
  //     address_line2: addressLine2 || null,
  //     pincode: pincode,
  //     email: email,
  //     city: city,
  //     state: state,
  //     father_name: fatherName,
  //     gender: gender,
  //     dob: dob
  //   }

  //   this.networkRequest.putWithHeaders(formData, '/api/updateprofile/').subscribe(
  //     data => {
  //       // Set Profile Status
  //       console.log("updated", data);
  //       // this.getProfile();
  //     },
  //     error => {
  //     }
  //   );
  // }

  // updateBankDetails(userid) {
  //   const bankName = this.bankDetailForm.value.bankName;
  //   const accountNumber = this.bankDetailForm.value.accountNumber;
  //   const ifscCode = this.bankDetailForm.value.ifscCode;
  //   const nameOfNominee = this.bankDetailForm.value.nameOfNominee;
  //   const relationshipWithNominee = this.bankDetailForm.value.relationshipWithNominee;
  //   let cheque: File;
  //   cheque = (<HTMLInputElement>document.getElementById('cheque')).files[0];

  //   let formData: FormData = new FormData();
  //   formData.append("user", userid);
  //   formData.append("bank", bankName);
  //   formData.append("account_number", accountNumber);
  //   formData.append("ifsc_code", ifscCode);
  //   formData.append("nominee_name", nameOfNominee);
  //   formData.append("nominee_relation", relationshipWithNominee);
  //   formData.append("cancelled_cheque_image", cheque);
  //   this.networkRequest.postFormData(formData, '/api/createuserbank/').subscribe(
  //     user => {
  //       console.log("user bank details", user);
  //     },
  //     error => {
  //       this.toastr.error(this.errors, 'Error!', {
  //         timeOut: 4000,
  //       });
  //     }
  //   );
  // }

  // updateKYCDetails(userid) {
  //   const qualification = this.kycDetailForm.value.qualification;
  //   const adhaarNumber = this.kycDetailForm.value.adhaarNumber;
  //   const panNumber = this.kycDetailForm.value.panNumber;
  //   const occupation = this.kycDetailForm.value.occupation;
  //   let aadharfront: File;
  //   aadharfront = (<HTMLInputElement>document.getElementById('aadharfront')).files[0];
  //   let aadharback: File;
  //   aadharback = (<HTMLInputElement>document.getElementById('aadharback')).files[0];
  //   let panimg: File;
  //   panimg = (<HTMLInputElement>document.getElementById('panimg')).files[0];
  //   let formData: FormData = new FormData();
  //   formData.append("user", userid);
  //   formData.append("qualification", qualification);
  //   formData.append("aadhar_number", adhaarNumber);
  //   formData.append("pan_number", panNumber);
  //   formData.append("occupation", occupation);
  //   formData.append("aadhar_front_image", aadharfront);
  //   formData.append("aadhar_back_image", aadharback);
  //   formData.append("pan_image", panimg);
  //   this.networkRequest.postFormData(formData, '/api/userkyc/').subscribe(
  //     user => {
  //       console.log("userkyc", user);
  //     },
  //     error => {
  //       // this.misc.hideLoader()
  //       const emailError = error.message['email'];
  //       const phoneError = error.message['phonenumber'];

  //       this.errors = emailError ? emailError[0] : (phoneError ? phoneError[0] : '');
  //       this.toastr.error(this.errors, 'Error!', {
  //         timeOut: 4000,
  //       });
  //     }
  //   );
  // }

  // upadateProfileImage(userid) {

  //   /**
  //    * User Profile Update
  //    */

  //   let imageFile: File;
  //   imageFile = (<HTMLInputElement>document.getElementById('profilepic')).files[0];

  //   const formData: FormData = new FormData();
  //   formData.append('image', imageFile);
  //   console.log("aa");
  //   // Send User image to server
  //   this.networkRequest.putFiles(formData, `/api/profile/image/${userid}/`)
  //     .subscribe(
  //       data => {
  //       },
  //       error => {
  //       });
  // }

  setStep(i) {
    this.currentStep = i;
  }

  stepUp(nextStep) {
    this.successForm.push(nextStep);
    this.successForm = [...new Set(this.successForm)]
    console.log(this.successForm);
    this.currentStep += 1;
  }
  submitAuthenticationForm() {

    console.log("submit authentication form")
    const phoneNumber = this.authenticationForm.value.phoneNumber1;

    this.misc.sendOtp(phoneNumber).subscribe(
      data => {
        if(data['data']['error'])
        {
          this.toastr.error(data['data']['detail'], "Error!")
        }
        if(!data['data']['error']){
          this.isAuthenticationForm = false;
          this.isOtpForm = true;
          this.toastr.success("OTP sent successfully", "Success!");
        }
      });
  }

  sendOTP(phoneNumber) {
    this.misc.sendOtp(phoneNumber).subscribe()
  }

  getStates() {
    // this.networkRequest.getWithHeaders(`/api/state/`).subscribe(
    //   data => {
    //     this.states = data['data'];
    //     console.log("states", data['data']);
    //   },
    //   error => {
    //     console.log("error", error);
    //   }
    // );

    // this.networkRequest.getWithHeaders(`/api/bank/`).subscribe(
    //   data => {
    //     this.banks = data;
    //     console.log("banks", this.banks);
    //   },
    //   error => {
    //     console.log("error", error);
    //   }
    // );
  }

  getQualification() {
    this.networkRequest.getWithHeaders(`/api/qualification/`).subscribe(
      data => {
        this.qualificationList = data['data'];
        console.log("qualificationList", data['data']);
      },
      error => {
        console.log("error", error);
      }
    );
  }

  ngOnInit(): void {

    this.authenticationForm = this.formbuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)
        , Validators.pattern("^[a-zA-Z\-\']+")
      ]],
      last_name: ['', [Validators.required, Validators.minLength(2)
        // , Validators.pattern("^[a-zA-Z\-\']+")
      ]],
      phoneNumber1: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      referralCode: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.basicDetailForm = this.formbuilder.group({

      fatherName: ['', [Validators.required, Validators.minLength(2),
        // Validators.pattern("^[a-zA-Z\-\']+")
      ]],
      dob: ['', [Validators.required,]],
      gender: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      profile_image: [''],
    })

    this.addressDetailForm = this.formbuilder.group({
      pinCode: ['', [Validators.required,]],
      addressLine1: ['', [Validators.required,]],
      addressLine2: ['', [Validators.required,]],
      city: ['',],
      state: ['', [Validators.required,]],
      // district: ['', [Validators.required,]],
    })

    this.kycDetailForm = this.formbuilder.group({
      qualification: [''],
      panNumber: ['', [Validators.required,]],
      adhaarNumber: ['', [Validators.required,]],
      occupation: ['', [Validators.required,]],
      aadhar_front_image: ['', [Validators.required]],
      aadhar_back_image: ['', [Validators.required]],
      pan_image: ['', [Validators.required]],
    })

    this.bankDetailForm = this.formbuilder.group({
      bankName: ['', [Validators.required,]],
      branchName: ['', [Validators.required,]],
      accountNumber: ['', [Validators.required,]],
      ifscCode: ['', [Validators.required,]],
      cancelled_cheque: ['', [Validators.required]],
      // nameOfNominee: ['', [Validators.required]],
      // relationshipWithNominee: ['', [Validators.required]],
    })

    this.getStates();
    this.getQualification();

    // if(this.successForm.length === 3) {
    //   this.formCompleted = true;
    // }

    // this.refrralDetailForm = this.formbuilder.group({
    //   referralCode: ['']
    // })

    // this.partnerForm = this.formbuilder.group({
    //   name: ['',[Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
    //   email: ['',[Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
    //   phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
    //   message: ['', [Validators.required,]],
    // })

  }

}
