import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import ExerciciosForça from '../../Ficha/ExerciciosForça'
import estilo from '../../estilo'
import { professorLogado } from '../../Home'
import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import BotaoSelect from '../../BotaoSelect'
import ExerciciosCardio from '../../Ficha/ExerciciosCardio'

import NetInfo from "@react-native-community/netinfo"
import ExerciciosAlongamento from '../../Ficha/ExerciciosAlongamento'
export default ({ navigation, route }) => {
    const { exercicios, aluno, objetivo } = route.params

    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    console.log(exercicios)
    console.log(exercicios)
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
    const [dataFim, setDataFim] = useState('')

    const data = new Date()
    let dia = data.getDate()
    dia < 10 ? dia = `0${dia}` : dia = dia
    let mes = data.getMonth() + 1
    mes < 10 ? mes = `0${mes}` : mes = mes
    const ano = data.getFullYear()
    const salvarFicha = async () => {
        const bd = getFirestore();

        const documentos = exercicios.map((exercicio, index) => {

            if (exercicio.tipo === 'força') {
                return {
                    Nome: exercicio.nomeExercicio,
                    descanso: exercicio.descanso,
                    repeticoes: exercicio.repeticoes,
                    series: exercicio.series,
                    tipo: exercicio.tipo
                };
            } else if (exercicio.tipo === 'aerobico') {
                return {
                    Nome: exercicio.nomeExercicio,
                    velocidade: exercicio.velocidade,
                    descanso: exercicio.descanso,
                    series: exercicio.series,
                    duracao: exercicio.duracao,
                    tipo: exercicio.tipo
                };
            } else {
                return {
                    Nome: exercicio.nomeExercicio,
                    descanso: exercicio.descanso,
                    repeticoes: exercicio.repeticoes,
                    series: exercicio.series,
                    tipo: exercicio.tipo,
                    imagem: exercicio.imagem
                }
            }
        });

        try {
            await setDoc(doc(
                bd,
                'Academias',
                professorLogado.getAcademia(),
                'Professores',
                aluno.professorResponsavel,
                'alunos',
                `Aluno ${aluno.email}`,
                'FichaDeExercicios',
                `FichaDeExercicios${ano}|${mes}|${dia}`
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
                return setDoc(doc(
                    bd,
                    'Academias',
                    professorLogado.getAcademia(),
                    'Professores',
                    aluno.professorResponsavel,
                    'alunos',
                    `Aluno ${aluno.email}`,
                    'FichaDeExercicios',
                    `FichaDeExercicios${ano}|${mes}|${dia}`,
                    'Exercicios',
                    `Exercicio ${index}`
                ), element);
            }
            ));

            console.log('Ficha de exercícios salva com sucesso');
        } catch (error) {
            console.error('Erro ao salvar a ficha de exercícios:', error);
        } finally {
            if(!conexao){
                Alert.alert("Ficha salva com sucesso!", "A ficha foi salva no banco de dados.")
                navigation.navigate("Principal")
            } else{
                Alert.alert("Sem conexão.", "Não foi possível salvar sua ficha no momento devido a falta de conexão. Tente novamente.")

            }
        }
    };

    const transformedData = exercicios.map(item => ({
        key: item.nomeDoExercicio,
        ...item,
    }));
    return (
        <SafeAreaView style={[style.container, estilo.centralizado, estilo.corLightMenos1]}>
            <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, estilo.centralizado]}>NOVA FICHA</Text>
            <View>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Responsável: {professorLogado.getNome()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Aluno: {aluno.nome}</Text>
            </View>
            <FlatList
                data={transformedData}
                style={{ width: '100%', marginVertical: 10 }}
                renderItem={({ item }) => (
                    item.tipo === 'força' ? (
                        <ExerciciosForça
                            nomeDoExercicio={item.nomeExercicio.exercicio}
                            series={item.series}
                            repeticoes={item.repeticoes}
                            descanso={item.descanso}
                        />
                    ) : item.tipo === 'aerobico' ? (
                        <ExerciciosCardio
                            nomeDoExercicio={item.nomeExercicio.exercicio}
                            seriesDoExercicio={item.series}
                            velocidadeDoExercicio={item.velocidade}
                            descansoDoExercicio={item.descanso}
                            duracaoDoExercicio={item.duracao}
                        />
                    ) : (
                        <ExerciciosAlongamento
                            nomeDoExercicio={item.nomeExercicio.exercicio}
                            series={item.series}
                            repeticoes={item.repeticoes}
                            descanso={item.descanso}
                            imagem={item.imagem ? item.imagem : ''}
                        />
                    )
                )}
                keyExtractor={item => item.key}
            />


            <View style={[{ marginVertical: 10 }]}>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { marginVertical: 10 }]}>Objetivo do treino: {objetivo}</Text>

                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { marginVertical: 10 }]}>Data fim (opcional):</Text>
                <TextInput style={[style.inputTexto, estilo.sombra]}
                    onChangeText={(text) => setDataFim(text)}
                    placeholder='Informe a data final dessa ficha'
                />
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={salvarFicha}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}