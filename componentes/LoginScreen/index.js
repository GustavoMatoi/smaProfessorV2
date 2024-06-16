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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Professor } from '../../classes/Professor';
import { Endereco } from '../../classes/Endereco';
let professorLogado = new Professor()
let enderecoProfessor = new Endereco()


export { professorLogado, enderecoProfessor }

export default ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [conexao, setConexao] = useState(true)
    const [emailRecuperacao, setEmailRecuperacao] = useState('')
    const [professorData, setProfessorData] = useState()

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();

                for (const key of keys) {
                    const value = await AsyncStorage.getItem(key);
                    console.log(`Chave: ${key}, Valor: ${value}`);
                }
            } catch (error) {
                console.error('Erro ao obter dados do AsyncStorage:', error);
            }
        };

        fetchData();
        getValueFunction()
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

    const saveValueFunction = async () => {
        try {
            if (email) {
                await AsyncStorage.setItem('email', email);
                setEmail('');
            }

            if (password) {
                await AsyncStorage.setItem('senha', password);
                setPassword('');
            }
            await getValueFunction();
        } catch (error) {
            console.error('Erro ao salvar dados no AsyncStorage:', error);
        }
    };

    const getValueFunction = async () => {
        const professorLocalTeste = await AsyncStorage.getItem('professorLocal')
        const profOjb = JSON.parse(professorLocalTeste)

        if (profOjb !== null) {
            try {
                const storedEmail = await AsyncStorage.getItem('professorLocal');
                const dadosProfessor = JSON.parse(storedEmail)
                console.log(dadosProfessor)
                professorLogado.setNome(dadosProfessor.nome);
                professorLogado.setEmail(dadosProfessor.email);
                professorLogado.setSenha(dadosProfessor.senha)
                professorLogado.setDataNascimento(dadosProfessor.dataNascimento);
                professorLogado.setSexo(dadosProfessor.sexo);
                professorLogado.setProfissao(dadosProfessor.profissao);
                professorLogado.setCpf(dadosProfessor.cpf);
                professorLogado.setTelefone(dadosProfessor.telefone);
                enderecoProfessor.setBairro(dadosProfessor.endereco.bairro)
                enderecoProfessor.setCep(dadosProfessor.endereco.cep)
                enderecoProfessor.setCidade(dadosProfessor.endereco.cidade)
                enderecoProfessor.setEstado(dadosProfessor.endereco.estado)
                enderecoProfessor.setRua(dadosProfessor.endereco.rua)
                enderecoProfessor.setNumero(dadosProfessor.endereco.numero)
                professorLogado.setAcademia(dadosProfessor.academia)
                professorLogado.setDeletado(dadosProfessor.excluido)
                const emailProf = dadosProfessor.email
                setEmail(emailProf || '');

                const senhaProf = dadosProfessor.senha
                setPassword(senhaProf || '');
                console.log("Dados professor excluido", dadosProfessor.excluido)
                if(dadosProfessor.excluido === true){
                    Alert.alert("Não foi possível realizar login.", "O coordenador da academia que você está vinculato te marcou como excluído.")
                } else {
                    if (emailProf && senhaProf) {
                        if (conexao) {
                            await firebase.auth().signInWithEmailAndPassword(emailProf, senhaProf);
                        }
                        navigation.navigate('Principal', { professor: dadosProfessor });
                    }
                }
                } catch (error) {
                    console.error('Erro ao obter dados do AsyncStorage ou fazer login:', error);
                }
        }
    };

    useEffect(() => {
        console.log("Chamou a função")
        fetchProfessorData()
    }, [])
    const fetchProfessorData = async () => {
        try {
            const academiaRef = collection(firebaseBD, "Academias");
            const querySnapshot = await getDocs(academiaRef);
            for (const academiaDoc of querySnapshot.docs) {
                const academiaNome = academiaDoc.get("nome");
                const professoresRef = collection(firebaseBD, "Academias", academiaNome, "Professores");

                const professoresSnapshot = await getDocs(professoresRef);
                for (const professorDoc of professoresSnapshot.docs) {
                    if (email == professorDoc.get("email")) {
                        const professorData = professorDoc.data();
                        setProfessorData(professorDoc.data())
                        professorLogado.setNome(professorData.nome);
                        professorLogado.setEmail(professorData.email);
                        professorLogado.setSenha(professorData.senha)
                        professorLogado.setDataNascimento(professorData.dataNascimento);
                        professorLogado.setSexo(professorData.sexo);
                        professorLogado.setProfissao(professorData.profissao);
                        professorLogado.setCpf(professorData.cpf);
                        professorLogado.setTelefone(professorData.telefone);
                        enderecoProfessor.setBairro(professorData.endereco.bairro)
                        enderecoProfessor.setCep(professorData.endereco.cep)
                        enderecoProfessor.setCidade(professorData.endereco.cidade)
                        enderecoProfessor.setEstado(professorData.endereco.estado)
                        enderecoProfessor.setRua(professorData.endereco.rua)
                        enderecoProfessor.setNumero(professorData.endereco.numero)
                        professorLogado.setAcademia(professorData.academia)

                        const professorString = JSON.stringify(professorDoc.data())
                        AsyncStorage.setItem('professorLocal', professorString)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            saveValueFunction()
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

                    <TouchableOpacity onPress={() => fetchProfessorData()}
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
                            onPress={() =>
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