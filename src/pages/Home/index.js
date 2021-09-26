/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

const Home = ({ navigation }) => {
  const [redacoes, setRedacoes] = useState(null);

  useEffect(async () => {
    const alunoId = await AsyncStorage.getItem('@aluno_id');
    const token = await AsyncStorage.getItem('@access_token');
    const response = await axios.get(
      `https://desafio.pontue.com.br/index/aluno/${alunoId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (redacoes === null) {
      setRedacoes(response.data.data);
    }
    console.log(redacoes);
  }, [redacoes]);

  const Cell = ({ id, numero, created_at, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Redacao', { redacaoId: id })}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: index % 2 === 0 ? '#e5e5e5' : '#d1d1d1',
        }}>
        <Text>{`Redação #${numero}`}</Text>
        <Text>{created_at}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={redacoes}
        renderItem={({ item, index }) => (
          <Cell
            numero={item.numero}
            id={item.id}
            created_at={item.created_at}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default Home;
