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
  styleUrl: './sobre-nos.css'
})
export class SobreNos {

  membrosEquipe: MembrosEquipe[] = [
    {
      nome: 'Danielle Namie Yoshimura',
      cargo: ['Gestor do Projeto', 'Scrum Master', 'Analista de BI'],
      imageUrl: 'assets/img/team/membro1.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      nome: 'Gabriel Capelini de Oliveira',
      cargo: ['Dev Back-End', 'Analista de Viabilidade', 'Especialista em Deploy'],
      imageUrl: 'assets/img/team/membro2.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      nome: 'Julia Moraes Martins',
      cargo: ['Designer', 'Analista de Requisitos', 'Product Owner', 'Consultora de Usabilidade'],
      imageUrl: 'assets/img/team/membro3.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      nome: 'Nome Membro 4 (4 Roles)',
      cargo: ['Dev Front-End', 'Engenheira de Testes', 'Analista de Suporte'],
      imageUrl: 'assets/img/team/membro4.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    }
  ];

}
