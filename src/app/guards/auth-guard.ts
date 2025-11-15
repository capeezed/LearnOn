// src/app/guards/auth.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Use o caminho correto

export const authGuard: CanActivateFn = (route, state) => {
  
  // 1. Injeta os serviços necessários
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Verifica o status de login
  if (authService.isLoggedIn()) {
    // Usuário está logado: Permite o acesso à rota
    return true;
  } else {

    console.warn('Acesso negado: Usuário não autenticado.');
    return router.createUrlTree(['/login']);
  }
};