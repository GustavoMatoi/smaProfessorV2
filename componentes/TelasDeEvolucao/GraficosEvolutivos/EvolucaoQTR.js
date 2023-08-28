import React, {useState, useEffect, useCallback} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../Home"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
import moment from 'moment';
import BotaoSelect from "../../BotaoSelect"

export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)
    const [arrayMeses, setArrayMeses] = useState([])
    const [qtrObjeto, setQtrObjeto] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState()
    const [arrayFiltrado, setArrayFiltrado] = useState([{x: 0, y: 0}])
    const [primeiroUltimoDiaEixoX, setPrimeiroUltimoDiaEixoX] = useState([])
    const [diariamenteEixoX, setDiariamenteEixoX] = useState([])
    const [valorMesInicial, setValorMesInicial] = useState(0)
    const [arrayPseNoGrafico, setArrayPseNoGrafico] = useState([{x: 0, y: 0}])
    const [mesInicial, setMesInicial] = useState(0)
    const [parametroX, setParametroX] = useState([])
    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    console.log(mesInicial)
    const getPse = async () => {    
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel, "alunos",`Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);

        const newArrayPse = []
        const newArrayQtrObj = []
        const arrayMesesAux = []
        const arrayData = []
        querySnapshot.forEach((doc)=> {
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
            
          const dataFormatada = moment(`${doc.get('ano')}-${doc.get('mes')}-${doc.get('dia')}`, 'YYYY-MM-DD');
          const diaDaSemana = dataFormatada.format('dddd'); 
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
          arrayData.push(`${doc.get('dia')}/${doc.get('mes')}`)
          const qtrObjeto = {
            qtr: doc.get('QTR.valor'),
            data: `${stringAux} ${doc.get('ano')}`
          }

          newArrayQtrObj.push(qtrObjeto)
          newArrayPse.push({
                dia: doc.get('dia'),
                mes: doc.get('mes'),
                ano: doc.get('ano'),
                qtr: doc.get('QTR.valor'),
                diaDaSemana: diaDaSemana})
        }
        
        
        );  


        setArrayMeses(arrayMesesAux)
        setArrayPse(newArrayPse)
        setCarregandoDados(false)
        setQtrObjeto(newArrayQtrObj)
        setDiariamenteEixoX(arrayData)

          
          
    };

    useEffect(() => {
        getPse();
    }, []);


        
        useEffect(() => {
            const index = qtrObjeto.findIndex(item => item.data === mesSelecionado);
            if (index !== -1) {
              setMesInicial(index);
            }
          }, [mesSelecionado]);

    const[opcao, setOpcao] = useState('')

    const arrayBotaoSelect = arrayMeses.map(i => {return i.data})

    const arrayBotaoSelectSemRepeticoes = [...new Set(arrayBotaoSelect)]
    const handleSelectChange = (value, index) => {
        setMesSelecionado(value);

    };

   const filtraArray = useCallback(() => {
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


  const index = arrayMeses.findIndex(item => item.data === mesSelecionado);
  let arrayPseNoGrafico2 = []
  if (index !== -1) {
    const aggregatedData90Days = aggregateData(qtrObjeto, 300, mesInicial);
        arrayPseNoGrafico2 = aggregatedData90Days[0].map((i, element) => {
          return { x: element + 1, y: i.qtr };
        });

      setArrayPseNoGrafico(arrayPseNoGrafico2)
}
function organizeData(arrayPse) {
    const organizedData = {};
  
    arrayPse.forEach((element) => {
      const dataFormatada = moment(`${element.ano}-${element.mes}-${element.dia}`, 'YYYY-MM-DD');
      
      const startOfWeek = dataFormatada.clone().startOf('isoWeek');
      const endOfWeek = dataFormatada.clone().endOf('isoWeek');
  
      const weekRange = `${startOfWeek.format('D MMM')} - ${endOfWeek.format('D MMM')}`;
  
      if (!organizedData[weekRange]) {
        organizedData[weekRange] = [];
      }
  
      organizedData[weekRange].push(element);
    });
  
    return organizedData;
  }
  
  
  const organizedPseData = organizeData(arrayPse);
  const getDiaAbreviado = (dia) => {
    switch (dia) {
      case "Monday":
        return "Seg";
      case "Tuesday":
        return "Ter";
      case "Wednesday":
        return "Qua";
      case "Thursday":
        return "Qui";
      case "Friday":
        return "Sex";
      case "Saturday":
        return "Sáb";
      case "Sunday":
        return "Dom";
      default:
        return dia;
    }
  }
  

  const primeiroUltimoDia = []
  const primeiroUltimoDiaString = []
  let i = 0; 
  for (const weekRange in organizedPseData) {
    if (i > valorMesInicial) { 
      const weekData = organizedPseData[weekRange];
  
      if (weekData.length > 0) {
        const firstItem = weekData[0];
        const lastItem = weekData[weekData.length - 1];
  
        console.log(weekData)
        
        if (firstItem.diaDaSemana !== lastItem.diaDaSemana) {
          primeiroUltimoDia.push(firstItem.qtr, lastItem.qtr);
          primeiroUltimoDiaString.push(
            `${getDiaAbreviado(firstItem.diaDaSemana)}, ${firstItem.dia}/${firstItem.mes}`,
            `${getDiaAbreviado(firstItem.diaDaSemana)}, ${lastItem.dia}/${lastItem.mes}`
          );
          
        } else {
          primeiroUltimoDia.push(firstItem.qtr);
          primeiroUltimoDiaString.push(  `${getDiaAbreviado(firstItem.diaDaSemana)}, ${firstItem.dia}/${firstItem.mes}`);
        }
                      }
    }
  
    i++; 
  }
  const primeiroUltimoDiaNoGrafico = primeiroUltimoDia.map((i, element) => {
    return {x: element + 1, y: i}
  })
  setArrayFiltrado(primeiroUltimoDiaNoGrafico)
  setPrimeiroUltimoDiaEixoX(primeiroUltimoDiaString)

  console.log('primeiroUltimoDiaString', primeiroUltimoDiaString)


}, [mesSelecionado, mesInicial, opcao]);






useEffect(() => {
    const posicaoNumerica = arrayBotaoSelectSemRepeticoes.indexOf(mesSelecionado);
    setValorMesInicial(posicaoNumerica)
    filtraArray()

}, [mesSelecionado])


const eixoXNoGrafico = arrayPseNoGrafico.map((i, element)=> {
    return `Dia ${element + 1}`
})

    return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>

                  {conexao ?   carregandoDados ? (
                        <Spinner
                        visible={carregandoDados}
                        textContent={'Carregando alunos...'}
                        textStyle={[estilo.textoCorLight, estilo.textoP16px]}
                        />                    
                        ) : arrayPse.length == 0 ? (<View>
                        <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                        <View style={[estilo.centralizado, {marginTop: '5%'}]}><Entypo name="emoji-sad" size={100} color="#182128" /></View>
                        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '10%', textAlign: 'center', marginHorizontal: '5%'}, style.Montserrat]}>Você ainda não realizou nenhum treino. Treine e tente novamente mais tarde.</Text>
                    </View>) :   (
                    <View>
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução QTR:</Text>
                                    <View style={[estilo.centralizado, {width: '90%'}]}>
                                    <BotaoSelect     selecionado={true}  onChange={(value, index) => {handleSelectChange(value, index)}} titulo='Selecione um mês' max={1} options={arrayBotaoSelectSemRepeticoes}>
                      </BotaoSelect>
                                    </View>
                        <VictoryChart theme={VictoryTheme.material}>
                        <VictoryAxis
    style={{
      axisLabel: { fontSize: 5 }, 
      tickLabels: {
        fontSize: 
          opcao == 0
            ? arrayPseNoGrafico.length < 10 ? 10 : arrayPseNoGrafico.length > 10 && arrayPseNoGrafico.length < 20 ? 8  : arrayPseNoGrafico.length > 20 && arrayPseNoGrafico.length < 30? 7 : 5
            : opcao == 1
            ? arrayFiltrado.length < 30 ? 8 : arrayFiltrado.length > 30 && arrayFiltrado.length < 60 ? 6 : 4 : null
        
      }    }}

  />
    <VictoryAxis
    dependentAxis
    domain={[6, 20]}
    style={{
      axisLabel: { fontSize: 12 },
      tickLabels: { fontSize: 10 }, 
    }}
    
  />
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

                                categories={opcao == 0? {x: eixoXNoGrafico} : {x: primeiroUltimoDiaEixoX}}
                            data={opcao == 0? arrayPseNoGrafico : arrayFiltrado } />            
                    </VictoryChart>
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                    <RadioBotao
                            options={['Diariamente', 'Primeiro e último dia da semana']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => { setOpcao(i)}}
                        >
                    </RadioBotao>
                </View>
                    </View>
                    )  : <ModalSemConexao ondeNavegar={'Home'} navigation={navigation}/>}
                

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