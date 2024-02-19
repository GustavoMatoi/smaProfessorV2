import React, { useState, useEffect } from "react"
import { Text,View, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import estilo from "../estilo";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, getDocs } from "firebase/firestore";
import { professorLogado } from "../LoginScreen";
import Spinner from 'react-native-loading-spinner-overlay';


export default ({ navigation, route }) => {
  const { alunos } = route.params
  const turmas = alunos.map((aluno) => aluno.turma)

  console.log(turmas)
  const turmasFiltradas = new Set(turmas)
  let turmasSemRepeticoes = Array.from(turmasFiltradas);

  return (
    <ScrollView
      style={style.container}>

      <Text
        style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]}
        numberOfLines={2}
      >Selecione o aluno para continuar.</Text>
      {
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
                      onPress={() => navigation.navigate('Exportar CSV', { aluno: aluno, navigation: navigation })}
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
      }
    </ScrollView>
  )
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