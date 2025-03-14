import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert,ScrollView} from 'react-native'
import ExerciciosForça from '../../Ficha/ExerciciosForça'
import estilo from '../../estilo'
import { professorLogado } from '../../LoginScreen'
import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import BotaoSelect from '../../BotaoSelect'
import ExerciciosCardio from '../../Ficha/ExerciciosCardio'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

import NetInfo from "@react-native-community/netinfo"
import ExerciciosAlongamento from '../../Ficha/ExerciciosAlongamento'
const dadosverif = true;
export default ({ navigation, route }) => {
    const { exercicios, aluno, objetivo } = route.params
    console.log(exercicios)
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    console.log(professorLogado.getNome())

    const style = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            padding: 10
        },
        inputTexto: {
            height: 50,
            borderRadius: 2,
            backgroundColor: 'white',
            color: '#182128',
            padding: 5,
            justifyContent: 'center',
            width: '90%'
        },
    })
    const [dateError, setDateError] = useState('');

    const [dataFim, setDataFim] = useState('')
    const isValidDate = (text) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (datePattern.test(text)) {
            return true;
        }
        return false;
    };

    const handleInputChange = (text) => {
        const unformattedText = text.replace(/\//g, '');

        if (/^\d{0,8}$/.test(unformattedText)) {
            let formattedText = unformattedText;
            if (unformattedText.length >= 2) {
                formattedText = unformattedText.slice(0, 2) + '/' + unformattedText.slice(2);
            }
            if (unformattedText.length >= 4) {
                formattedText = formattedText.slice(0, 5) + '/' + formattedText.slice(5);
            }

            setDataFim(formattedText);
        }
        console.log(dataFim)
    };
    const data = new Date()
    let dia = data.getDate()
    dia < 10 ? dia = `0${dia}` : dia = dia
    let mes = data.getMonth() + 1
    mes < 10 ? mes = `0${mes}` : mes = mes
    const ano = data.getFullYear()


    console.log('aluno.professorResponsavel', aluno.professorResponsavel)
    console.log(aluno.email)
    let horario = data.getHours()
    horario < 10 ? horario = `0${horario}` : null
    let minutos = data.getMinutes()
    minutos < 10 ? minutos = `0${minutos}` : null

    const salvarFicha = async () => {
        if (dataFim !== '') {
            const bd = getFirestore();

            const documentos = exercicios.map((exercicio, index) => {

                if (exercicio.tipo === 'força') {
                    return {
                        Nome: exercicio.nomeExercicio,
                        descanso: exercicio.descanso,
                        repeticoes: exercicio.repeticoes,
                        series: exercicio.series,
                        tipo: exercicio.tipo,
                        cadencia: exercicio.cadencia,
                        image: exercicio.imagem,
                        ficha: exercicio.ficha
                    };
                } else if (exercicio.tipo === 'aerobico') {
                    return {
                        Nome: exercicio.nomeExercicio,
                        velocidade: exercicio.velocidade,
                        descanso: exercicio.descanso,
                        series: exercicio.series,
                        duracao: exercicio.duracao,
                        tipo: exercicio.tipo,
                        ficha: exercicio.ficha
                    };
                } else {
                    return {
                        Nome: exercicio.nomeExercicio,
                        descanso: exercicio.descanso,
                        repeticoes: exercicio.repeticoes,
                        series: exercicio.series,
                        tipo: exercicio.tipo,
                        imagem: exercicio.imagem,
                        ficha: exercicio.ficha
                    }
                }
            });
            if (conexao) {
                try {
                    await setDoc(doc(
                        bd,
                        'Academias',
                        professorLogado.getAcademia(),
                        'Alunos',
                        `${aluno.email}`,
                        'FichaDeExercicios',
                        `FichaDeExercicios${ano}|${mes}|${dia}|${horario}|${minutos}`
                    ), {
                        dataFim: dataFim,
                        dataInicio: `${dia}/${mes}/${ano}`,
                        data: serverTimestamp(),
                        objetivoDoTreino: objetivo,
                        responsavel: professorLogado.getNome(),
                    });

                    await Promise.all(documentos.map((element, index) => {
                        console.log('documentos', documentos)
                        console.log('elemnt', element)
                        console.log('index', index)
                        console.log('Ficha de exercícios salva com sucesso');
                        let indexString = index > 9 ? index : `0${index}`
                        return setDoc(doc(
                            bd,
                            'Academias',
                            professorLogado.getAcademia(),
                            'Alunos',
                            `${aluno.email}`,
                            'FichaDeExercicios',
                            `FichaDeExercicios${ano}|${mes}|${dia}|${horario}|${minutos}`,
                            'Exercicios',
                            `Exercicio ${indexString}`
                        ), element);

                    }


                    ));

                } catch (error) {
                    console.error('Erro ao salvar a ficha de exercícios:', error);


                } finally {
                    if (conexao) {
                        Alert.alert("Ficha salva com sucesso!", "A ficha foi salva no banco de dados.")
                        navigation.navigate("Principal", {dadosverif: true })
                    } else {
                        Alert.alert("Ficha salva com sucesso!", "A ficha foi salva localmente. Assim que o dispositivo possuir conexão com a intenet,a ficha será enviada para o Banco de Dados")
                        navigation.navigate("Principal",{dadosverif: true})
                    }

                }
            } else {
                const avaliacaoData = {
                    dataFim: dataFim,
                    dataInicio: `${dia}/${mes}/${ano}`,
                    data: serverTimestamp(),
                    objetivoDoTreino: objetivo,
                    responsavel: professorLogado.getNome(),

                }

                const avaliacaoString = JSON.stringify(avaliacaoData)
                try {
                    AsyncStorage.setItem(`Aluno ${aluno.email}-FichaDeExercicios${ano}|${mes}|${dia}|${horario}|${minutos}-Atributos`, avaliacaoString);
                } catch (error) {
                    console.log("Não foi possível salvar os arquivos no Async Storage")
                }
                await Promise.all(documentos.map((element, index) => {
                    console.log('documentos', documentos)
                    console.log('elemnt', element)
                    console.log('index', index)
                    try {
                        const elementString = JSON.stringify(element);
                        AsyncStorage.setItem(`Aluno ${aluno.email}-FichaDeExercicios${ano}|${mes}|${dia}|${horario}|${minutos}-Exercicio${index}`, elementString);
                    } catch (error) {
                        console.log('Erro ao salvar dados no AsyncStorage:', error);
                    }
                }
                ));
            }

        } else {
            Alert.alert("Campos não preenchidos.", "Informe o vencimento da ficha.")
        }
        Alert.alert("Ficha salva com sucesso!", "A ficha foi salva localmente. Assim que o dispositivo possuir conexão com a intenet,a ficha será enviada para o Banco de Dados")
        navigation.navigate("Principal",{dadosverif: true })
    };

    console.log(exercicios)
    const transformedData = exercicios.map(item => ({
        key: item.nomeDoExercicio,
        ...item,
    }));

    const fichasUnicas = [...new Set(exercicios.map(item => item.ficha))];

    return (
        <SafeAreaView style={[style.container, estilo.centralizado, estilo.corLightMenos1]}>
            <ScrollView>
                <>
            {!conexao ?
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Modo Offline",
                        "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                    );
                }} style={[estilo.centralizado, { marginVertical: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                    <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                </TouchableOpacity>
                : null}
            <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, estilo.centralizado]}>NOVA FICHA</Text>
            <View>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Responsável: {professorLogado.getNome()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Aluno: {aluno.nome}</Text>
            </View>
            {fichasUnicas.map(ficha => (
                <View key={ficha} style={{ width: '100%', marginVertical: 10 }}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Ficha {ficha}</Text>
                    {exercicios.map(item => {
                        console.log('item', item);
                        console.log('ficha', ficha);

                        if (item.ficha === ficha) {
                            if (item.tipo === 'força') {
                                return (
                                    <ExerciciosForça
                                        key={item.index}
                                        nomeDoExercicio={item.nomeExercicio.exercicio}
                                        series={item.series}
                                        repeticoes={item.repeticoes}
                                        descanso={item.descanso}
                                        cadencia={item.cadencia}
                                        imagem={item.imagem ? item.imagem : ''}
                                    />
                                );
                            } else if (item.tipo === 'aerobico') {
                                return (
                                    <ExerciciosCardio
                                        key={item.index}
                                        nomeDoExercicio={item.nomeExercicio.exercicio}
                                        seriesDoExercicio={item.series}
                                        velocidadeDoExercicio={item.velocidade}
                                        descansoDoExercicio={item.descanso}
                                        duracaoDoExercicio={item.duracao}
                                    />
                                );
                            } else if (item.tipo === 'alongamento') {
                                return (
                                    <ExerciciosAlongamento
                                        key={item.index}
                                        nomeDoExercicio={item.nomeExercicio}
                                        series={item.series}
                                        repeticoes={item.repeticoes}
                                        descanso={item.descanso}
                                        imagem={item.imagem ? item.imagem : ''}
                                    />
                                );
                            }
                        }

                        return null; // Retorna null se não houver correspondência de ficha
                    })}
                </View>
            ))}


            <View style={[{ marginVertical: 10 }]}>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { marginVertical: 10 }]}>Objetivo do treino: {objetivo}</Text>

                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { marginVertical: 10 }]}>Vencimento:</Text>
                <TextInput style={[style.inputTexto, estilo.sombra]}
                    onChangeText={handleInputChange}
                    placeholder='dd/mm/aaaa'
                    keyboardType='numeric'
                    value={dataFim}
                />
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={salvarFicha}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>
                </>
            </ScrollView>
        </SafeAreaView>
    )
}