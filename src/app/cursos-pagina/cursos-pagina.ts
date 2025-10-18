import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos-pagina',
  standalone: false,
  templateUrl: './cursos-pagina.html',
  styleUrl: './cursos-pagina.css'
})
export class CursosPagina implements OnInit {
  //Array de dados simulados (pode ser substituído por dados reais (API))
  cursos = [
    { id: 1, nome: 'Introdução ao Docker e Containers', especialista: 'Dani Namie', nota: 5, preco: 9.90, imagemURL:'', categoria: 'Programação' },
    { id: 2, nome: 'Como fazer CupCake', especialista: 'Juju Moraes', nota: 3, preco: 5.50, imagemURL:'', categoria: 'Culinária' },
    { id: 3, nome: 'Decoração temática de Jujutsu Kaisen', especialista: 'Mel Kato', nota: 2, preco: 10, imagemURL:'', categoria: 'Decoração' },
    { id: 4, nome: 'Como desenhar uma lua', especialista: 'Gabriel Capelini', nota: 4, preco: 9.90, imagemURL:'', categoria: 'Artes' },
    { id: 5, nome: 'Aprenda a fazer yoga', especialista: 'Lua', nota: 4, preco: 15.50, imagemURL:'', categoria: 'Saúde' },
  ]

  categoriasDisponiveis = [ 'Programação', 'Culinária', 'Decoração', 'Artes', 'Saúde' ];

  ngOnInit(): void {
    // Aqui você chamaria o serviço para buscar os cursos:
    // this.courseService.getAllCourses().subscribe(data => this.courses = data);
  }
}
