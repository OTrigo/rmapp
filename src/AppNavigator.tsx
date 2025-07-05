
import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CharacterListScreen from './screens/CharacterListScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import EpisodeDetailScreen from './screens/EpisodeDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Character } from './types';

export type RootStackParamList = {
  Characters: undefined;
  CharacterDetail: { character: Character };
  EpisodeDetail: { episodeUrl: string };
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Characters"
          component={CharacterListScreen}
          options={({ navigation }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Favorites')}
                title="Favorites"
              />
            ),
          })}
        />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
