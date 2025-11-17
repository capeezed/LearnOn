import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const senha = control.get('senha');
  const confirmacaoSenha = control.get('confirmacaoSenha');

  if (senha && confirmacaoSenha && senha.value !== confirmacaoSenha.value && confirmacaoSenha.touched) {
    return { 'senhasDiferentes': true };
  }
  return null;
};


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html', 
  styleUrl: './cadastro.css',
  standalone: false
})
export class Cadastro implements OnInit { 
  
  registerForm!: FormGroup;
  registerError: string = '';
  isLoading: boolean = false; 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required]]
    }, { validators: passwordMatchValidator }); 
  }

  get nome() { return this.registerForm.get('nome'); }
  get email() { return this.registerForm.get('email'); }
  get senha() { return this.registerForm.get('senha'); }
  get confirmacaoSenha() { return this.registerForm.get('confirmacaoSenha'); }


 onSubmit() {
    this.registerError = '';
    
    if (this.registerForm.valid) {
      this.isLoading = true;

      const userData = this.registerForm.value; 
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          alert('Cadastro efetuado com sucesso! Agora faça login.');
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Erro no registro:', err);
          this.registerError = err.error?.message || 'Erro ao tentar cadastrar. Tente novamente.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
