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
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>7</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>9</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>10</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>11</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}18</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}20</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}26</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}30</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}36</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>RAZOÁVEL</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>18 - 22</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>25 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>26 - 31</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>27 - 32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>32 - 37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>35 - 41</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 42</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>26 - 30</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>32 - 36</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>33 - 38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>35 - 39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 41</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>38 - 43</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>42 - 47</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>43 - 48</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>7</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>9</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>10</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>11</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MUITO BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 38</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>31 - 42</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 47</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>37 - 48</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>39 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>40 - 51</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>42 - 53</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>44 - 56</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>47 - 59</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>48 - 61</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>49 - 62</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}39</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}43</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}48</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}50</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}52</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}54</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}57</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}60</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}62</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}63</Text>
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
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>7</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>9</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>10</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>11</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>FRACO</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}17</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}19</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}20</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}21</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}22</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}24</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}24</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}24</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'<'}23</Text>

            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>RAZOÁVEL</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17 - 21</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>19 - 23</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>20 - 25</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>21 - 26</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>22 - 27</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 28</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>23 - 29</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>22 - 26</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>24 - 29</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>26 - 31</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>27 - 32</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>28 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 33</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>29 - 34</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 35</Text>
            </View>
          </View>
          <View style={[styles.areaColunas]}>
          <View style={[styles.colunas]}>
          <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>IDADE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>6</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>7</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>8</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>9</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>10</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>11</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>12</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>13</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>14</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>15</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>16</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>17</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>MUITO BOM</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>27 - 37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>30 - 40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>32 - 43</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>33 - 45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>34 - 46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>35 - 46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 48</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>36 - 48</Text>
            </View>
          <View style={[styles.colunas]}>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>EXCELENTE</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}37</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}40</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}43</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}45</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}46</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}48</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}49</Text>
              <Text style={[estilo.textoCorSecundaria, estilo.textoSmall12px, estilo.centralizado]}>{'>='}48</Text>
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

