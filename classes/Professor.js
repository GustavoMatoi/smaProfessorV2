import {Pessoa} from './Pessoa'
class Professor  extends Pessoa{
    constructor(nome, cpf, dataNascimento, telefone, sexo, email, senha){
    super(nome, cpf, dataNascimento, telefone, sexo, email, senha)
    this.alunos = []
    }
    setDataNascimento = (dataNascimento) => {this.dataNascimento = dataNascimento}
    getDataNascimento = () => {return this.dataNascimento}
    setProfissao = (Profissao) => {this.Profissao = Profissao}
    getProfissao = () => {return this.Profissao}
    addAluno = (aluno) => {
        this.alunos.push(aluno)
    }

    getDeletado = () => {return this.deletado}
    setDeletado = (deletado) => {this.deletado = deletado}
}
export {Professor}