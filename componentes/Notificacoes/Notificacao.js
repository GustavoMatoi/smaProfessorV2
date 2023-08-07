import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, StyleSheet, TouchableOpacity,Modal, ScrollView, TextInput} from 'react-native'
import estilo from '../estilo'
import {useFonts} from 'expo-font'

export default ({tipo,remetente, data, texto, titulo, pressando}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Light.ttf'),
    })
    const [modalVisible, setModalVisible] = useState(false)

    if (tipo == 'professor'){
        return (
            <TouchableOpacity style={[style.container, estilo.corPrimariaMenos1]}>
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, style.alinhamentoTitulo]}>  
    {data} - {titulo}
  </Text>
</View>
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  <Text style={[style.alinhamentoTitulo, estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>
    {texto} - {remetente}
  </Text>
</View>
            </TouchableOpacity>
)
    } else {
        return (
            <TouchableOpacity style={[style.container, estilo.corDisabled]}>
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, style.alinhamentoTitulo]}>  
    {data} - {titulo}
  </Text>
</View>
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  <Text style={[style.alinhamentoTitulo, estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>
    {texto} - {remetente}
  </Text>
</View>

            </TouchableOpacity>
)
    }

}

const style = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    alinhamentoTitulo: {
        paddingHorizontal: 7,
        paddingVertical: 5
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }
    }
)