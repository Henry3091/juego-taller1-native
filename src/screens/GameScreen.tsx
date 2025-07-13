import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <View>
      <Text>Tiempo restante: {timeLeft}s</Text>
      <Text>Puntaje: {score}</Text>
      <Button title="Aumentar puntaje" onPress={() => setScore(score + 1)} />
    </View>
  );
}

