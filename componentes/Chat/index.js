import React, {useState, useEffect} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import { FontAwesome5 } from '@expo/vector-icons'; 
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { collection,setDoc,doc, getDocs, getDoc,getFirestore, where , query , addDoc, updateDoc, orderBy} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../Home";
import Conversas from "./Conversas";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";
import * as Notification from "expo-notifications"

export default ({navigation}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [alunos, setAlunos] = useState([])
    const [conexao, setConexao] = useState(true)

    useEffect (() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type == 'wifi' || state.type === 'cellular')
      })

      return () => {
        unsubscribe()
      }

    }, [])
    const [carregandoAlunos, setCarregandoAlunos] = useState(true)
    useEffect(() => {
      const fetchAlunos = async () => {
        try {
          const academiaRef = collection(firebaseBD, 'Academias');
          const querySnapshot = await getDocs(academiaRef);
    
          const newArrayAlunos = [];
    
          for (const academiaDoc of querySnapshot.docs) {
            const academiaNome = academiaDoc.get('nome');
            if (academiaNome === professorLogado.getAcademia()) {
              const professoresRef = collection(
                academiaDoc.ref,
                'Professores'
              );
              const professoresSnapshot = await getDocs(professoresRef);
    
              for (const professorDoc of professoresSnapshot.docs) {
                const professorData = professorDoc.data();
                const alunoRef = collection(
                  professorDoc.ref,
                  'alunos'
                );
                const alunoSnapshot = await getDocs(alunoRef);
    
                for (const alunoDoc of alunoSnapshot.docs) {
                  const alunoData = alunoDoc.data();
                  
                  const mensagensRef = collection(
                    firebaseBD, 'Academias', professorLogado.getAcademia(), 'Professores', professorLogado.getNome(),
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
                    console.log(remetente)
                  }
                }
              }
            }
          }

          setAlunos(newArrayAlunos);
          setCarregandoAlunos(false);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchAlunos();
    }, []);
      
    const handleNotificationLocal = async(alunoUltimaMensagem) => {
      await Notification.scheduleNotificationAsync({
          content: {
              title: 'Nova mensagem!',
              body: `Nova mensagem do aluno ${alunoUltimaMensagem}`, 
              data: []
          } ,
          trigger: {
              seconds: 1
          }
      });
  }
    return (
        <View 
        style={style.container}>
           {conexao?  carregandoAlunos ? (
      <Spinner
      visible={carregandoAlunos}
      textContent={'Carregando mensagens...'}
      textStyle={[estilo.textoCorLight, estilo.textoP16px]}
    />
) : (
  alunos.map((aluno) => {
    aluno.remetente === professorLogado.getEmail() ? '' : handleNotificationLocal(aluno.remetente)
    return(    
    <Conversas aluno={aluno.aluno} navigation={navigation} backgroundColor={aluno.remetente !== professorLogado.getEmail() ? '#0066FF' : '#FFFFFF'}/>
  )
      
})

) :  <ModalSemConexao ondeNavegar={'Home'} navigation={navigation}/>}
        </View>
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