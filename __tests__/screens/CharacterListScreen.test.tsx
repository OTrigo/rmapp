import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CharacterListScreen from '../../src/screens/CharacterListScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../src/AppNavigator';
import api from '../../src/services/api';

// Mock the API call
jest.mock('../../src/services/api', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        results: [
          { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', location: { name: 'Earth' } },
          { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', gender: 'Male', location: { name: 'Earth' } },
        ],
      },
    })
  ),
}));

const mockNavigation: StackNavigationProp<RootStackParamList, 'Characters'> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  reset: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
} as any;

describe('CharacterListScreen', () => {
  it('renders the character list', async () => {
    const { findByText } = render(
      <CharacterListScreen navigation={mockNavigation as any} />
    );

    await waitFor(() => {
      expect(findByText('Rick Sanchez')).toBeTruthy();
      expect(findByText('Morty Smith')).toBeTruthy();
    }, { timeout: 10000 }); // Increase timeout to 10 seconds
  });
});