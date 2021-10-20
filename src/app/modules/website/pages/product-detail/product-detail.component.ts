import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
// Models
import { Product } from '@models/product';
// Services
import { ProductsService } from '@services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  productId: null | string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getOne(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => (this.product = data));
  }
}
