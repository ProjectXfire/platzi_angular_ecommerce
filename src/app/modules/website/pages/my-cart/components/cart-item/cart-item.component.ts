import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: Product | null = null;
  @Input() index: number = 0;
  @Output() updateTotal = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  qtty: number = 1;
  total: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.total = this.item ? this.item.price : 0;
    console.log(this.index);
  }

  remove() {
    this.removeItem.emit({
      qtty: this.qtty * -1,
      value: this.total * -1,
      index: this.index,
    });
  }
  plus(price: number) {
    this.qtty++;
    this.total = this.total + price;
    this.updateTotal.emit({ qtty: 1, value: price });
  }
  less(price: number) {
    if (this.qtty > 1) {
      this.qtty--;
      this.total = this.total - price;
      this.updateTotal.emit({ qtty: -1, value: price * -1 });
    }
  }
}
