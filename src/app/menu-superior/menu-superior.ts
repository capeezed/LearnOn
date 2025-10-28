import { Component, OnInit } from '@angular/core';
import { GerenciamentoCarrinho } from '../services/gerenciamento-carrinho'; // Importe o serviço
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; // Para navegação

@Component({
  selector: 'app-menu-superior',
  standalone: false,
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css'
})
export class MenuSuperior implements OnInit{
  // Observable que rastreia a contagem de itens
  itemCount$!: Observable<number>;

  constructor(
    private GerenciamentoCarrinho : GerenciamentoCarrinho, // 1. Injeta o CartService
    private router: Router
  ) { }

  ngOnInit(): void {
    // 2. Transforma o Observable da lista de itens em um Observable da contagem
    this.itemCount$ = this.GerenciamentoCarrinho.carrinhoItems$.pipe(
      map(items => items.length) // Mapeia o array para o número de elementos
    );
  }

  // 3. Função para navegar para a página do carrinho
  goToCart(): void {
    this.router.navigate(['/carrinho']);
  }
}
