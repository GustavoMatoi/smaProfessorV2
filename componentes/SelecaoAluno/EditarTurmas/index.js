import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, Alert, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
import Logo from "../../Logo";
import estilo from "../../estilo";
import { professorLogado } from "../../LoginScreen";

export default ({ navigation, route }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [conexao, setConexao] = useState(true);
    const [turmas, setTurmas] = useState([])
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        const recuperarTurmas = async () => {
            const bd = getFirestore()
            const turmasRef = collection(bd, 'Academias', professorLogado.getAcademia(), 'Turmas')
            const turmasSnapshot = await getDocs(turmasRef)
            const arrayTurmasAux = turmasSnapshot.docs.map((item) => ({
                nome: item.data().nome,
                horario: item.data().horario,
                vagas: item.data().vagas,
                id: item.id
            }));
            setTurmas(arrayTurmasAux)
        };
    
        recuperarTurmas(); 
    }, []);



    return (
        <ScrollView style={style.container}>
            {!conexao ?
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Modo Offline",
                        "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                    );
                }} style={[estilo.centralizado, { marginVertical: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                    <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                </TouchableOpacity>
                : null}
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, style.textoAlinhado]}>
                Cadastrar Turma:
            </Text>
            <TouchableOpacity
                style={[estilo.botao, estilo.corLightMenos1, { borderWidth: 3 }, style.botao]}
                onPress={() => navigation.navigate('Dados Turma', { turma: 'nova' })}
            >
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>
                    Criar turma
                </Text>
            </TouchableOpacity>
            <Text
                style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado, { marginTop: '3%' }]}
                numberOfLines={2}
            >
                Selecione a turma para continuar.
            </Text>


            {
                <View>
                    {turmas.map((turma) => (
                        <>
                            <TouchableOpacity
                                style={[estilo.botao, estilo.corPrimaria, style.botao]}
                                onPress={() => navigation.navigate('Dados Turma', { turma: turma })}
                            >
                                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                                    {turma.nome}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ))}
                </View>


            }


        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    textoAlinhado: {
        marginLeft: '5%',
        textDecorationLine: 'underline',
        marginBottom: '5%'

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