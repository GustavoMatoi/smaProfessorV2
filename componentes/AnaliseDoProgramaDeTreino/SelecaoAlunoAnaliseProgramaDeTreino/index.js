import React, { useState, useEffect } from "react"
import { Text, Alert, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import estilo from "../../estilo"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../../LoginScreen/index";
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo"
export default ({ navigation, route }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true)
  const { alunos } = route.params
  const [carregandoAlunos, setCarregandoAlunos] = useState(true)
  const [turmasVisiveis, setTurmasVisiveis] = useState({});
  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const alunosAtivos = alunos.filter((aluno) => !aluno.inativo);
  const alunosInativos = alunos.filter((aluno) => aluno.inativo);

  const alunosSemTurma = alunosAtivos.filter(
    (aluno) => aluno.turma === ""
  );  

  const alunosAtivosPorTurma = alunosAtivos.reduce((acc, aluno) => {
    acc[aluno.turma] = acc[aluno.turma] || [];
    acc[aluno.turma].push(aluno);
    return acc;
  }, {});

  const toggleVisibilidadeTurma = (turma) => {
    setTurmasVisiveis((prev) => ({
      ...prev,
      [turma]: !prev[turma],
    }));
  };

  const turmas = alunos.map((aluno) => aluno.turma)

  console.log(turmas)
  const turmasFiltradas = new Set(turmas)
  let turmasSemRepeticoes = Array.from(turmasFiltradas);
  return (
    <ScrollView
      style={style.container}>
      {!conexao ?
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Modo Offline",
            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
          );
        }} style={[estilo.centralizado, { marginVertical: '3%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
          <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
        </TouchableOpacity>
        : null}
      <Text
        style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado, style.container]}
        numberOfLines={2}
      >Selecione a turma e com base nela selecione o aluno.</Text>

      <Text style={[estilo.textoP16px, { margin: 20 }]}>Alunos cujo botão esteja com a cor <Text style={[{ color: '#F2D64E' }]}>Amarela</Text> são alunos que a ficha de treino está prestes a vencer.</Text>
      {alunosSemTurma.length > 0 && (
        <View>
          <TouchableOpacity
            style={[estilo.botao, estilo.corLightMenos1, { marginVertical: 5 }]}
            onPress={() => toggleVisibilidadeTurma("Sem Turma")}
          >
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>
              Alunos sem turma
            </Text>
            <AntDesign
              name={turmasVisiveis["Sem Turma"] ? "up" : "down"}
              size={16}
              color="#000"
            />
          </TouchableOpacity>

          {turmasVisiveis["Sem Turma"] &&
            alunosSemTurma.map((aluno) => (
              <TouchableOpacity
                key={aluno.cpf}
                style={[estilo.botao, estilo.corPrimaria, style.botao]}
                onPress={() =>
                  navigation.navigate("Avaliações Análise do Programa de Treino", { aluno: aluno })
                }
              >
                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                  {aluno.nome}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}{Object.entries(alunosAtivosPorTurma)
        .filter(([turma]) => turma)
        .map(([turma, alunosDaTurma]) => (
          <View key={turma}>
            <TouchableOpacity
              style={[
                estilo.botao,
                estilo.corLightMenos1,
                { marginVertical: 5 },
              ]}
              onPress={() => toggleVisibilidadeTurma(turma)}
            >
              <Text
                style={[estilo.textoP16px, estilo.textoCorSecundaria]}
              >
                {turma}
              </Text>
              <AntDesign
                name={turmasVisiveis[turma] ? "up" : "down"}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
      {turmasVisiveis[turma] &&
              alunosDaTurma.map((aluno) => (
                <TouchableOpacity
                  key={aluno.cpf}
                  style={[
                    estilo.botao,
                    aluno.fichaVencendo
                      ? estilo.corWarning
                      : estilo.corPrimaria,
                    style.botao,
                  ]}
                  onPress={() =>
                    navigation.navigate("Avaliações Análise do Programa de Treino", { aluno: aluno })
                  }
                >
                  <Text
                    style={[estilo.textoCorLightMais1, estilo.tituloH619px]}
                  >
                    {aluno.nome}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}

    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3%'
  },
  textoAlinhado: {
    marginLeft: '5%',
    marginTop: '10%',
    textDecorationLine: 'underline',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around', 

  }

})