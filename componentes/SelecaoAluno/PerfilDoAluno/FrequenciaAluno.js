import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import estilo from '../../estilo'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { professorLogado } from '../../Home';

export default ({navigation, route}) => {
    const {aluno} = route.params
    const [arrayDatas, setArrayDatas] = useState([]);


    const [carregandoDados, setCarregandoDados] = useState(true);


    const getAvaliacoes = async () => {
        const db = getFirestore();
        const diarioRedf= collection(db, "Academias", `${professorLogado.getAcademia()}`,"Professores", aluno.professorResponsavel, "alunos", `Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diarioRedf);

        const arrayTemporarioDatas = []

        querySnapshot.forEach((doc)=> {
            const dataDiario = {
                data: `${doc.get('dia')}/${doc.get('mes')}/${doc.get('ano')}`,
                tipoDeTreino: doc.get('tipoDeTreino'),
                duracao: doc.get('duracao')
            }
            console.log(dataDiario)
            arrayTemporarioDatas.push(dataDiario)
        });  
        setArrayDatas(arrayTemporarioDatas)

        setCarregandoDados(false);


    };

    useEffect(() => {
        getAvaliacoes();
    }, []);
    return(
        <ScrollView Style={[estilo.corLightMenos1]}>
            <View style={[estilo.centralizado, {marginVertical: 10}]}>
                <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>O ALUNO TREINOU NOS DIAS:</Text>
            </View>
            
            {arrayDatas.map((diario) => (
                <View style={[style.areaInformacoes]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Dia: {diario.data}. Duração: {diario.duracao} minutos</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    areaInformacoes: {
        width: '100%', 
        marginVertical: 5,
        marginLeft: 10
    }
})