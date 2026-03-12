import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-agenda',
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

    .page-wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    /* HEADER */
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

    /* LAYOUT */
    .agenda-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 28px;
      align-items: start;
    }
    @media(max-width: 900px) {
      .agenda-layout { grid-template-columns: 1fr; }
    }

    /* MINI CALENDÁRIO */
    .calendar-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 28px;
      position: sticky;
      top: 80px;
    }

    .cal-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 20px;
    }
    .cal-month {
      font-family: 'Nunito', sans-serif;
      font-size: 16px; font-weight: 800; color: var(--navy);
    }
    .cal-nav {
      background: var(--bg); border: none; cursor: pointer;
      width: 30px; height: 30px; border-radius: 8px;
      font-size: 14px; color: var(--muted);
      transition: background .2s, color .2s;
      display: flex; align-items: center; justify-content: center;
    }
    .cal-nav:hover { background: var(--navy); color: white; }

    .cal-weekdays {
      display: grid; grid-template-columns: repeat(7, 1fr);
      margin-bottom: 6px;
    }
    .cal-wd {
      text-align: center; font-size: 11px;
      font-weight: 700; color: var(--muted);
      padding: 4px 0;
    }

    .cal-days {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
    }
    .cal-day {
      aspect-ratio: 1;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 500; color: var(--muted);
      border-radius: 8px; cursor: pointer;
      transition: background .15s, color .15s;
      position: relative;
    }
    .cal-day:hover { background: var(--bg2); color: var(--navy); }
    .cal-day.today {
      background: var(--navy); color: white; font-weight: 700;
    }
    .cal-day.has-event::after {
      content: '';
      position: absolute; bottom: 3px;
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--accent);
    }
    .cal-day.today.has-event::after { background: var(--accent2); }
    .cal-day.other-month { opacity: .3; }
    .cal-day.empty { cursor: default; }

    .cal-legend {
      margin-top: 20px; padding-top: 16px;
      border-top: 1px solid var(--bg2);
      display: flex; align-items: center; gap: 8px;
      font-size: 12px; color: var(--muted);
    }
    .legend-dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
    }

    /* AULAS */
    .aulas-col {}

    .section-title {
      font-family: 'Nunito', sans-serif;
      font-size: 18px; font-weight: 800; color: var(--navy);
      margin-bottom: 16px;
    }

    .aula-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px 28px;
      margin-bottom: 16px;
      display: flex; gap: 20px; align-items: flex-start;
      transition: transform .2s, box-shadow .2s, border-color .2s;
      text-decoration: none;
    }
    .aula-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(28,43,58,.08);
      border-color: var(--navy);
    }

    .aula-date-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px 16px;
      text-align: center;
      flex-shrink: 0;
      min-width: 64px;
    }
    .aula-date-box.today { background: var(--navy); border-color: var(--navy); }
    .aula-day  {
      font-family: 'Nunito', sans-serif;
      font-size: 28px; font-weight: 900; color: var(--navy); line-height: 1;
    }
    .aula-date-box.today .aula-day  { color: white; }
    .aula-mon  { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--muted); }
    .aula-date-box.today .aula-mon  { color: rgba(255,255,255,.6); }

    .aula-info { flex: 1; }
    .aula-tag {
      display: inline-block;
      padding: 3px 12px; border-radius: 50px;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px;
      margin-bottom: 8px;
      background: rgba(42,122,110,.1); color: var(--teal);
    }
    .aula-title {
      font-family: 'Nunito', sans-serif;
      font-size: 17px; font-weight: 800; color: var(--navy);
      margin-bottom: 6px; line-height: 1.3;
    }
    .aula-meta {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    }
    .aula-meta span {
      display: flex; align-items: center; gap: 5px;
      font-size: 13px; color: var(--muted);
    }

    .aula-action {
      flex-shrink: 0; align-self: center;
    }
    .btn-entrar {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--teal); color: white;
      padding: 10px 20px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      text-decoration: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: background .2s, transform .2s;
      white-space: nowrap;
    }
    .btn-entrar:hover { background: #1f5e54; transform: translateY(-1px); }
    .btn-aguardar {
      display: inline-block;
      padding: 10px 20px; border-radius: 50px;
      font-size: 13px; font-weight: 600; color: var(--muted);
      background: var(--bg); border: 1.5px solid var(--border);
      white-space: nowrap;
    }

    /* SEPARADOR DE DATA */
    .date-separator {
      display: flex; align-items: center; gap: 12px;
      margin: 28px 0 16px;
    }
    .date-separator span {
      font-size: 12px; font-weight: 700;
      color: var(--muted); text-transform: uppercase; letter-spacing: 1px;
      white-space: nowrap;
    }
    .date-separator::before, .date-separator::after {
      content: ''; flex: 1; height: 1px; background: var(--border);
    }

    /* EMPTY */
    .empty-state {
      text-align: center; padding: 64px 24px;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 24px;
    }
    .empty-icon  { font-size: 52px; margin-bottom: 16px; }
    .empty-title {
      font-family: 'Nunito', sans-serif;
      font-size: 20px; font-weight: 900; color: var(--navy); margin-bottom: 8px;
    }
    .empty-sub { font-size: 14px; color: var(--muted); }

    /* SKELETON */
    .skeleton {
      background: linear-gradient(90deg, var(--bg2) 25%, var(--border) 50%, var(--bg2) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 8px;
    }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .skeleton-aula {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 24px 28px;
      display: flex; gap: 20px; margin-bottom: 16px;
    }
  `],
  template: `
    <div class="page-wrap">

      <div class="page-label">✦ Agenda</div>
      <h1 class="page-title">Suas Aulas ao Vivo</h1>
      <p class="page-sub">Acompanhe suas sessões agendadas com os instrutores.</p>

      <div class="agenda-layout">

        <!-- MINI CALENDÁRIO -->
        <div class="calendar-card">
          <div class="cal-header">
            <button class="cal-nav" (click)="mesAnterior()">‹</button>
            <div class="cal-month">{{ nomeMes() }} {{ anoAtual }}</div>
            <button class="cal-nav" (click)="proximoMes()">›</button>
          </div>
          <div class="cal-weekdays">
            @for (d of diasSemana; track d) {
              <div class="cal-wd">{{ d }}</div>
            }
          </div>
          <div class="cal-days">
            @for (dia of diasCalendario; track $index) {
              <div class="cal-day"
                [class.today]="dia.isToday"
                [class.has-event]="dia.hasEvent"
                [class.other-month]="dia.otherMonth"
                [class.empty]="!dia.num">
                {{ dia.num || '' }}
              </div>
            }
          </div>
          <div class="cal-legend">
            <div class="legend-dot"></div>
            <span>Aula agendada</span>
          </div>
        </div>

        <!-- AULAS -->
        <div class="aulas-col">

          @if (carregando) {
            @for (i of [1,2,3]; track i) {
              <div class="skeleton-aula">
                <div class="skeleton" style="width:64px;height:80px;border-radius:14px;flex-shrink:0;"></div>
                <div style="flex:1">
                  <div class="skeleton" style="height:12px;width:40%;margin-bottom:10px;"></div>
                  <div class="skeleton" style="height:18px;width:75%;margin-bottom:8px;"></div>
                  <div class="skeleton" style="height:12px;width:50%;"></div>
                </div>
              </div>
            }
          }

          @if (!carregando && aulas.length === 0) {
            <div class="empty-state">
              <div class="empty-icon"></div>
              <div class="empty-title">Nenhuma aula agendada</div>
              <p class="empty-sub">Quando um instrutor confirmar uma sessão ao vivo, ela aparecerá aqui.</p>
            </div>
          }

          @if (!carregando && proximas.length > 0) {
            <div class="date-separator"><span>Próximas</span></div>
            @for (aula of proximas; track aula.id) {
              <div class="aula-card">
                <div class="aula-date-box" [class.today]="isHoje(aula.scheduled_at)">
                  <div class="aula-day">{{ getDia(aula.scheduled_at) }}</div>
                  <div class="aula-mon">{{ getMes(aula.scheduled_at) }}</div>
                </div>
                <div class="aula-info">
                  <span class="aula-tag">🔴 Ao vivo</span>
                  <div class="aula-title">{{ aula.course_title }}</div>
                  <div class="aula-meta">
                    <span>🕐 {{ getHora(aula.scheduled_at) }}</span>
                    <span>⏱ {{ aula.duration_minutes || 60 }} min</span>
                    <span>👤 {{ aula.instructor_name }}</span>
                  </div>
                </div>
                <div class="aula-action">
                  @if (isHoje(aula.scheduled_at)) {
                    <a [href]="aula.meeting_url || '#'" class="btn-entrar">Entrar na aula →</a>
                  } @else {
                    <span class="btn-aguardar">Em {{ diasAte(aula.scheduled_at) }} dia(s)</span>
                  }
                </div>
              </div>
            }
          }

          @if (!carregando && passadas.length > 0) {
            <div class="date-separator"><span>Realizadas</span></div>
            @for (aula of passadas; track aula.id) {
              <div class="aula-card" style="opacity:.6">
                <div class="aula-date-box">
                  <div class="aula-day">{{ getDia(aula.scheduled_at) }}</div>
                  <div class="aula-mon">{{ getMes(aula.scheduled_at) }}</div>
                </div>
                <div class="aula-info">
                  <span class="aula-tag" style="background:rgba(122,112,96,.1);color:var(--muted)">✓ Realizada</span>
                  <div class="aula-title">{{ aula.course_title }}</div>
                  <div class="aula-meta">
                    <span>🕐 {{ getHora(aula.scheduled_at) }}</span>
                    <span>👤 {{ aula.instructor_name }}</span>
                  </div>
                </div>
                <div class="aula-action">
                  <a [routerLink]="['/curso', aula.course_id]" class="btn-entrar" style="background:var(--navy)">
                    Ver gravação
                  </a>
                </div>
              </div>
            }
          }

        </div>
      </div>
    </div>
  `
})
export class Agenda implements OnInit {
  aulas:    any[] = [];
  proximas: any[] = [];
  passadas: any[] = [];
  carregando = true;

  diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  diasCalendario: any[] = [];
  mesAtual  = new Date().getMonth();
  anoAtual  = new Date().getFullYear();
  meses     = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  constructor(private cursoService: CursoService) {}

  ngOnInit() {
    this.cursoService.minhaAgenda().subscribe({
      next: (res: any) => {
        this.aulas    = res;
        const hoje    = new Date();
        this.proximas = res.filter((a: any) => new Date(a.scheduled_at) >= hoje);
        this.passadas = res.filter((a: any) => new Date(a.scheduled_at) <  hoje);
        this.carregando = false;
        this.gerarCalendario();
      },
      error: () => { this.carregando = false; this.gerarCalendario(); }
    });
  }

  gerarCalendario() {
    const dias: any[] = [];
    const hoje   = new Date();
    const inicio = new Date(this.anoAtual, this.mesAtual, 1);
    const fim    = new Date(this.anoAtual, this.mesAtual + 1, 0);

    const datasComAula = new Set(
      this.aulas.map(a => {
        const d = new Date(a.scheduled_at);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );

    for (let i = 0; i < inicio.getDay(); i++) dias.push({ num: null });

    for (let d = 1; d <= fim.getDate(); d++) {
      const key = `${this.anoAtual}-${this.mesAtual}-${d}`;
      dias.push({
        num:        d,
        isToday:    d === hoje.getDate() && this.mesAtual === hoje.getMonth() && this.anoAtual === hoje.getFullYear(),
        hasEvent:   datasComAula.has(key),
        otherMonth: false,
      });
    }
    this.diasCalendario = dias;
  }

  mesAnterior() {
    if (this.mesAtual === 0) { this.mesAtual = 11; this.anoAtual--; }
    else this.mesAtual--;
    this.gerarCalendario();
  }
  proximoMes() {
    if (this.mesAtual === 11) { this.mesAtual = 0; this.anoAtual++; }
    else this.mesAtual++;
    this.gerarCalendario();
  }
  nomeMes() { return this.meses[this.mesAtual]; }

  getDia(dt: string)  { return new Date(dt).getDate(); }
  getMes(dt: string)  { return this.meses[new Date(dt).getMonth()].slice(0,3).toUpperCase(); }
  getHora(dt: string) {
    const d = new Date(dt);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  isHoje(dt: string) {
    const d = new Date(dt); const h = new Date();
    return d.getDate() === h.getDate() && d.getMonth() === h.getMonth() && d.getFullYear() === h.getFullYear();
  }
  diasAte(dt: string) {
    const diff = new Date(dt).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}