import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import estilo from '../../estilo';
import MensagemEnviada from './MensagemEnviada';
import MensagemRecebida from './MensagemRecebida';
import Header from './Header';
import {setDoc,doc, getDocs, getFirestore, where , query, addDoc, collection, onSnapshot, snapshotEqual, Firestore, serverTimestamp, orderBy} from "firebase/firestore";
import {firebase, firebaseBD} from '../../configuracoes/firebaseconfig/config'
import { FontAwesome } from '@expo/vector-icons'; 
import { professorLogado } from '../../Home';

export default ({route}) => {

    const {aluno} = route.params
    const altura = Dimensions.get('screen').height
    const [mensagem, setMensagem] = useState('')
    const [mensagens, setMensagens] = useState([])

    const enviarMensagem = (mensagem) => {
        const mensagemRef = collection(
          firebaseBD,
          'Academias',
          professorLogado.getAcademia(),
          'Professores',
          professorLogado.getNome(),
          'Mensagens',
          `Mensagens ${aluno.email}`,
          'todasAsMensagens' 
        );
      
        const novaMensagem = {
          texto: mensagem,
          data: serverTimestamp(), // Timestamp: data atual
          remetente: professorLogado.getEmail(),
          destinatario: aluno.email,
        };
      
        addDoc(mensagemRef, novaMensagem)
          .then((docRef) => {
            console.log('Nova mensagem inserida com o ID: ', docRef.id);
          })
          .catch((error) => {
            console.log('Erro ao inserir a nova mensagem', error);
          });
          setMensagem('')
      };

      const recuperarMensagens = useCallback(async () => {
        try {
          const mensagemRef = collection(
            firebaseBD,
            'Academias',
            professorLogado.getAcademia(),
            'Professores',
            professorLogado.getNome(),
            'Mensagens',
            `Mensagens ${aluno.email}`,
            'todasAsMensagens' 
          );
      
          const q = query(mensagemRef, orderBy('data', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const mensagensArray = [];
        querySnapshot.forEach((doc) => {
          mensagensArray.push(doc.data());
        });
        setMensagens(mensagensArray);
      });
      
          return () => unsubscribe();
        } catch (error) {
          console.log('Erro ao recuperar as mensagens:', error);
        }
      }, [aluno.email]);
      useLayoutEffect(() => {
        recuperarMensagens();
      }, [recuperarMensagens]);

    return (
        <SafeAreaView style={[estilo.corLightMenos1, {minHeight: altura}]}>
            <Header aluno={aluno}/>
            <ScrollView>
                <View style={[estilo.centralizado, estilo.corLightMenos1]}>
                {mensagens.map((mensagem) => (
                  mensagem.remetente === professorLogado.getEmail() ? 
                  <MensagemEnviada texto={mensagem.texto} key={mensagem.id} /> : 
                  <MensagemRecebida texto={mensagem.texto} key={mensagem.id} />
))}
                </View>
                
            </ScrollView>
            <View style={[style.blocoDeTexto, estilo.corLight]}>
                    <TextInput placeholder='Digite sua mensagem' style={[style.digitarMensagem, estilo.corLightMenos1, estilo.centralizado, {padding: 5}]} value={mensagem} onChangeText={(text)=> setMensagem(text)}/>
                    <TouchableOpacity style={[estilo.centralizado, estilo.corPrimaria, style.botaoEnviarMensagem]} onPress={()=> enviarMensagem(mensagem)}>
                        <View style={[estilo.centralizado, {marginTop: 10}]}>
                           <FontAwesome name="send" size={30} color="white" />

                        </View>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    blocoDeTexto: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 50
    },
    digitarMensagem: {
        width: '80%',
        height: 50,
        borderWidth: 1,

    },
    botaoEnviarMensagem: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})