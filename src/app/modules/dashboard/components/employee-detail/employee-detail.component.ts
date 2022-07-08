import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { ConstantsService } from 'src/app/config/constants.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  isReportingPerson = false;
  reportingPersonByRole;
  Roles;
  currentUserId;
  userDetail;
  username;
  profileData;
  addressData;
  kycData;
  bankData;
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private misc: MiscellaneousService,
    private networkRequest: NetworkRequestService,
    private loginservice: LoginService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.tabelData = [];
  }
  currentStep: number = 1;
  personalDetails: FormGroup;
  bankDetails: FormGroup;
  kycDetailForm: FormGroup;
  otherPersonalDetails: FormGroup;
  addressDetailForm: FormGroup;
  tabelData: any;
  qualificationList;
  fetchBranchDetail;
  pinCodeDetail;
  aadhar_front_image;
  aadhar_back_image;
  pan_image;
  cancelled_cheque;
  profile_image;
  employeelist;
  currentUserPk;
  fetchRoles() {
    this.misc.fetchUserRoles().subscribe(
      data => {
        this.Roles = data
        console.log(this.Roles)
      }
    )
  }
  getQualification() {
    this.networkRequest.getWithHeaders(`/api/qualification/`).subscribe(
      data => {
        this.qualificationList = data['data'];
        console.log("qualificationList", data['data']);
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    );
  }

  fetchUserDetail(id) {
    this.misc.fetchEmployeeDetailById(id).subscribe(
      data => {
        console.log("userDetailsss", data);
        this.userDetail = data['data'];
        this.username = this.userDetail['username'];
        this.getAllUserDetails(this.username);
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }

  fetchAllEmployees() {
    this.misc.fetchAllEmployees().subscribe(
      data => {
        this.employeelist = data['data']
        console.log("emp list: ", this.employeelist)
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }

  getAllUserDetails(username) {
    // this.networkRequest.getWithHeaders(`/api/agent/fetch_employee_profile_details?username=${username}`).subscribe(
    this.misc.fetchAgentProfileDetailByUserName(username).subscribe(
      data => {
        console.log("profiles is:", data)
        this.profileData = data[0]
        console.log(this.profileData);
        this.currentUserPk = this.profileData['id']
        const [first_name, last_name] = this.profileData['full_name'].split(' ');
        const role = this.misc.fetchUserRoleById(this.profileData['role'])
        this.personalDetails.patchValue({
          first_name: first_name,
          last_name: last_name,
          phone_number: this.profileData['phonenumber'],
          role: this.profileData['user_group']['id'],

          gender: this.profileData['gender'],
          email: this.profileData['email'],
          dob: this.profileData['date_of_birth'],
          father_name: this.profileData['father_name'],

        })
        if (this.profileData['reporting_person']) {
          this.personalDetails.patchValue({
            reporting_person: this.profileData['reporting_person']['shareReferralCode'],
          })
        }
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      })
    this.misc.fetchAgentKycByUserName(username).subscribe(
      data => {
        console.log("kyc data is", data);
        this.kycData = data[0]
        this.kycDetailForm.patchValue({
          qualification: this.kycData['qualification']['id'],
          aadhar_number: this.kycData['aadhar_number'],
          pan_number: this.kycData['pan_number'],
          occupation: this.kycData['occupation']
        })
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
    this.misc.fetchAgentAddressByUserName(username).subscribe(
      data => {
        console.log("address data is", data);
        this.addressData = data[0]
        this.addressDetailForm.patchValue({
          pincode: this.addressData['pincode']['code'],
          address_line1: this.addressData['address_line1'],
          address_line2: this.addressData['address_line2'],
        })
        this.searchPinCode();

      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
    this.misc.fetchAgentBankByUserName(username).subscribe(
      data => {
        console.log("bank data is", data);
        this.bankData = data[0];
        this.bankDetails.patchValue({
          // bank: bankData['bank'],
          account_number: this.bankData['account_number'],
          // branch: bankData['branch'],
          ifsc_code: this.bankData['ifsc_code']
        })
        this.searchIFSC();
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }
  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchRoles();
    this.getQualification();
    this.fetchAllEmployees();
    this.fetchUserDetail(this.currentUserId);
    this.personalDetails = this.formbuilder.group({

      first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      // employeeCode: ['', [Validators.required,]],
      phone_number: ['', [Validators.required,]],
      role: ['', [Validators.required,]],
      reporting_person: ['', [Validators.required,]],
      reporting_person_role_group: ['', [Validators.required,]],
      profile_image: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      father_name: ['', Validators.required]
    })


    this.bankDetails = this.formbuilder.group({
      bank: ['', [Validators.required,]],
      account_number: ['', [Validators.required]],
      branch: ['', [Validators.required,]],
      ifsc_code: ['', [Validators.required,]],
      cancelled_cheque: ['', [Validators.required,]],
    })

    this.kycDetailForm = this.formbuilder.group({
      qualification: [''],
      aadhar_number: ['', [Validators.required,]],
      pan_number: ['', [Validators.required,]],
      occupation: ['', [Validators.required,]],
      aadhar_front_image: ['', [Validators.required,]],
      aadhar_back_image: ['', [Validators.required,]],
      pan_image: ['', [Validators.required,]],

    })

    this.addressDetailForm = this.formbuilder.group({
      pincode: ['', [Validators.required,]],
      address_line1: ['', [Validators.required,]],
      address_line2: ['', [Validators.required,]],
      city: ['',],
      state: ['', [Validators.required,]],
    })
  }

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

  stepUp() {
    console.log("clicked")
    this.currentStep += 1;
    console.log(this.currentStep);
  }
  stepDown() {
    this.currentStep -= 1;
    console.log(this.currentStep);
  }

  removeItem(item) {
    this.tabelData.forEach((value, index) => {
      if (value == item) {
        this.tabelData.splice(index, 1)
      }
    })
  }

  fetchReportingPersonbyRole(event) {
    const id = event.target.value;
    console.log("iddd", id)
    this.misc.fetchReportingPersonbyRole(id).subscribe(
      data => {
        this.isReportingPerson = true;
        console.log("reporting person by role", data);
        this.reportingPersonByRole = data
      },
      error => {
        console.log("error", error);
      }
    )
  }

  savePersonalDetails() {

    const first_name = this.personalDetails.value.first_name;
    const last_name = this.personalDetails.value.last_name;
    const phonenumber = this.personalDetails.value.phone_number;
    const role = this.personalDetails.value.role;
    const reporting_person = this.personalDetails.value.reporting_person;
    const father_name = this.personalDetails.value.father_name;
    const gender = this.personalDetails.value.gender;
    const dob = this.personalDetails.value.dob;
    const email = this.personalDetails.value.email;
    const profile_image = this.profile_image;
    let personalDetailData: any;

    const full_name = first_name.concat(" ", last_name);
    personalDetailData = {
      full_name: full_name,
      phonenumber: phonenumber,
      user_group: role,
      reporting_person: reporting_person,
      gender: gender,
      email: email,
      dob: dob,
      father_name: father_name,
    }


    let imageObj = new FormData();
    imageObj.append("agent", this.currentUserPk)
    imageObj.append("profile", profile_image)

    console.log(personalDetailData);

    this.misc.updateEmployeeProfile(personalDetailData, this.currentUserPk).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Basic Details Updated", "Success")
        if (profile_image) {
          this.misc.uploadAgentImages(imageObj).subscribe(
            data => {
              console.log(data);
              // this.router.navigateByUrl('/dashboard/employee-list')
            },
            error => {
              this.toastr.error(error['message']['error'], "Error")
            }
          )
        }

      },
      error => {
        console.log("error", error);
        this.toastr.error(error['message']['error'], "Error")
      }

    )
  }

  saveAddressDetails() {

    const address_line1 = this.addressDetailForm.value.address_line1;
    const address_line2 = this.addressDetailForm.value.address_line2;
    const city = this.pinCodeDetail['cityId'];
    const state = this.pinCodeDetail['stateId'];
    const pincode = this.pinCodeDetail['id'];

    let addressDetailData: any;

    addressDetailData = {
      address_line1: address_line1,
      address_line2: address_line2,
      pincode: pincode,
      city: city,
      state: state,
    }

    console.log(addressDetailData);

    this.misc.updateEmployeeAddress(addressDetailData, this.addressData['id']).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Basic Details Updated", "Success")
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }

  saveKYCDetails() {
    const qualification = this.kycDetailForm.value.qualification;
    const occupation = this.kycDetailForm.value.occupation;
    // const aadhar_number = this.kycDetailForm.value.aadhar_number;
    // const pan_number = this.kycDetailForm.value.pan_number;
    const aadhar_front_image = this.aadhar_front_image
    const aadhar_back_image = this.aadhar_back_image
    const pan_image = this.pan_image
    let kycDetailData: any;

    kycDetailData = {
      occupation: occupation,
      // qualification: qualification,
    }

    console.log(kycDetailData);

    let imageObj = new FormData();
    imageObj.append("agent", this.currentUserPk)

    if (aadhar_front_image) {
      imageObj.append("aadhar_front", aadhar_front_image)
    }
    if (aadhar_back_image) {
      imageObj.append("aadhar_back", aadhar_back_image)
    }
    if (pan_image) {
      imageObj.append("pan", pan_image)
    }

    this.misc.updateEmployeeKYC(kycDetailData, this.kycData['id']).subscribe(
      data => {
        console.log(data);

        if (aadhar_front_image || aadhar_back_image || pan_image) {
          this.misc.uploadAgentImages(imageObj).subscribe(
            data => {
              console.log(data);
              // this.router.navigateByUrl('/dashboard/employee-list')
            },
            error => {
              this.toastr.error(error['message']['error'], "Error")
            }
          )
        }

      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }

  saveBankDetail() {

    const bank = this.fetchBranchDetail['bank']['id'];
    const branch = this.fetchBranchDetail['id'];
    const ifsc_code = this.bankDetails.value.ifsc_code;
    const cancelled_cheque = this.cancelled_cheque;
    const account_number = this.bankDetails.value.account_number;
    let bankDetailData: any;

    bankDetailData = {
      account_number: account_number,
      id: bank,
      branch: branch,
      ifsc_code: ifsc_code,
    }

    let imageObj = new FormData();
    imageObj.append("agent", this.currentUserPk)
    imageObj.append("cancelled_cheque", cancelled_cheque)

    console.log(bankDetailData);

    this.misc.updateEmployeeBank(bankDetailData, this.bankData['id']).subscribe(
      data => {
        console.log(data);
        if (cancelled_cheque) {
          this.misc.uploadAgentImages(imageObj).subscribe(
            data => {
              console.log(data);
              // this.router.navigateByUrl('/dashboard/employee-list')
            },
            error => {
              this.toastr.error(error['message']['error'], "Error")
            }
          )
        }

      },
      error => { this.toastr.error(error['message']['error'], "Error") }
    )
  }

  searchPinCode() {
    const pincode = this.addressDetailForm.value.pincode;
    console.log(pincode.toString().length);
    if (pincode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pincode}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          if (data['data'].length == 0) {
            this.toastr.error("Cannot Find PinCode Detail")
          }
          else {
            this.pinCodeDetail = data['data'][0];
            this.addressDetailForm.patchValue({
              city: this.pinCodeDetail['city'],
              state: this.pinCodeDetail['state'],
            })
          }
        },
        error => {
          this.toastr.error(error['message']['error'], "Error")
        }
      );
    }
  }


  searchIFSC() {
    const ifscCode = this.bankDetails.value.ifsc_code;
    if (ifscCode.length == 11) {
      this.loginservice.searchBank(ifscCode)
        .subscribe(
          data => {
            //@ts-ignore
            if (data.length == 0) {
              this.toastr.error("Cannot Find IFSC Code Detail")
            }
            else {
              this.fetchBranchDetail = data[0];
              console.log(this.fetchBranchDetail)
              this.bankDetails.patchValue({
                bank: this.fetchBranchDetail['bank']['name'],
                branch: this.fetchBranchDetail['name']
              })
            }
          },
          error => {
            this.toastr.error(error['message']['error'], "Error")
          }
        )
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
  // convertToBase64(id, file: File) {
  //   const observable = new Observable((subscriber: Subscriber<any>) => {
  //     this.readFile(file, subscriber);
  //   });
  //   observable.subscribe((d) => {
  //     console.log("Image Url", d);
  //     if (id === 'aadhar_front_image') {
  //       this.aadhar_front_image = d;
  //     }
  //     else if (id === 'aadhar_back_image') {
  //       this.aadhar_back_image = d;
  //     }
  //     else if (id === 'pan_image') {
  //       this.pan_image = d;
  //     }
  //     else if (id === 'cancelled_cheque') {
  //       this.cancelled_cheque = d;
  //     }
  //     else if (id === 'profile_image') {
  //       this.profile_image = d;
  //     }
  //   });
  // }

  saveForms() {

    const first_name = this.personalDetails.value.first_name;
    const last_name = this.personalDetails.value.last_name;
    const phonenumber = this.personalDetails.value.phone_number;
    const role = this.personalDetails.value.role;
    const reporting_person = this.personalDetails.value.reporting_person;
    const profile_image = this.profile_image;
    const father_name = this.personalDetails.value.father_name;
    const password = this.personalDetails.value.password;
    const gender = this.personalDetails.value.gender;
    const dob = this.personalDetails.value.dob;
    const email = this.personalDetails.value.email;

    const bank = this.fetchBranchDetail['bank']['id'];
    const branch = this.fetchBranchDetail['id'];
    const ifsc_code = this.bankDetails.value.ifsc_code;
    const cancelled_cheque = this.cancelled_cheque;
    const account_number = this.bankDetails.value.account_number;

    const address_line1 = this.addressDetailForm.value.address_line1;
    const address_line2 = this.addressDetailForm.value.address_line2;
    const city = this.pinCodeDetail['cityId'];
    const state = this.pinCodeDetail['stateId'];
    const pincode = this.pinCodeDetail['id'];

    const qualification = this.kycDetailForm.value.qualification;
    const aadhar_number = this.kycDetailForm.value.aadhar_number;
    const occupation = this.kycDetailForm.value.occupation;
    const pan_number = this.kycDetailForm.value.pan_number;
    const aadhar_front_image = this.aadhar_front_image
    const aadhar_back_image = this.aadhar_back_image
    const pan_image = this.pan_image;


    const userObj = {
      basic_details: {
        first_name: first_name,
        last_name: last_name,
        phonenumber: phonenumber,
        role: role,
        reporting_person: reporting_person,
        profile_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K",
        password: password,
        gender: gender,
        email: email,
        dob: dob,
        father_name: father_name,
      },
      kyc: {
        aadhar_number: aadhar_number,
        occupation: occupation,
        pan_number: pan_number,
        qualification_id: qualification,
        aadhar_front_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K",
        aadhar_back_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K",
        pan_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K"
      },
      address: {
        address_line1: address_line1,
        address_line2: address_line2,
        pincode: pincode,
        city: city,
        state: state,
      },
      bank_details: {
        account_number: account_number,
        id: bank,
        branch: branch,
        ifsc_code: ifsc_code,
        cancelled_cheque: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAChYAAAJYCAYAAACE1k6K"
      },
    }

    console.log(userObj);
    this.misc.updateEmployeeProfile(userObj, this.currentUserId).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Employee Added Successfully")
        const agentId = data['profileid']
        let formData = new FormData();
        formData.append("agent", agentId)
        formData.append("profile", profile_image)
        formData.append("aadhar_front", aadhar_front_image)
        formData.append("aadhar_back", aadhar_back_image)
        formData.append("pan", pan_image)
        formData.append("cancelled_cheque", cancelled_cheque)
        this.misc.uploadAgentImages(formData).subscribe(
          data => {
            console.log(data);
          },
          error => {
            this.toastr.error(error['message']['error'], "Error")
          }
        )
      },
      error => {
        this.toastr.error(error['message']['error'], "Error")
      }
    )
  }
}
