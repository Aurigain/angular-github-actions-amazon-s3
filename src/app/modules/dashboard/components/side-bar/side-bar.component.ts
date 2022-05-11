import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/authentication/permissions.service';
import { SideNavBarService } from '../../side-nav.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {


  // isAdmin = this.permissions.isAdmin();
  // isAgent = this.permissions.isAgent();
  // isCustomer = this.permissions.isCustomer();
  // isSalesManager = this.permissions.isSalesManager();

  constructor(
    public sidenavservice: SideNavBarService,
    private permissions: PermissionsService
  ) { }
  // hideSideNav: boolean = false;
    toggle: boolean = false;

  // toggleSideNav(): void {
  //   this.hideSideNav = !this.hideSideNav;
  // }
  ngOnInit(): void {
    this.sidenavservice.hideStatus.subscribe(
      data => {
        console.log("toggledata", data);
          this.toggle = data;
    });
		// $(document).ready(function () {
		// 	$('#sidebarCollapse').on('click', function () {
		// 		$('#sidebar').toggleClass('active');
		// 	});
		// });
  }

}
