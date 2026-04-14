import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    nav {
      --bg: #f0ebe3;
      --white: #ffffff;
      --navy: #1c2b3a;
      --accent: #d64e2a;
      --muted: #7a7060;
      --border: #d8d0c5;
      position: sticky; top: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 48px;
      background: rgba(240,235,227,.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      font-family: 'DM Sans', sans-serif;
    }

    nav.dark-mode {
      --bg: #0b1220;
      --white: #0f172a;
      --navy: #e5e7eb;
      --accent: #ff6a3d;
      --muted: #9ca3af;
      --border: #1f2937;
      background: rgba(11,18,32,.92);
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

    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      color: var(--navy);
      border: 1.5px solid var(--border);
      padding: 0;
      border-radius: 999px;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: border-color .2s, color .2s, background .2s;
    }
    .theme-toggle:hover {
      border-color: var(--navy);
      background: var(--bg);
    }
    .theme-toggle svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .theme-toggle .moon-icon {
      fill: currentColor;
      stroke: none;
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
    <nav [class.dark-mode]="theme.isDarkMode()">
      <a class="brand" routerLink="/dashboard">Learn<span>On</span></a>

      <div class="nav-links">
        <a class="nav-link" routerLink="/dashboard"    routerLinkActive="active">Início</a>
        <a class="nav-link" routerLink="/meus-cursos"  routerLinkActive="active">Meus Cursos</a>
        <a class="nav-link" routerLink="/agenda"       routerLinkActive="active">Agenda</a>
        <a class="btn-pedir" routerLink="/pedir-curso">+ Pedir Curso</a>
        <button
          type="button"
          class="theme-toggle"
          (click)="theme.toggleTheme()"
          [attr.aria-label]="theme.isDarkMode() ? 'Ativar modo claro' : 'Ativar modo escuro'"
          [attr.aria-pressed]="theme.isDarkMode()"
        >
          @if (theme.isDarkMode()) {
            <svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
            </svg>
          }
        </button>
        <button class="btn-sair" (click)="sair()">Sair</button>
      </div>
    </nav>
  `
})
export class Navbar {
  constructor(
    public auth: AuthService,
    public theme: ThemeService,
  ) {}

  sair() { this.auth.logout(); }
}
