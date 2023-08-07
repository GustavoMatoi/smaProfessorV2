class Parq {
    constructor(respostaDoencaCardiaca, respostaDorNoPeito, respostaDorNoPeitoUltimoMes, respostaPercaEquilibrio, respostaProblemaOsseo, respostaMedicamentoPressaoArterial, respostaUltimaPergunta){
            this.respostaDoencaCardiaca = respostaDoencaCardiaca
            this.respostaDorNoPeito = respostaDorNoPeito
            this.respostaDorNoPeitoUltimoMes = respostaDorNoPeitoUltimoMes
            this.respostaPercaEquilibrio = respostaPercaEquilibrio
            this.respostaProblemaOsseo = respostaProblemaOsseo
            this.respostaMedicamentoPressaoArterial = respostaMedicamentoPressaoArterial
            this.respostaUltimaPergunta = respostaUltimaPergunta
    }

    setRespostaDoencaCardiaca = (respostaDoencaCardiaca) => { this.respostaDoencaCardiaca = respostaDoencaCardiaca}
    getRespostaDoencaCardiaca = () => {return this.respostaDoencaCardiaca}

    setRespostaDorNoPeito = (respostaDorNoPeito) => { this.respostaDorNoPeito = respostaDorNoPeito}
    getRespostaDorNoPeito = () => {return this.respostaDorNoPeito}

    setRespostaDorNoPeitoUltimoMes = (respostaDorNoPeitoUltimoMes) => { this.respostaDorNoPeitoUltimoMes = respostaDorNoPeitoUltimoMes}
    getRespostaDorNoPeitoUltimoMes = () => {return this.respostaDorNoPeitoUltimoMes}

    setRespostaPercaEquilibrio = (respostaPercaEquilibrio) => { this.respostaPercaEquilibrio = respostaPercaEquilibrio}
    getRespostaPercaEquilibrio = () => {return this.respostaPercaEquilibrio}

    setRespostaProblemaOsseo = (respostaProblemaOsseo) => { this.respostaProblemaOsseo = respostaProblemaOsseo}
    getRespostaProblemaOsseo = () => {return this.respostaProblemaOsseo}

    setRespostaMedicamentoPressaoArterial = (respostaMedicamentoPressaoArterial) => { this.respostaMedicamentoPressaoArterial = respostaMedicamentoPressaoArterial}
    getRespostaMedicamentoPressaoArterial = () => {return this.respostaMedicamentoPressaoArterial}

    setRespostaUltimaPergunta = (respostaUltimaPergunta) => { this.respostaUltimaPergunta = respostaUltimaPergunta}
    getRespostaUltimaPergunta = () => {return this.respostaUltimaPergunta}

}

export {Parq}