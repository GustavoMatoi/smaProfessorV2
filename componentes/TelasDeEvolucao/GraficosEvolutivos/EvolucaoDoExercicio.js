import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../LoginScreen"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
export default props => {

    const [arrayPrimeiroParametro, setArrayPrimeiroParametro] = useState([]);
    const [arrayDatas, setArrayDatas] = useState([])
    const [arraySegundoParametro, setArraySegundoParametro] = useState([]);
    const [arrayVolumeTotal, setArrayVolumeTotal] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const[opcao, setOpcao] = useState('')
    const[opcao2, setOpcao2] = useState('')
    const [conexao, setConexao] = useState(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type == 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const aluno = props.route.params.aluno
    const getPse = async () => {
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Alunos", `${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);
      

        const newArrayDatas = [];
        const newPseArray = [];
        const newArraySegundoParametro = [];

        const promises = querySnapshot.docs.map(async (doc) => {
          if (doc.get('tipoDeTreino') === 'Diario') {
            const exerciciosRef = collection(doc.ref, 'Exercicio');
            const exerciciosSnapshot = await getDocs(exerciciosRef);
            exerciciosSnapshot.forEach((exercicioDoc) => {
              const exercicio = exercicioDoc.data();

                if (props.route.params.nome === exercicioDoc.get('Nome')) {

                    if(props.route.params.tipo == 'força'){                    
                        let somador = 0;
                        const atributosDoExercicio = exercicio.pesoLevantado ?? [];
                            for(let i =0; i < atributosDoExercicio.length; i++){
                            newPseArray.push(atributosDoExercicio[i])
                            somador += atributosDoExercicio[i]
                            }
                newArraySegundoParametro.push(somador)

            
            }else {
                if(props.route.params.tipo == 'aerobico'){    
                    const atributosDoExercicio = exercicio.intensidade ?? [];
                        for(let i =0; i < atributosDoExercicio.length; i++){
                        newPseArray.push(atributosDoExercicio[i])
                        }
                    const atributosDoExercicio2 = exercicio.duracao ?? [];
                        for(let i =0; i < atributosDoExercicio2.length; i++){
                        newArraySegundoParametro.push(atributosDoExercicio2[i])
                }
              } else {
                const atributosDoExercicio = exercicio.duracao ?? [];
                for(let i =0; i < atributosDoExercicio.length; i++){
                newPseArray.push(atributosDoExercicio[i])
                }
                for(let i =0; i < atributosDoExercicio.length; i++){
                newArraySegundoParametro.push(exercicioDoc.get(`PerflexDoExercicio${i+1}.valor`))
            }
          
            }}}});}});
      
        await Promise.all(promises); // esperar todas as promessas do forEach terminarem
        setArrayPrimeiroParametro(newPseArray);
        console.log(newPseArray);
        console.log(newPseArray.length);
        setCarregandoDados(false);
        setArrayDatas(newArrayDatas)
        setArraySegundoParametro(newArraySegundoParametro)
    };
      
      useEffect(() => {
        getPse();
      }, []);

    const arrayPrimeiroParametroNoGrafico =  arrayPrimeiroParametro.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arraySegundoParametroNoGrafico =  arraySegundoParametro.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })

    console.log("Array segundo parametro "  + arraySegundoParametro)
    console.log("Array primeiro parametro "  + arrayPrimeiroParametro)



    let vetorContador = []
    let volumeTotal = 0;
    for(let i =  0; i < arrayPrimeiroParametro.length; i++){
        vetorContador[i] = i+1
        volumeTotal += arrayPrimeiroParametro[i]
    }

    console.log(arrayDatas)


    const avaliacaoPorOrdem = vetorContador.map((i) => {
        return `Avaliação ${i}`
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
            ) : arrayPrimeiroParametro.length === 0 ? (
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
                    style.Montserrat
                  ]}
                >
                  Você ainda não cadastrou nenhum detalhamento referente a esse exercício no diário. Cadastre e tente novamente mais tarde.
                </Text>
              </View>
            ) : (
              <View>
                {props.route.params.tipo === 'força' ? (
                  <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, { marginTop: '3%' }]}>
                    {opcao2 === 0 ? "Evolução do peso levantado" : "Evolução do Volume Total de Treino"} do exercício {props.route.params.nome}
                  </Text>
                ) : props.route.params.tipo === 'aerobico' ? (
                  <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, { marginTop: '3%' }]}>
                    {opcao2 === 0 ? "Evolução da velocidade" : "Evolução da duração"} do exercício {props.route.params.nome}
                  </Text>
                ) : (
                  <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, { marginTop: '3%' }]}>
                    {opcao2 === 0 ? "Evolução da duração" : "Evolução da intensidade"} do exercício {props.route.params.nome}
                  </Text>
                )}
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryLine
                    containerComponent={<VictoryVoronoiContainer />}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 }
                    }}
                    style={{
                      data: { stroke: "#0066FF" },
                      parent: { border: "1px solid #182128" },
                    }}
                    data={opcao2 === 0 ? arrayPrimeiroParametroNoGrafico : arraySegundoParametroNoGrafico}
                  />
                </VictoryChart>
                <View style={{ marginLeft: '5%', marginBottom: '10%' }}>
                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                  <RadioBotao
                    options={props.route.params.tipo === 'força'
                      ? ['Evolução peso levantado', 'Evolução volume total de treino']
                      : props.route.params.tipo === 'aerobico'
                        ? ['Evolução velocidade', 'Evolução duração']
                        : ['Evolução duração', 'Evolução intensidade']
                    }
                    selected={opcao2}
                    onChangeSelect={(opt, i) => { setOpcao2(i); console.log(opcao2) }}
                  />
                </View>
              </View>
            )
          ) : (
            <ModalSemConexao ondeNavegar={'Home'} navigation={props.navigation} />
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