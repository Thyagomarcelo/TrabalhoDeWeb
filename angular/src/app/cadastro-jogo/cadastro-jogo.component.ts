import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from './../app.service';

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {

  jogo: any;
  imagem: File;
  constructor(private service : AppService) { }

  ngOnInit(): void {
    this.jogo = {}
  }

  CadastroJogo(frm : FormGroup ){
    this.service.CadastroJogo(this.jogo).subscribe(() => {
      frm.reset();
      alert("Jogo cadastrado com sucesso!!!");
    })    
  }

}
