import React, {useState} from "react";
import {Text, View, SafeAreaView, StyleSheet, Modal, TouchableOpacity} from "react-native"
import estilo from "../estilo";
import { Feather } from '@expo/vector-icons'; 
import Logo from "../Logo";
import {useFonts} from "expo-font"

export default ({navigation, ondeNavegar}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat.ttf'),
    })


    return(

            <View style={[estilo.corLightMenos1, style.container]}>
            <Logo tamanho='pequeno'></Logo> 

            <View style={[{marginTop: '50%'}, estilo.centralizado]}>
            <Feather name="wifi-off" size={130} color="#182128" />
            </View>

            <Text style={[estilo.textoCorSecundaria, estilo.tituloH333px, estilo.centralizado]}>Verifique sua conexão</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, estilo.centralizado, {marginTop: '10%', textAlign: 'center'}, style.Montserrat]}> Parece que seu dispositivo não está conectado na internet no momento. Para evitar que os dados sejam corrompidos, aperte no botão abaixo para ser redirecionado.</Text>
            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, {marginTop: '40%'}]} onPress={() => {ondeNavegar == 'Home' ? navigation.navigate('Home') : navigation.navigate('Login')}}>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>FECHAR</Text>
            </TouchableOpacity>
            </View>

    )
}

const style = StyleSheet.create({
    container: {
    }, 
    Montserrat: {
        fontFamily: 'Montserrat'
    }

})