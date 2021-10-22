import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

// Models
import { Product, ProductInitValues } from '@models/product';
// Services
import { ProductsService } from '@services/products/products.service';
import { StoreService } from '@services/store/store.service';

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
    private storeService: StoreService,
    private location: Location
  ) {}

  addToCart() {
    this.storeService.addToCart(this.product || ProductInitValues);
  }

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
