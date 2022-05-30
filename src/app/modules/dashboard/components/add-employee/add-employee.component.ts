import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { ConstantsService } from 'src/app/config/constants.service';
import { LoginService } from 'src/app/core/authentication/login.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  Roles;
  isReportingPerson = false;
  reportingPersonByRole;
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
    private misc: MiscellaneousService,
    private networkRequest: NetworkRequestService,
    private loginservice: LoginService,
    private toastr: ToastrService,
    private router: Router
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
  employeelist;
  profile_image;
  fetchRoles() {
    this.misc.fetchUserRoles().subscribe(
      data => {
        this.Roles = data['data']
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
        console.log("error", error);
      }
    );
  }


  fetchAllEmployees(){
    this.misc.fetchAllEmployees().subscribe(
      data => {
        this.employeelist = data['data']
        console.log("emp list: ",this.employeelist)
      },
      error =>{

      }
    )
  }

  ngOnInit(): void {

    this.fetchRoles();
    this.getQualification();
    this.fetchAllEmployees();
    this.personalDetails = this.formbuilder.group({

      first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      // employeeCode: ['', [Validators.required,]],
      phone_number: ['', [Validators.required,]],
      role: ['', [Validators.required,]],
      reporting_person: ['', [Validators.required,]],
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

  saveBankDetails() {
    this.stepUp();
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

  savePersonalDetails() {
    this.stepUp();
    console.log("inside save personal details")
    let personalDetailData: any;

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

  searchPinCode() {
    const pincode = this.addressDetailForm.value.pincode;
    console.log(pincode.toString().length);
    if (pincode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pincode}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          this.pinCodeDetail = data['data'][0];
          this.addressDetailForm.patchValue({
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


  fetchReportingPersonbyRole(event){
    const id = event.target.value;
    console.log("iddd", id)
    this.misc.fetchReportingPersonbyRole(id).subscribe(
      data =>{
        this.isReportingPerson = true;
        console.log("data", data);
        this.reportingPersonByRole = data
      },
      error => {
        console.log("error", error);
      }
    )
  }


  searchIFSC() {
    const ifscCode = this.bankDetails.value.ifsc_code;
    if (ifscCode.length == 11) {
      this.loginservice.searchBank(ifscCode)
        .subscribe(
          data => {
            this.fetchBranchDetail = data[0];
            console.log(this.fetchBranchDetail)
            this.bankDetails.patchValue({
              bank: this.fetchBranchDetail['bank']['name'],
              branch: this.fetchBranchDetail['name']
            })
          },
          error => {
            console.log("Cannot Find Bank")
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
    const father_name = this.personalDetails.value.father_name;
    const password = this.personalDetails.value.password;
    const gender = this.personalDetails.value.gender;
    const dob = this.personalDetails.value.dob;
    const email = this.personalDetails.value.email;
    // const profile_image =  (<HTMLInputElement>document.getElementById('profile_image')).files[0];
    const profile_image =  this.profile_image;


    const bank = this.fetchBranchDetail['bank']['id'];
    const branch = this.fetchBranchDetail['id'];
    const ifsc_code = this.bankDetails.value.ifsc_code;
    const cancelled_cheque  = this.cancelled_cheque;

    // (<HTMLInputElement>document.getElementById('pdf')).files[0];
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
    const aadhar_front_image  = this.aadhar_front_image
    const aadhar_back_image = this.aadhar_back_image
    const pan_image  = this.pan_image


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
        pincode_id: pincode,
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
    this.misc.addEmployee(userObj).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Employee Added Successfully")
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
            this.router.navigateByUrl('/dashboard/employee-list')
          },
          error => {
            console.log("Error", error);
          }
        )
      },
      error => {
        console.log(error);
      }
    )
  }

}
