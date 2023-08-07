import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import estilo from "../estilo"
import Caixinha from "./Caixinha"
import AreaDeDados from "./AreaDeDados"
export default ({navigation}) => {

    return (
        <ScrollView style={[estilo.corLightMenos1]}>
            <SafeAreaView style={[style.container]}>
                <View style={[style.header, estilo.corPrimaria]}>
                    <Text style={[estilo.tituloH333px, estilo.textoCorLight, estilo.centralizado, {marginTop: '10%'}]}>PERFIL</Text>
                </View>
                <Caixinha></Caixinha>
                <AreaDeDados navigation={navigation}></AreaDeDados>
            </SafeAreaView>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        height: 300,

    },
    caixa: {
        borderWidth: 1,
        justifyContent: 'center'
    }
})