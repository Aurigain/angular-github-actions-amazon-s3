import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/authentication/permissions.service';
import { SideNavBarService } from '../../side-nav.service';
import { map } from 'rxjs/operators';
import { SsrHandlerService } from 'src/app/core/services/ssr-handler.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  userData;
  userPermissions;
  // isAdmin = this.permissions.isAdmin();
  // isAgent = this.permissions.isAgent();
  // isCustomer = this.permissions.isCustomer();
  // isSalesManager = this.permissions.isSalesManager();

  constructor(
    public sidenavservice: SideNavBarService,
    private permissions: PermissionsService,
    private ssrService: SsrHandlerService,
  ) { }
  // hideSideNav: boolean = false;
  toggle: boolean = false;

  // toggleSideNav(): void {
  //   this.hideSideNav = !this.hideSideNav;
  // }

  checkPermission(permission) {
    if (this.userPermissions.includes(permission)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkUpperPermission(...args){
    let permissions=[];

    args.forEach(perms => {
      permissions.push(perms)
    })

    for(let i = 0; i < permissions.length; i++){
      if(this.userPermissions.includes(permissions[i])){
        return true;
      }
    }
  }
  ngOnInit(): void {

    if (this.permissions.isauthenticated()) {
      this.userData = this.ssrService.getItem('userProfile');
      const tempPermissions = this.ssrService.getItem('userPermissions');
      this.userPermissions = JSON.parse(tempPermissions)
      console.log("resppppp", this.userPermissions)
      this.sidenavservice.hideStatus.subscribe(
        data => {
          console.log("toggledata", data);
          this.toggle = data;
        });
    }
    // $(document).ready(function () {
    // 	$('#sidebarCollapse').on('click', function () {
    // 		$('#sidebar').toggleClass('active');
    // 	});
    // });
  }

}
