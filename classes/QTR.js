class QTR { 
    constructor(resposta, valor){
        this.resposta = resposta
        this.valor = valor 
    }

    setResposta = (resposta) => {this.resposta = resposta}
    getResposta = () => {return this.resposta}

    setValor = (valor) => {this.valor = valor}
    getValor = () => {return this.valor}
}

export default QTR