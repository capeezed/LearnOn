import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro} from './pages/cadastro/cadastro';
import { CadastroProfessor } from './pages/cadastro-professor/cadastro-professor';
import { Carrinho } from './pages/carrinho/carrinho';
import { CursosPagina } from './pages/cursos-pagina/cursos-pagina';
import { EsqueciSenha } from './pages/esqueci-senha/esqueci-senha';
import { FormCurso } from './pages/form-curso/form-curso';
import { Avaliacoes } from './pages/avaliacoes/avaliacoes';
import { MenuSuperior } from './pages/menu-superior/menu-superior';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
import { Rodape } from './pages/rodape/rodape';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { ResetPassword } from './pages/reset-password/reset-password';
import { DashboardProfessor } from './pages/dashboard-professor/dashboard-professor'
import { profGuard } from './guards/prof-guard.ts-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro},
  { path: 'cadastro-professor', component: CadastroProfessor },
  { path: 'carrinho', component: Carrinho },
  { path: 'cursos', component: CursosPagina },
  { path: 'esqueci-senha', component: EsqueciSenha },
  { path: 'redefinir-senha/:token', component: ResetPassword},
  { path: 'form-curso', component: FormCurso },
  { path: 'avaliacoes', component: Avaliacoes },
  { path: 'menu-superior', component: MenuSuperior },
  { path: 'sobre-nos', component: SobreNos },
  { path: 'rodape', component: Rodape },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard-professor', component: DashboardProfessor, canActivate: [profGuard]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


