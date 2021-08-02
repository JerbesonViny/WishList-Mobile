import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};