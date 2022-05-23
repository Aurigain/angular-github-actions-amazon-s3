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
      return localStorage.getItem(key);
    } else {
      return undefined;
    }
  }

  setItem(key, data) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      localStorage.setItem(key, data);
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      localStorage.clear();
    }
  }

  removeItem(key) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
