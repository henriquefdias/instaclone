import { Usuario } from "./acesso/usuario.model";
import * as firebase from '@firebase/app';

// import Firebase Authentication (optional)
import * as fireAuth from '@firebase/auth';

// import Firebase Realtime Database (optional)
import * as fireData from '@firebase/database';

// import Cloud Firestore (optional)
import * as fireStore from '@firebase/firestore';

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Auth {

    public tokenId: string = ''
    
    constructor(private router: Router) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('Chegou no serviço: ', usuario);
        const AUTH = fireAuth.getAuth();
        const DATA = fireData.getDatabase();
        
        return fireAuth.createUserWithEmailAndPassword(AUTH, usuario.email, usuario.senha)
            .then((resposta: any) => {

                // @ts-expect-error
                delete usuario.senha
                /*
                
                Não é possivel usar o delete sem o @ts-expect-error pois ele pede que o argumento (usuario.senha)
                seja opcional, mas ele nao pode ser qualquer coisa que nao seja string para que funcione corretamente 
                na função createUserWithEmailAndPassword.

                */ 

                let refData: any = fireData.ref(DATA, `usuario_detalhe/${btoa(usuario.email)}`)
                fireData.set(refData, usuario)

            }).catch((error: Error) => {
                console.log(error);
            });
    }

    public autenticar(email: string, senha: string): void {
        const AUTHLOGIN = fireAuth.getAuth();
        fireAuth.signInWithEmailAndPassword(AUTHLOGIN, email, senha)
            .then((resposta: any) => {
                // @ts-expect-error
                let user: fireAuth.User = AUTHLOGIN.currentUser;
                fireAuth.getIdToken(user)
                    .then((id_token: string) => {
                        this.tokenId = id_token
                        this.router.navigate(['/home'])
                    })
            })
            .catch((error: any) => console.log(error))
    }
}