import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: ':id',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
