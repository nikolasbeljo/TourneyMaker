import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTournamentModal = ({ visible, onSave, onClose }) => {
    const [tournamentDetails, setTournamentDetails] = useState({
        name: '',
        sport: '',
        participants: '',
        format: '',
        date: new Date(), // Initialize with current date
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const sports = [
        { title: 'Soccer', icon: 'soccer' },
        { title: 'Basketball', icon: 'basketball' },
        { title: 'Tennis', icon: 'tennis' },
        { title: 'Volleyball', icon: 'volleyball' },
        { title: 'Videogames', icon: 'gamepad' },
        { title: 'Other', icon: 'handball' },
    ];

    const participantsOptions = [
        { title: '4' },
        { title: '5' },
        { title: '6' },
        { title: '7' },
        { title: '8' },
        { title: '9' },
        { title: '10' },
        { title: '11' },
        { title: '12' },
    ];
    
    const tournamentFormat = [
        { title: 'Knockout' },
        { title: 'Round Robin' },
    ];

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('tournamentDetails', JSON.stringify(tournamentDetails));
            console.log('Tournament details saved:', tournamentDetails);
        } catch (error) {
            console.error('Error saving tournament details:', error);
        }
        onSave(tournamentDetails);

        setTournamentDetails({
            name: '',
            sport: '',
            participants: '',
            format: '',
            date: new Date(), // Reset to current date
        });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || tournamentDetails.date;
        setShowDatePicker(false);
        setTournamentDetails({ ...tournamentDetails, date: currentDate });
    };

    return (
        <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Tournament Details</Text>
                        <Text style={styles.label}>Tournament Name:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter tournament name"
                            value={tournamentDetails.name}
                            onChangeText={(text) => setTournamentDetails({ ...tournamentDetails, name: text })}
                        />
                        <Text style={styles.label}>Sport:</Text>
                        <SelectDropdown
                            data={sports}
                            onSelect={(selectedItem) => setTournamentDetails({ ...tournamentDetails, sport: selectedItem ? selectedItem.title : '' })}
                            renderButton={(selectedItem, isOpened) => (
                                <View style={styles.dropdownButtonStyle}>
                                    {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
                                    <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.title : 'Select sport'}</Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            )}
                            renderItem={(item, index, isSelected) => (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                        <Text style={styles.label}># of Participants:</Text>
                        <SelectDropdown
                            data={participantsOptions}
                            onSelect={(selectedItem) => setTournamentDetails({ ...tournamentDetails, participants: selectedItem ? selectedItem.title : '' })}
                            renderButton={(selectedItem, isOpened) => (
                                <View style={styles.dropdownButtonStyle}>
                                    <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.title : 'Select # of Participants'}</Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            )}
                            renderItem={(item, index, isSelected) => (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                        <Text style={styles.label}>Format:</Text>
                        <SelectDropdown
                            data={tournamentFormat}
                            onSelect={(selectedItem) => setTournamentDetails({ ...tournamentDetails, format: selectedItem ? selectedItem.title : '' })}
                            renderButton={(selectedItem, isOpened) => (
                                <View style={styles.dropdownButtonStyle}>
                                    <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.title : 'Select Tourney Format'}</Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            )}
                            renderItem={(item, index, isSelected) => (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />

                        <Text style={styles.label}>Date:</Text>
                        <View style={styles.dateTimePickerContainer}>
                            <DateTimePicker
                                    value={tournamentDetails.date}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <MaterialIcons name="add" size={24} color="white" />
                            <Text style={styles.saveButtonText}>Save Tournament</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalContent: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
    },
    modalInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    dateTimePickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    dropdownButtonStyle: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
    },
    dropdownButtonArrowStyle: {
        fontSize: 24,
    },
    dropdownButtonIconStyle: {
        fontSize: 24,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        marginTop: 5,
        borderRadius: 5,
        elevation: 3,
    },
    dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    dropdownItemIconStyle: {
        fontSize: 24,
    },
});

export default CreateTournamentModal;