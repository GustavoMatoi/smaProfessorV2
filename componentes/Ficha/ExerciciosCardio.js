import React from 'react'
import {Text, View, SafeAreaView, StyleSheet} from 'react-native'
import estilo from '../estilo'


export default props => {
    return (
        <View style={[style.container, {marginTop: 12}]}>
            <View style={[estilo.corLightMais1, style.nomeDoExercicio]}>
                <Text style={estilo.textoSmall12px}>{props.nomeDoExercicio || "Exercício cardio"}</Text>
            </View>
            
            <View style={[style.parametroPequeno,estilo.corLight]}>
                <Text style={[ style.tituloParametro]}>Velocidade</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.velocidadeDoExercicio || 'Reps.'}</Text>
            </View>
            
            <View style={[style.parametroPequeno,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Séries</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.seriesDoExercicio || 'Ser.'}</Text>
            </View>

            <View style={[style.parametroPequeno,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Duração</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.duracaoDoExercicio || 'Inten.'}</Text>
            </View>

            <View style={[style.parametroPequeno,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Repouso</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.descansoDoExercicio || 'Rep.'}</Text>
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
    parametroPequeno :{
        width: '16%',
        height:'100%'

    },
    parametroGrande: {
        width: '19%',
        height:'100%'
    },
    tituloParametro: {
        marginTop: -12,
        fontSize: 10
    },
    textoParametro: {
        textAlign: 'center',
        width: '100%',
        marginTop: 10
    }
})
