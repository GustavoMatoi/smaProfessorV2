import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet} from 'react-native';
import estilo from "../../estilo";
import Foto from "../Conversas/Foto";
export default ({aluno}) => {
    console.log(`Aluno header: ${aluno.cpf}`)
    return (
        <View style={[estilo.corSecundaria]}>
            <View style={[style.container]}>
                <Foto cpf={aluno.cpf}></Foto>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px, estilo.centralizado, {marginTop: 5}]}>{aluno.nome}</Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        textAlign: 'center'
    }
})