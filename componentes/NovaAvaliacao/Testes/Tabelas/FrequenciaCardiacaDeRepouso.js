import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import estilo from '../../../estilo';

export default props => {

      return (
        <View style={[styles.tabela]}>
            <View style={[styles.cabecalho]}>
            <Text style={[estilo.centralizado, estilo.tituloH523px, estilo.textoCorSecundaria]}>FREQ. CARDÍACA DE REPOUSO</Text>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>26 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>46 - 55</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>56 - 65</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>65+</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>56 - 61</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>55 - 61</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>57 - 62</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>58 - 63</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>57 - 61</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>56 - 61</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>62 - 65</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>62 - 65</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>63 - 66</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>64 - 67</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>62 - 65</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>NORMAL</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 - 73</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>71 - 74</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>71 - 75</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>72 - 76</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>72 - 75</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>70 - 73</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>26 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>46 - 55</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>56 - 65</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>65+</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MENOS MAL</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>74 - 81</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>75 - 81 </Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>76 - 82</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>77 - 83</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>76 - 81</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>74 - 79</Text>
            </View>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>RUIM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 82</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 82</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 83</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 84</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 82</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>+ 80</Text>
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

