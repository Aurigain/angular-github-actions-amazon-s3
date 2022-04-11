import { Component, OnInit } from '@angular/core';
import { SideNavBarService } from '../../side-nav.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    public sidenavservice: SideNavBarService
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
