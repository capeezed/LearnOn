import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-curso',
  standalone: false,
  templateUrl: './form-curso.html',
  styleUrl: './form-curso.css'
})
export class FormCurso implements OnInit {
// Declaração do FormGroup que irá controlar o formulário
  courseForm!: FormGroup;

  // Injetamos o FormBuilder no construtor
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // 1. Inicializa o formulário e define os controles (campos) e suas validações
    this.courseForm = this.fb.group({
      duvida: ['', [
        Validators.required,        // O campo não pode estar vazio
        Validators.minLength(25)    // A dúvida deve ter no mínimo 25 caracteres para ser detalhada
      ]]
      // Você poderia adicionar mais campos aqui, como 'email' ou 'nome'
    });
  }

  // 2. Getter para facilitar o acesso ao controle 'duvida' no HTML
  get duvida() {
    return this.courseForm.get('duvida');
  }

  // 3. Método chamado quando o usuário clica no botão "Enviar"
  onSubmit() {
    // Verifica se todos os campos preenchidos satisfazem as validações
    if (this.courseForm.valid) {
      const duvida = this.courseForm.value.duvida;
      
      console.log('Dados do Pedido Enviado:', duvida);

      // --- SIMULAÇÃO DE ENVIO PARA O BACKEND ---
      // Idealmente, você chamaria um Service Angular para enviar os dados
      // this.courseService.sendRequest(this.courseForm.value).subscribe(response => {
      //     // Lógica de sucesso, redirecionar para a tela de confirmação
      //     this.router.navigate(['/pedido-confirmado']); 
      // });
      
      // Mensagem de sucesso (apenas para teste)
      alert('Sua dúvida foi enviada! Nossos especialistas já estão em análise.');
      
      // Limpa o formulário após o envio
      this.courseForm.reset();
    } else {
      // Se o formulário for inválido (por exemplo, texto muito curto)
      console.error('Formulário inválido. Verifique os campos.');
      // Opcional: Forçar a exibição dos erros para o usuário
      this.courseForm.markAllAsTouched();
    }
  }
}
