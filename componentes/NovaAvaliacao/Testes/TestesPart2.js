import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../../estilo'
import ResistenciaAbdominal18anos from './Tabelas/ResistenciaAbdominal18anos'
import ResistenciaAbdominal from './Tabelas/ResistenciaAbdominal'
import {useFonts} from 'expo-font'
import { novaAvalicao } from '../DadosCorporais'
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
export default ({route, navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/Montserrat-Regular.ttf'),
    })
    const {aluno} = route.params

    const [resistenciaAbdominal, setResistenciaAbdominal] = useState(0)
    const [resistenciaAbdominalInvalido, setResistenciaAbdominalInvalido] = useState(false)
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const validaCampos = () => {
        if(resistenciaAbdominal == 0){
            Alert.alert("O campo do resultado não foi preenchido!", "Preencha o campo de resultado e tente novamente.")
            setResistenciaAbdominalInvalido(true)
        } else {
            novaAvalicao.setTesteResistenciaAbdominal(resistenciaAbdominal)
            handleNavigation()
        }
    }

    const handleNavigation = () => {
        navigation.navigate('Testes parte 3', {aluno: aluno})
    }

    return (
        <ScrollView style={estilo.corLightMenos1}>
               {!conexao ?
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Modo Offline",
                        "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                    );
                }} style={[estilo.centralizado, { marginVertical: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                    <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                </TouchableOpacity>
                : null}
            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat]}>Preencha os campos abaixo:</Text>
                <Text style={[estilo.centralizado, estilo.textoCorSecundaria, estilo.textoP16px, {textAlign: 'center', marginVertical: '3%'}, style.Montserrat]}>
                Jovens de até 17 anos realizam o teste com duração de 1 minuto.                    
                </Text>

            </SafeAreaView>
            <View style={{marginVertical: '5%'}}>
                <ResistenciaAbdominal sexoDoAluno={aluno.sexo}></ResistenciaAbdominal>

            </View>
            <View style={[{marginTop: '5%', width: '100%'}]}>
            <ResistenciaAbdominal18anos sexoDoAluno={aluno.sexo}></ResistenciaAbdominal18anos>

                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {textAlign: 'center', }]}>Resultado resistência abdominal:</Text>
                <TextInput 
                placeholder='Informe o resultado' 
                onChangeText={(text)=>setResistenciaAbdominal(parseFloat(text))}
                keyboardType='numeric'
                style={[estilo.sombra, style.textInput, estilo.centralizado, resistenciaAbdominalInvalido? {borderWidth:1, borderColor: 'red'} : {}]}
                />
            </View>
            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={validaCampos}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>PROSSEGUIR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', backgroundColor: '#FFFF', height: 50 ,borderRadius: 5, paddingLeft: 15, marginTop: '3%'},
    Montserrat: {fontFamily: 'Montserrat'}
})