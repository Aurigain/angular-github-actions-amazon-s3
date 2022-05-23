import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { PermissionsService } from './core/authentication/permissions.service';
import { ProfileService } from './core/authentication/user-profile.service';
import { MiscellaneousService } from './core/services/miscellaneous.service';
import { SsrHandlerService } from './core/services/ssr-handler.service';
import { UtilsService } from './core/services/utils.service';
import { RoleSwitchModeService } from './modules/dashboard/service/role-switch-mode.service';

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-github-actions-amazon-s3';
  subscription: Subscription;
  userPermissions;
  constructor(
    private router: Router,
    private permissionsvc: PermissionsService,
    private profilesvc: ProfileService,
    private roleswitchmodesvc: RoleSwitchModeService,
    private cookie: CookieService,
    private utils: UtilsService,
    private misc: MiscellaneousService,
    private ssrService: SsrHandlerService,
  )
  {
    this.subscription = router.events.subscribe((event) => {
      if (this.permissionsvc.isauthenticated() && event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        if (browserRefresh) {
          // this.profilesvc.refreshProfileData().subscribe(
          //   data => {
          //     localStorage.setItem('userProfile', JSON.stringify(data));
          //     this.profilesvc.setUserProfileValue(data);
          //     this.roleswitchmodesvc.updateRoleMode(data['role']);
          //     const token = this.cookie.get('_l_a_t');
          //     const decodeToken = this.utils.decodeToken(token);
          //     const instituteType = decodeToken['instituteType'];
          //     // this.roleswitchmodesvc.updateinstituteType(instituteType);
          //   },
          //   error=>{
          //     console.log('failed');
          //   }
          // );

          this.misc.userProfile().subscribe(
            data => {
              console.log("profile data:",data);
              this.ssrService.setItem('userProfile', JSON.stringify(data));
              this.misc.fetchPermissionsById(data['user_group']).subscribe(
                data => {
                  console.log("permissions data:",data);
                  //@ts-ignore
                  data.map((res) => {
                    this.userPermissions.push(res['permission']['permission_name']);
                  })
                  console.log("uspp", this.userPermissions)
                  this.ssrService.setItem('userPermissions', JSON.stringify(this.userPermissions));
                },
                error => {
                  console.log("error:",error);
                }
              )
            }
          );
        }
      }
    });
  }

}
