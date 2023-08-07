import React, {useState} from 'react'
import {Text, View, SafeAreaView, StyleSheet} from 'react-native'
import estilo from '../estilo'
import {Exercicio} from '../../classes/Exercicio'
import { ExercicioNaFicha } from '../../classes/ExercicioNaFicha'


export default props => {
    {console.log(props.conjugado)}  

    return (
        <View style={ props.conjugado? [style.containerConjugado] :  [style.container, {marginTop: 12}]}>
            <View style={[estilo.corLightMais1, style.nomeDoExercicio]}>
                <Text style={estilo.textoSmall12px}>{props.nomeDoExercicio || "Exercício Força"}</Text>
            </View>
            
            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[ style.tituloParametro]}>Séries</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{props.series || "Ser."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Repetições</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{ props.repeticoes || "Reps."}</Text>
            </View>

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Intervalo</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{ props.descanso|| "Desc."}</Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '9%'

    },

    containerConjugado: {
      height: '200%',
      width: '100%',
    },
    nomeDoExercicio: {
        width: '35%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    parametroGrande: {
        width: '21.5%',
        height: 40,
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
