import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native'
import estilo from "../estilo"
import TabelaResultados from "../AnaliseDoProgramaDeTreino/SelecaoAlunoAnaliseProgramaDeTreino/TabelaResultados"
import FichaDeTreinoAnalise from "../Ficha/FichaDeTreinoAnalise";
import NetInfo from "@react-native-community/netinfo"
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../ModalSemConexao";
import { Firestore, collection, doc, getDocs, getFirestore, updateDoc, deleteDoc } from "firebase/firestore";
import { professorLogado } from "../LoginScreen";
import AntDesign from '@expo/vector-icons/AntDesign';

const getPressaoArterial = (pressaoSistolica, pressaoDiastolica) => {
    if (pressaoSistolica, pressaoDiastolica != 0) {
        if (pressaoSistolica < 120 && pressaoSistolica > 10 && pressaoDiastolica > 10 && pressaoDiastolica < 80) {
            return 'Ótima'
        }
        if (pressaoSistolica < 130 && pressaoSistolica >= 120 && pressaoDiastolica >= 80 && pressaoDiastolica < 85) {
            return 'Normal'
        }
        if (pressaoSistolica >= 130 && pressaoSistolica <= 139 && pressaoDiastolica >= 85 && pressaoDiastolica <= 89) {
            return 'Limítrofe'
        }
        if (pressaoSistolica >= 140 && pressaoSistolica <= 159 && pressaoDiastolica >= 90 && pressaoDiastolica <= 99) {
            return 'Hipertensão Estágio 1'
        }
        if (pressaoSistolica >= 160 && pressaoSistolica <= 179 && pressaoDiastolica >= 100 && pressaoDiastolica <= 109) {
            return 'Hipertensão estágio 2'
        }
        if (pressaoSistolica >= 180 && pressaoDiastolica >= 110) {
            return 'Hipertensão estágio 3'
        }
        if (pressaoSistolica >= 140 && pressaoDiastolica < 90) {
            return 'Hipertensão sistólica isolada'
        }
    } else {
        return "Não informada"
    }
}

function comparaValores(avaliacaoAtual, avaliacaoAnterior) {
    let resultado = avaliacaoAtual - avaliacaoAnterior
    if (resultado > 0) {
        return `+ ${resultado.toFixed(2)}`
    } else {
        return resultado.toFixed(2)
    }
}

