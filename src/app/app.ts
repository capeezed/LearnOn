import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { AuthService } from './services/auth';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    @if(auth.estaLogado()) {
      <app-navbar />
    }
    <router-outlet />
  `,
})
export class App {
  constructor(
    public auth: AuthService,
    public theme: ThemeService,
  ) {}
}
