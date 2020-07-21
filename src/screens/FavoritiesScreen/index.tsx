import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';

import { useCustumer } from '../../contexts/custumer';
import FavoritiesCardBarber from '../../components/FavoritiesCardBarber';
import { colors } from '../../utils/styles';

const FavoritiesScreen: React.FC = () => {
  const { favorites } = useCustumer();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <FavoritiesCardBarber favorite={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColorRgba,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});

export default FavoritiesScreen;
