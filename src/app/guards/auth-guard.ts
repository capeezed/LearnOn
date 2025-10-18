// src/app/guards/auth.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth'; // Use o caminho correto

export const authGuard: CanActivateFn = (route, state) => {
  
  // 1. Injeta os serviços necessários
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Verifica o status de login
  if (authService.isLoggedIn()) {
    // Usuário está logado: Permite o acesso à rota
    return true;
  } else {
    // Usuário NÃO está logado:
    // Exibe mensagem no console e redireciona para a página de login
    console.warn('Acesso negado: Usuário não autenticado.');
    
    // Redireciona para a página de login
    // Usamos o UrlTree para redirecionar programaticamente
    return router.createUrlTree(['/login']);
  }
};