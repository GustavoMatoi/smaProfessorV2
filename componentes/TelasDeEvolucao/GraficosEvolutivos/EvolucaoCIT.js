import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { professorLogado } from "../../Home"
import moment from 'moment';
import Spinner from "react-native-loading-spinner-overlay"
import { Entypo } from '@expo/vector-icons'; 
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
let arrayCit = []
export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)

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
        querySnapshot.forEach((doc)=> {
            newArrayPse.push(doc.get('PSE.valor') * doc.get('duracao'))
            console.log(`CIT : ${doc.get('PSE.valor')}, ${doc.get('duracao')}`)
        });  
        setArrayPse(newArrayPse)
        setCarregandoDados(false)
    };

    useEffect(() => {
        getPse();
    }, []);

    const arrayPseNoGrafico =  arrayPse.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })

    const[opcao, setOpcao] = useState(0)

    let vetorContador = []

    const valorPse = vetorContador.map((i) => {
        return `Valor ${i}`
    })


    //Semanal 
    const [arrayPseSemanal, setArrayPseSemanal] = useState([]);
    const [citSemanal, setCitSemanal] = useState([])
    const [citMensal, setCitMensal] = useState([])

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
        querySnapshot.forEach((doc) => {
          const CIT = doc.get('PSE.valor') * doc.get('duracao');
          newArrayPse.push({
            cit: CIT,
            dia: doc.get('dia'),
            mes: doc.get('mes'),
            ano: doc.get('ano'),
          });
        });
        setArrayPseSemanal(newArrayPse);
        setCarregandoDados(false);

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
    console.log(arrayCitSemanalNoGrafico)
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