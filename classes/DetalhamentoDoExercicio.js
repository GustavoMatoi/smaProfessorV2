class Detalhamento {
    constructor(){

    }
}

class DetalhamentoExercicioAerobico extends Detalhamento {
    constructor(series){
        super()
        this.series = series
        this.velocidades = []
        this.duracoes = []
        this.descansos = []
        this.pseBorgs = []
    }

    setSeries = (series) => {this.series = series}
    getSeries = () => {return this.series}
 
    addVelocidades = (velocidade) => {this.velocidades.push(velocidade)}
    getVelocidades = () => {return this.velocidades}

    addDuracoes = (duracao) => {this.duracoes.push(duracao)}
    getDucaroes = () => {return this.duracoes}

    addDescansos = (descanso) => {this.descansos.push(descanso)}
    getDescansos = () => {return this.descansos}

    addPSEBorgs= (pseBorg) => {this.pseBorgs.push(pseBorg)}
    getPSEBorgs = () => {return this.pseBorgs}
}

class DetalhamentoExercicioAlongamento extends Detalhamento {
    constructor(series){
        super()
        this.series = series
        this.repeticoes = []
        this.duracao = []
        this.descanso = []
        this.perflexs = []
    }

    setSeries = (series) => {this.series = series}
    getSeries = () => {return this.series}

    addRepeticoes = (repeticoes) => {this.repeticoes.push(repeticoes)}
    getRepeticoes = () => {return this.repeticoes}
 
    addDuracao = (duracao) => {this.duracao.push(duracao)}
    getDuracao = () => {return this.duracao}
 
    addDescanso = (descanso) => {this.descanso.push(descanso)}
    getDescanso = () => {return this.descanso}
}

class DetalhamentoExercicioForca extends Detalhamento {
    constructor(series){
        super()
        this.series = series
        this.pesoLevantado = []
        this.repeticoes = []
        this.pseOmnis = []
    }

    preenchePSEOmni = (resposta) => { this.pseOmnis.push(resposta)}

    setSeries = (series) => {this.series = series}
    getSeries = () => {return this.series}
 
    addPesoLevantado = (pesoLevantado) => {this.pesoLevantado.push(pesoLevantado)}
    getPesoLevantado = () => {return this.pesoLevantado}
 
    addRepeticoes = (repeticoes) => {this.repeticoes.push(repeticoes)}
    getRepeticoes = () => {return this.repeticoes}
}

export {DetalhamentoExercicioAerobico, DetalhamentoExercicioAlongamento, DetalhamentoExercicioForca}