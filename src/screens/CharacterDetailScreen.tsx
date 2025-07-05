
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Character } from '../types';
import { RootStackParamList } from '../AppNavigator';
import { FavoritesContext } from '../contexts/FavoritesContext';

type CharacterDetailScreenRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

type CharacterDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CharacterDetail'
>;

type Props = {
  route: CharacterDetailScreenRouteProp;
  navigation: CharacterDetailScreenNavigationProp;
};

const CharacterDetailScreen = ({ route, navigation }: Props) => {
  const { character } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const isCharFavorite = isFavorite(character.id);

  const handleFavoritePress = () => {
    if (isCharFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Location: {character.location.name}</Text>
      <Button
        title={isCharFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleFavoritePress}
      />
      <Text style={styles.episodesHeader}>Episodes:</Text>
      <FlatList
        data={character.episode}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetail', { episodeUrl: item })}
          >
            <Text style={styles.episode}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  episode: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default CharacterDetailScreen;
