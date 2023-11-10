import React,{useState, useEffect} from "react"
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet, BackHandler, Animated } from 'react-native'
import estilo from "./estilo"
import Logo from "./Logo"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebase, firebaseBD } from './configuracoes/firebaseconfig/config'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { Professor } from "../classes/Professor";
import { Endereco } from "../classes/Endereco";
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from "@react-native-community/netinfo"

let professorLogado = new Professor('', '', '', '', '', '', '')
let enderecoProfessor = new Endereco('', '', '', '', '', '', '')

export {professorLogado, enderecoProfessor}
export default ({navigation}) => {
    const [carregando, setCarregando] = useState(true)
    
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
      })
  
      return () => {
        unsubscribe()
      }
    }, [])
    
    useEffect(() => { 
      
        const fetchProfessorData = async () => {
          try {
            const user = firebase.auth().currentUser;
            const email = user.email;
            const academiaRef = collection(firebaseBD, "Academias");
      
            const querySnapshot = await getDocs(academiaRef);
            for (const academiaDoc of querySnapshot.docs) {
              const academiaNome = academiaDoc.get("nome");
              const professoresRef = collection(firebaseBD, "Academias", academiaNome, "Professores");
              console.log(academiaNome);
      
              const professoresSnapshot = await getDocs(professoresRef);
              for (const professorDoc of professoresSnapshot.docs) {
                if (email == professorDoc.get("email")){
                    const professorData = professorDoc.data();
                    console.log(professorData)
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
                    console.log(professorLogado.getNome())
            }
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchProfessorData()
        console.log(professorLogado.getNome())

        setCarregando(false)
      }, []);
    
      if(carregando){
        return (
            <Spinner
            visible={carregando}
            textContent={'Carregando...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          />
        )
      }
    
    return (
      <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
       
      <SafeAreaView>
        <View style={style.areaLogo}>
        <Logo />
      </View>          
    <View style={style.areaFrase}>
      <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado]}>Boas vindas {carregando ? professorLogado.getNome() : 'Professor'}!</Text>
    </View>
          <View style={style.areaBotoes}>
          <View style={style.containerBotao}>
          <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Seleção Aluno Montar Treino')}>
              <Foundation name="clipboard-pencil" size={120} color="white" />
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MONTAR TREINO</Text>
          </TouchableOpacity>
          </View>                

          <View style={style.containerBotao}>
          <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Seleção Aluno Análise do Programa de Treino')}>
              <View style={[style.iconeBotao]}>
                  <MaterialCommunityIcons name="clipboard-text-search-outline" size={120} color="white" />                
              </View>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>AVALIAÇÕES E FICHAS</Text>
              </TouchableOpacity>
          </View>

          </View>
          <View style={style.areaBotoes}>

          <View style={style.containerBotao}  >
              <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={()=> navigation.navigate('Evolução')}>
                  <View style={[style.iconeBotao]}>
                      <AntDesign name="linechart" size={120} color="white" />           
                  </View>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EVOLUÇÃO DO TREINO</Text>
              </TouchableOpacity>
          </View>
              <View style={[style.containerBotao]} >
                  <TouchableOpacity style={[estilo.corPrimaria, style.botao]}  onPress={()=> {navigation.navigate('Nova avaliação')}}> 
                      <View style={[style.iconeBotao]}>
                      <MaterialCommunityIcons name="clipboard-list-outline" size={120} color="white" />                
                       </View>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>REALIZAR AVALIAÇÃO</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={style.areaBotoes}>

          <View style={style.containerBotao}  >
              <TouchableOpacity style={[estilo.corPrimaria, style.botao]}  onPress={() => navigation.navigate("Exportar CSV")}>
              <View style={[{transform: [{rotate: '-45deg'}]},  style.iconeBotao]}>
                  <Ionicons name="barbell-outline" size={120} color="white" />
              </View>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>DADOS DE TREINO</Text>
              </TouchableOpacity>
          </View>
              <View style={[style.containerBotao]} >
                  <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={()=> navigation.navigate('Chat')}>
                      <View style={[style.iconeBotao]}>
                      <AntDesign name="wechat" size={120} color="white" />           
                       </View>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}> MENSAGENS</Text>
                  </TouchableOpacity>
              </View>
          </View>
          </SafeAreaView >

        </SafeAreaView>

    )
}


const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    areaLogo: {
        paddingTop: '5%',
        height: '10%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '5%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '3%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '100%'
    },
    containerBotao: {
        width: '40%',
        height: '100%',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        borderRadius: 15,
        padding: 5
    },

    iconeBotao: {
        padding: 5,
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

})

