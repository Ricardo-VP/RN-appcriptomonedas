import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
const Formulario = ({
  moneda,
  criptomoneda,
  setCriptomoneda,
  setMoneda,
  setConsultarAPI,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);
  // ALMACENA LAS SELECCIONES DEL USUARIO
  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };
  const obtenerCriptomoneda = cripto => {
    setCriptomoneda(cripto);
  };
  // FUNCIÓN DE COTIZACIÓN
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    // cambiar el state de consultar API
    setConsultarAPI(true);
  };
  // ALERTA
  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar Estadounidense" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
