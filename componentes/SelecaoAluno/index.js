import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc,query, orderBy,onSnapshot } from "firebase/firestore";
import { professorLogado } from "../LoginScreen";

export default ({ navigation, route }) => {
  const { alunos } = route.params;
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
      setConexao(state.type === 'wifi' || state.type === 'cellular');
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const db = getFirestore();
    
    // Listener para Turmas
    const turmasRef = collection(db, 'Academias', professorLogado.getAcademia(), 'Turmas');
    const unsubscribeTurmas = onSnapshot(turmasRef, (snapshot) => {
      const newArrayTurmas = [];
      snapshot.forEach(doc => {
        const turmaData = doc.data();
        if (turmaData.nome) newArrayTurmas.push(turmaData.nome);
      });
      setTurmasCadastradas(newArrayTurmas);
    });
  
    // Listener para Alunos
    const alunosRef = collection(db, 'Academias', professorLogado.getAcademia(), 'Alunos');
    const unsubscribeAlunos = onSnapshot(alunosRef, (snapshot) => {
      const alunosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  useEffect(() => {
    const verificarTurmas = () => {
      const turmasInvalidas = alunosAtualizados
        .filter((aluno) => aluno.turma && !turmasCadastradas.includes(aluno.turma))
        .map((aluno) => aluno.turma);

      console.log("Turmas cadastradas no banco de dados:");
      for (const turma of turmasCadastradas) {
        console.log(`- ${turma}`);
      }
  
      console.log("\nTurmas inválidas (não cadastradas):");
      const turmasInvalidasUnicas = [...new Set(turmasInvalidas)];
      for (const turma of turmasInvalidasUnicas) {
        console.log(`- ${turma}`);
      }
    };
  
    verificarTurmas();
  }, [turmasCadastradas, turmasVisiveis, alunos]);
  
  return (
    <SafeAreaView style={style.container}>
          {/*<View style={style.header}>
            <Logo />
            <TouchableOpacity
              style={style.botaoAtualizar}
              onPress={() => {
                Alert.alert(
                  "Atualizar Dados",
                  "Os dados foram atualizados com sucesso."
                );
              }}
            >
              <AntDesign name="reload1" size={20} color="white" />
            </TouchableOpacity>
          </View>*/}
          <Logo />
          <ScrollView contentContainerStyle={style.scrollViewContent}>
          <>
          
                {!conexao ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Modo Offline",
                  "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                );
              }}
              style={[
                estilo.centralizado,
                {
                  marginVertical: "3%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                },
              ]}
            >
              <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>
                MODO OFFLINE -{" "}
              </Text>
              <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
            </TouchableOpacity>
          ) : null}
          <Text
            style={[estilo.textoCorSecundaria, estilo.textoP16px, style.textoAlinhado]}
          >
            Gerenciar turmas (Criar excluir ou deletar)
          </Text>

          <TouchableOpacity
            style={[
              estilo.botao,
              estilo.corLightMenos1,
              { borderWidth: 3,justifyContent:'center', alignItems:'center', textoAlign: 'center' },
              style.botao,
            ]}
            onPress={() => navigation.navigate("Editar Turmas")}
          >
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px,{justifyContent:'center', alignItems:'center', textoAlign: 'center'}]}>
              Gerenciar turmas
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              estilo.textoCorDanger,
              estilo.textoP16px,
              style.textoAlinhado,
            ]}
            numberOfLines={2}
          >
            Selecione o aluno para continuar.
          </Text>

          <Text style={[estilo.textoP16px, { margin: 20 }]}>
            Alunos cujo botão esteja com a cor{" "}
            <Text style={[{ color: "#F2D64E" }]}>Amarela</Text> são alunos que a
            ficha de treino está prestes a vencer.
          </Text>
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
                style={[estilo.botao, estilo.corWarning, style.botao]}
                onPress={() => navigation.navigate("Perfil Aluno", { aluno })}
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
              style={[estilo.botao, estilo.corPrimaria, style.botao]}
              onPress={() =>
                navigation.navigate("Perfil Aluno", { aluno: aluno })
              }
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
                    style={[estilo.botao, estilo.corPrimaria, style.botao]}
                    onPress={() => navigation.navigate("Perfil Aluno", { aluno })}
                  >
                    <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                      {aluno.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))}

          <Text
            style={[
              estilo.textoP16px,
              estilo.textoCorSecundaria,
              { margin: 10 },
            ]}
          >
            Inativos
          </Text>
          {alunosInativos.map((aluno) => (
            <TouchableOpacity
              key={aluno.cpf}
              style={[estilo.botao, estilo.corDisabled, style.botao]}
              onPress={() => navigation.navigate("Perfil Aluno", { aluno: aluno })}
            >
              <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                {aluno.nome} - inativo
              </Text>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: "5%",
    flex: 1
  },
  tituloAlinhado: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
  textoAlinhado: {
    marginLeft: "5%",
    marginTop: "15%",
    textDecorationLine: "underline",
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 110,
    marginBottom: 10,
    padding: 5
  },botaoAtualizar: {
    backgroundColor: "#007BFF", 
    borderRadius: 25, 
    width: 40,
    height: 40,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    scrollViewContent: {
      paddingBottom: 80, // Ajuste conforme a altura da sua TabBar
      paddingHorizontal: 16, // Opcional para espaçamento lateral
    },
  },
});