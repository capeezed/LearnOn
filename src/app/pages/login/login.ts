import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background:#1a1a2e;">
      <div class="card shadow-lg border-0 p-5" style="width:100%;max-width:420px;border-radius:16px;">

        <div class="text-center mb-4">
          <h1 class="fw-bold" style="color:#0f3460;">🎓 LearnOn</h1>
          <p class="text-muted">Aprenda o que precisa, quando precisa.</p>
        </div>

        <div class="mb-3">
          <label class="form-label fw-500">E-mail</label>
          <input [(ngModel)]="email" type="email" class="form-control form-control-lg" placeholder="seu@email.com" />
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input [(ngModel)]="senha" type="password" class="form-control form-control-lg" placeholder="••••••••" />
        </div>

        @if(erro) {
          <div class="alert alert-danger py-2 text-center">{{ erro }}</div>
        }

        <button class="btn btn-lg w-100 text-white fw-bold mt-2" style="background:#0f3460;" (click)="entrar()">
          Entrar
        </button>

        <p class="text-center text-muted mt-3 mb-0">
          Não tem conta? <a routerLink="/cadastro" style="color:#0f3460;" class="fw-bold">Cadastre-se</a>
        </p>
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