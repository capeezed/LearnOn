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
      --muted: #7c7297;
      --teal: #6b5cff;

      --accent: #f97316;
      --accent2: #ff8f4d;

      --border: #e8d9cb;

      --input-bg: #f3eadf;

      display: flex;
      min-height: 100vh;
      align-items: center;
      justify-content: center;

      background:
        radial-gradient(
          circle at top right,
          rgba(249,115,22,.08),
          transparent 25%
        ),
        var(--bg);

      font-family: 'DM Sans', sans-serif;

      padding: 24px;
    }

    :host-context([data-theme='dark']) {
      --bg: #050816;
      --white: #12172a;

      --navy: #f3f4f6;
      --muted: #9ca3af;
      --teal: #7c83ff;

      --accent: #ff6a1a;
      --accent2: #ff944d;

      --border: #2a3147;

      --input-bg: #0f172a;
    }

    :host-context([data-theme='dark']) .login-card {
      box-shadow:
        0 20px 60px rgba(2,6,23,.45);
    }

    :host-context([data-theme='dark']) .btn-google img {
      filter: brightness(.95);
    }

    .login-card {
      background: var(--white);
      border-radius: 32px;
      padding: 52px 48px;
      width: 100%;
      max-width: 440px;

      border: 1px solid var(--border);

      box-shadow:
        0 20px 60px rgba(73,55,166,.10),
        0 4px 20px rgba(0,0,0,.05);

      backdrop-filter: blur(14px);
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
      border-color: var(--accent);

      box-shadow:
        0 10px 24px rgba(73,55,166,.08);
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
      border-color: var(--accent);

      box-shadow:
        0 0 0 4px rgba(249,115,22,.12);

      background: var(--white);
    }

    .btn-entrar {
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

      font-size: 16px;
      font-weight: 700;

      font-family: 'DM Sans', sans-serif;

      cursor: pointer;

      transition:
        transform .2s,
        box-shadow .2s,
        opacity .2s;

      margin-top: 8px;
    }

    .btn-entrar:hover {
      transform: translateY(-2px);

      box-shadow:
        0 12px 28px rgba(91,69,199,.35);

      opacity: .96;
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

    .cadastro-link {
      margin-top: 18px;
      padding: 18px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: center;
      background: rgba(124,131,255,.03);
      border-radius: 18px;
    }

    .cadastro-link span {
      font-size: 13px;
      color: var(--muted);
    }

    .cadastro-link a {
      color: var(--teal);
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: color .2s;
    }

    .cadastro-link a:hover {
      color: var(--accent);
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
        Não tem conta? <a routerLink="/cadastro">Cadastre-se</a>
      </p>

      <div class="cadastro-link">
        <span>Quer ensinar na plataforma?</span>

        <a routerLink="/instrutor/login">
          Fazer login como instrutor
        </a>

        <a routerLink="/instrutor/cadastro">
          Criar conta de instrutor
        </a>
      </div>


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