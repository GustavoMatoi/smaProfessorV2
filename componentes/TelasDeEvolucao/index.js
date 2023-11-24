import React, {useState, useEffect} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import Logo from '../Logo'
import estilo from "../estilo"
import { FontAwesome5 } from '@expo/vector-icons'; 
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { collection,setDoc,doc, getDocs, getDoc,getFirestore, where , query , addDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { professorLogado } from "../LoginScreen";
import Spinner from "react-native-loading-spinner-overlay";
import { Entypo } from '@expo/vector-icons'; 
import ModalSemConexao from "../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo"


export default ({navigation}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [alunos, setAlunos] = useState([])
    const [carregandoAlunos, setCarregandoAlunos] = useState(true)
    const [conexao, setConexao] = useState(true)
    useEffect (() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
      })
      return ()=> {
        unsubscribe()
      }
    }, [])
    useEffect(() => {
        const fetchAlunos = async () => {
          try {
            const academiaRef = collection(firebaseBD, 'Academias');
            const querySnapshot = await getDocs(academiaRef);
      
            const newArrayAlunos = [];
      
            for (const academiaDoc of querySnapshot.docs) {
              const academiaNome = academiaDoc.get('nome');
                console.log("Chegou aqui")
                console.log(academiaNome)
                console.log(professorLogado.getAcademia())
              if (academiaNome === professorLogado.getAcademia()) {
                const professoresRef = collection(
                  firebaseBD,
                  'Academias',
                  professorLogado.getAcademia(),
                  'Professores'
                );
                console.log(professorLogado.getAcademia())
                const professoresSnapshot = await getDocs(professoresRef);
      
                for (const professorDoc of professoresSnapshot.docs) {
                    const professorData = professorDoc.data()
                    console.log(professorData)
                  const alunoRef = collection(
                    firebaseBD,
                    'Academias',
                    professorLogado.getAcademia(),
                    'Professores',
                    professorData.nome,
                    'alunos'
                  );
                  const alunoSnapshot = await getDocs(alunoRef);
                    
                  for (const alunoDoc of alunoSnapshot.docs) {
                    const alunoData = alunoDoc.data();
                    console.log(alunoData)
                    newArrayAlunos.push(alunoData);
                  }
                }
              }
            }
      
            setAlunos(newArrayAlunos);
            setCarregandoAlunos(false);
          } catch (error) {
            console.log(error);
            setCarregandoAlunos(false)
          }
        };
      
        fetchAlunos();
      }, []);

      
      return (
        <SafeAreaView>
          {conexao ? (
            <>
              <Text
                style={[
                  estilo.textoCorDanger,
                  estilo.textoP16px,
                  style.textoAlinhado,
                  style.container,
                ]}
                numberOfLines={2}
              >
                Selecione o aluno para continuar.
              </Text>
              {carregandoAlunos ? (
                <Spinner
                  visible={carregandoAlunos}
                  textContent={'Carregando alunos...'}
                  textStyle={[estilo.textoCorLight, estilo.textoP16px]}
                />
              ) : alunos.length === 0 ? (
                <View style={[estilo.centralizado]}>
                  <Text
                    style={[
                      estilo.centralizado,
                      estilo.tituloH333px,
                      estilo.textoCorSecundaria,
                    ]}
                  >
                    Ops...
                  </Text>
                  <View style={[estilo.centralizado, { marginVertical: 10 }]}>
                    <Entypo name="emoji-sad" size={100} color="black" />
                  </View>
                  <Text
                    style={[
                      estilo.centralizado,
                      estilo.textoCorSecundaria,
                      estilo.textoP16px,
                      { textAlign: 'center' },
                    ]}
                  >
                    Não há alunos cadastrados nessa academia. Tente novamente mais tarde.
                  </Text>
                </View>
              ) : (
                alunos.map((aluno) => (
                  <View key={aluno.cpf}>
                    <TouchableOpacity
                      style={[estilo.botao, estilo.corPrimaria, style.botao]}
                      onPress={() =>
                        navigation.navigate('Seleção da evolução', { aluno: aluno })
                      }
                    >
                      <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                        {aluno.nome}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </>
          ) : (
            <ModalSemConexao ondeNavegar={'Home'} navigation={navigation} />
          )}
        </SafeAreaView>
      );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '5%'
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        marginTop: '15%',
        textDecorationLine: 'underline',
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