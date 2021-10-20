import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Guards
import { OnExit } from '@guards/exit.guard';
// Services
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnExit {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  error: string = '';

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onExit() {
    const rpta = confirm('¿está seguro de salir?');
    return rpta;
  }

  register(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const newUser = this.form.value;
      newUser.role = 'customer';
      this.usersService.create(newUser).subscribe(
        (data) => {
          this.form.reset();
          this.router.navigateByUrl('/home');
        },
        (error) => (this.error = error)
      );
    }
    this.form.markAllAsTouched();
  }
}
