import { JSON2CSV } from './../../../../../core/services/json2csv';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/authentication/login.service';

@Component({
  selector: 'app-accounts-maker-panel-details',
  templateUrl: './accounts-maker-panel-details.component.html',
  styleUrls: ['./accounts-maker-panel-details.component.scss']
})
export class AccountsMakerPanelDetailsComponent implements OnInit {
  makerLeadList;
  currentUserId: number;
  makerDetail;
  markStatus = "not uploaded";
  accountTransferDetails;
  documentDetails;
  profileData;
  fetchBranchDetail
  BankName
  BranchName
  BranchAddress;
  text;
  dataVerify;
  imageVerify = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private misc: MiscellaneousService,
    private json2csv: JSON2CSV,
    private toastr: ToastrService,
    private loginservice: LoginService
  ) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchBTLeadAccountTransferDetails(this.currentUserId)
    this.fetchBTLeadDocumentDetails(this.currentUserId)
    this.fetchMakerList();
  }

  loadImage(text, data, dynamicImage) {
    this.imageVerify = [];
    this.text = text;
    this.dataVerify = data;
    this.imageVerify.push(dynamicImage);
  }

  searchIFSC(ifscCode) {
    console.log(ifscCode);
    this.loginservice.searchBank(ifscCode).subscribe(
      data => {
        // console.log(data);
        this.fetchBranchDetail = data;
        this.BankName = this.fetchBranchDetail['BANK'];
        this.BranchName = this.fetchBranchDetail['BRANCH'];
        this.BranchAddress = this.fetchBranchDetail['ADDRESS']
      },
      error => {
        // console.log("")
        this.toastr.error("Cannot Find Bank, Check the IFSC code again")
      }
    )
  }

  fetchMakerList() {
    this.misc.fetchMakerList().subscribe(
      data => {
        console.log(data);
        this.makerLeadList = data;
        for (let i = 0; i < this.makerLeadList.length; i++) {
          if (this.makerLeadList[i]['lead']['id'] === this.currentUserId) {
            console.log("matched", this.makerLeadList[i]['transfer_branch_ifsc_code'])

            this.makerDetail = this.makerLeadList[i];
            this.searchIFSC(this.makerDetail['transfer_branch_ifsc_code'])
            this.misc.fetchLeadProfileById(this.makerDetail['lead']['id']).subscribe(
              data => {
                this.profileData = data[0]
                console.log("lead profile detail: ", this.profileData);
              },
              error => {
                console.log(error);
              }
            )
          }
        }
      }
    )
  }

  fetchBTLeadAccountTransferDetails(id) {

    this.misc.fetchLeadAccountTransferDetailById(id).subscribe(data => {
      console.log("account transfer details:", data[0]);
      this.accountTransferDetails = data[0];
    })
  }

  fetchBTLeadDocumentDetails(id) {
    this.misc.fetchLeadDocumentById(id).subscribe(data => {
      console.log("document details:", data[0]);
      this.documentDetails = data[0];
    })
  }
  submitMaker() {
    let formData = {
      lead: this.makerDetail['lead']['id'],
      final_status: "True",
      final_remark: this.markStatus,
    }
    console.log(formData);
    this.misc.makerUpdate(formData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Lead Moved to Checker", "Success")
      },
      error => {
        this.toastr.error(error['message']['message'], "Error")
      })
  }

  download() {
    console.log("s", this.makerDetail['lead']['fullname'])
    let jsonData = [
      {
        "Name": `${this.makerDetail['lead']['fullname']}`,
        "Lead Type": this.makerDetail['loan_type']['loan_type'],
        "Loan Type": this.makerDetail['loan_type']['loan']['loan'],
        "Balance Transfer Amount": this.makerDetail['balance_transfer_amount'],
        "IFSC Code": this.makerDetail['transfer_branch_ifsc_code'],
        "Bank Name": this.BankName,
        "Brach Name": this.BranchName,
        "Brach Address": this.BranchAddress,
        "Account Number": this.makerDetail['loan_account_number']
      },
    ];

    console.log("jsonData", jsonData)

    this.json2csv.downloadFile(jsonData, 'jsontocsv');
  }

  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }

}
