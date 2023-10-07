import react, {useState, useEffect} from "react";
import {View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../../Home";
import Spinner from "react-native-loading-spinner-overlay";

export default ({navigation,route}) => {
    const [exercicio, setExercicio] = useState('')
    const [grupoMuscular, setGrupoMuscular] = useState([])
    const [carregandoDados, setCarregandoDados] = useState(true)
    const [abdominais, setAbdominais] = useState([])
    const [antebracos, setAntebracos] = useState([])
    const [biceps, setBiceps] = useState([])
    const [deltoide, setDeltoide] = useState([])
    const [gradeDorsal, setGradeDorsal] = useState([])
    const [latissimoDoDorso, setLatissimoDoDorso] = useState([])
    const [manguitoRotador, setManguitoRotador] = useState([])
    const [paravertebrais, setParavertebrais] = useState([])
    const [peitoral, setPeitoral] = useState([])
    const [subescapular, setSubescapular] = useState([])
    const [transvesversoAbdominal, setTransversoAbdominal] = useState([])
    const [trapezio, setTrapezio] = useState([])
    const [triceps, setTriceps] = useState([])
    const [selecionado, setSelecionado] = useState('')
    const recuperarExercicios = async () => {
        const documentos = [];
        const abdominaisTemp = []
        const antebracoTemp = []
        const bicepsTemp = []
        const deltoideTemp = []
        const gradeDorsalTemp = []
        const latissimoDoDorsoTemp = []
        const manguitoRotadorTemp = []
        const paravertebraisTemp = []
        const peitoralTemp = []
        const subescapularTemp = []
        const transvesversoAbdominalTemp = []
        const trapezioTemp = []
        const tricepsTemp = []
        
        try {
          const db = getFirestore();
          const exercicioRef = collection(
            db,
            'Exercicios',
            'listaDeExercicios',
            'ExerciciosMembrosSuperiores'
          );

          const querySnapshot = await getDocs(exercicioRef);

          querySnapshot.forEach(async (doc) => {
            const dados = doc.data();
            documentos.push(dados);

            const abdominaisRef = collection(exercicioRef, doc.id, 'Exercicios')

            const abdomnaisSnapshot = await getDocs (abdominaisRef)
            
            abdomnaisSnapshot.forEach((abdominaisDoc) => {
              if(doc.id === 'Abdominais'){
                abdominaisTemp.push(abdominaisDoc.get('nome'))              
              } 
              if( doc.id === 'Antebracos'){
                antebracoTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Biceps'){
                bicepsTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Deltoide'){
                deltoideTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'GradeDorsal'){
                gradeDorsalTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'LatissimoDoDorso'){
                latissimoDoDorsoTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'ManguitoRotador'){
                manguitoRotadorTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Paravertebrais'){
                paravertebraisTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Peitoral'){
                peitoralTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Subescapular'){
                subescapularTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'TransversoAbdominal'){
                transvesversoAbdominalTemp.push(abdominaisDoc.get('nome'))
                console.log(transvesversoAbdominalTemp)
              }
              if(doc.id === 'Trapezio'){
                trapezioTemp.push(abdominaisDoc.get('nome'))
              }
              if(doc.id === 'Triceps'){
                tricepsTemp.push(abdominaisDoc.get('nome'))
              }
            })

            setGrupoMuscular(documentos)        
            setAbdominais(abdominaisTemp)
            setAntebracos(antebracoTemp)
            setBiceps(bicepsTemp)
            setDeltoide(deltoideTemp)
            setGradeDorsal(gradeDorsalTemp)
            setLatissimoDoDorso(latissimoDoDorsoTemp)
            setManguitoRotador(manguitoRotadorTemp)
            setParavertebrais(paravertebraisTemp)
            setPeitoral(peitoralTemp)
            setSubescapular(subescapularTemp)
            setTransversoAbdominal(transvesversoAbdominalTemp)
            setTrapezio(trapezioTemp)
            setTriceps(tricepsTemp)

          });

          
        } catch (error) {
          console.error('Error retrieving exercises:', error);
        }
        finally {
          setCarregandoDados(false)
        }

 
    };
    const handleSelecaoExercicio = (value, grupoMuscular) => {
            if(value.length === 0 || grupoMuscular == ''){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      }   else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value, grupoMuscular: grupoMuscular, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno})
      }
    }


    useEffect(() => {
        recuperarExercicios()
    }, [])
    return (
      <View>
        {carregandoDados ? (
          <Spinner
            visible={carregandoDados}
            textContent={'Carregando exercícios...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          />
        ) : (
          <ScrollView style={[estilo.centralizado, { width: '100%' }]}>
            <View style={[ estilo.centralizado, {marginVertical: 10}]}>
              <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Grupos musculares:</Text>

            </View>
            {grupoMuscular.length === 0 ?           <Spinner
            visible={carregandoDados}
            textContent={'Carregando exercícios...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          /> : (
              <>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[0].grupoMuscular)
                    }
                    options={abdominais}
                    select={grupoMuscular[0].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[1].grupoMuscular)
                    }
                    options={antebracos}
                    select={grupoMuscular[1].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[2].grupoMuscular)
                    }
                    options={biceps}
                    select={grupoMuscular[2].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[3].grupoMuscular)
                    }
                    options={deltoide}
                    select={grupoMuscular[3].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[4].grupoMuscular)
                    }
                    options={gradeDorsal}
                    select={grupoMuscular[4].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[5].grupoMuscular)
                    }
                    options={latissimoDoDorso}
                    select={grupoMuscular[5].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[6].grupoMuscular)
                    }
                    options={manguitoRotador}
                    select={grupoMuscular[6].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[7].grupoMuscular)
                    }
                    options={paravertebrais}
                    select={grupoMuscular[7].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[8].grupoMuscular)
                    }
                    options={peitoral}
                    select={grupoMuscular[8].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[9].grupoMuscular)
                    }
                    options={subescapular}
                    select={grupoMuscular[9].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[10].grupoMuscular)
                    }
                    options={transvesversoAbdominal}
                    select={grupoMuscular[10].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[11].grupoMuscular)
                    }
                    options={trapezio}
                    select={grupoMuscular[11].grupoMuscular}
                  />
                </View>
                <View style={{ marginBottom: '5%' }}>
                  <BotaoSelect
                    selecionado={true}
                    titulo='Selecione um exercício'
                    max={1}
                    onChange={(value) =>
                      handleSelecaoExercicio(value, grupoMuscular[12].grupoMuscular)
                    }
                    options={triceps}
                    select={grupoMuscular[12].grupoMuscular}
                  />
                </View>
              </>
            )}
          </ScrollView>
        )}
      </View>
    );
    
}