import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Text, ScrollView } from 'react-native'
import estilo from "../estilo";
import TabelaDeResultados from "./Testes/Tabelas/TabelaDeResultados";
import { novaAvalicao } from "./DadosCorporais";
import { professorLogado } from "../LoginScreen";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Notification from "expo-notifications"
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation, route }) => {

    const { aluno, imc, pressaoArterial } = route.params
    const [salvandoAvaliacao, setSalvandoAvaliacao] = useState(false)

    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

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
    const data = new Date()
    const mes = data.getMonth() + 1
    const dia = data.getDate()
    const ano = data.getFullYear()

    if (dia < 10) {
        dia = `0${dia}`
    }
    if (mes < 10) {
        mes = `0${mes}`
    }
    let horario = data.getHours()
    horario < 10 ? horario = `0${horario}`: null
    let minutos = data.getMinutes()
    minutos < 10 ? minutos = `0${minutos}`: null

    const avaliacao = {
        DCCoxaMedida1: novaAvalicao.getDCcoxaMedida1(),
        DCCoxaMedida2: novaAvalicao.getDCcoxaMedida2(),
        DCCoxaMedida3: novaAvalicao.getDCcoxaMedida3(),
        DCCristaIliacaMedida1: novaAvalicao.getDCcristailiacaMedida1(),
        DCCristaIliacaMedida2: novaAvalicao.getDCcristailiacaMedida2(),
        DCCristaIliacaMedida3: novaAvalicao.getDCcristailiacaMedida3(),
        DCPeitoralMedida1: novaAvalicao.getDCpeitoralMedida1(),
        DCPeitoralMedida2: novaAvalicao.getDCpeitoralMedida2(),
        DCPeitoralMedida3: novaAvalicao.getDCpeitoralMedida3(),
        DCTricepsMedida1: novaAvalicao.getDCtricepsMedida1(),
        DCTricepsMedida2: novaAvalicao.getDCtricepsMedida2(),
        DCTricepsMedida3: novaAvalicao.getDCtricepsMedida3(),
        DCabdomenMedida1: novaAvalicao.getDCabdomenMedida1(),
        DCabdomenMedida2: novaAvalicao.getDCabdomenMedida2(),
        DCabdomenMedida3: novaAvalicao.getDCabdomenMedida3(),
        FrequenciaCardiacaDeRepouso: novaAvalicao.getFrequenciaCardiacaDeRepouso(),
        IMC: imc,
        PressaoDiastolica: novaAvalicao.getPressaoDiastolica(),
        PressaoSistolica: novaAvalicao.getPressaoSistolica(),
        ResistenciaAbdominal: novaAvalicao.getTesteResistenciaAbdominal(),
        TesteSentarAlcancarMedida1: novaAvalicao.getTesteSentarAlcancarMedida1(),
        TesteSentarAlcancarMedida2: novaAvalicao.getTesteSentarAlcancarMedida2(),
        TesteSentarAlcancarMedida3: novaAvalicao.getTesteSentarAlcancarMedida3(),
        abdomenMedida1: novaAvalicao.getAbdomenMedida1(),
        abdomenMedida2: novaAvalicao.getAbdomenMedida2(),
        abdomenMedida3: novaAvalicao.getAbdomenMedida3(),
        ano: novaAvalicao.getAno(),
        bracoContraidoMedida1: novaAvalicao.getBracoContraidoMedida1(),
        bracoContraidoMedida2: novaAvalicao.getBracoContraidoMedida2(),
        bracoContraidoMedida3: novaAvalicao.getBracoContraidoMedida3(),
        bracoRelaxadoMedida1: novaAvalicao.getBracoRelaxadoMedida1(),
        bracoRelaxadoMedida2: novaAvalicao.getBracoRelaxadoMedida2(),
        bracoRelaxadoMedida3: novaAvalicao.getBracoRelaxadoMedida3(),
        cinturaMedida1: novaAvalicao.getCinturaMedida1(),
        cinturaMedida2: novaAvalicao.getCinturaMedida2(),
        cinturaMedida3: novaAvalicao.getCinturaMedida3(),
        coxaMedida1: novaAvalicao.getCoxaMedida1(),
        coxaMedida2: novaAvalicao.getCoxaMedida2(),
        coxaMedida3: novaAvalicao.getCoxaMedida3(),
        dia: dia,
        data: `${dia}/${novaAvalicao.getMes()}/${novaAvalicao.getAno()}`,
        dinamometriaPernasMedida1: novaAvalicao.getTesteDinamometriaPernasMedida1(),
        dinamometriaPernasMedida2: novaAvalicao.getTesteDinamometriaPernasMedida2(),
        dinamometriaPernasMedida3: novaAvalicao.getTesteDinamometriaPernasMedida3(),
        estatura: novaAvalicao.getEstatura(),
        horario: `${horario}: ${minutos}`,
        massaCorporal: novaAvalicao.getMassaCorporal(),
        mes: mes,
        pernaMedida1: novaAvalicao.getPernaMedida1(),
        pernaMedida2: novaAvalicao.getPernaMedida2(),
        pernaMedida3: novaAvalicao.getPernaMedida3(),
        quadrilMedida1: novaAvalicao.getQuadrilMedida1(),
        quadrilMedida2: novaAvalicao.getQuadrilMedida2(),
        quadrilMedida3: novaAvalicao.getQuadrilMedida3(),
        pressaoArterial: pressaoArterial
    }
    console.log(avaliacao)
    console.log("FCdR: ", avaliacao.FrequenciaCardiacaDeRepouso)

    const finalizarAvaliacao = () => {
        setSalvandoAvaliacao(true)
        if (!conexao) {
            setDoc(doc(firebaseBD, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel, 'alunos', `Aluno ${aluno.email}`, 'Avaliações', `Avaliacao${ano}|${mes}|${dia}|${horario}|${minutos}`), {
                DCCoxaMedida1: novaAvalicao.getDCcoxaMedida1(),
                DCCoxaMedida2: novaAvalicao.getDCcoxaMedida2(),
                DCCoxaMedida3: novaAvalicao.getDCcoxaMedida3(),
                DCCristaIliacaMedida1: novaAvalicao.getDCcristailiacaMedida1(),
                DCCristaIliacaMedida2: novaAvalicao.getDCcristailiacaMedida2(),
                DCCristaIliacaMedida3: novaAvalicao.getDCcristailiacaMedida3(),
                DCPeitoralMedida1: novaAvalicao.getDCpeitoralMedida1(),
                DCPeitoralMedida2: novaAvalicao.getDCpeitoralMedida2(),
                DCPeitoralMedida3: novaAvalicao.getDCpeitoralMedida3(),
                DCTricepsMedida1: novaAvalicao.getDCtricepsMedida1(),
                DCTricepsMedida2: novaAvalicao.getDCtricepsMedida2(),
                DCTricepsMedida3: novaAvalicao.getDCtricepsMedida3(),
                DCabdomenMedida1: novaAvalicao.getDCabdomenMedida1(),
                DCabdomenMedida2: novaAvalicao.getDCabdomenMedida2(),
                DCabdomenMedida3: novaAvalicao.getDCabdomenMedida3(),
                FrequenciaCardiacaDeRepouso: novaAvalicao.getFrequenciaCardiacaDeRepouso(),
                IMC: imc,
                PressaoDiastolica: novaAvalicao.getPressaoDiastolica(),
                PressaoSistolica: novaAvalicao.getPressaoSistolica(),
                ResistenciaAbdominal: novaAvalicao.getTesteResistenciaAbdominal(),
                TesteSentarAlcancarMedida1: novaAvalicao.getTesteSentarAlcancarMedida1(),
                TesteSentarAlcancarMedida2: novaAvalicao.getTesteSentarAlcancarMedida2(),
                TesteSentarAlcancarMedida3: novaAvalicao.getTesteSentarAlcancarMedida3(),
                abdomenMedida1: novaAvalicao.getAbdomenMedida1(),
                abdomenMedida2: novaAvalicao.getAbdomenMedida2(),
                abdomenMedida3: novaAvalicao.getAbdomenMedida3(),
                ano: novaAvalicao.getAno(),
                bracoContraidoMedida1: novaAvalicao.getBracoContraidoMedida1(),
                bracoContraidoMedida2: novaAvalicao.getBracoContraidoMedida2(),
                bracoContraidoMedida3: novaAvalicao.getBracoContraidoMedida3(),
                bracoRelaxadoMedida1: novaAvalicao.getBracoRelaxadoMedida1(),
                bracoRelaxadoMedida2: novaAvalicao.getBracoRelaxadoMedida2(),
                bracoRelaxadoMedida3: novaAvalicao.getBracoRelaxadoMedida3(),
                cinturaMedida1: novaAvalicao.getCinturaMedida1(),
                cinturaMedida2: novaAvalicao.getCinturaMedida2(),
                cinturaMedida3: novaAvalicao.getCinturaMedida3(),
                coxaMedida1: novaAvalicao.getCoxaMedida1(),
                coxaMedida2: novaAvalicao.getCoxaMedida2(),
                coxaMedida3: novaAvalicao.getCoxaMedida3(),
                dia: dia,
                data: `${novaAvalicao.getDia()}/${novaAvalicao.getMes()}/${novaAvalicao.getAno()}`,
                dinamometriaPernasMedida1: novaAvalicao.getTesteDinamometriaPernasMedida1(),
                dinamometriaPernasMedida2: novaAvalicao.getTesteDinamometriaPernasMedida2(),
                dinamometriaPernasMedida3: novaAvalicao.getTesteDinamometriaPernasMedida3(),
                estatura: novaAvalicao.getEstatura(),
                horario: `${horario}: ${minutos}`,
                massaCorporal: novaAvalicao.getMassaCorporal(),
                mes: mes,
                pernaMedida1: novaAvalicao.getPernaMedida1(),
                pernaMedida2: novaAvalicao.getPernaMedida2(),
                pernaMedida3: novaAvalicao.getPernaMedida3(),
                quadrilMedida1: novaAvalicao.getQuadrilMedida1(),
                quadrilMedida2: novaAvalicao.getQuadrilMedida2(),
                quadrilMedida3: novaAvalicao.getQuadrilMedida3(),
                pressaoArterial: pressaoArterial,
            }).then(() => {
                console.log("Documento criado com sucesso")
                setDoc(doc(firebaseBD, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel, 'alunos', `Aluno ${aluno.email}`, 'Notificações', `Notificação${ano}|${mes}|${dia}`), {
                    data: `${dia}/${mes}/${ano}`,
                    nova: true,
                    remetente: professorLogado.getNome(),
                    tipo: 'professor',
                    texto: "Sua avaliação foi cadastrada com sucesso no sistema. Você já pode acessar as informações dela na tela Analise do Programa de Treino.",
                    titulo: "Nova avaliação cadastrada!"

                }).then(() => {
                    setDoc(doc(firebaseBD, "Academias", professorLogado.getAcademia(), "Professores", professorLogado.getNome(), 'Notificações', `Notificação${ano}|${mes}|${dia}`), {
                        data: `${dia}/${mes}/${ano}`,
                        nova: true,
                        remetente: 'Sistema',
                        tipo: 'sistema',
                        texto: `A avaliação realizada no dia ${dia}/${mes}/${ano}, pelo professor ${professorLogado.getNome()}, para o aluno ${aluno.nome} foi cadastrada com sucesso.`,
                        titulo: "Nova avaliação cadastrada!"

                    }).then(() => {
                        const handleNotificationLocal = async () => {
                            await Notification.scheduleNotificationAsync({
                                content: {
                                    title: 'Nova avaliação cadastrada!',
                                    body: `A avaliação realizada no dia ${dia}/${mes}/${ano}, pelo professor ${professorLogado.getNome()}, para o aluno ${aluno.nome} foi cadastrada com sucesso.`,
                                    data: []
                                },
                                trigger: {
                                    seconds: 2
                                }
                            });
                        }
                        handleNotificationLocal()
                    })

                }).catch((erro) => {
                    console.log(`Ocorreu um erro durante a criação do documento. Erro: ${erro}`)
                })
                setSalvandoAvaliacao(false)
                navigation.navigate('Modal aviso avaliação sucesso')
            }).catch((erro) => {
                console.log(`Ocorreu um erro durante a criação do documento. Erro: ${erro}`)
            })
        } else {
            try {
                const avaliacaoString = JSON.stringify(avaliacao)
                AsyncStorage.setItem(`Aluno ${aluno.email}-Avaliacao${ano}|${mes}|${dia}|${horario}|${minutos}`, avaliacaoString)
                setSalvandoAvaliacao(false)
                navigation.navigate('Modal aviso avaliação sucesso')
            } catch (error) {
                console.log("Não foi possível salvar dados no AsyncStorage")
            }
        }


    }
    return (
        <ScrollView style={[estilo.corLightMenos1]}>
            {!conexao ?
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Modo Offline",
                        "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                    );
                }} style={[estilo.centralizado, { marginVertical: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                    <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                </TouchableOpacity>
                : null}
            <Spinner
                visible={salvandoAvaliacao}
                textContent={'Salvando avaliação...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
            />

            <View style={[{ marginVertical: '5%' }]}>
                <View style={[{ marginVertical: '3%', marginLeft: '3%' }]}>
                    <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>NOME DO ALUNO:</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{aluno.nome}</Text>
                </View>
                <View style={[{ marginVertical: '3%', marginLeft: '3%' }]}>
                    <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>AVALIADOR:</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{professorLogado.getNome()}</Text>
                </View>
                <View style={[{ marginVertical: '3%', marginLeft: '3%' }]}>
                    <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>RESULTADOS:</Text>
                </View>

                <View style={{ marginVertical: '3%' }}>
                    <TabelaDeResultados
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
                        DCCoxaMedida1={avaliacao.DCCoxaMedida1}
                        DCCoxaMedida2={avaliacao.DCCoxaMedida2}
                        DCCoxaMedida3={avaliacao.DCCoxaMedida3}
                        DCTricepsMedida1={avaliacao.DCTricepsMedida1}
                        DCTricepsMedida2={avaliacao.DCTricepsMedida2}
                        DCTricepsMedida3={avaliacao.DCTricepsMedida3}
                        DCAbdomenMedida1={avaliacao.DCabdomenMedida1}
                        DCAbdomenMedida2={avaliacao.DCabdomenMedida2}
                        DCAbdomenMedida3={avaliacao.DCabdomenMedida3}
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
                        pressaoArterial={avaliacao.pressaoArterial}
                    />
                </View>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={finalizarAvaliacao}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>SALVAR AVALIAÇÃO</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}