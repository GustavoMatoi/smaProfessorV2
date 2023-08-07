import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import estilo from '../../../estilo';

export default props => {

    if(props.sexoDoAluno == 'Masculino'){
      return (
        <View style={[styles.tabela]}>
        <View style={[{width: '100%', flexDirection: 'row'}]}>
        <View style={[styles.cabecalho]}>
          <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>CLASSIFICAÇÃO</Text>
        </View>
          <View style={[styles.cabecalho]}>
          <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>FORÇA DA PERNA (KG)</Text>
        </View>
        </View>
          
        <View style={[styles.areaColunas]}>
        <View style={[styles.colunas]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>

          </View>
        <View style={[styles.colunas]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}241</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>210 - 240</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>160 - 213</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>137 - 159</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}137</Text>
          </View>
      
        </View>

      </View>
       
        )
    } else {
       return (
        <View style={[styles.tabela]}>
          <View style={[{width: '100%', flexDirection: 'row'}]}>
          <View style={[styles.cabecalho]}>
            <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>CLASSIFICAÇÃO</Text>
          </View>
            <View style={[styles.cabecalho]}>
            <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>FORÇA DA PERNA (KG)</Text>
          </View>
          </View>
            
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}138</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>144 - 135</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>66 - 113</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>49 - 65</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}49</Text>
            </View>
        
          </View>

        </View>
       
        )
    }

};

const styles = StyleSheet.create({
  tabela: {
    width: '100%',
  },
  cabecalho: {
    width: '50%',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 5
  },
  areaColunas: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  colunas: {
    width: '50%',
    padding: 5
  }
});

