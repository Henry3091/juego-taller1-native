import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HighScoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Puntaje más alto</Text>
      <Text style={styles.score}>Tu mejor puntaje: 150</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 10 },
  score: { fontSize: 20 },
});
