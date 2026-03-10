import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background:#0f3460;">
      <div class="container">
        <a class="navbar-brand fw-bold fs-4" routerLink="/dashboard">🎓 LearnOn</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav ms-auto align-items-center gap-2">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Início</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/meus-cursos" routerLinkActive="active">Meus Cursos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/agenda" routerLinkActive="active">Agenda</a>
            </li>
            <li class="nav-item">
              <a routerLink="/pedir-curso" class="btn btn-danger btn-sm px-3">+ Pedir Curso</a>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light btn-sm" (click)="sair()">Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class Navbar {
  constructor(public auth: AuthService) {}
  sair() { this.auth.logout(); }
}