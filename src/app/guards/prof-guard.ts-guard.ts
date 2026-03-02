import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const profGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Permite apenas se logado e tipo = 'professor'
  if (authService.isLoggedIn() && authService.getUserType() === 'aluno') {
    return true;
  }
  // Redireciona para login se não for professor
  return router.createUrlTree(['/login']);
};
