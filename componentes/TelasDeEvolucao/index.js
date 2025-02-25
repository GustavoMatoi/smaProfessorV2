import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, setDoc, doc, getDocs, getDoc,onSnapshot, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";
import { professorLogado } from "../LoginScreen/index";
import ModalSemConexao from "../ModalSemConexao";
import estilo from "../estilo";

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
  

  const turmas = alunos.map((aluno) => aluno.turma)

  console.log(turmas)
  const turmasFiltradas = new Set(turmas)
  let turmasSemRepeticoes = Array.from(turmasFiltradas);
  return (
    <ScrollView style={style.container}>
      {conexao ? (
        <>
          <Text style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]}>
            Selecione a turma ou um aluno sem turma para continuar.
          </Text>

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
                      navigation.navigate("Seleção da evolução", { aluno: aluno })
                    }
                  >
                    <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                      {aluno.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {Object.entries(alunosAtivosPorTurma).filter(([turma]) => turma !== "").map(([turma, alunosDaTurma]) => (
            <View key={turma}>
              <TouchableOpacity
                style={[estilo.botao, estilo.corLightMenos1, { marginVertical: 5 }]}
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
                    style={[
                      estilo.botao,
                      aluno.fichaVencendo ? estilo.corWarning : estilo.corPrimaria,
                      style.botao,
                    ]}
                    onPress={() =>
                      navigation.navigate("Seleção da evolução", { aluno: aluno })
                    }
                  >
                    <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                      {aluno.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))}
        </>
      ) : (
        <ModalSemConexao ondeNavegar={"Home"} navigation={navigation} />
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: "5%",
  },
  textoAlinhado: {
    marginLeft: "5%",
    marginTop: "15%",
    textDecorationLine: "underline",
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
