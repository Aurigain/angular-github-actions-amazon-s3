import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts-checker-panel-details',
  templateUrl: './accounts-checker-panel-details.component.html',
  styleUrls: ['./accounts-checker-panel-details.component.scss']
})
export class AccountsCheckerPanelDetailsComponent implements OnInit {

  currentUserId:number;
  remark;
  status;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
  }
  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }

}
