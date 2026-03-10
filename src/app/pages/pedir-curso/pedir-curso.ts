import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-pedir-curso',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="page-container">
      <div class="row justify-content-center">
        <div class="col-lg-7">

          <div class="card border-0 shadow-sm p-4 p-md-5" style="border-radius:16px;">
            <h3 class="fw-bold mb-1" style="color:#0f3460;">Pedir um Microcurso</h3>
            <p class="text-muted mb-4">Descreva sua dúvida e encontraremos o instrutor certo para você.</p>

            <div class="mb-3">
              <label class="form-label fw-bold">Título do pedido</label>
              <input [(ngModel)]="form.title" type="text" class="form-control"
                placeholder='Ex: "Como usar async/await no JavaScript?"' />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Descreva sua dúvida</label>
              <textarea [(ngModel)]="form.description" class="form-control" rows="4"
                placeholder="Explique o que você não entende, o que já tentou fazer..."></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Tema / Área</label>
              <input [(ngModel)]="form.topic_tag" type="text" class="form-control"
                placeholder='Ex: "javascript", "excel", "marketing"' />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Formato preferido</label>
              <select [(ngModel)]="form.format_preference" class="form-select">
                <option value="no_preference">Sem preferência</option>
                <option value="live">Ao vivo</option>
                <option value="recorded">Gravado</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Urgência</label>
              <div class="row g-2">
                <div class="col-6">
                  <div class="border rounded-3 p-3 text-center cursor-pointer"
                    [class.border-primary]="form.urgency === 'normal'"
                    [class.bg-light]="form.urgency === 'normal'"
                    (click)="form.urgency = 'normal'" style="cursor:pointer;">
                    <div>🕐</div>
                    <div class="fw-bold">Normal</div>
                    <small class="text-muted">Fila padrão</small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="border rounded-3 p-3 text-center"
                    [class.border-danger]="form.urgency === 'fast_track'"
                    [class.bg-light]="form.urgency === 'fast_track'"
                    (click)="form.urgency = 'fast_track'" style="cursor:pointer;">
                    <div>⚡</div>
                    <div class="fw-bold">Fast-track</div>
                    <small class="text-muted">Fila prioritária</small>
                  </div>
                </div>
              </div>
            </div>

            @if(erro) {
              <div class="alert alert-danger">{{ erro }}</div>
            }
            @if(sucesso) {
              <div class="alert alert-success">
                ✅ Pedido enviado! Estamos procurando um instrutor para você.
              </div>
            }

            <button class="btn btn-lg w-100 text-white fw-bold" style="background:#0f3460;"
              (click)="enviar()" [disabled]="carregando">
              {{ carregando ? 'Enviando...' : 'Enviar pedido' }}
            </button>
          </div>

        </div>
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