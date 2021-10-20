import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  // Handle Token
  setToken(token: string, user?: string) {
    this.cookieService.set('token', token);
  }
  getToken() {
    return this.cookieService.get('token');
  }
  remoteToken() {
    this.cookieService.delete('token');
  }
  existToken(): boolean {
    return this.cookieService.check('token');
  }
}
