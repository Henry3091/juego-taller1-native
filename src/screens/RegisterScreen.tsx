import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imageError, setImageError] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Correo inválido');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError('Mínimo 8 caracteres, con letras y números');
    } else {
      setPasswordError('');
    }
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
      setImageError('');
    }
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setEmailError('Correo inválido');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Mínimo 8 caracteres, con letras y números');
      return;
    }

    if (!imageUri) {
      setImageError('Debes seleccionar una imagen de perfil');
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (
        error.message.includes('already registered') ||
        error.message.includes('User already')
      ) {
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
    <View style={styles.container}>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={styles.input}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}
      {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.registerText} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});
