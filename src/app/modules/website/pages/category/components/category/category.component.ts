import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { Product } from '@models/product';
// Services
import { ProductsService } from '@services/products/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  productId: string | null = null;
  limit: number = 10;
  offset: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.productsService.getAllByCategory(
              id,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => (this.products = data));
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }
}
