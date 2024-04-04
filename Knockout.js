import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Knockout = ({ route }) => {
  const { tournamentName, numberOfPlayers } = route.params;
  const [participants, setParticipants] = useState(new Array(parseInt(numberOfPlayers)).fill(''));

  const handleParticipantChange = (index, name) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const renderParticipants = () => {
    return participants.map((participant, index) => (
      <View key={index} style={styles.participantContainer}>
        <Text>Participant {index + 1}:</Text>
        <TextInput
          style={styles.participantInput}
          value={participant}
          onChangeText={(text) => handleParticipantChange(index, text)}
          placeholder={`Participant ${index + 1}`}
        />
      </View>
    ));
  };

  const renderBracket = () => {
    // Render knockout bracket based on the number of participants
    // Implement your knockout bracket UI here
    return (
      <View style={styles.bracketContainer}>
        <Text>Knockout Bracket</Text>
        {/* Implement your knockout bracket UI here */}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tournamentName}>{tournamentName}</Text>
      <Text style={styles.sectionTitle}>Edit Participants:</Text>
      {renderParticipants()}
      <Text style={styles.sectionTitle}>Knockout Bracket:</Text>
      {renderBracket()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  tournamentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  participantInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  bracketContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
  },
});

export default Knockout;
