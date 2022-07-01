import { JSON2CSV } from './../../../../../core/services/json2csv';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts-maker-panel-details',
  templateUrl: './accounts-maker-panel-details.component.html',
  styleUrls: ['./accounts-maker-panel-details.component.scss']
})
export class AccountsMakerPanelDetailsComponent implements OnInit {
  makerLeadList;
  currentUserId:number;
  makerDetail;
  markStatus = "not uploaded";
  profileData
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private misc:MiscellaneousService,
    private json2csv:JSON2CSV,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.fetchMakerList();
  }

  fetchMakerList() {
    this.misc.fetchMakerList().subscribe(
      data => {
        console.log(data);
        this.makerLeadList = data;
        for(let i = 0; i < this.makerLeadList.length; i++){
          if(this.makerLeadList[i]['lead']['id']=== this.currentUserId){
            console.log("matched")
            this.makerDetail = this.makerLeadList[i];
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

  submitMaker(){
    let formData ={
      lead: this.makerDetail['lead']['id'],
      final_status: "True",
      final_remark: this.markStatus,
    }
    console.log(formData);
    this.misc.makerUpdate(formData).subscribe(
      data => {
        console.log(data);
      },
      error=>{
        this.toastr.error(error['message']['message'] ,"Error")
      })
  }

  download() {
    console.log("s",this.makerDetail['lead']['fullname'])
    let jsonData = [
      {
        "Name": `${this.makerDetail['lead']['fullname']}`,
        "Lead Type": this.makerDetail['loan_type']['loan_type'],
        "Loan Type": this.makerDetail['loan_type']['loan']['loan'],
        "Balance Transfer Amount": this.makerDetail['balance_transfer_amount'],
        "IFSC Code": this.makerDetail['transfer_branch']['ifsc_code'],
        "Bank Name": this.makerDetail['transfer_branch']['bank']['name'],
        "Brach Name": this.makerDetail['transfer_branch']['name'],
        "Brach Address": this.makerDetail['transfer_branch']['address'],
        "Account Number": this.makerDetail['loan_account_number']
      },
    ];



    this.json2csv.downloadFile(jsonData, 'jsontocsv');
  }

  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }

}
