import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-esqueci-senha',
  standalone: false,
  templateUrl: './esqueci-senha.html', 
  styleUrl: './esqueci-senha.css'
})
export class EsqueciSenha implements OnInit { 
  
  forgotForm!: FormGroup;
  successMessage: string = ''; 
  errorMessage: string = ''; 
  isSubmitting: boolean = false; 
  
  // 🚨 ATUALIZAÇÃO DA URL DA API
  private apiUrl = 'https://heterozygous-stephnie-oversweetly.ngrok-free.dev/api/auth/forgot-password';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    
    if (this.forgotForm.invalid) {
      this.errorMessage = 'Por favor, insira um email válido.';
      this.forgotForm.markAllAsTouched();
      return;
    }
    
    this.isSubmitting = true; 

    const emailData = this.forgotForm.value;
    
    this.http.post<{ message: string }>(this.apiUrl, emailData)
      .subscribe({
        next: (response) => {
          // Mensagem de sucesso configurada para o usuário
          this.successMessage = 'Se o e-mail estiver cadastrado, você receberá um link de redefinição. Verifique sua caixa de entrada.';
          this.forgotForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Erro de API:', error);
          // O ngrok pode desconectar, o que causaria um erro de rede
          this.errorMessage = 'Erro de conexão ou no servidor. Verifique se sua API está ativa.'; 
          this.isSubmitting = false;
        }
      });
  }
}