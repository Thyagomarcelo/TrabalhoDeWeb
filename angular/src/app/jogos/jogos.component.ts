import { Component, OnInit } from '@angular/core';
import { Jogo } from '../Review/jogo.model';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit {

  jogos : Array<Jogo>;
  jogosXbox : Array<Jogo>;
  jogosPC : Array<Jogo>;
  jogosPlaystation : Array<Jogo>;
  jogosNintendo : Array<Jogo>;
  escolha : any;
  pesquisa : any;

  constructor(private Service : AppService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getJogos()
    this.route.queryParams.subscribe(
      (querryParams : any) => {
        this.escolha = querryParams
        console.log(this.escolha.console)
      } 
    )
  }

  getJogos(){
    this.Service.GetJogos().subscribe((jogos : Jogo[]) => {
      this.jogos = jogos
      this.jogos = this.ordena(this.jogos);
    });
    this.Service.GetJogosPlaystation().subscribe((jogos : Jogo[]) => {
      this.jogosPlaystation = jogos
      this.jogosPlaystation = this.ordena(this.jogosPlaystation);
    });
    this.Service.GetJogosPC().subscribe((jogos : Jogo[]) => {
      this.jogosPC = jogos
      this.jogosPC = this.ordena(this.jogosPC);
    });
    this.Service.GetJogosXbox().subscribe((jogos : Jogo[]) => {
      this.jogosXbox = jogos
      this.jogosXbox = this.ordena(this.jogosXbox);
    });
    this.Service.GetJogosNintendo().subscribe((jogos : Jogo[]) => {
      this.jogosNintendo = jogos
      this.jogosNintendo = this.ordena(this.jogosNintendo);
    });

    console.log(this.jogos);
    console.log(this.jogosPlaystation);
    console.log(this.jogosXbox);
    console.log(this.jogosNintendo);
  }

  ordena(top: Jogo[]){
    top.sort(function compare(a , b){
      return a.nota < b.nota ? -1 : a.nota > b.nota ? 1 : 0;
    });
    top.reverse();
    return top;
  }

}
