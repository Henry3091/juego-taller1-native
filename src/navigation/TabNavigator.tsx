import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameScreen from '../screens/GameScreen';
import HighScoreScreen from '../screens/HighScoreScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Juego" component={GameScreen} />
      <Tab.Screen name="Puntaje" component={HighScoreScreen} />
    </Tab.Navigator>
  );
}

