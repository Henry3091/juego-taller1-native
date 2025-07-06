import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Tiempo: 30s</Text>
      <Text style={styles.score}>Puntaje: 0</Text>

      <TouchableOpacity style={styles.insect}>
        <TouchableOpacity style={styles.insect}>
       <Text>JUEGO</Text>
       </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  timer: { fontSize: 20, marginBottom: 10 },
  score: { fontSize: 18, marginBottom: 20 },
  insect: {
    position: 'absolute',
    top: 200,
    left: 100,
  },
});
