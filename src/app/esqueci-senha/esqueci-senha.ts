import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-esqueci-senha',
  standalone: false,
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css'
})
export class EsqueciSenha {

  forgotForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() { return this.forgotForm.get('email'); }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    
    if (this.forgotForm.valid) {
      this.isLoading = true;
      const emailData = this.forgotForm.value;

      this.authService.forgotPassword(emailData).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Um link de recuperação foi enviado. Verifique sua caixa de entrada.';
          this.forgotForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao processar a solicitação. Tente novamente.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}


