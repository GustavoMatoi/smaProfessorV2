import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, Alert } from 'react-native'
import estilo from "../../estilo"

import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import BotaoSelect from "../../BotaoSelect";

import Spinner from "react-native-loading-spinner-overlay"

export default ({ navigation, route }) => {
    const { aluno } = route.params

    const handleSelectChangeTurma = (value) => {
        setSelectedOptionTurma(value);
    }
    const [selectedOptionTurma, setSelectedOptionTurma] = useState('')
    const [carregandoTurmas, setCarregandoTurmas] = useState(true)
    const [turmas, setTurmas] = useState([])
    const [carregandoUpdate, setCarrengandoUpdate] = useState(false)
    useEffect(() => {
        const carregarTurmas = async () => {
            try {
                const db = getFirestore();
    
    
                const turmasRef = collection(db, 'Academias', aluno.Academia, "Turmas")
                const turmas = []
    
                const turmasSnapshot = await getDocs(turmasRef)
    
                turmasSnapshot.forEach((doc) => {
                    const nome = doc.get('nome')
                    turmas.push(nome)
                    console.log(nome)
                })
    
    
                setTurmas(turmas)
            } catch (error) {
                console.log(error);
            }
            finally {
                setCarregandoTurmas(false)
            }
        }
        carregarTurmas()
      }, []);


      const updateTurma = async () => {
        setCarrengandoUpdate(true)
        try {
          const db = getFirestore();
          const academiaDocRef = doc(db, "Academias", aluno.Academia, "Alunos", aluno.email);
            
          await updateDoc(academiaDocRef, {
            turma: selectedOptionTurma
          });
          Alert.alert("Turma atualizada com sucesso!", "A turma do aluno foi atualizada com sucesso.")
          navigation.goBack()
        } catch (error) {
          Alert.alert("Ops..", "Ocorreu um erro durante a atualização da turma. Tente novamente mais tarde.")
        }
        setCarrengandoUpdate(false)
      };

    return (
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
            {
                carregandoUpdate? 
                <Spinner
                visible={carregandoUpdate}
                textContent={'Atualizando turma...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
               /> : null
            }
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado, {width: '90%', margin: 10}]}>Selecione a turma que deseja transferir o aluno:</Text>
            <View style={[style.inputArea, estilo.centralizado]}>
                <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria, {margin: 10}]}>Turmas:</Text>
                {carregandoTurmas ? <Text>Carregando turmas...</Text> 
                :
                <BotaoSelect selecionado={true} onChange={handleSelectChangeTurma} titulo={`Turmas da ${aluno.Academia}`} max={1} options={turmas}>
                </BotaoSelect>}
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => updateTurma()}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}


const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    inputArea: {
        width: '95%'
    },
    areaLogo: {
        paddingTop: '5%',
        height: '10%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '5%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '3%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '100%'
    },
    containerBotao: {
        width: '40%',
        height: '100%',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        borderRadius: 15,
        padding: 5
    },

    iconeBotao: {
        padding: 5,
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

})

