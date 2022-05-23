import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare let localStorage: any;
@Injectable({
  providedIn: 'root'
})
export class SsrHandlerService {

  constructor(
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isBrowser: boolean;

  getItem(key) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    } else {
      return undefined;
    }
  }

  setItem(key, data) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      sessionStorage.setItem(key, data);
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }

  removeItem(key) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }
}
