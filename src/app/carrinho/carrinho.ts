import { Component, OnInit, OnDestroy } from '@angular/core';
import { GerenciamentoCarrinho } from '../services/gerenciamentoCarrinho'; 
import { Subscription } from 'rxjs';

interface itemsCarrinho {
  id: number;
  nome: string;
  especialista: string;
  nota: number;
  preco: number;
  duracao?: number;
  imagemURL: string;
  categoria: string;
}

@Component({
  selector: 'app-carrinho',
  standalone: false,
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho implements OnInit, OnDestroy {

  carrinhoItems: any[] = []; //array a ser preenchido com os itens do carrinho
  subtotal: number = 0;

  private cartSubscription!: Subscription; //gerenciar a inscrição

  constructor(private gerenciamentoCarrinho: GerenciamentoCarrinho) { }
  
  ngOnInit(): void {
    // atualizações do carrinho
    this.cartSubscription = this.gerenciamentoCarrinho.carrinhoItems$.subscribe(items => {
      this.carrinhoItems = items;
      this.calcularSubtotal();
      console.log("Carrinho atualizado. Itens:", this.carrinhoItems); // Verificação
    });
  }

  ngOnDestroy(): void {
    // cancelar inscrição para evitar vazamentos de memória
    this.cartSubscription.unsubscribe();
  }

  calcularSubtotal(): void {
    this.subtotal = this.carrinhoItems.reduce((sum, item) => sum + item.preco, 0);
  }

  removerDoCarrinho(itemId: number): void {
    this.gerenciamentoCarrinho.removerDoCarrinho(itemId);
  }

  // Métodos que seriam implementados:
  removeItem(itemId: number): void {
    console.log("Chamando remoção para ID:", itemId); // Verificação
    this.gerenciamentoCarrinho.removeItem(itemId);
  }
  proceedToCheckout(): void { /* Lógica para navegar para o checkout */ }

  formatarPreco(price: number): string {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
