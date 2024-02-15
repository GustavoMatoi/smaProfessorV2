import React, { useState, useEffect } from "react"
import { Text, View, SafeAreaView, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import estilo from "../estilo"
import ExerciciosAlongamento from "./ExerciciosAlongamento"
import ExerciciosCardio from "./ExerciciosCardio"
import ExerciciosForça from "./ExerciciosForça"
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { FichaDeExercicios } from "../../classes/FichaDeExercicios"
import { ExercicioNaFicha } from "../../classes/ExercicioNaFicha"
import { Exercicio } from "../../classes/Exercicio"
import { professorLogado } from "../LoginScreen"
export default ({ posicaoDoArray = 0, aluno }) => {
  let posicao = posicaoDoArray
  const [fichaValida, setFichaValida] = useState(false)
  const [verificando, setVerificando] = useState(true)
  const [exercicios, setExercicios] = useState([])
  console.log('posicaoDoArray na ficha ', posicaoDoArray)

  useEffect(() => {
    if (typeof posicaoDoArray === undefined) {
      posicao = 0
    }
    if('fichas' in aluno){
      console.log(posicao)
      setExercicios(aluno.fichas[posicao].exercicios)
      setFichaValida(true)
      setVerificando(false)
      exercicios.map((item) => console.log(item.Nome))      
      }
  }, [])

//  exercicios.map((item) => console.log(item))


  //console.log('exercicios ', exercicios)

  //exercicios.map((item) => console.log(item.tipo))
  //console.log('posicaoArrayFichas ' , posicaoArrayFichas)
  //console.log('aluno.nome ', aluno.nome)
  //console.log('aluno.fichas[posicaoArrayFichas].exercicios ', aluno.fichas[posicaoArrayFichas].exercicios)
  exercicios.map((item) => console.log(item.Nome))      

  return (
    <ScrollView style={style.container}>
      {
      
      fichaValida && !verificando ?  (
          exercicios.map((item, index) => (
            <View key={index} style={{ width: '100%' }}>
              {item.tipo === 'força' ? (
                <ExerciciosForça
                  nomeDoExercicio={item.Nome.exercicio}
                  series={item.series}
                  repeticoes={item.repeticoes}
                  descanso={item.descanso}
                  cadencia={item.cadencia}
                  imagem={item.Nome.imagem}

                />
              ) : item.tipo === 'aerobico' ? (
                <ExerciciosCardio
                  nomeDoExercicio={item.Nome.exercicio}
                  velocidadeDoExercicio={item.velocidade}
                  duracaoDoExercicio={item.duracao}
                  seriesDoExercicio={item.series}
                  descansoDoExercicio={item.descanso}
                />
              ) : item.tipo === 'alongamento' ? (
                <ExerciciosAlongamento
                  nomeDoExercicio={item.Nome}
                  series={item.series}
                  descanso={item.descanso}
                  repeticoes={item.repeticoes}
                  imagem={item.imagem}
                />
              ) : null}
            </View>
          ))
        ) : (
          <Text style={[{ marginHorizontal: 15, textAlign: 'justify' }, estilo.textoP16px, estilo.textoCorSecundaria]}>
            A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
          </Text>
        )  }
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',

  }
})