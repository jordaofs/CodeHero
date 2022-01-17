
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/Home';
import { Details } from './src/Details';
import * as BootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true} onReady={() => BootSplash.hide()}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;