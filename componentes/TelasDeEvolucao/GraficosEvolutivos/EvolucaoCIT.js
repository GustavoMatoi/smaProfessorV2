import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
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
            console.log(`CIT : ${doc.get('PSE.valor')}, ${doc.get('duracao')}`)
        });  
        setArrayPse(newArrayPse)
        setCarregandoDados(false)
        setCitObjetos(newArrayCitObj)
        console.log(citObjetos)
    };

    useEffect(() => {
        getPse();
    }, []);

    const arrayPseNoGrafico =  arrayPse.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })


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

          if(doc.get('mes') === 1){ arrayMesesAux.push(`Janeiro ${doc.get('ano')}`)}
          if(doc.get('mes') === 2){ arrayMesesAux.push(`Fevereiro ${doc.get('ano')}`)}
          if(doc.get('mes') === 3){ arrayMesesAux.push(`Março ${doc.get('ano')}`)}
          if(doc.get('mes') === 4){ arrayMesesAux.push(`Abril ${doc.get('ano')}`)}
          if(doc.get('mes') === 5){ arrayMesesAux.push(`Maio ${doc.get('ano')}`)}
          if(doc.get('mes') === 6){ arrayMesesAux.push(`Junho ${doc.get('ano')}`)}
          if(doc.get('mes') === 7){ arrayMesesAux.push(`Julho ${doc.get('ano')}`)}
          if(doc.get('mes') === 8){ arrayMesesAux.push(`Agosto ${doc.get('ano')}`)}
          if(doc.get('mes') === 9){ arrayMesesAux.push(`Setembro ${doc.get('ano')}`)}
          if(doc.get('mes') === 10){ arrayMesesAux.push(`Outubro ${doc.get('ano')}`)}
          if(doc.get('mes') === 11){ arrayMesesAux.push(`Novembro ${doc.get('ano')}`)}
          if(doc.get('mes') === 12){ arrayMesesAux.push(`Dezembro ${doc.get('ano')}`)}
          
        });
        setArrayPseSemanal(newArrayPse);
        setCarregandoDados(false);
        setArrayMeses([...new Set(arrayMesesAux)])


      };
    
      useEffect(() => {
        getPseSemanal();
      }, []);
    
   
  useEffect(() => {
    const calcularCITSemanal = () => {
      const semanasObj = {};
      const mesesObj = {};

      arrayPseSemanal.forEach((item) => {
        const data = moment(`${item.ano}-${item.mes}-${item.dia}`, 'YYYY-MM-DD');
        const semanaAno = `${data.week()}-${data.year()}`;
        const mesAno = `${data.month()}-${data.year()}`;

        if (semanasObj[semanaAno]) {
          semanasObj[semanaAno].push(item.cit);
        } else {
          semanasObj[semanaAno] = [item.cit];
        }

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
      Object.keys(mesesObj).forEach((mesAno) => {
        const citMensal = mesesObj[mesAno].reduce((acc, cit) => acc + cit, 0);
        arrayMensalTemporario.push(citMensal);
      });
      console.log('arrayPse', arrayPse)
      setCitSemanal(arraySemanalTemporario);
      setCitMensal(arrayMensalTemporario);
      console.log("Mensal: " + arrayMensalTemporario)
      console.log("Semanais: " + arraySemanalTemporario)

    };

    if (arrayPseSemanal.length > 0) {
      calcularCITSemanal();
    }
    arrayCit = [...arrayPseSemanal]
  }, [arrayPseSemanal]);

  
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

const citSemanalMapeado = vetorContadorSemanas.map(i => `Sem. ${i}`)

console.log(arrayMeses)

for(i in citObjetos){
  if(citObjetos[i].data == arrayMeses[i]){
    console.log("É igual", citObjetos[i], arrayMeses[i])
  }
}

const handleSelectChange = (value) => {
  setMesSelecionado(value)
  for (let i = 0; i < citObjetos.length; i++) {
    console.log(citObjetos[i].data)
    if(citObjetos[i].data == value) console.log(i) //Posição inicial do array de meses
  }
}

const dadosFiltrados = citObjetos.filter((item) => {
  return item.data === mesSelecionado;
});

const aggregateData = (filteredData, interval) => {
  const aggregatedData = [];
  let currentGroup = [];

  for (let i = 0; i < filteredData.length; i++) {
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
// Uso das funções para os intervalos desejados
const aggregatedData30Days = aggregateData(dadosFiltrados, 30);
const aggregatedData60Days = aggregateData(dadosFiltrados, 60);
const aggregatedData90Days = aggregateData(dadosFiltrados, 90);

console.log('aggregatedData30Days', aggregatedData30Days)

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
                                  <BotaoSelect     selecionado={true}  onChange={(value, index) => handleSelectChange(value, index)} titulo='Selecione um mês' max={1} options={arrayMeses}>
                      </BotaoSelect>
                                  </View>
                        <VictoryChart theme={VictoryTheme.material}>
                        <VictoryAxis
    style={{
      axisLabel: { fontSize: 5 }, // Adjust the font size of the axis label
      tickLabels: {
        fontSize: 
          opcao == 0
            ? arrayPse.length < 30 ? 10 : arrayPse.length > 30 && arrayPse.length < 60 ? 8 : 6
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
      axisLabel: { fontSize: 12 }, // Adjust the font size of the axis label
      tickLabels: { fontSize: 10 }, // Adjust the font size of the tick labels
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
                                categories={opcao === 0? { x: diasPorOrdem } : opcao === 1? {x: citSemanalMapeado} : {x : arrayMeses}}

                            data={opcao == 0 ? arrayPseNoGrafico : opcao == 1 ?  arrayCitSemanalNoGrafico: arrayCitMensalNoGrafico} />            
                    </VictoryChart>
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar a evolução:</Text>
                    <RadioBotao
                            options={['Diaria', 'Semanal', 'Mensal']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => { console.log(opcao); setOpcao(i);}}
                        >
                    </RadioBotao>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Período de tempo:</Text>
                    <RadioBotao
                            options={['30 dias', '60 dias', '90 dias']}
                            selected={opcaoPeriodo}
                            onChangeSelect={(opt, i) => { console.log(opcaoPeriodo); setOpcaoPeriodo(i);}}
                        >
                    </RadioBotao>
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