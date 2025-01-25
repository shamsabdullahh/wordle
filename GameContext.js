import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([
    { id: '1', name: 'Player 1', points: 0 },
    { id: '2', name: 'Player 2', points: 0 },
    { id: '3', name: 'Player 3', points: 0 },
    { id: '4', name: 'Player 4', points: 0 },
    { id: '5', name: 'Player 5', points: 0 },
    { id: '6', name: 'Player 6', points: 0 },
    { id: '7', name: 'Player 7', points: 0 },
    { id: '8', name: 'Player 8', points: 0 },
    { id: '9', name: 'Player 9', points: 0 },
    { id: '10', name: 'Player 10', points: 0 },
  ]);


  const updatePoints = (playerId, points) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, points: player.points + points } : player
      )
    );
  };

  return (
    <GameContext.Provider value={{ players, updatePoints }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
