import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API, getHeaders } from './api.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeToRefreshToken = 300000; // in milliseconds
  firstEnter = true;
  showInvalidTokenModel = false;
  sendRefreshToken = false;
  errorDialog = {
    message: '',
    statusText: '',
  };
  loginError = {
    errorDialogText: '',
    showErrorDialog: false,
  };
  canAccess = true;

  windowEventMousemove: any;

  windowEventKeyup: any;

  timeoutToShowExpiredTokenModal: any = -1;

  constructor(private http: HttpClient, private router: Router) {
    this.windowEventMousemove = this.refreshToken.bind(this);
    this.windowEventKeyup = this.refreshToken.bind(this);
  }

  // private refreshToken() {
  //   if (
  //     JSON.parse(sessionStorage.getItem("expiresIn") || "0") - Date.now() > 0 &&
  //     JSON.parse(sessionStorage.getItem("expiresIn") || "0") - Date.now() <=
  //     this.timeToRefreshToken
  //   ) {
  //     this.http
  //       .get(`${API}/login/token`, { headers: getHeaders() })
  //       .subscribe(({ token, expiresIn }: any) => {
  //         sessionStorage.setItem("token", token);
  //         sessionStorage.setItem("expiresIn", expiresIn);
  //         this.clearEvents();
  //         setTimeout(() => {
  //           this.addEventListener();
  //         }, JSON.parse(sessionStorage.getItem("expiresIn") || "0") - this.timeToRefreshToken - Date.now());
  //       });
  //   }
  // }

  private refreshToken() {
    JSON.parse(sessionStorage.getItem('expiresIn') || '0') - Date.now() <=
      this.timeToRefreshToken &&
      this.sendRefreshToken == false &&
      ((this.sendRefreshToken = true),
      this.http.get(`${API}/login/token`, { headers: getHeaders() }).subscribe({
        next: ({ token, expiresIn }: any) => {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('expiresIn', expiresIn);
          this.clearEvents();
          clearTimeout(this.timeoutToShowExpiredTokenModal);
          this.timeoutToShowExpiredTokenModal = setTimeout(() => {
            this.addEventListener();
          }, JSON.parse(sessionStorage.getItem('expiresIn') || '0') - this.timeToRefreshToken - Date.now());
          this.sendRefreshToken = false;
        },
        error: (error) => {},
      }));
  }

  addEventListener() {
    clearTimeout(this.timeoutToShowExpiredTokenModal);
    document.body.addEventListener(
      'mousemove',
      this.windowEventMousemove,
      true
    );
    document.body.addEventListener('keyup', this.windowEventKeyup, true);
    this.timeoutToShowExpiredTokenModal = setTimeout(() => {
      this.showInvalidTokenModel = true;
      this.firstEnter = true;
      this.clearEvents();
    }, JSON.parse(sessionStorage.getItem('expiresIn') || '0') - Date.now());
  }

  clearEvents() {
    document.body.removeEventListener('keyup', this.windowEventKeyup, true);
    document.body.removeEventListener(
      'mousemove',
      this.windowEventMousemove,
      true
    );
  }

  login(credentials: { email: string; password: string }) {
    this.http
      .post<{ token: string; expiresIn: string; user: User }>(
        `${API}/login`,
        credentials,
        {
          headers: getHeaders(),
        }
      )
      .subscribe({
        next: (success: any) => {
          sessionStorage.setItem('token', success.token);
          sessionStorage.setItem('expiresIn', success.expiresIn);
          sessionStorage.setItem('user', JSON.stringify(success.user));

          !localStorage.getItem('lang') && localStorage.setItem('lang', 'fr');
          !localStorage.getItem('defLang') &&
            localStorage.setItem('defLang', 'fr');

          this.firstEnter = true;

          const { backTo } = this.router.parseUrl(this.router.url).queryParams;

          backTo
            ? this.router.navigateByUrl(backTo)
            : this.router.navigateByUrl('/dashboard');
        },
        error: (error: any) => {
          this.loginError.errorDialogText = error.error.message;
          this.loginError.showErrorDialog = true;
        },
      });
  }

  isLoggedIn(): boolean | void {
    if (sessionStorage.getItem('token')) {
      if (!sessionStorage.getItem('expiresIn')) return false;

      if (
        // @ts-ignore
        JSON.parse(sessionStorage.getItem('expiresIn')) -
          this.timeToRefreshToken >
        Date.now()
      )
        return true;

      if (
        // @ts-ignore
        JSON.parse(sessionStorage.getItem('expiresIn')) < Date.now()
      ) {
        sessionStorage.clear();
        this.showInvalidTokenModel = true;

        return true;
      }

      return true;
    }

    return false;
  }

  logOut(tokenExpired: boolean = false) {
    if (!tokenExpired) {
      this.http.get(`${API}/logout`, { headers: getHeaders() }).subscribe({
        next: (result: any) => {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err: any) => {},
      });
    } else {
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        queryParams: { backTo: this.router.url },
      });
    }
  }
}
