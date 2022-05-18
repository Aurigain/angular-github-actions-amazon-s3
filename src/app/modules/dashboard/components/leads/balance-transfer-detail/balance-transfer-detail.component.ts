import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-balance-transfer-detail',
  templateUrl: './balance-transfer-detail.component.html',
  styleUrls: ['./balance-transfer-detail.component.scss']
})
export class BalanceTransferDetailComponent implements OnInit {

  currentUserId: number;
  isImagePreview: boolean = false;
  profileData;
  previewImg = null;
  leadDetails;
  documentDetails;
  appointmentDetails;
  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private misc: MiscellaneousService
  ) { }
  previewImage(path) {
    this.isImagePreview = true;
    this.previewImg = path;
  }

  closePreview() {
    this.isImagePreview = false;
  }

  fetchBTLeadDetail(id) {
    this.misc.leadLoanDetailById(id).subscribe(
      data => {
        console.log("bt lead detail:", data);
        this.leadDetails = data;
        const id = data['lead']['id'];
        this.misc.fetchLeadProfileById(id).subscribe(
          data => {
            this.profileData = data[0]
            console.log("lead profile detail: ", this.profileData);
          },
          error => {
            console.log(error);
          }
        )
        this.fetchBTLeadDocumentDetails(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  fetchBTLeadDocumentDetails(id) {
    this.misc.fetchLeadDocumentById(id).subscribe(data => {
      console.log("document details:", data[0]);
      this.documentDetails = data[0];
    })
  }

  fetchBTLeadAppointmentDetails(id) {
    this.misc.fetchLeadAppointmentById(id).subscribe(data => {
      console.log("document details:", data[0]);
      this.appointmentDetails = data[0];
    })
  }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchBTLeadDetail(this.currentUserId);
  }

}
