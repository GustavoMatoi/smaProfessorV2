import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../../estilo'
import IMC from './Tabelas/IMC'
import FrequenciaCardiacaDeRepouso from './Tabelas/FrequenciaCardiacaDeRepouso'
import PressaoArterial from './Tabelas/PressaoArterial'
import {useFonts} from 'expo-font'
import { novaAvalicao } from '../DadosCorporais'
export default ({navigation, route}) => {
    const [imc, setImc] = useState((novaAvalicao.getMassaCorporal()/(novaAvalicao.getEstatura()*novaAvalicao.getEstatura())).toFixed(2))
    const [pressaoSistolica, setPressaoSistolica] = useState(0)
    const [pressaoDiastolica, setPressaoDiastolica] = useState(0)
    const [pressaoSistolicaInvalido, setPressaoSistolicaInvalido] = useState(false)
    const [pressaoDiastolicaInvalido, setPressaoDiastolicaInvalido] = useState(false)
    const [pressaoArterial, setPressaoArterial] = useState('')
    const [frequenciaCardiacaDeRepouso, setFrequenciaCardiacaDeRepouso] = useState(0)
    const [frequenciaCardiacaDeRepousoInvalido, setFrequenciaCardiacaDeRepousoInvalido] = useState(false)
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/Montserrat-Regular.ttf'),
    })
    const {aluno} = route.params
    console.log(novaAvalicao.getMassaCorporal())
    console.log(novaAvalicao.getEstatura())
    console.log(imc)

    useEffect(()=> {
        if(pressaoSistolica, pressaoDiastolica != 0){
            if(pressaoSistolica < 120 && pressaoDiastolica < 80){
                setPressaoArterial('Ótima')
            }
            if(pressaoSistolica < 130 && pressaoSistolica >= 120  && pressaoDiastolica >= 80 && pressaoDiastolica < 85){
                setPressaoArterial('Normal')
            }
            if(pressaoSistolica >= 130 && pressaoSistolica <= 139 && pressaoDiastolica >= 85 && pressaoDiastolica <=89){
                setPressaoArterial('Limítrofe')
            }
            if(pressaoSistolica >= 140 && pressaoSistolica <=159 && pressaoDiastolica >=90 && pressaoDiastolica <= 99){
                setPressaoArterial('Hipertensão Estágio 1')
            }
            if(pressaoSistolica >= 160 && pressaoSistolica <= 179 && pressaoDiastolica >= 100 && pressaoDiastolica <= 109){
                setPressaoArterial('Hipertensão estágio 2')
            }
            if(pressaoSistolica >= 180 && pressaoDiastolica >= 110){
                setPressaoArterial('Hipertensão estágio 3')
            }
            if(pressaoSistolica >= 140 && pressaoDiastolica < 90){
                setPressaoArterial('Hipertensão sistólica isolada')
            }
        } else {
            setPressaoArterial("Resultado pressão arterial")
        }

    }, [pressaoSistolica, pressaoDiastolica])

    const handleNavigation = () => {
        if(pressaoSistolica == 0 || pressaoDiastolica == 0){
            Alert.alert("Campos não preenchidos", "Há campos obrigatórios que não foram preenchidos. Preencha-os e tente novamente.")
            setPressaoDiastolicaInvalido(true)
            setPressaoSistolicaInvalido(true)
            setFrequenciaCardiacaDeRepousoInvalido(true)
        } else {
            novaAvalicao.setPressaoDiastolica(pressaoDiastolica)
            novaAvalicao.setPressaoSistolica(pressaoSistolica)
            novaAvalicao.setFrequenciaCardiacaDeRepouso(frequenciaCardiacaDeRepouso)
            navigation.navigate('Finalizar Testes', {aluno: aluno, imc: imc})
        }
    }
    return (
        <ScrollView style={estilo.corLightMenos1}>
            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat]}>Preencha os campos abaixo:</Text>
            </SafeAreaView>
            <View style={{marginVertical: '5%'}}>
                <IMC></IMC>

                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {marginTop: '5%'}]}>IMC: {imc}</Text>

            </View>
            <PressaoArterial></PressaoArterial>
            <View style={[{marginTop: '5%', width: '100%', flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado]}>Pressão Sistólica:</Text>
                    <TextInput 
                    placeholder='Pressão sistólica' 
                    onChangeText={(text)=> setPressaoSistolica(parseFloat(text))} 
                    keyboardType='numeric' 
                    style={[estilo.sombra, style.textInputPequeno, estilo.centralizado, style.formatacaoTextInput, pressaoSistolicaInvalido ? {borderWidth: 1, borderColor: 'red'}: {}]}/>
                </View>
                <View style={[{marginTop: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', }]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {}]}>Pressão Diastólica:</Text>
                    <TextInput 
                    placeholder='Pressão diastólica' 
                    onChangeText={(text)=> setPressaoDiastolica(parseFloat(text))} 
                    keyboardType='numeric' 
                    style={[estilo.sombra, style.textInputPequeno, estilo.centralizado, style.formatacaoTextInput, pressaoDiastolicaInvalido ? {borderWidth: 1, borderColor: 'red'}:{}]}/>
                </View>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {marginVertical: '5%'}]}>{pressaoArterial}</Text>


            <FrequenciaCardiacaDeRepouso></FrequenciaCardiacaDeRepouso>
            <View style={[{marginTop: '5%', width: '100%',  alignItems: 'center' }]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {marginVertical: '5%'}]}>Frequência cardíaca de repouso:</Text>
                    <TextInput 
                    placeholder='Freq. cardiaca de repouso'  
                    onChangeText={(text)=> setFrequenciaCardiacaDeRepouso(parseFloat(text))} 
                    keyboardType='numeric' 
                    style={[estilo.sombra, style.textInputPequeno, estilo.centralizado, style.formatacaoTextInput, frequenciaCardiacaDeRepousoInvalido ? {borderWidth: 1, borderColor: 'red'}: {}]}/>
                </View>


            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={handleNavigation}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>FINALIZAR TESTES</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', height: 50},
    textInputPequeno:  {width: '50%', height: 50 },
    formatacaoTextInput: {backgroundColor: '#FFFF', borderRadius: 5, paddingLeft: 15}
})