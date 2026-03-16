import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-instrutor-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
      --bg:     #f0ebe3;
      --white:  #ffffff;
      --navy:   #1c2b3a;
      --accent: #d64e2a;
      --teal:   #2a7a6e;
      --muted:  #7a7060;
      --border: #d8d0c5;
      display: flex; min-height: 100vh;
      align-items: center; justify-content: center;
      background: var(--bg);
      font-family: 'DM Sans', sans-serif;
    }

    .login-wrap {
      width: 100%; max-width: 440px;
      padding: 24px;
    }

    .back-link {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 600; color: var(--muted);
      text-decoration: none; margin-bottom: 32px;
      transition: color .2s;
    }
    .back-link:hover { color: var(--navy); }

    .card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 28px;
      padding: 44px 40px;
      box-shadow: 0 8px 40px rgba(28,43,58,.07);
    }

    .badge-instrutor {
      display: inline-block;
      background: rgba(42,122,110,.12); color: var(--teal);
      padding: 5px 14px; border-radius: 50px;
      font-size: 12px; font-weight: 700;
      letter-spacing: .5px; text-transform: uppercase;
      margin-bottom: 16px;
    }

    h1 {
      font-family: 'Nunito', sans-serif;
      font-size: 28px; font-weight: 900;
      color: var(--navy); margin-bottom: 6px;
    }
    .subtitle { font-size: 14px; color: var(--muted); margin-bottom: 36px; }

    .field { margin-bottom: 20px; }
    label {
      display: block; font-size: 13px; font-weight: 600;
      color: var(--navy); margin-bottom: 8px;
    }
    input {
      width: 100%; padding: 13px 16px;
      border: 1.5px solid var(--border); border-radius: 12px;
      font-size: 15px; font-family: 'DM Sans', sans-serif;
      background: var(--bg); color: var(--navy);
      outline: none; transition: border-color .2s, background .2s;
      box-sizing: border-box;
    }
    input:focus { border-color: var(--teal); background: var(--white); }

    .btn-login {
      width: 100%; padding: 15px;
      background: var(--navy); color: white;
      border: none; border-radius: 50px;
      font-size: 15px; font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer; margin-top: 8px;
      transition: background .2s, transform .2s;
    }
    .btn-login:hover:not(:disabled) { background: var(--teal); transform: translateY(-2px); }
    .btn-login:disabled { opacity: .6; cursor: not-allowed; }

    .erro {
      background: rgba(214,78,42,.08); border: 1px solid rgba(214,78,42,.2);
      color: var(--accent); border-radius: 12px;
      padding: 12px 16px; font-size: 13px; font-weight: 600;
      margin-top: 16px; text-align: center;
    }

    .divider {
      text-align: center; margin-top: 28px;
      font-size: 13px; color: var(--muted);
    }
    .divider a {
      color: var(--navy); font-weight: 700; text-decoration: none;
    }
    .divider a:hover { color: var(--teal); }
  `],
  template: `
    <div class="login-wrap">
      <a routerLink="/home" class="back-link">← Voltar para a home</a>

      <div class="card">
        <div class="badge-instrutor">Área do Instrutor</div>
        <h1>Bem-vindo de volta</h1>
        <p class="subtitle">Acesse sua conta para gerenciar suas aulas.</p>

        <div class="field">
          <label>E-mail</label>
          <input type="email" [(ngModel)]="email" placeholder="seu@email.com" />
        </div>
        <div class="field">
          <label>Senha</label>
          <input type="password" [(ngModel)]="senha" placeholder="••••••••"
                 (keyup.enter)="login()" />
        </div>

        <button class="btn-login" (click)="login()" [disabled]="carregando">
          {{ carregando ? 'Entrando...' : 'Entrar como Instrutor' }}
        </button>

        @if (erro) {
          <div class="erro">{{ erro }}</div>
        }

        <div class="divider">
          É aluno? <a routerLink="/login">Acesse aqui</a>
        </div>
      </div>
    </div>
  `
})
export class InstrutorLogin {
  email     = '';
  senha     = '';
  carregando = false;
  erro      = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha e-mail e senha.';
      return;
    }
    this.carregando = true;
    this.erro = '';

    this.http.post<any>(`${environment.apiUrl}/auth/instructors/login`, {
      email: this.email,
      password: this.senha
    }).subscribe({
      next: (res) => {
        localStorage.setItem('instrutor_token', res.token);
        localStorage.setItem('instrutor_nome', res.name || 'Instrutor');
        this.router.navigate(['/instrutor/painel']);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.error || 'E-mail ou senha incorretos.';
      }
    });
  }
}