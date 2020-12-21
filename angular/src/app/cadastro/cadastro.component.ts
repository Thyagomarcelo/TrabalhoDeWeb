import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastro: any;

  constructor(private service : AppService, private router: Router) { }

  ngOnInit(): void {
    this.cadastro = {};
  }

  Cadastro(frm: FormGroup){
    
    this.service.Cadastro(this.cadastro).subscribe(() => {
      alert("Usuário cadastrado com sucesso!");
      frm.reset();
      this.router.navigate(['/home']);
    })
    
    
  }

}
