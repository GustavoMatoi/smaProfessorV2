import React, {useState, useEffect} from "react"
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import estilo from "../../estilo"
import { Entypo } from '@expo/vector-icons'; 

export default props=> {
    return(
        <TouchableOpacity style={[estilo.corLightMenos1, style.botao]}>
            <Entypo name="add-to-list" size={30} color={'#0066FF'} />
            <Text style={[estilo.tituloH619px, estilo.textoCorPrimaria]}>ADICIONAR EXERCÍCIO</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    botao: {
        borderWidth: 4,
        borderColor: '#0066FF',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        height: 50,
        alignItems: 'center',
        borderRadius: 15
    }
})