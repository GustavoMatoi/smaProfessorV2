import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, Alert, View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDocs, getDoc, getFirestore, where, query, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo"
import { AntDesign } from '@expo/vector-icons';
import Logo from "../../Logo";
import estilo from "../../estilo";

import { professorLogado } from "../../LoginScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default ({ navigation, route }) => {
    const { turma } = route.params

    const [nomeUpdate, setNomeUpdate] = useState(turma.nome || '');
    const [vagasUpdate, setVagasUpdate] = useState(turma.vagas || '')
    const [conexao, setConexao] = useState(true);
    const [horarioUpdate, setHorarioUpdate] = useState(turma.horario || '')
    const [turmas, setTurmas] = useState([]);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])
    

    const updateTurma = async () => {
        try {
            if(turma != 'nova'){
                const db = getFirestore();
                const academiaDocRef = doc(db, "Academias", professorLogado.getAcademia(), "Turmas", turma.id);
            
                // Update the Turma document
                await updateDoc(academiaDocRef, {
                  nome: nomeUpdate,
                  horario: horarioUpdate,
                  vagas: vagasUpdate
                });
            
                // Update the turma field for each student in the Alunos collection
                const alunosRef = collection(db, "Academias", professorLogado.getAcademia(), 'Alunos');
                const alunosSnapshot = await getDocs(alunosRef);
            
                const updatePromises = alunosSnapshot.docs.map(async (item) => {
                    const alunoData = item.data();
                    const alunoDocRef = doc(db, "Academias", professorLogado.getAcademia(), 'Alunos', alunoData.email);
                    console.log(email.email);
                    console.log(nomeUpdate);
                    // Atualiza a turma se for a mesma que está sendo editada
                    if (alunoData.turma === turma.id) {
                        await updateDoc(alunoDocRef, { nome: nomeUpdate });
                    }
                    console.log(email.turma);
                });
            
                // Wait for all updates to complete before proceeding
                await Promise.all([updatePromises]).then((values) => {
                    console.log(values)});
            
                Alert.alert("Turma atualizada com sucesso!", "A turma foi atualizada com sucesso.");
                navigation.goBack();
            } else {
                const bd = getFirestore();
                const turmaRef = collection(bd, 'Academias', professorLogado.getAcademia(), 'Turmas');
            
                const novoDocumentoData = {
                    nome: nomeUpdate,
                    horario: horarioUpdate,
                    vagas: vagasUpdate
                };
            
                const novoDocumentoRef = await addDoc(turmaRef, novoDocumentoData);
            
                console.log('Novo documento adicionado com ID:', novoDocumentoRef.id);
                }

                Alert.alert("Turma cadastrada com sucesso!", "A turma foi cadastrada com sucesso.");
                navigation.goBack();

            
        } catch (error) {
          Alert.alert("Ops..", "Ocorreu um erro durante a atualização da turma. Tente novamente mais tarde.");
          console.log(error);
        }
      };
      
      const deleteTurma = async () => {
        try {
          const db = getFirestore();
          const academiaDocRef = doc(db, "Academias", professorLogado.getAcademia(), "Turmas", turma.id);
      
          // Update the Turma document
          await updateDoc(academiaDocRef, {
            nome: nomeUpdate,
            horario: horarioUpdate,
            vagas: vagasUpdate
          });
      
          // Update the turma field for each student in the Alunos collection
          const alunosRef = collection(db, "Academias", professorLogado.getAcademia(), 'Alunos');
          const alunosSnapshot = await getDocs(alunosRef);
      
          const updatePromises = alunosSnapshot.docs.map(async (item) => {
            const email = item.data();
            console.log(email.email);
            console.log(nomeUpdate);
      
            const alunoDocRef = doc(db, "Academias", professorLogado.getAcademia(), 'Alunos', email.email);
            console.log('email.turma', email.turma)
            console.log('turma.nome', turma.nome)
            if(email.turma === turma.id){
                await updateDoc(alunoDocRef, {
                    turma: ''
                  });
            }
      
            console.log(email.turma);
          });
      
          // Wait for all updates to complete before proceeding
          await Promise.all(updatePromises);
 
          deleteDoc(academiaDocRef)
          
          Alert.alert("Turma excluída com sucesso!", "A turma foi deletada com sucesso.");
          navigation.goBack();
        } catch (error) {
          Alert.alert("Ops..", "Ocorreu um erro durante a exclusão da turma. Tente novamente mais tarde.");
          console.log(error);
        }
      };

    return (
        <ScrollView style={style.container}>
            <Text style={[estilo.tituloH523px, estilo.centralizado, estilo.textoCorSecundaria, { margin: 10 }]}>Alterar dados da Turma</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { marginBottom: 5, marginLeft: '5%' }]}>Nome da turma:</Text>
            <TextInput
                value={nomeUpdate }
                style={[style.botaoInput,]}
                onChangeText={(text)=>setNomeUpdate(text)}
            />
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {
                marginBottom: 5, marginLeft: '5%'
            }]}>Vagas da turma:</Text>
            <TextInput
                value={vagasUpdate}
                style={[style.botaoInput,]}
                onChangeText={(text)=>setVagasUpdate(text)}

            />
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {marginBottom: 5, marginLeft: '5%'}]}>Horário da turma:</Text>
            <TextInput
                value={horarioUpdate}
                style={[style.botaoInput,]}
                onChangeText={(text)=>setHorarioUpdate(text)}

            />


            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => updateTurma()}>
                <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>{turma === 'nova'? 'Criar' : "Atualizar"}</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={[estilo.botao, estilo.corDanger, {flexDirection: 'row', justifyContent: 'center'}]} onPress={() => deleteTurma()}>
            <AntDesign name="delete" size={24} color="white" />                
            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>Apagar turma</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    botaoInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        elevation: 10,
        marginLeft: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        textDecorationLine: 'underline',
        marginBottom: '5%'

    },
    foto: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
        justifyContent: 'space-around', // Alinha os itens horizontalmente

    }

})