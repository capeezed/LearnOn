import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedido';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container">

      <!-- Boas vindas -->
      <div class="p-4 mb-4 rounded-4 text-white" style="background: linear-gradient(135deg, #0f3460, #16213e);">
        <h3 class="fw-bold mb-1">Olá! Bem-vindo ao LearnOn 👋</h3>
        <p class="mb-3 opacity-75">O que você quer aprender hoje?</p>
        <a routerLink="/pedir-curso" class="btn btn-danger fw-bold px-4">+ Fazer pedido de curso</a>
      </div>

      <!-- Cards de ação rápida -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 text-center p-4" style="border-radius:12px;">
            <div style="font-size:36px;">📚</div>
            <h5 class="fw-bold mt-2">Meus Cursos</h5>
            <p class="text-muted small">Continue de onde parou</p>
            <a routerLink="/meus-cursos" class="btn btn-outline-primary btn-sm mt-auto">Ver cursos</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 text-center p-4" style="border-radius:12px;">
            <div style="font-size:36px;">🗓️</div>
            <h5 class="fw-bold mt-2">Agenda</h5>
            <p class="text-muted small">Suas aulas ao vivo</p>
            <a routerLink="/agenda" class="btn btn-outline-primary btn-sm mt-auto">Ver agenda</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 text-center p-4" style="border-radius:12px;">
            <div style="font-size:36px;">🔍</div>
            <h5 class="fw-bold mt-2">Catálogo</h5>
            <p class="text-muted small">Cursos disponíveis</p>
            <a routerLink="/meus-cursos" class="btn btn-outline-primary btn-sm mt-auto">Explorar</a>
          </div>
        </div>
      </div>

      <!-- Pedidos recentes -->
      <div class="card border-0 shadow-sm p-4" style="border-radius:12px;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Meus Pedidos Recentes</h5>
          <a routerLink="/pedir-curso" class="btn btn-sm btn-outline-danger">+ Novo pedido</a>
        </div>

        @if(pedidos.length === 0) {
          <div class="text-center text-muted py-4">
            <p>Você ainda não fez nenhum pedido.</p>
            <a routerLink="/pedir-curso" class="btn btn-primary">Fazer meu primeiro pedido</a>
          </div>
        }

        @for(pedido of pedidos; track pedido.id) {
          <div class="d-flex justify-content-between align-items-center border-bottom py-3">
            <div>
              <p class="mb-0 fw-500">{{ pedido.title }}</p>
              <small class="text-muted">{{ pedido.topic_tag }}</small>
            </div>
            <span class="badge rounded-pill" [class]="badgeClass(pedido.status)">
              {{ statusLabel(pedido.status) }}
            </span>
          </div>
        }
      </div>
    </div>
  `
})
export class Dashboard implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.meusPedidos().subscribe({
      next: (res: any) => this.pedidos = res.slice(0, 5),
      error: () => {}
    });
  }

  statusLabel(status: string) {
    const map: any = {
      pending:     'Na fila',
      matched:     'Instrutor encontrado',
      in_production: 'Em produção',
      delivered:   'Entregue',
      expired:     'Expirado',
    };
    return map[status] || status;
  }

  badgeClass(status: string) {
    const map: any = {
      pending:       'bg-warning text-dark',
      matched:       'bg-info text-dark',
      in_production: 'bg-primary',
      delivered:     'bg-success',
      expired:       'bg-secondary',
    };
    return map[status] || 'bg-secondary';
  }
}