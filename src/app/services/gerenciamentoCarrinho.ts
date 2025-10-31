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
  // BehaviorSubject armazena o estado atual e emite o novo estado para observadores
  private cartItemsSubject = new BehaviorSubject<itemsCarrinho[]>([]);
  
  // Exposto como um Observable para que os componentes possam se inscrever
  public carrinhoItems$: Observable<itemsCarrinho[]> = this.cartItemsSubject.asObservable();

  // Getter para obter o valor atual instantaneamente (se necessário)
  get currentCartItems(): itemsCarrinho[] {
    return this.cartItemsSubject.value;
  }

  constructor() { }

  /**
   * Adiciona um curso ao carrinho.
   * @param item O objeto do curso a ser adicionado.
   */
  addCarrinho(item: itemsCarrinho): void {
    const currentItems = this.currentCartItems;
    
    // Verifica se o item já está no carrinho (aqui, assumimos que um curso é único)
    const existingItem = currentItems.find(i => i.id === item.id);

    if (!existingItem) {
      // Cria uma nova lista e adiciona o item
      const updatedItems = [...currentItems, item];
      
      // Emite a nova lista, notificando todos os observadores
      this.cartItemsSubject.next(updatedItems);
      
      console.log(`Curso "${item.nome}" adicionado ao carrinho.`);
    } else {
      console.log(`Curso "${item.nome}" já está no carrinho.`);
      // Opcional: Você pode emitir uma notificação para o usuário.
    }
  }

  /**
   * Remove um item do carrinho.
   * @param itemId O ID do curso a ser removido.
   */
    removerDoCarrinho(itemId: number): void {
    const currentItems = this.currentCartItems;
    
    // Filtra para criar uma nova lista sem o item removido
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    // Emite a nova lista
    this.cartItemsSubject.next(updatedItems);
    
    console.log(`Item com ID ${itemId} removido do carrinho.`);
  }

  /**
   * Limpa todo o carrinho.
   */
  removeItem(itemId: number): void {
    const currentItems = this.currentCartItems;
    
    // **A remoção correta**: Filtra para criar uma nova lista sem o item com o ID correspondente
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    // **A emissão correta**: Emite a nova lista, o que notifica o ShoppingCartComponent
    this.cartItemsSubject.next(updatedItems);
    
    console.log(`Item com ID ${itemId} removido. Novo total: ${updatedItems.length}`);
  }

}