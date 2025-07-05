
import React from 'react';
import AppNavigator from './src/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
};

export default App;
