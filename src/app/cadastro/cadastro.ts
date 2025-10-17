import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

// Validador customizado para comparar dois campos (senha e confirmação)
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const senha = control.get('senha');
  const confirmacaoSenha = control.get('confirmacaoSenha');

  // Só verifica se os dois campos existem e se ambos foram tocados
  if (senha && confirmacaoSenha && senha.value !== confirmacaoSenha.value && confirmacaoSenha.touched) {
    return { 'senhasDiferentes': true };
  }
  return null;
};


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})

export class Cadastro implements OnInit {
  
  registerForm!: FormGroup;
  registerError: string = '';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required]]
    }, { validators: passwordMatchValidator }); // Aplica o validador customizado no nível do FormGroup
  }

  // Getters para facilitar o acesso
  get nome() { return this.registerForm.get('nome'); }
  get email() { return this.registerForm.get('email'); }
  get senha() { return this.registerForm.get('senha'); }
  get confirmacaoSenha() { return this.registerForm.get('confirmacaoSenha'); }


  onSubmit() {
    this.registerError = '';
    
    if (this.registerForm.valid) {
      const { nome, email, senha } = this.registerForm.value;
      
      console.log('Dados de Cadastro:', { nome, email, senha });

      // Simulação de Sucesso:
      alert('Cadastro realizado com sucesso! Redirecionando para login.');
      this.router.navigate(['/login']); 

      // Lógica real de AuthService.register(data).subscribe(...);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}