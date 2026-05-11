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

      position: fixed;
      top: 0;
      left: 0;
      right: 0;

      z-index: 100;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 18px 60px;

      background: rgba(255,248,241,.92);

      backdrop-filter: blur(12px);

      border-bottom: 1px solid var(--border);

      font-family: 'DM Sans', sans-serif;
    }

    :host-context(body.dark-mode) nav {
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

      background: rgba(11,18,32,.92);
    }

    .brand {
      font-family: 'Nunito', sans-serif;
      font-size: 20px; font-weight: 900;
      color: var(--navy); text-decoration: none;
    }
    .brand span { color: var(--accent); }

    .nav-links {
      display: flex; 
      align-items: center; 
      gap: 8px;
    }

    .nav-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px; font-weight: 500;
      padding: 8px 14px;
      border-radius: 50px;
      transition: color .2s, background .2s;
    }

    .nav-link:hover { color: var(--navy); }
    .nav-link.active { color: var(--navy); font-weight: 600; }

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

    .btn-pedir {
      display: inline-flex; align-items: center; gap: 6px;
      background:var(--strong-surface); color: white !important;
      padding: 9px 20px; border-radius: 50px;
      font-size: 14px; font-weight: 700;
      text-decoration: none;
      transition: background .2s, transform .2s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-pedir:hover {  background:var(--accent) !important; transform: translateY(-1px); }

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
