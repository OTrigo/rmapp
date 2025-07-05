
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const FavoritesScreen = ({ navigation }: Props) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CharacterDetail', { character: item })
              }
            >
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

export default FavoritesScreen;
