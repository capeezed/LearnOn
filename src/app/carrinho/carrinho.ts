import { Component, OnInit } from '@angular/core';

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
export class Carrinho implements OnInit {
  cartItems: itemsCarrinho[] = [
    { id: 1, nome: 'Introdução ao Docker e Containers', especialista: 'Dani Namie', nota: 5, preco: 9.90, imagemURL:'/assets/docker.jpg', categoria: 'Programação' },
    { id: 2, nome: 'Como fazer CupCake', especialista: 'Juju Moraes', nota: 3, preco: 5.50, imagemURL:'/assets/cupcake.jpg', categoria: 'Culinária' },
    { id: 3, nome: 'Decoração temática de Jujutsu Kaisen', especialista: 'Mel Kato', nota: 2, preco: 10, imagemURL:'/assets/decoração jujutsu.jpg', categoria: 'Decoração' },
  ];
  
  subtotal: number = 0;

  ngOnInit(): void {
    this.calculateSubtotal();
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.preco, 0);
  }

  // Métodos que seriam implementados:
  removeItem(itemId: number): void { /* Lógica para remover item */ }
  proceedToCheckout(): void { /* Lógica para navegar para o checkout */ }
  
  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
