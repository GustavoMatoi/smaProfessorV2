import react, {useState, useEffect} from "react";
import {View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../../Home";
import Spinner from "react-native-loading-spinner-overlay";

export default ({navigation}) => {
    const [grupoMuscular, setGrupoMuscular] = useState([])
    const [carregandoDados, setCarregandoDados] = useState(true)
    const [abdominais, setAbdominais] = useState([])
    const [antebracos, setAntebracos] = useState([])
    const [selecionado, setSelecionado] = useState('')
    const recuperarExercicios = async () => {
        const documentos = [];
        const abdominaisTemp = []
        const antebracoTemp = []
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
            })
            console.log(antebracoTemp)
            setCarregandoDados(false)
            setGrupoMuscular(documentos)        
            setAbdominais(abdominaisTemp)
            setAntebracos(antebracoTemp)
          });
        } catch (error) {
          console.error('Error retrieving exercises:', error);
        }

        console.log('Carregou')
 
    };
    const handleSelecaoExercicio = (value, grupoMuscular) => {
            if(value.length === 0 || grupoMuscular == ''){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      }   else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value, grupoMuscular: grupoMuscular})
      }
    }

    console.log('abdominais', abdominais)

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
          <ScrollView style={[estilo.centralizado, { width: '95%' }]}>
            <Text>Exercício</Text>
            {grupoMuscular.length === 0 ? null : (
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
              </>
            )}
          </ScrollView>
        )}
      </View>
    );
    
}