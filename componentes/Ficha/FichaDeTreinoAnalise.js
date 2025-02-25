import React, { useState, useEffect } from "react"
import { Text, View, SafeAreaView, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import estilo from "../estilo"
import ExerciciosAlongamento from "./ExerciciosAlongamento"
import ExerciciosCardio from "./ExerciciosCardio"
import ExerciciosForça from "./ExerciciosForça"
import { professorLogado } from "../LoginScreen";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";
import AntDesign from '@expo/vector-icons/AntDesign';

export default ({ aluno, ficha }) => {
  const [exercicios, setExercicios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [fichaValida, setFichaValida] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const carregarExercicios = async () => {
      try {
        if (!ficha?.id) {
          setCarregando(false);
          return;
        }

        const db = getFirestore();
        const exerciciosRef = collection(
          db,
          'Academias',
          professorLogado.getAcademia(), 
          'Alunos',
          aluno.email,
          'FichaDeExercicios',
          ficha.id,
          'Exercicios'
        );

        const snapshot = await getDocs(exerciciosRef);
        console.log("snapshot",snapshot);
        const dadosExercicios = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("dadosExercicios",dadosExercicios);
        
        setFichaValida(dadosExercicios.length > 0);
        setVerificando(false);
        setExercicios(dadosExercicios);
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarExercicios();
  }, [ficha]);

  if (carregando) {
    return <ActivityIndicator size="large" color={estilo.corPrimaria} />;
  }

  return (
    <ScrollView 
      style={style.container}
      contentContainerStyle={style.contentContainer}
    >
      {fichaValida && !verificando ? (
        <View style={style.fichaContainer}>
        <View style={style.header}>
          <AntDesign name="filetext1" size={24} color={estilo.corPrimaria} />
          <Text style={style.tituloFicha}>
            Ficha de Treino - {ficha.objetivoDoTreino || 'Sem objetivo definido'}
          </Text>
        </View>

        <Text style={style.detalhesFicha}>
          {`Data de início: ${ficha.dataInicio}\nData de término: ${ficha.dataFim}`}
        </Text>
          {exercicios.map((item, index) => (
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
                  nomeDoExercicio={item.Nome.exercicio}
                  series={item.series}
                  descanso={item.descanso}
                  repeticoes={item.repeticoes}
                  imagem={item.Nome.imagem}
                />
              ) : null}
            </View>
          ))}
        </View>
      ) : (
        <Text style={[{ marginHorizontal: 15, textAlign: 'justify' }, estilo.textoP16px, estilo.textoCorSecundaria]}>
          A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
        </Text>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: estilo.corLight
  }, fichaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: estilo.corLightMais1,
    paddingBottom: 10
  },
});
