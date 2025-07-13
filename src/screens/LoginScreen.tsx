import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { supabase } from '../supabase/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Inicio: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Correo inválido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña muy corta');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Error de autenticación', error.message);
    } else {
      navigation.replace('Inicio');
    }
  };

  return (
    <View>
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')}>¿No tienes cuenta? Regístrate</Text>
    </View>
  );
}
