/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

const Redacao = ({ route }) => {
  const { redacaoId } = route.params;
  const [redacao, setRedacao] = useState(null);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('@access_token');
    const response = await axios.get(
      `https://desafio.pontue.com.br/redacao/${redacaoId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (redacao === null) {
      setRedacao(response.data.data);
    }
  }, [redacao]);

  return <View />;
};

export default Redacao;
