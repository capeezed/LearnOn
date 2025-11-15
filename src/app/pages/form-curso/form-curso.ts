import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-curso',
  standalone: false,
  templateUrl: './form-curso.html',
  styleUrl: './form-curso.css'
})
export class FormCurso implements OnInit {
  pedidoForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      duvida: ['', [
        Validators.required,
        Validators.minLength(25)
      ]]
    });
  }

  get duvida() {
    return this.pedidoForm.get('duvida');
  }

  onSubmit() {
    if (this.pedidoForm.valid) {
      this.isLoading = true;
      const pedidoData = {
        duvida: this.pedidoForm.value.duvida,
        solicitante_email: this.authService.getUserName?.() || undefined
      };

      this.pedidoService.criarPedido(pedidoData).subscribe({
        next: () => {
          alert('Seu pedido foi enviado! Nossos especialistas já estão analisando.');
          this.pedidoForm.reset();
          this.isLoading = false;
        },
        error: () => {
          alert('Erro ao enviar pedido, tente novamente.');
          this.isLoading = false;
        }
      });
    } else {
      this.pedidoForm.markAllAsTouched();
    }
  }
}
