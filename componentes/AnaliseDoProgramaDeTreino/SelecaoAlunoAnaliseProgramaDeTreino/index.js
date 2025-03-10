import React, { useState, useEffect } from "react"
import { Text, Alert, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import estilo from "../../estilo"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc,onSnapshot, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../../LoginScreen/index";
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo"
export default ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)
  const { alunos } = route.params
  const [alunosAtualizados, setAlunosAtualizados] = useState([]);
  const [conexao, setConexao] = useState(true);
  const [turmasVisiveis, setTurmasVisiveis] = useState({});
  const [turmasCadastradas, setTurmasCadastradas] = useState([]);
  const [alunosSemTurmaValida, setAlunosSemTurmaValida] = useState([]);
  const alunosAtivos = alunosAtualizados.filter((aluno) => !aluno.inativo);
  const alunosAtivosPorTurma = alunosAtivos.reduce((acc, aluno) => {
    acc[aluno.turma] = acc[aluno.turma] || [];
    acc[aluno.turma].push(aluno);
    return acc;
  }, {});
  const alunosInativos = alunosAtualizados.filter((aluno) => aluno.inativo);
  const alunosSemTurma = alunosAtivos.filter((aluno) => aluno.turma === "");
  useEffect(() => {
    const invalidStudents = alunosAtualizados.filter(
      (aluno) => aluno.turma && !turmasCadastradas.includes(aluno.turma)
    );
    setAlunosSemTurmaValida(invalidStudents);
  }, [alunosAtualizados, turmasCadastradas]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const db = getFirestore();

    const turmasRef = collection(db, 'Academias', professorLogado.getAcademia(), 'Turmas');
    const unsubscribeTurmas = onSnapshot(turmasRef, (snapshot) => {
      const newArrayTurmas = [];
      snapshot.forEach(doc => {
        const turmaData = doc.data();
        if (turmaData.nome) newArrayTurmas.push(turmaData.nome);
      });
      setTurmasCadastradas(newArrayTurmas);
    });

    const alunosRef = collection(db, 'Academias', professorLogado.getAcademia(), 'Alunos');
    const unsubscribeAlunos = onSnapshot(alunosRef, async (snapshot) => {
      const alunosPromises = snapshot.docs.map(async (docAluno) => {
        const alunoData = { id: docAluno.id, ...docAluno.data() };

        const avaliacoesRef = collection(db, 'Academias', professorLogado.getAcademia(), 'Alunos', docAluno.id, 'Avaliacoes');
        const snapshotAvaliacoes = await getDocs(avaliacoesRef);
        const avaliacoes = snapshotAvaliacoes.docs.map(docAvaliacao => ({
          id: docAvaliacao.id,
          ...docAvaliacao.data()
        }));
  
        return { ...alunoData, avaliacoes };
      });
  
      const alunosData = await Promise.all(alunosPromises);
      setAlunosAtualizados(alunosData);
    });
  
    return () => {
      unsubscribeTurmas();
      unsubscribeAlunos();
    };
  }, []);

  useEffect(() => {
    const db = getFirestore();
    
    alunosAtualizados.forEach(aluno => {
      if (aluno.turma && !turmasCadastradas.includes(aluno.turma)) {
        const alunoRef = doc(db, 'Academias', professorLogado.getAcademia(), 'Alunos', aluno.id);
        setDoc(alunoRef, { turma: "" }, { merge: true });
      }
    });
  }, [turmasCadastradas, alunosAtualizados]);

  const toggleVisibilidadeTurma = (turma) => {
    setTurmasVisiveis((prev) => ({
      ...prev,
      [turma]: !prev[turma],
    }));
  };
  
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
            style={[
              estilo.botao,
              estilo.corLightMenos1,
              { marginVertical: 5 },
            ]}
            onPress={() => toggleVisibilidadeTurma("Sem Turma")}
          >
            <Text
              style={[estilo.textoP16px, estilo.textoCorSecundaria]}
            >
              Alunos sem turma
            </Text>
            <AntDesign
              name={turmasVisiveis["Sem Turma"] ? "up" : "down"}
              size={16}
              color="#000"
            />
          </TouchableOpacity>
          {alunosSemTurmaValida.length > 0 && (
          <View>
            <Text style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]}>
              Alunos em turmas inexistentes:
            </Text>
            {alunosSemTurmaValida.map((aluno) => (
              <TouchableOpacity
                key={aluno.cpf}
                style={[estilo.botao, aluno.fichaVencendo
                  ? estilo.corWarning
                  : estilo.corPrimaria, style.botao]}
                onPress={() => {
                  if (!aluno) {
                    console.error("Aluno undefined:", aluno);
                    return;
                  }
                  console.log("Aluno antes da navegação:", aluno); 
                  console.log("aluno.avaliacoes:", aluno?.avaliacoes);
                  navigation.navigate("Avaliações Análise do Programa de Treino", { aluno: aluno });
                }}
              >
                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                  {aluno.nome} - Turma: {aluno.turma}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
            {turmasVisiveis["Sem Turma"] &&
          alunosSemTurma.length > 0 && 
          alunosSemTurma.map((aluno) => (
            <TouchableOpacity
              key={aluno.cpf}
              style={[estilo.botao, aluno.fichaVencendo
                ? estilo.corWarning
                : estilo.corPrimaria, style.botao]}
              onPress={() => {
                if (!aluno) {
                  console.error("Aluno undefined:", aluno);
                  return;
                }
                console.log("Aluno antes da navegação:", aluno); 
                navigation.navigate("Avaliações Análise do Programa de Treino", { aluno: aluno });
              }}
            >
              <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                {aluno.nome}
              </Text>
            </TouchableOpacity>
          ))}

            </View>
            
          )}
          {Object.entries(alunosAtivosPorTurma)
          .filter(([turma]) => turma)
          .map(([turma, alunosDaTurma]) => (
            <View key={turma}>
              <TouchableOpacity
                style={[estilo.botao, estilo.corLightMenos1]}
                onPress={() => toggleVisibilidadeTurma(turma)}
              >
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{turma}</Text>
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
                    style={[estilo.botao, aluno.fichaVencendo
                      ? estilo.corWarning
                      : estilo.corPrimaria, style.botao]}
                    onPress={() => {
                      if (!aluno) {
                        console.error("Aluno undefined:", aluno);
                        return;
                      }
                      console.log("Aluno antes da navegação:", aluno); 
                      navigation.navigate("Avaliações Análise do Programa de Treino", { aluno: aluno });
                    }}
                  >
                    <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
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