import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jogo } from './Review/jogo.model';
import { Review } from './review'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  Url = 'http://localhost:3000';

  constructor( private http : HttpClient ) {}

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  Cadastro(cadastro:any){
    console.log(JSON.stringify(cadastro));
    return this.http.post(this.Url + '/user' , cadastro)
  }

  CadastroJogo(jogo: any){
    console.log(JSON.stringify(jogo));
    return this.http.post(this.Url + '/jogos', jogo)
  }

  CadastroReview(review: any){
    console.log(JSON.stringify(review));
    return this.http.post(this.Url + '/review', review)
  }

  AtualizaJogo(jogo : any){
    return this.http.put(this.Url+'/jogos/'+ jogo._id , jogo);
  }

  GetJogos(){
    return this.http.get(this.Url + '/jogos')
  }

  GetJogosByNome(nome: string){
    return this.http.get(this.Url + '/jogos/n/' + nome)
  }

  GetReviews(){
    return this.http.get(this.Url + '/review')
  }

  GetReviewsByJogo(jogo: string){
    return this.http.get(this.Url + '/review/' + jogo)
  }

  GetJogosPlaystation(){
    return this.http.get(this.Url + '/jogos/Playstation')
  }

  GetJogosXbox(){
    return this.http.get(this.Url + '/jogos/Xbox')
  }

  GetJogosPC(){
    return this.http.get(this.Url + '/jogos/PC')
  }

  GetJogosNintendo(){
    return this.http.get(this.Url + '/jogos/Nintendo')
  }

  ValidarLogin(){

  }
}
