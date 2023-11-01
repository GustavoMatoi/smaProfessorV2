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
import { professorLogado } from "../Home"
import TabelaResultados from '../AnaliseDoProgramaDeTreino/SelecaoAlunoAnaliseProgramaDeTreino/TabelaResultados'
import {Aluno} from '../../classes/Aluno'
export default ({aluno, posicaoDoArray}) =>{
  const alunoLogado = new Aluno()
  const [exercicio, setExercicio] = useState(new Exercicio())
  const [exercicioNaFicha, setExercicioNaFicha] = useState(new ExercicioNaFicha())
  const [fichaDeExercicios, setFichaDeExercicios] = useState(new FichaDeExercicios())
  const [isLoading, setIsLoading] = useState(true)
  const [ultimaFicha, setUltimaFicha] = useState([]);


  useEffect(() => {
    async function getExercicios() {
        const db = getFirestore();
        const diarioRef = collection(db, "Academias", `${professorLogado.getAcademia()}`, "Professores",  `${aluno.professorResponsavel}`,  "alunos", `Aluno ${aluno.email}`, "FichaDeExercicios");
        const exerciciosSnapshot = await getDocs(diarioRef);
        console.log("LENGTH " + exerciciosSnapshot.docs.length)
        const exerciciosPromises = exerciciosSnapshot.docs.map(async (exercicioDoc) => {
            console.log("Chegou aqui")
            const exerciciosRef = collection(exercicioDoc.ref, "Exercicios");
          const exerciciosSnapshot = await getDocs(exerciciosRef);
          return exerciciosSnapshot.docs.map((exercicio) => {
            const exercicioData = exercicio.data();
            console.log(exercicio.data())
            const novoExercicio = new Exercicio();
            novoExercicio.setNome(exercicioData.Nome);
            novoExercicio.setTipo(exercicioData.tipo);
            const novoExercicioNaFicha = new ExercicioNaFicha();
            novoExercicioNaFicha.setExercicio(novoExercicio);
            novoExercicioNaFicha.setConjugado(false);
            novoExercicioNaFicha.setDescanso(exercicioData.descanso);
            novoExercicioNaFicha.setDuracao(exercicioData.duracao);
            novoExercicioNaFicha.setRepeticoes(exercicioData.repeticoes);
            novoExercicioNaFicha.setSeries(exercicioData.series);
            novoExercicioNaFicha.setVelocidade(exercicioData.velocidade);
            novoExercicioNaFicha.setImagem(exercicioData.imagem)  
            return novoExercicioNaFicha;
          });
        });

      const exercicios = await Promise.all(exerciciosPromises);

      const arrayFicha = Object.values(exercicios);
      const exerciciosFlat = exercicios.flat();

      for (let i = 0; i < arrayFicha.length; i++) {
        for (const key in arrayFicha[i]) {
          if (arrayFicha[i].hasOwnProperty(key)) {
            const value = arrayFicha[i][key];
          }
        }

      }

      for(let i = 0; i < arrayFicha.length; i++){
        alunoLogado.addFichaDeExercicios(arrayFicha)
      }

      
      const ultimaFicha = arrayFicha[posicaoDoArray]
      setUltimaFicha(ultimaFicha);
      setIsLoading(false);
    }

    getExercicios();
  }, []);

  const largura = Dimensions.get('screen').width
  console.log('ultimaFicha', ultimaFicha)
  const ultimaFichaExercicios = ultimaFicha.map((item) => item.exercicio)
  const ultimaFichaExercicios3 = ultimaFicha.map((item) => item.exercicio.nome)
  const ultimaFichaExercicios2 = ultimaFicha.map((item) => item.series)
  console.log('ultimaFichaExercicios', ultimaFichaExercicios)
  console.log('ultimaFichaExercicios2', ultimaFichaExercicios2)
  console.log('ultimaFichaExercicios3', ultimaFichaExercicios3)
  return (
    <ScrollView style={style.container}>
 <ScrollView style={style.container}>
    {isLoading ? (
    <Text>Carregando...</Text>
    ) : ultimaFicha ? (
      ultimaFicha.map((exercicioNaFicha, index) => (
      <View key={index} style={[{ width: largura }]}>
      {exercicioNaFicha.exercicio.tipo == 'força' ? (
      <ExerciciosForça
      nomeDoExercicio={exercicioNaFicha.exercicio.nome.exercicio}
      series={exercicioNaFicha.series}
      repeticoes={exercicioNaFicha.repeticoes}
      descanso={exercicioNaFicha.descanso}
      />
      ) : exercicioNaFicha.exercicio.tipo == 'aerobico' ? (
      <ExerciciosCardio
                   nomeDoExercicio={exercicioNaFicha.exercicio.nome.exercicio}
                   velocidadeDoExercicio={exercicioNaFicha.velocidade}
                   duracaoDoExercicio={exercicioNaFicha.duracao}
                   seriesDoExercicio={exercicioNaFicha.series}
                   descansoDoExercicio={exercicioNaFicha.descanso}
                 />
      ) : exercicioNaFicha.exercicio.tipo == 'alongamento' ? (
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
      ): <Text style={[{marginHorizontal: 15, textAlign: 'justify'},estilo.textoP16px, estilo.textoCorSecundaria]}>A última ficha ainda não foi lançada. Solicite ao professor responsável para lança-la e tente novamente mais tarde.</Text>}
    </ScrollView>

                    
    </ScrollView>
  );
      }

const style = StyleSheet.create({
    container: {
        width: '100%',

    }
})