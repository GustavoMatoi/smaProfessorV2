import React from "react"
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native'
import estilo from "../../estilo"

export default ({navigation, route}) => {
    const {aluno} = route.params
    console.log(aluno)
    return (
        <SafeAreaView style={[style.container, estilo.corLightMenos1]}>
            <View style={[style.areaBotoes]}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução dados antropométricos', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO DADOS ANTROPOMÉTRICOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução dos testes', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO TESTES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Seleção do exercício', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO EXERCÍCIOS</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução PSE', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO PSE</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução QTR', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO QTR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução CIT', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO CIT</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução Monotonia', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO MONOTONIA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução Strain', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO STRAIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>navigation.navigate('Evolução PSE do Exercício Seleção', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO PSE DO EXERCÍCIO</Text>
                </TouchableOpacity>


                </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    areaBotoes: {
        width: '90%',

    },

})