class Exercicio {
    constructor (nome, tipo){
        this.nome = nome
        this.tipo = tipo
    }

    setNome = (nome) => {this.nome = nome}
    getNome = () => {return this.nome}
    
    setTipo = (tipo) => {this.tipo = tipo}
    getTipo = () => {return this.tipo}
    
}

export {Exercicio}