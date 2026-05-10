import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
    --bg: #f6efe5;
    --white: #fffaf4;

    --navy: #4937a6;
    --accent: #f97316;

    --muted: #7c7297;
    --border: #e8d9cb;

    --card-bg: #ffffff;
    --input-bg: #f7f1ea;

    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;

    background: var(--bg);

    font-family: 'DM Sans', sans-serif;

    transition:
      background .25s ease,
      color .25s ease;
  }

  :root[data-theme='dark'] app-login {
    --bg: #050816;
    --white: #12172a;

    --navy: #f3f4f6;
    --accent: #ff6a1a;

    --muted: #9ca3af;
    --border: #2a3147;

    --card-bg: #171d33;
    --input-bg: #0f1222;
  } 

  :root[data-theme='dark'] .login-card { background: radial-gradient(circle at top right,rgba(249,115,22,.12), transparent 30%),#171d33; }

    .login-card {
      background: var(--card-bg);
      border-radius: 28px;
      padding: 52px 48px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 20px 60px rgba(0,0,0,.18);
      border: 1px solid var(--border);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 32px;
      transition: color .2s;
    }
    .back-link:hover { color: var(--navy); }

    .brand {
      font-family: 'Nunito', sans-serif;
      font-size: 28px;
      font-weight: 900;
      color: var(--navy);
      text-align: center;
      margin-bottom: 6px;
    }
    .brand span { color: var(--accent); }

    .subtitle {
      text-align: center;
      color: var(--muted);
      font-size: 15px;
      margin-bottom: 32px;
    }

    .btn-google {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 13px;
      background: var(--white);
      color: var(--navy);
      border: 1.5px solid var(--border);
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      transition: border-color .2s, box-shadow .2s;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .btn-google:hover {
      border-color: var(--navy);
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }
    .btn-google img {
      width: 18px;
      height: 18px;
    }

    .separator {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .separator::before,
    .separator::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }
    .separator span {
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      white-space: nowrap;
    }

    .field-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 8px;
    }

    .field-input {
      width: 100%;
      padding: 14px 18px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      color: var(--navy);
      background: var(--input-bg);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    .field-input:focus {
      border-color: var(--navy);
      box-shadow: 0 0 0 3px rgba(28,43,58,.07);
      background: var(--white);
    }

    .btn-entrar {
      width: 100%;
      padding: 15px;
      background: var(--navy);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      transition: background .2s, transform .2s;
      margin-top: 8px;
    }
    .btn-entrar:hover {
      background: var(--accent);
      transform: translateY(-2px);
    }

    .erro-box {
      background: rgba(214,78,42,.08);
      border: 1px solid rgba(214,78,42,.25);
      color: var(--accent);
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 14px;
      text-align: center;
      margin-bottom: 16px;
    }

    .footer-link {
      text-align: center;
      color: var(--muted);
      font-size: 14px;
      margin-top: 24px;
    }
    .footer-link a {
      color: var(--navy);
      font-weight: 700;
      text-decoration: none;
    }
    .footer-link a:hover { color: var(--accent); }

    .divider {
      height: 1px;
      background: var(--border);
      margin: 28px 0;
    }
  `],
  template: `
    <div class="login-card">

      <a routerLink="/home" class="back-link">← Voltar para a home</a>

      <div class="brand">Learn<span>On</span></div>
      <p class="subtitle">Aprenda o que precisa, quando precisa.</p>

      <a href="http://localhost:3000/api/auth/google" class="btn-google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Entrar com Google
      </a>

      <div class="separator"><span>ou entre com e-mail</span></div>

      <div>
        <label class="field-label">E-mail</label>
        <input
          [(ngModel)]="email"
          type="email"
          class="field-input"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label class="field-label">Senha</label>
        <input
          [(ngModel)]="senha"
          type="password"
          class="field-input"
          placeholder="••••••••"
        />
      </div>

      @if (erro) {
        <div class="erro-box">{{ erro }}</div>
      }

      <button class="btn-entrar" (click)="entrar()">Entrar</button>

      <div class="divider"></div>

      <p class="footer-link">
        Nao tem conta? <a routerLink="/cadastro">Cadastre-se</a>
      </p>

    </div>
  `
})
export class Login {
  email = '';
  senha = '';
  erro  = '';

  constructor(private auth: AuthService, private router: Router) {}

  entrar() {
    this.erro = '';
    this.auth.loginAluno({ email: this.email, password: this.senha }).subscribe({
      next: (res: any) => {
        this.auth.salvarToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.erro = 'E-mail ou senha incorretos.'
    });
  }
}