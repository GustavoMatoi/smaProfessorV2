import React, {useState, useEffect} from "react";
import {Text, View, SafeAreaView, StyleSheet}  from 'react-native';
import Svg, { Polygon } from "react-native-svg";
import estilo from "../../estilo";

export default ({texto})=> {

    return (
        <View style={[style.container ]}>
                        <Svg
        width={20}
        height={20}
        viewBox={`0 0 ${20} ${20}`}
        style={[{ transform: [{ rotate: '90deg' }], borderWidth: 1, marginTop: 12, marginLeft: -2}]}
      >
        <Polygon points={` 0, 0,${20},0 ${20 / 2},${20}`} fill={'#F2EDED'} />
      </Svg>     
            <View style={[style.balao, estilo.corLightMais1]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>{texto}</Text>

            </View>
   </View>
    )
}

const style = StyleSheet.create( {
    container: {
        width: '100%',
        flexDirection: 'row',    
    },
    balao: {
        width: '90%',
        minHeight: 35, 
        marginTop: 5,
        borderRadius: 10,
        padding: 5

    },
    triangulo: {
        marginLeft: -10
    }
})