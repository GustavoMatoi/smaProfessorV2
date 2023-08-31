import React, {useState, useEffect} from 'react'
import {Text, SafeAreaView, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native'
import estilo from '../../estilo'
import {useFonts} from 'expo-font'
import { professorLogado } from '../../Home'
import { Avaliacao } from '../../../classes/Avaliacao'

let novaAvalicao = new Avaliacao()

export default ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/Montserrat.ttf'),
    })

    const handleNavigation = () => {
        navigation.navigate("Testes parte 1", {aluno: aluno})
    }


    const {aluno}  = route.params
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()

    const [massaCorporal, setMassaCorporal] = useState(0)
    const [estatura, setEstatura] = useState(0)
    const [bracoRelaxadoMedida1, setBracoRelaxadoMedida1] = useState(0)
    const [bracoRelaxadoMedida2, setBracoRelaxadoMedida2] = useState(0)
    const [bracoRelaxadoMedida3, setBracoRelaxadoMedida3] = useState(0)
    const [bracoContraidoMedida1, setBracoContraidoMedida1] = useState(0)
    const [bracoContraidoMedida2, setBracoContraidoMedida2] = useState(0)
    const [bracoContraidoMedida3, setBracoContraidoMedida3] = useState(0)
    const [cinturaMedida1, setCinturaMedida1] = useState(0)
    const [cinturaMedida2, setCinturaMedida2] = useState(0)
    const [cinturaMedida3, setCinturaMedida3] = useState(0)
    const [abdomenMedida1, setAbdomenMedida1] = useState(0)
    const [abdomenMedida2, setAbdomenMedida2] = useState(0)
    const [abdomenMedida3, setAbdomenMedida3] = useState(0)
    const [quadrilMedida1, setQuadrilMedida1] = useState(0)
    const [quadrilMedida2, setQuadrilMedida2] = useState(0)
    const [quadrilMedida3, setQuadrilMedida3] = useState(0)
    const [coxaMedida1, setCoxaMedida1] = useState(0)
    const [coxaMedida2, setCoxaMedida2] = useState(0)
    const [coxaMedida3, setCoxaMedida3] = useState(0)
    const [pernaMedida1, setPernaMedida1] = useState(0)
    const [pernaMedida2, setPernaMedida2] = useState(0)
    const [pernaMedida3, setPernaMedida3] = useState(0)
    const [dCPeitoralMedida1, setdCPeitoralMedida1] = useState(0)
    const [dCPeitoralMedida2, setdCPeitoralMedida2] = useState(0)
    const [dCPeitoralMedida3, setdCPeitoralMedida3] = useState(0)
    const [dCAbdomenMedida1, setdCAbdomenMedida1] = useState(0)
    const [dCAbdomenMedida2, setdCAbdomenMedida2] = useState(0)
    const [dCAbdomenMedida3, setdCAbdomenMedida3] = useState(0)
    const [dCCoxaMedida1, setdCCoxaMedida1] = useState(0)
    const [dCCoxaMedida2, setdCCoxaMedida2] = useState(0)
    const [dCCoxaMedida3, setdCCoxaMedida3] = useState(0)
    const [dCTricepsMedida1, setdCTricepsMedida1] = useState(0)
    const [dCTricepsMedida2, setdCTricepsMedida2] = useState(0)
    const [dCTricepsMedida3, setdCTricepsMedida3] = useState(0)
    const [dCCristaIliacaMedida1, setdCCristaIliacaMedida1] = useState(0)
    const [dCCristaIliacaMedida2, setdCCristaIliacaMedida2] = useState(0)
    const [dCCristaIliacaMedida3, setdCCristaIliacaMedida3] = useState(0)
   
    const [massaCorporalInvalido, setMassaCorporalInvalido] = useState(false)
    const [estaturaInvalido, setEsturaInvalido] = useState(false)
    const [bracoRelaxadoMedida1Invalido, setBracoRelaxadoMedida1Invalido] = useState(false)
    const [bracoContraidoMedida1Invalido, setBracoContraidoMedida1Invalido] = useState(false)
    const [cinturaMedida1Invalido, setCinturaMedida1Invalido] = useState(false)
    const [abdomenMedida1Invalido, setAbdomenMedida1Invalido] = useState(false)
    const [quadrilMedida1Invalido, setQuadrilMedida1Invalido] = useState(false)
    const [coxaMedida1Invalido, setCoxaMedida1Invalido] = useState(false)
    const [pernaMedida1Invalido, setPernaMedida1Invalido] = useState(false)
    const [dCPeitoralMedida1Invalido, setdCPeitoralMedida1Invalido] = useState(false)
    const [dCAbdomenMedida1Invalido, setdCAbdomenMedida1Invalido] = useState(false)
    const [dCCoxaMedida1Invalido, setdCCoxaMedida1Invalido] = useState(false)
    const [dCTricepsMedida1Invalido, setdCTricepsMedida1Invalido] = useState(false)
    const [dCCristaIliacaMedida1Invalido, setdCCristaIliacaMedida1Invalido] = useState(false)



    const validaCampos = () => {
        if (massaCorporal === 0 || estatura === 0 || bracoRelaxadoMedida1 === 0 || 
             bracoContraidoMedida1 === 0 ||
            cinturaMedida1 === 0 || abdomenMedida1 === 0 ||
            quadrilMedida1 === 0 || coxaMedida1 === 0 ||
            pernaMedida1 === 0 || dCPeitoralMedida1 === 0 ||
             dCAbdomenMedida1 === 0 || 
            dCCoxaMedida1 === 0  || dCTricepsMedida1 === 0 || dCCristaIliacaMedida1 === 0){
                Alert.alert('Campos inválidos', "Há campos não preenchidos. Preencha-os e tente novamente.")
                if(massaCorporal === 0) {
                    setMassaCorporalInvalido(true)
                } else {
                    setMassaCorporalInvalido(false)
                }
                if(estatura === 0) {
                    setEsturaInvalido(true)
                } else {
                    setEsturaInvalido(false)
                }
                if(bracoRelaxadoMedida1 === 0) {
                    setBracoRelaxadoMedida1Invalido(true)                
                } else {
                    setBracoRelaxadoMedida1Invalido(false)
                }

                if(bracoContraidoMedida1 === 0) {
                    setBracoContraidoMedida1Invalido(true)
                } else {
                    setBracoContraidoMedida1Invalido(false)
                }

                if(cinturaMedida1 === 0) {
                    setCinturaMedida1Invalido(true)
                } else {
                    setCinturaMedida1Invalido(false)
                }

                if(abdomenMedida1 === 0) {
                    setAbdomenMedida1Invalido(true)
                } else {
                    setAbdomenMedida1Invalido(false)
                }
              
               
                if(quadrilMedida1 === 0) {
                    setQuadrilMedida1Invalido(true)
                } else {
                    setQuadrilMedida1Invalido(false)
                }
                
                if(coxaMedida1 === 0) {
                    setCoxaMedida1Invalido(true)
                } else {
                    setCoxaMedida1Invalido(false)
                }
                
                if(pernaMedida1 === 0) {
                    setPernaMedida1Invalido(true)
                } else {
                    setPernaMedida1Invalido(false)
                }
                
                if(dCPeitoralMedida1 === 0) {
                    setdCPeitoralMedida1Invalido(true)
                } else {
                    setdCPeitoralMedida1Invalido(false)
                }
               
                if(dCAbdomenMedida1 === 0) {
                    setdCAbdomenMedida1Invalido(true)
                } else {
                    setdCAbdomenMedida1Invalido(false)
               
                }
                if(dCCoxaMedida1 === 0) {
                    setdCCoxaMedida1Invalido(true)
                } else {
                    setdCCoxaMedida1Invalido(false)
                }
                
                if(dCTricepsMedida1 === 0) {
                    setdCTricepsMedida1Invalido(true)
                } else {
                    setdCTricepsMedida1Invalido(false)
                }
                
                if(dCCristaIliacaMedida1 === 0) {
                    setdCCristaIliacaMedida1Invalido(true)
                } else {
                    setdCCristaIliacaMedida1Invalido(false)
                }
                
       
                
                
        } else {
            //novaAvalicao.setDia(dia)
            novaAvalicao.setMes(mes)
            novaAvalicao.setAno(ano)
            //Setar o prof responsável na hora de salvar
            novaAvalicao.setMassaCorporal(massaCorporal)
            novaAvalicao.setEstatura(estatura/100)
            console.log("ESTATURA ", novaAvalicao.getEstatura)
            novaAvalicao.setBracoRelaxadoMedida1(bracoRelaxadoMedida1)
            novaAvalicao.setBracoRelaxadoMedida2(bracoRelaxadoMedida2)            
            novaAvalicao.setBracoRelaxadoMedida3(bracoRelaxadoMedida3)       
            novaAvalicao.setBracoContraidoMedida1(bracoContraidoMedida1)     
            novaAvalicao.setBracoContraidoMedida2(bracoContraidoMedida2)     
            novaAvalicao.setBracoContraidoMedida3(bracoContraidoMedida3)     
            novaAvalicao.setCinturaMedida1(cinturaMedida1)
            novaAvalicao.setCinturaMedida2(cinturaMedida2)
            novaAvalicao.setCinturaMedida3(cinturaMedida3)
            novaAvalicao.setAbdomenMedida1(abdomenMedida1)
            novaAvalicao.setAbdomenMedida2(abdomenMedida2)
            novaAvalicao.setAbdomenMedida3(abdomenMedida3)
            novaAvalicao.setQuadrilMedida1(quadrilMedida1)
            novaAvalicao.setQuadrilMedida2(quadrilMedida2)
            novaAvalicao.setQuadrilMedida3(quadrilMedida3)
            novaAvalicao.setCoxaMedida1(coxaMedida1)
            novaAvalicao.setCoxaMedida2(coxaMedida2)
            novaAvalicao.setCoxaMedida3(coxaMedida3)
            novaAvalicao.setPernaMedida1(pernaMedida1)
            novaAvalicao.setPernaMedida2(pernaMedida2)
            novaAvalicao.setPernaMedida3(pernaMedida3)
            novaAvalicao.setDCpeitoralMedida1(dCPeitoralMedida1)
            novaAvalicao.setDCpeitoralMedida2(dCPeitoralMedida2)
            novaAvalicao.setDCpeitoralMedida3(dCPeitoralMedida3)
            novaAvalicao.setDCabdomenMedida1(dCAbdomenMedida1)
            novaAvalicao.setDCabdomenMedida2(dCAbdomenMedida2)
            novaAvalicao.setDCabdomenMedida3(dCAbdomenMedida3)
            novaAvalicao.setDCcoxaMedida1(dCCoxaMedida1)
            novaAvalicao.setDCcoxaMedida2(dCCoxaMedida2)
            novaAvalicao.setDCcoxaMedida3(dCCoxaMedida3)
            novaAvalicao.setDCtricepsMedida1(dCTricepsMedida1)
            novaAvalicao.setDCtricepsMedida2(dCTricepsMedida2)
            novaAvalicao.setDCtricepsMedida3(dCTricepsMedida3)
            novaAvalicao.setDCcristailiacaMedida1(dCCristaIliacaMedida1)
            novaAvalicao.setDCcristailiacaMedida2(dCCristaIliacaMedida2)
            novaAvalicao.setDCcristailiacaMedida3(dCCristaIliacaMedida3)
            console.log("Tudo válido")
            console.log(novaAvalicao)
            handleNavigation()
        }
    }


    return( 
        <ScrollView style={[style.container, estilo.corLightMenos1]}>
            <View style={[style.conteudos]}>
                <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria]}>NOME DO ALUNO:</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.espacamentoTexto, {fontWeight: 'bold'}]}>{aluno.nome}</Text>

                <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria]}>AVALIADOR:</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.espacamentoTexto, {fontWeight: 'bold'}]}>{professorLogado.getNome()}</Text>

                <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria]}>DATA:</Text>
                <View style={style.areaDePreenchimento}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, {fontWeight: 'bold'}]}>{dia}/{mes}/{ano}</Text>
                </View>
                    <View style={style.areaDePreenchimento}>
                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria]}>MASSA CORPORAL (KG):</Text>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                onChangeText={(text)=>setMassaCorporal(parseFloat(text))}
                                keyboardType='numeric'
                                style={[
                                    style.inputText, 
                                    estilo.sombra, 
                                    estilo.corLight,
                                    massaCorporalInvalido ? {borderWidth: 1, borderColor: 'red'} : {}
                                ]}
                                placeholder="Massa corporal"
                                ></TextInput>
                        </View>
                    </View>
                    <View style={style.areaDePreenchimento}>
                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria]}>ESTATURA (CM):</Text>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                            onChangeText={(text) => {
                                const inputValue = parseFloat(text);
                                const estatura = isNaN(inputValue) ? '' : inputValue <= 299 ? inputValue : 299;
                                setEstatura(estatura.toString());
                            }}
                            keyboardType='numeric'
                            style={[
                                style.inputText, 
                                estilo.sombra, 
                                estilo.corLight,
                                estaturaInvalido ? { borderWidth: 1, borderColor: 'red' } : {}
                            ]}
                            placeholder="Estatura"
                            value={estatura.toString()}
                            />
                        </View>
                    </View>

                
                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '5%'}]}>BRAÇO RELAXADO (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=>setBracoRelaxadoMedida1(parseFloat(text))}
                                        style={
                                            [style.textosAvaliacao,
                                            bracoRelaxadoMedida1Invalido ? {borderWidth: 1, borderColor: 'red'} : {}
                                            ]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=>setBracoRelaxadoMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=>setBracoRelaxadoMedida3(parseFloat(text))} 
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>
                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>BRAÇO CONTRAÍDO (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setBracoContraidoMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                                bracoContraidoMedida1Invalido ? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setBracoContraidoMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=> setBracoContraidoMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>
   
                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>CINTURA (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=>setCinturaMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                         cinturaMedida1Invalido ? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=>setCinturaMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput 
                                        onChangeText={(text)=>setCinturaMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>ABDÔMEN (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setAbdomenMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                        abdomenMedida1Invalido ? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setAbdomenMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=> setAbdomenMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>QUADRIL (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setQuadrilMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                            quadrilMedida1Invalido ? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setQuadrilMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput 
                                        onChangeText={(text)=> setQuadrilMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>COXA (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> {setCoxaMedida1(parseFloat(text))}}
                                        style={[style.textosAvaliacao,
                                        coxaMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> {setCoxaMedida2(parseFloat(text))}}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=> {setCoxaMedida3(parseFloat(text))}}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>PERNA (CM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setPernaMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                                pernaMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setPernaMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=> setPernaMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>DC PEITORAL (MM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=>setdCPeitoralMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao, 
                                            dCPeitoralMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=>setdCPeitoralMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=>setdCPeitoralMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>DC ABDÔMEN (MM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setdCAbdomenMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                        dCAbdomenMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setdCAbdomenMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput 
                                        onChangeText={(text)=> setdCAbdomenMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>DC COXA (MM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setdCCoxaMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                        dCCoxaMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput
                                        onChangeText={(text)=> setdCCoxaMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput 
                                        onChangeText={(text)=> setdCCoxaMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>DC TRÍCEPS (MM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setdCTricepsMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                        dCTricepsMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput 
                                        onChangeText={(text)=> setdCTricepsMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput 
                                        onChangeText={(text)=> setdCTricepsMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                    <Text style={[estilo.textoP16px, estilo.Mont, estilo.textoCorSecundaria, {marginTop: '10%'}]}>DC CRISTA ILÍACA (MM):</Text>
                    <View style={[style.areaDePreenchimento]}>
                        <View style={[style.areaBotoes]}>
                        <TextInput 
                                        onChangeText={(text)=> setdCCristaIliacaMedida1(parseFloat(text))}
                                        style={[style.textosAvaliacao,
                                            dCCristaIliacaMedida1Invalido? {borderWidth: 1, borderColor: 'red'}: {}]} 
                                        placeholder="Medida 1"
                                        keyboardType='numeric'
                                        ></TextInput>

                                        <TextInput
                                        onChangeText={(text)=> setdCCristaIliacaMedida2(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 2"
                                        keyboardType='numeric'
                                        ></TextInput>
                                        <TextInput
                                        onChangeText={(text)=> setdCCristaIliacaMedida3(parseFloat(text))}
                                        style={[style.textosAvaliacao]} 
                                        placeholder="Medida 3"
                                        keyboardType='numeric'
                                        />
                        </View>
                </View>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, {marginTop: '10%'}]} onPress={()=> validaCampos()}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight, estilo.sombra]}>AVANÇAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
    },
    conteudos:{
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '15%'

    }, 
    areaDePreenchimento:{
        marginVertical: '5%'
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }, 
    espacamentoTexto: {
        marginVertical: '3%'
    }, 
    areaBotoes: {
        width: '90%',
    }, 
    botaoInput: {
        width: '25%',
        height: 60,
        borderRadius: 10,
        textAlign: 'center',
        borderWidth: 1
    },
    botaoInputDataNascimento: {
        width:'30%',
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
    },
    areaBotoes: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    inputText: {
        width: '90%',
        height: 60,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    textosAvaliacao: {
        width:'30%',
        height: 70,
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        textAlign: 'center',
        borderRadius: 10,
    }

})

export {novaAvalicao}
