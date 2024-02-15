import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';

export default ({ navigation, route }) => {
  const { alunos } = route.params;

  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const alunosAtivos = alunos.filter((aluno) => !aluno.inativo);
  const alunosInativos = alunos.filter((aluno) => aluno.inativo);

  // Organiza os alunos ativos por turma
  const alunosAtivosPorTurma = alunosAtivos.reduce((acc, aluno) => {
    acc[aluno.turma] = acc[aluno.turma] || [];
    acc[aluno.turma].push(aluno);
    return acc;
  }, {});

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <>
          <Logo />
          {!conexao ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Modo Offline",
                  "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                );
              }}
              style={[estilo.centralizado, { marginVertical: '3%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
            >
              <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
              <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
            </TouchableOpacity>
          ) : null}
          <Text style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]} numberOfLines={2}>
            Selecione o aluno para continuar.
          </Text>
          {Object.entries(alunosAtivosPorTurma).map(([turma, alunosDaTurma]) => (
            <View key={turma}>
              <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { margin: 10 }]}>{turma}</Text>
              {alunosDaTurma.map((aluno) => (
                <TouchableOpacity
                  key={aluno.cpf}
                  style={[estilo.botao, estilo.corPrimaria, style.botao]}
                  onPress={() => navigation.navigate('Perfil Aluno', { aluno: aluno })}
                >
                  <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                    {aluno.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { margin: 10 }]}>Inativos</Text>
          {alunosInativos.map((aluno) => (
            <TouchableOpacity
              key={aluno.cpf}
              style={[estilo.botao, estilo.corDisabled, style.botao]}
              onPress={() => navigation.navigate('Perfil Aluno', { aluno: aluno })}
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
    marginVertical: '5%'
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%'
  },
  textoAlinhado: {
    marginLeft: '5%',
    marginTop: '15%',
    textDecorationLine: 'underline',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'space-around', // Alinha os itens horizontalmente

  }

})