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
      --bg: #f6f7fb;
      --bg2: #eef1f8;

      --white: #ffffff;
      --strong-surface: #ffffff;

      --navy: #111827;
      --muted: #6b7280;
      --strong: #4937a6;

      --accent: #ff6a1a;
      --accent2: #ff8f4d;

      --teal: #7c83ff;
      --gold: #ffc94d;

      --border: #dbe2f0;

      display: flex;
      flex-direction: column;

      min-height: 100vh;
      width: 100%;

      background:
        radial-gradient(circle at top left, rgba(124,131,255,.10), transparent 30%),
        radial-gradient(circle at bottom right, rgba(255,106,26,.08), transparent 30%),
        var(--bg);
    }

    :host-context(body.dark-mode) {
      --bg: #050816;
      --bg2: #0f1222;

      --white: #12172a;
      --strong-surface: #171d33;

      --navy: #f3f4f6;
      --muted: #9ca3af;

      --accent: #ff6a1a;
      --accent2: #ff8f4d;

      --teal: #7c83ff;
      --gold: #ffc94d;

      --border: #2a3147;

      background:
        radial-gradient(circle at top left, rgba(124,131,255,.16), transparent 32%),
        radial-gradient(circle at bottom right, rgba(255,106,26,.12), transparent 28%),
        var(--bg);
    }
    .curso-card,
    .empty-state,
    .summary-item,
    .skeleton-card { background: var(--strong-surface); border: 1px solid var(--border); color: var(--navy);}

    :host-context(body.dark-mode) .curso-card,
    :host-context(body.dark-mode) .summary-item,
    :host-context(body.dark-mode) .empty-state,
    :host-context(body.dark-mode) .skeleton-card { backdrop-filter: blur(10px); }

    .page-wrap {
      flex: 1;
      width: 100%;

      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
      box-sizing: border-box;
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
      border: 1px solid var(--border);
      background: var(--strong-surface);
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
      background: var(--strong-surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      display: flex; flex-direction: column;
      transition: transform .25s, box-shadow .25s, border-color .25s;
      text-decoration: none;
      cursor: pointer;
    }
    .curso-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 70px rgba(15,23,42,.16);
      border-color: rgba(255,107,44,.25);
    }

    .card-banner { height: 10px; background: var(--border); }
    .card-banner.done        { background: var(--teal); }
    .card-banner.in-progress { background: linear-gradient(90deg, var(--teal), var(--accent)); }
    .card-banner.new         { background: var(--gold); }

    .card-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }

    .card-tag {
      display: inline-block;
      padding: 4px 12px; border-radius: 50px;
      font-size: 11px; font-weight: 700;
      letter-spacing: .5px; text-transform: uppercase;
      margin-bottom: 14px;
    }
    .tag-live     { background: rgba(255,106,26,.12);  color: var(--accent); }
    .tag-recorded { background: rgba(124,131,255,.12); color: var(--teal); }

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
    .progress-pct {
      font-size: 13px;
      font-weight: 800;
      color: var(--navy);
    }
    .progress-bar { height: 8px; background: var(--bg2); border-radius: 8px; overflow: hidden; }
    .progress-fill {
      height: 100%; border-radius: 8px;
      background: linear-gradient(90deg, #ff6b2c 0%, #ff874d 45%, #ffb088 100%);
      transition: width .6s ease;
    }
    .progress-fill.done { background: linear-gradient(90deg, #7c3aed 0%, #8b5cf6 45%, #a78bfa 100%); }

    .card-footer-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto; padding-top: 16px;
      border-top: 1px solid var(--border);
    }
    .card-date { font-size: 12px; color: var(--muted); }

    .btn-continuar {
      display: inline-flex; align-items: center; gap: 6px;
      background: linear-gradient(135deg, var(--teal), #9aa0ff);
      box-shadow: 0 10px 24px rgba(124,131,255,.24);
      padding: 9px 18px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      text-decoration: none;
      transition: background .2s, transform .2s, filter .2s;
      font-family: 'DM Sans', sans-serif;
      color: white;
    } 
    .btn-continuar:hover {
      transform: translateY(-2px);
      filter: brightness(1.05);
    }

    .btn-continuar.done {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      box-shadow: 0 10px 24px rgba(255,106,26,.24);
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 80px 24px;
      background: var(--strong-surface);
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
      background: linear-gradient(135deg, var(--strong), #4937a6);
      box-shadow: 0 10px 24px rgba(124,131,255,.24);
      padding: 13px 28px; border-radius: 50px;
      font-size: 15px; font-weight: 700; text-decoration: none;
      transition: background .2s, transform .2s, filter .2s;
      color: white;
    }
    .btn-filled:hover { 
      background: var(--accent);
      transform: translateY(-2px);
      filter: brightness(1.05);
     }

    .skeleton {
      background: linear-gradient(90deg, var(--bg2) 25%, rgba(124,131,255,.14) 50%, var(--bg2) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 8px;
    }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .skeleton-card {
      background: var(--strong-surface); border: 1px solid var(--border);
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