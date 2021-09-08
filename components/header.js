import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native'
const Header = () => (  
        <Text style={styles.encabezado}>Criptomonedas</Text>
    );
 
const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        fontFamily: 'Lato-Black'
    }
});

export default Header;