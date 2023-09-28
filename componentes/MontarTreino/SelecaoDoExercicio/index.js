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
    const [selecionado, setSelecionado] = useState('')
    const recuperarExercicios = async () => {
        const documentos = [];
        const abdominaisTemp = []
        try {
          const db = getFirestore();
          const exercicioRef = collection(
            db,
            'Academias',
            professorLogado.getAcademia(),
            'ExerciciosMembrosSuperiores'
          );

          const querySnapshot = await getDocs(exercicioRef);
          console.log("X")

          querySnapshot.forEach(async (doc) => {
            const dados = doc.data();
            documentos.push(dados);
            
            for(const exercicioDoc of querySnapshot.docs){
              const exercicioData = exercicioDoc.data()

              const exerciciosReferencia = collection(exercicioDoc.ref, 'Exercicios');
              const exerciciosSnapshot = await getDocs(exerciciosReferencia)
              
              for (const exercicioDoc of exerciciosSnapshot.docs){
                console.log(exercicioDoc.data())
                
              }
              console.log("Finalizou a primeira iteração")

            }

            const abdominaisRef = collection(exercicioRef, 'Abdominais', 'Exercicios')
            const abdomnaisSnapshot = await getDocs (abdominaisRef)
            
            abdomnaisSnapshot.forEach((abdominaisDoc) => {
              abdominaisTemp.push(abdominaisDoc.get('nome'))
            })
            setCarregandoDados(false)

          });
        } catch (error) {
          console.error('Error retrieving exercises:', error);
        }
        setGrupoMuscular(documentos)        
        setAbdominais(abdominaisTemp)
        console.log('Carregou')
 
    };
    const handleSelecaoExercicio = (value) => {
      if(value === ''){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      } else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value})
      }
    }

    console.log(selecionado)

    useEffect(() => {
        recuperarExercicios()
    }, [])
    return (
        <View>
            {carregandoDados ? 
      <Spinner
      visible={carregandoDados}
      textContent={'Carregando exercícios...'}
      textStyle={[estilo.textoCorLight, estilo.textoP16px]}
    />  :
  <ScrollView style={[estilo.centralizado, {width: '95%'}]}>
  <Text>Exercício</Text>
                {grupoMuscular.map((grupo) => 
                        <View style={{marginTop: '5%'}}>
                        <BotaoSelect     
                        selecionado={true}  
                        onChange={(value, index) => handleSelecaoExercicio(value)} 
                        titulo='Selecione um exercício' max={1} 
                        options={abdominais}
                        select={grupo.grupoMuscular}
                        />
                          </View>
                )}
</ScrollView>
}
</View>
    
    )
}