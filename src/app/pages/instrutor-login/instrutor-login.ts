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
      --bg: #f6efe5;
      --bg2: #efe5d8;

      --white: #fffaf4;
      --surface: #ffffff;

      --navy: #4937a6;
      --muted: #7c7297;

      --accent: #f97316;
      --accent2: #ff944d;

      --teal: #6b5cff;

      --border: #e8d9cb;

      --input-bg: #f3eadf;

      display: flex;
      min-height: 100vh;

      align-items: center;
      justify-content: center;

      background:
      radial-gradient(circle at top right, rgba(249,115,22,.08), transparent 25%),
      radial-gradient(circle at bottom left, rgba(107,92,255,.08), transparent 25%),
      var(--bg);

      font-family: 'DM Sans', sans-serif;
    }

    :host-context(body.dark-mode) {
      --bg: #050816;
      --bg2: #0f1222;

      --white: #12172a;
      --surface: #171d33;

      --navy: #f3f4f6;
      --muted: #9ca3af;

      --accent: #ff6a1a;
      --accent2: #ff944d;

      --teal: #7c83ff;

      --border: #2a3147;

      --input-bg: #0b1020;

      background:
      radial-gradient(circle at top right, rgba(124,131,255,.16), transparent 30%),
      radial-gradient(circle at bottom left, rgba(255,106,26,.12), transparent 28%),
      linear-gradient(180deg, #050816, #070b1b);
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
      box-shadow:
        0 20px 60px rgba(73,55,166,.10),
        0 4px 20px rgba(0,0,0,.05);
      backdrop-filter: blur(16px);
      transition:
        background .2s,
        border-color .2s,
        box-shadow .2s;
    }

    :host-context(body.dark-mode) .card {
      background:
        linear-gradient(
          180deg,
          rgba(23,29,51,.96),
          rgba(18,23,42,.96)
        );
      box-shadow:
        0 20px 60px rgba(0,0,0,.45),
        0 0 0 1px rgba(124,131,255,.04);
    }

    .badge-instrutor {
      display: inline-block;
      background: rgba(124,131,255,.12);
      color: var(--teal);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 16px;
      border: 1px solid rgba(124,131,255,.18);
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
      width: 100%;
      padding: 13px 16px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      background: var(--input-bg);
      color: var(--navy);
      outline: none;
      transition:
        border-color .2s,
        background .2s,
        box-shadow .2s;
      box-sizing: border-box;
    }
    input:focus {
      border-color: var(--teal);
      background: color-mix(in srgb, var(--input-bg) 82%, white 18%);
      box-shadow:
        0 0 0 4px rgba(124,131,255,.14);
    }

    .btn-login {
      width: 100%;
      padding: 15px;
      background:
        linear-gradient(
          135deg,
          #4b36a8,
          #5b45c7
        );
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      margin-top: 8px;
      transition:
        transform .2s,
        box-shadow .2s,
        opacity .2s;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow:
        0 14px 32px rgba(91,69,199,.35);
      opacity: .96;
    }


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