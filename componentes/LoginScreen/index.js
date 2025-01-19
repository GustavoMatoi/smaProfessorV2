import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet, View, Dimensions, TouchableOpacity, TextInput, Touchable, Alert, ScrollView } from 'react-native'
import Estilo from "../estilo"
import Logo from '../Logo'
import { useFonts } from 'expo-font';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { collection, setDoc, doc, getDoc,getDocs, getFirestore, where, query, addDoc, querySnapshot, QueryStartAtConstraint, collectionGroup } from "firebase/firestore";
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
const dadosverif = true;

export { professorLogado, enderecoProfessor }

export default ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [conexao, setConexao] = useState(true)
    const [emailRecuperacao, setEmailRecuperacao] = useState('')
    const [professorData, setProfessorData] = useState()
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    /*
        const fetchAndCheckFirebaseAcademia = async () => {
            try {
                const db = getFirestore();
                const firebaseRef = doc(db, "Versao", "versao");

                const docSnapshot = await getDoc(firebaseRef);
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    const firebaseVersion = docData.firebase; 
                    console.log('Versão do Firebase no Firestore:', firebaseVersion);

                    const storedVersion = await AsyncStorage.getItem('firebase');
    
                    if (storedVersion !== String(firebaseVersion)) {
                        console.log(`Mudança detectada: ${storedVersion} => ${firebaseVersion}`);

                        await AsyncStorage.clear();
                        await AsyncStorage.setItem('firebase', String(firebaseVersion));
    
                        Alert.alert('Aviso', 'Os dados locais foram atualizados devido à mudança de banco de dados.');
                    } else {
                        console.log('Versão do banco de dados não mudou.');
                    }
                } else {
                    console.error('Erro: Documento "versao" não encontrado na coleção "Versoes".');
                }
            } catch (error) {
                console.error('Erro ao verificar a versão do banco de dados:', error);
            }
        };*/
        const checkVersion = async () => {
            try {
                const db = getFirestore();
                const firebaseRef = doc(db, "Versao", "versao");
                const firebasedocSnapshot = await getDoc(firebaseRef);

                const academiaDocRef = doc(db, "Academias", professorLogado.getAcademia());
                const academiadocSnapshot = await getDoc(academiaDocRef);

                if (firebasedocSnapshot.exists() && academiadocSnapshot.exists()) {
                    const docData = firebasedocSnapshot.data();
                    const firebaseVersion = docData.firebase; 
                    const storedFirebaseVersion = await AsyncStorage.getItem('firebase');

                    const acadedocData = academiadocSnapshot.data();
                    const academialogada = acadedocData.nome;
                    const storedAcademiaLocal = await AsyncStorage.getItem('academia'); 
                    
                    console.log('Academia guardada salva:', academialogada);
                    console.log('Versão do Firebase salva:', firebaseVersion);

                    if (storedAcademiaLocal && storedAcademiaLocal !== academialogada) {
                        console.log(`Mudança de academia detectada: ${storedAcademiaLocal} => ${academialogada}`);
                        await AsyncStorage.clear();
                        await AsyncStorage.setItem('academia', String(academialogada));
                        Alert.alert('Aviso', 'Sua academia foi atualizada.');
                        dadosverif = false;
                        
                    }                                
                    if (firebaseVersion && firebaseVersion !== storedFirebaseVersion) {
                        console.log(`Mudança de firebase detectada: ${firebaseVersion} => ${storedFirebaseVersion}`);
                        await AsyncStorage.clear();
                        await AsyncStorage.setItem('firebase', String(storedFirebaseVersion));
                        Alert.alert('Aviso', 'Sua versao do firebase foi atualizada.');
                        dadosverif = false;
                        
                    }                                

                    //await checkVersion(storedFirebaseVersion, firebaseVersion, "firebase");
                    //await checkVersion(storedAcademiaLocal, academialogada, "academia");
                    await AsyncStorage.setItem('firebase', String(firebaseVersion));
                    await AsyncStorage.setItem('academia', String(academialogada));
                } else {
                    console.error('Erro: Documento "versao" não encontrado na coleção "Versao" ou academia nao encontrada em Academias.');
                }
            } catch (error) {
                console.error(`Erro ao verificar a versão de ${description}:`, error);
            }
        };
        /*
        const academiaDocRef = doc(db, "Academias", professorLogado.getAcademia());
        const academiadocSnapshot = await getDoc(academiaDocRef);

        if (firebasedocSnapshot.exists() && academiadocSnapshot.exists()) {
            const acadedocData = academiadocSnapshot.data();
            const academiaguardada = acadedocData.nome; 
            await AsyncStorage.setItem('academia', String(academiaguardada));
            
            console.log('Academia guardada salva:', academiaguardada);
            console.log('Versão do Firebase salva:', firebaseVersion);
            */
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
    useEffect(() => {
        const fetchAndCheckFirebaseVersion = async () => {
            try {
                const db = getFirestore();
                const firebaseRef = doc(db, "Versao", "versao");

                const docSnapshot = await getDoc(firebaseRef);
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    const firebaseVersion = docData.firebase; 
                    console.log('Versão do Firebase no Firestore:', firebaseVersion);

                    const storedVersion = await AsyncStorage.getItem('firebase');
    
                    if (storedVersion !== String(firebaseVersion)) {
                        console.log(`Mudança detectada: ${storedVersion} => ${firebaseVersion}`);

                        await AsyncStorage.clear();
                        await AsyncStorage.setItem('firebase', String(firebaseVersion));
    
                        Alert.alert('Aviso', 'Os dados locais foram atualizados devido à mudança de banco de dados.');
                    } else {
                        console.log('Versão do banco de dados não mudou.');
                    }
                } else {
                    console.error('Erro: Documento "versao" não encontrado na coleção "Versao".');
                }
            } catch (error) {
                console.error('Erro ao verificar a versão do banco de dados:', error);
            }
        };
    
        fetchAndCheckFirebaseVersion();
        getValueFunction();
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
        console.log('ProfessorLocal', professorLocalTeste)
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
                        
                        if (!dadosProfessor.status || dadosProfessor.status === "Pendente" || dadosProfessor.status === false) {
                            alert("Seu cadastro está pendente. Aguarde a aprovação do coordenador.");
                        } else {
                            if (conexao) {
                                await firebase.auth().signInWithEmailAndPassword(emailProf, senhaProf);
                            }
                        
                            checkVersion();
                            navigation.navigate('Principal', { professor: dadosProfessor , dadosverif}); 
                        
                        }                        
                        }
                    }

                } catch (error) {
                    console.error('Erro ao obter dados do AsyncStorage ou fazer login:', error);
                }
        }
    };

    useEffect(() => {
        fetchProfessorData()
    }, [])

    const [totalLeituras, setTotalLeituras] = useState(0)
    const fetchProfessorData = async () => {
        const firebaseBD = getFirestore();
    
        try {   
            const professoresQuery = query(
                collectionGroup(firebaseBD, 'Professores'),
                where('email', '==', email)
            );
            
            const querySnapshot = await getDocs(professoresQuery);
            let leituraContador = 0; 
            let loginValido = false;
    
            querySnapshot.forEach((doc) => {
                const professorData = doc.data();
                console.log('Professor encontrado:', professorData);
    
                if (professorData.senha === password) {
                    loginValido = true;
                    setProfessorData(professorData);
                    professorLogado.setNome(professorData.nome);
                    professorLogado.setEmail(professorData.email);
                    professorLogado.setSenha(professorData.senha);
                    professorLogado.setDataNascimento(professorData.dataNascimento);
                    professorLogado.setSexo(professorData.sexo);
                    professorLogado.setProfissao(professorData.profissao);
                    professorLogado.setCpf(professorData.cpf);
                    professorLogado.setTelefone(professorData.telefone);
                    enderecoProfessor.setBairro(professorData.endereco.bairro);
                    enderecoProfessor.setCep(professorData.endereco.cep);
                    enderecoProfessor.setCidade(professorData.endereco.cidade);
                    enderecoProfessor.setEstado(professorData.endereco.estado);
                    enderecoProfessor.setRua(professorData.endereco.rua);
                    enderecoProfessor.setNumero(professorData.endereco.numero);
                    professorLogado.setAcademia(professorData.academia);

                    const professorString = JSON.stringify(professorData);
                    AsyncStorage.setItem('professorLocal', professorString);
                }
                leituraContador += 1; 
            });
    
            if (!loginValido) {
                Alert.alert(
                    "Erro de Login",
                    "E-mail ou senha inválidos. Por favor, tente novamente."
                );
            } else {
                console.log('Login válido!');
                checkVersion();
                navigation.navigate('Principal', { professor: professorLogado,verif: dadosverif });
            }
            setTotalLeituras(leituraContador);
            console.log('Total de leituras:', leituraContador);
    
        } catch (error) {
            console.log('Erro ao buscar os dados do professor:', error);
            Alert.alert(
                "Erro",
                "Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde."
            );
        } finally {
            saveValueFunction();
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
             <ScrollView style={style.container}>
            <View >
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
                    <View style={style.passwordContainer}>
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        style={[style.inputText, Estilo.corLight, style.passwordInput]}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={style.showPasswordButton}>
                        <FontAwesome5
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color="#0066FF"
                        style={[{}]}
                        />
                    </TouchableOpacity>
                    </View>

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
                                        placeholder="Email@exemplo.com"
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
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        marginBottom: '5%',
        height: '100%'
    },
    areaLogo: {
        marginTop: '5%'
    },
    areaLogin: {
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
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
        elevation: 10,
    },
    ultimoLink: {
        top: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 0,
        paddingHorizontal: 0,
        paddingBottom: 20,
    },
      showPasswordButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }], 
        zIndex: 1,
    }
})