import * as firebase from '@firebase/app';

// import Firebase Authentication (optional)
import * as fireAuth from '@firebase/auth';

// import Firebase Realtime Database (optional)
import * as fireData from '@firebase/database';

// import Cloud Firestore (optional)
import * as fireStore from '@firebase/firestore';

export class Bd {
    public publicar(publicacao: any): void {

        const DATA = fireData.getDatabase();
        let refData: any = fireData.ref(DATA, `publicacoes/${btoa(publicacao.email)}`);
        fireData.push(refData, {titulo: publicacao.titulo})


        console.log("Chegou no serviço bd");
    }
}