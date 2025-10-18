import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirecionar após o login
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  loginError: string = ''; // Mensagem para exibir erro de login
  isLoading: boolean = false; // Indicador de carregamento

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
    this.loginError = ''; 
    
    if (this.loginForm.valid) {
      this.isLoading = true; // Inicia o carregamento

      const credentials = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha
      };
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // Sucesso: O token e o usuário já foram salvos pelo AuthService.
          // Redireciona para o painel (vamos criar a rota /dashboard depois)
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          // Erro: Captura a mensagem do servidor (ex: Credenciais inválidas)
          console.error('Erro no login:', err);
          // O backend deve retornar uma mensagem como 'Credenciais inválidas.'
          this.loginError = err.error?.message || 'Erro ao realizar login. Tente novamente.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false; // Finaliza o carregamento, mesmo em caso de erro
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}