import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  standalone: false,
  templateUrl: './rodape.html',
  styleUrl: './rodape.css'
})

export class Rodape {
  onSubmit() {
    // Implemente aqui a lógica para enviar o e-mail
    // para um serviço ou API.
    console.log('E-mail enviado para inscrição na newsletter!');
    alert('Obrigado por se inscrever! Fique ligado nas nossas ofertas.');

    // Idealmente, você chamaria um Service aqui:
    // this.newsletterService.subscribe(emailData).subscribe(...);
  }
}