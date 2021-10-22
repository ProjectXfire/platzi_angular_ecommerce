import { Component, EventEmitter, Input, Output } from '@angular/core';
// Models
import { Product, ProductInitValues } from '@models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = ProductInitValues;
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {}

  addToCart() {
    this.addedProduct.emit(this.product);
  }
}
