import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string[];
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

    teamMembers: TeamMember[] = [
    {
      name: 'Danielle Namie Yoshimura',
      role: ['Gestor do Projeto', 'Scrum Master', 'Analista de BI'],
      imageUrl: 'assets/img/team/membro1.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      name: 'Gabriel Capelini de Oliveira',
      role: ['Dev Back-End', 'Analista de Viabilidade', 'Especialista em Deploy'],
      imageUrl: 'assets/img/team/membro2.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      name: 'Júlia Moraes Martins',
      role: ['Designer', 'Analista de Requisitos', 'Product Owner', 'Consultora de Usabilidade'],
      imageUrl: 'assets/img/team/membro3.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    },
    {
      name: 'Melissa Yukari Kato',
      role: ['Dev Front-End', 'Engenheira de Testes', 'Analista de Suporte'],
      imageUrl: 'assets/img/team/membro4.png',
      linkedinUrl: 'https://linkedin.com/in/...',
      githubUrl: 'https://github.com/...'
    }
  ];

}
