// src/app/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Use o caminho correto

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  userName: string | null = null;
  userType: string | null = null; // Para verificar se é 'aluno' ou 'especialista'

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Busca o nome do usuário assim que o componente é carregado
    this.userName = this.authService.getUserName();
    
    // Supondo que você adicionou um método para pegar o tipo de usuário no AuthService
    // this.userType = this.authService.getUserType(); 
  }

  logout() {
    this.authService.logout();
  }
}