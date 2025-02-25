import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { professorLogado } from "../LoginScreen/index";
import BotaoSelect from "../BotaoSelect"; 
export default ({ navigation, route }) => {
  const { aluno } = route.params;
  const [fichas, setFichas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [fichaSelecionada, setFichaSelecionada] = useState(null);

  const buscarFichas = async () => {
    try {
      const db = getFirestore();
      const caminhoFichas = collection(
        db, 
        'Academias', 
        professorLogado.getAcademia(), 
        'Alunos', 
        aluno.id, 
        'FichaDeExercicios'
      );
      
      const snapshot = await getDocs(caminhoFichas);
      const dadosFichas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFichas(dadosFichas);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar fichas:", error);
      setErro("Erro ao carregar fichas");
    } finally {
      setCarregando(false);
    }
  };

  const excluirFicha = async () => {
    if (!fichaSelecionada) {
      Alert.alert("Erro", "Selecione uma ficha para excluir.");
      return;
    }
    try {
      const db = getFirestore();
      await deleteDoc(doc(
        db,
        'Academias', 
        professorLogado.getAcademia(), 
        'Alunos', 
        aluno.id, 
        'FichaDeExercicios',
        fichaSelecionada
      ));
      Alert.alert("Sucesso", "Ficha excluída com sucesso!");
      buscarFichas();
    } catch (error) {
      console.error("Erro ao excluir ficha:", error);
      Alert.alert("Erro", "Não foi possível excluir a ficha.");
    }
  };

  useEffect(() => {
    if (aluno?.id) {
      buscarFichas();
    }
  }, [aluno]);

  if (carregando) {
    return (
      <View style={style.centralizado}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={style.centralizado}>
        <Text style={style.textoErro}>{erro}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={style.container}>
      <Text style={style.titulo}>Selecione a ficha para excluir:</Text>
      <BotaoSelect
        options={fichas.map(f => f.id)}
        onChange={setFichaSelecionada}
        titulo="Selecione a ficha"
        max={1}
        selecionado={fichaSelecionada}
        select={fichaSelecionada}
      />
      <TouchableOpacity style={style.botaoExcluir} onPress={excluirFicha}>
        <Text style={style.textoBotao}>Excluir Ficha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botaoExcluir: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centralizado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoErro: {
    color: "red",
    fontSize: 16,
  },
});
