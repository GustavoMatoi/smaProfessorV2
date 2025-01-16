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
    useEffect(() => {
        const verificarAcademia = async () => {
            try {
                // Recupera os dados do professor armazenados localmente
                const professorLocal = await AsyncStorage.getItem('professorLocal');
                const professorData = professorLocal ? JSON.parse(professorLocal) : null;
    
                if (professorData && professorData.academia) {
                    // Recupera todas as chaves armazenadas no AsyncStorage
                    const keys = await AsyncStorage.getAllKeys();
    
                    // Filtra apenas as chaves dos alunos (identificados por e-mail)
                    const alunoKeys = keys.filter((key) => key.includes('@')); // Supondo que os e-mails sejam as chaves dos alunos
                    console.log('Chaves dos alunos:', alunoKeys);
    
                    // Obtém os dados dos alunos correspondentes às chaves
                    const alunos = await Promise.all(
                        alunoKeys.map(async (key) => {
                            const alunoData = await AsyncStorage.getItem(key);
                            return alunoData ? JSON.parse(alunoData) : null;
                        })
                    );
                    const alunosIncompativeis = alunos.some(
                        (aluno) => aluno && aluno.academia !== professorData.academia
                    );
    
                    if (alunosIncompativeis) {
                        console.log('Alunos com academias incompatíveis encontrados no async storage.');
                        await AsyncStorage.clear(); 
                        Alert.alert(
                            "Academia incompatível",
                            "Há alunos que pertencem a academias diferentes da academia do professor local."
                        );
                    } else {
                        console.log('Todos os alunos pertencem à mesma academia que o professor.');
                        try {
                            const keys = await AsyncStorage.getAllKeys();
                            console.log('chaves',keys)
                            for (const key of keys) {
                                const value = await AsyncStorage.getItem(key);
                                console.log(`Chave: ${key}, Valor: ${value}`);
                            }
                        } catch (error) {
                            console.error('Erro ao obter dados do AsyncStorage:', error);
                        }
                    }

                    alunos.forEach((aluno, index) => {
                        if (aluno) {
                            console.log(`Aluno ${index + 1}:`, aluno);
                        }
                    });
                }
            } catch (error) {
                console.error('Erro ao verificar academias:', error);
            }
        };
    
        verificarAcademia();
        getValueFunction();
    }, []);

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
            const db = getFirestore();
            const firebaseRef = doc(db, "Versao", "versao");
            const docSnapshot = await getDoc(firebaseRef);
    
            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                const firebaseVersion = docData.firebase; 
                if (email) {
                    await AsyncStorage.setItem('email', email);
                    setEmail(''); 
                }
    
                if (password) {
                    await AsyncStorage.setItem('senha', password);
                    setPassword(''); 
                }
                await AsyncStorage.setItem('firebase', String(firebaseVersion));
                console.log('Versão do Firebase salva:', firebaseVersion);
            } else {
                console.error('Erro: Documento "versao" não encontrado na coleção "Versao".');
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
                            navigation.navigate('Principal', { professor: dadosProfessor }); }                        
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
    
            querySnapshot.forEach(async (doc) => {
                const professorData = doc.data();
                console.log('Professor encontrado:', professorData);
    
                if (professorData.senha === password) {
                    loginValido = true;

                    const savedProfessor = await AsyncStorage.getItem('professorLocal');
                    const savedData = savedProfessor ? JSON.parse(savedProfessor) : null;
                    console.log("dados salvos",savedData)
                    if (savedData && savedData.academia !== professorData.academia) {
                        console.log('Academia incompatível. Limpando dados locais.');
                        await AsyncStorage.clear(); 
                        Alert.alert(
                            "Academia incompatível",
                            "Os dados locais foram apagados porque a academia vinculada não corresponde."
                        );
                    } else {
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
                        await AsyncStorage.setItem('professorLocal', professorString);
                    }
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
                navigation.navigate('Principal', { professor: professorLogado });
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
    };
    
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