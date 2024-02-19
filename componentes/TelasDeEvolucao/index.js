import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../LoginScreen";
import Spinner from "react-native-loading-spinner-overlay";
import { Entypo } from '@expo/vector-icons';
import ModalSemConexao from "../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo"


export default ({ navigation, route }) => {
  const { alunos } = route.params
  const [conexao, setConexao] = useState(true)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const turmas = alunos.map((aluno) => aluno.turma)

  console.log(turmas)
  const turmasFiltradas = new Set(turmas)
  let turmasSemRepeticoes = Array.from(turmasFiltradas);
  return (
    <ScrollView>
      {conexao ? (
        <>
          <Text
            style={[
              estilo.textoCorDanger,
              estilo.textoP16px,
              style.textoAlinhado,
              style.container,
            ]}
            numberOfLines={2}
          >
            Selecione o aluno para continuar.
          </Text>
          {alunos.length === 0 ? (
            <View style={[estilo.centralizado]}>
              <Text
                style={[
                  estilo.centralizado,
                  estilo.tituloH333px,
                  estilo.textoCorSecundaria,
                ]}
              >
                Ops...
              </Text>
              <View style={[estilo.centralizado, { marginVertical: 10 }]}>
                <Entypo name="emoji-sad" size={100} color="black" />
              </View>
              <Text
                style={[
                  estilo.centralizado,
                  estilo.textoCorSecundaria,
                  estilo.textoP16px,
                  { textAlign: 'center' },
                ]}
              >
                Não há alunos cadastrados nessa academia. Tente novamente mais tarde.
              </Text>
            </View>
          ) : (

            turmasSemRepeticoes.map((turma) => {
              return (
                <View>
                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { margin: 10 }]}>{turma}</Text>
                  {alunos.map((aluno) => (
                    turma === aluno.turma && !aluno.inativo ?
                      <>
                        <TouchableOpacity
                          key={aluno.cpf}
                          style={[estilo.botao, estilo.corPrimaria, style.botao]}
                          onPress={() => navigation.navigate('Seleção da evolução', { aluno: aluno })}
                        >
                          <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                            {aluno.nome}
                          </Text>
                        </TouchableOpacity>
                      </>
                      : null
                  ))}
                </View>
              )

            })

          )}
        </>
      ) : (
        <ModalSemConexao ondeNavegar={'Home'} navigation={navigation} />
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: '5%'
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