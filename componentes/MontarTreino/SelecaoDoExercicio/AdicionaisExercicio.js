import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao";
export default ({ navigation, route }) => {
    const { nomeExercicio } = route.params;
    const { grupoMuscular } = route.params;
    const [exercicio, setExercicio] = useState('')
    const [dataExercicio, setDataExercicio] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [variacoesExercicio, setVariacoesExercicio] = useState([]);
    const [implementosExercicio, setImplementosExercicio] = useState([]);
    const [posturasExercicio, setPosturaExercicios] = useState([]);
    const [pegadasExercicio, setPegadasExercicio] = useState([]);
    const [execucoesExercicio, setExecucoesExercicio] = useState([]);
    const [variacaoSelecionada, setVariacaoSelecionada] = useState(-1)
    const [variacaoString, setVariacaoString] = useState('')
    const [implementoSelecionado, setImplementoSelecionado] = useState(-1)
    const [implementoString, setImplementoString] = useState('')
    const [posturaSelecionada, setPosturaSelecionada] = useState(-1)
    const [posturaString, setPosturaString] = useState('')
    const [pegadaSelecionada, setPegadaSelecionada] = useState(-1)
    const [pegadaString, setPegadaString] = useState('')
    const [execucaoSelecionada, setExecucaoSelecionada] = useState(-1)
    const [execucaoString, setExecucaoString] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const documentRef = doc(db, "Exercicios", "listaDeExercicios", 'ExerciciosMembrosSuperiores', grupoMuscular, 'Exercicios', nomeExercicio);

                const documentSnapshot = await getDoc(documentRef);
                const data = documentSnapshot.data();
                
                setDataExercicio(data || {});
                
                if ("variacoes" in data) {
                    setVariacoesExercicio(Object.values(data.variacoes));
                }
                
                if ("implemento" in data) {
                    setImplementosExercicio(Object.values(data.implemento));
                }
                
                if ("postura" in data) {
                    setPosturaExercicios(Object.values(data.postura));
                }
                
                if ("pegada" in data) {
                    setPegadasExercicio(Object.values(data.pegada));
                }
                
                if ("execucao" in data) {
                    setExecucoesExercicio(Object.values(data.execucao));
                }

                setCarregando(false);
            } catch (error) {
                console.error('Erro ao recuperar exercício:', error);
            }
        };
    
        fetchData();
    }, [nomeExercicio, grupoMuscular]);


    
    const style = StyleSheet.create({
        areaSelecao: {
            width: '100%',
            padding: 20
        }
    })

    const montarExercicio = (nome, variacao, implemento, postura, pegada, execucao) => {
        let exercicioAux = nome;
        if (variacao){
            exercicioAux += ` ${variacao}` 
        }
        if(implemento){
            exercicioAux += ` ${implemento}`
        }
        if(postura){
            exercicioAux += ` ${postura}`
        }
        if(pegada){
            exercicioAux += ` ${pegada}`
        }
        if(execucao) {
            exercicioAux += ` ${execucao}`
        }

        setExercicio(exercicioAux)
        route.params.receberExercicio(exercicioAux)
        navigation.navigate('Montar treino', {aluno: route.params.aluno})
    }

    const nomeExercicioString = nomeExercicio.split("(");
    return (
        <View>
            <ScrollView style={[{width: '100%'}]}>
            {carregando ? (
                <Spinner
                    visible={carregando}
                    textContent={'Carregando informações...'}
                    textStyle={[estilo.textoCorLight, estilo.textoP16px]}
                />
            ) : (
                <View style={[{width: '95%'}]}>
                                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado, {marginVertical: '5%'}]}>{nomeExercicio}</Text>
                    {implementosExercicio.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Implemeto: </Text>
                        <RadioBotao
                            options={implementosExercicio}
                            onChangeSelect={(opt, i) => {setImplementoSelecionado(i); setImplementoString(opt)}}
                            selected={implementoSelecionado}
                        />
                        </View>}
                    {posturasExercicio.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Postura: </Text>
                        <RadioBotao
                            options={posturasExercicio}
                            onChangeSelect={(opt, i) => {setPosturaSelecionada(i); setPosturaString(opt)}}
                            selected={posturaSelecionada}
                        />
                        </View>}
                    {variacoesExercicio.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Variação: </Text>
                        <RadioBotao
                            options={variacoesExercicio}
                            onChangeSelect={(opt, i) => {setVariacaoSelecionada(i); setVariacaoString(opt)}}
                            selected={variacaoSelecionada}
                        />
                        </View>}
                    {pegadasExercicio.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Pegada: </Text>
                        <RadioBotao
                            options={pegadasExercicio}
                            onChangeSelect={(opt, i) => {setPegadaSelecionada(i); setPegadaString(opt)}}
                            selected={pegadaSelecionada}
                        />
                        </View>}
                    {execucoesExercicio.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Execução: </Text>
                        <RadioBotao
                            options={execucoesExercicio}
                            onChangeSelect={(opt, i) => {setExecucaoSelecionada(i); setExecucaoString(opt)}}
                            selected={execucaoSelecionada}
                        />
                        </View>}
                        
                
                </View>
)}
        <View style={[estilo.centralizado, {width: '80%'}]}>
        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px]}>Exercício: {nomeExercicioString[0].trim()} {implementoString} {posturaString} {variacaoString} {pegadaString} {execucaoString}</Text>

        </View>
        <View style={[{marginVertical: '5%'}]}>
        <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=> montarExercicio(nomeExercicio, variacaoString, implementoString, posturaString, pegadaString, execucaoString)}>
            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>SALVAR EXERCÍCIO</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
    )
}
