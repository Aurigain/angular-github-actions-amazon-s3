import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-balance-transfer-detail',
  templateUrl: './balance-transfer-detail.component.html',
  styleUrls: ['./balance-transfer-detail.component.scss']
})
export class BalanceTransferDetailComponent implements OnInit {

  currentUserId:number;
  isImagePreview:boolean = false;
  previewImg = null;
  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  previewImage(path){
      this.isImagePreview = true;
      this.previewImg = path;
    }

    closePreview(){
      this.isImagePreview = false;
    }
  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
  }

}
