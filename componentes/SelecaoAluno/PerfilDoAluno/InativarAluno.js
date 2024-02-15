import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, Alert } from 'react-native'
import estilo from "../../estilo"

import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import BotaoSelect from "../../BotaoSelect";

import Spinner from "react-native-loading-spinner-overlay"

export default ({ navigation, route }) => {
    const { aluno, inativo } = route.params



    const [carregandoUpdate, setCarrengandoUpdate] = useState(false)



      const inativarAluno = async () => {
        setCarrengandoUpdate(true)
        try {
          const db = getFirestore();
          const academiaDocRef = doc(db, "Academias", aluno.Academia, "Alunos", aluno.email);
            
            if(inativo){
                await updateDoc(academiaDocRef, {
                    inativo: false
                  });
                  Alert.alert("Aluno ativado!", "O aluno foi ativado com sucesso.")
                  navigation.goBack()
            } else {
                await updateDoc(academiaDocRef, {
                    inativo: true
                  });
                  Alert.alert("Aluno inativado!", "O aluno foi inativado com sucesso.")
                  navigation.goBack()
            }

        } catch (error) {
          Alert.alert("Ops..", "Ocorreu um erro durante a ação. Tente novamente mais tarde.")
        }
        setCarrengandoUpdate(false)
      };

    return (
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
            {
                carregandoUpdate? 
                <Spinner
                visible={carregandoUpdate}
                textContent={'Desabilitando aluno...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
               /> : null
            }
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado, {width: '90%', margin: 10}]}>Selecione a turma que deseja transferir o aluno:</Text>
            <View style={[style.inputArea, estilo.centralizado]}>
                <Text style={[estilo.tituloH427px, style.Montserrat, estilo.centralizado, estilo.textoCorDanger, {margin: 10}]}>ATENÇÃO!</Text>
                <Text style={[estilo.textoP16px, style.Montserrat, estilo.centralizado, estilo.textoCorSecundaria, {margin: 10}]}>
                    {!inativo ? `Ao inativar um aluno, ele ficará impossibilitado de utilizar o sistema.
                     Essa ação poderá ser desfeita mais tarde. Deseja continuar?` : 
                     `Ao ativar um aluno que foi inativado, ele poderá utilizar o sistema novamente.
                     Essa ação poderá ser desfeita mais tarde. Deseja continuar?`
                     }

                     Deseja continuar?</Text>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => inativarAluno()}>
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

