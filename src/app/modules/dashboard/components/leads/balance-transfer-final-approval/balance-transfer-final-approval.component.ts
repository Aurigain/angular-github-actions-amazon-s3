import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-balance-transfer-final-approval',
  templateUrl: './balance-transfer-final-approval.component.html',
  styleUrls: ['./balance-transfer-final-approval.component.scss']
})
export class BalanceTransferFinalApprovalComponent implements OnInit {
  currentUserId: number;
  status;
  remark;
  final_approval_status
  final_approval_remark
  leadDetails;
  accountTransferDetails
  constructor(
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);

    this.fetchBTLeadDetail(this.currentUserId)
  }

  fetchBTLeadDetail(id) {
    this.misc.leadLoanDetailById(id).subscribe(
      data => {
        console.log("bt lead detail:", data[0]);
        this.leadDetails = data[0];


        this.fetchBTLeadAccountTransferDetails(id);
        if (this.leadDetails['lead']['fully_approved']) {
          this.final_approval_status = 'True'
          this.final_approval_remark = this.leadDetails['lead']['final_remarks']
        }
        // const id = data['lead']['id'];


        // this.misc.fetchLeadProfileById(id).subscribe(
        //   data => {
        //     this.profileData = data[0]
        //     console.log("lead profile detail: ", this.profileData);
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // )

      },
      error => {
        console.log(error);
      }
    )
  }

  fetchBTLeadAccountTransferDetails(id) {
    this.misc.fetchLeadAccountTransferDetailById(id).subscribe(data => {
      console.log("account transfer details:", data[0]);
      this.accountTransferDetails = data[0];
    })
  }
  saveFinalStatus() {
    const final_approval_status = this.final_approval_status
    const final_approval_remark = this.final_approval_remark

    let finalData = {
      final_status: final_approval_status,
      final_remark: final_approval_remark,
      lead: this.currentUserId
    }

    console.log(finalData)
    this.misc.balanceTransferFinalApproval(finalData).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Status Updated Sucessfully", "Success")
        this.router.navigate(['dashboard/final-approval'])
      },
      error => {
        this.toastr.error(error['message'], "Error")
      }
    )
  }

}
