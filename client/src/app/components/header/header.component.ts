import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user$!: Observable<User | null>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
