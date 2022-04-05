import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from '../authentication/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivateChild {
  
  constructor(
    private router: Router,
    private permissions: PermissionsService
  ) { }
  canLoad():boolean{
    if (this.permissions.isauthenticated()){  
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
  canActivateChild(): boolean {
    return this.canLoad();
  }
}
