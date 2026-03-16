import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  styles: [`
    :host {
      display: flex; min-height: 100vh;
      align-items: center; justify-content: center;
      background: #f0ebe3;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; color: #7a7060;
    }
  `],
  template: `<div>Autenticando...</div>`
})
export class AuthCallback implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const name  = params['name'];
      const erro  = params['erro'];

      if (erro) {
        this.router.navigate(['/login'], { queryParams: { erro: 'Falha no login com Google.' } });
        return;
      }

      if (token) {
        this.auth.salvarToken(token);
        if (name) localStorage.setItem('student_nome', name);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}