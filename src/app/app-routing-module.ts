import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importações de Componentes
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
import { RedefinicaoSenha } from './redefinicao-senha/redefinicao-senha';
import { CursosPagina } from './cursos-pagina/cursos-pagina';


const routes: Routes = [
  // 1. ROTAS ESPECÍFICAS DE AUTENTICAÇÃO E ÁREAS RESTRITAS (prioridade máxima)
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro},
  { path: 'esqueci-senha', component: EsqueciSenha },

  // ROTA CRÍTICA: DEVE SER VERIFICADA ANTES DA ROTA PADRÃO
  // Corrigida para manter a prioridade e casar com o link do e-mail.
  { path: 'redefinir-senha/:token', component: RedefinicaoSenha },
  
  // ROTA PROTEGIDA: Deve vir antes das rotas gerais
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  // ROTAS GERAIS E COMPONENTES DE LAYOUT (Mantidos)
  { path: 'home', component: Home },
  { path: 'form-curso', component: FormCurso },
  { path: 'avaliacoes', component: Avaliacoes },
  { path: 'cursos', component: CursosPagina},
  
  // 🚨 RECOMENDAÇÃO: Rotas de componentes de layout não devem ser acessadas diretamente
  // As rotas de MenuSuperior e Rodape foram removidas, pois são componentes de layout.
  // Se for uma página completa, mantenha-a. Se for um componente de UI, remova.
  
  // 2. ROTA PADRÃO (SEMPRE POR ÚLTIMO)
  // Se a URL estiver vazia, redireciona para /home.
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // 3. ROTA CATCH-ALL (DEVE SER A ÚLTIMA DE TODAS)
  // Se nada mais bater, redireciona para a home.
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }