import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
      --bg:     #f0ebe3;
      --white:  #ffffff;
      --navy:   #1c2b3a;
      --accent: #d64e2a;
      --muted:  #7a7060;
      --border: #d8d0c5;
    }

    nav {
      position: sticky; top: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 48px;
      background: rgba(240,235,227,.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      font-family: 'DM Sans', sans-serif;
    }

    .brand {
      font-family: 'Nunito', sans-serif;
      font-size: 20px; font-weight: 900;
      color: var(--navy); text-decoration: none;
    }
    .brand span { color: var(--accent); }

    .nav-links {
      display: flex; align-items: center; gap: 8px;
    }

    .nav-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px; font-weight: 500;
      padding: 8px 14px;
      border-radius: 50px;
      transition: color .2s, background .2s;
    }
    .nav-link:hover { color: var(--navy); background: var(--bg); }
    .nav-link.active { color: var(--navy); font-weight: 600; }

    .btn-pedir {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--accent); color: white;
      padding: 9px 20px; border-radius: 50px;
      font-size: 14px; font-weight: 700;
      text-decoration: none;
      transition: background .2s, transform .2s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-pedir:hover { background: #c04020; transform: translateY(-1px); }

    .btn-sair {
      background: transparent; color: var(--muted);
      border: 1.5px solid var(--border);
      padding: 8px 18px; border-radius: 50px;
      font-size: 14px; font-weight: 600;
      cursor: pointer; font-family: 'DM Sans', sans-serif;
      transition: border-color .2s, color .2s;
    }
    .btn-sair:hover { border-color: var(--navy); color: var(--navy); }

    @media(max-width: 768px) {
      nav { padding: 14px 20px; }
      .nav-link { display: none; }
    }
  `],
  template: `
    <nav>
      <a class="brand" routerLink="/dashboard">Learn<span>On</span></a>

      <div class="nav-links">
        <a class="nav-link" routerLink="/dashboard"    routerLinkActive="active">Início</a>
        <a class="nav-link" routerLink="/meus-cursos"  routerLinkActive="active">Meus Cursos</a>
        <a class="nav-link" routerLink="/agenda"       routerLinkActive="active">Agenda</a>
        <a class="btn-pedir" routerLink="/pedir-curso">+ Pedir Curso</a>
        <button class="btn-sair" (click)="sair()">Sair</button>
      </div>
    </nav>
  `
})
export class Navbar {
  constructor(public auth: AuthService) {}
  sair() { this.auth.logout(); }
}