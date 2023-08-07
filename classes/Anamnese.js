class Anamnese {
    constructor(data, tipoSanguineo, fatorRH, gravida,tempoQuePraticaMusculacao , praticaMusculacao, jaPraticouMusculacao, tempoQueParouDePraticarMusculacao, usaMedicamento, possuiAlergiaMedicamento, tipoCancer, lesao, comentarios, ataqueCardiaco, doencaDasValvulasCardiacas, cirurgiaCardiaca, cateterismoCardiaco, angioplastiaCoronaria, marcaPassos, desfibriladorCardiaco, disturbioDoRitmoCardiaco, insuficienciaCardiaca, cardiopatiaCongenita, transplanteDeCoracao, doencaRenal, diabetes, asma, doencaPulmonar, objetivo){
        this.data = data 
        this.tipoSanguineo = tipoSanguineo
        this.fatorRH = fatorRH
        this.gravida = gravida 
        this.praticaMusculacao = praticaMusculacao
        this.tempoQuePraticaMusculacao = tempoQuePraticaMusculacao
        this.jaPraticouMusculacao = jaPraticouMusculacao
        this.tempoQueParouDePraticarMusculacao = tempoQueParouDePraticarMusculacao
        this.usaMedicamento = usaMedicamento
        this.possuiAlergiaMedicamento = possuiAlergiaMedicamento
        this.tipoCancer = tipoCancer
        this.lesao = lesao 
        this.comentarios = comentarios 
        this.ataqueCardiaco = ataqueCardiaco
        this.doencaDasValvulasCardiacas = doencaDasValvulasCardiacas
        this.cirurgiaCardiaca = cirurgiaCardiaca
        this.cateterismoCardiaco = cateterismoCardiaco
        this.angioplastiaCoronaria = angioplastiaCoronaria
        this.marcaPassos = marcaPassos
        this.desfibriladorCardiaco = desfibriladorCardiaco
        this.disturbioDoRitmoCardiaco = disturbioDoRitmoCardiaco
        this.insuficienciaCardiaca = insuficienciaCardiaca
        this.cardiopatiaCongenita = cardiopatiaCongenita
        this.transplanteDeCoracao = transplanteDeCoracao
        this.doencaRenal = doencaRenal
        this.diabetes = diabetes
        this.asma = asma 
        this.doencaPulmonar = doencaPulmonar
        this.objetivo = objetivo
    }
    setData = (data) => this.data = data
    getData = () => {return this.data}

    setTipoSanguineo = (tipoSanguineo) => this.tipoSanguineo = tipoSanguineo
    getTipoSanguineo = () => {return this.tipoSanguineo}

    setFatorRH = (fatorRH) => this.fatorRH = fatorRH
    getFatorRH = () => {return this.fatorRH}

    setGravida = (gravida) => this.gravida = gravida
    getGravida = () => {return this.gravida}

    setTempoQuePraticaMusculacao = (tempoQuePraticaMusculacao) => this.tempoQuePraticaMusculacao = tempoQuePraticaMusculacao
    getTempoQuePraticaMusculacao = () => {return this.tempoQuePraticaMusculacao}

    setPraticaMusculacao = (praticaMusculacao) => this.praticaMusculacao = praticaMusculacao
    getPraticaMusculacao = () => {return this.praticaMusculacao}

    setJaPraticouMusculacao = (jaPraticouMusculacao) => this.jaPraticouMusculacao = jaPraticouMusculacao
    getJaPraticouMusculacao = () => {return this.jaPraticouMusculacao}

    setTempoQueParouDePraticarMusculacao = (tempoQueParouDePraticarMusculacao) => this.tempoQueParouDePraticarMusculacao = tempoQueParouDePraticarMusculacao
    getTempoQueParouDePraticarMusculacao= () => {return this.tempoQueParouDePraticarMusculacao}

    setUsaMedicamento = (usaMedicamento) => this.usaMedicamento = usaMedicamento
    getUsaMedicamento= () => {return this.usaMedicamento}

    setPossuiAlergiaMedicamento = (possuiAlergiaMedicamento) => this.possuiAlergiaMedicamento = possuiAlergiaMedicamento
    getPossuiAlergiaMedicamento = () => {return this.possuiAlergiaMedicamento}

    setTipoCancer = (tipoCancer) => this.tipoCancer = tipoCancer
    getTipoCancer = () => {return this.tipoCancer}

    setLesao = (lesao) => this.lesao = lesao
    getLesao = () => {return this.lesao}

    setComentarios = (comentarios) => this.comentarios = comentarios
    getComentarios = () => {return this.comentarios}

    setAtaqueCardiaco = (ataqueCardiaco) => this.ataqueCardiaco = ataqueCardiaco
    getAtaqueCardiaco = () => {return this.ataqueCardiaco}

    setDoencaDasValvulasCardiacas = (doencaDasValvulasCardiacas) => this.doencaDasValvulasCardiacas = doencaDasValvulasCardiacas
    getDoencaDasValvulasCardiacas = () => {return this.doencaDasValvulasCardiacas}

    setCirurgiaCardiaca = (cirurgiaCardiaca) => this.cirurgiaCardiaca = cirurgiaCardiaca
    getCirurgiaCardiaca = () => {return this.cirurgiaCardiaca}

    setCateterismoCardiaco = (cateterismoCardiaco) => this.cateterismoCardiaco = cateterismoCardiaco
    getCateterismoCardiaco = () => {return this.cateterismoCardiaco}

    setAngioplastiaCoronaria = (angioplastiaCoronaria) => this.angioplastiaCoronaria = angioplastiaCoronaria
    getAngioplastiaCoronaria = () => {return this.angioplastiaCoronaria}

    setMarcaPassos = (marcaPassos) => this.marcaPassos = marcaPassos
    getMarcaPassos = () => {return this.marcaPassos}

    setDesfibriladorCardiaco = (desfibriladorCardiaco) => this.desfibriladorCardiaco = desfibriladorCardiaco
    getDesfibriladorCardiaco = () => {return this.desfibriladorCardiaco}

    setDisturbioDoRitmoCardiaco = (disturbioDoRitmoCardiaco) => this.disturbioDoRitmoCardiaco = disturbioDoRitmoCardiaco
    getDisturbioDoRitmoCardiaco = () => {return this.disturbioDoRitmoCardiaco}

    setInsuficienciaCardiaca = (insuficienciaCardiaca) => this.insuficienciaCardiaca = insuficienciaCardiaca
    getInsuficienciaCardiaca = () => {return this.insuficienciaCardiaca}

    setCardiopatiaCongenita = (cardiopatiaCongenita) => this.cardiopatiaCongenita = cardiopatiaCongenita
    getCardiopatiaCongenita  = () => {return this.insuficienciaCardiaca}

    setTransplanteDeCoracao = (transplanteDeCoracao) => this.transplanteDeCoracao = transplanteDeCoracao
    getTransplanteDeCoracao  = () => {return this.transplanteDeCoracao}

    setDoencaRenal = (doencaRenal) => this.doencaRenal = doencaRenal
    getDoencaRenal  = () => {return this.doencaRenal}

    setDiabetes = (diabetes) => this.diabetes = diabetes
    getDiabetes  = () => {return this.diabetes}

    setAsma = (asma) => this.asma = asma
    getAsma  = () => {return this.asma}

    setDoencaPulmonar = (doencaPulmonar) => this.doencaPulmonar = doencaPulmonar
    getDoencaPulmonar  = () => {return this.doencaPulmonar}

    setObjetivo = (objetivo) => this.objetivo = objetivo
    getObjetivo  = () => {return this.objetivo}


}

export {Anamnese}