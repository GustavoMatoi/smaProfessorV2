import { Professor } from "./Professor";

class Coordenador extends Professor {
    constructor(nome, cpf, dataNascimento, telefone, sexo, email, senha){
        super(nome, cpf, dataNascimento, telefone, sexo, email, senha)
    }
}

export {Coordenador}