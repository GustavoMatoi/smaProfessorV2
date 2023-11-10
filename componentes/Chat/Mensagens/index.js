import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard} from 'react-native'
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
    const [keyboardStatus, setKeyboardStatus] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
        setKeyboardStatus('Keyboard Shown');
        console.log('Keyboard Shown');
        setKeyboardHeight(event.endCoordinates.height);
        console.log(keyboardHeight);
        console.log(event.endCoordinates.height)
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus('Keyboard Hidden');
        console.log('Keyboard Hidden');
        setKeyboardHeight(0);
        console.log(keyboardHeight);

      });
    
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

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
        <View style={[estilo.corLightMenos1, {height: altura}]}>
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
            <View style={[style.blocoDeTexto, estilo.corLight, {bottom: keyboardHeight + 60}]}>
                    <TextInput placeholder='Digite sua mensagem' style={[style.digitarMensagem, estilo.corLightMenos1, estilo.centralizado, {padding: 5}]} value={mensagem} onChangeText={(text)=> setMensagem(text)}/>
                    <TouchableOpacity style={[estilo.centralizado, estilo.corPrimaria, style.botaoEnviarMensagem]} onPress={()=> enviarMensagem(mensagem)}>
                        <View style={[estilo.centralizado, {marginTop: 10}]}>
                           <FontAwesome name="send" size={30} color="white" />

                        </View>
                    </TouchableOpacity>
                </View>
        </View>
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