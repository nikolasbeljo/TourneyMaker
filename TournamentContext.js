// TournamentContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TournamentContext = createContext();

const tournamentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOURNAMENT':
      const updatedTournaments = [...state.tournaments, action.payload];
      saveDataToStorage(updatedTournaments);
      return { ...state, tournaments: updatedTournaments };
    default:
      return state;
  }
};

const saveDataToStorage = async (data) => {
  try {
    await AsyncStorage.setItem('tournaments', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const TournamentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tournamentReducer, { tournaments: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const tournamentsData = await AsyncStorage.getItem('tournaments');
        if (tournamentsData !== null) {
          dispatch({ type: 'ADD_TOURNAMENT', payload: JSON.parse(tournamentsData) });
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };
    loadData();
  }, []);

  return (
    <TournamentContext.Provider value={{ state, dispatch }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => React.useContext(TournamentContext);
