import React, {useState, useEffect} from "react"
import {Text, View,TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native'
import Notificacao from "./Notificacao"
import { collection, getDocs, getFirestore } from "firebase/firestore";
import estilo from "../estilo"
import { professorLogado } from "../LoginScreen";
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';

export default ({route, navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);
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
        async function getNotificacoes() {
          const db = getFirestore();
          const notificacoesRef = collection(db,"Academias",professorLogado.getAcademia(),"Professores",professorLogado.getEmail(),"Notificações");
          
          try {
            const notificacoesSnapshot = await getDocs(notificacoesRef);
            const notificacoesData = notificacoesSnapshot.docs.map((doc) => doc.data());
            setNotificacoes(notificacoesData.reverse());
          } catch (error) {
            console.log("Error fetching notifications:", error);
          } finally {
            setIsLoading(false);
          }
        }
        getNotificacoes();
        console.log(notificacoes)

    }, []);



    return (
<ScrollView style={{width: Dimensions.get('screen').width}}>
  <SafeAreaView style={[estilo.corLightMenos1, {width: '100%'}]}>
    <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, style.alinhamentoTexto]}>Notificações</Text>
        {!conexao ?
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Modo Offline",
            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
          );
        }} style={[estilo.centralizado, { marginVertical: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
          <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
        </TouchableOpacity>
        : notificacoes.map((notificacao, index) => (
          <View style={{width: Dimensions.get('screen').width}}>
                    <Notificacao key={index} tipo={notificacao.tipo} titulo={notificacao.titulo} data={notificacao.data} texto={notificacao.texto} remetente={notificacao.remetente}/>

          </View>
))}
 </SafeAreaView>
</ScrollView>


    )
}

const style = StyleSheet.create({
    alinhamentoTexto: {
        margin: 20
    },
    barraDivisora: {
        alignItems: 'baseline'
    }
})