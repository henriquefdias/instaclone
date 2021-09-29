import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Bd } from '../../bd.service';
import * as fireAuth from '@firebase/auth';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: any = ''

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(): void {
    const AUTH = fireAuth.getAuth();
    fireAuth.onAuthStateChanged(AUTH, (user) => {
      this.email = user?.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
    })
  }

  public preparaImagemUpload(event: Event): void {
    console.log((<HTMLInputElement>event.target).files);
  }

}
