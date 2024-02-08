import React, {useState, useEffect, useCallback} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../LoginScreen"
import moment from 'moment';
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
import BotaoSelect from '../../BotaoSelect'

export default ({route, navigation}) => {
    const {aluno} = route.params
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)
    const [arrayMeses, setArrayMeses] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState()
    const [mesInicial, setMesInicial] = useState(0)
    const [desvioPadraoObj, setDesvioPadraoObj] = useState([])
    const [arrayFiltrado, setArrayFiltrado] = useState([{x: 0, y: 0}])
    const [renderizaGrafico, setRenderizaGrafico] = useState(false)
    const [arrayParametroX, setArrayParametroX] = useState()
    useEffect ( () => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type == 'cellular')
      })

      return () => {
        unsubscribe()
      }
    }, [])




    const[opcao, setOpcao] = useState(0)

    let vetorContador = []



    //Semanal 
    const [arrayPseSemanal, setArrayPseSemanal] = useState([]);
    const [citSemanal, setCitSemanal] = useState([])
    const [desvioPadraoSemanal, setDesvioPadraoSemanal] = useState([]);

    const getPseSemanal = async () => {
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Alunos", `${aluno.email}`, 'Diarios');

        const querySnapshot = await getDocs(diariosRef);
        const arrayMeses = [];
        
        const newArrayPse = [];
        const arrayMesesAux = []
        querySnapshot.forEach((doc) => {
          let stringAux = doc.get('mes')
          if(stringAux == 1) stringAux = 'Janeiro'
          if(stringAux == 2) stringAux = 'Fevereiro'
          if(stringAux == 3) stringAux = 'Março'
          if(stringAux == 4) stringAux = 'Abril'
          if(stringAux == 5) stringAux = 'Maio'
          if(stringAux == 6) stringAux = 'Junho'
          if(stringAux == 7) stringAux = 'Julho'
          if(stringAux == 8) stringAux = 'Agosto'
          if(stringAux == 9) stringAux = 'Setembro'
          if(stringAux == 10) stringAux = 'Outubro'
          if(stringAux == 11) stringAux = 'Novembro'
          if(stringAux == 12) stringAux = 'Dezembro'
          const CIT = doc.get('PSE.valor') * doc.get('duracao');
          newArrayPse.push({
            cit: CIT,
            dia: doc.get('dia'),
            mes: doc.get('mes'),
            ano: doc.get('ano'),
            data: `${stringAux} ${doc.get('ano')}`
          });

          if(doc.get('mes') === 1){ arrayMesesAux.push({data:`Janeiro ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 2){ arrayMesesAux.push({data:`Fevereiro ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 3){ arrayMesesAux.push({data:`Março ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 4){ arrayMesesAux.push({data:`Abril ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 5){ arrayMesesAux.push({data:`Maio ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 6){ arrayMesesAux.push({data:`Junho ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 7){ arrayMesesAux.push({data:`Julho ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 8){ arrayMesesAux.push({data:`Agosto ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 9){ arrayMesesAux.push({data:`Setembro ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 10){ arrayMesesAux.push({data:`Outubro ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 11){ arrayMesesAux.push({data:`Novembro ${doc.get('ano')}`, dia: doc.get('dia')})}
          if(doc.get('mes') === 12){ arrayMesesAux.push({data:`Dezembro ${doc.get('ano')}`, dia: doc.get('dia')})}
        });
        setArrayPseSemanal(newArrayPse);
        setCarregandoDados(false);
        setArrayMeses(arrayMesesAux)
      };
      useEffect(() => {
        getPseSemanal();
      }, []);
    
      useEffect(() => {
        const index = desvioPadraoObj.findIndex(item => item.data === mesSelecionado);
        if (index !== -1) {
          setMesInicial(index);
        }
      }, [mesSelecionado]);

      useEffect(() => {
        const calcularCITSemanal = () => {
          const semanasObj = {};
          const monotoniaObjAux = []
          const mesesDesvioPadrao = [];

          arrayPseSemanal.forEach((item) => {
            let stringAux = item.mes
            if(stringAux == 1) stringAux = 'Janeiro'
            if(stringAux == 2) stringAux = 'Fevereiro'
            if(stringAux == 3) stringAux = 'Março'
            if(stringAux == 4) stringAux = 'Abril'
            if(stringAux == 5) stringAux = 'Maio'
            if(stringAux == 6) stringAux = 'Junho'
            if(stringAux == 7) stringAux = 'Julho'
            if(stringAux == 8) stringAux = 'Agosto'
            if(stringAux == 9) stringAux = 'Setembro'
            if(stringAux == 10) stringAux = 'Outubro'
            if(stringAux == 11) stringAux = 'Novembro'
            if(stringAux == 12) stringAux = 'Dezembro'

            const data = moment(`${item.ano}-${item.mes}-${item.dia}`, 'YYYY-MM-DD');
            const semanaAno = `${data.week()}-${data.year()}`;
            if (semanasObj[semanaAno]) {
              semanasObj[semanaAno].push(item.cit);
              monotoniaObjAux.push({cit: item.cit, data: `${item.mes}/${item.ano}`})
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
    
            const quadradosDasDiferencas = semanasObj[semanaAno].map((valor) => Math.pow(valor - mediaSemanal, 2));
            const somaQuadradosDasDiferencas = quadradosDasDiferencas.reduce((acc, valor) => acc + valor, 0);
            const desvioPadraoSemanal = Math.sqrt(somaQuadradosDasDiferencas / semanasObj[semanaAno].length);
            arrayDesvioPadraoSemanalTemporario.push(desvioPadraoSemanal);
            const dataParts = semanaAno.split('-');
            const semana = parseInt(dataParts[0]);
            const ano = parseInt(dataParts[1]);
            const data = moment().year(ano).isoWeek(semana);
            let stringAux = data.month() + 1
            if(stringAux == 1) stringAux = 'Janeiro'
            if(stringAux == 2) stringAux = 'Fevereiro'
            if(stringAux == 3) stringAux = 'Março'
            if(stringAux == 4) stringAux = 'Abril'
            if(stringAux == 5) stringAux = 'Maio'
            if(stringAux == 6) stringAux = 'Junho'
            if(stringAux == 7) stringAux = 'Julho'
            if(stringAux == 8) stringAux = 'Agosto'
            if(stringAux == 9) stringAux = 'Setembro'
            if(stringAux == 10) stringAux = 'Outubro'
            if(stringAux == 11) stringAux = 'Novembro'
            if(stringAux == 12) stringAux = 'Dezembro'
            mesesDesvioPadrao.push({ data: `${stringAux} ${ano}`, desvioPadrao: desvioPadraoSemanal });
          });
          setCitSemanal(arraySemanalTemporario);
          setDesvioPadraoSemanal(arrayDesvioPadraoSemanalTemporario);
          setDesvioPadraoObj(mesesDesvioPadrao)

        };
    
        if (arrayPseSemanal.length > 0) {
          calcularCITSemanal();
        }
      }, [arrayPseSemanal]);
    
      useEffect(() => {
        const aggregateData = (filteredData, interval, mesInicial) => {
          const aggregatedData = [];
          let currentGroup = [];
        
          for (let i = mesInicial; i < filteredData.length; i++) {
            if (currentGroup.length < interval) {
              currentGroup.push(filteredData[i]);
            } else {
              aggregatedData.push(currentGroup);
              currentGroup = [];
              currentGroup.push(filteredData[i]);
            }
          }
        
          if (currentGroup.length > 0) {
            aggregatedData.push(currentGroup);
          }
          return aggregatedData;
        };
        const aggregatedData30Days = aggregateData(desvioPadraoObj, 90, mesInicial);
        const diasDoArrayMeses = arrayMeses.map(i => {
          return i.dia;
        });

        console.log('aggregatedData30Days', aggregatedData30Days)
        let arrayPseNoGrafico2 = [] // First declaration

        if (aggregatedData30Days[0]) {
          const index = arrayMeses.findIndex(item => item.data === mesSelecionado);
          if (index !== -1) {
            arrayPseNoGrafico2 = aggregatedData30Days[0].map((i, element) => {
              return { x: element + 1, y: i.desvioPadrao };
            });
            console.log('arrayPseNoGrafico2', arrayPseNoGrafico2)
          }
        }
        console.log('arrayPseNoGrafico2', arrayPseNoGrafico2)
        const arrayDatasMeses = [];
        for (let i = mesInicial; i < arrayMeses.length; i++) {
          const numeroMes = mapearMesParaNumero(arrayMeses[i].data);
          arrayDatasMeses.push(`${diasDoArrayMeses[i]}/${numeroMes}`);
        }
        setArrayParametroX(arrayDatasMeses);
        setArrayFiltrado(arrayPseNoGrafico2);
        setRenderizaGrafico(true)
      }, [mesInicial])
      
  
    

const mapearMesParaNumero = (mes) => {
  const nomeMes = mes.split(" ")[0];
  switch (nomeMes) {
    case "Janeiro": return 1;
    case "Fevereiro": return 2;
    case "Março": return 3;
    case "Abril": return 4;
    case "Maio": return 5;
    case "Junho": return 6;
    case "Julho": return 7;
    case "Agosto": return 8;
    case "Setembro": return 9;
    case "Outubro": return 10;
    case "Novembro": return 11;
    case "Dezembro": return 12;
    default: return -1; // Mês não reconhecido
  }
}

  const arrayBotaoSelect = arrayMeses.map(i => {return i.data})

  const arrayBotaoSelectSemRepeticoes = [...new Set(arrayBotaoSelect)]
  const handleSelectChange = (value) => {
    setMesSelecionado(value);
  };

  const eixoXNoGrafico = arrayFiltrado.map((i, element)=> {
    return `Sem. ${element + 1}`
})
    return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>

                    {conexao? carregandoDados ? (
                         <Spinner
                         visible={carregandoDados}
                         textContent={'Carregando dados...'}
                         textStyle={[estilo.textoCorLight, estilo.textoP16px]}
                       />
                    ) : arrayPseSemanal.length == 0 ? (<View>
                        <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                        <View style={[estilo.centralizado, {marginTop: '5%'}]}><Entypo name="emoji-sad" size={100} color="#182128" /></View>
                        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '10%', textAlign: 'center', marginHorizontal: '5%'}, style.Montserrat]}>Você ainda não realizou nenhum treino. Treine e tente novamente mais tarde.</Text>
                    </View>) :   (
                    <View>
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução Monotonia</Text>
                                    <View style={[estilo.centralizado, {width: '90%', marginTop: 10}]}>
                                  <BotaoSelect     selecionado={true}  onChange={(value, index) => {handleSelectChange(value, index)}} titulo='Selecione um mês' max={1} options={arrayBotaoSelectSemRepeticoes}>
                      </BotaoSelect>
                                                          </View>
                        {!mesSelecionado?
                        <View style={[{width: '90%', marginVertical: '5%'}, estilo.centralizado]}>
                        <Text style={[estilo.tituloH619px, estilo.textoCorDanger, {textAlign: 'center'}]}>Selecione o mês do período inicial para renderizar os dados</Text>
                          <View style={[estilo.centralizado, {marginVertical: '10'}]}>
                          <Entypo name="line-graph" size={100} color="#FF6262" />

                            </View>                        
                         </View>
                        
                        : <VictoryChart theme={VictoryTheme.material}>
                            <VictoryLine
                                containerComponent={<VictoryVoronoiContainer/>}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "#0066FF" },
                                    parent: { border: "1px solid #182128"},
                                }}

                                categories={{x: eixoXNoGrafico}}
                            data={arrayFiltrado} />            
                    </VictoryChart>}
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar a evolução:</Text>
                    <RadioBotao
                            options={[ 'Semanal']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => {setOpcao(i);}}
                        >
                    </RadioBotao>

                    <View style={{marginTop: '5%' }}>
                      <Text style = {[estilo.textoP16px, estilo.textoCorSecundaria]}>Valores:</Text>
                    {arrayFiltrado.map((i, index) => <Text>Semana: {i.x} | Monotonia: {i.y.toFixed(3)}</Text>)}
                    </View>
                </View>
                
                    </View>
                    ) : <ModalSemConexao ondeNavegar={'Home'} navigation={navigation}/> }
                

            </SafeAreaView>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }
})