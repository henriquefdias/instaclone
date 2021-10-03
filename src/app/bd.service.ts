import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }
    public publicar(publicacao: any): void {

        console.log(publicacao);

        let nomeImagem = Date.now()
        firebase.default.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.default.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progresso.status = 'andamento'
                    this.progresso.estado = snapshot
                    // console.log(snapshot);
                },
                (error) => {
                    this.progresso.status = 'erro'
                    // console.log(error);
                },
                () => {
                    // finalização do processo
                    this.progresso.status = 'concluido'
                    // console.log("Upload completo");
                }
            )

        /*
        const DATA = fireData.getDatabase();
        let refData: any = fireData.ref(DATA, `publicacoes/${btoa(publicacao.email)}`);
        fireData.push(refData, {titulo: publicacao.titulo})
        */
    }
}