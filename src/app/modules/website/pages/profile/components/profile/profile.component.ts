import { Component, OnInit } from '@angular/core';
// Models
import { User } from '@models/user';
// Services
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.profile().subscribe((data) => (this.user = data));
  }
}
