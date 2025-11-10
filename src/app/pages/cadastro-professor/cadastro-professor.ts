import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../shared/validators/custom-validators'; // Importa o validador reutilizável

@Component({
  selector: 'app-cadastro-professor',
  standalone: false,
  templateUrl: './cadastro-professor.html',
  styleUrl: './cadastro-professor.css'
})

export class CadastroProfessor implements OnInit {
  registerForm!: FormGroup;
  registerError: string = '';
  isLoading: boolean = false; 

  // Listas estáticas para os campos de seleção
  areas = ['Desenvolvimento Web', 'Cloud Computing', 'Data Science', 'Design UX/UI', 'DevOps/Infra', 'Mobile', 'Outra'];
  experienciaOptions = ['1-3 anos', '3-5 anos', '5-10 anos', '10+ anos'];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário reativo com todas as validações
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],

      // CAMPOS DE QUALIFICAÇÃO
      areaPrincipal: ['', Validators.required],
      tempoExperiencia: ['', Validators.required],
      comprovacaoDidatica: ['', [Validators.required, Validators.minLength(100)]],

      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required]]
    }, { validators: passwordMatchValidator }); // Aplica o validador no FormGroup
  }

  // Getters para facilitar o acesso aos controles no HTML
  get nome() { return this.registerForm.get('nome'); }
  get email() { return this.registerForm.get('email'); }
  get senha() { return this.registerForm.get('senha'); }
  get confirmacaoSenha() { return this.registerForm.get('confirmacaoSenha'); }
  get areaPrincipal() { return this.registerForm.get('areaPrincipal'); }
  get tempoExperiencia() { return this.registerForm.get('tempoExperiencia'); }
  get comprovacaoDidatica() { return this.registerForm.get('comprovacaoDidatica'); }


  onSubmit() {
    this.registerError = '';
    
    if (this.registerForm.valid) {
      this.isLoading = true;

      const professorData = this.registerForm.value;
      
      // Chamada para a rota de cadastro de professor via AuthService
      this.authService.registerProfessor(professorData).subscribe({
        next: (response) => {
          alert('Pré-cadastro de professor efetuado! Aguarde a aprovação da nossa equipe.');
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
