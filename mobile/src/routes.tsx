import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Products from './pages/Products';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{}}
      >
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Products" component={Products} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;