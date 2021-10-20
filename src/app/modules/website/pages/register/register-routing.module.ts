import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { ExitGuard } from '@guards/exit.guard';
// Components
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    canDeactivate: [ExitGuard],
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
