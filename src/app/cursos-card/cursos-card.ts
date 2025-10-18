import { Component, Input } from '@angular/core';

interface Curso{
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
  selector: 'app-cursos-card',
  standalone: false,
  templateUrl: './cursos-card.html',
  styleUrl: './cursos-card.css'
})
export class CursosCard {
  @Input() curso!: Curso;

    // Função para criar um array de estrelas para o *ngFor
  getNota(): number[] {
  return Array(this.curso.nota).fill(0);
  }

    //função para formatar o preço em real
  formatarPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

    //ação de click
  detalhesCurso(){
  //implementar a navegação para a página de detalhes do curso
  console.log(`Ver detalhes do curso: ${this.curso.nome}`);
  }
}
