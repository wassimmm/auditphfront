// TheApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SurveyScreen from './screens/SurveyScreen';
import AlbumScreen from './screens/AlbumScreen';
import ProgressionScreen from './screens/ProgressionScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="Progression" component={ProgressionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
