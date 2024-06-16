import React, { useState, useEffect } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet, BackHandler, Animated, Alert } from 'react-native'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import Spinner from 'react-native-loading-spinner-overlay';
import estilo from "../estilo";
import Home from './../Home'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SelecaoAluno from '../SelecaoAluno';
import Logo from '../Logo';
import Parq from '../Parq';
import PerfilProfessor from '../PerfilProfessor';
import Notificacoes from '../Notificacoes';
import { professorLogado } from "../LoginScreen";
import { enderecoProfessor } from "../LoginScreen";
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

const Tab = createBottomTabNavigator()

export default function Routes() {
  const [carregando, setCarregando] = useState(true)
  const [alunos, setAlunos] = useState([])
  const [carregandoAlunos, setCarregandoAlunos] = useState(true)
  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
      if (conexao !== '') {
        if (conexao) {
          fetchAlunosWifi()
          console.log("Wifi")
          verificaDocumentos()
        } else {
          fetchAlunosSemNet()
          verificaDocumentos()

        }
      } else {
        console.log("Aaa")
      }
    })
    return () => {
      unsubscribe()
    }
  }, [conexao])

  const fetchAlunosSemNet = async () => {
    const newArrayAlunos = []
    try {
      const keys = await AsyncStorage.getAllKeys()
      for (const key of keys) {

        if (key.includes('Aluno')) {
          const itemDoAS = await AsyncStorage.getItem(key)
          const stringItem = JSON.parse(itemDoAS)
          newArrayAlunos.push(stringItem)

        }

      }
      setAlunos(newArrayAlunos)
      setCarregando(false)

    } catch (error) {
      console.log("Erro na leitura do AS")
    }


  }


  const fetchAlunosWifi = async () => {
    const newArrayAlunos = [];

    try {

      const academiaRef = collection(firebaseBD, 'Academias');
      const querySnapshot = await getDocs(academiaRef);

      for (const academiaDoc of querySnapshot.docs) {
        const academiaNome = academiaDoc.get('nome');

        if (academiaNome === professorLogado.getAcademia()) {
          const alunoRef = collection(
            firebaseBD,
            'Academias',
            professorLogado.getAcademia(),
            'Alunos',
          );
          const alunoSnapshot = await getDocs(alunoRef);

          for (const alunoDoc of alunoSnapshot.docs) {
            const alunoData = alunoDoc.data();

            const avaliacoesRef = collection(
              firebaseBD,
              'Academias',
              professorLogado.getAcademia(),
              'Alunos',
              `${alunoData.email}`,
              'Avaliações'
            );
            const avaliacoesSnapshot = await getDocs(avaliacoesRef);
            alunoData.avaliacoes = avaliacoesSnapshot.docs.map(avaliacaoDoc => avaliacaoDoc.data());

            const fichasRef = collection(
              firebaseBD,
              'Academias',
              professorLogado.getAcademia(),
              'Alunos',
              `${alunoData.email}`,
              'FichaDeExercicios'
            );
            const fichasSnashot = await getDocs(fichasRef);
            let index = 0;
            fichasSnashot.forEach(async (fichaDoc) => {

              const fichaData = fichaDoc.data()
              alunoData.fichas = fichasSnashot.docs.map(fichaDoc => fichaDoc.data());

              const exerciciosRef = collection(
                firebaseBD,
                'Academias',
                professorLogado.getAcademia(),
                'Alunos',
                `${alunoData.email}`,
                'FichaDeExercicios',
                fichaDoc.id,
                'Exercicios'
              );
              const arrayExerciciosFicha = []
              const exerciciosSnapshot = await getDocs(exerciciosRef);
              exerciciosSnapshot.forEach((exDoc) => {
                arrayExerciciosFicha.push(exDoc.data())
              })
              alunoData.fichas[index].exercicios = arrayExerciciosFicha
              index++
            }
            )
            newArrayAlunos.push(alunoData)
          }


        }
      }

      const comparaDataVencimento = (date1, date2) => {
        const momentDate1 = moment(date1, 'DD/MM/YY');
        const momentDate2 = moment(date2, 'DD/MM/YY');

        const daysDifference = momentDate1.diff(momentDate2, 'days');
        return Math.abs(daysDifference) === 7;
      };


      const data = new Date()
      const dia = data.getDate()
      const mes = data.getMonth() + 1
      const ano = data.getFullYear()


      console.log("CHEGOU AQUI 1")

      newArrayAlunos.map((item) => {

        if(typeof item.fichas !== 'undefined'){
          if (comparaDataVencimento(item.fichas[item.fichas.length - 1].dataFim, `${dia}/${mes}/${ano}`)) {
            item.fichaVencendo = true
          }
        }

      })
      console.log("CHEGOU AQUI 2")


      newArrayAlunos.map((item) =>{
        if(item.fichaVencendo){
          Alert.alert("Aluno com ficha vencendo!", `A ficha do aluno ${item.nome} está prestes a vencer. Prepare um treino para esse aluno. A ficha vence na data: ${item.fichas[item.fichas.length - 1].dataFim}`)
        }
      })
      setAlunos(newArrayAlunos);



      setCarregando(false)

      newArrayAlunos.forEach(async (item) => {
        try {
          const itemString = JSON.stringify(item)
          await AsyncStorage.setItem(`Aluno ${item.email}`, itemString)
        } catch (error) {
          console.log("Erro no AS")
        }
      })


    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };




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
                  setDoc(doc(bd, 'Academias', item.Academia, 'Alunos', `${item.email}`, 'Avaliações', dataAvaliacao),
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
                    setDoc(doc(bd, 'Academias', item.Academia, 'Alunos', `${item.email}`, 'FichaDeExercicios', dataFicha),
                      atributosObj)
                    //AsyncStorage.removeItem(key)
                  }
                  if (ultimoParam.includes('Exercicio')) {
                    const atributosObj = JSON.parse(value)
                    setDoc(doc(bd, 'Academias', item.Academia, 'Alunos', `${item.email}`, 'FichaDeExercicios', dataFicha, "Exercicios", ultimoParam),
                      atributosObj)
                    //AsyncStorage.removeItem(key)

                  }
                  console.log('key ', key, 'value ', value)
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



  useEffect(() => { verificaDocumentos(); }, [])
  if (carregando) {
    return (
      <Spinner
        visible={carregando}
        textContent={'Carregando...'}
        textStyle={[estilo.textoCorLight, estilo.textoP16px]}
      />
    )
  }



  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#182128',
        borderTopColor: '#182128'

      },
      tabBarActiveTintColor: '#0066FF',
      tabBarInactiveTintColor: '#CFCDCD',
    }}>
      <Tab.Screen
        name="Home"
        initialParams={{ alunos }}
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (<Ionicons name="home-outline" size={size} color={color} />)
        }} />
      <Tab.Screen
        name="Alunos"
        initialParams={{ alunos }}
        component={SelecaoAluno}
        options={{
          tabBarIcon: ({ size, color }) => (<Ionicons name="people" size={size} color={color} />)
        }} />
      <Tab.Screen
        name="Perfil"
        component={PerfilProfessor}
        options={{
          tabBarIcon: ({ size, color }) => (<AntDesign name="user" size={size} color={color} />)
        }} />
      <Tab.Screen
        name="Notificações"
        component={Notificacoes}
        initialParams={{ alunos }}
        options={{
          tabBarIcon: ({ size, color }) => (<Ionicons name="notifications-outline" size={size} color={color} />)

        }} />

    </Tab.Navigator>
  )
}