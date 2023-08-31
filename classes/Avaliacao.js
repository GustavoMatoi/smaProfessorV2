    const Data = new Date()

function setHora(){
    return `${Data.getHours()}:${Data.getMinutes()}`
}


class Avaliacao {
    constructor(dia, mes, ano, massaCorporal, estatura, bracoRelaxadoMedida1, bracoRelaxadoMedida2, bracoRelaxadoMedida3, bracoContraidoMedida1, bracoContraidoMedida2, bracoContraidoMedida3, cinturaMedida1, cinturaMedida2, cinturaMedida3, abdomenMedida1, abdomenMedida2, abdomenMedida3, quadrilMedida1, quadrilMedida2, quadrilMedida3, coxaMedida1, coxaMedida2, coxaMedida3, pernaMedida1, pernaMedida2, pernaMedida3, DCPeitoralMedida1, DCPeitoralMedida2, DCPeitoralMedida3, DCabdomenMedida1, DCabdomenMedida2, DCabdomenMedida3, DCcoxaMedida1, DCcoxaMedida2, DCcoxaMedida3, DCtricepsMedida1, DCtricepsMedida2, DCtricepsMedida3, DCcristailiacaMedida1, DCcristailiacaMedida2, DCcristailiacaMedida3, testeSentarAlcancarMedida1, testeSentarAlcancarMedida2, testeSentarAlcancarMedida3, testeDinamometriaPernasMedida1, testeDinamometriaPernasMedida2, testeDinamometriaPernasMedida3, testeResistenciaAbdominal, frequenciaCardiacaDeRepouso, pressaoSistolica, pressaoDiastolica, pressaoArterial){
        this.horario = setHora()
        this.dia = dia
        this.mes = mes
        this.ano = ano
        this.massaCorporal = massaCorporal
        this.estatura = estatura
        this.bracoRelaxadoMedida1 = bracoRelaxadoMedida1
        this.bracoRelaxadoMedida2 = bracoRelaxadoMedida2
        this.bracoRelaxadoMedida3 = bracoRelaxadoMedida3
        this.bracoContraidoMedida1 = bracoContraidoMedida1
        this.bracoContraidoMedida2 = bracoContraidoMedida2 
        this.bracoContraidoMedida3 = bracoContraidoMedida3
        this.cinturaMedida1 = cinturaMedida1
        this.cinturaMedida2 = cinturaMedida2 
        this.cinturaMedida3 = cinturaMedida3 
        this.abdomenMedida1 = abdomenMedida1
        this.abdomenMedida2 = abdomenMedida2
        this.abdomenMedida3 = abdomenMedida3
        this.quadrilMedida1 = quadrilMedida1
        this.quadrilMedida2 = quadrilMedida2
        this.quadrilMedida3 = quadrilMedida3 
        this.coxaMedida1 = coxaMedida1
        this.coxaMedida2 = coxaMedida2 
        this.coxaMedida3 = coxaMedida3
        this.pernaMedida1 = pernaMedida1
        this.pernaMedida2 = pernaMedida2
        this.pernaMedida3 = pernaMedida3 
        this.DCPeitoralMedida1 = DCPeitoralMedida1
        this.DCPeitoralMedida2 = DCPeitoralMedida2
        this.DCPeitoralMedida3 = DCPeitoralMedida3
        this.DCabdomenMedida1 = DCabdomenMedida1
        this.DCabdomenMedida2 = DCabdomenMedida2
        this.DCabdomenMedida3 = DCabdomenMedida3
        this.DCcoxaMedida1 = DCcoxaMedida1
        this.DCcoxaMedida2 = DCcoxaMedida2
        this.DCcoxaMedida3 = DCcoxaMedida3
        this.DCtricepsMedida1 = DCtricepsMedida1
        this.DCtricepsMedida2 = DCtricepsMedida2 
        this.DCtricepsMedida3 = DCtricepsMedida3
        this.DCcristailiacaMedida1 = DCcristailiacaMedida1
        this.DCcristailiacaMedida2 = DCcristailiacaMedida2
        this.DCcristailiacaMedida3 = DCcristailiacaMedida3
        this.testeSentarAlcancarMedida1 = testeSentarAlcancarMedida1
        this.testeSentarAlcancarMedida2 = testeSentarAlcancarMedida2
        this.testeSentarAlcancarMedida3 = testeSentarAlcancarMedida3
        this.imc = (this.massaCorporal / (this.estatura * this.estatura)).toFixed(2)
        this.frequenciaCardiacaDeRepouso = frequenciaCardiacaDeRepouso
        this.pressaoDiastolica = pressaoDiastolica
        this.pressaoSistolica = pressaoSistolica
        this.pressaoArterial = pressaoArterial
    }

