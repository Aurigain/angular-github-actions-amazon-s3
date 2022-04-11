import { Component, OnInit } from '@angular/core';
import { SideNavBarService } from './side-nav.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  toggle:boolean=false;
  screenHeight: number;
  screenWidth: number;
  marginWidth: any;

  constructor(
    public sidenavservice: SideNavBarService
  ) {
    this.getScreenSize();
   }

   @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
         this.screenHeight = window.innerHeight;
         this.screenWidth = window.innerWidth;
        //  console.log(this.screenHeight, this.screenWidth);

         if(this.screenWidth > 992){
           this.marginWidth = 250 + 'px';
         }
         else{
           this.marginWidth = 0 + 'px';
         }
   }

  toggled(){
    this.toggle = !this.toggle
  }
  ngOnInit(): void {
    // this.toggle = this.sidenavservice.hideSideNav;
    this.sidenavservice.hideStatus.subscribe(
      data => {
        // console.log("toggledata", data);
          this.toggle = data;
    });
  }

}
