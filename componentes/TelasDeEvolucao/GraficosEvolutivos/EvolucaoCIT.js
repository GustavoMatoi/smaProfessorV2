import React, {useState, useEffect, useCallback } from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet, Button} from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { professorLogado } from "../../Home"
import moment from 'moment';
import Spinner from "react-native-loading-spinner-overlay"
import { Entypo } from '@expo/vector-icons'; 
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
import BotaoSelect from '../../BotaoSelect'
let arrayCit = []
export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)
    const [opcao, setOpcao] = useState(0)
    const [opcaoPeriodo, setOpcaoPeriodo] = useState(0)
    const [arrayPseSemanal, setArrayPseSemanal] = useState([]);
    const [citSemanal, setCitSemanal] = useState([])
    const [citMensal, setCitMensal] = useState([])
    const [arrayMeses, setArrayMeses] = useState([])
    const [citObjetos, setCitObjetos] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState('')
    const [mesInicial, setMesInicial] = useState(0)
    const [arrayFiltrado, setArrayFiltrado] = useState([{x: 0, y: 0}])
    const [arrayParametroX, setArrayParametroX] = useState([])
    const [semanasUnicas, setSemanasUnicas] = useState([])
    const [gruposSemanais, setGruposSemanais] = useState({})
    const [opcaoSemanal, setOpcaoSemanal] = useState(0)
    const [citSemanalFiltradaMeses, setCitSemanalFiltradaMeses] = useState([])
    const [citEixoX, setCitEixoX] = useState([])
    const [citMensalFiltrada, setCitMensalFiltrada] = useState([])
    const [citMensalNoGrafico, setCitMensalNoGrafico] = useState([{x: 0, y: 0}])
    const [citMensalEixoX, setCitMensalEixoX] = useState([])
    useEffect (() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
      })

      return () => {
        unsubscribe()
      }
    }, [])


    const getPse = async () => {
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel,"alunos", `Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);

        const newArrayPse = []
        const newArrayCitObj = []
        querySnapshot.forEach((doc)=> {
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
            const citObjeto = {
              cit: doc.get('PSE.valor') * doc.get('duracao'),
              data: `${stringAux} ${doc.get('ano')}`
            }
            newArrayPse.push(doc.get('PSE.valor') * doc.get('duracao'))
            newArrayCitObj.push(citObjeto)
        });  
        setArrayPse(newArrayPse)
        setCarregandoDados(false)
        setCitObjetos(newArrayCitObj)
    };

    useEffect(() => {
        getPse();
    }, []);




    const getPseSemanal = async () => {
        const db = getFirestore();
        const diariosRef = collection(
          db,
          "Academias",
          professorLogado.getAcademia(),
          "Professores",
          aluno.professorResponsavel,
          "alunos",
          `Aluno ${aluno.email}`,
          "Diarios"
        );
        const querySnapshot = await getDocs(diariosRef);
    
        const newArrayPse = [];
        const arrayMesesAux = []
        querySnapshot.forEach((doc) => {

          const dataFormatada = moment(`${doc.get('ano')}-${doc.get('mes')}-${doc.get('dia')}`, 'YYYY-MM-DD');
          const diaDaSemana = dataFormatada.format('dddd'); 
      
          const CIT = doc.get('PSE.valor') * doc.get('duracao');
          newArrayPse.push({
            cit: CIT,
            dia: doc.get('dia'),
            mes: doc.get('mes'),
            ano: doc.get('ano'),
            diaDaSemana: diaDaSemana
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
    const calcularCITSemanal = () => {
      const semanasObj = {};
      const mesesObj = {};
      const apenasSemanas = []
      arrayPseSemanal.forEach((item) => {
        const data = moment(`${item.ano}-${item.mes}-${item.dia}`, 'YYYY-MM-DD');
        const semanaAno = `${data.week()}-${data.year()}`;
        const mesAno = `${data.month()}-${data.year()}`;

        if (semanasObj[semanaAno]) {
          semanasObj[semanaAno].push(item.cit);
        } else {
          semanasObj[semanaAno] = [item.cit];

        }
        apenasSemanas.push(semanaAno)

        if (mesesObj[mesAno]) {
          mesesObj[mesAno].push(item.cit);
        } else {
          mesesObj[mesAno] = [item.cit];
        }
      });
      const arraySemanalTemporario = [];
      Object.keys(semanasObj).forEach((semanaAno) => {
        const citSemanal = semanasObj[semanaAno].reduce((acc, cit) => acc + cit, 0);
        arraySemanalTemporario.push(citSemanal);
      });
      const arrayMensalTemporario = [];
      const arrayMensalTemporario2 = [];
      Object.keys(mesesObj).forEach((mesAno, i) => {
        const citMensal = mesesObj[mesAno].reduce((acc, cit) => acc + cit, 0);
        arrayMensalTemporario.push(citMensal);
        arrayMensalTemporario2.push({mes: i, cit: citMensal})
      });
      setCitSemanal(arraySemanalTemporario);
      setCitMensal(arrayMensalTemporario);

      const apenasSemanasAux = []
      const teste = apenasSemanas.forEach((item) => {
        const aux = item.split("-")
        apenasSemanasAux.push(parseInt(aux[0]))
      })
      setSemanasUnicas([...new Set(apenasSemanasAux)]);
      setCitMensalFiltrada(arrayMensalTemporario)
    };



    if (arrayPseSemanal.length > 0) {
      calcularCITSemanal();
    }


  }, [arrayPseSemanal]);

  const filtrarArrayMensal = useCallback(() => {
    const gruposPorMes = {};
    citObjetos.forEach(objeto => {
      const dataSplit = objeto.data.split(' '); // Divide a data em ["Mês", "Ano"]
      const mes = dataSplit[0];
      const ano = dataSplit[1]; // Ano é a segunda parte da divisão
      const mesAno = `${mes} ${ano}`; // Mesmo mês e ano juntos
      if (!gruposPorMes[mesAno]) {
        gruposPorMes[mesAno] = 0;
      }
      gruposPorMes[mesAno] += objeto.cit;
    });
    const resultadoArray = Object.entries(gruposPorMes).map(([mesAno]) => `${mesAno}`);
    let valor = -1; // Inicializar como -1 para indicar que não encontrou correspondência
    
    for (let i = 0; i < resultadoArray.length; i++) {
      if (resultadoArray[i].startsWith(mesSelecionado)) {
        valor = i;
        break; // Se encontrou a correspondência, pode sair do loop
      }
    }
    const calcularValoresAgregados = (mesInicial) => {
      const resultados = [];
  
      for (let i = mesInicial; i < arrayBotaoSelectSemRepeticoes.length; i++) {
        resultados.push(citMensalFiltrada[i]);
      }
      
      return resultados;
    };
  

      const meses = calcularValoresAgregados(valor)
    

      const citMensalMapeada = meses.map((i, element) => `Mes. ${element + 1}`);
      const citMensalNoGrafico = meses.map((i, element) =>({ x: element + 1, y: i }))
      setCitMensalNoGrafico(citMensalNoGrafico)
      setCitMensalEixoX(citMensalMapeada)

  }, [mesSelecionado])

  useEffect(() => {
    filtrarArrayMensal()
  }, [mesSelecionado])
  
  const filtraArraySemanal = useCallback(() => {
    const mesesAgrupados = {}; // Objeto para armazenar os valores agrupados por mês

    for (let i = 0; i < semanasUnicas.length; i++) {
      const week = semanasUnicas[i];
      const groupKey = moment().isoWeek(week).startOf('isoWeek').format('MMMM YYYY'); // Formato de mês e ano
        
      if (!mesesAgrupados[groupKey]) {
        mesesAgrupados[groupKey] = [];
      }
  
      mesesAgrupados[groupKey].push(week);
    }
    const verificaMesmoMes =(week1, week2) => {
      const startOfWeek1 = moment().isoWeek(week1).startOf('isoWeek');
      const startOfWeek2 = moment().isoWeek(week2).startOf('isoWeek');
      return startOfWeek1.month() === startOfWeek2.month();
    }
    for (let i = 0; i < semanasUnicas.length - 1; i++) {
      const week1 = semanasUnicas[i];
      const week2 = semanasUnicas[i + 1];
      
      if (verificaMesmoMes(week1, week2)) {
      } else {
      }
    }

    for (let i = 0; i < semanasUnicas.length; i++) {
      const week = semanasUnicas[i];
      const groupKey = moment().isoWeek(week).startOf('isoWeek').month();
      
      if (!gruposSemanais[groupKey]) {
        gruposSemanais[groupKey] = [];
      }

      gruposSemanais[groupKey].push(week);
    }
    const arrays = [];

    for (const key in gruposSemanais) {
      if (Array.isArray(gruposSemanais[key])) {
        arrays.push(gruposSemanais[key]);
      }
    }

    const gruposPorMes = {};
    citObjetos.forEach(objeto => {
      const dataSplit = objeto.data.split(' '); // Divide a data em ["Mês", "Ano"]
      const mes = dataSplit[0];
      const ano = dataSplit[1]; // Ano é a segunda parte da divisão
      const mesAno = `${mes} ${ano}`; // Mesmo mês e ano juntos
      if (!gruposPorMes[mesAno]) {
        gruposPorMes[mesAno] = 0;
      }
      gruposPorMes[mesAno] += objeto.cit;
    });
    const resultadoArray = Object.entries(gruposPorMes).map(([mesAno]) => `${mesAno}`);
    let valor = -1; // Inicializar como -1 para indicar que não encontrou correspondência
    
    for (let i = 0; i < resultadoArray.length; i++) {
      if (resultadoArray[i].startsWith(mesSelecionado)) {
        valor = i;
        break; // Se encontrou a correspondência, pode sair do loop
      }
    }
    
console.log('citObjetos', citObjetos)
    
    // Função para calcular valores agregados de um mês
    const calcularValoresAgregados = (mesesAgrupados, semanasUnicas, citSemanal, qntMeses, mesInicial) => {
      const resultados = [];
    
      for (let i = mesInicial; i < mesInicial + qntMeses; i++) {
        const mesChave = Object.keys(mesesAgrupados)[i];
        const semanasDoMes = mesesAgrupados[mesChave];
    
        if (semanasDoMes) {
          for (let j = 0; j < semanasDoMes.length; j++) {
            const semana = semanasDoMes[j];
            const indiceCitSemanal = semanasUnicas.indexOf(semana); // Encontra o índice correto
            resultados.push(citSemanal[indiceCitSemanal]);
          }
        }
      }
    
      return resultados;
    };
    
    const result = calcularValoresAgregados(mesesAgrupados, semanasUnicas, citSemanal, opcaoSemanal + 1, valor);
    const citSemanalMapeada = result.map((i, element) => `Sem. ${element + 1}`);
    setCitEixoX(citSemanalMapeada);
    const arrayPseNoGrafico2 = result.map((i, element) => ({ x: element + 1, y: i }));
    setCitSemanalFiltradaMeses(arrayPseNoGrafico2);

    }, [opcaoSemanal, mesSelecionado])

  useEffect( () => { 


    filtraArraySemanal()


  },
  
  [opcaoSemanal, mesSelecionado])



  const arrayCitSemanalNoGrafico =  citSemanal.map((element, i)=> {
    return {x: +i+1, y: element}
    
})
  const arrayCitMensalNoGrafico =  citMensal.map((element, i)=> {
    return {x: +i+1, y: element}
    
})

const [selectedOption, setSelectedOption] = useState('')
let vetorContadorDiario = []
for (let i = 0; i < arrayPseSemanal.length; i++){
  vetorContadorDiario[i] = i+1
}

const diasPorOrdem = arrayPseSemanal.map((item) => {
  if(item.diaDaSemana === 'Monday'){
    return `S.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Tuesday'){
    return `T.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Wednesday'){
    return `Q.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Thursday'){
    return `Qi.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Friday'){
    return `S.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Saturday'){
    return `Sa.${item.dia}/${item.mes}`
  }
  if(item.diaDaSemana === 'Sunday'){
    return `D.${item.dia}/${item.mes}`
  }
})


