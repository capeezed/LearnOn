import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-meus-cursos',
  standalone: true,
  imports: [RouterLink, DatePipe],
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

    .page-wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    .page-label {
      display: inline-block;
      font-size: 12px; font-weight: 700;
      letter-spacing: 3px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 10px;
    }
    .page-title {
      font-family: 'Nunito', sans-serif;
      font-size: 32px; font-weight: 900;
      color: var(--navy); margin-bottom: 8px;
    }
    .page-sub { font-size: 15px; color: var(--muted); margin-bottom: 40px; }

    .summary-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      margin-bottom: 40px;
    }
    .summary-item {
      background: var(--white);
      padding: 24px 28px;
      text-align: center;
    }
    .summary-item:first-child { border-radius: 16px 0 0 16px; }
    .summary-item:last-child  { border-radius: 0 16px 16px 0; }
    .summary-num {
      font-family: 'Nunito', sans-serif;
      font-size: 36px; font-weight: 900; color: var(--navy); line-height: 1;
    }
    .summary-num em { color: var(--accent); font-style: normal; }
    .summary-desc { font-size: 13px; color: var(--muted); margin-top: 4px; }

    .cursos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .curso-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      display: flex; flex-direction: column;
      transition: transform .25s, box-shadow .25s;
      text-decoration: none;
    }
    .curso-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 60px rgba(28,43,58,.1);
    }

    .card-banner { height: 10px; background: var(--border); }
    .card-banner.done        { background: var(--teal); }
    .card-banner.in-progress { background: linear-gradient(90deg, var(--navy), var(--accent)); }
    .card-banner.new         { background: var(--gold); }

    .card-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }

    .card-tag {
      display: inline-block;
      padding: 4px 12px; border-radius: 50px;
      font-size: 11px; font-weight: 700;
      letter-spacing: .5px; text-transform: uppercase;
      margin-bottom: 14px;
    }
    .tag-live     { background: rgba(42,122,110,.1);  color: var(--teal); }
    .tag-recorded { background: rgba(28,43,58,.08);   color: var(--navy); }

    .card-title {
      font-family: 'Nunito', sans-serif;
      font-size: 18px; font-weight: 800;
      color: var(--navy); margin-bottom: 8px; line-height: 1.3;
    }
    .card-topic { font-size: 13px; color: var(--muted); margin-bottom: 20px; }

    .progress-wrap { margin-bottom: 20px; }
    .progress-top {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 8px;
    }
    .progress-label { font-size: 12px; font-weight: 600; color: var(--muted); }
    .progress-pct   { font-size: 13px; font-weight: 800; color: var(--navy); }
    .progress-bar { height: 8px; background: var(--bg2); border-radius: 8px; overflow: hidden; }
    .progress-fill {
      height: 100%; border-radius: 8px;
      background: linear-gradient(90deg, var(--navy), var(--accent));
      transition: width .6s ease;
    }
    .progress-fill.done { background: var(--teal); }

    .card-footer-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto; padding-top: 16px;
      border-top: 1px solid var(--bg2);
    }
    .card-date { font-size: 12px; color: var(--muted); }

    .btn-continuar {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--navy); color: white;
      padding: 9px 18px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      text-decoration: none; transition: background .2s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-continuar:hover { background: var(--accent); }
    .btn-continuar.done  { background: var(--teal); }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 80px 24px;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 24px;
    }
    .empty-icon  { font-size: 56px; margin-bottom: 16px; }
    .empty-title {
      font-family: 'Nunito', sans-serif;
      font-size: 22px; font-weight: 900; color: var(--navy); margin-bottom: 8px;
    }
    .empty-sub { font-size: 15px; color: var(--muted); margin-bottom: 28px; }
    .btn-filled {
      display: inline-block;
      background: var(--navy); color: white;
      padding: 13px 28px; border-radius: 50px;
      font-size: 15px; font-weight: 700; text-decoration: none;
      transition: background .2s;
    }
    .btn-filled:hover { background: var(--accent); }

    .skeleton {
      background: linear-gradient(90deg, var(--bg2) 25%, var(--border) 50%, var(--bg2) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 8px;
    }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .skeleton-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 24px; padding: 28px; height: 220px;
    }

    @media(max-width: 768px) {
      .summary-bar { grid-template-columns: 1fr; gap: 2px; }
      .summary-item:first-child { border-radius: 16px 16px 0 0; }
      .summary-item:last-child  { border-radius: 0 0 16px 16px; }
    }
  `],
  template: `
    <div class="page-wrap">

      <div class="page-label">✦ Aprendizado</div>
      <h1 class="page-title">Meus Cursos</h1>
      <p class="page-sub">Acompanhe seu progresso e continue de onde parou.</p>

      @if (!carregando && cursos.length > 0) {
        <div class="summary-bar">
          <div class="summary-item">
            <div class="summary-num">{{ cursos.length }}</div>
            <div class="summary-desc">Cursos no total</div>
          </div>
          <div class="summary-item">
            <div class="summary-num">{{ cursosEmAndamento() }}</div>
            <div class="summary-desc">Em andamento</div>
          </div>
          <div class="summary-item">
            <div class="summary-num"><em>{{ totalProgresso() }}%</em></div>
            <div class="summary-desc">Progresso médio</div>
          </div>
        </div>
      }

      <div class="cursos-grid">

        @if (carregando) {
          @for (i of [1,2,3]; track i) {
            <div class="skeleton-card">
              <div class="skeleton" style="height:14px;width:60%;margin-bottom:12px;"></div>
              <div class="skeleton" style="height:22px;width:85%;margin-bottom:8px;"></div>
              <div class="skeleton" style="height:14px;width:40%;margin-bottom:24px;"></div>
              <div class="skeleton" style="height:8px;width:100%;"></div>
            </div>
          }
        } @else if (cursos.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <div class="empty-title">Nenhum curso ainda</div>
            <p class="empty-sub">Faça seu primeiro pedido e comece a aprender do seu jeito.</p>
            <a routerLink="/pedir-curso" class="btn-filled">+ Pedir meu primeiro curso</a>
          </div>
        } @else {
          @for (curso of cursos; track curso.id) {
            <a [routerLink]="['/curso', curso.id]" class="curso-card">
              <div class="card-banner" [class]="bannerClass(curso)"></div>
              <div class="card-body">
                <span class="card-tag" [class]="tagClass(curso.format)">
                  {{ formatLabel(curso.format) }}
                </span>
                <div class="card-title">{{ curso.title }}</div>
                <div class="card-topic">{{ curso.topic_tag }}</div>

                <div class="progress-wrap">
                  <div class="progress-top">
                    <span class="progress-label">Progresso</span>
                    <span class="progress-pct">{{ curso.progress || 0 }}%</span>
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      [class.done]="(curso.progress || 0) >= 100"
                      [style.width]="(curso.progress || 0) + '%'"
                    ></div>
                  </div>
                </div>

                <div class="card-footer-row">
                  <span class="card-date">{{ curso.enrolled_at | date:'dd/MM/yyyy' }}</span>
                  <span class="btn-continuar" [class.done]="(curso.progress || 0) >= 100">
                    {{ (curso.progress || 0) >= 100 ? '✓ Concluído' : 'Continuar →' }}
                  </span>
                </div>
              </div>
            </a>
          }
        }

      </div>
    </div>
  `
})
export class MeusCursos implements OnInit {
  cursos: any[] = [];
  carregando = true;

  constructor(
    private cursoService: CursoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cursoService.meusCursos().subscribe({
      next: (res: any) => {
        this.cursos     = Array.isArray(res) ? res : [];
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cursosEmAndamento() {
    return this.cursos.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length;
  }

  totalProgresso() {
    if (this.cursos.length === 0) return 0;
    const soma = this.cursos.reduce((acc, c) => acc + (c.progress || 0), 0);
    return Math.round(soma / this.cursos.length);
  }

  bannerClass(curso: any) {
    const p = curso.progress || 0;
    if (p >= 100) return 'done';
    if (p > 0)    return 'in-progress';
    return 'new';
  }

  formatLabel(format: string) {
    return format === 'live' ? '🔴 Ao vivo' : '⏺ Gravado';
  }

  tagClass(format: string) {
    return format === 'live' ? 'tag-live' : 'tag-recorded';
  }
}