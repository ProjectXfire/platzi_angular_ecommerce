import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from '@guards/auth.guard';
import { RegisterGuard } from '@guards/register.guard';
// Components
import { LayoutComponent } from '@modules/website/components/layout/layout.component';
// Pages components
import { HomeComponent } from '@modules/website/pages/home/home.component';
import { RecoveryComponent } from '@modules/website/pages/recovery/recovery.component';
import { ProductDetailComponent } from '@modules/website/pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'register',
        canActivate: [RegisterGuard],
        loadChildren: () =>
          import('@modules/website/pages/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@modules/website/pages/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('@modules/website/pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        data: {
          preload: true,
        },
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('@modules/website/pages/my-cart/my-cart.module').then(
            (m) => m.MyCartModule
          ),
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
