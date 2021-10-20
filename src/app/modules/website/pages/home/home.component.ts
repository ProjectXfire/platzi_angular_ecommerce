import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { Product } from '@models/product';
// Services
import { ProductsService } from '@services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productId: string | null = null;
  limit: number = 10;
  offset: number = 0;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  nextPage() {
    this.offset += this.limit;
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit(): void {
    this.productsService
      .getAll(this.limit, this.offset)
      .subscribe((data) => (this.products = data));
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }
}
