import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/core/adaptors/profile.model';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';
import { environment } from 'src/environments/environment';
import { SideNavBarService } from '../../side-nav.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(
    public sidenavservice: SideNavBarService,
    private misc: MiscellaneousService,
    private auth: AuthService
  ) { }

  readList
  unreadList

  userProfile;
  currentStep = 1;
  // media = environment.media;

  toggleVal: boolean = false;

  setStep(id) {
    this.currentStep = id;
  }
  logout() {
    this.auth.logout()
  }

  calltoggleSideNav() {
    this.toggleVal = !this.toggleVal;
    this.sidenavservice.toggleSideNav(this.toggleVal);
  }

  getUserProfile() {
    this.misc.userProfile().subscribe(
      data => {
        this.userProfile = data;
        console.log(data);
        console.log("profile data:", this.userProfile);
      }
    );
  }

  getNotificationsList() {
    this.misc.getNotificationListByStatus("read").subscribe(
      data => {
        this.readList = data;
        console.log("readList",data);

      }
    );
    this.misc.getNotificationListByStatus("unread").subscribe(
      data => {
        this.unreadList = data;
        console.log("unread List",data);
      }
    );
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getNotificationsList();
  }

}
