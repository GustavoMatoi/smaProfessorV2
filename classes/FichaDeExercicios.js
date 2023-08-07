class FichaDeExercicios {
    constructor(dataInicio, dataFim, objetivo){
        this.responsavel = null 
        this.dataInicio = dataInicio 
        this.dataFim = dataFim
        this.objetivo = objetivo
        this.exercicios = []
    }

    setResponsavel = (responsavel) => {this.responsavel = responsavel}
    getResponsavel = () => {return this.responsavel}

    setDataInicio = (dataInicio) => {this.dataInicio = dataInicio}
    getDataInicio = () => {return this.dataInicio}
  
    setDataFim = (dataFim) => {this.dataFim = dataFim}
    getDataFim = () => {return this.dataFim}

    setObjetivo = (objetivo) => {this.objetivo = objetivo}
    getObjetivo = () => {return this.objetivo}

    addExercicio = (exercicio) => { this.exercicios.push(exercicio)}
    removerExercicio(exercicio) {
        const index = this.exercicios.indexOf(exercicio);
        if (index !== -1) {
          this.exercicios.splice(index, 1);
        }
    }
    
    getExercicios = () => {return this.exercicios}
}

export {FichaDeExercicios}