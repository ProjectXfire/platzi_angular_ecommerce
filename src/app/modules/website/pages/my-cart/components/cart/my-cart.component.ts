import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//  Models
import { Product } from '@models/product';
// Services
import { StoreService } from '@services/store/store.service';

interface UpdateTotal {
  qtty: number;
  value: number;
  index?: number;
}

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit, OnDestroy {
  cartProducts$: Subscription | undefined;
  cardProducts: Product[] = [];
  total: number = 0;
  qtty: number = 0;

  constructor(private storeService: StoreService) {
    this.cartProducts$ = this.storeService.myCart$.subscribe(
      (data) => (this.cardProducts = data)
    );
  }
  ngOnInit() {
    this.qtty = this.cardProducts.length;
    this.total = this.cardProducts.reduce(
      (total, item) => total + item.price,
      0
    );
  }
  ngOnDestroy(): void {
    this.cartProducts$?.unsubscribe();
  }
  removeItem(data: UpdateTotal) {
    this.cardProducts.splice(data.index || 0, 1);
    this.total = this.total + data.value;
    this.qtty = this.qtty + data.qtty;
    this.storeService.removeToCart(this.cardProducts);
  }
  updateTotal(data: UpdateTotal) {
    this.total = this.total + data.value;
    this.qtty = this.qtty + data.qtty;
  }
}
