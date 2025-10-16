import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirecionar após o login

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loginError: string = ''; // Mensagem para exibir erro de login

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getters para facilitar o acesso aos controles no HTML
  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  onSubmit() {
    this.loginError = ''; // Limpa erros anteriores
    
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      
      console.log('Tentativa de Login:', email);

      // --- Lógica de Autenticação (Simulação) ---
      
      // 1. Chamada a um Serviço de Autenticação (AuthService)
      // this.authService.login(email, senha).subscribe(
      //   (response) => {
      //     // Sucesso: armazena o token e redireciona
      //     this.router.navigate(['/dashboard']);
      //   },
      //   (error) => {
      //     // Falha: exibe o erro
      //     this.loginError = 'Email ou senha incorretos. Tente novamente.';
      //   }
      // );
      
      // Simulação de Sucesso imediato:
      setTimeout(() => {
         // Redireciona para o Painel de controle
         this.router.navigate(['/dashboard']); 
      }, 1000);
      

    } else {
      // Marca todos os campos como "tocados" para exibir as mensagens de erro
      this.loginForm.markAllAsTouched();
    }
  }
}
