import React,{useState, useEffect} from "react"
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity} from "react-native"
import RadioBotao from "../RadioBotao"
import estilo from "../estilo"
import {useFonts} from 'expo-font'
import { CheckboxUmPorVez, CheckMultiplos, CheckboxIndividual } from "../Checkbox"
import BotaoSelect from "../BotaoSelect"
import {Anamnese} from "../../classes/Anamnese"


export default ({navigation, route}) => {
    const  {aluno} = route.params
    const [selectedSangue, setSelectedSangue] = useState(0)
    const [selected, setSelected] = useState(0)
    const [selected1, setSelected1] = useState(0)
    const [selected2, setSelected2] = useState(0)
    const [selected3, setSelected3] = useState(0)

    const[tempoQuePraticaMusculacao, setTempoQuePraticaMusculacao] = useState('')
    const [tempoPraticaValido, setTempoPraticaValido] = useState(true);

    const[tempoQueParouDePraticarMusculacao, setTempoQueParouDePraticarMusculacao] = useState('')
    const [tempoParouPraticaValido, setTempoParouPraticaValido] = useState(true);

    const[usoDeMedicamento, setUsoDeMedicamento] = useState('')
    const [medicamentoValido, setMedicamentoValido] = useState(true);

    const[alergia, setAlergia] = useState('')
    const [alergiaValida, setAlergiaValida] = useState(true);

    const[cancer, setCancer] = useState('')
    const [cancerValido, setCancerValido] = useState(true);

    const[lesao, setLesao] = useState('')
    const [lesaoValida, setLesaoValida] = useState(true);

    const[comentarios, setComentarios] = useState('')
    const [comentariosValidos, setComentariosValidos] = useState(true);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedAtaqueCardiaco, setSelectedAtaqueCardiaco] = useState(false);

    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Light.ttf'),
    })

    
    console.log("aluno", aluno)
    const opcaoAtaqueCardiaco = [{text:'Um ataque cardíaco?', id: 1}]
    const opcaoDoencaDasValvulasCardiacas = [{text:'Doença das válvulas cardíacas', id: 1}]
    const opcaoCirurgiaCardiaca = [{text:'Cirurgia cardíaca', id: 1}]
    const opcaoCateterismoCardiaco = [{text:'Cateterismo cardíaco', id: 1}]
    const opcaoAngioplastiaCoronaria = [{text: 'Angioplastia coronária', id: 1}]
    const opcaoMarcaPasso = [{text: 'Marca-passo', id: 1}]
    const desfibriladorCardiacoImplantavel = [{text: 'Desfibrilador cardíaco implantável', id: 1}]
    const disturbioDoRitmoCardiaco = [{text: 'Distúrbio do ritmo cardíaco', id: 1}]
    const insuficienciaCardiaca = [{text: 'Insuficiência cardíaca', id: 1}]
    const opcaoCardiopatiaCongenita = [{text: 'Cardiopatia congênita', id: 1}]
    const opcaoTransplanteDeCoracao = [{text: 'Transplante de coração', id: 1}]
    const opcaoDoencaRenal = [{text: 'Doença renal', id: 1}]
    const opcaoDiabetes = [{text: 'Diabetes', id: 1}]
    const opcaoAsma = [{text: 'Asma', id: 1}]
    const opcaoDoencaPulmonar = [ {text: 'Doença pulmonar', id: 1}]


    return (
      <ScrollView>
      <View style={[estilo.corLightMenos1, style.container, estilo.centralizado, estilo.sombra]}>
        
          <View style={[style.areaConteudos]}>
          <View style={style.areaRespostas}> 
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.tituloH427px]}>Anamnese do aluno:</Text>
              </View>

              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>NOME:</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.nome}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>TIPO SANGUÍNEO:</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.tipoSanguineo} {aluno.Anamnese.fatorRH}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>GRÁVIDA?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.gravida}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>PRATICA MUSCULAÇÃO ATUALMENTE?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.praticaMusculacaoAtualmente}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>SE SIM, A QUANTO TEMPO?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.tempoQuePraticaMusculacao}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>SE NÃO, JÁ PRATICOU?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.jaPraticouMusculacao}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>HÁ QUANTO TEMPO PAROU?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.tempoQueParouDePraticarMusculacao}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>FAZ USO DE MEDICAMENTO REGULARMENTE? QUAL?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.usoDeMedicamento}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>POSSUI ALERGIA A ALGUM TIPO DE MEDICAMENTO? QUAL?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.possuiAlergiaMedicamento}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>HISTÓRICO DE CÂNCER:</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.historicoDeCancer}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>ALGUMA LESÃO MUSCULAR, ÓSSEA OU ARTICULAR?</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.lesao}</Text>
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>COMENTÁRIOS SOBRE O HISTÓRICO MÉDICO:</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.comentariosMedicos}</Text>
              </View>

              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>VOCÊ TEVE OU TEM ATUALMENTE:</Text>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>UM ATAQUE CARDÍACO? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.ataqueCardiaco}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DOENÇA DAS VÁLVULAS CARDIÁCAS? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.doencaDasValvulasCardiacas}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>CIRURGIA CARDÍACA? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.cirurgiaCardiaca}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>CATETERISMO CARDÍACO? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.cateterismoCardiaco}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>ANGIOPLASTIA CORONÁRIA? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.angioplastiaCoronaria}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>MARCA-PASSO? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.marcaPasso}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DESFIBIRLADOR CARDÍACO IMPLANTÁVEL? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.desfibriladorCardiacoImplantavel}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DISTÚRBIO DO RITMO CARDÍACO? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.disturbioDoRitmoCardiaco}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>INSUFICIÊNCIA CARDÍACA? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.insuficienciaCardiaca}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>CARDIOPATIA CONGÊNITA? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.cardioPatiaCongenita}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>TRANSPLANTE DE CORAÇÃO? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.transplanteDeCoracao}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DOENÇA RENAL? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.doencaRenal}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DIABETES? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.diabetes}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>ASMA? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.asma}</Text></Text>            
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DOENÇA PULMONAR? <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.doencaPulmonar}</Text></Text>            

              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, {marginTop: '5%'}]}>OBJETIVO DO TREINO:</Text>
              <View style={style.areaRespostas}>
                  <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.objetivo}</Text>
              </View>
      </View>
      </View>
      </ScrollView>
    
      

)
}


const style = StyleSheet.create({
container: {
  width: '100%'
},
Montserrat: {
  fontFamily: 'Montserrat'
},
areaTexto: {
  marginTop: '5%'
}, 
areaConteudos: {
  marginLeft: '8%',
  marginTop: '8%',
  marginBottom: '8%'
},
areaRespostas: {
  width: '90%',
  marginVertical: '3%'
},
textoRespostas: {
  fontWeight: 'bold',
},
botao: {
  paddingHorizontal: 5,
  paddingVertical: 10,
  alignItems: 'center',
  width: '90%',
  borderRadius: 30,
  marginTop: 10,  
},
})