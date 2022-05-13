import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'

import { Home } from './src/screens/Home';
import theme from './src/styles/theme';
import { ImageSlider } from './src/components/ImageSlider';
import { CarDetails } from './src/screens/CarDetails';

export default function App() {

  const [fontsLoaded] = useFonts({ //recupera para saber se as forntes já estão carregadas ou não
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme} >
      {/*  <Home /> */}
      <CarDetails />
    </ThemeProvider>

  )
}