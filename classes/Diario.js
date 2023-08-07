class Diario {
    constructor (dia, mes, ano, inicioDoTreino, fimDoTreino, duracao){
        this.dia = dia
        this.mes = mes 
        this.ano = ano
        this.inicioDoTreino = inicioDoTreino;
        this.fimDoTreino = fimDoTreino;
        this.qtr = null;
        this.pse = null;
        this.exerciciosNaFicha = [];
    }

    setDia = (dia) => {this.dia = dia}
    getDia = () => {return this.dia}

    setMes = (mes) => {this.mes = mes}
    getMes = () => {return this.mes}

    setAno = (ano) => {this.ano = ano}
    getAno = () => {return this.ano}

    setInicioDoTreino = (inicioDoTreino) => {this.inicioDoTreino = inicioDoTreino}
    getInicioDoTreino = () => {return this.inicioDoTreino}

    setFimDoTreino = (fimDoTreino) => {this.fimDoTreino = fimDoTreino}
    getFimDoTreino = () => {return this.fimDoTreino}

    addExerciciosNaFicha = (exercicioNaFicha) => {this.exerciciosNaFicha.push(exercicioNaFicha)}
    removeExerciciosNaFicha = (exercicioNaFicha) => {
        return this.exerciciosNaFicha.filter((element) => element !== exercicioNaFicha);
    }
    getExercicios = () => {return this.exerciciosNaFicha}


}


export {Diario}