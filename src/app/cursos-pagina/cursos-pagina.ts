import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos-pagina',
  standalone: false,
  templateUrl: './cursos-pagina.html',
  styleUrl: './cursos-pagina.css'
})
export class CursosPagina implements OnInit {
  //Array de dados simulados (pode ser substituído por dados reais (API))
  readonly todosCursos = [
    { id: 1, nome: 'Introdução ao Docker e Containers', especialista: 'Dani Namie', nota: 5, preco: 9.90, imagemURL:'/assets/docker.jpg', categoria: 'Programação' },
    { id: 2, nome: 'Como fazer CupCake', especialista: 'Juju Moraes', nota: 3, preco: 5.50, imagemURL:'/assets/cupcake.jpg', categoria: 'Culinária' },
    { id: 3, nome: 'Decoração temática de Jujutsu Kaisen', especialista: 'Mel Kato', nota: 2, preco: 10, imagemURL:'/assets/decoração jujutsu.jpg', categoria: 'Decoração' },
    { id: 4, nome: 'Como desenhar uma lua', especialista: 'Gabriel Capelini', nota: 4, preco: 9.90, imagemURL:'/assets/lua desenho.jpg', categoria: 'Artes' },
    { id: 5, nome: 'Aprenda a fazer yoga', especialista: 'Lua', nota: 4, preco: 15.50, imagemURL:'/assets/yoga.jpg', categoria: 'Saúde' },
  ]

  // Array que será exibido no *ngFor
  cursosExibidos: any[] = [];
  minNota: number = 0; // Avaliação mínima selecionada (default: 0)

  categoriasDisponiveis = [ 'Programação', 'Culinária', 'Decoração', 'Artes', 'Saúde' ];
  categoriasEscolhidas: { [key: string]: boolean } = {}; // Guarda o estado dos checkboxes
  

  ngOnInit(): void {
    // Inicializa o array de cursos com todos os dados
    this.cursosExibidos = [ 
      ...this.todosCursos
     ];

    // Inicializa o estado dos checkboxes para todas as categorias como false
    this.categoriasDisponiveis.forEach(cat => {
      this.categoriasEscolhidas[cat] = false;
    });
  }

  mudarFiltro() {
    let filteredList = [...this.todosCursos]; // Começa com a lista completa
    
    // 1. Filtragem por Categoria (Checkboxes)
    const activeCategories = this.categoriasDisponiveis.filter(
      cat => this.categoriasEscolhidas[cat]
    );

    if (activeCategories.length > 0) {
      filteredList = filteredList.filter(curso => 
        activeCategories.includes(curso.categoria)
      );
    }

    // 2. Filtragem por Avaliação Mínima (Dropdown)
    if (this.minNota > 0) {
    filteredList = filteredList.filter(curso => curso.nota >= this.minNota);
    }
    
    // Atualiza a lista exibida no *ngFor
    this.cursosExibidos = filteredList;

  }
  
}
