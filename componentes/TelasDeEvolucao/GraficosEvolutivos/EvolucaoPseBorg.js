import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../Home"
import Spinner from "react-native-loading-spinner-overlay"
import ModalSemConexao from "../../ModalSemConexao"
import NetInfo from '@react-native-community/netinfo'
export default props => {

    const [arrayPrimeiroParametro, setArrayPrimeiroParametro] = useState([]);
    const [arrayDatas, setArrayDatas] = useState([])
    const [arraySegundoParametro, setArraySegundoParametro] = useState([]);
    const [arrayVolumeTotal, setArrayVolumeTotal] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const[opcao, setOpcao] = useState('')
    const[opcao2, setOpcao2] = useState('')
    const[conexao, setConexao] = useState(false)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            //setConexao(state.type === 'cellular' || state.type === 'wifi')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const aluno = props.route.params.aluno
    const getPse = async () => {
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel,"alunos" , `Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);
      

        const newArrayDatas = [];
        const newPseArray = [];
        const newArraySegundoParametro = [];
        const newArrayPseExercicio = []
        const newArraySomador = []
        const maxN = 10
        const promises = querySnapshot.docs.map(async (doc) => {
          if (doc.get('tipoDeTreino') === 'Diario') {
            const exerciciosRef = collection(doc.ref, 'Exercicio');
            const exerciciosSnapshot = await getDocs(exerciciosRef);
            exerciciosSnapshot.forEach((exercicioDoc) => {
              const exercicio = exercicioDoc.data();
                console.log(exercicio)
                if (props.route.params.nome === exercicioDoc.get('Nome')) {
                    let somador2 = 0

                    if(props.route.params.tipo == 'força'){                    
                        let somador = 0;
                        const atributosDoExercicio = exercicio.pesoLevantado ?? [];
                            for(let i =0; i < atributosDoExercicio.length; i++){
                            newPseArray.push(atributosDoExercicio[i])
                            somador += atributosDoExercicio[i]

                        }

                newArraySegundoParametro.push(somador)
                for (let i = 1; i <= maxN; i++) {
                    const propertyName = `PSEdoExercicioSerie${i}`;
                    if (propertyName in exercicioDoc.data()) {

                        newArrayPseExercicio.push(exercicioDoc.get(`${propertyName}.valor`))
                        somador2 +=exercicioDoc.get(`${propertyName}.valor`)

                    }   

                  }
                  newArraySomador.push(somador2)
                  console.log(newArrayPseExercicio)
                  console.log(newArraySomador)
                  setArrayPrimeiroParametro(newArrayPseExercicio)
                  setArraySegundoParametro(newArraySomador)
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
                for (let i = 1; i <= maxN; i++) {
                    const propertyName = `PSEdoExercicioSerie${i}`;
                    if (propertyName in exercicioDoc.data()) {

                        newArrayPseExercicio.push(exercicioDoc.get(`${propertyName}.valor`))
                        somador2 +=exercicioDoc.get(`${propertyName}.valor`)

                    }   

                  }
                  newArraySomador.push(somador2)
                  console.log(newArrayPseExercicio)
                  console.log(newArraySomador)
                  setArrayPrimeiroParametro(newArrayPseExercicio)
                  setArraySegundoParametro(newArraySomador)
                
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

        setCarregandoDados(false);
        setArrayDatas(newArrayDatas)
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




    let vetorContador = []
    let volumeTotal = 0;
    for(let i =  0; i < arrayPrimeiroParametro.length; i++){
        vetorContador[i] = i+1
        volumeTotal += arrayPrimeiroParametro[i]
    }



    const avaliacaoPorOrdem = vetorContador.map((i) => {
        return `Avaliação ${i}`
    })

    return (
        <ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>
                   {conexao ?  carregandoDados ? (
 <Spinner
 visible={carregandoDados}
 textContent={'Carregando dados...'}
 textStyle={[estilo.textoCorLight, estilo.textoP16px]}
/>                    ) : arrayPrimeiroParametro.length == 0 ? (<View>
                        <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                        <View style={[estilo.centralizado, {marginTop: '5%'}]}><Entypo name="emoji-sad" size={100} color="#182128" /></View>
                        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '10%', textAlign: 'center', marginHorizontal: '5%'}, style.Montserrat]}>
                            Você ainda não cadastrou nenhum detalhamento referente a esse exercício no diário. Cadastre e tente novamente mais tarde.</Text>
                    </View>) :   (
                    <View>
                        { props.route.params.tipo == 'força'  ? 
                        <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>
                        {opcao2 == 0 ? "Evolução do peso levantado" : "Evolução do Volume Total de Treino"} 
                        do exercício {props.route.params.nome}</Text>
                        :
                        props.route.params.tipo == 'aerobico' ? 
                        <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>
                            {opcao2 == 0 ? "Evolução da velocidade" : "Evolução da duração"} do exercício {props.route.params.nome}</Text>
                        :
                        <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>
                            {opcao2 == 0 ? "Evolução da duração" : "Evolução da intensidade"} do exercício {props.route.params.nome}</Text>

                        }
                    <VictoryChart theme={VictoryTheme.material}>
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
                        data={ opcao2 == 0? arrayPrimeiroParametroNoGrafico : arraySegundoParametroNoGrafico } 
                            />            
                    </VictoryChart>
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar a evolução:</Text>
                    <RadioBotao
                            options={ props.route.params.tipo == 'força' ?['PSE Omni por série', 'PSE Omni por dia']
                            :         props.route.params.tipo == 'aerobico' ? ['PSE Borg por série', 'PSE Borg por dia'] : 
                                    ['Evolução duração', 'Evolução intensidade'] }
                            selected={opcao2}
                            onChangeSelect={(opt, i) => { setOpcao2(i);}}
                        />
                </View>
                    </View>
                    ) : <ModalSemConexao ondeNavegar={'Home'} navigation={props.navigation}/>}
                

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