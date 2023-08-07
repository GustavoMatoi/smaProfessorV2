import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import estilo from "../estilo"
import TabelaResultados from "../AnaliseDoProgramaDeTreino/SelecaoAlunoAnaliseProgramaDeTreino/TabelaResultados"
import FichaDeTreinoAnalise from "../Ficha/FichaDeTreinoAnalise";
import NetInfo from "@react-native-community/netinfo"
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../ModalSemConexao";


function getPressaoArterial(pressaoDiastolica, pressaoSistolica){
    let pressaoArterial = ''
    if(pressaoSistolica < 120 && pressaoDiastolica < 80){
        pressaoArterial = `Ótima`
    } else {
        if(pressaoSistolica < 130 && pressaoDiastolica < 85){
            pressaoArterial =  `Normal`
        } else {
            if(pressaoSistolica > 130 && pressaoSistolica < 139 && pressaoDiastolica > 85 && pressaoDiastolica < 89){
                pressaoArterial =  `Limítrofe`
            } else {
                if(pressaoSistolica > 140 && pressaoSistolica < 159 && pressaoDiastolica > 90 && pressaoDiastolica < 99){
                    pressaoArterial =  `Hipertensão estágio 1`
                } else {
                    if(pressaoSistolica > 160 && pressaoSistolica < 179 && pressaoDiastolica > 100 && pressaoDiastolica < 109){
                        pressaoArterial =  `Hipertensão estágio 2`
                    } else {
                        if(pressaoSistolica >= 140 && pressaoDiastolica <90){
                            pressaoArterial =  `Hipertensão Sistólica isolada`
                        } else {
                            pressaoArterial =  'Nada'
                        }                    
                    }
                }
            }
        }
    }

    return pressaoArterial;
}


function comparaValores(avaliacaoAtual, avaliacaoAnterior){
    let resultado = avaliacaoAtual - avaliacaoAnterior
    if (resultado > 0){
        return `+ ${resultado.toFixed(2)}`
    } else {
        return resultado.toFixed(2)
    }
}

export default function TelaAnaliseDoProgramaDeTreino(props) {
    const avaliacao = props.route.params.avaliacao;
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          setConexao(state.type === 'wifi' || state.type === 'cellular')
        })
    
        return () => {
          unsubscribe()
        }
      }, [])

    const [conexao, setConexao] = useState(true)
    const posicaoArrayFichas = props.route.params.posicaoDoArray;
    const avaliacaoAnterior = props.route.params.avaliacaoAnterior;
    const aluno = props.route.params.aluno
    console.log(aluno)
    console.log(posicaoArrayFichas)
    console.log("Avaliação anterior: ", avaliacaoAnterior)
    console.log('props:', props);
    console.log('props.posicaoDoArray:', props.route.params.posicaoDoArray);
