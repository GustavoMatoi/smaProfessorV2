import React from "react"
import {Text, View, StyleSheet} from 'react-native'
import Estilo from "./estilo"
export default props => {
    if (props.tamanho == 'grande'){
        return (
            <View>
                <View style={style.logo}>
                    <Text style={[Estilo.tituloH148px, Estilo.textoCorSecundaria]}>ShapeMe</Text>
                    <Text style={[Estilo.tituloH148px, Estilo.textoCorPrimariaMenos1]}>App</Text>
                </View>
                <View style={[Estilo.corPrimariaMais1, style.logoProfessor]}>
                    <Text style={[Estilo.tituloH333px, Estilo.textoCorLight]}>PROFESSOR</Text>
                </View>
                <Text style={[Estilo.textoP16px, Estilo.textoCorDark, style.version ]}>Versao 2.4.0</Text>
            </View>
        )
    } else {
        return (
            <View>
                <View style={style.logo}>
                    <Text style={[Estilo.tituloH427px, Estilo.textoCorSecundaria]}>ShapeMe</Text>
                    <Text style={[Estilo.tituloH427px, Estilo.textoCorPrimariaMenos1]}>App</Text>
                </View>
                <View style={[Estilo.corPrimariaMais1, style.logoProfessorSmall]}>
                <Text style={[{fontSize:15, fontWeight: 'bold'}, Estilo.textoCorLight]}>PROFESSOR</Text>
                </View>
            </View>            
        )
    }

}

const style = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logoProfessor: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 70,
        width: 200,
        heigh: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    logoProfessorSmall: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 25,
        width: 120,
        heigh: 40,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    version: {
        textAlign: 'center', 
        marginTop: 20,
    },
}   )