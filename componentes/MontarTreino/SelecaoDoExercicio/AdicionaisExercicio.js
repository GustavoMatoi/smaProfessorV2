import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import estilo from "../../estilo";


export default ({route, navigation}) => {
    const {nomeExercicio} = route.params
    return (
        <View>
            <Text>{nomeExercicio || "nome exercicio"}</Text>
        </View>
    )
}