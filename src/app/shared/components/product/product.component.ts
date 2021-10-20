import { Component, EventEmitter, Input, Output } from '@angular/core';
// Models
import { Product } from '@models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: '',
    },
    price: 0,
    images: [],
  };
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {}

  addToCart() {
    this.addedProduct.emit(this.product);
  }
}
