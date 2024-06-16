import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native'
import estilo from '../../estilo';
import MensagemEnviada from './MensagemEnviada';
import MensagemRecebida from './MensagemRecebida';
import Header from './Header';
import { setDoc, doc, getDocs, getFirestore, where, query, addDoc, collection, onSnapshot, snapshotEqual, Firestore, serverTimestamp, orderBy } from "firebase/firestore";
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { FontAwesome } from '@expo/vector-icons';
import { professorLogado } from '../../LoginScreen';

export default ({ route }) => {

  const { aluno, tipo } = route.params
  const altura = Dimensions.get('screen').height
  console.log('aluno no mensagem', aluno)
  console.log('aluno.nome', aluno.nome)

  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  console.log('tipo', tipo)
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
    const mensagemRefRemetente = collection(
      firebaseBD,
      'Academias',
      professorLogado.getAcademia(),
      'Professores',
      professorLogado.getEmail(),
      'Mensagens',
      `Mensagens ${aluno.email}`,
      'todasAsMensagens'
    );

    const mensagemRefDestinatario = collection(
      firebaseBD,
      'Academias',
      professorLogado.getAcademia(),
      'Alunos',
      aluno.email,
      'Mensagens',
      `Mensagens ${professorLogado.getEmail()}`,
      'todasAsMensagens'
    );
    const novaMensagem = {
      texto: mensagem,
      data: serverTimestamp(),
      remetente: professorLogado.getEmail(),
      destinatario: aluno.email,
    };

      if(tipo === 'Professor'){
        const novaMensagem2 = {
          texto: mensagem,
          data: serverTimestamp(),
          remetente: professorLogado.getEmail(),
          destinatario: aluno.email,
        };
    
        addDoc(mensagemRefDestinatario, novaMensagem2)
        .then((docRef) => {
          console.log('Nova mensagem inserida com o ID para o destinatário: ', docRef.id);
          setMensagem('');
        })
        .catch((error) => {
          console.log('Erro ao inserir a nova mensagem para o destinatário', error);
        });
      }
    // Adicionar mensagem ao remetente
    addDoc(mensagemRefRemetente, novaMensagem)
      .then((docRef) => {
        console.log('Nova mensagem inserida com o ID para o remetente: ', docRef.id);
        setMensagem('');
      })
      .catch((error) => {
        console.log('Erro ao inserir a nova mensagem para o remetente', error);
      });

    // Adicionar mensagem ao destinatário

  };

  const recuperarMensagens = useCallback(async () => {
    try {
      const mensagemRef = collection(
        firebaseBD,
        'Academias',
        professorLogado.getAcademia(),
        'Professores',
        professorLogado.getEmail(),
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
    <KeyboardAvoidingView>
      <View style={[estilo.corLightMenos1, { minHeight: altura }]}>
        <Header aluno={aluno} />
        <ScrollView style={{height: '50%', marginBottom: 50}}>
          <View style={[estilo.centralizado, estilo.corLightMenos1, {marginBottom: 100}]}>
            {mensagens.map((mensagem) => (
              mensagem.remetente === professorLogado.getEmail() ?
                <MensagemEnviada texto={mensagem.texto} key={mensagem.id} /> :
                <MensagemRecebida texto={mensagem.texto} key={mensagem.id} />
            ))}
          </View>

        </ScrollView>
        <View style={[style.blocoDeTexto, estilo.corLight, { bottom: keyboardHeight + 70 }]}>
          <TextInput placeholder='Digite sua mensagem' style={[style.digitarMensagem, estilo.corLightMenos1, estilo.centralizado, { padding: 5 }]} value={mensagem} onChangeText={(text) => setMensagem(text)} />
          <TouchableOpacity style={[estilo.centralizado, estilo.corPrimaria, style.botaoEnviarMensagem]} onPress={() => enviarMensagem(mensagem)}>
            <View style={[estilo.centralizado, { marginTop: 10 }]}>
              <FontAwesome name="send" size={30} color="white" />

            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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