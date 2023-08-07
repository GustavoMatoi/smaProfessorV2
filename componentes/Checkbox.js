import React, {useEffect, useState} from "react"
import {Text,View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import estilo from "./estilo";
import {useFonts} from 'expo-font'


const CheckboxIndividual = ({options = [], onChange}) => {
    const [selected, setSelected] = useState([])
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/Montserrat-Light.ttf'),
    })
    function toggle(id){
        let index = selected.findIndex((i)=> i === id)
        let arrSelected = [...selected]
        if(index !== -1){
            arrSelected.splice(index, 1)
        } else {
            arrSelected.push(id)
        }
        setSelected(arrSelected)
    }
    useEffect(()=> onChange(selected), [selected])

    return (
        <View style={style.container}>
            {options.map((op,i) => (
                <View style={[style.optionContainer]}>
                    <TouchableOpacity style={[style.botao]} onPress={()=>toggle(op?.id)}>
                        {selected.findIndex((i)=> i === op.id) !== -1 ? <AntDesign name="check" size={20} color="black"/> : null}
                    </TouchableOpacity>
                    <Text style={[style.optionText, estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>{op}</Text>
                </View>
))}
        </View>
    )
}

const CheckboxUmPorVez = ({options = [], onChange, multiplo = false}) => {
    const [selected, setSelected] = useState([])
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/Montserrat-Light.ttf'),
    })

    function toggle(id){
        let index = selected.findIndex((i)=> i === id)
        let arrSelected = [...selected]
        if(index !== -1){
            arrSelected.splice(index, 1)
        } else {
           multiplo ? arrSelected.push(id) : arrSelected = [id]
        }
        setSelected(arrSelected)
    }
    useEffect(()=> onChange(selected), [selected])

    return (
        <View style={style.container}>
            {options.map((op,i) => (
                <View style={[style.optionContainer]}>
                    <TouchableOpacity style={[style.botao]} onPress={()=>toggle(op?.id)}>
                        {selected.findIndex((i)=> i === op.id) !== -1 ? <AntDesign name="check" size={20} color="black"/> : null}
                    </TouchableOpacity>
                    <Text style={[style.optionText, estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>{op?.text}</Text>
                </View>
))}
        </View>
    )
}


const CheckMultiplos = ({options = [], onChange, multiplo = false}) => {
    const [selected, setSelected] = useState([])
    const [isChildChecked, setIsChildChecked] = useState(false);

    function handleChildChange(isChecked) {
        setIsChildChecked(isChecked);
      }
      
    function toggle(id){
        let index = selected.findIndex((i)=> i === id)
        let arrSelected = [...selected]
        if(index !== -1){
            arrSelected.splice(index, 1)
        } else {
           multiplo ? arrSelected.push(id) : arrSelected = [id]
        }
        setSelected(arrSelected)
    }
    useEffect(()=> onChange(selected), [selected])

    return (
        <View style={style.container}>
            {options.map((op,i) => (
                <View style={[style.optionContainer]}>
                    <TouchableOpacity style={[style.botao]} onPress={()=>toggle(op?.id)}>
                        {selected.findIndex((i)=> i === op.id) !== -1 ? <AntDesign name="check" size={20} color="#182128"/> : null}
                    </TouchableOpacity>
                    <Text style={[style.optionText, estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>{op?.text}</Text>
                </View>
))}
        </View>
    )
}


const style = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%'
    },
    botao: {
        height: 24,
        width: 24,
        borderWidth: 2,
        borderColor: '#182128',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionText: {
        marginLeft: 12,
        color: '#555',
        fontSize: 16,
        fontWeight: '600'
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }
})

export {CheckboxIndividual, CheckboxUmPorVez, CheckMultiplos}