import react, {useState, useEffect} from "react";
import {View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../../Home";

export default props => {
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
            console.log('Carregou')

          });
        } catch (error) {
          console.error('Error retrieving exercises:', error);
        }
        setGrupoMuscular(documentos)        
        setAbdominais(abdominaisTemp)
 
    };
      
    console.log(selecionado)

    useEffect(() => {
        recuperarExercicios()
    }, [])
    return (
        <View>
            {carregandoDados ? 
  <Text>Carregando...</Text>
  :
  <View>
  <Text>Exercício</Text>
                {grupoMuscular.map((grupo) => 
                        <BotaoSelect     
                        selecionado={true}  
                        onChange={(value, index) => setSelecionado(value)} 
                        titulo='Selecione um exercício' max={1} 
                        options={abdominais}
                        select={grupo.grupoMuscular}
                        />
                )}
</View>
}
</View>
    
    )
}