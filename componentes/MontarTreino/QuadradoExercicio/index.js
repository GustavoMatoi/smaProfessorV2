import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, TextInput, BackHandler} from 'react-native'
import estilo from "../../estilo"


export default ({tipoExercicio}) => {
    console.log("Tipoexercicio ")
    console.log(tipoExercicio)
    if(tipoExercicio == 'força'){
        return (
            <View style={[style.quadrado, estilo.corLightMais1, estilo.sombra]}>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
                <View style={{width: '100%'}}>
                    <TextInput style={[style.inputTexto]} placeholder="Exercício força" editable={false}/>
                </View>
    
                <View style={style.areaPreenchimentoParametros}>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Séries:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Sér."/>
                </View>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Repetições:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Reps."/>
                </View>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Desc."/>
                </View>
                </View>
            </View>
        )
    }
    if(tipoExercicio == 'alongamento'){
        return (
            <View style={[style.quadrado, estilo.corLightMais1, estilo.sombra]}>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
                <View style={{width: '100%'}}>
                    <TextInput style={[style.inputTexto]} placeholder="Exercício alongamento" editable={false}/>
                </View>
    
                <View style={style.areaPreenchimentoParametros}>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Duração:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Durac."/>
                </View>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Repetições:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Reps."/>
                </View>
                <View style={[style.areaParametroPequeno]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
                    <TextInput style={[style.inputTextoPequeno]} placeholder="Desc."/>
                </View>
                </View>
            </View>
        )
    }
    if(tipoExercicio == 'aerobico'){
        return (
            <View style={[style.quadrado, estilo.corLightMais1, estilo.sombra]}>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
                <View style={{width: '100%'}}>
                    <TextInput style={[style.inputTexto]} placeholder="Exercício aerobico" editable={false}/>
                </View>
    
                <View style={style.areaPreenchimentoParametros}>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Velocidade:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Vel."/>
                    </View>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Duração:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Durac."/>
                    </View>
                </View>

                <View style={style.areaPreenchimentoParametros}>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Desc."/>
                    </View>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Séries:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Sér."/>
                    </View>
                </View>
            </View>
        )
    }
}


const style = StyleSheet.create({
    quadrado: {
        width: '90%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#0066FF',
        padding: 10,
    },
    inputTexto: {
        width: '100%',
        height: 50,
        borderRadius: 2, 
        backgroundColor: 'white',
        color: '#182128',
        padding: 5,
        marginVertical: 10,
    },
    areaParametroPequeno: {
        width: '30%',
    },
    inputTextoPequeno: {
        width: '95%',
        height: 40,
        backgroundColor: 'white',
        marginVertical: 5,
        textAlign: 'center',
        alignSelf: 'center'
    },
    areaPreenchimentoParametros: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 5
    },
    areaParametroMedio: {
        width: '45%'
    }
})