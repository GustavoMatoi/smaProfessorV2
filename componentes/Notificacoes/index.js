import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, StyleSheet, ScrollView, Dimensions} from 'react-native'
import Notificacao from "./Notificacao"
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import estilo from "../estilo"
import { professorLogado } from "../LoginScreen";
export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);
  
    useEffect(() => {
        async function getNotificacoes() {
          const db = getFirestore();
          const notificacoesRef = collection(db,"Academias",professorLogado.getAcademia(),"Professores",professorLogado.getNome(),"Notificações");
          
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
        <Text>
        {notificacoes.map((notificacao, index) => (
            <View style={{width: Dimensions.get('screen').width}}>
                      <Notificacao key={index} tipo={notificacao.tipo} titulo={notificacao.titulo} data={notificacao.data} texto={notificacao.texto} remetente={notificacao.remetente}/>

            </View>
))} 
        </Text>
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