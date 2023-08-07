import React from "react"
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import estilo from "../../estilo"
;

export default (props) => {

    
    return(
        <ScrollView style={style.container}>
           <SafeAreaView>
            <View style={style.linha}>
                <View style={[style.parametro]}>
                </View>
                <View style={[style.medidas, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>1ª Medida</Text>
                </View>

                <View style={[style.medidas, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>2ª Medida</Text>
                </View>

                <View style={[style.medidas, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>3ª Medida</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Massa corporal</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.massaCorporal}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Estatura</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.estatura}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Braço relaxado</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoRelaxadoMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoRelaxadoMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoRelaxadoMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Braço contraído</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoContraidoMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoContraidoMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.bracoContraidoMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Cintura</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.cinturaMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.cinturaMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.cinturaMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Abdômen</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.abdomenMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.abdomenMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.abdomenMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Quadril</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.quadrilMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.quadrilMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.quadrilMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Coxa</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.coxaMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.coxaMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.coxaMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Perna</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.pernaMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.pernaMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.pernaMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DC Peitoral</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCPeitoralMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCPeitoralMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCPeitoralMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DC Abdômen</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCAbdomenMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCAbdomenMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCAbdomenMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DC Coxa</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCoxaMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCoxaMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCoxaMedida3}</Text>
                </View>
            </View>

            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DC Tríceps</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCTricepsMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCTricepsMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCTricepsMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DC Crista Ilíaca</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCristaIliacaMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCristaIliacaMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.DCCristaIliacaMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Sentar e alcançar</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeSentarAlcancarMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeSentarAlcancarMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeSentarAlcancarMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Dinamometria pernas</Text>
                </View>
                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeDinamometriaPernasMedida1}</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeDinamometriaPernasMedida2 }</Text>
                </View>

                <View style={[style.medidas, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.testeDinamometriaPernasMedida3}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Resistência abdominal</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.resistenciaAbdominal}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>IMC</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.imc}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>FREQ. CARD. DE REP.</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.frequenciaCardiacaRepouso}</Text>
                </View>
            </View>


            <View style={style.linha}>
                <View style={[style.parametro, estilo.corLightMais1]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Pressão Arterial</Text>
                </View>
                <View style={[style.umaMedida, estilo.corLight]}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>{props.pressaoArterial}</Text>
                </View>
            </View>


            </SafeAreaView>
        </ScrollView>
 
    )
}

const style = StyleSheet.create({

    linha: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '2%'
    },
    tabela:{
        justifyContent: 'center'
    },
    parametro:{
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    medidas: {
        width: '20%',
        height: 60,
        marginLeft: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    umaMedida: {
        width: '60%',
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})