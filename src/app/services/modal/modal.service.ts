import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showLogin = new BehaviorSubject<boolean>(false);
  showLogin$ = this.showLogin.asObservable();

  constructor() {}

  show() {
    this.showLogin.next(true);
  }
  hide() {
    this.showLogin.next(false);
  }
}
