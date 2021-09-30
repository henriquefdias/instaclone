import * as firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        console.log(publicacao);

        let nomeImagem = Date.now()
        firebase.default.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)

        /*
        const DATA = fireData.getDatabase();
        let refData: any = fireData.ref(DATA, `publicacoes/${btoa(publicacao.email)}`);
        fireData.push(refData, {titulo: publicacao.titulo})
        */
    }
}