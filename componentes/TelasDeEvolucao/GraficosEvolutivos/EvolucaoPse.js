import React, {useState, useEffect, useCallback} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../LoginScreen"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
import BotaoSelect from '../../BotaoSelect'
export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)
    const [pseObj, setPseObj] = useState([])
    const [opcaoPeriodo, setOpcaoPeriodo] = useState(0)
    const [arrayMeses, setArrayMeses] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState(0)
    const [mesInicial, setMesInicial] = useState(0)
    const [arrayParametroX, setArrayParametroX] = useState([])
    const [arrayFiltrado, setArrayFiltrado] = useState([{x: 0, y: 0}])

    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type == 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const getPse = async () => {
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Alunos", `${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);

        const newArrayPse = []
        const newArrayPseObj = []
        const arrayMesesAux = []

        querySnapshot.forEach((doc)=> {
          let stringAux = doc.get('mes')

          if (stringAux == 1 || stringAux === '01') stringAux = 'Janeiro'
          if (stringAux == 2 || stringAux === '02') stringAux = 'Fevereiro'
          if (stringAux == 3 || stringAux === '03') stringAux = 'Março'
          if (stringAux == 4 || stringAux === '04') stringAux = 'Abril'
          if (stringAux == 5 || stringAux === '05') stringAux = 'Maio'
          if (stringAux == 6 || stringAux === '06') stringAux = 'Junho'
          if (stringAux == 7 || stringAux === '07') stringAux = 'Julho'
          if (stringAux == 8 || stringAux === '08') stringAux = 'Agosto'
          if (stringAux == 9 || stringAux === '09') stringAux = 'Setembro'
          if (stringAux == 10) stringAux = 'Outubro'
          if (stringAux == 11) stringAux = 'Novembro'
          if (stringAux == 12) stringAux = 'Dezembro'
            const pseObj = {
              pse: doc.get('PSE.valor'),
              data: `${stringAux} ${doc.get('ano')}`
            }
            newArrayPse.push(doc.get('PSE.valor') * doc.get('duracao'))
            newArrayPseObj.push(pseObj)
            if (doc.get('mes') === 1 || doc.get('mes') === '01') { arrayMesesAux.push({ data: `Janeiro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 2 || doc.get('mes') === '02') { arrayMesesAux.push({ data: `Fevereiro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 3 || doc.get('mes') === '03') { arrayMesesAux.push({ data: `Março ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 4 || doc.get('mes') === '04') { arrayMesesAux.push({ data: `Abril ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 5 || doc.get('mes') === '05') { arrayMesesAux.push({ data: `Maio ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 6 || doc.get('mes') === '06') { arrayMesesAux.push({ data: `Junho ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 7 || doc.get('mes') === '07') { arrayMesesAux.push({ data: `Julho ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 8 || doc.get('mes') === '08') { arrayMesesAux.push({ data: `Agosto ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 9 || doc.get('mes') === '09') { arrayMesesAux.push({ data: `Setembro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 10) { arrayMesesAux.push({ data: `Outubro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 11) { arrayMesesAux.push({ data: `Novembro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            if (doc.get('mes') === 12) { arrayMesesAux.push({ data: `Dezembro ${doc.get('ano')}`, dia: doc.get('dia') }) }
            
        });  
        setArrayPse(newArrayPse)
        setCarregandoDados(false)
        setPseObj(newArrayPseObj)
        setArrayMeses(arrayMesesAux)

    };

    useEffect(() => {
        getPse();
    }, []);

    const handleSelectChange = (value) => {
        setMesSelecionado(value);
      };


    const arrayPseNoGrafico =  arrayPse.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })

    const[opcao, setOpcao] = useState('')

    let vetorContador = []

    const valorPse = vetorContador.map((i) => {
        return `Valor ${i}`
    })
    const arrayBotaoSelect = arrayMeses.map(i => {return i.data})

    const arrayBotaoSelectSemRepeticoes = [...new Set(arrayBotaoSelect)]
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


      const filtraArray = useCallback(() => {
        const aggregatedData30Days = aggregateData(pseObj, 30, mesInicial);
        const aggregatedData60Days = aggregateData(pseObj, 60, mesInicial)
        const aggregatedData90Days = aggregateData(pseObj, 90, mesInicial)
        const diasDoArrayMeses = arrayMeses.map(i => {
          return i.dia;
        });
        let arrayPseNoGrafico2 = []
        if(opcaoPeriodo == 0){
      
          const arrayMesesEmNumeros = aggregatedData30Days[0].map((i, element) => {
            return i.data;
          });
      
        
          arrayPseNoGrafico2 = aggregatedData30Days[0].map((i, element) => {
            return { x: element + 1, y: i.pse };
          });
        
        }
        if(opcaoPeriodo == 1){
          const arrayMesesEmNumeros = aggregatedData60Days[0].map((i, element) => {
            return i.data;
          });
      
        
          arrayPseNoGrafico2 = aggregatedData60Days[0].map((i, element) => {
            return { x: element + 1, y: i.pse };
          });
       }
        if(opcaoPeriodo == 2){
      
          const arrayMesesEmNumeros = aggregatedData90Days[0].map((i, element) => {
            return i.data;
          });
          arrayPseNoGrafico2 = aggregatedData90Days[0].map((i, element) => {
            return { x: element + 1, y: i.pse };
          });
       }
       
        const arrayDatasMeses = [];
        for (let i = mesInicial; i < arrayMeses.length; i++) {
          const numeroMes = mapearMesParaNumero(arrayMeses[i].data);
          arrayDatasMeses.push(`${diasDoArrayMeses[i]}/${numeroMes}`);
        }
      
        setArrayParametroX(arrayDatasMeses);
        setArrayFiltrado(arrayPseNoGrafico2);
        console.log(arrayFiltrado)
        console.log('arrayParametroX', arrayParametroX)
      }, [arrayMeses, mesInicial, opcaoPeriodo]);
      
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
      
      useEffect(() => {
        const index = pseObj.findIndex(item => item.data === mesSelecionado);
        if (index !== -1) {
          setMesInicial(index);
          filtraArray();
        }
      }, [mesSelecionado, filtraArray]);

      console.log('arrayParametroX', arrayParametroX)
      console.log(mesInicial)
    return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>

                    {conexao? carregandoDados ? (
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
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução PSE:</Text>
                        
                                    <View style={[estilo.centralizado, {width: '90%', marginTop: 10}]}>
                                  <BotaoSelect     selecionado={!arrayParametroX.length == 0}  onChange={(value, index) => {handleSelectChange(value, index)}} titulo='Selecione um mês' max={1} options={arrayBotaoSelectSemRepeticoes}>
                      </BotaoSelect>
                                    </View>
                        {arrayParametroX.length == 0?
                        <View style={[{width: '90%', marginVertical: '5%'}, estilo.centralizado]}>
                        <Text style={[estilo.tituloH619px, estilo.textoCorDanger, {textAlign: 'center'}]}>Selecione o mês do período inicial para renderizar os dados</Text>
                          <View style={[estilo.centralizado, {marginVertical: '10'}]}>
                          <Entypo name="line-graph" size={100} color="#FF6262" />

                            </View>                        
                         </View>
                          :
                         <VictoryChart theme={VictoryTheme.material}>
                         <VictoryAxis
     style={{
       axisLabel: { fontSize: 5 }, 
       tickLabels: {
         fontSize: 
         arrayPse.length < 10 ? 10 :
         arrayPse.length < 20 ? 8 :
         arrayPse.length < 30 ? 7 :
         5
       }    }}
   />
 <VictoryAxis
   dependentAxis
   domain={[0, 10]}
   tickCount={11}
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
                                 categories={{x: arrayParametroX}}
 
                             data={ arrayFiltrado} />            
                     </VictoryChart>}
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                    <RadioBotao
                            options={['Diariamente']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => { setOpcao(i)}}
                        >
                    </RadioBotao>

                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Período de tempo:</Text>
                      <View>
                        <RadioBotao
                            options={['30 dias', '60 dias', '90 dias']}
                            selected={opcaoPeriodo}
                            onChangeSelect={(opt, i) => { setOpcaoPeriodo(i);}}
                        >
                    </RadioBotao>
                    </View>
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