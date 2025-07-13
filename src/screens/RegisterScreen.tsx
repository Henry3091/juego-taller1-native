import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
   Login: undefined;
  Register: undefined;
  Inicio: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Validar formato de correo
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validar contraseña fuerte: mínimo 8 caracteres, al menos una letra y un número
  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Contraseña débil',
        'La contraseña debe tener al menos 8 caracteres e incluir letras y números.'
      );
      return;
    }

    if (!imageUri) {
      Alert.alert('Imagen requerida', 'Debes seleccionar una imagen de perfil.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('User already')) {
        Alert.alert('Error de registro', 'Este correo ya está registrado.');
      } else {
        Alert.alert('Error de Supabase', error.message);
      }
      return;
    }

    Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión.');
    navigation.replace('Login');
  };

  return (
    <View>
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

