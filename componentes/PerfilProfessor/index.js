import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, TouchableOpacity ,SafeAreaView, ScrollView, Alert} from 'react-native'
import estilo from "../estilo"
import Caixinha from "./Caixinha"
import AreaDeDados from "./AreaDeDados"
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';

export default ({navigation}) => {
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
    })
  
      return () => {
        unsubscribe()
      }
    }, [])

    
    return (
        <ScrollView style={[estilo.corLightMenos1]}>
            <SafeAreaView style={[style.container]}>
                <View style={[style.header, estilo.corPrimaria]}>
                {!conexao ?
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Modo Offline",
            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
          );
        }} style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
          <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
        </TouchableOpacity>
        : null}
                    <Text style={[estilo.tituloH333px, estilo.textoCorLight, estilo.centralizado, conexao ? {marginTop: '10%'} : {}]}>PERFIL</Text>
                </View>
                <Caixinha></Caixinha>
                <AreaDeDados conexao={conexao} navigation={navigation}></AreaDeDados>
            </SafeAreaView>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        height: 300,

    },
    caixa: {
        borderWidth: 1,
        justifyContent: 'center'
    }
})