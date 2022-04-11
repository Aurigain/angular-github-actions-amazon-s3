import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts-maker-panel-details',
  templateUrl: './accounts-maker-panel-details.component.html',
  styleUrls: ['./accounts-maker-panel-details.component.scss']
})
export class AccountsMakerPanelDetailsComponent implements OnInit {

  currentUserId:number;
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
