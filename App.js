import "react-native-gesture-handler";
import React from "react";
import PhotoList from "./components/PhotoListFunc";
import AlbumList from './components/AlbumListFunc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Create a component
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="albumList"
          component={AlbumList}
          options={{ title: "Albums" }}
        />
        <Stack.Screen
          name="photoList"
          component={PhotoList}
          options={{ title: "Photos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
