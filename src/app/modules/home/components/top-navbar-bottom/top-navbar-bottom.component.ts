import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/authentication/permissions.service';

@Component({
  selector: 'app-top-navbar-bottom',
  templateUrl: './top-navbar-bottom.component.html',
  styleUrls: ['./top-navbar-bottom.component.scss']
})
export class TopNavbarBottomComponent implements OnInit {

  constructor(
    private permissions: PermissionsService
  ) { }

  isAuthenticated = this.permissions.isauthenticated();
  isSuperAdmin = this.permissions.isSuperAdmin();
  isAdmin = this.permissions.isAdmin();

  ngOnInit(): void {
  }

}
