import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cadastro',
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
      display: flex;
      min-height: 100vh;
      align-items: center;
      justify-content: center;
      background: var(--bg);
      font-family: 'DM Sans', sans-serif;
      padding: 24px;
    }

    .cadastro-card {
      background: var(--white);
      border-radius: 28px;
      padding: 52px 48px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 24px 80px rgba(28,43,58,.1);
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
      margin-bottom: 40px;
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
      background: var(--bg);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      margin-bottom: 20px;
    }
    .field-input:focus {
      border-color: var(--navy);
      box-shadow: 0 0 0 3px rgba(28,43,58,.07);
      background: var(--white);
    }

    .btn-cadastrar {
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
    .btn-cadastrar:hover {
      background: var(--accent);
      transform: translateY(-2px);
    }
    .btn-cadastrar:disabled {
      opacity: .6;
      cursor: not-allowed;
      transform: none;
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

    .sucesso-box {
      background: rgba(42,122,110,.08);
      border: 1px solid rgba(42,122,110,.25);
      color: var(--teal);
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 14px;
      text-align: center;
      margin-bottom: 16px;
      font-weight: 600;
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
    }
    .footer-link a:hover { color: var(--accent); }
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

  constructor(private auth: AuthService, private router: Router) {}

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