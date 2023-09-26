import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, SafeAreaView, TextInput, Alert} from 'react-native'
import estilo from './estilo'
import { AntDesign } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';

export default ({options=[], onChange , initialSelect=[], titulo = " ", max, selecionado, select}) => {
    const [visible, setVisible] = useState(false)
    const [opcoesOriginais, setOpcoesOriginais] = useState([...options])
    const [data, setData] = useState([...options])
    const [termo, setTermo] = useState('')
    const [selected, setSelected] = useState([])
    const [value, setValue] = useState('')

    const [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/Montserrat.ttf'),
    })

    useEffect(()=> {
        setOpcoesOriginais(options)
        setData(options)
    },[options])

    useEffect(()=> {
        let arr = [...opcoesOriginais]
        setData(arr.filter(i =>i.includes(termo.toLowerCase())))
    },[termo])

    function combinada(item){
        toggleSelection(item)
        setVisible(false)
    }
    
    function renderItem(item){
        return (
            <TouchableOpacity 
            value={item}
            style={[style.item]} 
            onPress={()=> combinada(item)}>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    function toggleSelection(item){
        let index = selected.findIndex(i=> i?.id === item?.id) //Procura um item nos selecionados que tem o id do item que está sendo procurado no momento
        let arrSelected = [...selected] //Obs: spread (...) cria uma cópia que não fica ligada ao array original
        if (index != -1){
            arrSelected.splice(index,1)
        } 
        arrSelected.push(item)
        setSelected(arrSelected)
        onChange(item)
    }


    return (
        <TouchableOpacity style={selecionado ? [style.container] : [style.container, {borderWidth: 2, borderColor: 'red'}]} 
        onPress={()=>setVisible(true)}
        seleciona={() => {return titulo}}
        >
            <Text style={ selecionado ?[estilo.textoCorSecundaria, style.actions, estilo.textoP16px, style.Montserrat] :  [estilo.textoCorDanger, style.actions, estilo.textoP16px, style.Montserrat]}> {selected == '' ? select ? select : 'Select' : selected}</Text>
            <AntDesign name="downcircleo" size={24} color={selecionado ? 'black' : 'red'} />
            <Modal onRequestClose={() => setVisible(false)}
            visible={visible}
            animationType='slide'
            style={{height: '100%'}}>
                <SafeAreaView 
                style={{flex: 1}}>
                    <View style={style.header}>
                        <View style={style.headerR1}>
                            <View>
                                <Text style={[estilo.textoCorSecundaria, style.actions, estilo.tituloH619px, style.Montserrat]}>{titulo || 'Título'}</Text>
                                <Text style={[estilo.textoCorSecundaria, style.actions, estilo.textoP16px, style.Montserrat]}>{`Selecione ${max} opção`}</Text>
                            </View>
                            <TouchableOpacity onPress={()=> {setVisible(false); onChange(selected)}}>
                                <AntDesign name="upcircleo" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <FlatList
                    data={data}
                    renderItem={({item}) => renderItem(item)}
                    />
                </SafeAreaView>
            </Modal>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 10,
        backgroundColor: 'white',
        borderColor: '#CCC',
        paddingHorizontal: 12,
    },
    header: {
        backgroundColor: '#eee',
        padding: 12
    },
    headerR1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actions: {
        textAlign: 'center'
    },
    input: {
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 35
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    },
    item: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#3B464F'
        
    }
})