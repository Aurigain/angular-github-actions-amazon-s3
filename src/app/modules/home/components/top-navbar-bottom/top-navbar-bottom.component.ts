import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/authentication/permissions.service';

@Component({
  selector: 'app-top-navbar-bottom',
  templateUrl: './top-navbar-bottom.component.html',
  styleUrls: ['./top-navbar-bottom.component.scss']
})
export class TopNavbarBottomComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
    private permissions: PermissionsService,

  ) { }

  isAuthenticated = this.permissions.isauthenticated();
  isSuperAdmin = this.permissions.isSuperAdmin();
  isAdmin = this.permissions.isAdmin();

  ngOnInit(): void {
  }

  goToUrl(): void {
    this.document.location.href = 'http://finsgo.s3-website.ap-south-1.amazonaws.com/login';
  }
}
