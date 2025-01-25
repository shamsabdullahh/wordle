import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [players] = useState([
    { id: 1, name: 'Player 1', points: 1500, image: require('./assets/Rank-1.png') },
    { id: 2, name: 'Player 2', points: 1200, image: require('./assets/Rank-2.png') }
  ]);

  return (
    <GameContext.Provider value={{ 
      currentUser,
      setCurrentUser,
      players
    }}>
      {children}
    </GameContext.Provider>
  );
};