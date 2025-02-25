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
import { professorLogado } from "../LoginScreen";
import { dadosverif } from "../LoginScreen";
import { enderecoProfessor } from "../LoginScreen";
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import { Octicons } from '@expo/vector-icons';
import Versoes from '../Versao'
const Tab = createBottomTabNavigator()

export default function Routes({ route }) {
  const { dadosverif } = route.params;
  const [carregando, setCarregando] = useState(true)
  const [alunos, setAlunos] = useState([])
  const [carregandoAlunos, setCarregandoAlunos] = useState(true)
  const [conexao, setConexao] = useState(true);
  const [numChaveAs, setNumChaveAs] = useState(-1)
  console.log("isso tudo",alunos.length)
  const recuperarChavesAS = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const numberOfKeys = keys.length;
    console.log('numberOfKeys', numberOfKeys)
    setNumChaveAs(numberOfKeys)
  }
  useEffect(() => {
    recuperarChavesAS()
    if(numChaveAs != -1){
      if (conexao !== '') {
        if (conexao) {
          console.log("V OU F",dadosverif);
          if (dadosverif == !false){
            if(numChaveAs <= 6){
              console.log("Verifiquei com net")
              fetchAlunosWifi()
              verificaDocumentos()
            } else { 
              console.log("Verifiquei sem net")
              fetchAlunosSemNet()
              verificaDocumentos()
    
            }
          }else{
            fetchAlunosWifi()
            verificaDocumentos()
          }
        } else {
          if (dadosverif == false){
              Alert.alert("Academia ou firebase alterados, nao foi possivel recuperar dados");
          }else{
            fetchAlunosSemNet()
          }
        }
      } else {
        console.log("Aaa")
      }
    }
    
  },[numChaveAs])
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state  => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
      
    })
    return () => {
      unsubscribe()
    }
  }, [conexao])

  const fetchAlunosSemNet = async () => {
    console.log("Chamando fetchAlunosSemNet...");
    const newArrayAlunos = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        if (key.includes('Aluno')) {
          const itemDoAS = await AsyncStorage.getItem(key);
          const stringItem = JSON.parse(itemDoAS);
          newArrayAlunos.push(stringItem);
        }
      }
      setAlunos(newArrayAlunos);
      setCarregando(false);
    } catch (error) {
      console.log("Erro na leitura do AsyncStorage:", error);
      Alert.alert("Erro", `Erro ao carregar dados offline: ${error.message}`);
    }
  };
  console.log("essa mesmo?",professorLogado.getAcademia())

  const fetchAlunosWifi = async () => {
    try {
      console.log("Chamando fetchAlunosWifi...");
      const newArrayAlunos = [];
      const alunoRef = collection(
        firebaseBD,
        'Academias',
        professorLogado.getAcademia(),
        'Alunos'
      );
      const alunoSnapshot = await getDocs(alunoRef);
    
      for (const alunoDoc of alunoSnapshot.docs) {
        const alunoData = alunoDoc.data();
    
        const avaliacoesRef = collection(
          firebaseBD,
          'Academias',
          professorLogado.getAcademia(),
          'Alunos',
          alunoDoc.id,
          'Avaliações'
        );
        const avaliacoesSnapshot = await getDocs(avaliacoesRef);
        alunoData.avaliacoes = avaliacoesSnapshot.docs.map(avaliacaoDoc => avaliacaoDoc.data());
        const fichasRef = collection(
          firebaseBD,
          'Academias',
          professorLogado.getAcademia(),
          'Alunos',
          alunoDoc.id,
          'FichaDeExercicios'
        );
        const fichasSnapshot = await getDocs(fichasRef);
        alunoData.fichas = await Promise.all(
          fichasSnapshot.docs.map(async fichaDoc => {
            const fichaData = fichaDoc.data();
    
            const exerciciosRef = collection(
              firebaseBD,
              'Academias',
              professorLogado.getAcademia(),
              'Alunos',
              alunoDoc.id,
              'FichaDeExercicios',
              fichaDoc.id,
              'Exercicios'
            );
            const exerciciosSnapshot = await getDocs(exerciciosRef);
            fichaData.exercicios = exerciciosSnapshot.docs.map(exDoc => exDoc.data());
    
            return fichaData;
          })
        );
    
        newArrayAlunos.push(alunoData);
      }
    
      const dataAtual = moment();
      newArrayAlunos.forEach(item => {
        if (item.fichas && item.fichas.length > 0) {
          const ultimaFicha = item.fichas[item.fichas.length - 1];
          const dataFimFicha = moment(ultimaFicha.dataFim, 'DD/MM/YY');
    
          if (dataAtual.diff(dataFimFicha, 'days') === 7) {
            item.fichaVencendo = true;
            Alert.alert(
              "Aluno com ficha vencendo!",
              `A ficha do aluno ${item.nome} está prestes a vencer. Prepare um treino para esse aluno. A ficha vence na data: ${ultimaFicha.dataFim}`
            );
          }
        }
      });
      await Promise.all(newArrayAlunos.map(async item => {
        const itemString = JSON.stringify(item);
        await AsyncStorage.setItem(`Aluno ${item.email}`, itemString);
      }));
    
      setAlunos(newArrayAlunos);

      console.log('newArrayAlunos', newArrayAlunos);
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      Alert.alert("Erro", `Erro ao carregar dados online: ${error.message}`);
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
                    AsyncStorage.removeItem(key)
                  }
                  if (ultimoParam.includes('Exercicio')) {
                    const atributosObj = JSON.parse(value)
                    setDoc(doc(bd, 'Academias', item.Academia, 'Alunos', `${item.email}`, 'FichaDeExercicios', dataFicha, "Exercicios", ultimoParam),
                      atributosObj)
                    AsyncStorage.removeItem(key)

                  }
                  console.log('key ', key, 'value ', value)
                }
              })
            }
          }
        }
      } catch (error) {
        console.error('Erro ao obter dados do AsyncStorage:', error);
        Alert.alert("Erro", `Erro ao sincronizar dados: ${error.message}`);

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
        name="Versao"
        component={Versoes}
        initialParams={{ alunos }}
        options={{
          tabBarIcon: ({ size, color }) => (<Octicons name="versions" size={size} color={color} />)

        }} />

    </Tab.Navigator>
  )
}