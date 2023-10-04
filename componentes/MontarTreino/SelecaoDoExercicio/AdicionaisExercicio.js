import React, { useEffect } from "react";
import { Text, View } from 'react-native';
import { getFirestore, collection, where, getDocs, doc, getDoc} from "firebase/firestore";

export default ({ route }) => {
    const { nomeExercicio } = route.params;
    const { grupoMuscular } = route.params

    useEffect(() => {
        const db = getFirestore();
        const documentRef = doc(db, "Exercicios", "listaDeExercicios", 'ExerciciosMembrosSuperiores', grupoMuscular, 'Exercicios', nomeExercicio); 
        console.log(nomeExercicio, grupoMuscular)
    
        const fetchData = async () => {
            try {
                const documentSnapshot = await getDoc(documentRef);
                    console.log(documentSnapshot.data());
                    console.log("Documento recuperado com sucesso!");
            } catch (error) {
                console.error('Erro ao recuperar exercício:', error);
            }
        }; 
    
        fetchData();
    }, []);
    
    return (
        <View>
            <Text>{nomeExercicio || "nome exercício"}</Text>
        </View>
    )
}
