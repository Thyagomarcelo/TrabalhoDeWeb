import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../review'
import { FormGroup } from '@angular/forms';
import { AppService } from './../app.service';
import { Jogo } from './jogo.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  review: Review;
  reviews: Review[];
  texto;
  nota: number;
  info;


  constructor(private route: ActivatedRoute, private service: AppService) { }

  ngOnInit(): void {
    this.reviews = [];
    this.getReviews();
  }

  CadastroReview(frm: FormGroup) {
    this.review = {usuario:"placeholder", jogo: this.info.nome, texto:this.texto, nota: this.nota};

    this.service.CadastroReview(this.review).subscribe(() => {
      frm.reset();
    })

    this.getReviews();

    var soma: number;
    soma = 0;

    this.reviews.forEach(Review => {
      console.log(Review.nota);
      let i = Review.nota;
      soma = soma + i;
    });

    let i: number;
    i = this.reviews.length;
    console.log("Size " + (i+1));
    this.nota = ((soma + this.nota) / (i + 1));
    console.log("Média final: " + this.nota);

    let jogo : Jogo; 
    jogo = {_id: this.info._id,
      nome: this.info.nome, 
      console: this.info.console, 
      resumo: this.info.resumo, 
      desenvolvedor:this.info. desenvolvedor, 
      genero: this.info.genero,
      nota:this.nota
    };

    console.log(jogo.nota);

    this.service.AtualizaJogo(jogo).subscribe(() => {
    });

    console.log(jogo.nota);
  }

  getReviews() {
    this.route.queryParams.subscribe((querryParams: any) => {
      this.info = querryParams;
    });
    
    this.service.GetReviewsByJogo(this.info.nome).subscribe(res => {
      this.reviews = res as Review[];
    });
  }
}
