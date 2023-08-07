import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import estilo from '../../../estilo';

export default props => {

    if(props.sexoDoAluno == 'Masculino'){
      return (
        <View style={[styles.tabela]}>
            <View style={[styles.cabecalho]}>
            <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>HOMENS</Text>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 +</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 17</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 14.2</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 14</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 11</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17 - 20</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14.2 - 17.4</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>11 - 17.6</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>19 - 22</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17.4 - 22</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>19 - 22.8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17.6 - 20.4</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 +</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 29.6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>22 - 28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>22 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>22.8 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20.4 - 23.4</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>ÓTIMO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}29.6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}23.4</Text>
            </View>
          
          </View>

        </View>
       
        )
    } else {
       return (
        <View style={[styles.tabela]}>
            <View style={[styles.cabecalho]}>
            <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>MULHERES</Text>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 +</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 14.6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 12.8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'} 12</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14.6 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13 - 15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13 - 17</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12.8 - 16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12 - 16</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>19 - 21</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 18</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17 - 20</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16 - 18</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 +</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>21 - 26</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>19 - 22.2</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 21.4</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>ÓTIMO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}26</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}22.2</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}21.4</Text>
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
    width: '100%',
    height:50, 
    borderWidth: 1,
    justifyContent: 'center'
  },
  areaColunas: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  colunas: {
    width: '25%',
    padding: 5
  }
});

