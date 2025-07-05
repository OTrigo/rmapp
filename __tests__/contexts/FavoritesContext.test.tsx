import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { FavoritesProvider, FavoritesContext } from '../../src/contexts/FavoritesContext';

describe('FavoritesContext', () => {
  it('should add and remove favorites', async () => {
    const character = { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', location: { name: 'Earth' } };
    let contextValue: any;

    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );

    // Add favorite
    await act(async () => {
      contextValue.addFavorite(character);
    });

    await waitFor(() => {
      expect(contextValue.favorites).toEqual([character]);
      expect(contextValue.isFavorite(1)).toBe(true);
    });

    // Remove favorite
    await act(async () => {
      contextValue.removeFavorite(1);
    });

    await waitFor(() => {
      expect(contextValue.favorites).toEqual([]);
      expect(contextValue.isFavorite(1)).toBe(false);
    });
  });
});