import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import estilo from "../../estilo";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryAxis } from "victory-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { professorLogado } from "../../LoginScreen";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo";
import ModalSemConexao from "../../ModalSemConexao";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default ({ route }) => {
  const { aluno } = route.params;

  const [arrayPse, setArrayPse] = useState([]);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [conexao, setConexao] = useState(true);
  const [arrayStrainNoGrafico, setArrayStrainNoGrafico] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === "wifi" || state.type === "cellular");
    });
    return () => unsubscribe();
  }, []);

  const getPse = async () => {
    try {
      const db = getFirestore();
      const diariosRef = collection(
        db,
        "Academias",
        professorLogado.getAcademia(),
        "Alunos",
        `${aluno.email}`,
        "Diarios"
      );
      const querySnapshot = await getDocs(diariosRef);

      const newArrayPse = [];
      querySnapshot.forEach((doc) => {
        newArrayPse.push(doc.get("PSE.valor") * doc.get("duracao"));
      });
      setArrayPse(newArrayPse);
      setCarregandoDados(false);
    } catch (error) {
      console.error("Erro ao buscar dados de PSE:", error);
      setCarregandoDados(false);
    }
  };

  const calcularDadosSemanais = async () => {
    try {
      const db = getFirestore();
      const diariosRef = collection(
        db,
        "Academias",
        professorLogado.getAcademia(),
        "Alunos",
        `${aluno.email}`,
        "Diarios"
      );
      const querySnapshot = await getDocs(diariosRef);

      const newArrayPse = [];
      querySnapshot.forEach((doc) => {
        const CIT = doc.get("PSE.valor") * doc.get("duracao");
        newArrayPse.push({
          cit: CIT,
          dia: doc.get("dia"),
          mes: doc.get("mes"),
          ano: doc.get("ano"),
        });
      });

      const semanasObj = {};
      newArrayPse.forEach((item) => {
        const data = moment(`${item.ano}-${item.mes}-${item.dia}`, "YYYY-MM-DD");
        const semanaAno = `${data.week()}-${data.year()}`;

        if (semanasObj[semanaAno]) {
          semanasObj[semanaAno].push(item.cit);
        } else {
          semanasObj[semanaAno] = [item.cit];
        }
      });

      const arraySemanalTemporario = [];
      const arrayDesvioPadraoSemanalTemporario = [];
      Object.keys(semanasObj).forEach((semanaAno) => {
        const somaSemanal = semanasObj[semanaAno].reduce((acc, cit) => acc + cit, 0);
        const mediaSemanal = somaSemanal / semanasObj[semanaAno].length;
        arraySemanalTemporario.push(mediaSemanal);

        const quadradosDasDiferencas = semanasObj[semanaAno].map(
          (valor) => Math.pow(valor - mediaSemanal, 2)
        );
        const somaQuadradosDasDiferencas = quadradosDasDiferencas.reduce(
          (acc, valor) => acc + valor,
          0
        );
        const desvioPadraoSemanal = Math.sqrt(
          somaQuadradosDasDiferencas / semanasObj[semanaAno].length
        );
        arrayDesvioPadraoSemanalTemporario.push(desvioPadraoSemanal);
      });

      const arrayStrainTemporario = arraySemanalTemporario.map(
        (media, i) => media * arrayDesvioPadraoSemanalTemporario[i]
      );
      const arrayStrainData = arrayStrainTemporario.map((strain, index) => ({
        x: index + 1,
        y: strain,
      }));

      setArrayStrainNoGrafico(arrayStrainData);
    } catch (error) {
      console.error("Erro ao calcular dados semanais:", error);
    }
  };

  useEffect(() => {
    getPse();
  }, []);

  useEffect(() => {
    if (arrayPse.length > 0) {
      calcularDadosSemanais();
    }
  }, [arrayPse]);

  return (
    <ScrollView style={[estilo.corLightMenos1, style.container]}>
      <SafeAreaView>
        {conexao ? (
          carregandoDados ? (
            <Spinner
              visible={carregandoDados}
              textContent={"Carregando dados..."}
              textStyle={[estilo.textoCorLight, estilo.textoP16px]}
            />
          ) : arrayPse.length === 0 ? (
            <View style={estilo.centralizado}>
              <Text style={[estilo.tituloH333px]}>Ops...</Text>
              <View style={{ marginTop: "5%" }}>
                <Entypo name="emoji-sad" size={100} color="#182128" />
              </View>
              <Text
                style={[
                  estilo.textoCorSecundaria,
                  estilo.textoP16px,
                  { marginTop: "10%", textAlign: "center", marginHorizontal: "5%" },
                  style.Montserrat,
                ]}
              >
                O aluno ainda não realizou nenhum treino.
              </Text>
            </View>
          ) : (
            <View style={{ marginLeft: "5%" }}>
              <Text
                style={[
                  estilo.tituloH619px,
                  estilo.textoCorSecundaria,
                  estilo.centralizado,
                  { marginTop: "3%" },
                ]}
              >
                Evolução Strain
              </Text>
              <VictoryChart theme={VictoryTheme.material} height={400} width={400}>
                <VictoryAxis
                  label="Semanas"
                  style={{
                    axisLabel: { padding: 30, fontSize: 11 },
                    tickLabels: { fontSize: 11 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  label="Strain"
                  style={{
                    axisLabel: { padding: 40, fontSize: 11 },
                    tickLabels: { fontSize: 11 },
                  }}
                />
                <VictoryLine
                  containerComponent={<VictoryVoronoiContainer />}
                  animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                  style={{
                    data: { stroke: "#0066FF" },
                    parent: { border: "1px solid #182128" },
                  }}
                  data={arrayStrainNoGrafico}
                />
              </VictoryChart>

              <View style={style.explicacaoBox}>
                <Ionicons
                  name="information-circle-outline"
                  size={28}
                  color={estilo.corPrimaria}
                  style={style.infoIcon}
                />
                <Text style={[estilo.textoP16px, style.explicacaoText]}>
                  <Text style={estilo.textoNegrito}>Obs:</Text> A semana inicia na segunda-feira. 
                  Treinos realizados no fim de semana e na segunda podem ser agrupados em semanas distintas.
                </Text>
              </View>
            </View>
          )
        ) : (
          <ModalSemConexao />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  Montserrat: {
    fontFamily: "Montserrat",
  },
  explicacaoBox: {
    backgroundColor: "#F0F9FF",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#B6E1FF",
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  explicacaoText: {
    flex: 1,
    color: "#2A2A2A",
    lineHeight: 22,
  },
});