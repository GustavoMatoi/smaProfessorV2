import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, Dimensions, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import estilo from "../estilo"
import ExerciciosAlongamento from "./ExerciciosAlongamento"
import ExerciciosCardio from "./ExerciciosCardio"
import ExerciciosForça from "./ExerciciosForça"
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { alunoLogado, professorLogado } from "../LoginScreen"
import { FichaDeExercicios } from "../../classes/FichaDeExercicios"
import { ExercicioNaFicha } from "../../classes/ExercicioNaFicha"
import { Exercicio } from "../../classes/Exercicio"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../LoginScreen"
export default props => {

  const [isLoading, setIsLoading] = useState(true);
  const [ultimaFicha, setUltimaFicha] = useState([]);
  const [fichasDeExercicios, setFichasDeExercicios] = useState([]);
    const alunoEmail = props.route.params.emailAluno
  function stringToDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }

  useEffect(() => {
    async function getExercicios() {
        const db = getFirestore();
        const diarioRef = collection(db, "Academias", `${alunoLogado.getAcademia()}`, "Professores",  `${professorLogado.getNome()}`,  "alunos", `Aluno ${alunoEmail}`, "FichaDeExercicios");
        const exerciciosSnapshot = await getDocs(diarioRef);
        const exerciciosPromises = exerciciosSnapshot.docs.map(async (exercicioDoc) => {
          const exerciciosRef = collection(exercicioDoc.ref, "Exercicios");
          const exerciciosSnapshot = await getDocs(exerciciosRef);
          return exerciciosSnapshot.docs.map((exercicio) => {
            const exercicioData = exercicio.data();
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
              if (typeof value === 'object') {
                console.log('Atributo: ' + key + ', Valor: ' + JSON.stringify(value, null, 2));
              } else {
                console.log('Atributo: ' + key + ', Valor: ' + value);
              }
            }
          }
        }
        for(let i = 0; i < arrayFicha.length; i++){
          alunoLogado.addFichaDeExercicios(arrayFicha)
        }
        const ultimaFicha = arrayFicha[arrayFicha.length - 1]
        setUltimaFicha(ultimaFicha);
        setIsLoading(false);
      }
      getExercicios();
    }, []);

  console.log(ultimaFicha)
  const largura = Dimensions.get('screen').width;

  return (
    <ScrollView>
      <SafeAreaView style={style.container}>
      {ultimaFicha ? (
      isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        ultimaFicha.map((exercicioNaFicha, index) => (
          <View key={index} style={[{width: largura}]}>
            {exercicioNaFicha.exercicio.tipo === 'força' ? (
              <ExerciciosForça
                nomeDoExercicio={exercicioNaFicha.exercicio.nome}
                series={exercicioNaFicha.series}
                repeticoes={exercicioNaFicha.repeticoes}
                descanso={exercicioNaFicha.descanso}
              />
            ) : exercicioNaFicha.exercicio.tipo === 'aerobico' ? (
              <ExerciciosCardio
                nomeDoExercicio={exercicioNaFicha.exercicio.nome}
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
              />
            ) : null }
          </View>
        ))
      )

    ) :
    <View style={[estilo.centralizado, {marginTop: '5%',marginLeft: '20%', marginRight: '20%', marginBottom: '20%'}]}>
      <View style={estilo.centralizado}>
      <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, {textAlign: 'center', fontFamily: 'Montserrat'}]}>
              Ops...
      </Text>
      <Entypo name="emoji-sad" size={150} color="#182128" />
      </View>
          <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {textAlign: 'center', fontFamily: 'Montserrat'}]}>
      Parece que você ainda não possui nenhuma ficha de exercícios. Que tal solicitar uma ao seu professor responsável?
      </Text>
    </View> 

            }
      </SafeAreaView>

      
  </ScrollView>
    );
    }

const style = StyleSheet.create({
    container: {
        width: '100%',
    }
})