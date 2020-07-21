import React from 'react';
import {
  View,
  Image,
  Text,
  //Modal,
  StyleSheet,
} from 'react-native';
import { Rating } from 'react-native-elements';

import { IStoreFavorite } from '../../contexts/types-custumer';
import { colors } from '../../utils/styles';

//TODO limitar o n° de caracteres no endereço

const CouponCardBarberHeader: React.FC<{
  barbershop: IStoreFavorite;
}> = ({ barbershop }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: barbershop.image.url }}
          resizeMode="cover"
          borderRadius={44}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerText}>
          <Text style={styles.title}>{barbershop.name}</Text>
          <Text style={styles.address}>
            {`${barbershop.address.street}, ${barbershop.address.number} -  ${barbershop.address.city}`}
          </Text>
          <Text style={styles.phone}>{barbershop.tel}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            type="custom"
            ratingCount={5}
            startingValue={barbershop.rating.rating}
            showRating={false}
            imageSize={16}
            ratingBackgroundColor={colors.primaryColorRgba}
            ratingColor="#992929"
            readonly={true}
            tintColor="#191d21"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    backgroundColor: colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 2,
  },
  imageContainer: {
    height: 88,
    width: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  infoContainerText: {
    //backgroundColor: 'blue',
  },
  title: {
    color: colors.secondaryColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  address: {
    color: colors.secondaryColor,
    fontSize: 14,
    marginLeft: 5,
  },
  phone: {
    color: colors.secondaryColor,
    fontSize: 14,
    marginLeft: 5,
  },
  ratingContainer: {
    height: 20,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
});
export default CouponCardBarberHeader;
