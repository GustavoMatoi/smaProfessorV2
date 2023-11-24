import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, Alert, StyleSheet, TouchableOpacity, Image } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../Home";
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';

export default ({ navigation, route }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true)
  const { alunos } = route.params
  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={style.container}>
      {!conexao ?
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Modo Offline",
            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
          );
        }} style={[estilo.centralizado, { marginVertical: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
          <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
        </TouchableOpacity>
        : null}

      <Text
        style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado, { marginTop: '3%' }]}
        numberOfLines={2}
      >
        Selecione o aluno para continuar.
      </Text>

      {alunos.map((aluno) => (
        <TouchableOpacity
          key={aluno.cpf}
          style={[estilo.botao, estilo.corPrimaria, style.botao]}
          onPress={() => navigation.navigate('Dados corporais', { aluno: aluno })}
        >
          <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{aluno.nome}</Text>
        </TouchableOpacity>
      ))}


    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textoAlinhado: {
    marginLeft: '5%',
    textDecorationLine: 'underline',
    marginBottom: '5%'

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