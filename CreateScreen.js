import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import CreateTournamentModal from './CreateTournamentModal'; // Import the new component

const sports = ['Soccer', 'Hockey', 'Football', 'Volleyball', 'Tennis', 'Baseball', 'Videogames'];

function CreateScreen({ navigation }) {
    const [tournaments, setTournaments] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const saveTournament = (tournament) => {
        setTournaments([...tournaments, tournament]);
        setShowModal(false);
    };

    const deleteTournament = (index) => {
        const updatedTournaments = [...tournaments];
        updatedTournaments.splice(index, 1);
        setTournaments(updatedTournaments);
    };

    const renderTournamentItem = ({ item, index }) => {
      const navigateToScreen = item.format === 'Knockout' ? 'Knockout' : item.format === 'Round Robin' ? 'Tournament' : 'Tournament';
      
      return (
          <View style={styles.tournamentItem}>
              <TouchableOpacity
                  style={styles.tournamentItemContent}
                  onPress={() => navigation.navigate(navigateToScreen, { 
                      tournamentName: item.name,
                      numberOfPlayers: item.participants,
                      tournamentType: item.format
                  })}
              >
                  <Text style={styles.tournamentItemText}>{item.name}</Text>
                  <Text style={styles.tournamentItemText}>{item.date.toLocaleDateString()}</Text>
                  <Text style={styles.tournamentItemText}>{item.format}</Text>
                  <MaterialIcons name={getSportIcon(item.sport)} size={24} color="#3498db" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTournament(index)}>
                  <MaterialIcons name="delete" size={24} color="white" />
              </TouchableOpacity>
          </View>
      );
    }; 

    const getSportIcon = (sport) => {
        switch (sport) {
            case 'Soccer':
                return 'sports-soccer';
            case 'Basketball':
                return 'sports-basketball';
            case 'Volleyball':
                return 'sports-volleyball';
            case 'Tennis':
                return 'sports-tennis';
            case 'Videogames':
                return 'sports-esports';
            default:
                return 'sports-baseball';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tournament Creator</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.createTournamentText}>Create Tournament</Text>
                <TouchableOpacity style={styles.createButton} onPress={openModal}>
                    <Text style={styles.createButtonText}>Create Tournament</Text>
                </TouchableOpacity>

                <View style={styles.tournamentsList}>
                    <Text style={styles.tournamentsListHeader}>Your Tournaments:</Text>
                    {tournaments.length === 0 ? (
                        <Text style={styles.emptyListText}>No tournaments yet!</Text>
                    ) : (
                        <SwipeListView
                            data={tournaments}
                            renderItem={renderTournamentItem}
                            keyExtractor={(item, index) => index.toString()}
                            disableRightSwipe
                            rightOpenValue={-75}
                        />
                    )}
                </View>
            </View>

            <CreateTournamentModal visible={showModal} onSave={saveTournament} onClose={closeModal} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3498db',
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    createTournamentText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tournamentsList: {
        marginTop: 20,
        flex: 1,
    },
    tournamentsListHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    tournamentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
    },
    tournamentItemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tournamentItemText: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic',
        color: '#888',
    },
});

export default CreateScreen;
