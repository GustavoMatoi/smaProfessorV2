class Pessoa{
    constructor(nome, cpf,  diaNascimento, mesNascimento, anoNascimento, telefone, sexo, email, senha){
        this.nome = nome
        this.cpf = cpf
        this.diaNascimento = diaNascimento
        this.mesNascimento = mesNascimento
        this.anoNascimento = anoNascimento
        this.telefone = telefone
        this.sexo = sexo 
        this.email = email 
        this.senha = senha
        this.endereco = null
        this.academia = null
    }

    setDiaNascimento = (diaNascimento) => {this.diaNascimento = diaNascimento}
    getDiaNascimento = () => {return this.diaNascimento}
    
    setMesNascimento = (mesNascimento) => {this.mesNascimento = mesNascimento}
    getMesNascimento = () => {return this.mesNascimento}

    setAnoNascimento = (anoNascimento) => {this.anoNascimento = anoNascimento}
    getAnoNascimento = () => {return this.anoNascimento}


    setAcademia = (academia) => {this.academia = academia}
    getAcademia = () => {return this.academia}

    setEndereco = (endereco) => {this.endereco = endereco}
    getEndereco = () => {return this.endereco}

    setNome = (nome) => this.nome = nome

    getNome = () => {return this.nome} 

    setCpf = (cpf) => this.cpf = cpf

    getCpf = () => {return this.cpf} 

    setTelefone = (telefone) => this.telefone = telefone

    getTelefone = () => {return this.telefone} 


    setSexo = (sexo) => this.sexo = sexo

    getSexo = () => {return this.sexo} 

    setEmail = (email) => this.email = email

    getEmail = () => {return this.email} 

    setSenha = (senha) => this.senha = senha

    getSenha = () => {return this.senha} 

}

export {Pessoa }