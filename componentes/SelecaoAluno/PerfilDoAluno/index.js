import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native'
import estilo from '../../estilo'
import Caixinha from './Caixinha'
import Caixa from './Caixa'
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';


export default ({ navigation, route }) => {
    const { aluno } = route.params
    console.log(aluno)
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
        <ScrollView style={estilo.corLightMais1}>
            <SafeAreaView style={{ marginBottom: '5%' }}>
                <View style={[style.quadradoAzul, aluno.fichaVencendo? estilo.corWarning : estilo.corPrimaria ]}>
                    <Text style={[estilo.centralizado, estilo.tituloH427px, estilo.textoCorLight, {marginTop: '5%'}]}>PERFIL DO ALUNO</Text>
                    {!conexao ?
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "Modo Offline",
                                "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                            );
                        }} style={[estilo.centralizado, { marginTop: '5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                            <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                            <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                        </TouchableOpacity>
                        : null}
                </View>
                <View style={[{ marginTop: '-20%' }]}>
                    <Caixinha aluno={aluno}></Caixinha>
                </View>
                <View style={{ marginTop: '10%' }}>
                    <Caixa navigation={navigation} aluno={aluno}></Caixa>
                </View>
            </SafeAreaView>

        </ScrollView>

    )
}

const style = StyleSheet.create({
    quadradoAzul: {
        width: '100%',
        height: 250
    },
    quadradoBranco: {
        width: '80%',
        borderRadius: 20,
        height: 150
    }
})