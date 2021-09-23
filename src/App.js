import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './pages/Login'
import Home from './pages/Home'

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("Login")


  useEffect(async () => {
    const value = await AsyncStorage.getItem('@access_token')
    if (value != null) {
        setInitialRouteName("Home")
    }
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}