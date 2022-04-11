import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavBarService {

  hideSideNav: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hideStatus = this.hideSideNav.asObservable();


  toggleSideNav(status): void {
    console.log('toggle clicked');
    this.hideSideNav.next(status);
  }
  constructor(  ) { }


}
