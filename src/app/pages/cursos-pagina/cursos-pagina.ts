import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Curso {
  id: number;
  nome: string;
  especialista: string;
  nota: number;
  preco: number;
  imagemURL: string;
  categoria: string;
}

@Component({
  selector: 'app-cursos-pagina',
  standalone: false,
  templateUrl: './cursos-pagina.html',
  styleUrl: './cursos-pagina.css'
})
export class CursosPagina implements OnInit {
  readonly todosCursos: Curso[] = [
    { id: 1, nome: 'Introdução ao Docker e Containers', especialista: 'Dani Namie', nota: 5, preco: 9.90, imagemURL:'assets/docker.jpg', categoria: 'Programação' },
    { id: 2, nome: 'Como fazer CupCake', especialista: 'Juju Moraes', nota: 3, preco: 5.50, imagemURL:'assets/cupcake.jpg', categoria: 'Culinária' },
    { id: 3, nome: 'Decoração temática de Jujutsu Kaisen', especialista: 'Mel Kato', nota: 2, preco: 10, imagemURL:'assets/decoração jujutsu.jpg', categoria: 'Decoração' },
    { id: 4, nome: 'Como desenhar uma lua', especialista: 'Gabriel Capelini', nota: 4, preco: 9.90, imagemURL:'assets/lua desenho.jpg', categoria: 'Artes' },
    { id: 5, nome: 'Aprenda a fazer yoga', especialista: 'Lua', nota: 4, preco: 15.50, imagemURL:'assets/yoga.jpg', categoria: 'Saúde' },
  ];

  cursosExibidos: Curso[] = [];
  minNota: number = 0;
  categoriasDisponiveis = [ 'Programação', 'Culinária', 'Decoração', 'Artes', 'Saúde' ];
  categoriasEscolhidas: { [key: string]: boolean } = {};
  termoPesquisa: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.termoPesquisa = (params['busca'] || '').trim().toLowerCase();
      this.filtrarCursos();
    });

    this.categoriasDisponiveis.forEach(cat => {
      this.categoriasEscolhidas[cat] = false;
    });
  }

  mudarFiltro() {
    this.filtrarCursos();
  }

  filtrarCursos() {
    let filteredList: Curso[] = [...this.todosCursos];

    if (this.termoPesquisa) {
      filteredList = filteredList.filter(curso =>
        curso.nome.toLowerCase().includes(this.termoPesquisa)
      );
    }

    const activeCategories = this.categoriasDisponiveis.filter(
      cat => this.categoriasEscolhidas[cat]
    );
    if (activeCategories.length > 0) {
      filteredList = filteredList.filter(curso =>
        activeCategories.includes(curso.categoria)
      );
    }

    if (this.minNota > 0) {
      filteredList = filteredList.filter(curso => curso.nota >= this.minNota);
    }

    this.cursosExibidos = filteredList;
  }
}
