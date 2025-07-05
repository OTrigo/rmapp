
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Episode, Character } from '../types';
import api from '../services/api';

type RootStackParamList = {
  EpisodeDetail: { episodeUrl: string };
};

type EpisodeDetailScreenRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;

type EpisodeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EpisodeDetail'
>;

type Props = {
  route: EpisodeDetailScreenRouteProp;
  navigation: EpisodeDetailScreenNavigationProp;
};

const EpisodeDetailScreen = ({ route }: Props) => {
  const { episodeUrl } = route.params;
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    api.get(episodeUrl).then(response => {
      setEpisode(response.data);
      const characterPromises = response.data.characters.map((characterUrl: string) =>
        api.get(characterUrl)
      );
      Promise.all(characterPromises).then(characterResponses => {
        setCharacters(characterResponses.map(res => res.data));
      });
    });
  }, [episodeUrl]);

  if (!episode) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{episode.name}</Text>
      <Text>Air Date: {episode.air_date}</Text>
      <Text>Episode: {episode.episode}</Text>
      <Text style={styles.charactersHeader}>Characters in this episode:</Text>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.characterName}>{item.name}</Text>
          </View>
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
  charactersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  characterName: {
    fontSize: 16,
  },
});

export default EpisodeDetailScreen;
