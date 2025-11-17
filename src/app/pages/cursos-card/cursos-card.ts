import { Component, Input } from '@angular/core';
import { GerenciamentoCarrinho } from '../../services/gerenciamentoCarrinho';

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

  constructor(private gerenciamentoCarrinho: GerenciamentoCarrinho) { }

  getNota(): number[] {
  return Array(this.curso.nota).fill(0);
  }

  formatarPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  detalhesCurso(){
  console.log(`Ver detalhes do curso: ${this.curso.nome}`);
  }

  addCarrinho(): void {
    if (this.curso) {
      this.gerenciamentoCarrinho.addCarrinho(this.curso);
    }
  }

  verDetalhesCursos() {
    console.log(`Ver detalhes do curso: ${this.curso.nome}`);
  }

}
