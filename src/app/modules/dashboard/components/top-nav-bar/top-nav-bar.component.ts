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

  userProfile;
  // media = environment.media;

  toggleVal: boolean = false;

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
        console.log("profile data:",this.userProfile);
      }
    );
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

}
