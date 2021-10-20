import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
// Providers
import { QuicklinkModule } from 'ngx-quicklink';
// Components
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
// Pages Components
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    NavComponent,
    LoginComponent,
    HomeComponent,
    MyCartComponent,
    RecoveryComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    QuicklinkModule,
  ],
})
export class WebsiteModule {}
