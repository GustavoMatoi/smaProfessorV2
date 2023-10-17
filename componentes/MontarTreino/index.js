import React, {useState, useEffect, useRef, cloneElement} from "react"
import {Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Button, Alert} from "react-native"
import estilo from "../estilo"
import {useFonts} from 'expo-font'
import QuadradoExercicio from "./QuadradoExercicio"
import BotaoAddExercicio from "./BotaoAddExercicio"
import { AntDesign } from '@expo/vector-icons'; 
import { professorLogado } from "../Home"
import { Entypo } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
export default ({route, navigation}) => {
    const aluno = route.params.aluno
    const[listaDeExercicios, setListaDeExercicios] = useState([])
    const[exercicio, setExercicio] = useState('')
    const [listaAux, setListaAux] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [listaFinal, setListaFinal] = useState([])
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear()


    const receberExercicio = (exercicio) => {
      setExercicio(exercicio)
      listaAux.push(exercicio)

    }
    const addExercicio = () => {
      setModalVisible(true);
      setListaDeExercicios(prevLista => [...prevLista, { validado: false }]);
    };
    const deleteExercicio = (index) => {
      setListaDeExercicios((prevLista) => {
        const updatedLista = [...prevLista];
        updatedLista.splice(index, 1);
        return updatedLista;
      });
      console.log(index)
        setListaFinal((prevListaAux) => {
        const updatedListaAux = [...prevListaAux];
        updatedListaAux.splice(index, 1);
        return updatedListaAux;
      });
          setListaAux((prevListaAux) => {
        const updatedListaAux = [...prevListaAux];
        updatedListaAux.splice(index, 1);
        return updatedListaAux;
      });
    };

      const adicionarExercicioNaFicha = (i, nomeExercicio, index, tipo) => {
        if(validaExercicio(i)){
          const listaDeExerciciosAux =[...listaFinal]
          if(tipo === 'força') listaDeExerciciosAux.push({index, tipo, nomeExercicio, validado: true, descanso: i.descanso, repeticoes: i.repeticoes, series: i.series})
          if(tipo === 'aerobico') listaDeExerciciosAux.push({index, tipo, nomeExercicio, validado: true, descanso: i.descanso, velocidade: i.velocidade, duracao: i.duracao, series: i.series})
          setListaFinal([...new Set(listaDeExerciciosAux)])
        }

      }

      const selecionaTipoExercicio = (exercicio, tipo, index) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, tipo, index, validado: false};
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);
      };


      const handleSeries = (exercicio, series) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, series };
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);
      };

      const handleReps = (exercicio, repeticoes) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, repeticoes };
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);
      };

      const handleDuracao = (exercicio, duracao) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, duracao };
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);

      };

      const handleVelocidade = (exercicio, velocidade) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, velocidade };
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);
      };
      const handleDescanso = (exercicio, descanso ) => {
        const updatedExercicios = listaDeExercicios.map((ex) => {
          if (ex === exercicio) {
            return { ...ex, descanso  };
          }
          return ex;
        });
        setListaDeExercicios(updatedExercicios);
        setModalVisible(false);
      };

      const validaExercicio = (exercicio) => {
        console.log('exercicio.tipo', exercicio.tipo)
        if(exercicio.tipo === 'força'){
          let validarDescanso = false
          let validarReps = false 
          let validarSeries = false
          if(exercicio.descanso){
            validarDescanso = true
          }
          if(exercicio.repeticoes){
            validarReps = true
          }
          if(exercicio.series){
            validarSeries = true
          }
          if(validarDescanso && validarReps && validarSeries){
            return true;
          } else {
            Alert.alert("Preencha direito!")
          }
        }
        if(exercicio.tipo === 'aerobico'){
          let validarDescanso = false
          let validarVelocidade = false 
          let validarSeries = false
          let validarDuracao = false

          if(exercicio.descanso){
            validarDescanso = true
          }
          if(exercicio.velocidade){
            validarVelocidade = true
          }
          if(exercicio.series){
            validarSeries = true
          }
          if(exercicio.duracao){
            validarDuracao = true
          }

          if(validarDescanso && validarVelocidade && validarSeries && validarDuracao){
            console.log(exercicio)
            return true;
          } else {
            Alert.alert("Preencha direito!")
          }
        }
      }
    return(
        <ScrollView style={[style.container, estilo.corLightMenos1]}>

            <View style={style.areaTextos}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Nome:</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, style.textos, style.Montserrat]}>{aluno.nome}</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Resposável:</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, style.textos,style.Montserrat]}>{professorLogado.getNome()}</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>Data:</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, style.textos,style.Montserrat]}>{dia}/{mes}/{ano}</Text>
            </View>
            <View style={style.areaTextos}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Exercícios</Text>
            </View> 
            <View style={{alignItems: 'center', marginTop: 10}}>

                    <View style={{marginVertical: 10}}>


                    {
  listaDeExercicios.map((i, index) => (
    <View key={index}>
        
              <Modal isVisible={isModalVisible}  >
        <View style={{ flex: 1 }}>
          <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>Escolha o tipo do exercício!</Text>

        <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>{selecionaTipoExercicio(i, 'alongamento', index);}}>
            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>ALONGAMENTO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() =>{selecionaTipoExercicio(i, 'força', index)}}>
            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>FORÇA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=> {selecionaTipoExercicio(i, 'aerobico', index)}}>
            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>AERÓBICO</Text>
        </TouchableOpacity>
        </View>


      </Modal>
      {i.tipo == 'aerobico' ? (  <View style={[style.quadrado, typeof listaFinal[index] !== 'undefined' ? estilo.corSuccess : estilo.corLightMais1, estilo.sombra]}>
                <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
                <View style={{width: '100%'}}>
                {listaAux[index] ? 
          <View style={[style.inputTexto]}>
            <Text>{listaAux[index]}</Text>
            </View>
          : <TouchableOpacity style={[style.inputTexto,{ backgroundColor: '#0066FF', borderRadius: 30}]} onPress={()=>navigation.navigate('Seleção do Exercício', {navigation: navigation, receberExercicio: receberExercicio, aluno: aluno, tipo: 'aerobicos'})}>
        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Selecione o exercício</Text>
      </TouchableOpacity>}
                </View>
    
                <View style={style.areaPreenchimentoParametros}>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Velocidade:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Vel. (km)" onChangeText={(text)=>handleVelocidade(i, text)}/>
                    </View>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Duração:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Durac. (min)" onChangeText={(text)=> {handleDuracao(i, text)}}/>
                    </View>
                </View>

                <View style={style.areaPreenchimentoParametros}>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Desc. (seg)" onChangeText={(text)=> {handleDescanso(i,text)}}/>
                    </View>
                    <View style={[style.areaParametroMedio]}>
                        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Séries:</Text>
                        <TextInput style={[style.inputTextoPequeno]} placeholder="Sér." 
                      onChangeText={(text) => {handleSeries(i, text)}}
            />
                    </View>
                </View>
            </View>): 
      /* */ 
      
      i.tipo == 'força' ? 
      
      ( <View style={[style.quadrado, typeof listaFinal[index] !== 'undefined' ? estilo.corSuccess : estilo.corLightMais1, estilo.sombra]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>

        <View style={{width: '100%'}}>
          {listaAux[index] ? 
          <View style={[style.inputTexto]}>
            <Text>{listaAux[index]}</Text>
            </View>
          : <TouchableOpacity style={[style.inputTexto,{ backgroundColor: '#0066FF', borderRadius: 30}]} onPress={()=>navigation.navigate('Seleção do Exercício', {navigation: navigation, receberExercicio: receberExercicio, aluno: aluno, tipo: 'força'})}>
        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>Selecione o exercício</Text>
      </TouchableOpacity>}
        </View>

        <View style={style.areaPreenchimentoParametros}>
        <View style={[style.areaParametroPequeno]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Séries:</Text>
            <TextInput style={[style.inputTextoPequeno]}  
            value={typeof listaFinal[index] !== 'undefined' ? i.series : 0}
            placeholder="Sér." keyboardType="numeric" o
            onChangeText={(text) => {handleSeries(i, text)}}
            />
        </View>
        <View style={[style.areaParametroPequeno]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Repetições:</Text>
            <TextInput style={[style.inputTextoPequeno]} placeholder="Reps." keyboardType="numeric" 
            onChangeText={(text)=> {handleReps(i, text)}}
            value={typeof listaFinal[index] !== 'undefined' ? i.repeticoes : 0}

            />
        </View>
        <View style={[style.areaParametroPequeno]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
            <TextInput style={[style.inputTextoPequeno]}   placeholder="Desc. (seg)" keyboardType="numeric" 
            onChangeText={(text)=>{handleDescanso(i, text)}}
            value={typeof listaFinal[index] !== 'undefined' ? i.descanso : 0}

            />
        </View>
        </View>
    </View>)
      : i.tipo == 'alongamento' ?
( <View style={[style.quadrado, estilo.corLightMais1, estilo.sombra]}>
    <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
    <View style={{width: '100%'}}>
    <TouchableOpacity style={[style.inputTexto]}>
    <Text>Selecione o exercício</Text>

                  </TouchableOpacity>   
                   </View>

    <View style={style.areaPreenchimentoParametros}>
    <View style={[style.areaParametroPequeno]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Duração:</Text>
        <TextInput style={[style.inputTextoPequeno]} placeholder="Durac." onChangeText={(text)=>{handleDuracao(i, text)}}/>
    </View>
    <View style={[style.areaParametroPequeno]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Repetições:</Text>
        <TextInput style={[style.inputTextoPequeno]} placeholder="Reps." onChangeText={(text)=> {handleReps(i, text)}}/>
    </View>
    <View style={[style.areaParametroPequeno]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}>Descanso:</Text>
        <TextInput style={[style.inputTextoPequeno]} placeholder="Desc. (seg)" onChangeText={(text)=> {handleDescanso(i, text)}}/>
    </View>
    </View>
</View>) : 
    (<View style={[style.quadrado, estilo.corLightMais1, estilo.sombra]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoP16px]}> Exercício:</Text>
        <View style={{width: '100%'}}>
            <TextInput style={[style.inputTexto]} placeholder="Novo exercício" editable={false}/>
        </View>
    </View>)
      }
      <View style={style.botoesCrud}>
        <TouchableOpacity style={[estilo.botao, estilo.corSuccess, {width: '40%', marginTop: '5%', flexDirection: 'row', justifyContent:'center'}]} disabled={typeof listaFinal[index] !== 'undefined'} onPress={()=> adicionarExercicioNaFicha(i, listaAux[index], index, i.tipo)}>
          <AntDesign name="edit" size={16} color="white" />
          <Text style={[estilo.textoP16px, estilo.textoCorLight, style.Montserrat, {marginHorizontal: '10%'}]}>SALVAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilo.botao, estilo.corDanger, {width: '40%', marginTop: '5%', flexDirection: 'row', justifyContent:'center'}]} onPress={()=> deleteExercicio(index)}>
          <AntDesign name="delete" size={16} color="white" />
          <Text style={[estilo.textoP16px, estilo.textoCorLight, style.Montserrat, {marginHorizontal: '10%'}]}>EXCLUIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  ))
}

                <TouchableOpacity style={[estilo.corLightMenos1, style.botao]}  onPress={addExercicio}>
                    <Entypo name="add-to-list" size={30} color={'#0066FF'} />
                    <Text style={[estilo.tituloH619px, estilo.textoCorPrimaria]}>ADICIONAR EXERCÍCIO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilo.corPrimaria, style.botao, {marginVertical: '5%'}]}  onPress={() => {navigation.navigate('Nova Ficha', {exercicios: listaFinal, aluno: aluno})}}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>FINALIZAR FICHA</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const style= StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    textos: {
        marginVertical: '2%',
    },
    areaTextos: {
        marginLeft: '2%',
        marginTop: '5%'
    },
    Montserrat: {
    },
    botoesCrud: {
        width: '90%',
        flexDirection: 'row',
        marginBottom: '5%'
    },
    botao: {
        borderWidth: 4,
        borderColor: '#0066FF',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        height: 50,
        alignItems: 'center',
        borderRadius: 15
    },
    quadrado: {
        width: '90%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#0066FF',
        padding: 10,
    },
    inputTexto: {
        width: '100%',
        height: 50,
        borderRadius: 2, 
        backgroundColor: 'white',
        color: '#182128',
        padding: 5,
        marginVertical: 10,
        justifyContent: 'center'
    },
    areaParametroPequeno: {
        width: '30%',
    },
    inputTextoPequeno: {
        width: '95%',
        height: 40,
        backgroundColor: 'white',
        marginVertical: 5,
        textAlign: 'center',
        alignSelf: 'center'
    },
    areaPreenchimentoParametros: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 5
    },
    areaParametroMedio: {
        width: '45%'
    }
})