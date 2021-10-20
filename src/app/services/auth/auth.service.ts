import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Services
import { StoreService } from '@services/store/store.service';
import { TokenService } from '@services/token/token.service';
// Environments
import { environment } from '@environments/environment';
// Models
import { Auth, User } from '@models/user';
// Utils
import { handleErrorMessage } from '@utils/handleErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private storeService: StoreService
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<Auth>(`${environment.URL_API}/auth/login`, {
        email,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        }),
        tap((token) => this.tokenService.setToken(token.access_token)),
        switchMap(() => this.profile())
      );
  }

  profile(): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.URL_API}/auth/profile`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        }),
        tap((user) => this.storeService.setUser(user)),
        map((user) => {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        })
      );
  }
}