    getPressaoArterial = () => {return this.pressaoArterial}
    setPressaoArterial = (pressaoArterial) => {this.pressaoArterial = pressaoArterial}
    getDia = () => {return this.dia}
    setDia = (dia) => {this.dia = dia}

    getMes = () => {return this.mes}
    setMes = (mes) => {this.mes = mes}

    getAno = () => {return this.ano}
    setAno = (ano) => {this.ano = ano}
   
    setMassaCorporal = (massaCorporal) => {this.massaCorporal = massaCorporal}
    getMassaCorporal = () => {return this.massaCorporal}
   
    setEstatura = (estatura) => {this.estatura = estatura}
    getEstatura = () => {return this.estatura}

    setBracoRelaxadoMedida1 = (bracoRelaxadoMedida1) => {this.bracoRelaxadoMedida1 = bracoRelaxadoMedida1}
    getBracoRelaxadoMedida1 = () => {return this.bracoRelaxadoMedida1}

    setBracoRelaxadoMedida2 = (bracoRelaxadoMedida2) => {this.bracoRelaxadoMedida2 = bracoRelaxadoMedida2}
    getBracoRelaxadoMedida2 = () => {return this.bracoRelaxadoMedida2}

    setBracoRelaxadoMedida3 = (bracoRelaxadoMedida3) => {this.bracoRelaxadoMedida3 = bracoRelaxadoMedida3}
    getBracoRelaxadoMedida3 = () => {return this.bracoRelaxadoMedida3}

    setBracoContraidoMedida1 = (bracoContraidoMedida1) => {this.bracoContraidoMedida1 = bracoContraidoMedida1}
    getBracoContraidoMedida1 = () => {return this.bracoContraidoMedida1}

    setBracoContraidoMedida2 = (bracoContraidoMedida2) => {this.bracoContraidoMedida2 = bracoContraidoMedida2}
    getBracoContraidoMedida2 = () => {return this.bracoContraidoMedida2}

    setBracoContraidoMedida3 = (bracoContraidoMedida3) => {this.bracoContraidoMedida3 = bracoContraidoMedida3}
    getBracoContraidoMedida3 = () => {return this.bracoContraidoMedida3}

    setCinturaMedida1 = (cinturaMedida1) => {this.cinturaMedida1 = cinturaMedida1}
    getCinturaMedida1 = () => {return this.cinturaMedida1}
 
    setCinturaMedida2 = (cinturaMedida2) => {this.cinturaMedida2 = cinturaMedida2}
    getCinturaMedida2 = () => {return this.cinturaMedida2}

    setCinturaMedida3 = (cinturaMedida3) => {this.cinturaMedida3 = cinturaMedida3}
    getCinturaMedida3 = () => {return this.cinturaMedida3}

    setAbdomenMedida1 = (abdomenMedida1) => {this.abdomenMedida1 = abdomenMedida1}
    getAbdomenMedida1 = () => {return this.abdomenMedida1}
 
    setAbdomenMedida2 = (abdomenMedida2) => {this.abdomenMedida2 = abdomenMedida2}
    getAbdomenMedida2 = () => {return this.abdomenMedida2}
 
