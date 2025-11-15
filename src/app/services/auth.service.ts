import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://heterozygous-stephnie-oversweetly.ngrok-free.dev/api/auth'; 

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  // REGISTRO DE ALUNO
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // REGISTRO DE PROFESSOR
  registerProfessor(professorData: any): Observable<any> {
    const url = `${this.apiUrl}/register-professor`; 
    return this.http.post<any>(url, professorData);
  }

  // LOGIN
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Grava na sessão as informações do usuário (token + objeto user)
        this.setSession(response.token, response.user);
      })
    );
  }

  // PEGAR O NOME DO USUÁRIO
  getUserName(): string | null {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.nome || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  // PEGAR O TIPO DO USUÁRIO (aluno, professor, etc)
  getUserType(): string | null {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.tipo || null;
      } catch {
        return null;
      }
    }
    return null;
  }
  
  // GERENCIAMENTO DE SESSÃO
  private setSession(token: string, user: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

  // ESTÁ LOGADO?
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
