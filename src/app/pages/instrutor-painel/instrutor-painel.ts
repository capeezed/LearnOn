import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-instrutor-painel',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
      display: block; min-height: 100vh;
      background: var(--bg);
      font-family: 'DM Sans', sans-serif;
    }

    /* NAVBAR */
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(240,235,227,.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 0 40px;
      display: flex; align-items: center; justify-content: space-between;
      height: 64px;
    }
    .nav-logo {
      font-family: 'Nunito', sans-serif;
      font-size: 22px; font-weight: 900; color: var(--navy);
      text-decoration: none;
    }
    .nav-logo span { color: var(--accent); }
    .nav-badge {
      background: rgba(42,122,110,.12); color: var(--teal);
      padding: 4px 12px; border-radius: 50px;
      font-size: 11px; font-weight: 700; letter-spacing: .5px;
      text-transform: uppercase; margin-left: 10px;
    }
    .nav-right { display: flex; align-items: center; gap: 16px; }
    .nav-nome { font-size: 14px; font-weight: 600; color: var(--muted); }
    .btn-sair {
      background: transparent; border: 1.5px solid var(--border);
      color: var(--navy); padding: 7px 18px; border-radius: 50px;
      font-size: 13px; font-weight: 700; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: border-color .2s, background .2s;
    }
    .btn-sair:hover { border-color: var(--accent); color: var(--accent); }

    /* TABS */
    .tabs-bar {
      background: var(--white);
      border-bottom: 1px solid var(--border);
      padding: 0 40px;
      display: flex; gap: 4px;
    }
    .tab {
      padding: 16px 20px;
      font-size: 14px; font-weight: 600; color: var(--muted);
      cursor: pointer; border: none; background: none;
      border-bottom: 3px solid transparent;
      transition: color .2s, border-color .2s;
      font-family: 'DM Sans', sans-serif;
      display: flex; align-items: center; gap: 8px;
    }
    .tab:hover { color: var(--navy); }
    .tab.active { color: var(--navy); border-bottom-color: var(--accent); }
    .tab-badge {
      background: var(--accent); color: white;
      width: 20px; height: 20px; border-radius: 50%;
      font-size: 11px; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }

    /* BODY */
    .painel-body {
      max-width: 1100px; margin: 0 auto; padding: 40px 24px;
    }

    /* ─── DASHBOARD ─── */
    .stats-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 16px; margin-bottom: 36px;
    }
    .stat-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 24px 20px; text-align: center;
    }
    .stat-num {
      font-family: 'Nunito', sans-serif;
      font-size: 36px; font-weight: 900; color: var(--navy); line-height: 1;
    }
    .stat-num.accent { color: var(--accent); }
    .stat-num.teal   { color: var(--teal); }
    .stat-num.gold   { color: var(--gold); }
    .stat-label { font-size: 13px; color: var(--muted); margin-top: 6px; }

    .welcome-banner {
      background: var(--navy); border-radius: 20px;
      padding: 36px 40px; margin-bottom: 28px;
      display: flex; align-items: center; justify-content: space-between;
      position: relative; overflow: hidden;
    }
    .welcome-banner::before {
      content: ''; position: absolute;
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(42,122,110,.25), transparent 70%);
      top: -120px; right: -60px;
    }
    .welcome-banner h2 {
      font-family: 'Nunito', sans-serif;
      font-size: 24px; font-weight: 900; color: white; margin-bottom: 6px;
    }
    .welcome-banner p { font-size: 14px; color: rgba(255,255,255,.55); }
    .welcome-emoji { font-size: 64px; flex-shrink: 0; }

    /* ─── MATCHES ─── */
    .section-title {
      font-family: 'Nunito', sans-serif;
      font-size: 20px; font-weight: 900; color: var(--navy); margin-bottom: 20px;
    }

    .match-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 28px;
      margin-bottom: 16px;
      display: flex; gap: 24px; align-items: flex-start;
    }
    .match-icon {
      width: 52px; height: 52px; border-radius: 14px;
      background: rgba(200,150,62,.12);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; flex-shrink: 0;
    }
    .match-info { flex: 1; }
    .match-title {
      font-family: 'Nunito', sans-serif;
      font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 6px;
    }
    .match-desc { font-size: 13px; color: var(--muted); margin-bottom: 12px; line-height: 1.5; }
    .match-meta { display: flex; gap: 16px; flex-wrap: wrap; }
    .match-meta span {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 12px; font-weight: 600; color: var(--muted);
      background: var(--bg); padding: 4px 12px; border-radius: 50px;
    }
    .match-actions { display: flex; gap: 10px; align-self: center; flex-shrink: 0; }
    .btn-aceitar {
      background: var(--teal); color: white;
      padding: 10px 22px; border-radius: 50px;
      font-size: 13px; font-weight: 700; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: background .2s;
    }
    .btn-aceitar:hover { background: #1f5e54; }
    .btn-recusar {
      background: transparent; color: var(--muted);
      padding: 10px 22px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      border: 1.5px solid var(--border); cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: border-color .2s, color .2s;
    }
    .btn-recusar:hover { border-color: var(--accent); color: var(--accent); }

    .urgency-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 50px;
      font-size: 11px; font-weight: 700;
    }
    .urgency-fast { background: rgba(214,78,42,.1); color: var(--accent); }
    .urgency-normal { background: rgba(28,43,58,.08); color: var(--navy); }

    /* ─── PUBLICAR ─── */
    .publish-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 36px;
    }
    .field { margin-bottom: 20px; }
    label {
      display: block; font-size: 13px; font-weight: 600;
      color: var(--navy); margin-bottom: 8px;
    }
    input, select, textarea {
      width: 100%; padding: 13px 16px;
      border: 1.5px solid var(--border); border-radius: 12px;
      font-size: 14px; font-family: 'DM Sans', sans-serif;
      background: var(--bg); color: var(--navy);
      outline: none; transition: border-color .2s, background .2s;
      box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--teal); background: var(--white);
    }
    textarea { resize: vertical; min-height: 100px; }
    .fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .btn-publicar {
      background: var(--teal); color: white;
      padding: 14px 32px; border-radius: 50px;
      font-size: 15px; font-weight: 700; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: background .2s, transform .2s;
    }
    .btn-publicar:hover:not(:disabled) { background: #1f5e54; transform: translateY(-2px); }
    .btn-publicar:disabled { opacity: .6; cursor: not-allowed; }

    .sucesso {
      background: rgba(42,122,110,.1); border: 1px solid rgba(42,122,110,.25);
      color: var(--teal); border-radius: 12px;
      padding: 14px 18px; font-size: 14px; font-weight: 600;
      margin-top: 16px;
    }
    .erro-msg {
      background: rgba(214,78,42,.08); border: 1px solid rgba(214,78,42,.2);
      color: var(--accent); border-radius: 12px;
      padding: 14px 18px; font-size: 14px; font-weight: 600;
      margin-top: 16px;
    }

    /* ─── AGENDA ─── */
    .aula-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 24px 28px; margin-bottom: 16px;
      display: flex; gap: 20px; align-items: center;
    }
    .aula-date-box {
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 14px; padding: 12px 16px;
      text-align: center; flex-shrink: 0; min-width: 64px;
    }
    .aula-date-box.hoje { background: var(--navy); border-color: var(--navy); }
    .aula-day {
      font-family: 'Nunito', sans-serif;
      font-size: 28px; font-weight: 900; color: var(--navy); line-height: 1;
    }
    .aula-date-box.hoje .aula-day { color: white; }
    .aula-mon { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--muted); }
    .aula-date-box.hoje .aula-mon { color: rgba(255,255,255,.6); }
    .aula-info { flex: 1; }
    .aula-title {
      font-family: 'Nunito', sans-serif;
      font-size: 17px; font-weight: 800; color: var(--navy); margin-bottom: 4px;
    }
    .aula-meta { font-size: 13px; color: var(--muted); }
    .btn-iniciar {
      background: var(--teal); color: white;
      padding: 10px 22px; border-radius: 50px;
      font-size: 13px; font-weight: 700; text-decoration: none;
      transition: background .2s;
    }
    .btn-iniciar:hover { background: #1f5e54; }
    .btn-em-breve {
      background: var(--bg); color: var(--muted);
      padding: 10px 22px; border-radius: 50px;
      font-size: 13px; font-weight: 600;
      border: 1.5px solid var(--border);
    }

    /* EMPTY */
    .empty-state {
      text-align: center; padding: 60px 24px;
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px;
    }
    .empty-icon { font-size: 48px; margin-bottom: 12px; }
    .empty-title {
      font-family: 'Nunito', sans-serif;
      font-size: 18px; font-weight: 900; color: var(--navy); margin-bottom: 6px;
    }
    .empty-sub { font-size: 14px; color: var(--muted); }

    @media(max-width: 768px) {
      .navbar { padding: 0 20px; }
      .tabs-bar { padding: 0 20px; overflow-x: auto; }
      .painel-body { padding: 24px 16px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .match-card { flex-direction: column; }
      .match-actions { width: 100%; }
      .btn-aceitar, .btn-recusar { flex: 1; text-align: center; }
      .fields-row { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <!-- NAVBAR -->
    <nav class="navbar">
      <div style="display:flex;align-items:center;gap:4px">
        <a routerLink="/home" class="nav-logo">Learn<span>On</span></a>
        <span class="nav-badge">Instrutor</span>
      </div>
      <div class="nav-right">
        <span class="nav-nome">{{ nome }}</span>
        <button class="btn-sair" (click)="sair()">Sair</button>
      </div>
    </nav>

    <!-- TABS -->
    <div class="tabs-bar">
      <button class="tab" [class.active]="aba === 'dashboard'" (click)="aba = 'dashboard'">
         Dashboard
      </button>
      <button class="tab" [class.active]="aba === 'matches'" (click)="aba = 'matches'; carregarMatches()">
         Matches
        @if (matches.length > 0) {
          <span class="tab-badge">{{ matches.length }}</span>
        }
      </button>
      <button class="tab" [class.active]="aba === 'publicar'" (click)="aba = 'publicar'">
         Publicar Curso
      </button>
      <button class="tab" [class.active]="aba === 'agenda'" (click)="aba = 'agenda'; carregarAgenda()">
         Agenda
      </button>
    </div>

    <div class="painel-body">

      <!-- ─── DASHBOARD ─── -->
      @if (aba === 'dashboard') {
        <div class="welcome-banner">
          <div>
            <h2>Olá, {{ nome }}!</h2>
            <p>Aqui está um resumo da sua atividade na plataforma.</p>
          </div>
          <div class="welcome-emoji"></div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-num accent">{{ matches.length }}</div>
            <div class="stat-label">Matches pendentes</div>
          </div>
          <div class="stat-card">
            <div class="stat-num teal">{{ aulasFuturas }}</div>
            <div class="stat-label">Aulas agendadas</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">{{ cursosPublicados }}</div>
            <div class="stat-label">Cursos publicados</div>
          </div>
          <div class="stat-card">
            <div class="stat-num gold">R$ {{ ganhos }}</div>
            <div class="stat-label">Ganhos totais</div>
          </div>
        </div>

        @if (matches.length > 0) {
          <div class="section-title">⚡ Matches aguardando sua resposta</div>
          @for (m of matches.slice(0,2); track m.id) {
            <div class="match-card">
              <div class="match-icon">🎯</div>
              <div class="match-info">
                <div class="match-title">{{ m.request_title }}</div>
                <div class="match-desc">{{ m.request_description }}</div>
                <div class="match-meta">
                  <span>📚 {{ m.topic_tag }}</span>
                  <span class="urgency-badge" [class]="m.urgency === 'fast_track' ? 'urgency-fast' : 'urgency-normal'">
                    {{ m.urgency === 'fast_track' ? '⚡ Fast-track' : '📋 Normal' }}
                  </span>
                </div>
              </div>
              <div class="match-actions">
                <button class="btn-aceitar" (click)="responderMatch(m.id, 'accepted')">✓ Aceitar</button>
                <button class="btn-recusar" (click)="responderMatch(m.id, 'rejected')">✗ Recusar</button>
              </div>
            </div>
          }
        }
      }

      <!-- ─── MATCHES ─── -->
      @if (aba === 'matches') {
        <div class="section-title">Matches Pendentes</div>

        @if (carregandoMatches) {
          <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <div class="empty-title">Carregando...</div>
          </div>
        } @else if (matches.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">🎯</div>
            <div class="empty-title">Nenhum match pendente</div>
            <p class="empty-sub">Quando um aluno fizer um pedido compatível com seu perfil, aparecerá aqui.</p>
          </div>
        } @else {
          @for (m of matches; track m.id) {
            <div class="match-card">
              <div class="match-icon">🎯</div>
              <div class="match-info">
                <div class="match-title">{{ m.request_title }}</div>
                <div class="match-desc">{{ m.request_description }}</div>
                <div class="match-meta">
                  <span>📚 {{ m.topic_tag }}</span>
                  <span>🎬 {{ m.format_preference === 'live' ? 'Ao vivo' : m.format_preference === 'recorded' ? 'Gravado' : 'Sem preferência' }}</span>
                  <span class="urgency-badge" [class]="m.urgency === 'fast_track' ? 'urgency-fast' : 'urgency-normal'">
                    {{ m.urgency === 'fast_track' ? '⚡ Fast-track' : '📋 Normal' }}
                  </span>
                </div>
              </div>
              <div class="match-actions">
                <button class="btn-aceitar" (click)="responderMatch(m.id, 'accepted')">✓ Aceitar</button>
                <button class="btn-recusar" (click)="responderMatch(m.id, 'rejected')">✗ Recusar</button>
              </div>
            </div>
          }
        }
      }

      <!-- ─── PUBLICAR CURSO ─── -->
      @if (aba === 'publicar') {
        <div class="section-title">Publicar Curso Entregue</div>
        <div class="publish-card">

          <div class="field">
            <label>Título do curso</label>
            <input type="text" [(ngModel)]="pub.title" placeholder="Ex: Async/Await no JavaScript" />
          </div>

          <div class="field">
            <label>ID do pedido relacionado</label>
            <input type="number" [(ngModel)]="pub.request_id" placeholder="ID do pedido do aluno" />
          </div>

          <div class="fields-row">
            <div class="field">
              <label>Formato</label>
              <select [(ngModel)]="pub.format">
                <option value="recorded">⏺ Gravado</option>
                <option value="live">🔴 Ao vivo</option>
              </select>
            </div>
            <div class="field">
              <label>Duração (minutos)</label>
              <input type="number" [(ngModel)]="pub.duration_minutes" placeholder="Ex: 60" />
            </div>
          </div>

          <div class="field">
            <label>Link do vídeo / aula</label>
            <input type="url" [(ngModel)]="pub.video_url" placeholder="https://youtube.com/..." />
          </div>

          <div class="field">
            <label>Descrição (opcional)</label>
            <textarea [(ngModel)]="pub.description" placeholder="O que o aluno vai aprender neste curso..."></textarea>
          </div>

          <button class="btn-publicar" (click)="publicarCurso()" [disabled]="publicando">
            {{ publicando ? 'Publicando...' : '📤 Publicar Curso' }}
          </button>

          @if (pubSucesso) {
            <div class="sucesso">✅ Curso publicado com sucesso! O aluno já pode acessá-lo.</div>
          }
          @if (pubErro) {
            <div class="erro-msg">{{ pubErro }}</div>
          }
        </div>
      }

      <!-- ─── AGENDA ─── -->
      @if (aba === 'agenda') {
        <div class="section-title">Suas Aulas Agendadas</div>

        @if (carregandoAgenda) {
          <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <div class="empty-title">Carregando...</div>
          </div>
        } @else if (aulas.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">🗓️</div>
            <div class="empty-title">Nenhuma aula agendada</div>
            <p class="empty-sub">Suas sessões ao vivo aparecerão aqui após aceitar um match.</p>
          </div>
        } @else {
          @for (aula of aulas; track aula.id) {
            <div class="aula-card">
              <div class="aula-date-box" [class.hoje]="isHoje(aula.scheduled_at)">
                <div class="aula-day">{{ getDia(aula.scheduled_at) }}</div>
                <div class="aula-mon">{{ getMes(aula.scheduled_at) }}</div>
              </div>
              <div class="aula-info">
                <div class="aula-title">{{ aula.course_title }}</div>
                <div class="aula-meta">
                  🕐 {{ getHora(aula.scheduled_at) }} &nbsp;·&nbsp;
                  ⏱ {{ aula.duration_min || 60 }} min &nbsp;·&nbsp;
                  👤 {{ aula.student_name || 'Aluno' }}
                </div>
              </div>
              @if (isHoje(aula.scheduled_at)) {
                <a [href]="aula.meeting_url || '#'" class="btn-iniciar">Iniciar aula →</a>
              } @else {
                <span class="btn-em-breve">Em {{ diasAte(aula.scheduled_at) }} dia(s)</span>
              }
            </div>
          }
        }
      }

    </div>
  `
})
export class InstrutorPainel implements OnInit {
  aba = 'dashboard';
  nome = '';

  // Matches
  matches: any[] = [];
  carregandoMatches = false;

  // Agenda
  aulas: any[] = [];
  carregandoAgenda = false;
  aulasFuturas = 0;

  // Stats
  cursosPublicados = 0;
  ganhos = '0,00';

  // Publicar
  pub = { title: '', request_id: null, format: 'recorded', duration_minutes: 60, video_url: '', description: '' };
  publicando = false;
  pubSucesso = false;
  pubErro = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('instrutor_token');
    if (!token) { this.router.navigate(['/instrutor/login']); return; }
    this.nome = localStorage.getItem('instrutor_nome') || 'Instrutor';
    this.carregarMatches();
    this.carregarAgenda();
  }

  headers() {
    const token = localStorage.getItem('instrutor_token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  carregarMatches() {
    this.carregandoMatches = true;
    this.http.get<any[]>(`${environment.apiUrl}/matches/pending`, this.headers()).subscribe({
      next: (res) => {
        this.matches = Array.isArray(res) ? res : [];
        this.carregandoMatches = false;
        this.cdr.detectChanges();
      },
      error: () => { this.carregandoMatches = false; this.cdr.detectChanges(); }
    });
  }

  carregarAgenda() {
    this.carregandoAgenda = true;
    this.http.get<any[]>(`${environment.apiUrl}/schedules`, this.headers()).subscribe({
      next: (res) => {
        this.aulas = Array.isArray(res) ? res : [];
        const hoje = new Date();
        this.aulasFuturas = this.aulas.filter(a => new Date(a.scheduled_at) >= hoje).length;
        this.carregandoAgenda = false;
        this.cdr.detectChanges();
      },
      error: () => { this.carregandoAgenda = false; this.cdr.detectChanges(); }
    });
  }

  responderMatch(id: number, resposta: 'accepted' | 'rejected') {
    this.http.put(`${environment.apiUrl}/matches/${id}/respond`, { response: resposta }, this.headers()).subscribe({
      next: () => {
        this.matches = this.matches.filter(m => m.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.error || 'Erro ao responder match.')
    });
  }

  publicarCurso() {
    this.pubSucesso = false;
    this.pubErro = '';
    if (!this.pub.title || !this.pub.request_id || !this.pub.video_url) {
      this.pubErro = 'Preencha título, ID do pedido e link do vídeo.';
      return;
    }
    this.publicando = true;
    this.http.post(`${environment.apiUrl}/courses`, this.pub, this.headers()).subscribe({
      next: () => {
        this.publicando = false;
        this.pubSucesso = true;
        this.cursosPublicados++;
        this.pub = { title: '', request_id: null, format: 'recorded', duration_minutes: 60, video_url: '', description: '' };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.publicando = false;
        this.pubErro = err.error?.error || 'Erro ao publicar curso.';
        this.cdr.detectChanges();
      }
    });
  }

  sair() {
    localStorage.removeItem('instrutor_token');
    localStorage.removeItem('instrutor_nome');
    this.router.navigate(['/instrutor/login']);
  }

  getDia(dt: string)  { return new Date(dt).getDate(); }
  getMes(dt: string)  {
    const m = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return m[new Date(dt).getMonth()];
  }
  getHora(dt: string) {
    const d = new Date(dt);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  isHoje(dt: string) {
    const d = new Date(dt); const h = new Date();
    return d.getDate() === h.getDate() && d.getMonth() === h.getMonth() && d.getFullYear() === h.getFullYear();
  }
  diasAte(dt: string) {
    return Math.ceil((new Date(dt).getTime() - new Date().getTime()) / (1000*60*60*24));
  }
}