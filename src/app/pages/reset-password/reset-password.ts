import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {
  
  resetForm!: FormGroup;
  token!: string; 
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  private apiUrl = 'https://heterozygous-stephnie-oversweetly.ngrok-free.dev/api/auth/reset-password'; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token']; 
    
    if (!this.token) {
      this.errorMessage = 'Link inválido. Por favor, solicite um novo link de redefinição.';
      return;
    }

    this.resetForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoNovaSenha: ['', [Validators.required]] 
    });
  }
  
  get novaSenha() { return this.resetForm.get('novaSenha'); }
  get confirmacaoNovaSenha() { return this.resetForm.get('confirmacaoNovaSenha'); }


  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      this.errorMessage = 'Preencha todos os campos corretamente.';
      return;
    }

    const { novaSenha, confirmacaoNovaSenha } = this.resetForm.value;

    if (novaSenha !== confirmacaoNovaSenha) {
        this.errorMessage = 'As senhas não coincidem. Por favor, digite novamente.';
        this.confirmacaoNovaSenha?.setErrors({ mismatch: true }); 
        return;
    }

    this.isSubmitting = true;

    const payload = {
      token: this.token,
      novaSenha: novaSenha
    };

    this.http.post<{ message: string }>(this.apiUrl, payload)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Senha redefinida com sucesso! Você será redirecionado em instantes.';
          this.isSubmitting = false;
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao redefinir:', err);
          this.errorMessage = err.error?.message || 'Token expirado ou inválido. Tente solicitar um novo link.';
          this.isSubmitting = false;
        }
      });
  }
}
