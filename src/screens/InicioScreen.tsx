import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function InicioScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Juego Caza Insectos</Text>
      <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
      <View style={{ marginTop: 10 }} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 40 },
});
