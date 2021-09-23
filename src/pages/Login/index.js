import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Input } from './styles'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(async () => {
    const value = await AsyncStorage.getItem('@access_token')
    if (value != null) {
        navigation.navigate('Home')
    }
  }, [])

  const doLogin = async () => {
    try {
      const response = await axios.post('https://desafio.pontue.com.br/auth/login', {
        email,
        password
      });
      if (response.status === 200) {
        await AsyncStorage.setItem('@access_token', response.data.access_token)
        navigation.navigate('Home')
      }
      console.log(response.data)
    } catch (err) {
      console.log('error => ', err)
      Alert.alert('Combinação usuário/senha inexistente')
    }
  }

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Text>Bem-vindo ao Pontue</Text>
        <View style={{ height: 16 }} />
        <Input onChangeText={(text) => setEmail(text)} />
        <View style={{ height: 16 }} />
        <Input onChangeText={(text) => setPassword(text)}  />
      </View>
      <Button title="Fazer login" onPress={doLogin}/>
    </Container>
  );
};

export default Login;
