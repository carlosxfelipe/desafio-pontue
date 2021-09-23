import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios'

import { Container, Input } from './styles'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const doLogin = async () => {
    try {
      const response = await axios.post('https://desafio.pontue.com.br/auth/login', {
        email,
        password
      });
      if (response.status === 200) {
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
