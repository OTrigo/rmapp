
import React, { createContext, useState, ReactNode } from 'react';
import { Character } from '../types';

interface FavoritesContextData {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  const addFavorite = (character: Character) => {
    setFavorites([...favorites, character]);
  };

  const removeFavorite = (characterId: number) => {
    setFavorites(favorites.filter(character => character.id !== characterId));
  };

  const isFavorite = (characterId: number) => {
    return favorites.some(character => character.id === characterId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
