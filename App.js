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

const HomeScreen = ({ navigation }) => {
  const [tournaments, setTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState('');

  const createTournament = () => {
    if (newTournament.trim() !== '') {
      setTournaments([...tournaments, newTournament]);
      setNewTournament('');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tourney Maker</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter tournament name"
          onChangeText={(text) => setNewTournament(text)}
        />
        <TouchableOpacity style={styles.button} onPress={createTournament}>
          <Text style={styles.buttonText}>+ New Tournament</Text>
        </TouchableOpacity>

        <View style={styles.tournamentsList}>
          <Text style={styles.tournamentsListHeader}>Tournaments:</Text>
          <FlatList
            data={tournaments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tournamentItem}
                onPress={() => navigation.navigate('Tournament', { tournamentName: item })}
              >
                <Text style={styles.tournamentItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const TournamentScreen = ({ route }) => {
  const { tournamentName } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{tournamentName}</Text>
      </View>

      {/* Implement the rest of the tournament creation UI here */}
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tournament" component={TournamentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tournamentsList: {
    marginTop: 20,
  },
  tournamentsListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tournamentItem: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
  },
  tournamentItemText: {
    fontSize: 16,
  },
});

export default App;
