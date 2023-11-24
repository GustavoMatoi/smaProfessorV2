import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, Dimensions, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import estilo from "../estilo"
import ExerciciosAlongamento from "./ExerciciosAlongamento"
import ExerciciosCardio from "./ExerciciosCardio"
import ExerciciosForça from "./ExerciciosForça"
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { FichaDeExercicios } from "../../classes/FichaDeExercicios"
import { ExercicioNaFicha } from "../../classes/ExercicioNaFicha"
import { Exercicio } from "../../classes/Exercicio"
import { professorLogado } from "../LoginScreen"
import {Aluno} from '../../classes/Aluno'
export default ({exercicios}) =>{
  const alunoLogado = new Aluno()

  const [ultimaFicha, setUltimaFicha] = useState([]);
  exercicios.length > 0 ? console.log("Maior que 0") : console.log("Menor que 0")

  exercicios.map((exercicio) => console.log(exercicio.Nome))
  return (
    <ScrollView style={style.container}>
    {
      console.log(exercicios)
    /*exercicios.length > 0 ? (
      exercicios.map((exercicioNaFicha, index) => (
        <View key={index} style={{ width: largura }}>
          {exercicioNaFicha.exercicio.tipo === 'força' ? (
            <ExerciciosForça
              nomeDoExercicio={exercicioNaFicha.exercicio.nome.exercicio}
              series={exercicioNaFicha.series}
              repeticoes={exercicioNaFicha.repeticoes}
              descanso={exercicioNaFicha.descanso}
              cadencia={exercicioNaFicha.cadencia}
            />
          ) : exercicioNaFicha.exercicio.tipo === 'aerobico' ? (
            <ExerciciosCardio
              nomeDoExercicio={exercicioNaFicha.exercicio.nome.exercicio}
              velocidadeDoExercicio={exercicioNaFicha.velocidade}
              duracaoDoExercicio={exercicioNaFicha.duracao}
              seriesDoExercicio={exercicioNaFicha.series}
              descansoDoExercicio={exercicioNaFicha.descanso}
            />
          ) : exercicioNaFicha.exercicio.tipo === 'alongamento' ? (
            <ExerciciosAlongamento
              nomeDoExercicio={exercicioNaFicha.exercicio.nome}
              duracaoDoExercicio={exercicioNaFicha.duracao}
              repeticoesDoExercicio={exercicioNaFicha.repeticoes}
              duracao={exercicioNaFicha.duracao}
              descansoDoExercicio={exercicioNaFicha.descanso}
              imagem={exercicioNaFicha.imagem}
            />
          ) : null}
        </View>
      ))
    ) : (
      <Text style={[{ marginHorizontal: 15, textAlign: 'justify' }, estilo.textoP16px, estilo.textoCorSecundaria]}>
        A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
      </Text>
    )*/}
  </ScrollView>
  );
      }

const style = StyleSheet.create({
    container: {
        width: '100%',

    }
})