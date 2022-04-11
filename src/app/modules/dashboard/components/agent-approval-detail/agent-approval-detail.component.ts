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

  image = {
    url: ['https://www.w3schools.com/css/img_forest.jpg', 'https://www.w3schools.com/css/img_5terre.jpg', 'https://www.w3schools.com/css/img_lights.jpg', 'https://www.w3schools.com/css/img_lights.jpg']
  }
  constructor(
    private route: ActivatedRoute,
    private misc: MiscellaneousService,
    private toastr: ToastrService
  ) { }
  agentDetails;
  currentUserId;

  isImagePreview:boolean = false;
  previewImg = null;

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
        console.log("agent list", this.agentDetails);
      }
    )
  }

  agentApproval(){
    this.misc.agentApproval(this.currentUserId).subscribe(
      data => {
        this.toastr.success("Agent Approved Successfully", "Sucess", {
          timeOut: 4000,
        });
      }
    )
  }

  agentDisApproval(){

  }
  ngOnInit(): void {

    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentUserId);



    this.fetchUserDetail(this.currentUserId);
  }

}
