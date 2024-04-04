import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TournamentDetails from './TournamentDetails';
import CreateScreen from './CreateScreen';
import Svg, { Circle, Rect } from 'react-native-svg';

const HomeScreen = ({ navigation }) => {
  const navigateToNewPage = () => {
    navigation.navigate('Create');
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svg}>
        <Circle cx="100" cy="50" r="50" fill="#FFC0CB" />
        <Circle cx="250" cy="150" r="100" fill="#87CEEB" />
        <Circle cx="350" cy="300" r="80" fill="#FFA07A" />
        <Circle cx="150" cy="500" r="80" fill="#98FB98" />
        <Circle cx="0" cy="325" r="100" fill="#ADD8E6" />
        <Circle cx="300" cy="700" r="90" fill="#FFB6C1" />
      </Svg>
      <Text style={styles.title}>Tourney Maker</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToNewPage}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tournament" component={TournamentDetails} />
        <Stack.Screen name="Create" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Change background color as desired
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007bff', // Change button color as desired
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
