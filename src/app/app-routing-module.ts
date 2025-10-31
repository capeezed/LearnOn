import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Cadastro} from './cadastro/cadastro';
import { CadastroProfessor } from './cadastro-professor/cadastro-professor';
import { Carrinho } from './carrinho/carrinho';
import { CursosPagina } from './cursos-pagina/cursos-pagina';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { FormCurso } from './form-curso/form-curso';
import { Avaliacoes } from './avaliacoes/avaliacoes';
import { MenuSuperior } from './menu-superior/menu-superior';
import { SobreNos } from './sobre-nos/sobre-nos';
import { Rodape } from './rodape/rodape';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { ResetPassword } from './reset-password/reset-password';

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
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


