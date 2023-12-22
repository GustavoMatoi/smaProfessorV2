import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore } from "firebase/firestore"; 
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../LoginScreen"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo';
import ModalSemConexao from "../../ModalSemConexao"
export default ({navigation, route}) => {
    const {aluno} = route.params
    const [arrayMassaCorporal, setArrayMassaCorporal] = useState([]);
    const [arrayEstatura, setArrayEstatura] = useState([]);
    const [arrayBracoRelaxadoMedida3, setArrayBracoRelaxadoMedida3] = useState([]);
    const [arrayBracoContraidoMedida3, setArrayBracoContraidoMedida3] = useState([]);
    const [arrayCinturaMedida3, setArrayCinturaMedida3] = useState([]);
    const [arrayAbdomenMedida3, setArrayAbdomenMedida3] = useState([]);
    const [arrayQuadrilMedida3, setArrayQuadrilMedida3] = useState([]);
    const [arrayCoxaMedida3, setArrayCoxaMedida3] = useState([]);
    const [arrayPernaMedida3, setArrayPernaMedida3] = useState([]);
    const [arrayDCPeitoralMedida3, setArrayDCPeitoralMedida3] = useState([])
    const [arrayDCAbdomenMedida3, setArrayDCAbdomenMedida3] = useState([])
    const [arrayDCCoxaMedida3, setArrayDCCoxaMedida3] = useState([])
    const [arrayDCCristaIliacaMedida3, setArrayDCCristaIliacaMedida3] = useState([])
    const [conexao, setConexao] = useState(true)
    const [carregandoDados, setCarregandoDados] = useState(true);

    const isNumeric =(value) =>{
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    const valorNoGrafico = (valor1, valor2, valor3) => {
      if (valor2 === 0 && valor3 === 0){
        return valor1 
      } else if (valor3 == 0){
        return (valor1 + valor2)/2
      } else {
        let valores = [valor1, valor2, valor3]
        return calculaMediana(valores)
      }
    }

    const calculaMediana = (valores) => {
      const sortedData = valores.slice().sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedData.length / 2);
      if (sortedData.length % 2 === 0) {
        const value1 = sortedData[middleIndex - 1];
        const value2 = sortedData[middleIndex];
        return (value1 + value2) / 2;
      } else {
        return sortedData[middleIndex];
      }
    }


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })
        return () => {
            unsubscribe()
        }

    }, [])

      
      useEffect(() => {
        const getAvaliacoes = async () => {
            try {
              const db = getFirestore();
              const avaliacoesRef = collection(
                db,
                "Academias",
                aluno.Academia,
                "Professores",
                aluno.professorResponsavel,
                "alunos",
                `Aluno ${aluno.email}`,
                "Avaliações"
              );
              const querySnapshot = await getDocs(avaliacoesRef);
              const newArrayMassaCorporal = [];
              const newArrayEstatura = [];
              const newArrayBracoRelaxadoMedida3 = [];
              const newArrayBracoContraidoMedida3 = [];
              const newArrayCinturaMedida3 = [];
              const newArrayAbdomenMedida3 = [];
              const newArrayQuadrilMedida3 = [];
              const newArrayCoxaMedida3 = [];
              const newArrayPernaMedida3 = [];
              const newArrayDCPeitoralMedida3 = [];
              const newArrayDCAbomenMedida3 = [];
              const newArrayDCCoxaMedida3 = [];
              const newArrayDCCristaIliacaMedida3 = [];
          
              querySnapshot.forEach((doc) => {
                const data = doc.data();
    
                if (isNumeric(data.massaCorporal)) {
                  newArrayMassaCorporal.push(data.massaCorporal);
                }
                
                if (isNumeric(data.estatura)) {
                  newArrayEstatura.push(data.estatura);
                }
                
                if (isNumeric(valorNoGrafico(data.bracoRelaxadoMedida1, data.bracoRelaxadoMedida2, data.bracoRelaxadoMedida3))) {
                  newArrayBracoRelaxadoMedida3.push(valorNoGrafico(data.bracoRelaxadoMedida1, data.bracoRelaxadoMedida2, data.bracoRelaxadoMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.bracoContraidoMedida1, data.bracoContraidoMedida2, data.bracoContraidoMedida3))) {
                  newArrayBracoContraidoMedida3.push(valorNoGrafico(data.bracoContraidoMedida1, data.bracoContraidoMedida2, data.bracoContraidoMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.cinturaMedida1, data.cinturaMedida2, data.cinturaMedida3))) {
                  newArrayCinturaMedida3.push(valorNoGrafico(data.cinturaMedida1, data.cinturaMedida2, data.cinturaMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.abdomenMedida1, data.abdomenMedida2, data.abdomenMedida3))) {
                  newArrayAbdomenMedida3.push(valorNoGrafico(data.abdomenMedida1, data.abdomenMedida2, data.abdomenMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.quadrilMedida1, data.quadrilMedida2, data.quadrilMedida3))) {
                  newArrayQuadrilMedida3.push(valorNoGrafico(data.quadrilMedida1, data.quadrilMedida2, data.quadrilMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.coxaMedida1, data.coxaMedida2, data.coxaMedida3))) {
                  newArrayCoxaMedida3.push(valorNoGrafico(data.coxaMedida1, data.coxaMedida2, data.coxaMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.pernaMedida1, data.pernaMedida2, data.pernaMedida3))) {
                  newArrayPernaMedida3.push(valorNoGrafico(data.pernaMedida1, data.pernaMedida2, data.pernaMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.DCPeitoralMedida1, data.DCPeitoralMedida2, data.DCPeitoralMedida3))) {
                  newArrayDCPeitoralMedida3.push(valorNoGrafico(data.DCPeitoralMedida1, data.DCPeitoralMedida2, data.DCPeitoralMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.DCabdomenMedida1, data.DCabdomenMedida2, data.DCabdomenMedida3))) {
                  newArrayDCAbomenMedida3.push(valorNoGrafico(data.DCabdomenMedida1, data.DCabdomenMedida2, data.DCabdomenMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.DCCoxaMedida1, data.DCCoxaMedida2, data.DCCoxaMedida3))) {
                  newArrayDCCoxaMedida3.push(valorNoGrafico(data.DCCoxaMedida1, data.DCCoxaMedida2, data.DCCoxaMedida3));
                }
                
                if (isNumeric(valorNoGrafico(data.DCCristaIliacaMedida1, data.DCCristaIliacaMedida2, data.DCCristaIliacaMedida3))) {
                  newArrayDCCristaIliacaMedida3.push(valorNoGrafico(data.DCCristaIliacaMedida1, data.DCCristaIliacaMedida2, data.DCCristaIliacaMedida3));
                }

              });
          
              setArrayMassaCorporal(newArrayMassaCorporal);
              setArrayEstatura(newArrayEstatura);
              setArrayBracoRelaxadoMedida3(newArrayBracoRelaxadoMedida3);
              setArrayBracoContraidoMedida3(newArrayBracoContraidoMedida3);
              setArrayCinturaMedida3(newArrayCinturaMedida3);
              setArrayAbdomenMedida3(newArrayAbdomenMedida3);
              setArrayQuadrilMedida3(newArrayQuadrilMedida3);
              setArrayCoxaMedida3(newArrayCoxaMedida3);
              setArrayPernaMedida3(newArrayPernaMedida3);
              setArrayDCPeitoralMedida3(newArrayDCPeitoralMedida3);
              setArrayDCAbdomenMedida3(newArrayDCAbomenMedida3);
              setArrayDCCoxaMedida3(newArrayDCCoxaMedida3);
              setArrayDCCristaIliacaMedida3(newArrayDCCristaIliacaMedida3);
              
              setCarregandoDados(false);
            } catch (error) {
              console.error("Error retrieving Avaliações:", error);
            }
          };
          
        getAvaliacoes();
      }, []);
      
    useEffect(() => {
    const totalAvaliacoes = arrayMassaCorporal.length;
    }, [arrayMassaCorporal]);
    
    
    
    const arrayMassaCorporalNoGrafico =  arrayMassaCorporal.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayEsturaNoGrafico =  arrayEstatura.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayBracoRelaxadoNoGraficoMedida3 =  arrayBracoRelaxadoMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayBracoContraidoNoGraficoMedida3 =  arrayBracoContraidoMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayCinturaNoGraficoMedida3 =  arrayCinturaMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayAbdomenNoGraficoMedida3 =  arrayAbdomenMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayQuadrilNoGraficoMedida3 =  arrayQuadrilMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayCoxaNoGraficoMedida3 =  arrayCoxaMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayPernaNoGraficomedida3 =  arrayPernaMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayDCPeitoralNoGraficoMedida3 =  arrayDCPeitoralMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayDCAbdomenNoGraficoMedida3 =  arrayDCAbdomenMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayDCCoxaNoGraficoMedida3 =  arrayDCCoxaMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayDCCristaIliacaNoGraficoMedida3 =  arrayDCCristaIliacaMedida3.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })

    const[opcao, setOpcao] = useState('')
    const[titulo,setTitulo] = useState('')

    let vetorContador = []

    for(let i =  0; i < arrayMassaCorporal.length; i++){
        vetorContador[i] = i+1
    }

    const avaliacaoPorOrdem = vetorContador.map((i) => {
        return `Av.${i}`
    })

    return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
        <SafeAreaView>
          {conexao ? (
            carregandoDados ? (
              <Spinner
                visible={carregandoDados}
                textContent={'Carregando dados...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
              />
            ) : arrayMassaCorporal.length === 0 ? (
              <View>
                <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                <View style={[estilo.centralizado, { marginTop: '5%' }]}>
                  <Entypo name="emoji-sad" size={100} color="#182128" />
                </View>
                <Text
                  style={[
                    estilo.textoCorSecundaria,
                    estilo.textoP16px,
                    { marginTop: '10%', textAlign: 'center', marginHorizontal: '5%' },
                    style.Montserrat,
                  ]}
                >
                  Você ainda não possui nenhuma avaliação cadastrada. Realize uma avaliação física e tente novamente mais tarde.
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, { marginTop: '3%' }]}>Evolução corporal:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, { marginTop: '3%' }]}>
                  {titulo || 'Massa corporal'}
                </Text>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginLeft: 10}]}>Resultados:</Text>
                {titulo === 'Massa corporal'? arrayMassaCorporal.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Estatura'? arrayEstatura.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Braço relaxado'? arrayBracoRelaxadoMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Braço contraído'? arrayBracoContraidoMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Cintura'? arrayCinturaMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Abdômen'? arrayAbdomenMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Quadril'? arrayQuadrilMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Coxa'? arrayCoxaMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'Perna'? arrayPernaMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'DC Peitoral'? arrayDCPeitoralMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'DC Abdômen'? arrayDCAbdomenMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'DC Coxa'? arrayDCCoxaMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}
                {titulo === 'DC Crista ilíaca'? arrayDCCristaIliacaMedida3.map((index, value) => <Text style ={[estilo.textoCorSecundaria, estilo.textoSmall12px, {marginLeft: 10}]}>Avaliação {value + 1}: {index}</Text>) : null}



                <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
    style={{
      axisLabel: { fontSize: 12 },
      tickLabels: { fontSize: 10 }, 
    }}
  />
                <VictoryAxis dependentAxis
                    domain={opcao == 0? [0, 150] : 
                      opcao == 1 ? [0, 2.5] : 
                      opcao == 2 ? [0, 60] : 
                      opcao == 3 ? [0, 60] : 
                      opcao == 4 ? [0, 150] :
                      opcao == 5 ? [0, 100] : []
                    }
                    
                    tickCount={5}

                    />
                  <VictoryLine
                    containerComponent={<VictoryVoronoiContainer />}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    style={{
                      data: { stroke: "#0066FF" },
                      parent: { border: "1px solid #182128" },
                    }}
                    categories={{ x: avaliacaoPorOrdem }}
                    data={
                      titulo == 'Massa corporal' ? arrayMassaCorporalNoGrafico :
                      titulo == 'Estatura' ? arrayEsturaNoGrafico :
                      titulo == 'Braço relaxado' ? arrayBracoRelaxadoNoGraficoMedida3 :
                      titulo == 'Braço contraído' ? arrayBracoContraidoNoGraficoMedida3 :
                      titulo == 'Cintura' ? arrayCinturaNoGraficoMedida3 :
                      titulo == 'Abdômen' ? arrayAbdomenNoGraficoMedida3 :
                      titulo == 'Quadril' ? arrayQuadrilNoGraficoMedida3 :
                      titulo == 'Coxa' ? arrayCoxaNoGraficoMedida3 :
                      titulo == 'Perna' ? arrayPernaNoGraficomedida3 :
                      titulo == 'DC Peitoral' ? arrayDCPeitoralNoGraficoMedida3 :
                      titulo == 'DC Abdômen' ? arrayDCAbdomenNoGraficoMedida3 :
                      titulo == 'DC Coxa' ? arrayDCCoxaNoGraficoMedida3 :
                      titulo == 'DC Crista ilíaca' ? arrayDCCristaIliacaNoGraficoMedida3 :
                      arrayMassaCorporalNoGrafico
                    }
                  />

                </VictoryChart>
                <View style={{ marginLeft: '5%', marginBottom: '10%' }}>
                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                  <RadioBotao
                    options={[
                      'Massa corporal', 'Estatura', 'Braço relaxado', 'Braço contraído',
                      'Cintura', 'Abdômen', 'Quadril', 'Coxa', 'Perna', 'DC Peitoral',
                      'DC Abdômen', 'DC Coxa', 'DC Crista ilíaca'
                    ]}
                    selected={opcao}
                    onChangeSelect={(opt, i) => { setOpcao(i); setTitulo(opt) }}
                  />
                </View>
              </View>
            )
          ) : (
            <ModalSemConexao ondeNavegar={'Home'} navigation={navigation} />
          )}
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