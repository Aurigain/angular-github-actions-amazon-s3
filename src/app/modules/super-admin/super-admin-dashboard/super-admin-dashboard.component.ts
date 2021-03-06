import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
// import { SideNavBarService } from '../../side-nav.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';
import { SsrHandlerService } from 'src/app/core/services/ssr-handler.service';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
  options: string[] = [];
  searchIcon: boolean = true;
  errors;
  fetchPermissions = [];
  loanTypes;
  filteredOptions: Observable<string[]>;
  rowFilter: number = 1;
  viewDetailbutton = false;
  addCompany: FormGroup;
  searchCompany: FormGroup;
  userData;
  pinCodeDetail;
  school: any;
  schoolData;
  myControl = new FormControl();
  isAddCompany: boolean = false;
  isSearchCompany: boolean = true;
  permissionsArray = [];

  selectedLoanTypes = []
  constructor(
    private formbuilder: FormBuilder,
    private ssrService: SsrHandlerService,
    private networkRequest: NetworkRequestService,
    private toastr: ToastrService,
    private misc: MiscellaneousService,
    private router: Router,
  ) { }

  createSearchForm() {
    this.searchCompany = this.formbuilder.group({
      inputPara: [''],
    })
  }

  get name() {
    return this.addCompany.get("name");
  }

  get email() {
    return this.addCompany.get("email");
  }
  get is_verified() {
    return this.addCompany.get("is_verified");
  }
  get website() {
    return this.addCompany.get("website");
  }
  get head() {
    return this.addCompany.get("head");
  }
  get head_contact_no() {
    return this.addCompany.get("head_contact_no");
  }

  get pincode() {
    return this.addCompany.get("pincode");
  }
  get city() {
    return this.addCompany.get("city");
  }
  get state() {
    return this.addCompany.get("state");
  }
  get street() {
    return this.addCompany.get("street");
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.options.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    )

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  searchPinCode() {
    const pincode = this.addCompany.value.pincode;
    console.log(pincode.toString().length);
    if (pincode.toString().length == 6) {
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${pincode}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          this.pinCodeDetail = data['data'][0];
          this.addCompany.patchValue({
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

  submitAddCompanyForm() {
    const name = this.addCompany.value.name;
    const email = this.addCompany.value.email;
    // const is_verified = this.addCompany.value.is_verified;
    const website = this.addCompany.value.website;
    const head = this.addCompany.value.head;
    const head_contact_no = this.addCompany.value.head_contact_no;
    const pincode = this.pinCodeDetail['id'];
    const city = this.pinCodeDetail['cityId'];
    const state = this.pinCodeDetail['stateId'];
    const street = this.addCompany.value.street;

    const formData = {
      name: name,
      email: email,
      is_verified: true,
      website: website,
      head: head,
      head_contact_no: head_contact_no,
      pincode: pincode,
      city: city,
      state: state,
      street: street,
      registered: true
    }

    const loanTypes = [];
    for (let i = 0; i < this.selectedLoanTypes.length; i++) {
      loanTypes.push(this.selectedLoanTypes[i]['id'])
    }

    this.networkRequest.postWithHeader(formData, `/api/createcompany/`).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Company Create Successfully", "Success")
        if (data['company']) {
          const id = data['company']['id'];
          const formData = {
            role_name: "admin",
            is_active: true,
            role_index: 1,
            role_description: "admin role",
            company: id
          }
          console.log(formData);
          this.misc.createRole(formData).subscribe(
            data => {
              console.log(data);
              const roleId = data['data']['id']
              let formData = {
                role: roleId,
                permissions: this.permissionsArray
              }
              console.log("role mapping form data", formData);
              this.misc.userRolePermissionsMapping(formData).subscribe(
                data => {
                  console.log(data);
                  if (data['data']['error']) {
                    this.toastr.error(data['data']['detail'], "Error", {
                      timeOut: 4000,
                    });
                  }
                  else {
                    let successMsg = data['data']['detail'];
                    this.toastr.success(successMsg, "Sucess", {
                      timeOut: 3000,
                    });
                  }
                },
                err => console.log(err)
              )

            },
            err => {
              this.toastr.error("Error creating Role", "Error");
            }
          )

          loanTypes.forEach(loanType => {
            let assingLoanTypeData = {
              company: id,
              loan: loanType
            }
            console.log(assingLoanTypeData);
            this.misc.assignLoanType(assingLoanTypeData).subscribe(
              data => {
                console.log(data);
              },
              err => console.log(err)
            )
          })

        }
      },
      error => {
        console.log(error);
        this.toastr.success(error, "Error")
      }
    )
  }

  fetchAllPermissions() {
    this.misc.fetchPermissions().subscribe(
      data => {
        console.log(data['data']);
        this.fetchPermissions = data['data']
        // this.permissionsArray.map
        this.fetchPermissions.map(m => {
          this.permissionsArray.push(m.id)
        })
        console.log("All Permissions", this.permissionsArray)
      },
      error => {
        console.log(error);
      }
    )
  }

  schoolFilter() {

    let filtered = [];
    let schoolid;
    for (let i = 0; i < this.schoolData.length; i++) {
      if (this.schoolData[i].name == this.school) {
        filtered.push(this.schoolData[i]);
      }
    }
    console.log(this.schoolData)
    console.log(filtered)
    schoolid = filtered[0]['id'];
    console.log("selected school ID", schoolid)
    this.router.navigate(['/super-admin/company-details'], {
      queryParams: {
        id: schoolid
      }
    })
  }



  detectSchool(obj: any) {
    this.searchIcon = false;
    //"icon", this.searchIcon);
    let array1 = [];
    const name = obj.target.value;
    //"entered value", objdata);
    this.misc.searchComapnyByName(name).subscribe(
      data => {
        // this.viewDetailbutton = true;
        this.searchIcon = false;
        // @ts-ignore
        data.map((item) => {
          array1.push(item['name'])
        })
        this.options = array1
        // @ts-ignore
        this.schoolData = data;
        //"options", this.options);
        //"sd",this.schoolData)
      },
      error => {
        //"Error section")
        this.errors = error['message'];
        //"error msg", this.errors);
        this.viewDetailbutton = false;
        this.searchIcon = true;
      }
    )
    //"length", this.options.length, obj.target.value.length);
    if (this.options.length == 0 || obj.target.value.length < 2) {
      document.getElementById("typeahead-basic").classList.remove("input-field-radius");
      this.viewDetailbutton = false;
      this.searchIcon = true;
    }
    else {
      document.getElementById("typeahead-basic").classList.add("input-field-radius");
      this.viewDetailbutton = true;
      this.searchIcon = false;
    }
    // this.viewDetailbutton = false;
    // this.searchIcon = true;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    //this.school)
  }

  switchToCreateCompany() {
    this.isAddCompany = true;
    this.isSearchCompany = false;
  }
  switchToSeacrchCompany() {
    this.isAddCompany = false;
    this.isSearchCompany = true;
  }

  fetchLoanTypes() {

    this.misc.FetchLoanTypes().subscribe(data => {
      console.log("loan type", data)
      this.loanTypes = data['data']
    })
  }


  selectUnselectSingleLoanId(id, event) {
    let count = 0;
    if (event.target.checked) {
      for (let i = 0; i < this.loanTypes.length; i++) {
        if (this.loanTypes[i]['id'] == id) {
          var element = <HTMLInputElement>document.getElementById(this.loanTypes[i]['id']);
          element.checked = true;
          this.selectedLoanTypes.push(this.loanTypes[i]);
        }
      }

      this.selectedLoanTypes = [...new Set(this.selectedLoanTypes.map(m => m))];
      for (let i = 0; i < this.selectedLoanTypes.length; i++) {
        for (let j = 0; j < this.loanTypes.length; j++) {
          if (this.selectedLoanTypes[i]['id'] == this.loanTypes[j]['id']) {
            count = count + 1;
          }
        }
      }

      // if (count == this.fetchPermissions.length) {
      //   var element = <HTMLInputElement> document.getElementById("flexCheckCheckedAll");
      //   element.checked = true;
      // }
    }
    else {
      for (let i = 0; i < this.selectedLoanTypes.length; i++) {
        if (this.selectedLoanTypes[i]['id'] == id) {
          this.selectedLoanTypes.splice(i, 1);
          var element = <HTMLInputElement>document.getElementById(id);
          element.checked = false;


          // var element = <HTMLInputElement> document.getElementById("flexCheckCheckedAll");
          // element.checked = false;
        }

      }
    }
  }
  ngOnInit(): void {
    // this.userData = this.ssrService.getItem('userProfile');
    // console.log("fetched user data from local", JSON.parse(this.userData))
    this.createSearchForm();
    this.fetchAllPermissions();
    this.fetchLoanTypes();
    this.addCompany = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      is_verified: ['', Validators.required],
      website: ['', Validators.required],
      head: ['', Validators.required],
      head_contact_no: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      registered: ['', Validators.required],
    })

    //     name
    // email
    // is_verified
    // website
    // head
    // head_contact_no
    // pincode
    // city
    // state
    // street
    // registered
  }


}
