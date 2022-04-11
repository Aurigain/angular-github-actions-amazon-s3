import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-banks',
  templateUrl: './add-banks.component.html',
  styleUrls: ['./add-banks.component.scss']
})
export class AddBanksComponent implements OnInit {

  bankDetailForm: FormGroup;
  addBankBranch: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
  ) { }




  submitBranchDetails(){

  }
  saveBankDetails(){
    const bankName = this.bankDetailForm.value.bankName;
    const website = this.bankDetailForm.value.website;
    const contact = this.bankDetailForm.value.contact;
    const faxNumber = this.bankDetailForm.value.faxNumber;
    const status = this.bankDetailForm.value.status;

    let formData = {
      bankName: bankName,
      website: website,
      contact: contact,
      faxNumber: faxNumber,
      status: status
    }
    console.log(formData);
  }

  ngOnInit(): void {

    this.bankDetailForm = this.formbuilder.group({
      bankName: ['', [Validators.required,]],
      website: ['', [Validators.required]],
      faxNumber: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })

    this.addBankBranch = this.formbuilder.group({
      name: ['', [Validators.required,]],
      branchCode: ['', [Validators.required]],
      IFSC: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })


  }

}
