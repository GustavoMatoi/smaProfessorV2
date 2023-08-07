import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import estilo from "../estilo"
import {useFonts} from "expo-font"

export default props => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat.ttf'),
    })
  
    console.log("CORRIGIR O ALUNO 1 POR ALUNO GET NOME")
      return (
        <ScrollView style={[style.container, estilo.corLightMenos1]} >
            <View style={[style.conteudos, estilo.centralizado]}>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, {fontFamily: 'Montserrat', marginBottom: '5%'}]}>Selecione um aluno para visualizar seus dados:</Text>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>
                        Aluno 1
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      );
    };


const style = StyleSheet.create({
    container: {
        height: '100%',
    },
    conteudos:{
        marginVertical: '5%',
        marginTop: '10%'

    }
})