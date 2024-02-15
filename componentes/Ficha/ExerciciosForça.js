import React, {useState} from 'react'
import {Text, View, SafeAreaView, StyleSheet, Image} from 'react-native'
import estilo from '../estilo'
import {Exercicio} from '../../classes/Exercicio'
import { ExercicioNaFicha } from '../../classes/ExercicioNaFicha'


export default props => {
    {console.log(props.conjugado)}  

    return (
        <View style={ props.conjugado? [style.containerConjugado] :  [style.container, {marginTop: 12}]}>
            <View style={[estilo.corLightMais1, style.nomeDoExercicio, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <Image
                style={{width: 50, height: 50}}
                source={{uri: props.imagem || ''}}>

                </Image>
                <Text style={[estilo.textoSmall12px, {width: 100}]}>{props.nomeDoExercicio || "Exercício Alongamento"}</Text>
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

            <View style={[style.parametroGrande,estilo.corLight]}>
                <Text style={[style.tituloParametro]}>Cadência</Text>
                <Text style={[estilo.textoSmall12px, style.textoParametro]}>{ props.cadencia|| "Cad."}</Text>
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
        width: '50%',
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    parametroGrande: {
        width: '12%',
        height: '100%'
    },
    tituloParametro: {
        marginTop: -12,
        fontSize: 9
    },
    textoParametro: {
        textAlign: 'center',
        width: '100%',
        marginTop: 20,

    }
})
