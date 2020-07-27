import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IService } from '../../../contexts/types-barbershop';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../../utils/styles';
// import { Container } from './styles';

const CardService: React.FC<{ item: IService }> = ({ item }) => {
  return (
    <LinearGradient
      colors={['rgba(215, 209, 203, 0.0)', colors.secondaryColor]}
      start={{ x: 0.6, y: 0.5 }}
      end={{ x: 0.5, y: 1.0 }}
      style={styles.container}>
      <Text style={styles.title}>{`${item.name}`}</Text>
      <Text style={styles.price}>{`R$ ${item.price}`}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 80,
    //backgroundColor: colors.secondaryColorRgba,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    //borderWidth: 1,
    borderColor: colors.secondaryColor,
    marginRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    color: colors.secondaryColor,
  },
  price: {
    fontFamily: 'Anton-Regular',
    fontSize: 16,
    color: colors.primaryColor,
  },
});

export default CardService;
