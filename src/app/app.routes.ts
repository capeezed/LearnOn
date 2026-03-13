import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { PedirCurso } from './pages/pedir-curso/pedir-curso';
import { MeusCursos } from './pages/meus-cursos/meus-cursos';
import { Curso } from './pages/curso/curso';
import { Agenda } from './pages/agenda/agenda';
import { InstrutorLogin } from './pages/instrutor-login/instrutor-login';
import { InstrutorPainel }from './pages/instrutor-painel/instrutor-painel';
import { InstrutorCadastro } from './pages/instrutor-cadastro/instrutor-cadastro';
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
  { path: 'instrutor/login', component: InstrutorLogin },
  { path: 'instrutor/painel', component: InstrutorPainel },
  { path: 'instrutor/cadastro', component: InstrutorCadastro },
  { path: 'agenda',      component: Agenda },
];