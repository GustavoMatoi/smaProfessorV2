import React, {useState, useEffect} from 'react'
import {Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import ExerciciosForça from '../../Ficha/ExerciciosForça'
import estilo from '../../estilo'
import { professorLogado } from '../../Home'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import BotaoSelect from '../../BotaoSelect'

export default ({navigation, route}) => {
    const {exercicios, aluno} = route.params
    console.log('aluno', aluno)
    console.log(exercicios)
    console.log(route.params)


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
    const [selected, setSelected] = useState('')
    const [dataFim, setDataFim] = useState('')
    const  handleSelectChange = (value) => {
        setSelected(value);
      }
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const salvarFicha = async () => {
        const bd = getFirestore();
    
        const documentos = exercicios.map((exercicio, index) => {
            console.log('index', exercicio);
            console.log('i', index);
            return {
                Nome: exercicio.nomeExercicio,
                descanso: exercicio.descanso,
                repeticoes: exercicio.repeticoes,
                series: exercicio.series,
                tipo: exercicio.tipo
            };
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
                objetivoDoTreino: selected,
                responsavel: professorLogado.getNome()
            });
    
            await Promise.all(documentos.map((element, index) => {
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
            }));
    
            console.log('Ficha de exercícios salva com sucesso');
        } catch (error) {
            console.error('Erro ao salvar a ficha de exercícios:', error);
        }
    };
    return (
        <SafeAreaView style={[style.container, estilo.centralizado, estilo.corLightMenos1]}>
                <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, estilo.centralizado]}>NOVA FICHA</Text>
            <View>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Responsável: {professorLogado.getNome()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Aluno: {aluno.nome}</Text>
            </View>
                <FlatList
                data={exercicios}
                style={{width: '100%', marginVertical: 10}}
                renderItem={({item}) => 
                item.tipo === 'força'? <ExerciciosForça nomeDoExercicio={item.nomeExercicio} series={item.series} repeticoes={item.repeticoes} descanso={item.descanso} /> : <Text>Texto</Text>
            }
                keyExtractor={item => item.nomeDoExercicio}
            />

            <View style={ [{marginVertical: 10}]}>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {marginVertical: 10}]}>Objetivo do treino:</Text>
            <BotaoSelect
                        selecionado={selected == '' ? false : true}
                        onChange={handleSelectChange}
                        titulo='Objetivo do treino' max={1} 
                        options={['Enrijecimento', 
                        'Hipertrofia Geral Intensa',
                        'Hipertrofia Geral Moderada',
                        'Fortalecimento',
                        'Definição Muscular',
                        'Bem Estar Geral',
                        'Relaxamento',
                        'Aliviar dores',
                        'Flexibilidade',
                        'Manter forma física'
                        ]} ></BotaoSelect>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {marginVertical: 10}]}>Data fim (opcional):</Text>
                <TextInput style={[style.inputTexto, estilo.sombra]}
                    onChangeText={(text)=>setDataFim(text)}
                    placeholder='Informe a data final dessa ficha'
                />
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={salvarFicha}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        )
}