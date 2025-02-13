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
import cep from 'cep-promise'
import axios from 'axios';

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

    
    const [cepEndereco, setCepEndereco] = useState('')
    const [cepInvalido, setCepInvalido] = useState(false)

    const [sexo, setSexo] = useState('')
    const [academia, setAcademia] = useState('')

    const [estado, setEstado] = useState('')
    const [estadoInvalido, setEstadoInvalido] = useState(false)

    const [cidade, setCidade] = useState('')
    const [cidadeInvalida, setCidadeInvalida] = useState(false);
    const [cidades, setCidades] = useState([]);

    
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

    const [numeroInvalido, setNumeroInvalido] = useState('')
  

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
      

      firebase.auth().createUserWithEmailAndPassword(novoProfessor.getEmail(), novoProfessor.getSenha())
      .then((userCredential) => {
        console.log(userCredential);
    
        setDoc(doc(firebaseBD, "Academias", `${novoProfessor.getAcademia()}`, "Professores", `${novoProfessor.getEmail()}`), {
          nome: novoProfessor.getNome(),
          cpf: novoProfessor.getCpf(),
          dataNascimento: novoProfessor.getDataNascimento(),
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
          status: "Pendente",
        }).then(() => {
          alert("Novo usuário criado com sucesso! Aguarde a aprovação do coordenador para realizar login.");
    
          setDoc(doc(firebaseBD, "Academias", `${novoProfessor.getAcademia()}`, "Professores", `${novoProfessor.getEmail()}`, "Notificações", `Notificação${ano}|${mes}|${dia}`), {
            data: `${dia}/${mes}/${ano}`,
            nova: false,
            remetente: 'Gustavo & cia',
            texto: "É um prazer recebê-lo em nosso aplicativo. Desenvolvido por Gustavo Vaz Teixeira, João Bastista, Mateus Novaes, Sérgio Muinhos e Marcelo Patrício, em parceria com o Instituto Federal do Sudeste de Minas Gerais, o ShapeMeApp foi criado para proporcionar a você uma experiência interativa e personalizada durante seus treinos.",
            tipo: "sistema",
            titulo: "Bem-vindo ao ShapeMeApp!"
          });
    
          navigation.navigate("Login");
        }).catch(error => {
          let errorMessage = '';
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'O email fornecido já está em uso por outra conta.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'O email fornecido é inválido.';
              break;
            case 'auth/weak-password':
              errorMessage = 'A senha fornecida é muito fraca. Escolha uma senha mais forte.';
              break;
            default:
              errorMessage = 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
          }
    
          Alert.alert('Erro no cadastro', errorMessage);
          console.log(error);
        });
      }).catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'O email fornecido já está em uso por outra conta.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'O email fornecido é inválido.';
            break;
          case 'auth/weak-password':
            errorMessage = 'A senha fornecida é muito fraca. Escolha uma senha mais forte.';
            break;
          default:
            errorMessage = 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
        }
  
        Alert.alert('Erro no cadastro', errorMessage);
        console.log(error);
      });
    }    
          //Validação do estado
          const estadosBrasileiros = [
            { label: 'Acre', value: 'AC' },
            { label: 'Alagoas', value: 'AL' },
            { label: 'Amapá', value: 'AP' },
            { label: 'Amazonas', value: 'AM' },
            { label: 'Bahia', value: 'BA' },
            { label: 'Ceará', value: 'CE' },
            { label: 'Distrito Federal', value: 'DF' },
            { label: 'Espírito Santo', value: 'ES' },
            { label: 'Goiás', value: 'GO' },
            { label: 'Maranhão', value: 'MA' },
            { label: 'Mato Grosso', value: 'MT' },
            { label: 'Mato Grosso do Sul', value: 'MS' },
            { label: 'Minas Gerais', value: 'MG' },
            { label: 'Pará', value: 'PA' },
            { label: 'Paraíba', value: 'PB' },
            { label: 'Paraná', value: 'PR' },
            { label: 'Pernambuco', value: 'PE' },
            { label: 'Piauí', value: 'PI' },
            { label: 'Rio de Janeiro', value: 'RJ' },
            { label: 'Rio Grande do Norte', value: 'RN' },
            { label: 'Rio Grande do Sul', value: 'RS' },
            { label: 'Rondônia', value: 'RO' },
            { label: 'Roraima', value: 'RR' },
            { label: 'Santa Catarina', value: 'SC' },
            { label: 'São Paulo', value: 'SP' },
            { label: 'Sergipe', value: 'SE' },
            { label: 'Tocantins', value: 'TO' },
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

  const encontrarEndereco = async () => {
    console.log('chegou aqui', cepEndereco)
    try {

      const response = await cep(cepEndereco);
      console.log('response', response)
      setCidade(response.city || '');
      setEstado(response.state || '');
      setBairro(response.neighborhood || '');
      setRua(response.street || '');
      console.log('Dados recebidos:', response.data);
      setCepInvalido(false);
    } catch (error) {
      console.error('Erro na busca do CEP:', error);
      Alert.alert('Erro', 'CEP não encontrado.');
      setCepInvalido(true);
    }
  };
  const buscarCidadesPorEstado = async (estado) => {
    try{
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      );
      const listaCidades = response.data.map((municipio) => municipio.nome);
      setCidades(listaCidades);
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro ao buscar as cidades.');
      setCidades([]);
      }
  };

  useEffect(() => {
    if (estado) {
      buscarCidadesPorEstado(estado);
    }
  }, [estado]);


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
          <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria]}>
            INFORME SEU CEP:
          </Text>
          <TextInput
            style={[
              style.inputText,
              estilo.sombra,
              estilo.corLight,
              cepInvalido ? { borderColor: 'red', borderWidth: 1 } : {},
            ]}
            placeholder="exemplo: 36180000 Para Rio Pomba MG"
            type="zip-code"
            onChangeText={(text) => setCepEndereco(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={[estilo.corPrimaria, estilo.sombra,style.botao, estilo.botao, {left: '-5%'}]} onPress={() => encontrarEndereco()} >
            <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>Buscar</Text>
          </TouchableOpacity>
        </View>
                  <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria]}>
                    ESTADO:
                    </Text>
                    {estado ?  <BotaoSelect
                              options={estadosBrasileiros.map((e) => e.label)}
                              onChange={(value) => {
                                const estadoSelecionado = estadosBrasileiros.find((e) => e.label === value);
                                setEstado(estadoSelecionado.value);
                              }}
                              titulo="Selecione o estado"
                              max={1}
                              selecionado={estado}
                              select={estado}
                            />: 
                              <BotaoSelect
                              options={estadosBrasileiros.map((e) => e.label)}
                              onChange={(value) => {
                                const estadoSelecionado = estadosBrasileiros.find((e) => e.label === value);
                                setEstado(estadoSelecionado.value);
                              }}
                              titulo="Selecione o estado"
                              max={1}
                              selecionado={!!estado}
                              select={estado}
                            />}
                  
                </View>

                <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria]}>
                    CIDADE: 
                    </Text>
                    {cidade ?<BotaoSelect
                                options={cidades}
                                onChange={setCidade}
                                titulo="Selecione a cidade"
                                max={1}
                                selecionado={cidade}
                                select={cidade}
                              /> : 
                                <BotaoSelect
                                options={cidades}
                                onChange={setCidade}
                                titulo="Selecione a cidade"
                                max={1}
                                selecionado={!!cidade}
                              />}
                  
                </View>
                <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria]}>
                    BAIRRO:
                  </Text>
                  {bairro?<TextInput
                    style={[style.inputText, estilo.sombra, estilo.corLight, numeroInvalido ? { borderWidth: 1, borderColor: 'red' } : {}]}
                    placeholder="Informe seu bairro"
                    value= {bairro}
                    onChangeText={(text) => setBairro(text)}
                  />:<TextInput
                    style={[style.inputText, estilo.sombra, estilo.corLight, numeroInvalido ? { borderWidth: 1, borderColor: 'red' } : {}]}
                    placeholder="Informe seu bairro"
                    onChangeText={(text) => setBairro(text)}
                  />}
                </View>
                <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, style.Montserrat, estilo.textoCorSecundaria]}>
                    RUA:
                  </Text>
                  {rua ?<TextInput
                    style={[style.inputText, estilo.sombra, estilo.corLight, numeroInvalido ? { borderWidth: 1, borderColor: 'red' } : {}]}
                    placeholder="Informe sua rua"
                    value ={rua}
                    onChangeText={(text) => setRua(text)}
                  />
                  :<TextInput
                    style={[style.inputText, estilo.sombra, estilo.corLight, numeroInvalido ? { borderWidth: 1, borderColor: 'red' } : {}]}
                    placeholder="Informe sua rua"
                    onChangeText={(text) => setRua(text)}
                  />}
                </View>

                  <View style={style.alinhamentoBotoesPequenos}>
                      <View style={[style.inputArea, style.campoPequeno]}>
                          <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NÚMERO:</Text>
                          <TextInput 
                              style={[style.inputText, estilo.sombra, estilo.corLight,
                                numeroInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                              
                              ]} placeholder="Número da sua residência"
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
                    enderecoProfessor.setCep(cepEndereco)
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
                      if(enderecoProfessor.getNumero() == '') setNumeroInvalido(true)
                      
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