import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IStoreFavorite, ICoupons } from '../../../contexts/types-custumer';
import CouponCardBarberHeader from '../../CouponCardBarberHeader';
import CuponsCard from './CuponsCard';
import { colors } from '../../../utils/styles';

interface IBundleData {
  barbershop: IStoreFavorite;
  coupons: ICoupons;
}

const TicketsCardBarber: React.FC<{ data: IBundleData }> = ({ data }) => {
  //TODO FavoriteCardBarberHeader dinamic props
  return (
    <View style={styles.container}>
      <CouponCardBarberHeader barbershop={data.barbershop} />
      <CuponsCard tickets={data.coupons} />
      <View style={styles.containerTicketsAndCoupons}>
        <Text style={styles.text}>{`Tickets: ${data.coupons.tickets}`}</Text>
        <Text style={styles.text}>{`Cupons: ${data.coupons.coupons}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 330,
    width: '98%',
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  containerTicketsAndCoupons: {
    flexDirection: 'row',
  },
  text: {
    padding: 5,
    color: colors.secondaryColor,
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
  },
});

export default TicketsCardBarber;
