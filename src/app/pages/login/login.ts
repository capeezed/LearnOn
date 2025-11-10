import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Use o caminho correto

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html', 
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  
  loginForm!: FormGroup;
  loginError: string = '';
  isLoading: boolean = false; 

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

  // Getters para fácil acesso no HTML
  get email() { return this.loginForm.get('email'); }
  get senha() { return this.loginForm.get('senha'); }

  onSubmit() {
    this.loginError = ''; 
    
    if (this.loginForm.valid) {
      this.isLoading = true;

      const credentials = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha
      };
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.loginError = err.error?.message || 'Erro ao realizar login. Verifique as credenciais.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}