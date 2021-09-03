import { Usuario } from "./acesso/usuario.model";

export class Auth {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('Chegou no serviço: ', usuario);
    }
}