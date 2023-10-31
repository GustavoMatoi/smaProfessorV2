import react, {useState, useEffect} from "react";
import {View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../../Home";
import Spinner from "react-native-loading-spinner-overlay";
import Aerobicos from "../../../Exercicios/Aerobicos";
import MembrosSuperiores from "../../../Exercicios/MembrosSuperiores";
export default ({navigation,route}) => {


    const [exercicio, setExercicio] = useState('')
    const [grupoMuscular, setGrupoMuscular] = useState([])
    const [carregandoDados, setCarregandoDados] = useState(false)

    const [multiarticular, setMultiArticular] = useState([])
    const [uniarticular, setUniarticular] = useState([])
    const [cardios, setCardios] = useState([])
    const [alongamentos, setAlongamentos] = useState([])
    const [selecionado, setSelecionado] = useState('')
    const [cardioSelecionado, setCardioSelecionado] = useState('')
    const {tipo} = route.params
    const recuperarExercicios = async () => {
      const db = getFirestore();

        const documentos = [];
        const abdominaisTemp = []
        const antebracoTemp = []
        const bicepsTemp = []
        const deltoideTemp = []
        const gradeDorsalTemp = []
        const latissimoDoDorsoTemp = []
        const manguitoRotadorTemp = []
        const paravertebraisTemp = []
        const subescapularTemp = []
        const transvesversoAbdominalTemp = []
        const trapezioTemp = []
        const tricepsTemp = []
        const multiarticularTemp = []
        const uniarticularTemp = []
        try {
          if(tipo === 'força'){
            
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
            const exercicioInferiorRef = collection(
              db,
              'Exercicios',
              'listaDeExercicios',
              'ExerciciosMembrosInferiores'
            );
    
            const querySnapshot2 = await getDocs(exercicioInferiorRef);

            querySnapshot2.forEach(async (doc) => {
              const dados = doc.data();
              documentos.push(dados);
  
              const exerciciosRef = collection(exercicioInferiorRef, doc.id, 'Exercicios')
  
              const inferioresSnapshot = await getDocs (exerciciosRef)
              
              inferioresSnapshot.forEach((abdominaisDoc) => {
                if(doc.id === 'Multiarticular'){
                  multiarticularTemp.push(abdominaisDoc.get('nome'))              
                } 
                if( doc.id === 'Uniarticular'){
                  uniarticularTemp.push(abdominaisDoc.get('nome'))
                }
             
              })})

            console.log(uniarticularTemp)


            setGrupoMuscular(documentos)        
            setMultiArticular(multiarticularTemp)
            setUniarticular(uniarticularTemp)
          })

          
        
          } else if (tipo === 'aerobicos'){                
            const cardiosAux = []  

            const exercicioRef = collection(
                db,
                'Exercicios',
                'listaDeExercicios',
                'Aerobicos'
              );
    
              const querySnapshot = await getDocs(exercicioRef);
              querySnapshot.forEach( async (aerobicoDoc) => {
                cardiosAux.push(aerobicoDoc.get('nome'))
              })

              setCardios(cardiosAux)
              console.log(cardiosAux)
              console.log(cardios)
          } else {
            const alongamentosAux = []
            const alongamentosRef = collection(db, 'Exercicios', 'listaDeExercicios', 'Alongamentos')

            const querySnapshot = await getDocs(alongamentosRef)


            querySnapshot.forEach((doc) => {
              alongamentosAux.push(doc.get('nome'))
            })
            setAlongamentos(alongamentosAux)

          }
        } catch (error) {
          console.error('Error retrieving exercises:', error);
        }
        finally {
          setCarregandoDados(false)
        }


 
    };
    const handleSelecaoExercicio = (value, grupoMuscular, tipo) => {
            if(value.length === 0 || grupoMuscular == ''){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      }   else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value, grupoMuscular: grupoMuscular, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo})
      }
    }
    const handleSelecaoExercicioCardio = (value, tipo) => {
            if(value.length === 0){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      }   else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo})
      }
    }
    const handleSelecaoAlongamento = (value, tipo) => {
      console.log(value)
            if(value.length === 0){
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      }   else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', {nomeExercicio: value, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo})
      }
    }


    console.log('tipo', tipo)
    console.log('membrosSUperioress', MembrosSuperiores[0].exercicios[0].nome)

    const peitoral = MembrosSuperiores[0].exercicios.map((item) => item.nome)
    const grandeDorsal = MembrosSuperiores[1].exercicios.map((item) => item.nome)
    const biceps = MembrosSuperiores[2].exercicios.map((item) => item.nome)
    const triceps = MembrosSuperiores[3].exercicios.map((item)=> item.nome)
    const abdominais = MembrosSuperiores[4].exercicios.map((item) => item.nome)
    const deltoide = MembrosSuperiores[5].exercicios.map((item) => item.nome)
    const paravertebrais = MembrosSuperiores[6].exercicios.map((item) => item.nome)
    const antebracos = MembrosSuperiores[7].exercicios.map((item) => item.nome)
    const transversoAbdominal = MembrosSuperiores[8].exercicios.map((item) => item.nome)
    const trapezio = MembrosSuperiores[9].exercicios.map((item) => item.nome)
    const subescapular = MembrosSuperiores[10].exercicios.map((item) => item.nome)
    const manguitoRotador = MembrosSuperiores[11].exercicios.map((item) => item.nome)
    const latissimoDoDorso = MembrosSuperiores[12].exercicios.map((item => item.nome))
    console.log(peitoral)

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
          <View style={[ estilo.centralizado, {marginVertical: 10}]}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Grupos musculares:</Text>

          </View>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros superiores:</Text>

              <View style={{ marginBottom: '5%' }}>
              <BotaoSelect
        selecionado={true}
        titulo='Selecione um exercício'
        max={1}
        onChange={(value) =>
          //handleSelecaoExercicioCardio(value, 'Aerobicos')
          console.log(value)
        }
        options={peitoral}
        select={'Peitoral'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={grandeDorsal}
                select={'Grande dorsal'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={biceps}
                select={'Bíceps'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={triceps}
                select={'Tríceps'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={abdominais}
                select={'Abdominais'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={deltoide}
                select={'Deltóide'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={paravertebrais}
                select={'Paravertebrais'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={antebracos}
                select={'Antebraços'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={transversoAbdominal}
                select={'Transverso Abdominal'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={trapezio}
                select={'Trapézio'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={subescapular}
                select={'Subescapular'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={manguitoRotador}
                select={'Manguito Rotador'}
       /> 
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  //handleSelecaoExercicioCardio(value, 'Aerobicos')
                  console.log(value)
                }
                options={latissimoDoDorso}
                select={'Latíssimo do Dorso'}
       /> 
              </View>
          {
          /*grupoMuscular.length === 0 ?           <Spinner
          visible={carregandoDados}
          textContent={'Carregando exercícios...'}
          textStyle={[estilo.textoCorLight, estilo.textoP16px]}
        /> : (
            <>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros superiores:</Text>

              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                  selecionado={true}
                  titulo='Selecione um exercício'
                  max={1}
                  onChange={(value) =>
                    handleSelecaoExercicio(value, grupoMuscular[0].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[1].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[2].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[3].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[4].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[5].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[6].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[7].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[8].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[9].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[10].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[11].grupoMuscular, 'ExerciciosMembrosSuperiores')
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
                    handleSelecaoExercicio(value, grupoMuscular[12].grupoMuscular, 'ExerciciosMembrosSuperiores')
                  }
                  options={triceps}
                  select={grupoMuscular[12].grupoMuscular}
                />
              </View>
              <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros inferiores:</Text>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                  selecionado={true}
                  titulo='Selecione um exercício'
                  max={1}
                  onChange={(value) =>
                    handleSelecaoExercicio(value, grupoMuscular[13].grupoMuscular, 'ExerciciosMembrosInferiores')
                  }
                  options={multiarticular}
                  select={grupoMuscular[13].grupoMuscular}
                />
              </View>
              <View style={{ marginBottom: '5%' }}>
                <BotaoSelect
                  selecionado={true}
                  titulo='Selecione um exercício'
                  max={1}
                  onChange={(value) =>
                    handleSelecaoExercicio(value, grupoMuscular[14].grupoMuscular, 'ExerciciosMembrosInferiores')
                  }
                  options={uniarticular}
                  select={grupoMuscular[14].grupoMuscular}
                />
              </View>
            </>
          )*/}
        </ScrollView>
       :               
      tipo === 'aerobicos' ?        <>
      <View style={{ marginBottom: '5%', padding: 10 }}>
         <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Selecione um exercício:</Text>

      <BotaoSelect
        selecionado={true}
        titulo='Selecione um exercício'
        max={1}
        onChange={(value) =>
          handleSelecaoExercicioCardio(value, 'Aerobicos')
        }
        options={Aerobicos}
       /> 
    </View>
      
      </> :
      
      <>
      {alongamentos.length === 0 ? <Text>Carregando exercícios...</Text> : 
      <View style={{ marginBottom: '5%', padding: 10 }}>
         <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Exercício:</Text>

      <BotaoSelect
        selecionado={true}
        titulo='Selecione um exercício'
        max={1}
        onChange={(value) =>
          handleSelecaoAlongamento(value, 'Alongamentos')
        }
        options={alongamentos}
       /> 
    </View>}
      
      </>
       )}
      </View>
    );
    
}