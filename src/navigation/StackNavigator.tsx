import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InicioScreen from '../screens/InicioScreen';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Inicio: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
