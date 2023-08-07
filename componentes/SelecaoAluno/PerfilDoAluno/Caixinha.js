import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Foto from './Foto'
import estilo from '../../estilo'
import {useFonts} from 'expo-font'

export default ({aluno}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/Montserrat-Regular.ttf'),
    })

    const Data = new Date()
    const dia = Data.getDate()
    const mes = Data.getMonth() + 1
    const ano = Data.getFullYear()
    return (
            <View style={[estilo.corLight, style.container, estilo.centralizado, estilo.sombra]}>
                <View style={[{marginTop: '-25%'}]}>
                    <Foto aluno={aluno}></Foto>
                    <View style={[style.areaTexto, estilo.centralizado]}>
                        <Text style={[estilo.centralizado, style.Montserrat, estilo.textoCorSecundaria, estilo.textoP16px]}>{aluno.nome}</Text>
                        <Text style={[estilo.centralizado, style.Montserrat, estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '5%', fontWeight: 'bold' }]}>{dia}/{mes}/{ano}</Text>
                    </View>
                </View>
            </View>
            

    )
}

const style = StyleSheet.create({
    container: {
        width: '80%',
        height: 200,
        borderRadius: 20
    },
    Montserrat: {
    },
    areaTexto: {
        marginTop: '5%'
    }
})