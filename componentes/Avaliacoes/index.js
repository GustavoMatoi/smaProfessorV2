import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView,ActivityIndicator, TouchableOpacity } from 'react-native';
import estilo from "../estilo";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config';
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc } from "firebase/firestore";
import { professorLogado } from "../LoginScreen/index";
import { Avaliacao } from "../../classes/Avaliacao";
import { Entypo } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import Spinner from "react-native-loading-spinner-overlay";

export default ({ navigation, route }) => {
  const { aluno } = route.params;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarAvaliacoes = async () => {
    try {
      const db = getFirestore();
      const caminhoAvaliacoes = collection(
        db, 
        'Academias', 
        professorLogado.getAcademia(), 
        'Alunos', 
        aluno.id, 
        'Avaliações'
      );

      const snapshot = await getDocs(caminhoAvaliacoes);
      const dadosAvaliacoes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAvaliacoes(dadosAvaliacoes);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      setErro("Erro ao carregar avaliações");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (aluno?.id) {
      buscarAvaliacoes();
    }
  }, [aluno]);

  if (carregando) {
    return (
      <View style={estilo.centralizado}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={estilo.centralizado}>
        <Text style={estilo.textoCorDanger}>{erro}</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={[style.container, estilo.corLightMenos1]}>
      {avaliacoes.length === 0 ? (
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


        <ScrollView>
<View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity
            style={[estilo.botao, estilo.corDanger]}
            onPress={() => navigation.navigate('Excluir Ficha', { aluno })}
          >
            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>
              Excluir Ficha
            </Text>
          </TouchableOpacity>
        </View>
          {avaliacoes.map((avaliacao, index) => (
            <View style={style.conteudos} key={`keyBotaoAvaliacoes${index}`}>
              {console.log('avaliacao ', avaliacao)}
              {console.log('index ', index)}
              {console.log('aluno ', aluno)}
              {console.log('avaliacoes[index-1] ', avaliacoes[index-1])}
              <TouchableOpacity
                style={[estilo.botao, estilo.corPrimaria]}
                onPress={() => navigation.navigate('Analise do Programa de Treino', { avaliacao, posicaoDoArray: index, aluno: aluno, avaliacaoAnterior: avaliacoes[index-1] })}
              >
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>
                  Avaliação {index + 1}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
