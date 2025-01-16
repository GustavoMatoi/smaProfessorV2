import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import ModalSemConexao from "../ModalSemConexao";
import estilo from "../estilo";

export default ({ navigation, route }) => {
  const { alunos } = route.params;
  const [conexao, setConexao] = useState(true);
  const [turmasVisiveis, setTurmasVisiveis] = useState({});

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConexao(state.type === "wifi" || state.type === "cellular");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const alunosAtivos = alunos.filter((aluno) => !aluno.inativo);
  const alunosInativos = alunos.filter((aluno) => aluno.inativo);

  const alunosSemTurma = alunosAtivos.filter(
    (aluno) => aluno.turma === ""
  );  
  const alunosAtivosPorTurma = alunosAtivos.reduce((acc, aluno) => {
    if (aluno.turma) {
      acc[aluno.turma] = acc[aluno.turma] || [];
      acc[aluno.turma].push(aluno);
    }
    return acc;
  }, {});

  const toggleVisibilidadeTurma = (turma) => {
    setTurmasVisiveis((prev) => ({
      ...prev,
      [turma]: !prev[turma],
    }));
  };
  const turmas = alunos.map((aluno) => aluno.turma).filter((turma) => turma); // Remove valores vazios
  const turmasFiltradas = new Set(turmas);
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

          {Object.entries(alunosAtivosPorTurma).map(([turma, alunosDaTurma]) => (
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
