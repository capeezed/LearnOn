import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme';

@Component({

  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  host: {'[class.dark-mode]': 'theme.isDarkMode()',}, 
  styles: [`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

  :host {
    --bg: #f6efe5;
    --bg2: #efe5d8;
    --white: #fffaf4;

    --navy: #4937a6;
    --muted: #7c7297;

    --strong-surface: #4b36a8;

    --accent: #f97316;
    --accent2: #ff944d;

    --teal: #6b5cff;
    --gold: #f4b400;

    --border: #e8d9cb;

    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at top right,
        rgba(249,115,22,.10),
        transparent 30%
      ),
      var(--bg);

    font-family: 'DM Sans', sans-serif;
    padding: 24px;

    transition:
      background .25s ease,
      color .25s ease;
  }

  :host.dark-mode {
    --bg: #050816;
    --bg2: #0f1222;
    --white: #12172a;

    --navy: #f3f4f6;
    --muted: #9ca3af;

    --strong-surface: #171d33;

    --accent: #ff6a1a;
    --accent2: #ff8f4d;

    --teal: #7c83ff;
    --gold: #ffc94d;

    --border: #2a3147;

    background:
      radial-gradient(circle at top right,
        rgba(124,131,255,.10),
        transparent 35%
      ),
      var(--bg);
  }

  .cadastro-card {
    background:
      radial-gradient(circle at top right,
        rgba(249,115,22,.06),
        transparent 30%
      ),
      var(--white);

    border-radius: 28px;
    padding: 52px 48px;
    width: 100%;
    max-width: 440px;

    border: 1px solid var(--border);

    box-shadow:
      0 24px 80px rgba(73,55,166,.10),
      0 2px 8px rgba(0,0,0,.04);

    transition:
      background .25s ease,
      border-color .25s ease,
      transform .25s ease,
      box-shadow .25s ease;
  }

  :host.dark-mode .cadastro-card {
    background:
      radial-gradient(circle at top right,
        rgba(124,131,255,.08),
        transparent 35%
      ),
      var(--white);
  }

  .cadastro-card:hover {
    transform: translateY(-4px);

    box-shadow:
      0 28px 90px rgba(73,55,166,.14);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    color: var(--muted);
    text-decoration: none;

    font-size: 13px;
    font-weight: 600;

    margin-bottom: 32px;

    transition: color .2s;
  }

  .back-link:hover {
    color: var(--navy);
  }

  .brand {
    font-family: 'Nunito', sans-serif;
    font-size: 32px;
    font-weight: 900;
    color: var(--navy);
    text-align: center;
    margin-bottom: 6px;
    letter-spacing: -1px;
  }

  .brand span {
    color: var(--accent);
  }

  .subtitle {
    text-align: center;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .field-label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    padding: 15px 18px;

    border: 1.5px solid var(--border);
    border-radius: 14px;

    font-size: 15px;
    font-family: 'DM Sans', sans-serif;

    color: var(--navy);
    background: var(--bg);

    outline: none;

    transition:
      border-color .2s,
      box-shadow .2s,
      background .2s;

    margin-bottom: 20px;

    box-sizing: border-box;
  }

  .field-input::placeholder {
    color: var(--muted);
    opacity: .7;
  }

  .field-input:focus {
    border-color: var(--teal);

    box-shadow:
      0 0 0 4px rgba(107,92,255,.12);

    background: var(--white);
  }

  .btn-cadastrar {
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
      background .2s,
      box-shadow .2s;

    margin-top: 8px;

    box-shadow:
      0 10px 30px rgba(73,55,166,.18);
  }

  .btn-cadastrar:hover {
    background: var(--accent);
    transform: translateY(-2px);
  }

  .btn-cadastrar:disabled {
    opacity: .65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .erro-box {
    background: rgba(249,115,22,.10);
    border: 1px solid rgba(249,115,22,.25);
    color: var(--accent);

    border-radius: 12px;

    padding: 12px 16px;

    font-size: 14px;
    text-align: center;

    margin-bottom: 16px;
  }

  .sucesso-box {
    background: rgba(107,92,255,.10);
    border: 1px solid rgba(107,92,255,.25);
    color: var(--teal);

    border-radius: 12px;

    padding: 12px 16px;

    font-size: 14px;
    font-weight: 700;

    text-align: center;

    margin-bottom: 16px;
  }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 28px 0;
  }

  .footer-link {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
  }

  .footer-link a {
    color: var(--navy);
    font-weight: 700;
    text-decoration: none;

    transition: color .2s;
  }

  .footer-link a:hover {
    color: var(--accent);
  }

  @media (max-width: 520px) {
    .cadastro-card {
      padding: 40px 24px;
      border-radius: 24px;
    }

    .brand {
      font-size: 28px;
    }
  }
`],
  template: `
    <div class="cadastro-card">

      <a routerLink="/home" class="back-link">← Voltar para a home</a>

      <div class="brand">Learn<span>On</span></div>
      <p class="subtitle">Comece a aprender do seu jeito.</p>

      <div>
        <label class="field-label">Nome completo</label>
        <input
          [(ngModel)]="nome"
          type="text"
          class="field-input"
          placeholder="Seu nome"
        />
      </div>

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
      @if (sucesso) {
        <div class="sucesso-box">✅ Conta criada! Redirecionando...</div>
      }

      <button class="btn-cadastrar" [disabled]="sucesso" (click)="cadastrar()">
        Criar conta
      </button>

      <div class="divider"></div>

      <p class="footer-link">
        Já tem conta? <a routerLink="/login">Entrar</a>
      </p>

    </div>
  `
})
export class Cadastro {
  nome    = '';
  email   = '';
  senha   = '';
  erro    = '';
  sucesso = false;

  constructor(private auth: AuthService, private router: Router, public theme: ThemeService) {}

  cadastrar() {
    this.erro = '';
    this.auth.cadastrarAluno({ name: this.nome, email: this.email, password: this.senha }).subscribe({
      next: (res: any) => {
        this.sucesso = true;
        this.auth.salvarToken(res.token);
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: (err: any) => {
        this.erro = err.error?.error || 'Erro ao criar conta.';
      }
    });
  }
}