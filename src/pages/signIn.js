import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, 
  TextInput, Image, ImageBackground,
  TouchableOpacity, Dimensions
} from 'react-native';

import LogoImg from '../images/wish.png';
import ImageLogin from '../images/paisagem.jpg';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleEmail(email) {
    setEmail( email );
  };

  function handlePassword(password) {
    setPassword( password );
  };

  return (
    <ImageBackground
      source={ImageLogin}
      resizeMode="cover"
      style={styles.container}
    >
      <Image
        source={LogoImg}
        style={styles.logo}
      />
      {error.length !== 0 && <Text style={styles.errorMessage}>{error.error}</Text>}
      <View style={styles.login_container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.input_container}>
          {/*<Icon name='person' type='ionicons' color='#5352ED' />*/}
          <TextInput 
            placeholder = "Email"
            placeholderTextColor = "#aaa"
            value = {email}
            onChangeText = {handleEmail}
            style={styles.inputs}
          />
          <TextInput 
            placeholder = "Password"
            placeholderTextColor = "#aaa"
            value = {password}
            onChangeText = {handlePassword}
            secureTextEntry = {true}
            style={styles.inputs}
          />
          <TouchableOpacity
            style = {[styles.inputs, styles.submit_btn]}
          >
            <Text style={styles.text_btn}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.text_register}>
            Don't have an account? <TouchableOpacity><Text style={styles.text_register_purple}>Register</Text></TouchableOpacity>
          </Text>
        </View>
      </View>  
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login_container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    
    height: '41%',
    width: '100%',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: '#2c2727',
    opacity: 0.9
  },
  input_container: {
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.05,
    alignSelf: 'center',

    height: 220, 
    width: 220,
  },
  submit_btn: {
    backgroundColor: '#5352ED',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_btn: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  text_register: {
    color: '#fff',
    fontWeight: 'bold'
  },
  text_register_purple: {
    color: '#5352ED'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    marginLeft: 40
  },
  title_app: {
    marginBottom: 300,
    marginHorizontal: 0,
    color: '#B433FF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  inputs: {
    height: 60,
    width: 330,
    backgroundColor: '#444',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#aaa'
  },
  errorMessage: {
  textAlign: 'center',
  color: '#ce2029',
  fontSize: 16,
  marginBottom: 15,
  marginHorizontal: 20
  }
});
