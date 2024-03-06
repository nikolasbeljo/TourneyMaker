import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

const TournamentDetails = ({ route }) => {
  const { tournamentName } = route.params;
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTeam = () => {
    if (teamName.trim() !== '') {
      setTeams([...teams, teamName]);
      setTeamName('');
      setIsModalVisible(false);
    } else {
      Alert.alert('Error', 'Team name cannot be empty');
    }
  };

  const renderTeamItem = ({ item }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamItemText}>{item}</Text>
    </View>
  );

  const calculateTeamStats = (team) => {
    const goals = 0;
    const wins = 0;
    const draws = 0;
    const losses = 0;
    const goalDifference = goals - (wins * 3 + draws);
    const points = wins * 3 + draws;

    return { goals, wins, draws, losses, goalDifference, points };
  };

  const renderTableItem = ({ item }) => {
    const teamStats = calculateTeamStats(item);
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableText}>{item}</Text>
        <Text style={styles.tableText}>{teamStats.goals}</Text>
        <Text style={styles.tableText}>{`${teamStats.wins}-${teamStats.draws}-${teamStats.losses}`}</Text>
        <Text style={styles.tableText}>{teamStats.goalDifference}</Text>
        <Text style={styles.tableText}>{teamStats.points}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{tournamentName}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Teams</Text>
          <Text style={styles.tableHeaderText}>Goals</Text>
          <Text style={styles.tableHeaderText}>W-D-L</Text>
          <Text style={styles.tableHeaderText}>+/-</Text>
          <Text style={styles.tableHeaderText}>Points</Text>
        </View>

        <FlatList
          data={teams}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTableItem}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Team</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Add Team</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter team name"
                onChangeText={(text) => setTeamName(text)}
              />
              <TouchableOpacity style={styles.modalButton} onPress={addTeam}>
                <Text style={styles.modalButtonText}>Add Team</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#3498db',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
  },
  tableText: {
    flex: 1,
    textAlign: 'center',
    color: '#3498db',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  teamItem: {
    backgroundColor: '#3498db',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  teamItemText: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  modalInput: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TournamentDetails;
