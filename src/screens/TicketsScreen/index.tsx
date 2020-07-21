import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

import { IStoreFavorite, ICoupons } from '../../contexts/types-custumer';
import { useCustumer } from '../../contexts/custumer';
import { useAuth } from '../../contexts/auth';
import TicketCardBarber from '../../components/Cards/TicketsCardBarber';
import { colors } from '../../utils/styles';
import api from '../../services/api';

interface IBundleData {
  barbershop: IStoreFavorite;
  coupons: ICoupons;
}

const TicketsScreen: React.FC = () => {
  const { user } = useAuth();
  const { coupons, favorites, setCoupons, setFavorites } = useCustumer();
  const [data, setData] = useState<IBundleData[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const parseDataApi = useCallback(() => {
    console.log('efc');

    const bundle = favorities.map(favorite => {
      const couponFiltered = coupons.filter(
        coupon => coupon.store_id === favorite.store.id
      );
      return {
        barbershop: favorite.store,
        coupons: couponFiltered[0],
      };
    });
    setData(bundle);
  }, [coupons, favorites]);

  useEffect(() => {
    if (data.length === 0) {
      parseDataApi();
    }
  }, [favorites, coupons, data]);

  async function pullToRefresh() {
    setIsRefresh(true);
    console.log('ok');
    try {
      if (user) {
        const response = await api.get(`/favorites/custumers/${user.id}`);
        if (response) {
          setFavorities(response.data);
        }
        const res = await api.get(`/coupons/custumers/${user.id}`);
        if (res) {
          setCoupons(res.data);
        }
      }
      console.log('ok try');

      setIsRefresh(false);
    } catch (error) {
      console.log('ok error');

      setIsRefresh(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Ticket's</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => String(item.barbershop.id)}
        renderItem={({ item }) => <TicketCardBarber data={item} />}
        refreshing={isRefresh}
        onRefresh={pullToRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColorRgba,
    alignItems: 'center',
    paddingTop: 30,
  },
  containerTitle: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    elevation: 5,
    marginBottom: 10,
  },
  textTitle: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
  },
});
export default TicketsScreen;
