import React, { useEffect, useState } from "react";
import { Text, View, Button, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../LoginScreen";
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";
import { FontAwesome5 } from '@expo/vector-icons';
import estilo from "../estilo";
import Spinner from 'react-native-loading-spinner-overlay';
import { Entypo } from '@expo/vector-icons'; 


export default ({ route }) => {
  const [dadosDeTreino, setDadosDeTreino] = useState({})
  const [conexao, setConexao] = useState(true)
  const [carregandoDados, setCarregandoDados] = useState(false)

  const { aluno } = route.params

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type == 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }

  }, [])
  const recuperarDados = async () => {
    setCarregandoDados(true)
    const arrayDadosAux = []
    const arrayExercicios = [];

    const bd = getFirestore();
    const diarioRef = collection(bd, 'Academias', professorLogado.getAcademia(), 'Professores', aluno.professorResponsavel, 'alunos', `Aluno ${aluno.email}`, 'Diarios');
    const diarioSnapshot = await getDocs(diarioRef);

    const objetoParaCSV = await Promise.all(diarioSnapshot.docs.map(async (doc) => {
      const i = doc.data();
      
      if (i.tipo === 'Ficha de Treino') {
        return {
          PSE: i.PSE.valor,
          QTR: i.QTR.valor,
          Data: `${i.dia}/${i.mes}/${i.ano}`,
          Inicio: i.inicio,
          Fim: i.fimDoreino,
          ['Duracao(min)']: i.duracao,
          Tipo: i.tipoDeTreino
        };
      } else {
        const detalhamentoRef = collection(doc.ref, 'Exercicio');
        const detalhamentoSnapshot = await getDocs(detalhamentoRef);

        detalhamentoSnapshot.forEach((exercicioDoc) => {
          arrayExercicios.push(exercicioDoc.data());
        });

        const objetoPadrao = {
          PSE: i.PSE.valor,
          QTR: i.QTR.valor,
          Data: `${i.dia}/${i.mes}/${i.ano}`,
          Inicio: i.inicio,
          Fim: i.fimDoreino,
          ['Duracao(min)']: i.duracao,
          Tipo: i.tipoDeTreino,
        };

        arrayExercicios.forEach((exercicio, index) => {
          objetoPadrao[`Exercício ${index}`] = exercicio.Nome;

          if ("descanso" in exercicio) {
            exercicio.descanso.forEach((item, descansoIndex) => {
              objetoPadrao[`Descanso ${exercicio.Nome} ${descansoIndex + 1}`] = `descanso${descansoIndex}: ${item}`;
            });
          }

          if ("duracao" in exercicio) {
            exercicio.duracao.forEach((item, duracaoIndex) => {
              objetoPadrao[`Duracao ${exercicio.Nome} ${duracaoIndex + 1}`] = `duracao${duracaoIndex}: ${item}`;
            });
          }
          if ("intensidade" in exercicio) {
            exercicio.intensidade.forEach((item, duracaoIndex) => {
              objetoPadrao[`Intensidade ${exercicio.Nome} ${duracaoIndex + 1}`] = `intensidade${duracaoIndex}: ${item}`;
            });
          }
          if ("intensidadeDoRepouso" in exercicio) {
            exercicio.intensidadeDoRepouso.forEach((item, duracaoIndex) => {
              objetoPadrao[`Intensidade do Repouso ${exercicio.Nome} ${duracaoIndex + 1}`] = `intensidade do repouso${duracaoIndex}: ${item}`;
            });
          }
          if ("pesoLevantado" in exercicio) {
            exercicio.pesoLevantado.forEach((item, duracaoIndex) => {
              objetoPadrao[`Peso levantado ${exercicio.Nome} ${duracaoIndex + 1}`] = `peso levantado${duracaoIndex}: ${item}`;
            });
          }
          if ("repeticoes" in exercicio) {
            exercicio.repeticoes.forEach((item, duracaoIndex) => {
              objetoPadrao[`Repeticoes ${exercicio.Nome} ${duracaoIndex + 1}`] = `repeticoes${duracaoIndex}: ${item}`;
            });
          }
          if ("descanso" in exercicio) {
            exercicio.descanso.forEach((item, descansoIndex) => {
              objetoPadrao[`Descanso ${exercicio.Nome} ${descansoIndex + 1}`] = `descanso${descansoIndex}: ${item}`;
              const propertyName = `PSEdoExercicioSerie${descansoIndex + 1}`;
            console.log(propertyName);
          
            if (propertyName in exercicio) {
              console.log(propertyName);
              objetoPadrao[`PSE do Exercicio Serie ${descansoIndex + 1}`] = `${propertyName}: ${exercicio[propertyName].valor}`;
            }
          
            const propertyName2 = `PerflexDoExercicio${descansoIndex + 1}`;
          
            if (propertyName2 in exercicio) {
              objetoPadrao[`Perflex do Exercicio Serie ${descansoIndex + 1}`] = `${propertyName2}: ${exercicio[propertyName2].valor}`;
            }
            });

        }
      });

        return {
          ...objetoPadrao
        };
      }
    }));
    objetoParaCSV.unshift({
      PSE:'PSE',
      QTR: 'QTR',
      Data: `Data`,
      Inicio: 'Inicio',
      Fim:'Fim',

    })

    setDadosDeTreino(objetoParaCSV)
    setCarregandoDados(false)
  }
  useEffect(() => {
    recuperarDados()
  }, [])
  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth() + 1
  const ano = data.getFullYear()

  const exportToCSV = async (data, filename) => {
    const csvData = data.map(row => Object.values(row).map(value => `"${value}"`).join(';'));
    const header = Object.keys(data[0]).map(key => `"${key}"`).join(';');
    csvData.unshift(header);
    const csvString = csvData.join('\n');

    const tempPath = `${FileSystem.documentDirectory}${filename}.csv`;

    await FileSystem.writeAsStringAsync(tempPath, csvString, { encoding: FileSystem.EncodingType.UTF8 });

    Sharing.shareAsync(tempPath, { mimeType: 'text/csv', dialogTitle: 'Escolha um local para exportar' });

  };
  function isObjectEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  return (
    <View style={[estilo.textoCorLightMenos1, { padding: 20 }]}>
      {conexao ? (
        carregandoDados ?

          <Spinner
            visible={carregandoDados}
            textContent={'Carregando dados...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          />

          :
        <View>
          {isObjectEmpty(dadosDeTreino) ? 
          <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center', padding: 50}]}>
            <Entypo name="emoji-sad" size={150} color="#182128" />
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Parece que o aluno ainda não registrou nenhum diário de treino.</Text>
            </View>
         : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, { marginVertical: 20 }]}>Aperte no botão abaixo para exportar os dados de treino do aluno selecionado.</Text>
          <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {marginVertical: '5%'}]}>Os dados serão renderizados em um arquivo CSV, cada dia de treino cadastrado aparecerá em forma de linha, contendo todos os dados do treino (PSE, QTR, duração, início, fim, tipo) e caso o aluno escolha o tipo de treino diário, também conterá dados de cada exercício (PSE do Exercício, Descanso por série, etc.)</Text>
          <TouchableOpacity style={[{ width: 200, height: 200, backgroundColor: '#00A859', justifyContent: 'center', alignItems: 'center', borderRadius: 20, elevation: 10 }]} onPress={() => exportToCSV(dadosDeTreino, `${aluno.nome}${dia}-${mes}-${ano}`)} >
            <FontAwesome5 name="file-csv" size={150} color="white" />
            <Text style={[estilo.textoCorLight, estilo.textoP16px]}>Exportar dados</Text>
          </TouchableOpacity>
        </View>}
          </View>
      ) : (
        <ModalSemConexao ondeNavegar={'Home'} />
      )}
    </View>

  )
}