import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import estilo from "../estilo";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config';
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc } from "firebase/firestore";
import { professorLogado } from "../Home";
import { Avaliacao } from "../../classes/Avaliacao";
import { Entypo } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import Spinner from "react-native-loading-spinner-overlay";

export default ({ navigation, route }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregandoAlunos, setCarregandoAlunos] = useState(true);
  const [avaliacaoArray, setAvaliacaoArray] = useState([]);
  const [numAvaliacoes, setNumAvaliacoes] = useState(0);
  const aluno = route.params.aluno
  console.log(aluno.email)
  useEffect(() => {
    const fetchAvaliacoes = async () => {
      setCarregandoAlunos(true);
      const db = getFirestore();

      try {
        const diariosRef = collection(
          db,
          'Academias',
          professorLogado.getAcademia(),
          'Professores',
          aluno.professorResponsavel,
          'alunos',
          `Aluno ${aluno.email}`,
          'Avaliações'
        );
  
        const querySnapshot = await getDocs(diariosRef);
  
        const newArrayAvaliacoes = [];
  
        querySnapshot.forEach((avaliacaoDoc) => {
          const avaliacaoData = avaliacaoDoc.data();
          console.log(avaliacaoDoc.data)
          newArrayAvaliacoes.push(avaliacaoData);
        });
  
        setAvaliacaoArray(newArrayAvaliacoes);
        setNumAvaliacoes(newArrayAvaliacoes.length);
        setCarregandoAlunos(false);
      } catch (error) {
        console.log(error);
        setCarregandoAlunos(false);
      }
    };
  
    fetchAvaliacoes();
  }, []);

  console.log(numAvaliacoes)
  return (
    <ScrollView style={[style.container, estilo.corLightMenos1]} >
      {carregandoAlunos? 
      <Spinner
      visible={carregandoAlunos}
      textContent={'Carregando avaliações...'}
      textStyle={[estilo.textoCorLight, estilo.textoP16px]}
    />
      : 
      
      numAvaliacoes === 0 ? (
        <View>
          <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
          <View style={[estilo.centralizado, { marginTop: '5%' }]}>
            <Entypo name="emoji-sad" size={100} color="#182128" />
          </View>
          <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, { marginTop: '10%', textAlign: 'center', marginHorizontal: '5%' }]}>
            Este aluno ainda não possui nenhuma avaliação cadastrada. Realize uma avaliação física e tente novamente mais tarde.
          </Text>
        </View>
      ) : (
        <View>
          {avaliacaoArray.map((avaliacao, index) => (
            <View style={style.conteudos} key={`keyBotaoAvaliacoes${index}`}>
              <TouchableOpacity
                style={[estilo.botao, estilo.corPrimaria]}
                onPress={() => navigation.navigate('Analise do Programa de Treino', { avaliacao, posicaoDoArray: index, aluno: aluno, avaliacaoAnterior: avaliacaoArray[index-1] })}
              >
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>
                  Avaliação {index + 1}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
  conteudos: {
    marginTop: 10,
    marginBottom: 20
  }
});
