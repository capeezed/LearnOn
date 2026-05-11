import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-pedir-curso',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
      --bg: #f6efe5;
      --bg2: #efe5d8;

      --white: #fffaf4;
      --surface: #ffffff;

      --navy: #4937a6;
      --muted: #7c7297;

      --accent: #f97316;
      --accent2: #ff944d;

      --teal: #6b5cff;

      --border: #e8d9cb;

      --input-bg: #f3eadf;

      display: block;
      min-height: 100vh;

      background:
        radial-gradient(circle at top right, rgba(249,115,22,.08), transparent 25%),
        radial-gradient(circle at bottom left, rgba(107,92,255,.08), transparent 25%),
        var(--bg);

      font-family: 'DM Sans', sans-serif;
    }

    :host-context(body.dark-mode) {
      --bg: #050816;
      --bg2: #0f1222;

      --white: #12172a;
      --surface: #171d33;

      --navy: #f3f4f6;
      --muted: #9ca3af;

      --accent: #ff6a1a;
      --accent2: #ff944d;

      --teal: #7c83ff;

      --border: #2a3147;

      --input-bg: #0b1020;

      background:
        radial-gradient(circle at top right, rgba(124,131,255,.16), transparent 30%),
        radial-gradient(circle at bottom left, rgba(255,106,26,.12), transparent 28%),
        linear-gradient(180deg, #050816, #070b1b);
    }

    .page-wrap {
      max-width: 680px;
      margin: 0 auto;
      padding: 48px 20px;
    }

    .page-header { margin-bottom: 32px; }
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
    .page-sub { font-size: 15px; color: var(--muted); line-height: 1.6; }

    .form-card {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 28px;
      padding: 44px 40px;
      box-shadow:
        0 20px 60px rgba(73,55,166,.10),
        0 4px 20px rgba(0,0,0,.05);
      backdrop-filter: blur(16px);
    }

    :host-context(body.dark-mode) .form-card::before {
      content: '';
      position: absolute;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background:
        radial-gradient(
          circle,
          rgba(124,131,255,.10),
          transparent 70%
        );
      top: -140px;
      right: -140px;
      pointer-events: none;
    }

    .field-label {
      display: block;
      font-size: 13px; font-weight: 600;
      color: var(--navy); margin-bottom: 8px;
    }
    .field-required { color: var(--accent); }

    .field-input,
    .field-textarea,
    .field-select {
      width: 100%;
      padding: 14px 18px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      color: var(--navy);
      background: var(--input-bg);
      outline: none;
      transition:
        border-color .2s,
        box-shadow .2s,
        background .2s;
      margin-bottom: 24px;
      box-sizing: border-box;
    }
    .field-input:focus,
    .field-textarea:focus,
    .field-select:focus {
      border-color: var(--teal);
      background:
        color-mix(in srgb, var(--input-bg) 82%, white 18%);
      box-shadow:
        0 0 0 4px rgba(124,131,255,.14);
    }
    .field-textarea { resize: vertical; min-height: 120px; }

    /* URGÊNCIA */
    .urgency-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 24px;
    }
    .urgency-card {
      border: 2px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      background: var(--input-bg);
      transition:
        border-color .2s,
        background .2s,
        transform .2s,
        box-shadow .2s;
    }

    .urgency-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(73,55,166,.12);
    }
    .urgency-card.selected-normal {
      border-color: var(--teal);
      background: rgba(124,131,255,.08);
    }
    .urgency-card.selected-fast {
      border-color: var(--accent);
      background: rgba(255,106,26,.08);
    }
    .urgency-icon  { font-size: 28px; margin-bottom: 8px; }
    .urgency-title {
      font-family: 'Nunito', sans-serif;
      font-size: 15px; font-weight: 800; color: var(--navy); margin-bottom: 2px;
    }
    .urgency-desc  { font-size: 12px; color: var(--muted); }
    .urgency-badge {
      display: inline-block;
      margin-top: 8px; padding: 3px 12px;
      border-radius: 50px; font-size: 11px; font-weight: 700;
    }
    .badge-normal {
      background: rgba(124,131,255,.12);
      color: var(--teal);
    }
    .badge-fast {
      background: rgba(255,106,26,.12);
      color: var(--accent);
    }

    /* FORMATO */
    .formato-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 24px;
    }
    .formato-btn {
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      background: var(--input-bg);
      font-size: 13px; font-weight: 600; color: var(--muted);
      transition: all .2s;
    }
    .formato-btn:hover {
      border-color: var(--teal);
      color: var(--navy);
    }
    .formato-btn.selected {
      border-color: var(--teal);
      background: rgba(124,131,255,.08);
      color: var(--navy);
      font-weight: 700;
    }

    .divider { height: 1px; background: var(--border); margin: 28px 0; }

    /* BOTÃO */
    .btn-enviar {
      width: 100%;
      padding: 16px;
      background:
        linear-gradient(
          135deg,
          #4b36a8,
          #5b45c7
        );
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      transition:
        transform .2s,
        box-shadow .2s,
        opacity .2s;
    }

    .btn-enviar:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow:
        0 14px 32px rgba(91,69,199,.35);
      opacity: .96;
    }

    .btn-enviar:disabled { opacity: .6; cursor: not-allowed; }

    /* FEEDBACK */
    .erro-box {
      background: rgba(214,78,42,.08);
      border: 1px solid rgba(214,78,42,.25);
      color: var(--accent);
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .sucesso-box {
      background: rgba(42,122,110,.08);
      border: 1px solid rgba(42,122,110,.25);
      color: var(--teal);
      border-radius: 10px;
      padding: 16px 20px;
      font-size: 15px; font-weight: 600;
      text-align: center;
      margin-bottom: 16px;
    }

    @media(max-width: 640px) {
      .page-wrap {
        padding: 32px 16px;
      }

      .form-card {
        padding: 32px 24px;
      }

      .urgency-grid {
        grid-template-columns: 1fr;
      }

      .formato-grid {
        grid-template-columns: 1fr;
      }

      .page-title {
        font-size: 28px;
      }
    }
  `],
  template: `
    <div class="page-wrap">

      <div class="page-header">
        <div class="page-label">✦ Novo pedido</div>
        <h1 class="page-title">Pedir um Microcurso</h1>
        <p class="page-sub">Descreva sua dúvida e encontraremos o instrutor certo para você.</p>
      </div>

      <div class="form-card">

        <div>
          <label class="field-label">Título do pedido <span class="field-required">*</span></label>
          <input
            [(ngModel)]="form.title"
            type="text"
            class="field-input"
            placeholder='Ex: "Como usar async/await no JavaScript?"'
          />
        </div>

        <div>
          <label class="field-label">Descreva sua dúvida <span class="field-required">*</span></label>
          <textarea
            [(ngModel)]="form.description"
            class="field-textarea"
            placeholder="Explique o que você não entende, o que já tentou fazer, qual é o contexto..."
          ></textarea>
        </div>

        <div>
          <label class="field-label">Tema / Área <span class="field-required">*</span></label>
          <input
            [(ngModel)]="form.topic_tag"
            type="text"
            class="field-input"
            placeholder='Ex: "javascript", "excel", "marketing digital"'
          />
        </div>

        <div>
          <label class="field-label">Formato preferido</label>
          <div class="formato-grid">
            <div class="formato-btn" [class.selected]="form.format_preference === 'no_preference'"
              (click)="form.format_preference = 'no_preference'">
              Sem preferência
            </div>
            <div class="formato-btn" [class.selected]="form.format_preference === 'live'"
              (click)="form.format_preference = 'live'">
              Ao vivo
            </div>
            <div class="formato-btn" [class.selected]="form.format_preference === 'recorded'"
              (click)="form.format_preference = 'recorded'">
              Gravado
            </div>
          </div>
        </div>

        <div>
          <label class="field-label">Urgência</label>
          <div class="urgency-grid">
            <div class="urgency-card"
              [class.selected-normal]="form.urgency === 'normal'"
              (click)="form.urgency = 'normal'">
              <div class="urgency-icon">🕐</div>
              <div class="urgency-title">Normal</div>
              <div class="urgency-desc">Fila padrão</div>
              <span class="urgency-badge badge-normal">Até 5 dias úteis</span>
            </div>
            <div class="urgency-card"
              [class.selected-fast]="form.urgency === 'fast_track'"
              (click)="form.urgency = 'fast_track'">
              <div class="urgency-icon">⚡</div>
              <div class="urgency-title">Fast-track</div>
              <div class="urgency-desc">Fila prioritária</div>
              <span class="urgency-badge badge-fast">Prazo reduzido</span>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        @if (erro) {
          <div class="erro-box">{{ erro }}</div>
        }
        @if (sucesso) {
          <div class="sucesso-box">
            ✅ Pedido enviado! Estamos procurando um instrutor para você.
          </div>
        }

        <button class="btn-enviar" (click)="enviar()" [disabled]="carregando || sucesso">
          {{ carregando ? 'Enviando...' : 'Enviar pedido →' }}
        </button>

      </div>
    </div>
  `
})
export class PedirCurso {
  form = {
    title: '',
    description: '',
    topic_tag: '',
    format_preference: 'no_preference',
    urgency: 'normal'
  };
  erro       = '';
  sucesso    = false;
  carregando = false;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  enviar() {
    this.erro = '';
    if (!this.form.title || !this.form.description || !this.form.topic_tag) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }
    this.carregando = true;
    this.pedidoService.criarPedido(this.form).subscribe({
      next: () => {
        this.sucesso    = true;
        this.carregando = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err: any) => {
        this.erro       = err.error?.error || 'Erro ao enviar pedido.';
        this.carregando = false;
      }
    });
  }
}