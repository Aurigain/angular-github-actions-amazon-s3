import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-accounts-checker-panel-details',
  templateUrl: './accounts-checker-panel-details.component.html',
  styleUrls: ['./accounts-checker-panel-details.component.scss']
})
export class AccountsCheckerPanelDetailsComponent implements OnInit {
  checkerLeadList;
  currentUserId:number;
  makerDetail;
  markStatus = "not uploaded";
  profileData;
  accountNumber;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private misc:MiscellaneousService,
    // private json2csv:JSON2CSV,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.fetchMakerList();
  }

  fetchMakerList() {
    this.misc.fetchCheckerList().subscribe(
      data => {
        console.log(data);
        this.checkerLeadList = data;
        for(let i = 0; i < this.checkerLeadList.length; i++){
          if(this.checkerLeadList[i]['lead']['id']=== this.currentUserId){
            console.log("matched")
            this.makerDetail = this.checkerLeadList[i];
          }
        }
      }
    )
  }

  submitChecker(){
    let formData ={
      lead: this.makerDetail['lead']['id'],
      final_status: "True",
      account_number: this.accountNumber,
    }
    console.log(formData);
    this.misc.checkerUpdate(formData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Success")
      },
      error=>{
        this.toastr.error(error['message']['message'] ,"Error")
      })
  }


  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }

}
