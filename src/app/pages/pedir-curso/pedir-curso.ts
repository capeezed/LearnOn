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
      max-width: 680px;
      margin: 0 auto;
      padding: 48px 24px;
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
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 44px 40px;
      box-shadow: 0 8px 40px rgba(28,43,58,.06);
    }

    .field-label {
      display: block;
      font-size: 13px; font-weight: 600;
      color: var(--navy); margin-bottom: 8px;
    }
    .field-required { color: var(--accent); }

    .field-input, .field-textarea, .field-select {
      width: 100%;
      padding: 14px 18px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      color: var(--navy);
      background: var(--bg);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      margin-bottom: 24px;
    }
    .field-input:focus, .field-textarea:focus, .field-select:focus {
      border-color: var(--navy);
      box-shadow: 0 0 0 3px rgba(28,43,58,.07);
      background: var(--white);
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
      background: var(--bg);
      transition: border-color .2s, background .2s, transform .2s;
    }
    .urgency-card:hover { transform: translateY(-2px); }
    .urgency-card.selected-normal   { border-color: var(--navy);   background: rgba(28,43,58,.04); }
    .urgency-card.selected-fast     { border-color: var(--accent);  background: rgba(214,78,42,.04); }
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
    .badge-normal { background: rgba(28,43,58,.08);  color: var(--navy); }
    .badge-fast   { background: rgba(214,78,42,.12); color: var(--accent); }

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
      background: var(--bg);
      font-size: 13px; font-weight: 600; color: var(--muted);
      transition: all .2s;
    }
    .formato-btn:hover { border-color: var(--navy); color: var(--navy); }
    .formato-btn.selected { border-color: var(--navy); background: rgba(28,43,58,.05); color: var(--navy); font-weight: 700; }

    .divider { height: 1px; background: var(--border); margin: 28px 0; }

    /* BOTÃO */
    .btn-enviar {
      width: 100%;
      padding: 16px;
      background: var(--navy); color: white;
      border: none; border-radius: 50px;
      font-size: 16px; font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      transition: background .2s, transform .2s;
    }
    .btn-enviar:hover:not(:disabled) {
      background: var(--accent);
      transform: translateY(-2px);
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