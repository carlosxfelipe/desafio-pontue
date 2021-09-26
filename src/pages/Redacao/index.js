/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Linking, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Title, Label } from './styles';

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

  return (
    redacao && (
      <Container contentContainerStyle={{ flex: 1 }}>
        <Title>Nome Completo</Title>
        <Label>{redacao.aluno.nome_completo}</Label>
        <Title>Número</Title>
        <Label>{redacao.numero}</Label>
        <Title>Data da criação</Title>
        <Label>{redacao.created_at}</Label>
        <Title>Anotações</Title>
        <Label>{redacao.urls[0].anotacoes || 'Sem anotações'}</Label>
        <Title>Comentários</Title>
        <Label>{redacao.urls[0].comentarios || 'Sem comentários'}</Label>
        <Title>Redação</Title>
        <Button
          onPress={() => Linking.openURL(redacao.urls[0].url)}
          title="Abrir Redação"
        />
      </Container>
    )
  );
};

export default Redacao;
