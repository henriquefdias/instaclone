import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Imagem } from "./imagem.model";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel'

  public tempoEspera: number = 3000

  public imagens: Imagem[] = [
    { estado: 'visivel', url: '../../../assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), this.tempoEspera);
  }

  public logicaRotacao(): void {

    //auxilia na exibição da imagem seguinte
    let idx: number = 0;

    //ocultar
    for(let i: number = 0; i <= 4; i++) {
      if(this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'
        idx = i === 4 ? 0 : i + 1;
        break
      }
    }

    //exibir a proxima
    this.imagens[idx].estado = 'visivel'

    setTimeout(() => this.logicaRotacao(), this.tempoEspera);
  }

}
