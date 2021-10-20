import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// Services
import { AuthService } from '@services/auth/auth.service';
import { StoreService } from '@services/store/store.service';
// Utils
import { handleErrorMessage } from '@utils/handleErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.profile().pipe(
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/home']);
        return handleErrorMessage(error);
      }),
      map((user) => {
        if (user && user.role === 'admin') {
          return true;
        }
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
