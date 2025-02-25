import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import estilo from '../estilo';
import { useFonts } from "expo-font";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { getFirestore, collectionGroup, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { professorLogado, enderecoProfessor } from '../LoginScreen';

export default ({navigation, conexao}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Regular.ttf'),

        
    })
   /* const handleDeleteAccount = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Erro", "Nenhum usuário autenticado.");
                return;
            }

            const firebaseBD = getFirestore();

            const professoresQuery = query(
                collectionGroup(firebaseBD, 'Professores'),
                where('email', '==', professorLogado.getEmail())
            );

            const querySnapshot = await getDocs(professoresQuery);
            querySnapshot.forEach(async (docSnapshot) => {
                const professorRef = doc(firebaseBD, docSnapshot.ref.path);
                await deleteDoc(professorRef);
                console.log("Documento do professor excluído:", professorRef.path);
            });

            await deleteUser(user);

            await AsyncStorage.clear();

            Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Erro ao excluir a conta:", error.message);
            Alert.alert("Erro", "Não foi possível excluir a conta. Tente novamente mais tarde.");
        }
    };
*/
    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            console.log("Usuário deslogado com sucesso!");
            alert("Desconectado com sucesso!")
            navigation.navigate('Login')
            AsyncStorage.clear()
        })
          .catch((error) => {
            console.error(error.message);
          });
      };

    return(
        <ScrollView>
            <View style={[estilo.corLightMenos1, style.container]}>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Academia:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getAcademia()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>CPF:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getCpf()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Data de nascimento:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getDataNascimento()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Telefone:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getTelefone()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Login:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getEmail()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Senha:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getSenha()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Profissão:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professorLogado.getProfissao()}</Text>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>Endereço:</Text>
            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{enderecoProfessor.getRua()},{enderecoProfessor.getNumero()}, {enderecoProfessor.getCidade()}, {enderecoProfessor.getEstado()}</Text>
            <TouchableOpacity style={[estilo.botao, conexao? estilo.corPrimaria : estilo.corDisabled, estilo.sombra, {marginTop: '5%'}]} disabled={!conexao} onPress={()=>navigation.navigate('Editar foto')}>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >ALTERAR FOTO</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={[estilo.botao, estilo.corDanger, estilo.sombra, {marginTop: '5%'}]} onPress={() =>
                      Alert.alert(
                        "Confirmação",
                        "Tem certeza de que deseja excluir sua conta? Seus dados serão apagados permanentemente!!",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Excluir",
                            style: "destructive",
                            onPress: handleDeleteAccount,
                          },
                        ]
                      )
                    }>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >Excluir Conta</Text>
            </TouchableOpacity>*/}
        </View>
        </ScrollView>

    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    montserrat: {
        fontFamily: 'Montserrat'
    }
})