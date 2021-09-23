import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const App = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const doLogin = async () => {
    try {
      const response = await axios.post('https://desafio.pontue.com.br/auth/login', {
        email,
        password
      });
      if (response.status === 200) {
        Alert.alert('Usuário logado')
      }
      console.log(response.data)
    } catch (err) {
      console.log('error => ', err)
      Alert.alert('Combinação usuário/senha inexistente')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Bem-vindo ao Pontue</Text>
        <TextInput onChangeText={(text) => setEmail(text)} />
        <TextInput onChangeText={(text) => setPassword(text)}  />
      </View>
      <Button title="Fazer login" onPress={doLogin}/>
    </View>
  );
};

export default App;
