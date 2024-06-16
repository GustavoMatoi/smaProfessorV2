import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, Alert } from 'react-native'
import estilo from "./estilo"
import Logo from "./Logo"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo"
import { professorLogado } from "./LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import moment from "moment";


export default ({ navigation, route }) => {
  const {alunos} = route.params


  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])



  const verificaDocumentos = async () => {


    if (conexao) {
      console.log("com conexao")
      const bd = getFirestore();
      try {
        const keys = await AsyncStorage.getAllKeys();
        const arrayAlunos = []

        for (const key of keys) {
          const value = await AsyncStorage.getItem(key);

          if (value) {

            if (key.includes("Avaliacao")) {

              const parts = key.split(' ');
              const email = parts[1].split("-")[0];
              const dataAvaliacao = parts[1].split("-")[1];
              alunos.forEach((item) => {

                if (item.email == email) {
                  const avaliacaoObjeto = JSON.parse(value)
                  setDoc(doc(bd, 'Academias', item.Academia, 'Professores', item.professorResponsavel, 'alunos', `Aluno ${item.email}`, 'Avaliações', dataAvaliacao),
                    avaliacaoObjeto)
                  AsyncStorage.removeItem(key)
                  console.log('key: ', key, "data ", dataAvaliacao, " value:", value)

                }
              })
            }
            if (key.includes("FichaDeExercicios")) {

              const parts = key.split(' ');
              const email = parts[1].split("-")[0];
              const dataFicha = parts[1].split("-")[1];
              const ultimoParam = parts[1].split('-')[2];

              alunos.forEach((item) => {

                if (item.email == email) {
                  if (ultimoParam === 'Atributos') {
                    const atributosObj = JSON.parse(value)
                    setDoc(doc(bd, 'Academias', item.Academia, 'Professores', item.professorResponsavel, 'alunos', `Aluno ${item.email}`, 'FichaDeExercicios', dataFicha),
                      atributosObj)
                    //AsyncStorage.removeItem(key)
                  }
                  if (ultimoParam.includes('Exercicio')) {
                    const atributosObj = JSON.parse(value)
                    setDoc(doc(bd, 'Academias', item.Academia, 'Professores', item.professorResponsavel, 'alunos', `Aluno ${item.email}`, 'FichaDeExercicios', dataFicha, "Exercicios", ultimoParam),
                      atributosObj)
                    //AsyncStorage.removeItem(key)

                  }
                }
              })
            }
          }


        }
      } catch (error) {
        console.error('Erro ao obter dados do AsyncStorage:', error);
      }
    
  }
};

verificaDocumentos()


  return (
    <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
      <SafeAreaView>

        <View style={style.areaLogo}>
          <Logo />

        </View>
        <View style={style.areaFrase}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado]}>Boas vindas { professorLogado.getNome() || 'Professor'}!</Text>
        </View>
        <View style={style.areaBotoes}>
          <View style={style.containerBotao}>
            <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Seleção Aluno Montar Treino', { alunos: alunos })}>
              <Foundation name="clipboard-pencil" size={120} color="white" />
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MONTAR TREINO</Text>
            </TouchableOpacity>
          </View>

          <View style={style.containerBotao}>
            <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Seleção Aluno Análise do Programa de Treino', { alunos: alunos })}>
              <View style={[style.iconeBotao]}>
                <MaterialCommunityIcons name="clipboard-text-search-outline" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>AVALIAÇÕES E FICHAS</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={style.areaBotoes}>

          <View style={style.containerBotao}  >
            <TouchableOpacity style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} onPress={() => navigation.navigate('Evolução', { alunos: alunos })} disabled={!conexao}>
              <View style={[style.iconeBotao]}>
                <AntDesign name="linechart" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EVOLUÇÃO DO TREINO {!conexao ? "Offline" : null} </Text>
            </TouchableOpacity>
          </View>
          <View style={[style.containerBotao]} >
            <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => { navigation.navigate('Nova avaliação', { alunos: alunos }) }}>
              <View style={[style.iconeBotao]}>
                <MaterialCommunityIcons name="clipboard-list-outline" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>REALIZAR AVALIAÇÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.areaBotoes}>

          <View style={style.containerBotao}  >
            <TouchableOpacity style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} onPress={() => navigation.navigate("Seleção Aluno CSV", { alunos: alunos })} disabled={!conexao}>
              <View style={[{ transform: [{ rotate: '-45deg' }] }, style.iconeBotao]}>
                <Ionicons name="barbell-outline" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>DADOS DE TREINO  {!conexao ? "Offline" : null} </Text>
            </TouchableOpacity>
          </View>
          <View style={[style.containerBotao]} >
            <TouchableOpacity style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} onPress={() => navigation.navigate('Chat')} disabled={!conexao}>
              <View style={[style.iconeBotao]}>
                <AntDesign name="wechat" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MENSAGENS {!conexao ? "Offline" : null}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >

    </SafeAreaView>

  )
}


const style = StyleSheet.create({
  container: {
    height: '100%'
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

