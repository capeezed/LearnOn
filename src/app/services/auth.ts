import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // Cadastro e login de aluno
  cadastrarAluno(dados: any) {
    return this.http.post(`${this.api}/auth/students/register`, dados);
  }

  loginAluno(dados: any) {
    return this.http.post<any>(`${this.api}/auth/students/login`, dados);
  }

  // Salva o token após login
  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  estaLogado() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}