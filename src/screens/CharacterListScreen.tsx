
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../services/api';
import { Character } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';

type CharacterListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Characters'
>;

type Props = {
  navigation: CharacterListScreenNavigationProp;
};

const CharacterListScreen = ({ navigation }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/character').then(response => {
      setCharacters(response.data.results);
    });
  }, []);

  const filteredCharacters = search
    ? characters.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
      )
    : characters;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CharacterDetail', { character: item })
            }
          >
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Species: {item.species}</Text>
              <Text>Gender: {item.gender}</Text>
              <Text>Location: {item.location.name}</Text>
            </View>
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
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharacterListScreen;
