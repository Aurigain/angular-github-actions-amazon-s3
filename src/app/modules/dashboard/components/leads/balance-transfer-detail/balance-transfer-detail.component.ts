import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { NetworkRequestService } from 'src/app/core/services/network-request.service';

@Component({
  selector: 'app-balance-transfer-detail',
  templateUrl: './balance-transfer-detail.component.html',
  styleUrls: ['./balance-transfer-detail.component.scss']
})
export class BalanceTransferDetailComponent implements OnInit {

  image = {
    url: []
  }
  accountTransferDetails;
  currentUserId: number;
  isImagePreview: boolean = false;
  profileData;
  previewImg = null;
  leadDetails;
  documentDetails;
  appointmentDetails;
  addressDetails;
  pincodeDetail;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private misc: MiscellaneousService,
    private networkRequest: NetworkRequestService
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
        this.fetchBTLeadAppointmentDetails(id);
        this.fetchBTLeadAccountTransferDetails(id);

        if(this.leadDetails['loan_type']['loan_type'] === 'bt_external'){
          this.fetchBTLeadAdressDetails(id)
        }
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
      this.image.url.push(this.documentDetails['kyc_document_poa'])
      this.image.url.push(this.documentDetails['kyc_document_poi'])
      this.image.url.push(this.documentDetails['loan_document'])
      this.image.url.push(this.documentDetails['security_cheque_1'])
      this.image.url.push(this.documentDetails['security_cheque_2'])

      if(this.documentDetails['promissory_note']){
        this.image.url.push(this.documentDetails['promissory_note'])
      }
      if(this.documentDetails['agreement_last_page']){
        this.image.url.push(this.documentDetails['agreement_last_page'])
      }
      if(this.documentDetails['security_cheque_transfer']){
        this.image.url.push(this.documentDetails['security_cheque_transfer'])
      }
      if(this.documentDetails['foreclousre_letter']){
        this.image.url.push(this.documentDetails['foreclousre_letter'])
      }
      if(this.documentDetails['atm_withdrawl']){
        this.image.url.push(this.documentDetails['atm_withdrawl'])
      }

      console.log(this.image.url)
    })
  }

  fetchBTLeadAppointmentDetails(id) {
    this.misc.fetchLeadAppointmentById(id).subscribe(data => {
      console.log("appointment details:", data[0]);
      this.appointmentDetails = data[0];
    })
  }

  fetchBTLeadAccountTransferDetails(id) {
    this.misc.fetchLeadAccountTransferDetailById(id).subscribe(data => {
      console.log("account transfer details:", data[0]);
      this.accountTransferDetails = data[0];
    })
  }

  fetchBTLeadAdressDetails(id) {
    this.misc.fetchLeadAdressDetailById(id).subscribe(data => {
      console.log("address details:", data[0]);
      this.addressDetails = data[0];
      this.networkRequest.getWithHeaders(`/api/pincode/?pincode=${this.addressDetails['pincode']['code']}`).subscribe(
        data => {
          console.log("internal data is", data['data']);
          this.pincodeDetail = data['data'][0];
          console.log("pincode Details", this.pincodeDetail)
        },
        error => {
          console.log("error", error);
        }
      );
    })
  }


  ngOnInit(): void {
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchBTLeadDetail(this.currentUserId);
  }

}
