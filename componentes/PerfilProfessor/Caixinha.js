import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native'
import estilo from "../estilo"
import {useFonts} from 'expo-font'
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../LoginScreen"
import NetInfo from '@react-native-community/netinfo'

export default props => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type == 'wifi' || state.type == 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Regular.ttf'),
    })
    const getStoredImage = async () => {
        const storage = getStorage();
        const storeRef = ref(storage, `foto${professorLogado.getCpf()}.jpg`);
  
        try {
            const url = await getDownloadURL(storeRef);
            setImageUrl(url);
            setLoading(false); 
        } catch (error) {
              const url  = 'https://firebasestorage.googleapis.com/v0/b/shapemeappbdteste.appspot.com/o/fotopadrao.jpg?alt=media&token=c1f35033-a208-40ce-8d69-52279a798210'
              setImageUrl(url)
              console.log(error);
            setLoading(false); 
        }
    };

    useEffect(() => {
        getStoredImage();
    }, []);

    return (
        <View style={[style.container, estilo.corLightMenos1, estilo.centralizado]}>
            {conexao ? loading ? (
              <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, estilo.centralizado, estilo.tituloH427px, {marginTop: 15}]}>
                  Carregando foto...
              </Text>
          ) : (
              <Image 
                    style={[estilo.corSecundaria, style.foto, estilo.centralizado]}
                  source={imageUrl ? { uri: imageUrl } : "Não achou a imagem"} />
          ) : <View style={[estilo.corSecundaria, style.foto, estilo.centralizado]}/>}
            <View>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado, {marginTop: '5%'}]}>{professorLogado.getNome()}</Text>
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        width: '90%',
        height: 180,
        borderRadius: 30,
        borderWidth: 1,
        marginTop: '-25%'
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: -100
    },
    texto: {
     fontFamily: 'Montserrat'   
    }
})