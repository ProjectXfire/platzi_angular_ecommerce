import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
// Environments
import { environment } from '@environments/environment';
// Models
import { Product, Category } from '@models/product';
// Services
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// Utils
import { handleErrorMessage } from '@utils/handleErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${environment.URL_API}/categories`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        })
      );
  }
}
