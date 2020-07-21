import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppContext from '../../contexts/barbershops';
import { useAuth } from '../../contexts/auth';
import { IBarbershop } from '../../contexts/types-barbershop';
import MainCardBarber from '../../components/MainCardBarber';
import { colors } from '../../utils/styles';

const MainScreen: React.FC = () => {
  const { barbershop } = useContext(AppContext);
  const { signOut } = useAuth();
  const [barbershopSearched, setBarbershopSearched] = useState<IBarbershop[]>(
    []
  );

  function searchedText(text: string) {
    const textUp = text.toUpperCase();
    const arrSearched = barbershop.map(shop => {
      if (shop.name.toUpperCase().includes(textUp)) {
        return shop;
      }
    });
    const filtered = arrSearched.filter(
      shop => shop !== undefined
    ) as IBarbershop[];
    setBarbershopSearched(filtered);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={24} color="#888" style={styles.iconInput} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          placeholderTextColor="#888"
          onChangeText={text => searchedText(text)}
        />
      </View>
      <FlatList
        data={
          barbershopSearched?.length !== 0 ? barbershopSearched : barbershop
        }
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <MainCardBarber barbershop={item} />}
      />
      <Text onPress={signOut}>Sair</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColorRgba,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 35,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 209, 203, 0.15)',
    borderRadius: 30,
    marginBottom: 20,
  },
  iconInput: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default MainScreen;
