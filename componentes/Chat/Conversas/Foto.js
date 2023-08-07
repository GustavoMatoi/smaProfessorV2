import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import estilo from '../../estilo'
import { getStorage, ref, getDownloadURL } from '@firebase/storage';

export default ({cpf}) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true); // adicionando estado para tela de carregamento
    
    console.log(cpf)
    const getStoredImage = async () => {
        const storage = getStorage();
        const storeRef = ref(storage, `foto${cpf}.jpg`);
  
        try {
            const url = await getDownloadURL(storeRef);
            setImageUrl(url);
            setLoading(false); // alterando para false assim que a imagem for recuperada com sucesso
        } catch (error) {
              const url  = 'https://firebasestorage.googleapis.com/v0/b/shapemeappbdteste.appspot.com/o/fotopadrao.jpg?alt=media&token=c1f35033-a208-40ce-8d69-52279a798210'
              setImageUrl(url)
              console.log(error);
            setLoading(false); // alterando para false em caso de erro
        }
    };
  

  
    useEffect(() => {
        getStoredImage();
    }, []);

    return (
                  <View style={[estilo.corSecundaria, style.container, estilo.centralizado, estilo.sombra]}>
                  {/* Adicionando elemento condicional para exibir a tela de carregamento ou a imagem */}
                  {loading ? (
                      <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, estilo.centralizado, estilo.tituloH427px, {marginTop: 15}]}>
                          Carregando foto...
                      </Text>
                  ) : (
                      <Image 
                          style={{width: 60, height: 60, borderRadius: 30}}
                          source={imageUrl ? { uri: imageUrl } : "Não achou a imagem"} />
                  )}
              </View>

    )
}

const style = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
})