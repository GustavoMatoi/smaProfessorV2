import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import estilo from '../estilo'
import {useFonts} from "expo-font"
import { getAuth, signOut } from "firebase/auth";
import { professorLogado, enderecoProfessor } from '../LoginScreen'
export default ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Regular.ttf'),

        
    })
    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            console.log("Usuário deslogado com sucesso!");
            alert("Desconectado com sucesso!")
            navigation.navigate('Login')
        })
          .catch((error) => {
            console.error(error.message);
          });
      };

    return(
        <View>
            <View style={[estilo.corLightMenos1, style.container]}>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>CPF:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getCpf()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Data de nascimento:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getDataNascimento()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Telefone:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getTelefone()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Login:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getEmail()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Senha:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getSenha()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Profissão:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getProfissao()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Endereço:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{enderecoProfessor.getRua()},{enderecoProfessor.getNumero()}, {enderecoProfessor.getCidade()}, {enderecoProfessor.getEstado()}</Text>
            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, estilo.sombra, {marginTop: '5%'}]} onPress={()=>navigation.navigate('Editar foto')}>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >ALTERAR FOTO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, estilo.sombra, {marginTop: '5%'}]} onPress={()=>handleLogout()}>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >SAIR</Text>
            </TouchableOpacity>
        </View>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        height: 500,
        width: '100%',
        padding: 20,
    },
    montserrat: {
        fontFamily: 'Montserrat'
    }
})