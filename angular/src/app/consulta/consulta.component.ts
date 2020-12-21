import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jogo } from '../Review/jogo.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pesquisa : any;
  jogosXbox : Array<Jogo>;
  jogosPC : Array<Jogo>;
  jogosPlaystation : Array<Jogo>;
  jogosNintendo : Array<Jogo>;
  search : any;

  constructor( private route : ActivatedRoute, private Service : AppService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (querryParams : any) => {
        this.pesquisa = querryParams;
        console.log(this.pesquisa.console)
      } 
    )
    this.getJogos();
  }
  getJogos(){
  this.Service.GetJogosPlaystation().subscribe((jogos : Jogo[]) => {
    this.jogosPlaystation = jogos
  });
  this.Service.GetJogosPC().subscribe((jogos : Jogo[]) => {
    this.jogosPC = jogos
  });
  this.Service.GetJogosXbox().subscribe((jogos : Jogo[]) => {
    this.jogosXbox = jogos
  });
  this.Service.GetJogosNintendo().subscribe((jogos : Jogo[]) => {
    this.jogosNintendo = jogos
  });
}

}
