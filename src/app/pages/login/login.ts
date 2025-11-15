import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
          const userType = this.authService.getUserType();
          if (userType === 'professor') {
            this.router.navigate(['/dashboard-professor']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          if (err.status === 403) {
            this.loginError = err.error?.message || 'Sua conta está aguardando aprovação.';
          } else {
            this.loginError = err.error?.message || 'Erro ao realizar login. Verifique as credenciais.';
          }
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
