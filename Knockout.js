import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Knockout = ({ route }) => {
  const { tournamentName, tournamentSport, numberOfPlayers, tournamentType, tournamentDate } = route.params;
  const [participants, setParticipants] = useState(new Array(parseInt(numberOfPlayers)).fill(''));
  const [fixtures, setFixtures] = useState([]);
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [roundWinners, setRoundWinners] = useState([]);
  const [scores, setScores] = useState([]);

  const handleParticipantChange = (index, name) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const generateFixtures = () => {
    const shuffledParticipants = participants.slice().sort(() => Math.random() - 0.5);
    const numOfMatches = Math.floor(numberOfPlayers / 2);
    const currentFixtures = [];

    for (let i = 0; i < numOfMatches; i++) {
      currentFixtures.push([shuffledParticipants[i], shuffledParticipants[numOfMatches + i]]);
    }

    setFixtures(currentFixtures);
  };

  const handleStartTournament = () => {
    generateFixtures();
    setTournamentStarted(true);
    // Disable participant inputs after tournament starts
    setParticipants((prevParticipants) => prevParticipants.map((participant) => ({ name: participant, disabled: true })));
  };

  const handleRoundFinish = () => {
    // Determine winners of the current round
    const currentRoundWinners = fixtures.map((match, index) => {
      // For simplicity, assume higher score wins
      const score1 = parseInt(scores[index * 2]) || 0;
      const score2 = parseInt(scores[index * 2 + 1]) || 0;
      return score1 > score2 ? match[0] : match[1];
    });
  
    // Update round winners
    setRoundWinners(currentRoundWinners);
  
    // Clear the scores for the next round
    setScores(new Array(fixtures.length * 2).fill(''));
  
    // Proceed to the next round if there are more than 1 winner
    if (currentRoundWinners.length > 1) {
      setRound(round + 1);
      setFixtures([]);
      generateNextRound(currentRoundWinners);
    } else {
      // Tournament finished, determine the winner
      Alert.alert('Tournament Finished', `Winner: ${currentRoundWinners[0]}`);
    }
  };

  const generateNextRound = (prevRoundWinners) => {
    if (prevRoundWinners.length === 2) {
      // If there are only 2 teams left, they play the final match
      setFixtures([prevRoundWinners]);
    } else {
      const numOfMatches = Math.floor(prevRoundWinners.length / 2);
      const nextRoundFixtures = [];

      for (let i = 0; i < numOfMatches; i++) {
        nextRoundFixtures.push([prevRoundWinners[i], prevRoundWinners[numOfMatches + i]]);
      }

      setFixtures(nextRoundFixtures);
    }
  };

  const handleScoreChange = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };

  const renderParticipants = () => {
    return participants.map((participant, index) => (
      <View key={index} style={styles.participantContainer}>
        <Text style={styles.participantNumber}>{index + 1}:</Text>
        {/* Editable text component */}
        <TextInput
          style={[styles.participantText, { backgroundColor: participant.disabled ? '#f0f0f0' : 'white' }]}
          value={participant.name}
          onChangeText={(text) => handleParticipantChange(index, text)}
          placeholder={`Participant ${index + 1}`}
          editable={!tournamentStarted && !participant.disabled}
        />
      </View>
    ));
  };

  const renderFixtures = () => {
    const tournamentFinished = roundWinners.length === 1;
  
    return (
      <View>
        <Text style={styles.sectionTitle}>Round {round} Fixtures</Text>
        {fixtures.map((match, index) => (
          <View key={index} style={styles.matchContainer}>
            <Text style={styles.matchText}>{`${match[0]} vs ${match[1]}`}</Text>
            <View style={styles.scoreContainer}>
              <TextInput
                style={[styles.scoreInput, { backgroundColor: 'white' }]}
                keyboardType="numeric"
                placeholder="Score 1"
                onChangeText={(text) => handleScoreChange(index * 2, text)}
                editable={!tournamentFinished}
                value={scores[index * 2]}
              />
              <TextInput
                style={[styles.scoreInput, { backgroundColor: 'white' }]}
                keyboardType="numeric"
                placeholder="Score 2"
                onChangeText={(text) => handleScoreChange(index * 2 + 1, text)}
                editable={!tournamentFinished}
                value={scores[index * 2 + 1]}
              />
            </View>
          </View>
        ))}
        {!tournamentFinished && (
          <TouchableOpacity style={styles.finishRoundButton} onPress={handleRoundFinish}>
            <Text style={styles.finishRoundButtonText}>Finish Round</Text>
          </TouchableOpacity>
        )}
        {tournamentFinished && (
            <View style={styles.winnerContainer}>
                <MaterialIcons name="emoji-events" size={64} color="gold" style={styles.winnerIcon} />
                <Text style={styles.winnerText}>Winner: {roundWinners[0]}</Text>
            </View>        
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tournament Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Name:</Text>
        <Text style={styles.detailText}>{tournamentName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Sport:</Text>
        <Text style={styles.detailText}>{tournamentSport}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Number of Participants:</Text>
        <Text style={styles.detailText}>{numberOfPlayers}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Format:</Text>
        <Text style={styles.detailText}>{tournamentType}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailText}>{tournamentDate}</Text>
      </View>

      <Text style={styles.sectionTitle}>Participants</Text>
      {renderParticipants()}

      {/* Start Tournament button */}
      {!tournamentStarted && (
        <TouchableOpacity style={styles.startButton} onPress={handleStartTournament}>
          <Text style={styles.startButtonText}>Start Tournament</Text>
        </TouchableOpacity>
      )}

      {/* Render fixtures if tournament started */}
      {tournamentStarted && renderFixtures()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    detailContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    detailLabel: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    detailText: {
      flex: 1,
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    participantContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    participantNumber: {
      marginRight: 10,
      fontSize: 16,
    },
    participantText: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginLeft: 10,
    },
    matchContainer: {
      marginBottom: 10,
    },
    matchText: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: 'center', // Centered text
      fontWeight: 'bold', // Bold font
    },
    scoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scoreInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
    },
    startButton: {
      backgroundColor: '#3498db',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    startButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    finishRoundButton: {
      backgroundColor: '#3498db',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    finishRoundButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    winnerContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    winnerIcon: {
      marginBottom: 20,
    },
    winnerText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'gold',
      textAlign: 'center',
    },
  });
  

export default Knockout;
