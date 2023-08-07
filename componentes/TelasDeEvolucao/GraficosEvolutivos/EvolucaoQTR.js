import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import { professorLogado } from "../../Home"
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo'
import ModalSemConexao from "../../ModalSemConexao"
export default ({route, navigation}) => {
    const {aluno} = route.params
    const [arrayPse, setArrayPse] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)
    
    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const getPse = async () => {    
        const db = getFirestore();
        const diariosRef = collection(db, "Academias", professorLogado.getAcademia(), "Professores", aluno.professorResponsavel, "alunos",`Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diariosRef);

        const newArrayPse = []
        querySnapshot.forEach((doc)=> {
            newArrayPse.push(doc.get('QTR.valor'))
            console.log(newArrayPse)
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

    const[opcao, setOpcao] = useState('')

    let vetorContador = []

    const valorPse = vetorContador.map((i) => {
        return `Valor ${i}`
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

                                categories={{x: valorPse}}
                            data={arrayPseNoGrafico } />            
                    </VictoryChart>
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                    <RadioBotao
                            options={['Diariamente']}
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