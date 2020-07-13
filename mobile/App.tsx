import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar, YellowBox } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import Routes from './src/routes';

export default function App() {

  YellowBox.ignoreWarnings(['Warning: Each', 'Warning: Failed']);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  console.disableYellowBox = true;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Routes />
    </>
  );
}
