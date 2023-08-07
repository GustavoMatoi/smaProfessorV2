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
          <Text style={[estilo.centralizado, estilo.tituloH619px, estilo.textoCorSecundaria]}>IMC</Text>
        </View>
        </View>
          
        <View style={[styles.areaColunas]}>
        <View style={[styles.colunas]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Abaixo do peso</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Peso normal</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Sobrepeso</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Obesidade grau 1</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Obesidade grau 2</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Obesidade grau 3</Text>

          </View>
        <View style={[styles.colunas]}>
        <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Abaixo de 18.5</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18.5 - 24.9</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24.9 - 29.9</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 34.9</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>35 - 39.9</Text>
            <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>Maior ou igual a 40</Text>
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

