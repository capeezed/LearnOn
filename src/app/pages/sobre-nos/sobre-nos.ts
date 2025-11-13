import { Component } from '@angular/core';

interface MembrosEquipe {
  nome: string;
  cargo: string[];
  imageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

@Component({
  selector: 'app-sobre-nos',
  standalone: false,
  templateUrl: './sobre-nos.html',
  styleUrls: ['./sobre-nos.css']
})
export class SobreNos {
  membrosEquipe: MembrosEquipe[] = [
    {
      nome: 'Danielle Namie Yoshimura',
      cargo: ['Gestor do Projeto', 'Scrum Master', 'Analista de BI'],
      imageUrl: 'assets/dani.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/danielle-yoshimura',
      githubUrl: 'https://github.com/DanielleNamie'
    },
    {
      nome: 'Gabriel Capelini de Oliveira',
      cargo: ['Dev Back-End', 'Analista de Viabilidade', 'Especialista em Deploy'],
      imageUrl: 'assets/gabriel.jpg',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/capeezed'
    },
    {
      nome: 'Julia Moraes Martins',
      cargo: ['Designer', 'Analista de Requisitos', 'Product Owner', 'Consultora de Usabilidade'],
      imageUrl: 'assets/img/team/membro3.png',
      linkedinUrl: 'https://www.linkedin.com/in/julia-moraes-m',
      githubUrl: 'https://github.com/JuliaMoraesM'
    },
    {
      nome: 'Melissa Yukari Kato',
      cargo: ['Dev Front-End', 'Engenheira de Testes', 'Analista de Suporte'],
      imageUrl: 'assets/img/team/membro4.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/yukari4u'
    }
  ];
}