    setAbdomenMedida3 = (abdomenMedida3) => {this.abdomenMedida3 = abdomenMedida3}
    getAbdomenMedida3 = () => {return this.abdomenMedida3}
 
    setQuadrilMedida1 = (quadrilMedida1) => {this.quadrilMedida1 = quadrilMedida1}
    getQuadrilMedida1 = () => {return this.quadrilMedida1}
 
    setQuadrilMedida2 = (quadrilMedida2) => {this.quadrilMedida2 = quadrilMedida2}
    getQuadrilMedida2 = () => {return this.quadrilMedida2}
 
    setQuadrilMedida3 = (quadrilMedida3) => {this.quadrilMedida3 = quadrilMedida3}
    getQuadrilMedida3 = () => {return this.quadrilMedida3}
 
    setCoxaMedida1 = (coxaMedida1) => {this.coxaMedida1 = coxaMedida1}
    getCoxaMedida1 = () => {return this.coxaMedida1}
 
    setCoxaMedida2 = (coxaMedida2) => {this.coxaMedida2 = coxaMedida2}
    getCoxaMedida2 = () => {return this.coxaMedida2}
 
    setCoxaMedida3 = (coxaMedida3) => {this.coxaMedida3 = coxaMedida3}
    getCoxaMedida3 = () => {return this.coxaMedida3}
 
    setPernaMedida1 = (pernaMedida1) => {this.pernaMedida1 = pernaMedida1}
    getPernaMedida1 = () => {return this.pernaMedida1}
 
    setPernaMedida2 = (pernaMedida2) => {this.pernaMedida2 = pernaMedida2}
    getPernaMedida2 = () => {return this.pernaMedida2}
 
    setPernaMedida3 = (pernaMedida3) => {this.pernaMedida3 = pernaMedida3}
    getPernaMedida3 = () => {return this.pernaMedida3}
 
    setDCpeitoralMedida1 = (DCpeitoralMedida1) => {this.DCPeitoralMedida1 = DCpeitoralMedida1}
    getDCpeitoralMedida1 = () => {return this.DCPeitoralMedida1}
 
    setDCpeitoralMedida2 = (DCpeitoralMedida2) => {this.DCPeitoralMedida2 = DCpeitoralMedida2}
    getDCpeitoralMedida2 = () => {return this.DCPeitoralMedida2}
 
    setDCpeitoralMedida3 = (DCpeitoralMedida3) => {this.DCPeitoralMedida3 = DCpeitoralMedida3}
    getDCpeitoralMedida3 = () => {return this.DCPeitoralMedida3}
 
    setDCabdomenMedida1 = (DCabdomenMedida1) => {this.DCabdomenMedida1 = DCabdomenMedida1}
    getDCabdomenMedida1 = () => {return this.DCabdomenMedida1}
 
    setDCabdomenMedida2 = (DCabdomenMedida2) => {this.DCabdomenMedida2 = DCabdomenMedida2}
    getDCabdomenMedida2 = () => {return this.DCabdomenMedida2}
 
    setDCabdomenMedida3 = (DCabdomenMedida3) => {this.DCabdomenMedida3 = DCabdomenMedida3}
    getDCabdomenMedida3 = () => {return this.DCabdomenMedida3}
 
    setDCcoxaMedida1 = (DCcoxaMedida1) => {this.DCcoxaMedida1 = DCcoxaMedida1}
    getDCcoxaMedida1 = () => {return this.DCcoxaMedida1}
 
    setDCcoxaMedida2 = (DCcoxaMedida2) => {this.DCcoxaMedida2 = DCcoxaMedida2}
    getDCcoxaMedida2 = () => {return this.DCcoxaMedida2}
 
    setDCcoxaMedida3 = (DCcoxaMedida3) => {this.DCcoxaMedida3 = DCcoxaMedida3}
    getDCcoxaMedida3 = () => {return this.DCcoxaMedida3}
 
    setDCtricepsMedida1 = (DCtricepsMedida1) => {this.DCtricepsMedida1 = DCtricepsMedida1}
    getDCtricepsMedida1 = () => {return this.DCtricepsMedida1}
 
