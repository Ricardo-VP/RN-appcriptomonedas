import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import axios from 'axios';
import Header from './components/header';
import Formulario from './components/formulario';
import Cotizacion from './components/cotizacion';
const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        // CONSULTAR LA API PARA COTIZAR
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        setConsultarAPI(false);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);
  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        <Cotizacion resultado={resultado} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
