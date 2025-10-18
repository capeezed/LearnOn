import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Cadastro} from './cadastro/cadastro';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { FormCurso } from './form-curso/form-curso';
import { Avaliacoes } from './avaliacoes/avaliacoes';
import { MenuSuperior } from './menu-superior/menu-superior';
import { Rodape } from './rodape/rodape';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro},
  { path: 'esqueci-senha', component: EsqueciSenha },
  { path: 'form-curso', component: FormCurso },
  { path: 'avaliacoes', component: Avaliacoes },
  { path: 'menu-superior', component: MenuSuperior },
  { path: 'rodape', component: Rodape },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


