import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Home } from './home/home';
import { MenuSuperior } from './menu-superior/menu-superior';
import { Rodape } from './rodape/rodape';
import { FormCurso } from './form-curso/form-curso';
import { Avaliacoes } from './avaliacoes/avaliacoes';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Dashboard } from './dashboard/dashboard';
import { RedefinicaoSenha } from './redefinicao-senha/redefinicao-senha';

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
    RedefinicaoSenha
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
