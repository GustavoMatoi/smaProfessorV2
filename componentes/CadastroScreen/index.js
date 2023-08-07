import React, {useState, useEffect} from "react"
import { Text, View, StyleSheet,ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert, Modal} from "react-native"
import estilo from "../estilo"
import RadioBotao from "../RadioBotao"
import { useFonts } from 'expo-font';
import BotaoSelect from "../BotaoSelect"
import { TextInputMask } from 'react-native-masked-text';
import {Professor} from '../../classes/Professor'
import { AppLoading } from 'expo';
import {Endereco} from '../../classes/Endereco'
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc, querySnapshot, QueryStartAtConstraint} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";

export default ({navigation}) => {
    const novoProfessor = new Professor('', '', '', '', '', '', '')
    const enderecoProfessor = new Endereco('', '', '', '', '', '', '')

  const [conexao, setConexao] = useState(true);

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

    const [nome, setNome] = useState('')
    const [nomeInvalido, setNomeInvalido] = useState(false);

    const validaNome = (text) => {
      const nomeValido = /^[\p{L}\s]*$/u;
      if (nomeValido.test(text)) {
        setNomeInvalido(false);
      } else {
        setNomeInvalido(true);
      }
      setNome(text);
    };


    const [cpf, setCpf] = useState('')
    const [cpfInvalido, setCpfInvalido] = useState(false);

    const validaECorrigeCPF = (text) => {
        setCpf(text);
        setCpfInvalido(!validarCpf(text));
      };

    const [diaNascimento, setDiaNascimento] = useState('')
    const [mesNascimento, setMesNascimento] = useState('')
    const [anoNascimento, setAnoNascimento] = useState('')

    const limitarDiaNascimento = (dia) => {
      const diaMaximo = 31;
      const diaDigitado = parseInt(dia);
      if (!diaDigitado) { // verifica se a entrada é vazia ou não numérica
        return '';
      }
      if (diaDigitado > diaMaximo) {
        return diaMaximo.toString();
      }
      return diaDigitado.toString();
    }
  //Validação do mes
  const limitarMesNascimento = (mes) => {
      const mesMaximo = 12;
      const mesDigitado = parseInt(mes);
      if (!mesDigitado) { // verifica se a entrada é vazia ou não numérica
        return '';
      }
      if (mesDigitado > mesMaximo) {
        return mesMaximo.toString();
      }
      return mesDigitado.toString();
    }

  //Validação do ano
  const limitarAnoNascimento = (ano) => {
      const data = new Date();
      const anoMaximo = data.getFullYear();
      const anoDigitado = parseInt(ano);
      if (anoDigitado > anoMaximo) {
        return anoMaximo.toString();
      }
      return ano;
    }


    const validaProfissao = (text) => {
      const profissaoValida = /^[a-zA-Z\s]*$/;
      if (profissaoValida.test(text)) {
        setProfissaoInvalida(false);
      } else {
        setProfissaoInvalida(true);
      }
      setProfissao(text);
    };

    
    const [academiasCadastradas, setAcademiasCadastradas] = useState([])
    const [professoresDaAcademia, setProfessoresDaAcademia] = useState([])
    const [carregouProf, setCarregouProf] = useState(false)

    const [telefone, setTelefone] = useState('')
    const [telefoneValido, setTelefoneValido] = useState(true);

    const validaTelefone = (text) => {
      const telefoneNumeros = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      setTelefoneValido(telefoneNumeros.length >= 10);
      setTelefone(text);
    };
    const [profissao, setProfissao] = useState('')
    const [profissaoInvalida, setProfissaoInvalida] = useState(false)

    
    const [cep, setCep] = useState('')
    const [cepInvalido, setCepInvalido] = useState(false)

    const [sexo, setSexo] = useState('')
    const [academia, setAcademia] = useState('')

    const [estado, setEstado] = useState('')
    const [estadoInvalido, setEstadoInvalido] = useState(false)

    const [cidade, setCidade] = useState('')
    const [cidadeInvalida, setCidadeInvalida] = useState(false);


    
    const [bairro, setBairro] = useState('')
    const [bairroInvalido, setBairroInvalido] = useState(false)

    
    const [rua, setRua] = useState('')
    const [ruaInvalida, setRuaInvalida] = useState(false)

    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    
    const [email, setEmail] = useState('')
    const [emailInvalido, setEmailInvalido] = useState(false)

    const [senha, setSenha] = useState('')
    const [senhaInvalida, setSenhaInvalida] = useState(false)

    const [selectedOption, setSelectedOption] = useState('');
    const [selected, setSelected] = useState(0)


    const handleSelectChange = (value) => {
      setSelectedOption(value)
      setAcademia(value);
        }
        
    const handleFinalizarCadastro = () => {
      const data = new Date()
      const dia = data.getDate()
      const mes = data.getMonth() + 1
      const ano = data.getFullYear()
      

      setDoc(doc(firebaseBD, "Academias", `${novoProfessor.getAcademia()}`, "Professores", `${novoProfessor.getNome()}`), {
          nome: novoProfessor.getNome(),
          cpf: novoProfessor.getCpf(),
          dataNascimento:  novoProfessor.getDataNascimento(),
          telefone: novoProfessor.getTelefone(),
          profissao: novoProfessor.getProfissao(),
          sexo: novoProfessor.getSexo(),
          academia: novoProfessor.getAcademia(),
          endereco: {
            rua: enderecoProfessor.getRua(),
            cidade: enderecoProfessor.getCidade(),
            estado: enderecoProfessor.getEstado(),
            numero: enderecoProfessor.getNumero(),
            complemento: enderecoProfessor.getComplemento(),
          },
          email: novoProfessor.getEmail(),
          senha: novoProfessor.getSenha(),
        }).then(() => {
          alert("Novo usuário criado com sucesso!")
          firebase.auth().createUserWithEmailAndPassword(novoProfessor.getEmail(), novoProfessor.getSenha())
          .then((userCredential) => {
            console.log(userCredential)

          }).catch((error) => {
            alert("Ocorreu um erro no seu cadastro.")
          })
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe um usuário cadastrado com este email.`)
          });
          setDoc(doc(firebaseBD,"Academias", `${novoProfessor.getAcademia()}`, "Professores", `${novoProfessor.getNome()}`, "Notificações", `Notificação${ano}|${mes}|${dia}`), {
            data: `${dia}/${mes}/${ano}`,
            nova: false,
            remetente: 'Gustavo & cia',
            texto: "É um prazer recebê-lo em nosso aplicativo. Desenvolvido por Gustavo Vaz Teixeira, João Bastista, Mateus Novaes, Sérgio Muinhos e Marcelo Patrício, em parceria com o Instituto Federal do Sudeste de Minas Gerais, o ShapeMeApp foi criado para proporcionar a você uma experiência interativa e personalizada durante seus treinos.",
            tipo: "sistema",
            titulo: "Bem-vindo ao ShapeMeApp!"
          })
          navigation.navigate("Login")
    }
          //Validação do estado
        const estadosBrasileiros = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
      ];
      const validaEstado = (text) => {
        const estadoUpper = text.toUpperCase();
        if (estadosBrasileiros.includes(estadoUpper)) {
          setEstadoInvalido(false);
        } else {
          setEstadoInvalido(true);
        }
        setEstado(estadoUpper);
      };

  //Validação da cidade
  const validaCidade = (text) => {
    // Apenas um exemplo simples de validação: a cidade deve ter pelo menos 2 caracteres
    const cidadeValida = text.length >= 3;
  
    // Atualize o estado da cidade e o estado de validação
    setCidade(text);
    setCidadeInvalida(!cidadeValida);
  };

    //Validação do bairro
    const validaBairro = (text) => {
        const bairroValido = text.length >= 5;
    
        setBairro(text)
        setBairroInvalido(!bairroValido)
      }
    
      //Validação da rua
      const validaRua = (text) => {
        const ruaValida = text.length >= 5;
    
        setRua(text)
        setRuaInvalida(!ruaValida)
      }
    
      //Validação do numero
    
      //Validação do complemento
    
       //Validação do Email
       const validaEmail = (text) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(text)) {
          setEmailInvalido(false);
        } else {
          setEmailInvalido(true);
        }
        setEmail(text);
      };
    
      //Validação da senha
      const validaSenha = (text) => {
        if (text.length >= 6) {
          setSenhaInvalida(false);
        } else {
          setSenhaInvalida(true);
        }
        setSenha(text);
      };
    
      useEffect(() => {
        const carregarAcademias = async () => {
          try {
            const db = getFirestore();
            const academiasRef = collection(db, "Academias");
            const querySnapshot = await getDocs(academiasRef);
        
            const academias = [];
            querySnapshot.forEach((doc) => {
              const nome = doc.data().nome;
              academias.push(nome);
            });
        
            setAcademiasCadastradas(academias);
          } catch (error) {
            console.log(error);
          }
        };
        carregarAcademias();
      }, [])

    return (
                <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
                  {!conexao ? <ModalSemConexao/> 
                  : 
                  <SafeAreaView style={style.container}>      

                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria,  style.titulos]}>Primeiramente, identifique-se</Text>
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME COMPLETO:</Text>
                      <View>
                      <TextInput 
                      placeholder={'Informe seu nome completo'} 
                      placeholderTextColor={'#CFCDCD'} 
                      style={[
                          estilo.sombra, 
                          estilo.corLight, 
                          style.inputText,
                          nomeInvalido? {borderWidth: 1, borderColor: 'red'} : {}
                      ]}
                      keyboardType={'default'}
                      value={nome}
                      onChangeText={(text) => {validaNome(text)}}
                      >
                      </TextInput>
                      </View>                        
                  </View>
  
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>CPF:</Text>
                      <TextInputMask 
                              type={'cpf'}
                              placeholder={'Informe seu cpf'} 
                              placeholderTextColor={'#CFCDCD'} 
                              style={[
                              estilo.sombra, 
                              estilo.corLight, 
                              style.inputText,
                              cpfInvalido ? {borderWidth: 1, borderColor: 'red'} : {}
                              ]}
                              value={cpf}
                              onChangeText={(text) => setCpf(text)}   
                          >
                          </TextInputMask>

                          </View>
  
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DATA DE NASCIMENTO:</Text>
                          <View style={[style.areaInputDataNascimento]}>
                          <TextInput 
                              style={[style.botaoInputDataNascimento, estilo.sombra]} placeholder="dia"
                              value={diaNascimento}
                              onChangeText={(text) => setDiaNascimento(limitarDiaNascimento(text))}
                              maxLength={2}
                              keyboardType='numeric'
                              ></TextInput>

                              <TextInput 
                              style={style.botaoInputDataNascimento} placeholder="mês"
                              value={mesNascimento}
                              onChangeText={(text) => setMesNascimento(limitarMesNascimento(text))}
                              maxLength={2}
                              keyboardType='numeric'
                              ></TextInput>
                              <TextInput 
                              style={style.botaoInputDataNascimento} 
                              placeholder="ano"
                              value={anoNascimento}
                              onChangeText={(text) => setAnoNascimento(limitarAnoNascimento(text))}
                              maxLength={4}
                              keyboardType='numeric'
                              />
                          </View>
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>NÚMERO DE TELEFONE:</Text>
                      <TextInputMask
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        telefoneValido ? {} : {borderWidth: 1, borderColor: 'red'}
                      ]}
                      placeholder="(00)000000000"
                      value={telefone}
                      onChangeText={(text) => validaTelefone(text)}
                      type={'cel-phone'}
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                      }}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>OCUPAÇÃO:</Text>
                      <TextInput 
                      style={[
                      style.inputText, 
                      estilo.sombra, 
                      estilo.corLight,
                      profissaoInvalida ? { borderColor: '#FF6262', borderWidth: 1 } : {}
                      ]}
                      placeholder="ex: Professor"
                      value={profissao}
                      onChangeText={(text) => validaProfissao(text)}
                  ></TextInput>
                  </View>

                  <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria,{marginBottom:10}]}>SEXO:</Text>
                  <RadioBotao horizontal options={['Feminino',  'Masculino']}  
                  selected={selected}
                  onChangeSelect={(opt, i) => {
                  setSelected(i)}}
                  value={selected}
                  ></RadioBotao>
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>ACADEMIA:</Text>
                      <BotaoSelect     selecionado={selectedOption == '' ? false : true}  onChange={handleSelectChange} titulo='Academias cadastradas' max={1} options={academiasCadastradas}>
                      </BotaoSelect>
                  </View>

                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.titulos]}>Agora, informe sua residência</Text>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>INFORME SEU CEP:</Text>
                      <TextInputMask 
                          style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight
                                              ]}
                          placeholder="ex: 36180-000"
                          value={cep}
                          type={'zip-code'}
                          onChangeText={(text) => setCep(text)}
                          keyboardType='numeric'
                      ></TextInputMask>
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>ESTADO:</Text>
                      <TextInput 
                          style={[
                              style.inputText, 
                              estilo.sombra, 
                              estilo.corLight,
                              estadoInvalido ? { borderColor: '#FF6262', borderWidth: 1 } : {}
                          ]}
                          placeholder="ex: MG"
                          value={estado}
                          onChangeText={(text) => validaEstado(text)}
                          maxLength={2}
                          ></TextInput>
                      </View>


                      <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>CIDADE:</Text>
                    <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        cidadeInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua cidade"
                      value={cidade}
                      onChangeText={(text) => validaCidade(text)}
                    />
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>BAIRRO:</Text>
                      <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        bairroInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe seu bairro"
                      value={bairro}
                      onChangeText={(text) => validaBairro(text)}
                    />
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>RUA:</Text>
                      <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        ruaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua rua"
                      value={rua}
                      onChangeText={(text) => validaRua(text)}
                    />
                  </View>

                  <View style={style.alinhamentoBotoesPequenos}>
                      <View style={[style.inputArea, style.campoPequeno]}>
                          <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NÚMERO:</Text>
                          <TextInput 
                              style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="Número da sua residência"
                              value={numero}
                              keyboardType='numeric'
                              onChangeText={(text) => setNumero(text)}
                              
                              ></TextInput>
                      </View>
                      <View style={[style.inputArea, style.campoPequeno]}>
                          <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>COMPLEMENTO:</Text>
                          <TextInput 
                              style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="complemento"
                              value={complemento}
                              onChangeText={(text) => setComplemento(text)}
                              ></TextInput>
                      </View> 
                  </View>
                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria , style.titulos]}>Por fim, seus dados de login:</Text>
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>EMAIL:</Text>
                      <TextInput 
                      style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight,
                          emailInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe seu e-mail"
                      value={email}
                      onChangeText={(text) => validaEmail(text)}
                      ></TextInput>
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>SENHA:</Text>
                      <TextInput 
                      secureTextEntry={true}
                      style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight,
                          senhaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua senha"
                      value={senha}
                      onChangeText={(text) => validaSenha(text)}
                      ></TextInput>
                  </View>
                  <TouchableOpacity 
                  style={[estilo.corPrimaria, style.botao, estilo.sombra, estilo.botao]}
                  onPress={()=>{

                    novoProfessor.setNome(nome)
                    novoProfessor.setCpf(cpf)
                    novoProfessor.setDataNascimento(`${diaNascimento}/${mesNascimento}/${anoNascimento}`)
                    novoProfessor.setTelefone(telefone)
                    novoProfessor.setProfissao(profissao)
                    novoProfessor.setAcademia(academia)
                    enderecoProfessor.setCep(cep)
                    enderecoProfessor.setEstado(estado)
                    enderecoProfessor.setCidade(cidade)
                    enderecoProfessor.setBairro(bairro)
                    enderecoProfessor.setRua(rua)
                    enderecoProfessor.setNumero(numero)
                    enderecoProfessor.setComplemento(complemento)
                    novoProfessor.setEmail(email)
                    novoProfessor.setSenha(senha)
                    novoProfessor.setEndereco(enderecoProfessor)
                    console.log(novoProfessor)
                    selected == 0 ? novoProfessor.setSexo('Feminino') : novoProfessor.setSexo('Masculino')


                    if(novoProfessor.getNome() == '' || novoProfessor.getAcademia() == '' || selectedOption == '' 
                    || novoProfessor.getCpf() == '' || novoProfessor.getDataNascimento() == '' || novoProfessor.getEmail() == '' 
                    || novoProfessor.getSenha() == '' || novoProfessor.getSexo() == '' || novoProfessor.getTelefone() == '' 
                    || enderecoProfessor.getCep() == '' || enderecoProfessor.getCidade() == '' || enderecoProfessor.getEstado() == ''
                    || enderecoProfessor.getRua() == ''){
                      Alert.alert("Há campos não preenchidos.", "Preencha os campos antes de prosseguir.")
                      if(novoProfessor.getNome() == '') setNomeInvalido(true)
                      if(novoProfessor.getCpf() == '') setCpfInvalido(true)
                      if(novoProfessor.getTelefone() == '') setTelefoneValido(false)
                      if(novoProfessor.getProfissao() == '') setProfissaoInvalida(true)
                      if(enderecoProfessor.getCep() == '') setCepInvalido(true)
                      if(enderecoProfessor.getRua() == '') setRuaInvalida(true)
                      if(enderecoProfessor.getEstado() == '') setEstadoInvalido(true)
                      if(enderecoProfessor.getCidade() == '') setCidadeInvalida(true)
                      if(enderecoProfessor.getBairro() == '') setBairroInvalido(true)
                      if(novoProfessor.getEmail() == '') setEmailInvalido(true)
                      
                    } else {
                      handleFinalizarCadastro()
                    }
                   }}>
                      <Text 
                  style={[estilo.tituloH523px, estilo.textoCorLight]}>CADASTRAR-SE</Text>
                  </TouchableOpacity>
                  </SafeAreaView>
                  }
                   

                </ScrollView>
        )
}

const style = StyleSheet.create({
    container:{
        marginVertical: '2%',
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    titulos: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    inputText: {
        width: '90%',
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    areaInputDataNascimento: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    botaoInputDataNascimento: {
        width:'30%',
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,

    },

    campoPequeno: {
        width: '40%'
    },
    alinhamentoBotoesPequenos: {
        flexDirection: 'row',
        width: '100%'
    }
})