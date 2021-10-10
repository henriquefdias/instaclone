import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: any
  public publicacoes: any
  

  constructor(private bd: Bd) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((user) => {
      this.email = user?.email
      this.atualizarTimeline()
    })
  }

  public atualizarTimeline(): void {
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
        console.log(this.publicacoes);
      })
  }
}
