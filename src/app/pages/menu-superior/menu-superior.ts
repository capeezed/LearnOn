import { Component, OnInit } from '@angular/core';
import { GerenciamentoCarrinho } from '../../services/gerenciamentoCarrinho';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-superior',
  standalone: false,
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css'
})
export class MenuSuperior implements OnInit {
  itemCount$!: Observable<number>;
  termoPesquisa: string = ''; 
  constructor(
    private GerenciamentoCarrinho: GerenciamentoCarrinho,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.itemCount$ = this.GerenciamentoCarrinho.carrinhoItems$.pipe(
      map(items => items.length)
    );
  }

  pesquisarCurso(): void {
    if (!this.termoPesquisa || !this.termoPesquisa.trim()) {
      return;
    }
    this.router.navigate(['/cursos'], { queryParams: { busca: this.termoPesquisa } });
  }

  goToCart(): void {
    this.router.navigate(['/carrinho']);
  }

  goToDashboard(): void {
    if (this.authService.isLoggedIn()) {
      const userType = this.authService.getUserType();
      if (userType === 'professor') {
        this.router.navigate(['/dashboard-professor']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
