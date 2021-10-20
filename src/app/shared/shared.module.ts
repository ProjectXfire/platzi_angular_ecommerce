import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Material Design
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
// Pipes & Directives
import { HightlightDirective } from './directives/hightlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
// Components
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    HightlightDirective,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [
    HightlightDirective,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    MatIconModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
