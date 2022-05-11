import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleSwitchModeService {
  private roleMode: BehaviorSubject<string> = new BehaviorSubject('');
  private schoolId: BehaviorSubject<string> = new BehaviorSubject('');
  private displayMode: BehaviorSubject<string> = new BehaviorSubject('');
  private switchedUser: BehaviorSubject<string> = new BehaviorSubject('');
  private switchedName: BehaviorSubject<string> = new BehaviorSubject('');
  private instituteType: BehaviorSubject<string> = new BehaviorSubject('');

  roleModeStatus = this.roleMode.asObservable();
  schoolIdStatus = this.schoolId.asObservable();
  displayModeStatus = this.displayMode.asObservable();
  switchedUsername = this.switchedUser.asObservable();
  switchedFullName = this.switchedName.asObservable();
  instituteTypeName = this.instituteType.asObservable();

  constructor() { }

  updateRoleMode(status) {
    this.roleMode.next(status);
  }
  updateSchoolId(id) {
    this.schoolId.next(id);
  }
  updateDisplayMode(mode) {
    this.displayMode.next(mode);
  }

  updateSwitchedUser(userName) {
    this.switchedUser.next(userName);
  }

  updateSwitchName(name) {
    this.switchedName.next(name);
  }

  updateinstituteType(name) {
    this.instituteType.next(name);
  }
}