const vetorContadorSemanas = []

for(let i = 0; i < citSemanal.length; i++){
  vetorContadorSemanas[i] = i+ 1
}





const handleSelectChange = (value) => {
  setMesSelecionado(value);
};

const filtraArray = useCallback(() => {
  const aggregatedData30Days = aggregateData(citObjetos, 30, mesInicial);
  const aggregatedData60Days = aggregateData(citObjetos, 60, mesInicial)
  const aggregatedData90Days = aggregateData(citObjetos, 90, mesInicial)
  const diasDoArrayMeses = arrayMeses.map(i => {
    return i.dia;
  });
  let arrayPseNoGrafico2 = []
  if(opcaoPeriodo == 0){

    const arrayMesesEmNumeros = aggregatedData30Days[0].map((i, element) => {
      return i.data;
    });

  
    arrayPseNoGrafico2 = aggregatedData30Days[0].map((i, element) => {
      return { x: element + 1, y: i.cit };
    });
  
  }
  if(opcaoPeriodo == 1){
    const arrayMesesEmNumeros = aggregatedData60Days[0].map((i, element) => {
      return i.data;
    });

  
    arrayPseNoGrafico2 = aggregatedData60Days[0].map((i, element) => {
      return { x: element + 1, y: i.cit };
    });
 }
  if(opcaoPeriodo == 2){

    const arrayMesesEmNumeros = aggregatedData90Days[0].map((i, element) => {
      return i.data;
    });
    arrayPseNoGrafico2 = aggregatedData90Days[0].map((i, element) => {
      return { x: element + 1, y: i.cit };
    });
 }
 
  const arrayDatasMeses = [];
  for (let i = mesInicial; i < arrayMeses.length; i++) {
    const numeroMes = mapearMesParaNumero(arrayMeses[i].data);
    arrayDatasMeses.push(`${diasDoArrayMeses[i]}/${numeroMes}`);
  }

  setArrayParametroX(arrayDatasMeses);
  setArrayFiltrado(arrayPseNoGrafico2);
}, [arrayMeses, mesInicial, opcaoPeriodo]);


