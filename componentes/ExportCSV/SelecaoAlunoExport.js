import React, {useState, useEffect} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import estilo from "../estilo";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { collection, getDocs} from "firebase/firestore";
import { professorLogado } from "../LoginScreen";
import Spinner from 'react-native-loading-spinner-overlay';


export default ({navigation, route}) => {
  const {alunos } = route.params
      
    return (
        <SafeAreaView 
        style={style.container}>

            <Text 
            style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]}
             numberOfLines={2}
             >Selecione o aluno para continuar.</Text>
            {
  alunos.map((aluno) => (
    <TouchableOpacity
      key={aluno.cpf}
      style={[estilo.botao, estilo.corPrimaria, style.botao]}
      onPress={() => navigation.navigate('Exportar CSV', {aluno: aluno, navigation: navigation})}
    >

      {console.log(aluno)}
      <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{aluno.nome}</Text>
    </TouchableOpacity>
  ))
}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        marginVertical: '5%'
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        marginTop: '15%',
        textDecorationLine: 'underline',
    },
    foto: {
        width: 50,
        height: 50, 
        borderRadius: 25
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
        justifyContent: 'space-around', // Alinha os itens horizontalmente

    }

})