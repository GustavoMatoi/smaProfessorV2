import React from 'react'
import {Text, View, SafeAreaView, StyleSheet} from 'react-native'
import estilo from '../estilo'


export default props => {
    return (
        <View style={[style.container, {marginTop: 12}]}>
            <View style={[estilo.corLightMais1, style.nomeDoExercicio]}>
                <Text style={estilo.textoSmall12px}>{props.nomeDoExercicio || "Exercício Alongamento"}</Text>
            </View>
            
            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[ style.tituloParametro]}>Séries</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.repeticoesDoExercicio || "Reps."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Repetições</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.duracao || "Dur."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Intervalo</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.descansoDoExercicio || "Desc."}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        marginTop: '8%'

    },
    nomeDoExercicio: {
        width: '35%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    parametroGrande: {
        width: '21%',
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