export default function TelaAnaliseDoProgramaDeTreino({ route, navigation }) {
    const { avaliacao, posicaoDoArray, aluno, avaliacaoAnterior } = route.params
    const [fichas, setFichas] = useState([]);
    const buscarFichas = async () => {
        try {
          const db = getFirestore();
          const caminhoFichas = collection(
            db, 
            'Academias', 
            professorLogado.getAcademia(), 
            'Alunos', 
            aluno.email, 
            'FichaDeExercicios'
          );
    
          const snapshot = await getDocs(caminhoFichas);
          console.log("snapshot", snapshot.path);
          const dadosFichas = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => b.dataCriacao?.toMillis() - a.dataCriacao?.toMillis())
          setFichas(dadosFichas);

          console.log("fichasreais:",fichas.length)
            console.log('Professor Academia:', professorLogado.getAcademia());
            console.log('Aluno ID:', aluno.id);
            console.log('Aluno Email:', aluno.email);
            console.log('Fichas encontradas:', dadosFichas);
            console.log('Posição:', posicaoDoArray);
            console.log('Fichas disponíveis:', fichas.length);
            console.log('Ficha na posição:', fichas[posicaoDoArray]);
        } catch (error) {
          console.error("Erro ao buscar fichas:", error);
        }
      };
    
      useEffect(() => {
        if (aluno?.id) {
            buscarFichas();
        }
      }, [aluno]);
    console.log('avaliacaoAnterior ', avaliacaoAnterior)
    console.log('avaliacaoAnterior ', posicaoDoArray)
    console.log("aluno", aluno)
    console.log("alunoid", aluno.id);
    console.log("aavaliacao id", avaliacao.id);

    
    // const alunoFichas = [...aluno.fichas]

    const editarAvaliacao = () =>{
        console.log(avaliacao.emailProfessorResponsavel )
        if(avaliacao.emailProfessorResponsavel !== professorLogado.getEmail()){
            Alert.alert("Permissão negada.", "Apenas o professor que lançou essa avaliação/ficha poderá editá-la.")
        } else {
            console.log("sei la", avaliacao)
            const pa = getPressaoArterial(avaliacao.PressaoDiastolica, avaliacao.PressaoSistolica)
            navigation.navigate('Editar avaliação', {props: avaliacao, aluno: aluno});
        }
    }
    
    const excluirAvaliacao = async () => {
        console.log('email do aluno',aluno.email)
        console.log('sla da avaliacao',avaliacao.ano)
        if (avaliacao.emailProfessorResponsavel !== professorLogado.getEmail()) {
            Alert.alert("Permissão negada.", "Apenas o professor que lançou essa avalição/ficha poderá excluir.");
        } else {
            
            try {
                const firebaseBD = getFirestore();
                const doisPrimeirosNumerosHora = String(avaliacao.horario).padStart(2, '0').slice(0, 2);
                const doisUltimosNumerosMinutos = String(avaliacao.horario).padStart(2, '0').slice(-2);
                const avaliacaoRef = doc(
                    firebaseBD,
                    "Academias",
                    professorLogado.getAcademia(),
                    "Alunos",
                    `${aluno.email}`,
                    "Avaliações",
                    `Avaliacao${avaliacao.ano}|${avaliacao.mes}|${avaliacao.dia}|${doisPrimeirosNumerosHora}|${doisUltimosNumerosMinutos}`
                );
    
                console.log("Excluindo avaliação", avaliacaoRef);
    
                await deleteDoc(avaliacaoRef);
    
                Alert.alert("Avaliação excluída com sucesso.");
                navigation.goBack();
            } catch (error) {
                console.error("Erro ao excluir avaliação: ", error);
                Alert.alert("Erro", "Ocorreu um erro ao excluir a avaliação.");
            }
        }
    };
    
    if (posicaoDoArray == 0) {
        return (
            <SafeAreaView style={[estilo.corLightMenos1, style.container]}>

                <ScrollView>


                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Profesor responsável pela avaliação: {avaliacao.professorResponsavel || 'Lançada em versões anteriores.'}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Data da avaliação: {avaliacao.dia}/{avaliacao.mes}/{avaliacao.ano}</Text>

                    <TouchableOpacity onPress={() => editarAvaliacao()} style={[estilo.botao, avaliacao.emailProfessorResponsavel === professorLogado.getEmail() ? estilo.corPrimaria : estilo.corDisabled, { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }]}>
                        <AntDesign name="edit" size={24} color="white" />
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Editar avaliação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirAvaliacao()} style={[estilo.botao, avaliacao.emailProfessorResponsavel === professorLogado.getEmail() ? estilo.corPrimaria : estilo.corDisabled, { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }]}>
                        <AntDesign name="delete" size={24} color="white" />
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Deletar avaliação</Text>
                    </TouchableOpacity>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, { marginVertical: '5%' }]}>Resultados obtidos</Text>


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

                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, { marginVertical: '5%' }]}>Programa de Treino</Text>
                    {fichas?.length > 0 ? <FichaDeTreinoAnalise posicaoDoArray={posicaoDoArray} ficha={fichas[posicaoDoArray]} aluno={aluno}/> : null}
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={[estilo.corLightMenos1, style.container]}>

                <ScrollView>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Profesor responsável pela avaliação: {avaliacao.professorResponsavel || 'Lançada em versões anteriores.'}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Data da avaliação: {avaliacao.dia}/{avaliacao.mes}/{avaliacao.ano}</Text>
                    <TouchableOpacity  onPress={() => editarAvaliacao()} style={[estilo.botao, estilo.corPrimaria, { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }]}>
                        <AntDesign name="edit" size={24} color="white" />
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Editar avaliação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => excluirAvaliacao()} style={[estilo.botao, estilo.corDanger, { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }]}>
                        <AntDesign name="delete" size={24} color="white" /> 
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>deletar avaliação</Text>
                    </TouchableOpacity>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, { marginVertical: '5%' }]}>Resultados obtidos</Text>
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
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, { marginVertical: '5%', textAlign: 'center' }]}>Resultados obtidos(em relação a avaliação anterior)</Text>
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

                        pressaoArterial={`Avaliação anterior: ${avaliacaoAnterior.pressaoArterial}`}

                    >


                    </TabelaResultados>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, { marginVertical: '5%' }]}>Programa de Treino</Text>
                    {console.log('aluno.fichas ', fichas[posicaoDoArray])}
                    {typeof fichas[posicaoDoArray] == 'undefined' ?
                        <Text style={[{ marginHorizontal: 15, textAlign: 'justify' }, estilo.textoP16px, estilo.textoCorSecundaria]}>
                            A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
                        </Text> :
                        <FichaDeTreinoAnalise 
                        posicaoDoArray={posicaoDoArray} 
                        ficha={fichas[posicaoDoArray]} // Passa a ficha específica
                        aluno={aluno}
                      />
                    }

                </ScrollView>
            </SafeAreaView>
        )
    }
}




const style = StyleSheet.create({
    container: {
        width: '100%',
    }
})