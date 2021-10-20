import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// Services
import { ModalService } from '@services/modal/modal.service';
import { AuthService } from '@services/auth/auth.service';
import { StoreService } from '@services/store/store.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  active: boolean = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  error: string = '';

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.modalService.showLogin$.subscribe((active) => (this.active = active));
  }

  login(event: Event) {
    event.preventDefault();
    this.error = '';
    if (this.form.valid) {
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (data) => {
            this.modalService.hide();
            this.form.reset();
          },
          (error) => (this.error = error)
        );
    }
    this.form.markAllAsTouched();
  }

  closeLogin() {
    this.modalService.hide();
    this.form.reset();
    this.error = '';
  }
}
