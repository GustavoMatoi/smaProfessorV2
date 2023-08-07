class Endereco {
    constructor(estado, cidade, rua, numero, cep, bairro, complemento){
        this.estado = estado
        this.cidade = cidade
        this.rua = rua 
        this.numero = numero 
        this.cep = cep
        this.complemento = complemento
    }

    setBairro = (bairro) => {this.bairro = bairro }
    getBairro = () => {return this.bairro}

    setEstado = (estado) => {this.estado = estado }
    getEstado = () => {return this.estado}

    setCidade = (cidade) => {this.cidade = cidade }
    getCidade = () => {return this.cidade}

    setRua = (rua) => {this.rua = rua }
    getRua = () => {return this.rua}

    setNumero = (numero) => {this.numero = numero }
    getNumero = () => {return this.numero}

    setCep = (cep) => {this.cep = cep }
    getCep = () => {return this.cep}

    setComplemento = (complemento) => {this.complemento = complemento }
    getComplemento = () => {return this.complemento}
}

export {Endereco}