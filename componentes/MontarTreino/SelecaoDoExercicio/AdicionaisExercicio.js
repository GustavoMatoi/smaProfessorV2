import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import estilo from "../../estilo"
import RadioBotao from "../../RadioBotao";
export default ({ navigation, route }) => {
    const { nomeExercicio, exercicio, tipo } = route.params;
    const [exercicioString, setExercicioString] = useState('')
    const [dataExercicio, setDataExercicio] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [variacoesExercicio, setVariacoesExercicio] = useState([]);
    const [implementosExercicio, setImplementosExercicio] = useState([]);
    const [posturasExercicio, setPosturaExercicios] = useState([]);
    const [pegadasExercicio, setPegadasExercicio] = useState([]);
    const [execucoesExercicio, setExecucoesExercicio] = useState([]);
    const [posicaoDosPes, setPosicaoDosPes] = useState([])
    const [quadril, setQuadril] = useState([])
    const [amplitude, setAmplitude] = useState([])
    const [posicao, setPosicao] = useState([])
    const [posicaoDosJoelhos, setPosicaoDosJoelhos] = useState([])
    const [apoioDosPes, setApoioDosPes] = useState([])
    const [sentidoDoMovimento, setSentidoDoMovimento] = useState([])
    const [posicaoDosPesSelecionada, setPosicaoDosPesSelecionada] = useState(-1)
    const [quadrilSelecionado, setQuadrilSelecionado] = useState(-1)
    const [amplitudeSelecionada, setAmplitudeSelecionada] = useState(-1)
    const [posicaoSelecionada, setPosicaoSelecionada] = useState(-1)
    const [posicaoDosJoelhosSelecionada, setPosicaoDosJoelhosSelecionada] = useState(-1)
    const [apoioDosPesSelecionado, setApoioDosPesSelecionado] = useState(-1)

    const [posicaoDosPesString, setPosicaoDosPesString] = useState('')
    const [quadrilString, setQuadrilString] = useState('')
    const [amplitudeString, setAmplitudeString] = useState('')
    const [posicaoString, setPosicaoString] = useState('')
    const [posicaoDosJoelhosString, setPosicaoDosJoelhosString] = useState('')
    const [apoioDosPesString, setApoioDosPesString] = useState('')

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

    const [imagem, setImagem] = useState('')
    useEffect(() => {
        const fetchData =  () => {
                if(tipo === 'ExerciciosMembrosSuperiores' || tipo === 'ExerciciosMembrosInferiores'){
                    
                    if ("variacoes" in exercicio) {
                        setVariacoesExercicio(Object.values(exercicio.variacoes));
                    }
                    
                    if ("implemento" in exercicio) {
                        setImplementosExercicio(Object.values(exercicio.implemento));
                    }
                    
                    if ("postura" in exercicio) {
                        setPosturaExercicios(Object.values(exercicio.postura));
                    }
                    
                    if ("pegada" in exercicio) {
                        setPegadasExercicio(Object.values(exercicio.pegada));
                    }
                    
                    if ("execucao" in exercicio) {
                        setExecucoesExercicio(Object.values(exercicio.execucao));
                    }
                    if ('posicaoDosPes' in exercicio){
                        setPosicaoDosPes(Object.values(exercicio.posicaoDosPes))
                    }
                    if('quadril' in exercicio){
                        setQuadril(Object.values(exercicio.quadril))
                    }
                    if('amplitude' in exercicio){
                        setAmplitude(Object.values(exercicio.amplitude))
                    }
                    if('posicao' in exercicio){
                        setPosicao(Object.values(exercicio.posicao))
                    }
                    if('posicaoDosJoelhos' in exercicio){
                        setPosicaoDosJoelhos(Object.values(exercicio.posicaoDosJoelhos))
                    }
                    if('apoioDosPes' in exercicio){
                        setApoioDosPes(Object.values(exercicio.apoioDosPes))
                    }


                } else if (tipo === 'Aerobicos'){
                    setExercicioString(exercicio)
                } else { 

                    
                    setDataExercicio(exercicio || {});
                    
                    if ("sentidoDoMovimento" in exercicio) {
                        setSentidoDoMovimento(Object.values(exercicio.sentidoDoMovimento));
                    }
                    
                    if ("execucao" in exercicio) {
                        setExecucoesExercicio(Object.values(exercicio.execucao));
                    }

                    if(exercicio.hasOwnProperty('imagem')){
                        setImagem(exercicio.imagem)
                    }

                }
                setCarregando(false);
        };
    
        fetchData();
    }, [nomeExercicio]);


    
    const style = StyleSheet.create({
        areaSelecao: {
            width: '100%',
            padding: 20
        }
    })

    const montarExercicio = (nome, variacao, implemento, postura, pegada, execucao, posicaoDosPes, posicaoDosJoelhos, quadril, amplitude, apoioDosPes) => {
        let exercicioAux = nome;
        if (variacao){
            exercicioAux += `${variacao}` 
        }
        if(implemento){
            exercicioAux += `${implemento}`
        }
        if(postura){
            exercicioAux += `${postura}`
        }
        if(pegada){
            exercicioAux += `${pegada}`
        }
        if(execucao) {
            exercicioAux += `${execucao}`
        }
        if(posicaoDosPes){
            exercicioAux += `${posicaoDosJoelhos}`
        }
        if(quadril){
            exercicioAux += `${quadril}`
        }
        if(amplitude){
            exercicioAux += `${amplitude}`
        }
        if(apoioDosPes){
            exercicioAux += `${apoioDosPes}`
        }

        setExercicioString(exercicioAux)
        route.params.receberExercicio(exercicioAux, imagem)
        navigation.navigate('Montar treino', {aluno: route.params.aluno})
    }

    const nomeExercicioString = exercicio.nome.split("(");
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
                                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado, {marginVertical: '5%'}]}>{exercicio.nome}</Text>
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
                    {posicaoDosPes.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Posição dos pés: </Text>
                        <RadioBotao
                            options={posicaoDosPes}
                            onChangeSelect={(opt, i) => {setPosicaoDosPesSelecionada(i); setPosicaoDosPesString(opt)}}
                            selected={posicaoDosPesSelecionada}
                        />
                        </View>}
                    {quadril.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Quadril: </Text>
                        <RadioBotao
                            options={quadril}
                            onChangeSelect={(opt, i) => {setQuadrilSelecionado(i); setQuadrilString(opt)}}
                            selected={quadrilSelecionado}
                        />
                        </View>}
                        
                    {amplitude.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Amplitude: </Text>
                        <RadioBotao
                            options={amplitude}
                            onChangeSelect={(opt, i) => {setAmplitudeSelecionada(i); setAmplitudeString(opt)}}
                            selected={amplitudeSelecionada}
                        />
                        </View>}
                    {posicao.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Posição: </Text>
                        <RadioBotao
                            options={posicao}
                            onChangeSelect={(opt, i) => {setPosicaoSelecionada(i); setPosicaoString(opt)}}
                            selected={posicaoSelecionada}
                        />
                        </View>}
                  
                    {posicaoDosJoelhos.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Posição dos Joelhos: </Text>
                        <RadioBotao
                            options={posicaoDosJoelhos}
                            onChangeSelect={(opt, i) => {setPosicaoDosJoelhosSelecionada(i); setPosicaoDosJoelhosString(opt)}}
                            selected={posicaoDosJoelhosSelecionada}
                        />
                        </View>}
                    {apoioDosPes.length === 0 ? null : 
                    <View style={style.areaSelecao}>
                    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Apoio dos pés: </Text>
                        <RadioBotao
                            options={apoioDosPes}
                            onChangeSelect={(opt, i) => {setApoioDosPesSelecionado(i); setApoioDosPesString(opt)}}
                            selected={apoioDosPesSelecionado}
                        />
                        </View>
                        
                        }

                    {imagem != '' ? 
                    <Image source={{uri: imagem}}
                        width={300}
                        height={300}
                        style={[estilo.centralizado, {marginBottom: 10}]}/> : null
                }

                
                </View>
)}
        <View style={[estilo.centralizado, {width: '80%'}]}>
        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px]}>Exercício: {nomeExercicioString[0].trim()} {implementoString} {posturaString} {variacaoString} {pegadaString} {execucaoString} {posicaoDosPesString} {quadrilString} {amplitudeString} {posicaoString} {posicaoDosJoelhosString} {apoioDosPesString}</Text>

        </View>
        <View style={[{marginVertical: '5%'}]}>
        <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=> montarExercicio(nomeExercicioString[0].trim(), variacaoString, implementoString, posturaString, pegadaString, execucaoString, posicaoDosPesString, posicaoDosJoelhosString, quadrilString, amplitudeString, apoioDosPesString, imagem)}>
            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>SALVAR EXERCÍCIO</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
    )
}
