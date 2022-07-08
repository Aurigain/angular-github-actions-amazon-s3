import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-detail',
  templateUrl: './fresh-lead-detail.component.html',
  styleUrls: ['./fresh-lead-detail.component.scss']
})
export class FreshLeadDetailComponent implements OnInit {
  leadId;
  leadDetails
  profileData
  constructor(
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
  ) { }


  fetchLeadDetail(id) {
    this.misc.leadLoanDetailById(id).subscribe(
      data => {
        console.log("lead detail:", data[0]);
        this.leadDetails = data[0];
        this.misc.fetchLeadProfileById(id).subscribe(
          data => {
            this.profileData = data[0]
            console.log("lead profile detail: ", this.profileData);

            // this.personalDetails.patchValue({
            //   name: this.profileData['fullname'],
            //   phoneNumber1: this.profileData['phonenumber'],
            //   fatherName: this.profileData['father_name'],
            //   gender: this.profileData['gender'],
            // })
          },
          error => {
            console.log(error);
          }
        )
        // this.fetchBTLeadDocumentDetails(id);
        // this.fetchBTLeadAppointmentDetails(id);
        // this.fetchBTLeadAccountTransferDetails(id);
        // if(this.leadDetails['loan_type']['loan_type'] === 'bt_external'){
        //   this.fetchBTLeadAdressDetails(id)
        // }
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.leadId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.leadId);
    this.fetchLeadDetail(this.leadId)
  }

}
