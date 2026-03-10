import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background:#1a1a2e;">
      <div class="card shadow-lg border-0 p-5" style="width:100%;max-width:420px;border-radius:16px;">

        <div class="text-center mb-4">
          <h2 class="fw-bold" style="color:#0f3460;">Criar conta</h2>
          <p class="text-muted">Comece a aprender do seu jeito.</p>
        </div>

        <div class="mb-3">
          <label class="form-label">Nome completo</label>
          <input [(ngModel)]="nome" type="text" class="form-control form-control-lg" placeholder="Seu nome" />
        </div>

        <div class="mb-3">
          <label class="form-label">E-mail</label>
          <input [(ngModel)]="email" type="email" class="form-control form-control-lg" placeholder="seu@email.com" />
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input [(ngModel)]="senha" type="password" class="form-control form-control-lg" placeholder="••••••••" />
        </div>

        @if(erro) {
          <div class="alert alert-danger py-2 text-center">{{ erro }}</div>
        }
        @if(sucesso) {
          <div class="alert alert-success py-2 text-center">✅ Conta criada! Redirecionando...</div>
        }

        <button class="btn btn-lg w-100 text-white fw-bold mt-2" style="background:#0f3460;" (click)="cadastrar()">
          Criar conta
        </button>

        <p class="text-center text-muted mt-3 mb-0">
          Já tem conta? <a routerLink="/login" style="color:#0f3460;" class="fw-bold">Entrar</a>
        </p>
      </div>
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