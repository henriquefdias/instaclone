import { Usuario } from "./acesso/usuario.model";
import * as firebase from '@firebase/app';

// import Firebase Authentication (optional)
import * as fireAuth from '@firebase/auth';

// import Firebase Realtime Database (optional)
import * as fireData from '@firebase/database';

// import Cloud Firestore (optional)
import * as fireStore from '@firebase/firestore';

export class Auth {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('Chegou no serviço: ', usuario);
        const auth = fireAuth.getAuth();
        const data = fireData.getDatabase();
        fireAuth.createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
            .then((resposta: any) => {
                
                delete usuario.senha
                
                fireData.ref(data, `usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)

            }).catch((error: Error) => {
                console.log(error);
            });
    }
}