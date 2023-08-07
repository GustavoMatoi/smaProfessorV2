import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import estilo from '../../../estilo';

export default props => {

      return (
        <View style={[styles.tabela]}>
        <View style={[{width: '100%', flexDirection: 'row'}]}>
        <View style={[styles.cabecalho]}>
          <Text style={[estilo.centralizado, estilo.tituloH619px, estilo.textoCorSecundaria]}>Classificação</Text>
        </View>
          <View style={[styles.cabecalho]}>
          <Text style={[estilo.centralizado, estilo.tituloH619px, estilo.textoCorSecundaria]}>Pressão Sistólica (mmHg)</Text>
        </View>
          <View style={[styles.cabecalho]}>
          <Text style={[estilo.centralizado, estilo.tituloH619px, estilo.textoCorSecundaria]}>Pressão Diastólcia (mmHg)</Text>
        </View>
        </View>
          
        <View style={[styles.areaColunas]}>
        <View style={[styles.colunas]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>ÓTIMA</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>NORMAL</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>LIMÍTROFE</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Hipert. Estágio 1</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Hipert. Estágio 2</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Hipert. Estágio 3</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Hipert. Sis. Isolada</Text>

          </View>
        <View style={[styles.colunas]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}120</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}130</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>130 - 139</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>140 - 159</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>160 - 179</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}180</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}140</Text>
          </View>
        <View style={[styles.colunas]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}80</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}85</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>85 - 89</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>90 - 99</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>100 - 109</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}110</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}90</Text>
          </View>
      
        </View>

      </View>
       
        )
   
};

const styles = StyleSheet.create({
  tabela: {
    width: '100%',
  },
  cabecalho: {
    width: '33%',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 5
  },
  areaColunas: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  colunas: {
    width: '33%',
    padding: 5
  }
});

