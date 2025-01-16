import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, View, ScrollView } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../LoginScreen";
import Conversas from "./Conversas";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";
import * as Notification from "expo-notifications"

export default ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true)
  const [professores, setProfessores] = useState([])
  const [conexao, setConexao] = useState(true)
  const [alunos, setAlunos] = useState([])
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type == 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }

  }, [])
  
  const [carregandoAlunos, setCarregandoAlunos] = useState(true)
  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const academiaRef = collection(firebaseBD, 'Academias');
        const querySnapshot = await getDocs(academiaRef);
    
        const newArrayProfessores = [];
    
        for (const academiaDoc of querySnapshot.docs) {
          const academiaNome = academiaDoc.get('nome');
          if (academiaNome === professorLogado.getAcademia()) {
            const professoresRef = collection(academiaDoc.ref, 'Professores');
            const professoresSnapshot = await getDocs(professoresRef);
    
            for (const professorDoc of professoresSnapshot.docs) {
              const professorData = professorDoc.data();
              const mensagensRef = collection(
                firebaseBD, 'Academias', professorLogado.getAcademia(), 'Professores', professorData.email,
                'Mensagens',
                `Mensagens ${professorLogado.getEmail()}`,
                'todasAsMensagens'
              );
    
              const q = query(mensagensRef, orderBy('data', 'asc'));
              const mensagensSnapshot = await getDocs(q);
              const lastMessageDoc = mensagensSnapshot.docs[mensagensSnapshot.docs.length - 1];
              
              if (lastMessageDoc) {
                const remetente = lastMessageDoc.get('remetente');
                newArrayProfessores.push({ professor: professorData, remetente: remetente });
              } else {
                const remetente = 'ninguem';
                newArrayProfessores.push({ professor: professorData, remetente: remetente });
              }
            }
          }
        }
        setProfessores(newArrayProfessores.sort((a, b) => a.professor.nome.localeCompare(b.professor.nome)));
      } catch (error) {
        console.log(error);
      }
    };

    console.log("Oiii")

    const fetchAlunos = async () => {
      try {
        const academiaRef = collection(firebaseBD, 'Academias');
        const querySnapshot = await getDocs(academiaRef);
    
        const newArrayAlunos = [];
    
        for (const academiaDoc of querySnapshot.docs) {
          const academiaNome = academiaDoc.get('nome');
          if (academiaNome === professorLogado.getAcademia()) {
            const alunosRef = collection(firebaseBD, 'Academias', professorLogado.getAcademia(), 'Alunos');
            const alunosSnapshot = await getDocs(alunosRef);
    
            for (const alunoDoc of alunosSnapshot.docs) {
              const alunoData = alunoDoc.data();
              const mensagensRef = collection(
                firebaseBD, 'Academias', professorLogado.getAcademia(), 'Professores', professorLogado.getEmail(),
                'Mensagens',
                `Mensagens ${alunoData.email}`,
                'todasAsMensagens'
              );
    
              const q = query(mensagensRef, orderBy('data', 'asc'));
              const mensagensSnapshot = await getDocs(q);
              const lastMessageDoc = mensagensSnapshot.docs[mensagensSnapshot.docs.length - 1];
    
              if (lastMessageDoc) {
                const remetente = lastMessageDoc.get('remetente');
                newArrayAlunos.push({ aluno: alunoData, remetente: remetente });
              } else {
                const remetente = 'ninguem';
                newArrayAlunos.push({ aluno: alunoData, remetente: remetente });
              }
            }
          }
        }
        setAlunos(newArrayAlunos.sort((a, b) => a.aluno.nome.localeCompare(b.aluno.nome)));
      } catch (error) {
        console.log(error);
      } finally {
        setCarregandoAlunos(false);
      }
    };
    
    fetchProfessores();
    fetchAlunos();
  }, []);

  console.log("ALUNOS LENGHT", professores.length)

  const handleNotificationLocal = async (alunoUltimaMensagem) => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: 'Nova mensagem!',
        body: `Nova mensagem do aluno ${alunoUltimaMensagem}`,
        data: []
      },
      trigger: {
        seconds: 1
      }
    });
  }
  return (
    <ScrollView
      style={style.container}>
      {conexao ? carregandoAlunos ? (
        <Spinner
          visible={carregandoAlunos}
          textContent={'Carregando mensagens...'}
          textStyle={[estilo.textoCorLight, estilo.textoP16px]}
        />
      ) : (
        <View>
          {professores.map((professor) => {
          console.log(professor.remetente)
          if (professor.professor.email !== professorLogado.getEmail()){
            return (
              <Conversas aluno={professor.professor} tipo={'Professor'} navigation={navigation} backgroundColor={professor.remetente !== professorLogado.getEmail() && professor.remetente != "ninguem"? '#0066FF' : '#FFFFFF'} />
            )
          }

        })}
          {alunos.map((aluno) => {
          console.log(aluno.remetente)
            return (
              <Conversas aluno={aluno.aluno} tipo={'Aluno'} navigation={navigation} backgroundColor={aluno.remetente !== professorLogado.getEmail() && aluno.remetente != "ninguem"? '#0066FF' : '#FFFFFF'} />
              )
        })}
        
        </View>

      ) : <ModalSemConexao ondeNavegar={'Home'} navigation={navigation} />}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%'
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%'
  },
  textoAlinhado: {
    marginLeft: '5%',
    marginTop: '15%',
    textDecorationLine: 'underline',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'space-around', // Alinha os itens horizontalmente

  }

})