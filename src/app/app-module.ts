import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Home } from './pages/home/home';
import { MenuSuperior } from './pages/menu-superior/menu-superior';
import { Rodape } from './pages/rodape/rodape';
import { FormCurso } from './pages/form-curso/form-curso';
import { Avaliacoes } from './pages/avaliacoes/avaliacoes';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { EsqueciSenha } from './pages/esqueci-senha/esqueci-senha';
import { Dashboard } from './pages/dashboard/dashboard';
import { CursosCard } from './pages/cursos-card/cursos-card';
import { CursosPagina } from './pages/cursos-pagina/cursos-pagina';
import { Carrinho } from './pages/carrinho/carrinho';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
import { CadastroProfessor } from './pages/cadastro-professor/cadastro-professor';
import { ResetPassword } from './pages/reset-password/reset-password';
import { DashboardProfessor } from './pages/dashboard-professor/dashboard-professor';

@NgModule({
  declarations: [
    App,
    Home,
    MenuSuperior,
    Rodape,
    FormCurso,
    Avaliacoes,
    Login,
    Cadastro,
    EsqueciSenha,
    Dashboard,
    CursosCard,
    CursosPagina,
    Carrinho,
    SobreNos,
    CadastroProfessor,
    ResetPassword,
    DashboardProfessor,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
