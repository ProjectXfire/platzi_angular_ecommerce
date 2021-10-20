import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// Providers
import { QuicklinkStrategy } from 'ngx-quicklink';
// Guards
import { AdminGuard } from '@guards/roles/admin.guard';
// Services
import { CustomPreloadService } from '@services/custom-preload/custom-preload.service';
// Pages components
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true,
    },
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('@modules/cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
