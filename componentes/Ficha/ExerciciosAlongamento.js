import React from 'react'
import {Text, View, SafeAreaView, StyleSheet, Image} from 'react-native'
import estilo from '../estilo'


export default props => {
    return (
        <View style={[style.container, {marginTop: 12}]}>
            <View style={[estilo.corLightMais1, style.nomeDoExercicio, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <Image
                width={50}
                height={50}
                source={{uri: props.imagem || ''}}>

                </Image>
                <Text style={estilo.textoSmall12px}>{props.nomeDoExercicio || "Exercício Alongamento"}</Text>
            </View>
            
            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[ style.tituloParametro]}>Séries</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro, {alignItems: 'center', marginTop: '40%'}]}>{props.repeticoesDoExercicio || "Reps."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Repetições</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro,  {alignItems: 'center', marginTop: '40%'}]}>{props.duracao || "Dur."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Intervalo</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro,  {alignItems: 'center', marginTop: '40%'}]}>{props.descansoDoExercicio || "Desc."}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        minHeight: 60,
        justifyContent: 'space-between',
        marginTop: '8%'

    },
    nomeDoExercicio: {
        width: '55%',
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    parametroGrande: {
        width: '14%',
        height: '100%'
    },
    tituloParametro: {
        marginTop: -12,
        fontSize: 9
    },
    textoParametro: {
        textAlign: 'center',
        width: '100%',
        marginTop: 10
    }
})