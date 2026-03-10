import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { PedirCurso } from './pages/pedir-curso/pedir-curso';
import { MeusCursos } from './pages/meus-cursos/meus-cursos';
import { Curso } from './pages/curso/curso';
import { Agenda } from './pages/agenda/agenda';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '',            redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',         component: Home },
  { path: 'login',       component: Login },
  { path: 'cadastro',    component: Cadastro },
  { path: 'dashboard',   component: Dashboard },
  { path: 'pedir-curso', component: PedirCurso },
  { path: 'meus-cursos', component: MeusCursos },
  { path: 'curso/:id',   component: Curso },
  { path: 'agenda',      component: Agenda },
];