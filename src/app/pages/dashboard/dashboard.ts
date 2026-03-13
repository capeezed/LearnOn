import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
      --bg:     #f0ebe3;
      --bg2:    #e8e1d8;
      --white:  #ffffff;
      --navy:   #1c2b3a;
      --accent: #d64e2a;
      --teal:   #2a7a6e;
      --gold:   #c8963e;
      --muted:  #7a7060;
      --border: #d8d0c5;
      display: block;
      min-height: 100vh;
      background: var(--bg);
      font-family: 'DM Sans', sans-serif;
    }

    .dash-body {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    .hero-banner {
      background: var(--navy);
      border-radius: 24px;
      padding: 44px 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }
    .hero-banner::before {
      content: '';
      position: absolute;
      width: 350px; height: 350px; border-radius: 50%;
      background: radial-gradient(circle, rgba(214,78,42,.2), transparent 70%);
      top: -150px; right: -80px; pointer-events: none;
    }
    .hero-banner h2 {
      font-family: 'Nunito', sans-serif;
      font-size: 26px; font-weight: 900; color: white; margin-bottom: 8px;
    }
    .hero-banner p { font-size: 15px; color: rgba(255,255,255,.55); margin-bottom: 24px; }
    .btn-pedido {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--accent); color: white;
      padding: 13px 28px; border-radius: 50px;
      font-size: 15px; font-weight: 700;
      text-decoration: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: background .2s, transform .2s;
    }
    .btn-pedido:hover { background: #c04020; transform: translateY(-2px); }
    .hero-emoji { font-size: 72px; line-height: 1; flex-shrink: 0; }

    .quick-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .quick-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px 24px;
      text-decoration: none;
      display: flex; flex-direction: column;
      transition: transform .2s, box-shadow .2s, border-color .2s;
    }
    .quick-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(28,43,58,.08);
      border-color: var(--navy);
    }
    .quick-icon {
      font-size: 32px; margin-bottom: 14px;
      width: 56px; height: 56px; border-radius: 14px;
      background: var(--bg); display: flex; align-items: center; justify-content: center;
    }
    .quick-card h4 {
      font-family: 'Nunito', sans-serif;
      font-size: 17px; font-weight: 800; color: var(--navy); margin-bottom: 4px;
    }
    .quick-card p { font-size: 13px; color: var(--muted); margin: 0; }
    .quick-arrow {
      margin-top: 20px; font-size: 18px; color: var(--border);
      transition: color .2s, transform .2s;
    }
    .quick-card:hover .quick-arrow { color: var(--accent); transform: translateX(4px); }

    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 20px;
    }
    .section-title {
      font-family: 'Nunito', sans-serif;
      font-size: 20px; font-weight: 900; color: var(--navy);
    }
    .btn-novo {
      display: inline-flex; align-items: center; gap: 6px;
      background: transparent; color: var(--navy);
      padding: 9px 20px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      text-decoration: none; border: 2px solid var(--border);
      transition: border-color .2s, background .2s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-novo:hover { border-color: var(--navy); background: var(--white); }

    .pedidos-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
    }

    .empty-state {
      padding: 60px 24px;
      text-align: center;
    }
    .empty-state p { color: var(--muted); font-size: 15px; margin-bottom: 20px; }
    .btn-filled {
      display: inline-block;
      background: var(--navy); color: white;
      padding: 13px 28px; border-radius: 50px;
      font-size: 14px; font-weight: 700; text-decoration: none;
      transition: background .2s;
    }
    .btn-filled:hover { background: var(--accent); }

    .pedido-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 28px;
      border-bottom: 1px solid var(--bg2);
      transition: background .15s;
    }
    .pedido-row:last-child { border-bottom: none; }
    .pedido-row:hover { background: var(--bg); }
    .pedido-title { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 2px; }
    .pedido-tag   { font-size: 12px; color: var(--muted); }

    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 14px; border-radius: 50px;
      font-size: 12px; font-weight: 700; white-space: nowrap;
    }
    .badge-pending     { background: rgba(200,150,62,.12); color: var(--gold); }
    .badge-matched     { background: rgba(42,122,110,.12); color: var(--teal); }
    .badge-production  { background: rgba(28,43,58,.1);    color: var(--navy); }
    .badge-delivered   { background: rgba(42,122,110,.15); color: var(--teal); }
    .badge-expired     { background: rgba(122,112,96,.1);  color: var(--muted); }

    @media(max-width: 768px) {
      .dash-body { padding: 28px 16px; }
      .hero-banner { padding: 32px 28px; }
      .hero-emoji { display: none; }
      .quick-grid { grid-template-columns: 1fr 1fr; }
    }
    @media(max-width: 480px) {
      .quick-grid { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div class="dash-body">

      <div class="hero-banner">
        <div>
          <h2>Olá! Bem-vindo ao LearnOn 👋</h2>
          <p>O que você quer aprender hoje?</p>
          <a routerLink="/pedir-curso" class="btn-pedido">+ Fazer pedido de curso</a>
        </div>
        <div class="hero-emoji">🎓</div>
      </div>

      <div class="quick-grid">
        <a routerLink="/meus-cursos" class="quick-card">
          <div class="quick-icon">📚</div>
          <h4>Meus Cursos</h4>
          <p>Continue de onde parou</p>
          <div class="quick-arrow">→</div>
        </a>
        <a routerLink="/agenda" class="quick-card">
          <div class="quick-icon">🗓️</div>
          <h4>Agenda</h4>
          <p>Suas aulas ao vivo</p>
          <div class="quick-arrow">→</div>
        </a>
        <a routerLink="/meus-cursos" class="quick-card">
          <div class="quick-icon">🔍</div>
          <h4>Catálogo</h4>
          <p>Explore cursos disponíveis</p>
          <div class="quick-arrow">→</div>
        </a>
      </div>

      <div class="section-header">
        <div class="section-title">Pedidos Recentes</div>
        <a routerLink="/pedir-curso" class="btn-novo">+ Novo pedido</a>
      </div>

      <div class="pedidos-card">
        @if (pedidos.length === 0) {
          <div class="empty-state">
            <p>Você ainda não fez nenhum pedido.</p>
            <a routerLink="/pedir-curso" class="btn-filled">Fazer meu primeiro pedido</a>
          </div>
        } @else {
          @for (pedido of pedidos; track pedido.id) {
            <div class="pedido-row">
              <div>
                <div class="pedido-title">{{ pedido.title }}</div>
                <div class="pedido-tag">{{ pedido.topic_tag }}</div>
              </div>
              <span class="badge" [class]="badgeClass(pedido.status)">
                {{ statusLabel(pedido.status) }}
              </span>
            </div>
          }
        }
      </div>

    </div>
  `
})
export class Dashboard implements OnInit {
  pedidos: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pedidoService.meusPedidos().subscribe({
      next: (res: any) => {
        this.pedidos = Array.isArray(res) ? res.slice(0, 5) : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('erro:', err)
    });
  }

  statusLabel(status: string) {
    const map: any = {
      pending:       'Na fila',
      matched:       'Instrutor encontrado',
      in_production: 'Em produção',
      delivered:     'Entregue',
      expired:       'Expirado',
    };
    return map[status] || status;
  }

  badgeClass(status: string) {
    const map: any = {
      pending:       'badge-pending',
      matched:       'badge-matched',
      in_production: 'badge-production',
      delivered:     'badge-delivered',
      expired:       'badge-expired',
    };
    return map[status] || 'badge-expired';
  }
}