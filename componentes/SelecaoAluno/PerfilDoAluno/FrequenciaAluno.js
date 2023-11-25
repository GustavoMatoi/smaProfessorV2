import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import estilo from '../../estilo'
import { doc, setDoc, collection, getDocs, query, where, addDoc, getFirestore } from "firebase/firestore";
import { firebase, firebaseBD } from "../../configuracoes/firebaseconfig/config"
import { professorLogado } from '../../LoginScreen';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import RadioBotao from '../../RadioBotao'

LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],

    today: "Quinta feira"
};

LocaleConfig.defaultLocale = 'br';


export default ({ navigation, route }) => {
    const { aluno } = route.params
    const [arrayDatas, setArrayDatas] = useState([]);
    const [arrayDatasObj, setArrayDatasObj] = useState()
    const [selected, setSelected] = useState(0);


    const [carregandoDados, setCarregandoDados] = useState(true);


    const getAvaliacoes = async () => {
        const db = getFirestore();
        const diarioRedf = collection(db, "Academias", `${professorLogado.getAcademia()}`, "Professores", aluno.professorResponsavel, "alunos", `Aluno ${aluno.email}`, 'Diarios');
        const querySnapshot = await getDocs(diarioRedf);

        const arrayTemporarioDatas = []
        const arrayDataTemporario = []
        querySnapshot.forEach((doc) => {
            const dataDiario = {
                data: `${doc.get('dia')}/${doc.get('mes')}/${doc.get('ano')}`,
                tipoDeTreino: doc.get('tipoDeTreino'),
                duracao: doc.get('duracao')
            }

            const dataObj = {
                [`${doc.get('ano')}-${doc.get('mes')}-${doc.get('dia')}`]: { selected: true, marked: true, selectedColor: '#0066FF' }
            }
            arrayDataTemporario.push(dataObj)
            arrayTemporarioDatas.push(dataDiario)
        });
        setArrayDatas(arrayTemporarioDatas)
        console.log(arrayDataTemporario)

        const arrayDatasFinal = arrayDataTemporario.reduce((obj, item) => {
            return { ...obj, ...item }
        })
        setCarregandoDados(false);

        setArrayDatasObj(arrayDatasFinal)
    };




    useEffect(() => {
        getAvaliacoes();
    }, []);
    return (
        <View Style={[estilo.corLightMenos1]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, { marginTop: 5, marginLeft: 5 }]}>
                Selecione a maneira de visualização de presença:
            </Text>
            <View style={[ estilo.centralizado]}>
                <RadioBotao
                    options={['Lista', 'Calendário']}
                    onChangeSelect={(opt, i) => { setSelected(i); console.log(i) }}
                    selected={selected}
                    horizontal={true}
                />
            </View>
            <View style={[estilo.centralizado, { marginTop: 10 }]}>
                <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>O ALUNO TREINOU NOS DIAS:</Text>
            </View>
            {selected == 0 ?

                <FlatList
                    data={arrayDatas}
                    renderItem={(diario) =>
                        <View style={[style.areaInformacoes]}>
                            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Dia: {diario.item.data}. Duração: {diario.item.duracao} minutos</Text>
                            {console.log(diario.item)}
                        </View>}
                />
                :

                <View style={[{ width: '95%', marginTop: '5%' }, estilo.centralizado]}>
                    <Calendar
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 350
                        }}
                        markedDates={
                            arrayDatasObj
                        }
                    />
                </View>}



        </View>
    )
}

const style = StyleSheet.create({
    areaInformacoes: {
        width: '100%',
        marginVertical: 5,
        marginLeft: 10
    }
})