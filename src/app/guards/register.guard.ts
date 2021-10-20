import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// Services
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const existToken = this.tokenService.existToken();
    if (existToken) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
