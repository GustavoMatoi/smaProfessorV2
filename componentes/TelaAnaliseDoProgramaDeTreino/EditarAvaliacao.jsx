import React, { useState } from "react"
import { Text, View, SafeAreaView, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import estilo from "../estilo"
import RadioBotao from "../RadioBotao"
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import Spinner from "react-native-loading-spinner-overlay";

export default ({ route, navigation }) => {
    const [valorEditando, setValorEditando] = useState()
    const [opcao, setOpcao] = useState()
    const [titulo, setTitulo] = useState()
    const { props, aluno } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [newValue, setNewValue] = useState(0)

    const salvarValor = async () => {
        const [horas, minutos] = props.horario.split(':').map(str => str.trim());
        const bd = getFirestore()

        if(newValue == 0 ){
            return Alert.alert("Valor inválido", "Informe um valor antes de prosseguir")
        }
        try {
            const avaliacoesRef = collection(bd, "Academias", aluno.Academia, "Alunos", aluno.email, 'Avaliações');

            const documentRef = doc(avaliacoesRef, `Avaliacao${props.ano}|${props.mes}|${props.dia}|${horas}|${minutos}`);

            await updateDoc(documentRef, {
                [titulo]: parseFloat(newValue)
            });

            Alert.alert(
                'Atualização concluída',
                `O item "${titulo}" foi atualizado com sucesso para "${newValue}". As alterações serão refletidas na tela de avaliações e fichas assim que você sair do perfil e entrar novamente.`
            );
            navigation.navigate('Home')
        } catch (error) {
            Alert.alert(
                'Erro ao atualizar o item',
                `O item "${titulo}" não foi possível ser atualizado. Tente novamente mais tarde ou reporte esse erro a um dos desenvolvedores.`
            );
            navigation.navigate('Home')

        }
    };


    const chavesExcluir = [
        'professorResponsavel',
        'mes',
        'ano',
        'horario',
        'data',
        'emailProfessorResponsavel',
        'dia'
    ];

    // Filtra as chaves do objeto props, excluindo as chaves definidas em chavesExcluir
    const opcoes = Object.keys(props).filter(key => !chavesExcluir.includes(key));

    return (
        <ScrollView style={style.container}>
            <SafeAreaView>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Escolha o item que deseja alterar e aperte em prosseguir. </Text>
                <RadioBotao selected={opcao} options={opcoes}
                    onChangeSelect={(opt, i) => { setOpcao(i); setTitulo(opt); console.log(i, opt) }}

                />
                <TouchableOpacity style={[estilo.corPrimaria, estilo.botao, { marginVertical: 15 }]} onPress={() => setModalVisible(true)}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Prosseguir</Text>
                </TouchableOpacity>

                <Modal animationType='fade' visible={modalVisible} >
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Informe o novo valor de {titulo}</Text>
                    <TextInput
                        onChangeText={(text) => setNewValue(text)}
                        keyboardType="numeric
                        "
                        placeholder="Informe o novo valor"
                        style={[{ padding: 15, backgroundColor: 'white', width: '90%', border: 2, borderColor: 'black' }]}
                    />
                    <TouchableOpacity style={[estilo.corPrimaria, estilo.botao, { marginVertical: 15 }]} onPress={() => salvarValor()}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estilo.corDanger, estilo.botao, { marginVertical: 15 }]} onPress={() => setModalVisible(false)}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Cancelar</Text>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        </ScrollView>

    )
}

const style = StyleSheet.create({

    linha: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '2%'
    },
    tabela: {
        justifyContent: 'center'
    },
    parametro: {
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    medidas: {
        width: '20%',
        height: 60,
        marginLeft: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    umaMedida: {
        width: '60%',
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})