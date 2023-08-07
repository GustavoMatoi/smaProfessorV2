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
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}32</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>33 - 37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 32</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 24</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16 - 23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 09</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}24</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}18</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}15</Text>
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
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}42</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>'}34</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>38 - 42</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>37 - 40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>33 - 38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>31 - 34</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MÉDIO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>33 - 36</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>32 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>27 - 30</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15 - 19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>50 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>60 - 69</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>REGULAR</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>27 - 31</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 26</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>
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

