import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-instrutor-cadastro',
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
      padding: 24px;
    }

    .wrap {
      width: 100%; max-width: 480px;
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

    .badge {
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
    input, textarea {
      width: 100%; padding: 13px 16px;
      border: 1.5px solid var(--border); border-radius: 12px;
      font-size: 15px; font-family: 'DM Sans', sans-serif;
      background: var(--bg); color: var(--navy);
      outline: none; transition: border-color .2s, background .2s;
      box-sizing: border-box;
    }
    input:focus, textarea:focus {
      border-color: var(--teal); background: var(--white);
    }
    textarea { resize: vertical; min-height: 90px; }

    .fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .hint { font-size: 12px; color: var(--muted); margin-top: 6px; }

    .btn-cadastrar {
      width: 100%; padding: 15px;
      background: var(--teal); color: white;
      border: none; border-radius: 50px;
      font-size: 15px; font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer; margin-top: 8px;
      transition: background .2s, transform .2s;
    }
    .btn-cadastrar:hover:not(:disabled) { background: #1f5e54; transform: translateY(-2px); }
    .btn-cadastrar:disabled { opacity: .6; cursor: not-allowed; }

    .sucesso {
      background: rgba(42,122,110,.1); border: 1px solid rgba(42,122,110,.25);
      color: var(--teal); border-radius: 12px;
      padding: 14px 16px; font-size: 14px; font-weight: 600;
      margin-top: 16px; text-align: center;
    }

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
    .divider a { color: var(--navy); font-weight: 700; text-decoration: none; }
    .divider a:hover { color: var(--teal); }

    @media(max-width: 480px) {
      .card { padding: 32px 24px; }
      .fields-row { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div class="wrap">
      <a routerLink="/instrutor/login" class="back-link">← Voltar para o login</a>

      <div class="card">
        <div class="badge">👨‍🏫 Área do Instrutor</div>
        <h1>Criar conta</h1>
        <p class="subtitle">Cadastre-se para começar a compartilhar seu conhecimento.</p>

        <div class="field">
          <label>Nome completo</label>
          <input type="text" [(ngModel)]="nome" placeholder="Seu nome" />
        </div>

        <div class="field">
          <label>E-mail</label>
          <input type="email" [(ngModel)]="email" placeholder="seu@email.com" />
        </div>

        <div class="fields-row">
          <div class="field">
            <label>Senha</label>
            <input type="password" [(ngModel)]="senha" placeholder="Mínimo 6 caracteres" />
          </div>
          <div class="field">
            <label>Confirmar senha</label>
            <input type="password" [(ngModel)]="confirmarSenha" placeholder="Repita a senha" />
          </div>
        </div>

        <div class="field">
          <label>Áreas de expertise</label>
          <input type="text" [(ngModel)]="expertise"
                 placeholder="Ex: JavaScript, React, Node.js" />
          <p class="hint">Separe por vírgula. Isso define quais pedidos chegam para você.</p>
        </div>

        <div class="field">
          <label>Bio (opcional)</label>
          <textarea [(ngModel)]="bio" placeholder="Conte um pouco sobre você e sua experiência..."></textarea>
        </div>

        <button class="btn-cadastrar" (click)="cadastrar()" [disabled]="carregando || sucesso">
          {{ carregando ? 'Criando conta...' : sucesso ? '✓ Conta criada!' : 'Criar minha conta' }}
        </button>

        @if (sucesso) {
          <div class="sucesso">
            ✅ Conta criada com sucesso! Redirecionando para o painel...
          </div>
        }
        @if (erro) {
          <div class="erro">{{ erro }}</div>
        }

        <div class="divider">
          Já tem conta? <a routerLink="/instrutor/login">Entrar</a>
        </div>
      </div>
    </div>
  `
})
export class InstrutorCadastro {
  nome           = '';
  email          = '';
  senha          = '';
  confirmarSenha = '';
  expertise      = '';
  bio            = '';
  carregando     = false;
  sucesso        = false;
  erro           = '';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    this.erro = '';

    if (!this.nome || !this.email || !this.senha) {
      this.erro = 'Preencha nome, e-mail e senha.'; return;
    }
    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres.'; return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.'; return;
    }

    this.carregando = true;
    this.http.post<any>(`${environment.apiUrl}/auth/instructors/register`, {
      name:      this.nome,
      email:     this.email,
      password:  this.senha,
      expertise: this.expertise,
      bio:       this.bio
    }).subscribe({
      next: (res) => {
        localStorage.setItem('instrutor_token', res.token);
        localStorage.setItem('instrutor_nome', res.name || this.nome);
        this.carregando = false;
        this.sucesso = true;
        setTimeout(() => this.router.navigate(['/instrutor/painel']), 1500);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.error || 'Erro ao criar conta. Tente novamente.';
      }
    });
  }
}