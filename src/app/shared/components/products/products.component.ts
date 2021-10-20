import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Models
import { Product, ProductInitValues } from '@models/product';
// Services
import { StoreService } from '@services/store/store.service';
import { ProductsService } from '@services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() set productId(id: string | null) {
    if (id) {
      this.getProduct(id);
    }
  }
  @Output() nextPage = new EventEmitter();
  product: Product = ProductInitValues;
  myShoppingCart: Product[] = [];
  total: number = 0;
  active: boolean = false;
  onError: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeServices: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = storeServices.getTotalProducts();
  }

  addToCart(product: Product) {
    this.storeServices.addToCart(product);
    this.total = this.storeServices.getTotalPrice();
  }

  setNextPage() {
    this.nextPage.emit();
  }

  getProduct(id: string) {
    this.productsService.getOne(id).subscribe(
      (data) => {
        this.product = data;
        this.active = true;
      },
      (response) => console.log(response)
    );
  }

  closeProduct() {
    this.active = false;
    this.product = ProductInitValues;
  }
}
