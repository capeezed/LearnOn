import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth'; // Use o caminho correto

// Reutilizamos o validador de confirmação de senha
export const passwordResetMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const novaSenha = control.get('novaSenha');
  const confirmacaoNovaSenha = control.get('confirmacaoNovaSenha');

  if (novaSenha && confirmacaoNovaSenha && novaSenha.value !== confirmacaoNovaSenha.value && confirmacaoNovaSenha.touched) {
    return { 'senhasDiferentes': true };
  }
  return null;
};

@Component({
  selector: 'app-password-reset',
  templateUrl: './redefinicao-senha.html',
  styleUrls: ['./redefinicao-senha.css'],
  standalone: false
})
export class RedefinicaoSenha implements OnInit {

  resetForm!: FormGroup;
  token!: string; // Armazenará o token da URL
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  
  // Variável para lidar com tokens inválidos/expirados
  tokenValid: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Para ler o token da URL
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // 1. Capturar o token da URL
    this.route.params.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        // [AQUI VOCÊ PODE CHAMAR UMA API PARA VALIDAR SE O TOKEN EXISTE/NÃO EXPIROU]
        this.tokenValid = true; // Por enquanto, assumimos que o token é válido para mostrar o formulário
      } else {
        this.errorMessage = 'Token de redefinição não encontrado.';
        this.tokenValid = false;
      }
    });

    // 2. Inicializar o Formulário
    this.resetForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoNovaSenha: ['', [Validators.required]]
    }, { validators: passwordResetMatchValidator });
  }

  get novaSenha() { return this.resetForm.get('novaSenha'); }
  get confirmacaoNovaSenha() { return this.resetForm.get('confirmacaoNovaSenha'); }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.resetForm.valid && this.tokenValid) {
      this.isLoading = true;

      const resetData = {
        token: this.token, // Envia o token que veio da URL
        novaSenha: this.resetForm.value.novaSenha
      };
      
      // 🚨 Chamada ao NOVO método do AuthService (que teremos que criar)
      this.authService.resetPassword(resetData).subscribe({
        next: (response) => {
          this.successMessage = 'Sua senha foi redefinida com sucesso! Redirecionando...';
          this.resetForm.reset();
          // Redireciona para o login após 3 segundos
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Token inválido ou expirado. Tente novamente.';
          this.isLoading = false;
          this.tokenValid = false; // Desabilita o formulário após erro de token
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else if (!this.tokenValid) {
      this.errorMessage = this.errorMessage || 'Não é possível redefinir a senha com um token inválido.';
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}