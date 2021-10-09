import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }
    public publicar(publicacao: any): void {

        console.log(publicacao);

        firebase.default.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo})
            .then((resposta: any) => {
                let nomeImagem = resposta.key

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
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar publicacoes (database)
            firebase.default.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                // console.log(snapshot.val());
                let publicacoes: Array<any> = [];

                snapshot.forEach((childSnapshot: any) => {

                    let publicacao = childSnapshot.val()

                    // consultar a url da imagem (storage)
                    firebase.default.storage().ref()
                        .child(`imagens/${childSnapshot.key}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacao.url_imagem = url
                            
                            //consultar o nome do usuario
                            firebase.default.database().ref(`usuario_detalhe${btoa(emailUsuario)}`)
                                .once('value')
                                .then((snapshot) => {
                                    publicacao.nome_usuario = snapshot.val().nome_usuario
                                    publicacoes.push(publicacao)
                                })
                        })
                })
                resolve(publicacoes);
            })
        })
    }
}