import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, 
  TextInput, Image, ImageBackground,
  TouchableOpacity, Dimensions
} from 'react-native';
import { Root, Popup } from 'popup-ui';
import { Icon } from 'react-native-elements';

import LogoImg from '../images/wish.png';
import ImageLogin from '../images/paisagem.jpg';

import api from '../services/api';
import apiJ from '../services/apiJ';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation }) {
  const [animals, setAnimals] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(email) {
    setEmail( email );
  };

  function handlePassword(password) {
    setPassword( password );
  };

  async function onLogin() {
    if( email.length === 0 || password.length === 0 ){
      setPopUp('Danger');

      return false
    };

    try {
      const response = await api.post('/login/', {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem( "token", response.data.token );

      setPopUp('Success');
    } catch (error) {
      setPopUp('Warning');
    };
  };

  function setPopUp(type) {
    if( type === 'Danger' ){
      Popup.show({
        type: 'Danger',
        title: 'Falha no login',
        button: true,
        textBody: 'Preencha todos os campos',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      });
    } else if( type === 'Warning' ) {
      Popup.show({
        type: 'Warning',
        title: 'Falha no login',
        button: true,
        textBody: 'Verifique suas credenciais e tente novamente!',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      });
    } else {
      Popup.show({
        type: 'Success',
        title: 'Login efetuado',
        button: true,
        textBody: 'Login efetuado com sucesso!',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      });
    };
  };

  async function loadAnimals() {
    try {
      const response = await apiJ.get('/animals');
      setAnimals(response.data);

      console.log(response.data.data[0])
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    loadAnimals()
  }, []);

  return(
    <ImageBackground
      source={ImageLogin}
      resizeMode="cover"
      style={styles.container}
    >
      <Image
        source={LogoImg}
        style={styles.logo}
      />
      <Root />
      <View style={styles.login_container}>
        <Text style={styles.login_text}>Login</Text>
        <View style={styles.input_container}>
          <Icon
            name='email'
            type='ionicons'
            color='#5352ed'
            style={styles.input_icon}
          />
          <TextInput
            placeholder='Email'
            placeholderTextColor='#eee'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            value={email}
            onChangeText={handleEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.input_container}>
          <Icon
            name='lock'
            type='ionicons'
            color='#5352ed'
            style={styles.input_icon}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor='#eee'
            secureTextEntry={true}
            autoCapitalize='none'
            value={password}
            onChangeText={handlePassword}
            style={styles.input}
          />
        </View>
        <Text style={styles.fp_text}>Forgout Password?</Text>
        <TouchableOpacity 
          onPress={onLogin}
          style={styles.login_btn}
        >
          <Text style={styles.login_btn_text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.register_text}>
          Don't have an account? <Text style={styles.register_btn} onPress={() => navigation.navigate('Register')}>Register</Text>
        </Text>
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

    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    backgroundColor: '#2c2727',
    opacity: 0.9,
  },
  input_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    height: 40,
    borderRadius: 10,
    backgroundColor: '#444',
    marginTop: 10,
  },
  logo: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.05,
    alignSelf: 'center',
    height: 220, 
    width: 220,
  },
  login_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,

    color: '#fff',
  },
  input_icon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#eee',
  },
  login_btn: {
    backgroundColor: '#5352ed',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  login_btn_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center',
  },
  fp_text: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5352ed'
  },
  register_text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  register_btn: {
    fontWeight: 'bold',
    color: '#5352ed',
  },
});