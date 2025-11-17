import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})

export class GerenciamentoCarrinho {

  private cartItemsSubject = new BehaviorSubject<itemsCarrinho[]>([]);

  public carrinhoItems$: Observable<itemsCarrinho[]> = this.cartItemsSubject.asObservable();

  get currentCartItems(): itemsCarrinho[] {
    return this.cartItemsSubject.value;
  }

  constructor() { }
  addCarrinho(item: itemsCarrinho): void {
    const currentItems = this.currentCartItems;
    
    const existingItem = currentItems.find(i => i.id === item.id);

    if (!existingItem) {
      const updatedItems = [...currentItems, item];
      
      this.cartItemsSubject.next(updatedItems);
      
      console.log(`Curso "${item.nome}" adicionado ao carrinho.`);
    } else {
      console.log(`Curso "${item.nome}" já está no carrinho.`);
    }
  }

    removerDoCarrinho(itemId: number): void {
    const currentItems = this.currentCartItems;
    
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    this.cartItemsSubject.next(updatedItems);
    
    console.log(`Item com ID ${itemId} removido do carrinho.`);
  }

  removeItem(itemId: number): void {
    const currentItems = this.currentCartItems;
    
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    this.cartItemsSubject.next(updatedItems);
    
    console.log(`Item com ID ${itemId} removido. Novo total: ${updatedItems.length}`);
  }

}
