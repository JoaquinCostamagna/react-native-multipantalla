import "react-native-gesture-handler";
import React from "react";

<<<<<<< Updated upstream
import AlbumList from "./components/AlbumList";
import PhotoList from "./components/PhotoListFunc";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
=======
import AlbumList from './components/AlbumListFunc';
import PhotoList from './components/PhotoList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
>>>>>>> Stashed changes

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
