import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartRoutingModule } from './my-cart-routing.module';
import { FormsModule } from '@angular/forms';
// Shared
import { SharedModule } from '@shared/shared.module';
// Components
import { MyCartComponent } from './components/cart/my-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [MyCartComponent, CartItemComponent],
  imports: [CommonModule, MyCartRoutingModule, SharedModule, FormsModule],
})
export class MyCartModule {}
