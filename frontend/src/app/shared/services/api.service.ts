import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const API = 'http://localhost:3220';

export function getHeaders(headers: any = {}) {
  let header = {
    lang: sessionStorage.getItem('lang') || 'fr',
    defLang: sessionStorage.getItem('defLang') || 'fr',
    ...headers,
  };

  if (sessionStorage.getItem('token'))
    header.jwt = sessionStorage.getItem('token');

  return new HttpHeaders(header);
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get<T = any>(url: string, headers: { [name: string]: any } = {}) {
    return this.http
      .get<T>(`${API}${url.startsWith('/') ? url : `/${url}`}`, {
        headers: getHeaders(headers),
      })
      .pipe(
        catchError((error: any) => {
          if (
            [
              'jwt must be provided',
              'jwt expired',
              'invalid algorithm',
              'invalid signature',
            ].includes(error?.error?.error?.message || error?.error?.message)
          ) {
            sessionStorage.removeItem('token');
            this.authService.showInvalidTokenModel = true;
            this.authService.errorDialog = {
              message: error.error.message,
              statusText: error.statusText,
            };
          }
          return throwError(() => error);
        })
      );
  }

  post<T = any>(url: string, body: any, headers: { [name: string]: any } = {}) {
    return this.http
      .post<T>(`${API}${url.startsWith('/') ? url : `/${url}`}`, body, {
        headers: getHeaders(headers),
      })
      .pipe(
        catchError((error: any) => {
          if (
            [
              'jwt must be provided',
              'jwt expired',
              'invalid algorithm',
              'invalid signature',
            ].includes(error?.error?.error?.message || error?.error?.message)
          ) {
            sessionStorage.removeItem('token');
            this.authService.showInvalidTokenModel = true;
            this.authService.errorDialog = {
              message: error.error.message,
              statusText: error.statusText,
            };
          }

          return throwError(() => error);
        })
      );
  }

  patch<T = any>(
    url: string,
    body: any,
    headers: { [name: string]: string } = {}
  ) {
    return this.http
      .patch<T>(`${API}${url.startsWith('/') ? url : `/${url}`}`, body, {
        headers: getHeaders(headers),
      })
      .pipe(
        catchError((error: any) => {
          if (
            [
              'jwt must be provided',
              'jwt expired',
              'invalid algorithm',
              'invalid signature',
            ].includes(error?.error?.error?.message || error?.error?.message)
          ) {
            sessionStorage.removeItem('token');
            this.authService.showInvalidTokenModel = true;
            this.authService.errorDialog = {
              message: error.error.message,
              statusText: error.statusText,
            };
          }

          return throwError(() => error);
        })
      );
  }
}
