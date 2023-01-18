import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${API}/login`, credentials, {
      headers: new HttpHeaders({
        lang: localStorage.getItem('lang') || 'fr',
        defLang: localStorage.getItem('defLang') || 'fr',
      }),
    });
  }
}
