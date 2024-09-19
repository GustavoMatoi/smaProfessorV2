import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Versao from "./Versoes";
import estilo from "../estilo";
import NetInfo from '@react-native-community/netinfo';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import Globais from "../../classes/Globais";

export default ({ route }) => {
    const variavelGlobal = new Globais('2.3.1'); 
    const [atVersao, setAtVersao] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        async function getVersoes() {
            const db = getFirestore();
            const versoesRef = doc(db, "Versao", "versao");
            console.log("Chegou aqui 1");
            try {
                const docSnapshot = await getDoc(versoesRef);
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    setAtVersao(docData.professor)
                    console.log('Versão firebase:');
                    console.log(atVersao);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log("Error fetching version:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getVersoes();
    }, []);
    

    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);
    console.log('Versão atual:', variavelGlobal.versao);
    //console.log('Versão do Firebase:', atVersao);
    return (
        <ScrollView>
            <SafeAreaView style={estilo.corLightMenos1}>
                <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, style.Titulo, style.alinhamentoTexto]}>Versões</Text>
                
            </SafeAreaView>
            {conexao ? (
                    (variavelGlobal.versao === atVersao) ? (
                        <Versao versao={variavelGlobal.versao} />
                    ) : (
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "Aplicativo desatualizado",
                                "Por favor, atualize a versão do seu aplicativo."
                            );
                        }}
                        style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                            <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>VERSÃO INCORRETA - </Text>
                            <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                        </TouchableOpacity>
                    )
                ) : (
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Modo Offline",
                            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                        );
                    }}
                    style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
                    >
                        <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                        <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                    </TouchableOpacity>
                )}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    alinhamentoTexto: {
        margin: 20
    },
    Titulo:{
        marginTop: 25,
        marginBotton: 20
    }
});
