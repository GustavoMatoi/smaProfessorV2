import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import Aerobicos from "../../../Exercicios/Aerobicos";
import MembrosSuperiores from "../../../Exercicios/MembrosSuperiores";
import Alongamentos from "../../../Exercicios/Alongamentos";
import MembrosInferores from "../../../Exercicios/MembrosInferiores"
import { professorLogado } from "../../LoginScreen";
import NetInfo from '@react-native-community/netinfo';

export default ({ navigation, route }) => {
  const [exercicio, setExercicio] = useState('')
  const [grupoMuscular, setGrupoMuscular] = useState([])
  const [carregandoDados, setCarregandoDados] = useState(false)

  const [alongamentos, setAlongamentos] = useState([])
  const [selecionado, setSelecionado] = useState('')
  const [cardioSelecionado, setCardioSelecionado] = useState('')
  const [exerciciosBd, setExerciciosBd] = useState([])
  const [nomesExerciciosBd, setNomesExerciciosBd] = useState([])
  const [conexao, setConexao] = useState(true)
  const [exerciciosBdAux, setExerciciosBdAux] = useState([])
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
        unsubscribe()
    }
}, [])

  useEffect(() => {
      const exerciciosAux = []

      const recuperarExerciciosBD = async () => {
  
        if(conexao){
          const bd = getFirestore()
          const tipoExercicio = tipo === 'força' ? 'ExerciciosForça' : tipo === 'alongamento' || tipo === 'Alongamento' ? 'ExerciciosAlongamento' : 'ExerciciosAerobicos'
          const exercicioRef = collection(bd, 'Academias', professorLogado.getAcademia(), tipoExercicio)
          console.log('tipoExercicio', tipoExercicio)

          const exerciciosSnapshot = await getDocs(exercicioRef)
    
          const promises = exerciciosSnapshot.docs.map(async (exercicio) => {
            exerciciosAux.push(exercicio.data())
            console.log('exercicio.data()', exercicio.data())
          });
    
          await Promise.all(promises);
    
          setExerciciosBd(exerciciosAux)
          const exerciciosBdNome = exerciciosAux.map(item => item.nome)
          setNomesExerciciosBd(exerciciosBdNome)
          console.log('exerciciosBd', exerciciosAux)

          if (tipo == 'força') {
            MembrosSuperiores[13] = { exercicios: exerciciosAux }

            const exerciciosBDAux = MembrosSuperiores[13].exercicios.map((item => item.nome))
            setExerciciosBdAux(exerciciosBDAux)

          }

        }

      }
      setCarregandoDados(false)
      recuperarExerciciosBD()
    

  }, [])
  const { tipo, index } = route.params
  const indexPorParametro = index
  const handleSelecaoExercicio = (value, index, tipoExercicio) => {
    let exercicioAux = {};
  
    const navegarParaAdicionaisExercicio = (exercicio) => {
      navigation.navigate('Adicionais exercício', {
        exercicio,
        receberExercicio: route.params.receberExercicio,
        aluno: route.params.aluno,
        tipo: tipoExercicio,
        index: indexPorParametro
      });
    };
  
    const encontrarExercicio = (lista, chaveNome) => {
      return lista.find((exercicio) => exercicio[chaveNome] === value);
    };
  
    switch (tipoExercicio) {
      case 'MembrosSuperiores':
        exercicioAux = encontrarExercicio(MembrosSuperiores[index].exercicios, 'nome') || {};
        break;
      case 'MembrosInferiores':
        exercicioAux = encontrarExercicio(MembrosInferores[index].exercicios, 'nome') || {};
        break;
      case 'Alongamento':
        if (value === 'Personalizado') {
          return navegarParaAdicionaisExercicio('Personalizado');
        }
        exercicioAux = encontrarExercicio(exerciciosBd, 'nome') || encontrarExercicio(Alongamentos[index].exercicios, 'subnome') || {};
        break;
      case 'Força':
        return navegarParaAdicionaisExercicio('Personalizado');
      default:
        break;
    }
  
    if (Object.keys(exercicioAux).length === 0) {
      Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
    } else {
      setSelecionado(value);
      navegarParaAdicionaisExercicio(exercicioAux);
    }
  };
  
  const handleSelecaoExercicioCardio = (value, tipo) => {
    if (value === 'Personalizado') {
      navigation.navigate('Adicionais exercício', { exercicio: 'Personalizado', receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo, index: index })

    } else {
      let exercicioAux = {}
      for (i of Aerobicos) {
        if (i.nome === value) {
          exercicioAux = { ...i }
        }
      }
      if (Object.keys(exercicioAux).length === 0) {
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      } else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', { exercicio: exercicioAux, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo, index: index })
      }
    }

  }


  const peitoral = MembrosSuperiores[0].exercicios.map((item) => item.nome)
  const grandeDorsal = MembrosSuperiores[1].exercicios.map((item) => item.nome)
  const biceps = MembrosSuperiores[2].exercicios.map((item) => item.nome)
  const triceps = MembrosSuperiores[3].exercicios.map((item) => item.nome)
  const abdominais = MembrosSuperiores[4].exercicios.map((item) => item.nome)
  const deltoide = MembrosSuperiores[5].exercicios.map((item) => item.nome)
  const paravertebrais = MembrosSuperiores[6].exercicios.map((item) => item.nome)
  const antebracos = MembrosSuperiores[7].exercicios.map((item) => item.nome)
  const transversoAbdominal = MembrosSuperiores[8].exercicios.map((item) => item.nome)
  const trapezio = MembrosSuperiores[9].exercicios.map((item) => item.nome)
  const subescapular = MembrosSuperiores[10].exercicios.map((item) => item.nome)
  const manguitoRotador = MembrosSuperiores[11].exercicios.map((item) => item.nome)
  const latissimoDoDorso = MembrosSuperiores[12].exercicios.map((item => item.nome))
  const cardios = Aerobicos.map((item) => item.nome)

  const multiarticular = MembrosInferores[0].exercicios.map((item) => item.nome)
  const uniarticular = MembrosInferores[1].exercicios.map((item) => item.nome)


  const alongamentoQuadriceps = Alongamentos[0].exercicios.map((item) => item.subnome)
  const alongamentoCadeiaAnterior = Alongamentos[1].exercicios.map((item) => item.subnome)
  const alongamentoCadeiaPosterior = Alongamentos[2].exercicios.map((item) => item.subnome)
  const alongamentoParaPeitoral = Alongamentos[3].exercicios.map((item) => item.subnome)
  const alongamentoFibularLongo = Alongamentos[4].exercicios.map((item) => item.subnome)
  const alongamentosAdutores = Alongamentos[5].exercicios.map((item) => item.subnome)
  const alongamentosManguitoRotadores = Alongamentos[6].exercicios.map((item) => item.subnome)
  const alongamentosAbdominalObliquo = Alongamentos[7].exercicios.map((item) => item.subnome)
  const alongamentosGluteoMaximo = Alongamentos[8].exercicios.map((item) => item.subnome)
  const alongamentosGluteoMedio = Alongamentos[9].exercicios.map((item) => item.subnome)
  const alongamentosPanturrilha = Alongamentos[10].exercicios.map((item) => item.subnome)
  const alongamentosAntebraco = Alongamentos[11].exercicios.map((item) => item.subnome)
  const alongamentosCadeiaLateral = Alongamentos[12].exercicios.map((item) => item.subnome)
  const alongamentosRetoFemoral = Alongamentos[13].exercicios.map((item) => item.subnome)
  const alongamentosParavertebrais = Alongamentos[14].exercicios.map((item) => item.subnome)
  const alongamentosTriceps = Alongamentos[15].exercicios.map((item) => item.subnome)
  const alongamentosDeltoide = Alongamentos[16].exercicios.map((item) => item.subnome)
  const alongamentosGrandeDorsal = Alongamentos[17].exercicios.map((item) => item.subnome)
  const alongamentosIsquiotibiais = Alongamentos[18].exercicios.map((item) => item.subnome)
  const alongamentosMusculosDoPescoco = Alongamentos[19].exercicios.map((item) => item.subnome)


  return (
    <View>
      {carregandoDados ? (
        <Spinner
          visible={carregandoDados}
          textContent={'Carregando exercícios...'}
          textStyle={[estilo.textoCorLight, estilo.textoP16px]}
        />
      ) : (
        tipo === 'força' ? <ScrollView style={[estilo.centralizado, { width: '100%' }]}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Selecionar</Text>

          <View style={[estilo.centralizado, { marginVertical: 10 }]}>

            <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Grupos musculares</Text>

          </View>


          {!carregandoDados ? (
                    exerciciosBdAux.length > 0 ? (
                      <View style={{ marginBottom: '3%' }}>
                        <Text
                          style={[
                            estilo.textoCorSecundaria,
                            estilo.tituloH619px,
                            { marginVertical: '2%' },
                          ]}
                        >
                          Exercícios salvos no Banco de Dados:
                        </Text>

                        <BotaoSelect
                          selecionado={true}
                          titulo="Selecione um exercício"
                          max={1}
                          onChange={(value) =>
                            handleSelecaoExercicio(value, 13, 'MembrosSuperiores')
                          }
                          options={exerciciosBdAux}
                          select={'Exercícios salvos Online'}
                        />
                      </View>
                    ) : (
                      null
                    )
                  ) : (
                    <Text>Recuperando exercícios do BD...</Text>

                  )}
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros superiores:</Text>

          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Peitoral:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 0, 'MembrosSuperiores')
              }
              options={peitoral}
              select={'Exercícios peitoral'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Grande dorsal:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 1, 'MembrosSuperiores')
              }
              options={grandeDorsal}
              select={'Exercícios grande dorsal'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Bíceps:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 2, 'MembrosSuperiores')
              }
              options={biceps}
              select={'Exercícios bíceps'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Tríceps:</Text>
            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 3, 'MembrosSuperiores')
              }
              options={triceps}
              select={'Exercícios tríceps'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Abdominais:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 4, 'MembrosSuperiores')
              }
              options={abdominais}
              select={'Exercícios abdominais'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Deltóide:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 5, 'MembrosSuperiores')
              }
              options={deltoide}
              select={'Exercícios deltóide'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Paravertebrais:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 6, 'MembrosSuperiores')
              }
              options={paravertebrais}
              select={'Exercícios paravertebrais'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Antebraço:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 7, 'MembrosSuperiores')
              }
              options={antebracos}
              select={'Exercícios antebraço'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Transverso abdominal:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 8, 'MembrosSuperiores')
              }
              options={transversoAbdominal}
              select={'Exercíciso transverso abdominal'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Trapézio:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 9, 'MembrosSuperiores')
              }
              options={trapezio}
              select={'Exercícios trapézio'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Subescapular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 10, 'MembrosSuperiores')
              }
              options={subescapular}
              select={'Exercícios subescapular'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Manguito rotador:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 11, 'MembrosSuperiores')
              }
              options={manguitoRotador}
              select={'Exercícios manguito rotador'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Latissimo do dorso:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 12, 'MembrosSuperiores')
              }
              options={latissimoDoDorso}
              select={'Exercícios latissimo do dorso'}
            />
          </View>

          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros inferiores:</Text>

          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Multiarticular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 0, 'MembrosInferiores')
              }
              options={multiarticular}
              select={'Exercícios multiarticulares'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Uniarticular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 1, 'MembrosInferiores')
              }
              options={uniarticular}
              select={'Exercícios uniarticulares'}
            />
          </View>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Combinar exercícios:</Text>
          <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => { handleSelecaoExercicio('Personalizado', 0, 'Força') }}>
            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>COMBINAR</Text>
          </TouchableOpacity>
        </ScrollView>
          :
          tipo === 'aerobicos' ? <>
            <View style={{ marginBottom: '3%', padding: 10 }}>


              <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Selecione um exercício:</Text>

              <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  handleSelecaoExercicioCardio(value, 'Aerobicos')
                }
                options={cardios}
              />
            </View>
            {!carregandoDados ? (
              exerciciosBd.length >= 1 ? (
                <View style={{ marginBottom: '3%' }}>
                  <Text
                    style={[
                      estilo.textoCorSecundaria,
                      estilo.tituloH619px,
                      { marginVertical: '2%' },
                    ]}
                  >
                    Exercícios salvos no Banco de Dados:
                  </Text>

                  <BotaoSelect
                    selecionado={true}
                    titulo="Selecione um exercício"
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicioCardio(value, 'Aerobicos')
                    }
                    options={exerciciosBdAux}
                    select={'Exercícios salvos Online'}
                  />
                </View>
              ) : (
                null
              )
            ) : (
              <Text>Recuperando exercícios do BD...</Text>

            )}

            <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Combinar exercícios:</Text>
            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => { handleSelecaoExercicioCardio('Personalizado', 'Aerobicos') }}>
              <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>COMBINAR</Text>
            </TouchableOpacity>

          </> :
            tipo === 'alongamento' ?
              <ScrollView>
                <View style={{ padding: 10 }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Selecionar</Text>

                  <View style={[estilo.centralizado, { marginVertical: 10 }]}>

                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Grupos musculares</Text>

                  </View>
                  {!carregandoDados ? (
                    exerciciosBd.length >= 1 ? (
                      <View style={{ marginBottom: '3%' }}>
                        <Text
                          style={[
                            estilo.textoCorSecundaria,
                            estilo.tituloH619px,
                            { marginVertical: '2%' },
                          ]}
                        >
                          Exercícios salvos no Banco de Dados:
                        </Text>

                        <BotaoSelect
                          selecionado={true}
                          titulo="Selecione um exercício"
                          max={1}
                          onChange={(value) =>
                            handleSelecaoExercicio(value, 0, 'Alongamento')
                          }
                          options={nomesExerciciosBd}
                          select={'Exercícios salvos Online'}
                        />
                      </View>
                    ) : (
                      null
                    )
                  ) : (
                    <Text>Recuperando exercícios do BD...</Text>

                  )}
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Quadríceps:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 0, 'Alongamento')
                    }
                    options={alongamentoQuadriceps}
                    select={'Quadríceps'}
                  />
                </View>


                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Cadeia anterior:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 1, 'Alongamento')
                    }
                    options={alongamentoCadeiaAnterior}
                    select={'Cadeia anterior'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Cadeia posterior:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 2, 'Alongamento')
                    }
                    options={alongamentoCadeiaPosterior}
                    select={'Cadeia posterior'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Peitoral:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 3, 'Alongamento')
                    }
                    options={alongamentoParaPeitoral}
                    select={'Peitoral'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Fibular longo:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 4, 'Alongamento')
                    }
                    options={alongamentoFibularLongo}
                    select={'Fibular longo'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Adutores do quadril:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 5, 'Alongamento')
                    }
                    options={alongamentosAdutores}
                    select={'Adutores do quadril'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Manguito Rotadores:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 6, 'Alongamento')
                    }
                    options={alongamentosManguitoRotadores}
                    select={'Manguito rotadores'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Abdominal oblíquo:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 7, 'Alongamento')
                    }
                    options={alongamentosAbdominalObliquo}
                    select={'Abdominal Oblíquo'}
                  />
                </View>

                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Glúteo máximo:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 8, 'Alongamento')
                    }
                    options={alongamentosGluteoMaximo}
                    select={'Glúteo máximo'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Glúteo médio:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 9, 'Alongamento')
                    }
                    options={alongamentosGluteoMedio}
                    select={'Glúteo médio'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Panturrilha:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 10, 'Alongamento')
                    }
                    options={alongamentosPanturrilha}
                    select={'Panturrilha'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Cadeia lateral:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 12, 'Alongamento')
                    }
                    options={alongamentosCadeiaLateral}
                    select={'Cadeia lateral'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Antebraço:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 11, 'Alongamento')
                    }
                    options={alongamentosAntebraco}
                    select={'Antebraço'}
                  />
                </View>

                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Reto femoral:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 13, 'Alongamento')
                    }
                    options={alongamentosRetoFemoral}
                    select={'Reto femoral'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Paravertebrais:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 14, 'Alongamento')
                    }
                    options={alongamentosParavertebrais}
                    select={'Paravertebrais'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Tríceps:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 15, 'Alongamento')
                    }
                    options={alongamentosTriceps}
                    select={'Tríceps'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Deltóide:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 16, 'Alongamento')
                    }
                    options={alongamentosDeltoide}
                    select={'Deltóide'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Grande dorsal:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 17, 'Alongamento')
                    }
                    options={alongamentosGrandeDorsal}
                    select={'Grande dorsal'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Isquiotibiais:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 18, 'Alongamento')
                    }
                    options={alongamentosIsquiotibiais}
                    select={'Isquiotibiais'}
                  />
                </View>
                <View style={{ marginBottom: '3%' }}>
                  <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, { marginVertical: '2%' }]}>Músculos do pescoço:</Text>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, 19, 'Alongamento')
                    }
                    options={alongamentosMusculosDoPescoco}
                    select={'Músculos do pescoço'}
                  />
                </View>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Combinar exercícios:</Text>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => { handleSelecaoExercicio('Personalizado', 0, 'Alongamento') }}>
                  <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>COMBINAR</Text>
                </TouchableOpacity>
              </ScrollView> : null


      )}
    </View>
  );

}