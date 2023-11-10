import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet, View, Dimensions, TouchableOpacity, TextInput, Touchable, Alert } from 'react-native'
import Estilo from "../estilo"
import Logo from '../Logo'
import { useFonts } from 'expo-font';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc, querySnapshot, QueryStartAtConstraint } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import NetInfo from '@react-native-community/netinfo';
import ModalSemConexao from '../ModalSemConexao'
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons';


export default ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [conexao, setConexao] = useState(true)
    const [emailRecuperacao, setEmailRecuperacao] = useState('')

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const checkWifiConnection = () => {
        NetInfo.fetch().then((state) => {
            if (state.type === 'wifi' || state.type === 'cellular') {
                console.log('Conectado ao Wi-Fi');
                setConexao(true)
            } else {
                console.log('Não conectado ao Wi-Fi');
                setConexao(false)
            }
        });
    };
    useEffect(() => {
        checkWifiConnection();
    }, []);


    const handleLogin = () => {
        if (conexao) {
            firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
                navigation.navigate('Principal')
            }).catch((error) => {
                let mensagemDeErro = ''
                switch (error.code) {
                    case 'auth/invalid-email':
                        mensagemDeErro = "Email inválido. Tente novamente"
                        break
                    case 'auth/wrong-password':
                        mensagemDeErro = "Senha incorreta"
                        break;
                    case 'auth/user-not-found':
                        mensagemDeErro = "Usuário não encontrado. Tente novamente"
                        break;
                    default:
                        mensagemDeErro = "Erro desconhecido. Tente novamente mais tarde."
                }
                Alert.alert("Erro em seu cadastro", mensagemDeErro)
            })
        } else {
            navigation.navigate('Modal sem conexão')
        }
    }

    const handleCadastro = () => {
        navigation.navigate('Cadastro')
    }

    const mudarSenha = (email) => {
        if (email === '') {
            Alert.alert("Email não informado", "Informe o email antes de prosseguir.")
        } else {
            firebase.auth().sendPasswordResetEmail(email).then(() => {
                Alert.alert("Email enviado", "Foi enviado um email para recuperação de senha.")
                setModalVisible(false)
            }
            ).catch((error) => {
                Alert.alert("Erro:", error)
                setModalVisible(false)
            })
        }

    }

    return (
        <SafeAreaView style={[Estilo.corLightMenos1]}>
            <View style={style.container}>
                <View style={style.areaLogo}>
                    <Logo tamanho="grande"></Logo>
                </View>
                <View style={style.areaLogin}>
                    <Text style={[Estilo.tituloH619px]}> Email: </Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        style={[style.inputText, Estilo.corLight]}
                        onChangeText={(text) => setEmail(text)}
                    >
                    </TextInput>
                    <Text style={[Estilo.tituloH619px]}> Senha: </Text>
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        style={[style.inputText, Estilo.corLight]}
                        onChangeText={(text) => setPassword(text)}
                    >
                    </TextInput>

                    <TouchableOpacity onPress={handleLogin}
                        style={[Estilo.corPrimaria, style.botao, Estilo.sombra, Estilo.botao]}>
                        <Text
                            style={[Estilo.tituloH523px, Estilo.textoCorLight]}>ENTRAR</Text>
                    </TouchableOpacity>
                    <View style={[style.textoLink, style.ultimoLink]}>
                        <Text
                            style={[
                                Estilo.textoCorPrimaria,
                                Estilo.textoSmall12px,
                            ]}
                            onPress={() => { handleCadastro() }}
                        >
                            Não possui conta? Cadastre-se agora gratuitamente
                        </Text>

                    </View>
                    <View style={[{ marginTop: '10%' }, Estilo.centralizado]}>
                        <Text
                            style={[
                                Estilo.textoCorPrimaria,
                                Estilo.textoSmall12px,
                            ]}
                            onPress={() => //{ mudarSenha()}}
                                setModalVisible(true)
                            }
                        >
                            Esqueceu sua senha? Aperte aqui.

                            <Modal isVisible={modalVisible}  >
                                <View style={[{ height: '60%', justifyContent: 'space-around', alignItems: 'center' },]}>
                                    <Text style={[Estilo.tituloH619px, Estilo.textoCorLight, { textAlign: 'center' }]}>Digite seu email abaixo. Enviaremos um email para recuperação de senha.</Text>
                                    <FontAwesome5 name="user-lock" size={90} color="#0066FF" />
                                    <TextInput
                                        placeholder="Senha"
                                        value={emailRecuperacao}
                                        style={[style.inputText, Estilo.corLight]}
                                        onChangeText={(text) => setEmailRecuperacao(text)}
                                    >
                                    </TextInput>
                                    <TouchableOpacity style={[Estilo.botao, Estilo.corPrimaria]} onPress={() => mudarSenha(emailRecuperacao)}>
                                        <Text style={[Estilo.textoCorLight, Estilo.tituloH619px]}>ENVIAR EMAIL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Estilo.botao, { borderWidth: 5, borderColor: '#0066FF' }]} onPress={() => setModalVisible(false)}>
                                        <Text style={[Estilo.textoCorLight, Estilo.tituloH619px]}>CANCELAR</Text>
                                    </TouchableOpacity>
                                </View>


                            </Modal>
                        </Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    //Geral
    container: {
        marginBottom: '5%',
        height: '100%'
    },
    //Logo
    areaLogo: {
        marginTop: '5%'
    },
    //Area de login
    areaLogin: {
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    },

    textoLink: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomWidth: 1,
        marginTop: '5%',
        borderBottomColor: '#0066FF'
    },
    botaoLogin: {
        width: 170,
        paddingVertical: 11,
        paddingHorizontal: 45,
        borderRadius: 100,
        marginTop: '15%',

    },
    inputText: {
        width: '100%',
        padding: 10,
        height: 50,
        borderRadius: 10,
        marginVertical: 15,
        elevation: 10
    },
    ultimoLink: {
        top: 10
    }

})