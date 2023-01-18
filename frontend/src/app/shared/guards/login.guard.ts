import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    // if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    // } else {
    //   sessionStorage.clear();
    // }

    return true;
  }
}
