import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './app/tabs/Navbar';

export default function App() {
  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
}
