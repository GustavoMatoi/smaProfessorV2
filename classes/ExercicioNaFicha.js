class ExercicioNaFicha {
    constructor(exercicio, fichaDeExercicios, conjugado){
        this.exercicio = exercicio 
        this.fichaDeExercicios = fichaDeExercicios
        this.repeticoes = null
        this.series = null 
        this.descanso = null
        this.velocidade = null
        this.duracao = null
        this.conjugado = false
    }

    setExercicio = (exercicio) => {this.exercicio = exercicio}
    getExercicio = () => {return this.exercicio}

    setFichaDeExercicio = (fichaDeExercicio) => {this.fichaDeExercicio = fichaDeExercicio}
    getFichaDeExercicios = () => {return this.fichaDeExercicio}

    setRepeticoes = (repeticoes) => {this.repeticoes = repeticoes}
    getRepeticoes = () => {return this.repeticoes}

    setSeries = (series) => {this.series = series}
    getSeries = () => {return this.series}

    setDescanso = (descanso) => {this.descanso = descanso}
    getDescanso = ()=> { return this.descanso}

    setVelocidade = (velocidade) => {this.velocidade = velocidade}
    getVelocidade = () => {return this.velocidade}

    setDuracao = (duracao) => {this.duracao = duracao}
    getDuracao = () => {return this.duracao}

    setConjugado = (exercicioConjugado) => {this.conjugado = exercicioConjugado}
    getConjugado = () => {return this.conjugado}
}

export {ExercicioNaFicha}