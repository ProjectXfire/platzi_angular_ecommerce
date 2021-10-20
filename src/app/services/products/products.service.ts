import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
// Models
import { Product, CreateProductDto, UpdateProductDto } from '@models/product';
// Environments
import { environment } from '@environments/environment';
// Utils
import { handleErrorMessage } from '@utils/handleErrorMessage';
// Interceptors
import { checkTime } from '@interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAll(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Product[]>(`${environment.URL_API}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        }),
        map((products: Product[]) => {
          return products.map((prod) => {
            return {
              ...prod,
              taxes: 0.19 * prod.price,
            };
          });
        })
      );
  }
  getAllByCategory(
    categoryId: string | null,
    limit?: number,
    offset?: number
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Product[]>(
        `${environment.URL_API}/categories/${categoryId}/products`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        }),
        map((products: Product[]) => {
          return products.map((prod) => {
            return {
              ...prod,
              taxes: 0.19 * prod.price,
            };
          });
        })
      );
  }
  getOne(id: string | null): Observable<Product> {
    return this.httpClient
      .get<Product>(`${environment.URL_API}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handleErrorMessage(error);
        })
      );
  }
  create(data: CreateProductDto): Observable<Product> {
    return this.httpClient.post<Product>(
      `${environment.URL_API}/products`,
      data
    );
  }
  update(id: number, data: UpdateProductDto): Observable<Product> {
    return this.httpClient.put<Product>(
      `${environment.URL_API}/products/${id}`,
      data
    );
  }
  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${environment.URL_API}/products/${id}`
    );
  }
}