useEffect(() => {
  const index = citObjetos.findIndex(item => item.data === mesSelecionado);
  if (index !== -1) {
    setMesInicial(index);
    filtraArray();
  }
}, [mesSelecionado, filtraArray]);

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
const dadosFiltrados = citObjetos.filter((item) => {
  return item.data === mesSelecionado;
});



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



const arrayBotaoSelect = arrayMeses.map(i => {return i.data})


const arrayBotaoSelectSemRepeticoes = [...new Set(arrayBotaoSelect)]
console.log('citObjetos', citObjetos)
return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>
                {conexao ? carregandoDados ? (
 <Spinner
 visible={carregandoDados}
 textContent={'Carregando dados...'}
 textStyle={[estilo.textoCorLight, estilo.textoP16px]}
/>
) : arrayPse.length == 0 ? (<View>
                        <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                        <View style={[estilo.centralizado, {marginTop: '5%'}]}><Entypo name="emoji-sad" size={100} color="#182128" /></View>
                        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '10%', textAlign: 'center', marginHorizontal: '5%'}, style.Montserrat]}>Você ainda não realizou nenhum treino. Treine e tente novamente mais tarde.</Text>
                    </View>) :   (
                    <View>
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução CIT {opcao == 0? "Diária" : opcao == 1 ? "Semanal" : "Mensal"}</Text>

                                  <View style={[estilo.centralizado, {width: '90%', marginTop: 10}]}>
                                  <BotaoSelect     selecionado={!arrayFiltrado[0].x == 0}  onChange={(value, index) => {handleSelectChange(value, index)}} titulo='Selecione um mês' max={1} options={arrayBotaoSelectSemRepeticoes}>
                      </BotaoSelect>
                                                          </View>
                       {arrayFiltrado[0].x == 0? <View style={[{width: '90%', marginVertical: '5%'}, estilo.centralizado]}>
                        <Text style={[estilo.tituloH619px, estilo.textoCorDanger, {textAlign: 'center'}]}>Selecione o mês do período inicial para renderizar os dados</Text>
                          <View style={[estilo.centralizado, {marginVertical: '10'}]}>
                          <Entypo name="line-graph" size={100} color="#FF6262" />

                            </View>                        
                         </View>:  
                         <VictoryChart theme={VictoryTheme.material}>
                        <VictoryAxis
    style={{
      axisLabel: { fontSize: 5 }, // Adjust the font size of the axis label
      tickLabels: {
        fontSize: 
          opcao == 0
            ? arrayPse.length < 10 ? 10 : arrayPse.length > 10 && arrayPse.length < 20 ? 8  : arrayPse.length > 20 && arrayPse.length < 30? 7 : 5
            : opcao == 1
            ? citSemanal.length < 30 ? 10 : citSemanal.length > 30 && citSemanal.length < 60 ? 8 : 6
            : opcao == 2
            ? citMensal.length < 30 ? 10 : citSemanal.length > 30 && citSemanal.length < 60 ? 8 : 6
            : 8
      }    }}
  />
  <VictoryAxis
    dependentAxis
    tickCount={5}
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
                                categories={opcao == 0? {x: arrayParametroX} : opcao == 1?  {x: citEixoX} : {x: citMensalEixoX}}

                            data={opcao == 0 ? arrayFiltrado : opcao == 1 ? citSemanalFiltradaMeses : citMensalNoGrafico} />            
                    </VictoryChart>}
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar a evolução:</Text>
                    <RadioBotao
                            options={['Diaria', 'Semanal', 'Mensal']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => { setOpcao(i);}}
                        >
                    </RadioBotao>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Período de tempo:</Text>
                    {opcao == 0?    
                      <View>
                        <RadioBotao
                            options={['30 dias', '60 dias', '90 dias']}
                            selected={opcaoPeriodo}
                            onChangeSelect={(opt, i) => { setOpcaoPeriodo(i);}}
                        >
                    </RadioBotao>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: 10}]}>Valores:</Text>
                    <View style={{flexDirection: 'row'}}>
                    <View>
                    {arrayParametroX.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Data: {item}</Text>})}    
                      </View>
                      <View>
                      {arrayFiltrado.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>- CIT: {item.y}</Text>})}

                      </View>
                    </View>

                        </View>

                    
                    : opcao === 1?                               <View>
                    <RadioBotao
                            options={['1 mês', '2 meses', '3 meses', '4 meses', '5 meses', '6 meses']}
                            selected={opcaoSemanal}
                            onChangeSelect={(opt, i) => { setOpcaoSemanal(i);}}
                        >
                    </RadioBotao>
                                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: 10}]}>Valores:</Text>
                    <View style={{flexDirection: 'row'}}>
                    <View>
                    {citEixoX.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>{item}</Text>})}    
                      </View>
                      <View>
                      {citSemanalFiltradaMeses.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>- CIT: {item.y}</Text>})}

                      </View>
                    </View>
                    </View>
                    :      
                    <View>
                    <RadioBotao
                            options={['24 barras']}
                            selected={opcaoPeriodo}
                            onChangeSelect={(opt, i) => { setOpcaoPeriodo(i); }}
                        >
                    </RadioBotao>

                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: 10}]}>Valores:</Text>
                    <View style={{flexDirection: 'row'}}>
                    <View>
                    {citMensalEixoX.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>{item}</Text>})}    
                      </View>
                      <View>
                      {citMensalNoGrafico.map((item) => {return <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>- CIT: {item.y}</Text>})}

                      </View>
                    </View>
                    </View>                    
}
                </View>
                    </View>
                    ) : <ModalSemConexao ondeNavegar={'Home'} navigation={navigation}/>}
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
export {arrayCit}