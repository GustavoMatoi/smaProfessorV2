import React, {useState, useEffect} from "react"
import {Text, View, TouchableOpacity, StyleSheet} from "react-native"
import estilo from "../estilo"
import { Entypo } from '@expo/vector-icons'; 
import {useFonts} from 'expo-font'

export default ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Regular.ttf'),
    })
    return(
        <View style={[style.container, estilo.corLightMenos1]}>
            <View style={{alignItems: 'center'}}>
                <View style={[estilo.corSuccess, style.bolaVerde]}>
                    <Entypo name="check" size={200} color="white" />
                </View>
            </View>

            <View style={[estilo.centralizado, {marginVertical: '10%'}]}>
                <Text style={[estilo.textoP16px, style.textos, estilo.textoCorSecundaria]}>
                    Avaliação realizada com sucesso!
                </Text>
                <Text style={[estilo.textoP16px, style.textos, estilo.textoCorSecundaria]}>
                    Gostaria de iniciar a montagem do treino?
                </Text>
            </View>

            <View style={{marginTop: '20%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Montar treino')}> 
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>MONTAR TREINO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilo.botao, estilo.corLightMenos1, {borderWidth: 3, borderColor: '#0066FF' }]} onPress={()=> navigation.navigate('Home')}>
                    <Text style={[estilo.textoCorPrimaria, estilo.tituloH619px]}>VOLTAR AO INÍCIO</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create( {
    container: {
        width: '100%',
        height: '100%'
    },
    bolaVerde: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginVertical: 'auto',
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textos: {
        fontFamily: 'Montserrat',
    }
    
})