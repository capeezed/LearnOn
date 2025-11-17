import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  standalone: false,
  templateUrl: './rodape.html',
  styleUrl: './rodape.css'
})

export class Rodape {
  onSubmit() {
    console.log('E-mail enviado para inscrição na newsletter!');
    alert('Obrigado por se inscrever! Fique ligado nas nossas ofertas.');

  }
}
