import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Modules
import { Category } from '@models/product';
// Services
import { ModalService } from '@services/modal/modal.service';
import { StoreService } from '@services/store/store.service';
import { CategoriesService } from '@services/categories/categories.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeSideBar: boolean = false;
  activeUserMenu: boolean = false;
  counter: number = 0;
  userEmail: string | undefined = undefined;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private modalService: ModalService,
    private categoriesService: CategoriesService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.user$.subscribe((user) => (this.userEmail = user?.email));
    this.storeService.myCart$.subscribe((prod) => (this.counter = prod.length));
    this.categoriesService
      .getAll()
      .subscribe((data) => (this.categories = data));
  }
  showLogin() {
    this.modalService.show();
    this.activeSideBar = false;
  }
  logout() {
    this.tokenService.remoteToken();
    this.activeUserMenu = false;
    this.activeSideBar = false;
    this.userEmail = '';
    this.router.navigateByUrl('/home');
  }
  showSidebar() {
    this.activeSideBar = true;
  }
  hideSidebar() {
    this.activeSideBar = false;
    this.activeUserMenu = false;
  }
  showUserMenu() {
    this.activeUserMenu = true;
  }
  hideUserMenu() {
    this.activeUserMenu = false;
  }
}
