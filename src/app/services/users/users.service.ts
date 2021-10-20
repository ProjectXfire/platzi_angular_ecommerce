import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Environments
import { environment } from '@environments/environment';
// Models
import { CreateUserDto, User } from '@models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.URL_API}/users`);
  }

  create(data: CreateUserDto): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.URL_API}/users`, data)
      .pipe(
        map((user: User) => {
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
