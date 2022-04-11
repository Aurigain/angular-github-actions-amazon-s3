import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance-transfer-final-approval',
  templateUrl: './balance-transfer-final-approval.component.html',
  styleUrls: ['./balance-transfer-final-approval.component.scss']
})
export class BalanceTransferFinalApprovalComponent implements OnInit {
  currentUserId: number;
  status;
  remark;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.currentUserId);
  }

}
