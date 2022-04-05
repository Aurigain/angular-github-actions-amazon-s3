import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConstantsService } from 'src/app/config/constants.service';
import { Profile, ProfileAdapter } from '../adaptors/profile.model';
import { ErrorHandlerService } from '../http/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _userProfile$: BehaviorSubject<Profile>;
  public _userProfile: Profile;
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private adapter: ProfileAdapter,
    private consts: ConstantsService
  ) { 
    this._userProfile$ = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('userProfile')));
  }

  setUserProfileValue(data) {
    this._userProfile$.next(data);
}

  refreshProfileData() {
    return new Observable(observer => {
        this.http.get<Array<object>>(this.consts.getUpdateProfileUrl)
            .subscribe(
                data => {
                  console.log("profile data", data);
                    observer.next(this.adapter.adapt(data['profile']));
                },
                error => {
                    observer.error('failed');
                }
                );
    })
}
}
