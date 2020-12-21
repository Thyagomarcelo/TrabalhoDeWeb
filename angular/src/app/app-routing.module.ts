import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { CadastroComponent } from './cadastro/cadastro.component'
import { JogosComponent } from './jogos/jogos.component'
import { JogoComponent } from './Review/jogo.component' 
import { CadastroJogoComponent } from './cadastro-jogo/cadastro-jogo.component'
import { ConsultaComponent } from './consulta/consulta.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'jogos', component : JogosComponent },
  { path: 'jogo', component : JogoComponent },
  { path: 'CadastroJogo', component : CadastroJogoComponent},
  { path: 'Consulta', component : ConsultaComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
