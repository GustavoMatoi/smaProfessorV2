class ExercicioNoDiario {
    constructor (exercicioNaFicha, detalhamento){
        this.exercicioNaFicha = exercicioNaFicha; 
        this.detalhamento = detalhamento;
    }

    setExercicioNaFicha = (exercicioNaFicha) => {this.exercicioNaFicha = exercicioNaFicha}
    getExercicioNaFicha = () => {return this.exercicioNaFicha}

    setDetalhamento = (detalhamento) => {this.detalhamento = detalhamento}
    getDetalhamento = () => {return this.detalhamento}
}

export {ExercicioNoDiario}