import * as firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        console.log(publicacao);

        let nomeImagem = Date.now()
        firebase.default.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.default.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // finalização do processo
                    console.log("Upload completo");
                }
            )

        /*
        const DATA = fireData.getDatabase();
        let refData: any = fireData.ref(DATA, `publicacoes/${btoa(publicacao.email)}`);
        fireData.push(refData, {titulo: publicacao.titulo})
        */
    }
}