console.log(avaliacao)
    console.log("FREQ CARD DE REP" + avaliacao.frequenciaCardiacaRepouso)
    console.log(avaliacao.DCPeitoralMedida1)
    return (
                <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
                    {conexao ? (posicaoArrayFichas == 0?
                        <ScrollView>
                            <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginVertical: '5%'}]}>Resultados obtidos</Text>

                            <TabelaResultados
                            massaCorporal={avaliacao.massaCorporal}
                            estatura={avaliacao.estatura}
                            
                            bracoRelaxadoMedida1={avaliacao.bracoRelaxadoMedida1}
                            bracoRelaxadoMedida2={avaliacao.bracoRelaxadoMedida2}
                            bracoRelaxadoMedida3={avaliacao.bracoRelaxadoMedida3}
                            
                            bracoContraidoMedida1={avaliacao.bracoContraidoMedida1}
                            bracoContraidoMedida2={avaliacao.bracoContraidoMedida2}
                            bracoContraidoMedida3={avaliacao.bracoContraidoMedida3}
                            
                            cinturaMedida1={avaliacao.cinturaMedida1}
                            cinturaMedida2={avaliacao.cinturaMedida2}
                            cinturaMedida3={avaliacao.cinturaMedida3}
                            
                            abdomenMedida1={avaliacao.abdomenMedida1}
                            abdomenMedida2={avaliacao.abdomenMedida2}
                            abdomenMedida3={avaliacao.abdomenMedida3}
                            
                            quadrilMedida1={avaliacao.quadrilMedida1}
                            quadrilMedida2={avaliacao.quadrilMedida2}
                            quadrilMedida3={avaliacao.quadrilMedida3}
                            
                            coxaMedida1={avaliacao.coxaMedida1}
                            coxaMedida2={avaliacao.coxaMedida2}
                            coxaMedida3={avaliacao.coxaMedida3}
                            
                            pernaMedida1={avaliacao.pernaMedida1}
                            pernaMedida2={avaliacao.pernaMedida2}
                            pernaMedida3={avaliacao.pernaMedida3}
                            
                            DCPeitoralMedida1={avaliacao.DCPeitoralMedida1}
                            DCPeitoralMedida2={avaliacao.DCPeitoralMedida2}
                            DCPeitoralMedida3={avaliacao.DCPeitoralMedida3}
                            
                            DCAbdomenMedida1={avaliacao.DCabdomenMedida1}
                            DCAbdomenMedida2={avaliacao.DCabdomenMedida2}
                            DCAbdomenMedida3={avaliacao.DCabdomenMedida3}
                            
                            DCCoxaMedida1={avaliacao.DCCoxaMedida1}
                            DCCoxaMedida2={avaliacao.DCCoxaMedida2}
                            DCCoxaMedida3={avaliacao.DCCoxaMedida3}
                            
                            DCTricepsMedida1={avaliacao.DCTricepsMedida1}
                            DCTricepsMedida2={avaliacao.DCTricepsMedida2}
                            DCTricepsMedida3={avaliacao.DCTricepsMedida3}
                            
                            DCCristaIliacaMedida1={avaliacao.DCCristaIliacaMedida1}
                            DCCristaIliacaMedida2={avaliacao.DCCristaIliacaMedida2}
                            DCCristaIliacaMedida3={avaliacao.DCCristaIliacaMedida3}
                            
                            testeSentarAlcancarMedida1={avaliacao.TesteSentarAlcancarMedida1}
                            testeSentarAlcancarMedida2={avaliacao.TesteSentarAlcancarMedida2}
                            testeSentarAlcancarMedida3={avaliacao.TesteSentarAlcancarMedida3}
                            
                            testeDinamometriaPernasMedida1={avaliacao.dinamometriaPernasMedida1}
                            testeDinamometriaPernasMedida2={avaliacao.dinamometriaPernasMedida2}
                            testeDinamometriaPernasMedida3={avaliacao.dinamometriaPernasMedida3}
                            
                            resistenciaAbdominal={avaliacao.ResistenciaAbdominal}
                            
                            imc={avaliacao.IMC}
                            
                            frequenciaCardiacaRepouso={avaliacao.FrequenciaCardiacaDeRepouso}
                            
                            pressaoArterial={getPressaoArterial(avaliacao.PressaoDiastolica, avaliacao.PressaoSistolica)}
                            >
                            </TabelaResultados>

                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginVertical: '5%'}]}>Programa de Treino</Text>
                    <FichaDeTreinoAnalise posicaoDoArray={posicaoArrayFichas} aluno={aluno} ></FichaDeTreinoAnalise>
                        </ScrollView> : 
                        <ScrollView>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginVertical: '5%'}]}>Resultados obtidos</Text>
                        <TabelaResultados
                            massaCorporal={avaliacao.massaCorporal}
                            estatura={avaliacao.estatura}
                            
                            bracoRelaxadoMedida1={avaliacao.bracoRelaxadoMedida1}
                            bracoRelaxadoMedida2={avaliacao.bracoRelaxadoMedida2}
                            bracoRelaxadoMedida3={avaliacao.bracoRelaxadoMedida3}
                            
                            bracoContraidoMedida1={avaliacao.bracoContraidoMedida1}
                            bracoContraidoMedida2={avaliacao.bracoContraidoMedida2}
                            bracoContraidoMedida3={avaliacao.bracoContraidoMedida3}
                            
                            cinturaMedida1={avaliacao.cinturaMedida1}
                            cinturaMedida2={avaliacao.cinturaMedida2}
                            cinturaMedida3={avaliacao.cinturaMedida3}
                            
                            abdomenMedida1={avaliacao.abdomenMedida1}
                            abdomenMedida2={avaliacao.abdomenMedida2}
                            abdomenMedida3={avaliacao.abdomenMedida3}
                            
                            quadrilMedida1={avaliacao.quadrilMedida1}
                            quadrilMedida2={avaliacao.quadrilMedida2}
                            quadrilMedida3={avaliacao.quadrilMedida3}
                            
                            coxaMedida1={avaliacao.coxaMedida1}
                            coxaMedida2={avaliacao.coxaMedida2}
                            coxaMedida3={avaliacao.coxaMedida3}
                            
                            pernaMedida1={avaliacao.pernaMedida1}
                            pernaMedida2={avaliacao.pernaMedida2}
                            pernaMedida3={avaliacao.pernaMedida3}
                            
                            DCPeitoralMedida1={avaliacao.DCPeitoralMedida1}
                            DCPeitoralMedida2={avaliacao.DCPeitoralMedida2}
                            DCPeitoralMedida3={avaliacao.DCPeitoralMedida3}
                            
                            DCAbdomenMedida1={avaliacao.DCabdomenMedida1}
                            DCAbdomenMedida2={avaliacao.DCabdomenMedida2}
                            DCAbdomenMedida3={avaliacao.DCabdomenMedida3}
                            
                            DCCoxaMedida1={avaliacao.DCCoxaMedida1}
                            DCCoxaMedida2={avaliacao.DCCoxaMedida2}
                            DCCoxaMedida3={avaliacao.DCCoxaMedida3}
                            
                            DCTricepsMedida1={avaliacao.DCTricepsMedida1}
                            DCTricepsMedida2={avaliacao.DCTricepsMedida2}
                            DCTricepsMedida3={avaliacao.DCTricepsMedida3}
                            
                            DCCristaIliacaMedida1={avaliacao.DCCristaIliacaMedida1}
                            DCCristaIliacaMedida2={avaliacao.DCCristaIliacaMedida2}
                            DCCristaIliacaMedida3={avaliacao.DCCristaIliacaMedida3}
                            
                            testeSentarAlcancarMedida1={avaliacao.TesteSentarAlcancarMedida1}
                            testeSentarAlcancarMedida2={avaliacao.TesteSentarAlcancarMedida2}
                            testeSentarAlcancarMedida3={avaliacao.TesteSentarAlcancarMedida3}
                            
                            testeDinamometriaPernasMedida1={avaliacao.dinamometriaPernasMedida1}
                            testeDinamometriaPernasMedida2={avaliacao.dinamometriaPernasMedida2}
                            testeDinamometriaPernasMedida3={avaliacao.dinamometriaPernasMedida3}
                            
                            resistenciaAbdominal={avaliacao.ResistenciaAbdominal}
                            
                            imc={avaliacao.IMC}
                            
                            frequenciaCardiacaRepouso={avaliacao.FrequenciaCardiacaDeRepouso}
                            
                            pressaoArterial={getPressaoArterial(avaliacao.PressaoDiastolica, avaliacao.PressaoSistolica)}
                            >
                            </TabelaResultados>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginVertical: '5%', textAlign: 'center'}]}>Resultados obtidos(em relação a avaliação anterior)</Text>
                        <TabelaResultados
    
                        massaCorporal={comparaValores(avaliacao.massaCorporal, avaliacaoAnterior.massaCorporal)}
                        estatura={comparaValores(avaliacao.estatura, avaliacaoAnterior.estatura
                            )}
                        bracoRelaxadoMedida1={comparaValores(avaliacao.bracoRelaxadoMedida1, avaliacaoAnterior.bracoRelaxadoMedida1)}
                        bracoRelaxadoMedida2={comparaValores(avaliacao.bracoRelaxadoMedida2, avaliacaoAnterior.bracoRelaxadoMedida2)}
                        bracoRelaxadoMedida3={comparaValores(avaliacao.bracoRelaxadoMedida3, avaliacaoAnterior.bracoRelaxadoMedida3)}
    
                        bracoContraidoMedida1={comparaValores(avaliacao.bracoContraidoMedida1, avaliacaoAnterior.bracoContraidoMedida1)}
                        bracoContraidoMedida2={comparaValores(avaliacao.bracoContraidoMedida2, avaliacaoAnterior.bracoContraidoMedida2)}
                        bracoContraidoMedida3={comparaValores(avaliacao.bracoContraidoMedida3, avaliacaoAnterior.bracoContraidoMedida3)}
                        
                        cinturaMedida1={comparaValores(avaliacao.cinturaMedida1, avaliacaoAnterior.cinturaMedida1)}
                        cinturaMedida2={comparaValores(avaliacao.cinturaMedida2, avaliacaoAnterior.cinturaMedida2)}
                        cinturaMedida3={comparaValores(avaliacao.cinturaMedida3, avaliacaoAnterior.cinturaMedida3)}
        
                        abdomenMedida1={comparaValores(avaliacao.abdomenMedida1, avaliacaoAnterior.abdomenMedida1)}
                        abdomenMedida2={comparaValores(avaliacao.abdomenMedida2, avaliacaoAnterior.abdomenMedida2)}
                        abdomenMedida3={comparaValores(avaliacao.abdomenMedida3, avaliacaoAnterior.abdomenMedida3)}
    
                        quadrilMedida1={comparaValores(avaliacao.quadrilMedida1, avaliacaoAnterior.quadrilMedida1)}
                        quadrilMedida2={comparaValores(avaliacao.quadrilMedida2, avaliacaoAnterior.quadrilMedida2)}
                        quadrilMedida3={comparaValores(avaliacao.quadrilMedida3, avaliacaoAnterior.quadrilMedida3)}
    
                        coxaMedida1={comparaValores(avaliacao.coxaMedida1, avaliacaoAnterior.coxaMedida1)}
                        coxaMedida2={comparaValores(avaliacao.coxaMedida2, avaliacaoAnterior.coxaMedida2)}
                        coxaMedida3={comparaValores(avaliacao.coxaMedida3, avaliacaoAnterior.coxaMedida3)}
    
                        pernaMedida1={comparaValores(avaliacao.pernaMedida1, avaliacaoAnterior.pernaMedida1)}
                        pernaMedida2={comparaValores(avaliacao.pernaMedida2, avaliacaoAnterior.pernaMedida2)}
                        pernaMedida3={comparaValores(avaliacao.pernaMedida3, avaliacaoAnterior.pernaMedida3)}
    
                        DCPeitoralMedida1={comparaValores(avaliacao.DCPeitoralMedida1, avaliacaoAnterior.DCPeitoralMedida1)}
                        DCPeitoralMedida2={comparaValores(avaliacao.DCPeitoralMedida2, avaliacaoAnterior.DCPeitoralMedida2)}
                        DCPeitoralMedida3={comparaValores(avaliacao.DCPeitoralMedida3, avaliacaoAnterior.DCPeitoralMedida3)}
    
                        DCAbdomenMedida1={comparaValores(avaliacao.DCabdomenMedida1, avaliacaoAnterior.DCabdomenMedida1)}
                        DCAbdomenMedida2={comparaValores(avaliacao.DCabdomenMedida2, avaliacaoAnterior.DCabdomenMedida2)}
                        DCAbdomenMedida3={comparaValores(avaliacao.DCabdomenMedida3, avaliacaoAnterior.DCabdomenMedida3)}
    
                        DCCoxaMedida1={comparaValores(avaliacao.DCCoxaMedida1, avaliacaoAnterior.DCCoxaMedida1)}
                        DCCoxaMedida2={comparaValores(avaliacao.DCCoxaMedida2, avaliacaoAnterior.DCCoxaMedida2)}
                        DCCoxaMedida3={comparaValores(avaliacao.DCCoxaMedida3, avaliacaoAnterior.DCCoxaMedida3)}
                    
                        DCTricepsMedida1={comparaValores(avaliacao.DCTricepsMedida1, avaliacaoAnterior.DCTricepsMedida1)}
                        DCTricepsMedida2={comparaValores(avaliacao.DCTricepsMedida2, avaliacaoAnterior.DCTricepsMedida2)}
                        DCTricepsMedida3={comparaValores(avaliacao.DCTricepsMedida3, avaliacaoAnterior.DCTricepsMedida3)}
    
                        DCCristaIliacaMedida1={comparaValores(avaliacao.DCCristaIliacaMedida1, avaliacaoAnterior.DCCristaIliacaMedida1)}
                        DCCristaIliacaMedida2={comparaValores(avaliacao.DCCristaIliacaMedida2, avaliacaoAnterior.DCCristaIliacaMedida2)}
                        DCCristaIliacaMedida3={comparaValores(avaliacao.DCCristaIliacaMedida3, avaliacaoAnterior.DCCristaIliacaMedida3)}
    
                        testeSentarAlcancarMedida1={comparaValores(avaliacao.TesteSentarAlcancarMedida1, avaliacaoAnterior.TesteSentarAlcancarMedida1)}
                        testeSentarAlcancarMedida2={comparaValores(avaliacao.TesteSentarAlcancarMedida2, avaliacaoAnterior.TesteSentarAlcancarMedida2)}
                        testeSentarAlcancarMedida3={comparaValores(avaliacao.TesteSentarAlcancarMedida3, avaliacaoAnterior.TesteSentarAlcancarMedida3)}
    
                        testeDinamometriaPernasMedida1={comparaValores(avaliacao.dinamometriaPernasMedida1, avaliacaoAnterior.dinamometriaPernasMedida1)}
                        testeDinamometriaPernasMedida2={comparaValores(avaliacao.dinamometriaPernasMedida2, avaliacaoAnterior.dinamometriaPernasMedida2)}
                        testeDinamometriaPernasMedida3={comparaValores(avaliacao.dinamometriaPernasMedida3, avaliacaoAnterior.dinamometriaPernasMedida3)}
    
                        resistenciaAbdominal={comparaValores(avaliacao.ResistenciaAbdominal, avaliacaoAnterior.ResistenciaAbdominal)}
    
                        imc={comparaValores(avaliacao.IMC, avaliacaoAnterior.IMC)}
    
                        frequenciaCardiacaRepouso={comparaValores(avaliacao.FrequenciaCardiacaDeRepouso, avaliacaoAnterior.FrequenciaCardiacaDeRepouso)}
    
                        pressaoArterial={`Avaliação anterior: ${getPressaoArterial(avaliacaoAnterior.pressaoArterial, avaliacaoAnterior.pressaoArterial)}`}
    
    >                   
    
    
                        </TabelaResultados>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginVertical: '5%'}]}>Programa de Treino</Text>
                        <FichaDeTreinoAnalise posicaoDoArray={props.route.params.posicaoDoArray} aluno={aluno}></FichaDeTreinoAnalise>
    
                        </ScrollView> ): <ModalSemConexao ondeNavegar={'Home'} navigation={props.navigation}/> }
                </SafeAreaView>
            )   
        }


const style = StyleSheet.create( {
    container: {
        width: '100%',
    }
})