    setDCtricepsMedida2 = (DCtricepsMedida2) => {this.DCtricepsMedida2 = DCtricepsMedida2}
    getDCtricepsMedida2 = () => {return this.DCtricepsMedida2}
 
    setDCtricepsMedida3 = (DCtricepsMedida3) => {this.DCtricepsMedida3 = DCtricepsMedida3}
    getDCtricepsMedida3 = () => {return this.DCtricepsMedida3}
 
    setDCcristailiacaMedida1 = (DCcristailiacaMedida1) => {this.DCcristailiacaMedida1 = DCcristailiacaMedida1}
    getDCcristailiacaMedida1 = () => {return this.DCcristailiacaMedida1}
 
    setDCcristailiacaMedida2 = (DCcristailiacaMedida2) => {this.DCcristailiacaMedida2 = DCcristailiacaMedida2}
    getDCcristailiacaMedida2 = () => {return this.DCcristailiacaMedida2}
 
    setDCcristailiacaMedida3 = (DCcristailiacaMedida3) => {this.DCcristailiacaMedida3 = DCcristailiacaMedida3}
    getDCcristailiacaMedida3 = () => {return this.DCcristailiacaMedida3}
 
    setTesteSentarAlcancarMedida1 = (testeSentarAlcancarMedida1) => {this.testeSentarAlcancarMedida1 = testeSentarAlcancarMedida1}
    getTesteSentarAlcancarMedida1 = () => {return this.testeSentarAlcancarMedida1}
 
    setTesteSentarAlcancarMedida2 = (testeSentarAlcancarMedida2) => {this.testeSentarAlcancarMedida2 = testeSentarAlcancarMedida2}
    getTesteSentarAlcancarMedida2 = () => {return this.testeSentarAlcancarMedida2}
 
    setTesteSentarAlcancarMedida3 = (testeSentarAlcancarMedida3) => {this.testeSentarAlcancarMedida3 = testeSentarAlcancarMedida3}
    getTesteSentarAlcancarMedida3 = () => {return this.testeSentarAlcancarMedida3}
 
    setTesteDinamometriaPernasMedida1 = (testeDinamometriaPernasMedida1) => {this.testeDinamometriaPernasMedida1 = testeDinamometriaPernasMedida1}
    getTesteDinamometriaPernasMedida1 = () => {return this.testeDinamometriaPernasMedida1}
 
    setTesteDinamometriaPernasMedida2 = (testeDinamometriaPernasMedida2) => {this.testeDinamometriaPernasMedida2 = testeDinamometriaPernasMedida2}
    getTesteDinamometriaPernasMedida2 = () => {return this.testeDinamometriaPernasMedida2}
 
    setTesteDinamometriaPernasMedida3 = (testeDinamometriaPernasMedida3) => {this.testeDinamometriaPernasMedida3 = testeDinamometriaPernasMedida3}
    getTesteDinamometriaPernasMedida3 = () => {return this.testeDinamometriaPernasMedida3}
 
    setTesteResistenciaAbdominal = (testeResistenciaAbdominal) => {this.testeResistenciaAbdominal = testeResistenciaAbdominal}
    getTesteResistenciaAbdominal = () => {return this.testeResistenciaAbdominal}
 
    setFrequenciaCardiacaDeRepouso = (frequenciaCardiacaDeRepouso) => {this.frequenciaCardiacaDeRepouso = frequenciaCardiacaDeRepouso}
    getFrequenciaCardiacaDeRepouso = () => {return this.frequenciaCardiacaDeRepouso}

    setPressaoSistolica = (pressaoSistolica) => {this.pressaoSistolica = pressaoSistolica}
    getPressaoSistolica = () => {return this.pressaoSistolica} 
 
    setPressaoDiastolica = (pressaoDiastolica) => {this.pressaoDiastolica = pressaoDiastolica}
    getPressaoDiastolica = () => {return this.pressaoDiastolica} 
}

export {Avaliacao}