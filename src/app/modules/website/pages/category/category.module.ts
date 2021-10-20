import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
// Shared module
import { SharedModule } from '@shared/shared.module';
// Components
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
