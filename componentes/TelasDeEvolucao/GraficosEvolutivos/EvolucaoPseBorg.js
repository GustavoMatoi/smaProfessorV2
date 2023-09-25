import React, {useState, useEffect, useCallback} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../Home"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
import BotaoSelect from '../../BotaoSelect'
export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [pseObj, setPseObj] = useState([])
    const [opcaoPeriodo, setOpcaoPeriodo] = useState(0)
    const [arrayMeses, setArrayMeses] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState(0)
    const [mesInicial, setMesInicial] = useState(-1)
    const [arrayParametroX, setArrayParametroX] = useState([])
    const [arrayFiltrado, setArrayFiltrado] = useState([{x: 0, y: 0}])
    const [arraySomador, setArraySomador] = useState([])

    const [conexao, setConexao] = useState(true)
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
      const newArrayPseObj = [];
      const arrayMesesAux = [];
      const newArraySegundoParametro = [];
      const newPseArray = [];
      const newArraySomador = [];
      const newArrayPseExercicio = [];
      const maxN = 10;
    
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
    
      const promises = querySnapshot.docs.map(async (doc) => {
        if (doc.get("tipoDeTreino") === "Diario") {
          const exerciciosRef = collection(doc.ref, "Exercicio");
          const exerciciosSnapshot = await getDocs(exerciciosRef);
    
          exerciciosSnapshot.forEach((exercicioDoc) => {
            const exercicio = exercicioDoc.data();

            if (route.params.nome === exercicioDoc.get("Nome")) {
              let somador2 = 0;
    
                let somador = 0;
                const atributosDoExercicio = exercicio.pesoLevantado ?? [];
                for (let i = 0; i < atributosDoExercicio.length; i++) {
                  newPseArray.push(atributosDoExercicio[i]);
                  somador += atributosDoExercicio[i];
                }
    
                const stringAux = monthNames[doc.get("mes") - 1];
                newArraySegundoParametro.push(somador);
    
                for (let i = 1; i < maxN; i++) {
                  const propertyName = `PSEdoExercicioSerie${i}`;
                  if (propertyName in exercicioDoc.data()) {
                    newArrayPseExercicio.push({
                      pse: exercicioDoc.get(`${propertyName}.valor`),
                      data: `${stringAux} ${doc.get("ano")}`,
                    });
                    somador2 += exercicioDoc.get(`${propertyName}.valor`);
                  }
                }
                newArraySomador.push(somador2);
              
              arrayMesesAux.push({
                data: `${monthNames[doc.get("mes") - 1]} ${doc.get("ano")}`,
                dia: doc.get("dia"),
              });
            }
          });
        }
    
        const stringAux = monthNames[doc.get("mes") - 1];
        const pseObj = {
          pse: doc.get("PSE.valor"),
          data: `${stringAux} ${doc.get("ano")}`,
        };
        newArrayPse.push(doc.get("PSE.valor") * doc.get("duracao"));
        newArrayPseObj.push(pseObj);
      });
    
      await Promise.all(promises);
    
      setArrayPse(newArrayPse);
      setArrayMeses(arrayMesesAux);
      setPseObj(newArrayPseExercicio);
      setArraySomador(newArraySomador);
      setCarregandoDados(false);
    };
    
    useEffect(() => {
      getPse();
    }, []);
    

    const handleSelectChange = (value) => {
        setMesSelecionado(value);
      };



    const[opcao, setOpcao] = useState('')


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
        console.log('coc^p')
        console.log('pseObj', pseObj, 'mesInicial', mesInicial)
        if(mesInicial === -1){
          return (
            <Spinner
            visible={carregandoDados}
            textContent={'Carregando dados...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          />
          )
        } else {
          const aggregatedData30Days = aggregateData(pseObj, 30, mesInicial);
          const aggregatedData60Days = aggregateData(pseObj, 60, mesInicial)
          const aggregatedData90Days = aggregateData(pseObj, 90, mesInicial)
          const diasDoArrayMeses = arrayMeses.map(i => {
            return i.dia;
          });
          console.log('aggregatedData30Days[0]', aggregatedData30Days[0])
          let arrayPseNoGrafico2 = []
          
          if(opcaoPeriodo == 0){
            console.log('aggregatedData30Days[0]', aggregatedData30Days[0])
            const arrayMesesEmNumeros = aggregatedData30Days[0].map((i, element) => {
  return i.data;
           } ); 
  
  
  
          
          
            if(aggregatedData30Days[0] !== undefined){ 
              arrayPseNoGrafico2 = aggregatedData30Days[0].map((i, element) => {
                return { x: element + 1, y: i.pse };
              });
            }
          
            console.log(arrayPseNoGrafico2)
            
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
          for (let i = mesInicial; i <pseObj.length; i++) {
            arrayDatasMeses.push(`${i+1}`);
           
          }
          console.log('arrayDatasMeses', arrayDatasMeses)
          setArrayParametroX(arrayDatasMeses);
          console.log(aggregatedData30Days)
          console.log("X")
          setArrayFiltrado(arrayPseNoGrafico2); 
          console.log(arrayFiltrado)
          console.log('arrayParametroX', arrayParametroX)
        }
      }, [mesInicial]);
      

      useEffect(() => {
        const index = pseObj.findIndex(item => item.data === mesSelecionado);
        if (index !== -1) {
          setMesInicial(index);
          filtraArray();
        }
      }, [mesSelecionado, filtraArray]);


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
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução PSE {route.params.tipo === 'força' ? 'Omni' : 'Borg'}:</Text>
                        
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