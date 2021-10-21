import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Services
import { ModalService } from '@services/modal/modal.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  active: boolean = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  error: string = '';
  showLogin$: Subscription | undefined;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showLogin$ = this.modalService.showLogin$.subscribe(
      (active) => (this.active = active)
    );
  }
  ngOnDestroy(): void {
    this.showLogin$?.unsubscribe();
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
