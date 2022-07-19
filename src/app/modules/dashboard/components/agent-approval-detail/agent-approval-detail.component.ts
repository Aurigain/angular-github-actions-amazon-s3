import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agent-approval-detail',
  templateUrl: './agent-approval-detail.component.html',
  styleUrls: ['./agent-approval-detail.component.scss']
})
export class AgentApprovalDetailComponent implements OnInit {
  ii ='https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg'
  image = {
    url: []
  }
  constructor(
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
    private toastr: ToastrService
  ) { }
  agentDetails;
  currentUserId;
  profileData
  isImagePreview:boolean = false;
  previewImg = null;
  kycData
  addressData
  bankData
  previewImage(path){
    this.isImagePreview = true;
    this.previewImg = path;
  }

  closePreview(){
    this.isImagePreview = false;
  }

  fetchUserDetail(userId){
    this.misc.fetchAgentsDetail(userId).subscribe(
      data => {
        this.agentDetails = data['data'];
        this.getAllUserDetails(this.agentDetails['username'])
        console.log("agent list", this.agentDetails);
      }
    )
  }

  getAllUserDetails(username) {
    this.misc.fetchAgentProfileDetailByUserName(username).subscribe(
      data => {
        console.log("profiles is:", data)
        this.profileData = data[0]
        // console.log(this.profileData);

      },
      error => {
        console.log("error", error)
      })
    this.misc.fetchAgentKycByUserName(username).subscribe(
      data => {
        console.log("kyc data is", data);
        this.kycData = data[0]
        this.image.url.push(this.kycData['aadhar_front_image'])
        this.image.url.push(this.kycData['aadhar_back_image'])
        this.image.url.push(this.kycData['pan_image'])
        console.log("urls",this.image)
      },
      error => {
        console.log("error", error)
      }
    )
    this.misc.fetchAgentAddressByUserName(username).subscribe(
      data => {
        console.log("address data is", data);
        this.addressData = data[0]


      },
      error => {
        console.log("error", error)
      }
    )
    this.misc.fetchAgentBankByUserName(username).subscribe(
      data => {
        console.log("bank data is", data);
        this.bankData = data[0];
        this.image.url.push(this.bankData['cancelled_cheque_image'])
      },
      error => {
        console.log("error", error)
      }
    )
  }

  agentApproval(){
    const id = this.profileData['id'];
    this.misc.agentApproval(id).subscribe(
      data => {
        this.toastr.success("Agent Approved Successfully", "Sucess", {
          timeOut: 4000,
        });
      }
    )
  }

  agentDisApproval(){
    const id = this.profileData['id'];
    let formData ={
      remarks: '',
    }
    this.misc.agentDisApproval(formData, id).subscribe(
      data => {
        this.toastr.success("Agent DisApproved Successfully", "Sucess", {
          timeOut: 4000,
        });
      }
    )
  }

  // agentDisApproval(){

  // }

  ngOnInit(): void {

    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);
    this.fetchUserDetail(this.currentUserId);
  }

}
