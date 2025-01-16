import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, TouchableOpacity ,SafeAreaView, ScrollView, Alert} from 'react-native'
import estilo from "../estilo"
import Caixinha from "./Caixinha"
import AreaDeDados from "./AreaDeDados"
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { getAuth, signOut } from "firebase/auth";
import { professorLogado } from "../LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    
    const handleLogout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("Usuário deslogado com sucesso!");
        alert("Desconectado com sucesso!");

        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('senha');
        await AsyncStorage.removeItem('professorLocal');

        professorLogado.setEmail('');
        professorLogado.setSenha('');

        navigation.navigate('Login');
      } catch (error) {
        console.error("Erro ao deslogar: ", error.message);
      }
    };
    
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
                    <TouchableOpacity
                    style={style.logoutButton}
                    onPress={() =>
                      Alert.alert(
                        "Confirmação",
                        "Tem certeza de que deseja sair?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Sair",
                            style: "destructive",
                            onPress: handleLogout,
                          },
                        ]
                      )
                    }
                  >
                    <SimpleLineIcons name="logout" size={24} color="#FF6262" />
                  </TouchableOpacity>
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
    },logoutButton: {
      position: 'absolute',
      top: 40,
      right: 25,
      backgroundColor: '#0066FF',
      padding: 10,
      bordercolor: '#000',
      borderRadius: 30,
      borderWidth: 0.2,
      elevation: 3,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }
})