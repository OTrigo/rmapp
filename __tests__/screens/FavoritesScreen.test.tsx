
import React from 'react';
import { render } from '@testing-library/react-native';
import FavoritesScreen from '../../src/screens/FavoritesScreen';
import { FavoritesContext } from '../../src/contexts/FavoritesContext';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('FavoritesScreen', () => {
  it('renders the favorites list', () => {
    const favorites = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        location: { name: 'Earth (C-137)' },
      },
    ];

    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites, addFavorite: jest.fn(), removeFavorite: jest.fn(), isFavorite: jest.fn() }}>
        <FavoritesScreen navigation={mockNavigation as any} />
      </FavoritesContext.Provider>
    );

    expect(getByText('Rick Sanchez')).toBeTruthy();
  });

  it('renders a message when there are no favorites', () => {
    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites: [], addFavorite: jest.fn(), removeFavorite: jest.fn(), isFavorite: jest.fn() }}>
        <FavoritesScreen navigation={mockNavigation as any} />
      </FavoritesContext.Provider>
    );

    expect(getByText('No favorites yet.')).toBeTruthy();
  });
});
