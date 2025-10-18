// src/app/services/auth.service.ts (ou src/app/services/auth.ts)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  // ------------------------------------
  // 1. REGISTRO (POST /api/auth/register)
  // ------------------------------------
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // ------------------------------------
  // 2. LOGIN (POST /api/auth/login)
  // ------------------------------------
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Se o login for sucesso, o backend retorna token e dados do usuário
        this.setSession(response.token, response.user);
      })
    );
  }

  // ------------------------------------
  // 3. GERENCIAMENTO DE SESSÃO
  // ------------------------------------
  private setSession(token: string, user: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica se o token existe (e idealmente, se não expirou)
    return !!localStorage.getItem('auth_token');
  }
}