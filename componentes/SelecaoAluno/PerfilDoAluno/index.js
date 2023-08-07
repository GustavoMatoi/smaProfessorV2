import React from 'react'
import {Text, View, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native'
import estilo from '../../estilo'
import Caixinha from './Caixinha'
import Caixa from './Caixa'


export default ({ navigation, route}) => {
    const {aluno} = route.params
    console.log(aluno)

    /*
                   */
    return (
        <ScrollView style={estilo.corLightMais1}>
            <SafeAreaView style={{marginBottom: '5%'}}>
            <View style={[style.quadradoAzul, estilo.corPrimaria]}>
                </View>
                <View style={[{marginTop: '-20%'}]}>
                                <Caixinha aluno={aluno}></Caixinha>
                </View>            
                <View style={{marginTop: '10%'}}>
                    <Caixa navigation={navigation} aluno={aluno}></Caixa>
                </View>
            </SafeAreaView>

        </ScrollView>

    )
}

const style = StyleSheet.create({
    quadradoAzul: {
        width: '100%',
        height: 250
    },
    quadradoBranco: {
        width: '80%',
        borderRadius: 20,
        height: 150
    }
})