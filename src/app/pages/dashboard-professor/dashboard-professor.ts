import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido';

interface Aula {
  titulo: string;
  data: string;
  hora: string;
  aluno: string;
}

@Component({
  selector: 'app-dashboard-professor',
  standalone: false,
  templateUrl: './dashboard-professor.html',
  styleUrls: ['./dashboard-professor.css']
})
export class DashboardProfessor implements OnInit {

  userName: string | null = null;
  aulasHoje = 0;
  alunosAtivos = 0;
  cursosCriados = 0;
  proximasAulas: Aula[] = [];

  pedidosPendentes: any[] = [];

  constructor(private authService: AuthService, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    console.log('DashboardProfessor ngOnInit disparado');
    this.userName = this.authService.getUserName();

    this.aulasHoje = 2;
    this.alunosAtivos = 12;
    this.cursosCriados = 3;
    this.proximasAulas = [
      { titulo: 'Matemática Avançada', data: '11/11', hora: '10:00', aluno: 'Lucas M.' },
      { titulo: 'Introdução à Física', data: '11/11', hora: '15:30', aluno: 'Ana R.' },
    ];

    console.log('Antes do subscribe pedidos');
this.pedidoService.getPedidosPendentes().subscribe({
  next: pedidos => {
    console.log('DEBUG pedidos:', pedidos);
    this.pedidosPendentes = pedidos;
  },
  error: err => {
    console.log('ERRO pedidos:', err);
    this.pedidosPendentes = [];
  }
});
}

  abrirCriarCurso() {
    alert('Abrindo criação de novo curso...');
  }

  verAlunos() {
    alert('Navegando para lista de alunos...');
  }

  verAgenda() {
    alert('Abrindo sua agenda...');
  }

  logout() {
    this.authService.logout();
  }
}
