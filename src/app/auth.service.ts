import { Usuario } from "./acesso/usuario.model";

import * as firebase from "firebase";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Auth {

    public token_id: any = ''
    
    constructor(private router: Router) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        
        return firebase.default.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                // @ts-expect-error
                delete usuario.senha
                /*
                
                Não é possivel usar o delete sem o @ts-expect-error pois ele pede que o argumento (usuario.senha)
                seja opcional, mas ele nao pode ser qualquer coisa que nao seja string para que funcione corretamente 
                na função createUserWithEmailAndPassword.

                */ 
                firebase.default.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)

            }).catch((error: Error) => {
                console.log(error);
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.default.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.default.auth().currentUser?.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                    })
            })
            .catch((error: any) => console.log(error))
    }

    public autenticado(): boolean {
        if(this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined){
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }

    public sair(): void {
        firebase.default.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })
    }

}