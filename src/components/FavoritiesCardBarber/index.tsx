/* eslint-disable no-shadow */
import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Rating } from 'react-native-elements';

import { IFavorites } from '../../contexts/types-custumer';
import { IDayWeek } from '../../contexts/types-barbershop';
import { colors } from '../../utils/styles';

const FavoritiesCardBarber: React.FC<{ favorite: IFavorites }> = ({
  favorite,
}) => {
  function getScheduleDay() {
    const day = new Date().getDay();
    const scheduleDay = favorite.store.schedule.days_week.map(
      daySchedule => daySchedule.dayOfWeek === day && (daySchedule as IDayWeek)
    );
    const scheduleFiltered: (IDayWeek | any)[] = scheduleDay.filter(
      day => day !== false
    );
    return {
      initial: scheduleFiltered[0].scheduleParsed[0],
      final:
        scheduleFiltered[0].scheduleParsed[
          scheduleFiltered[0].scheduleParsed.length - 1
        ],
    };
  }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View style={styles.containerInfos}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: favorite.store.image.url }}
            style={styles.image}
          />
        </View>
        <View style={styles.containerData}>
          <Text style={styles.title}>{favorite.store.name}</Text>
          <Text style={styles.address}>
            {`${favorite.store.address.street}, ${favorite.store.address.number} -  ${favorite.store.address.city}`}
          </Text>
          <Text style={styles.phone}>{favorite.store.tel}</Text>
          <View style={styles.ratingContainer}>
            <Rating
              type="custom"
              ratingCount={5}
              startingValue={favorite.store.rating.rating}
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
      <View style={styles.containerSchedule}>
        <Text style={styles.textSchedule}>
          {`Horário de atendimento hoje: ${getScheduleDay().initial} - ${
            getScheduleDay().final
          }`}
        </Text>
      </View>
      <View style={styles.containerServices}>
        <Text style={styles.titleService}>Serviços</Text>
        <FlatList
          data={favorite.store.services}
          keyExtractor={item => String(item.id)}
          horizontal={true}
          renderItem={({ item }) => (
            <Text style={styles.textFlat}>{item.name}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 220,
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondaryColorRgba,
    elevation: 5,
  },
  containerInfos: {
    height: 100,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 88,
    width: 88,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
    borderRadius: 44,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 44,
  },
  containerData: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Comfortaa-Regular',
    color: colors.secondaryColor,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Comfortaa-Regular',
    color: colors.secondaryColor,
    marginLeft: 10,
  },
  phone: {
    fontSize: 14,
    fontFamily: 'Comfortaa-Regular',
    color: colors.secondaryColor,
    marginLeft: 10,
  },
  ratingContainer: {
    height: 20,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  containerSchedule: {
    height: 20,
    width: '100%',
    marginBottom: 5,
  },
  textSchedule: {
    fontSize: 12,
    fontFamily: 'Comfortaa-Regular',
    color: colors.secondaryColor,
  },
  containerServices: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleService: {
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    color: colors.secondaryColor,
    marginBottom: 10,
  },
  textFlat: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
    marginHorizontal: 8,
  },
});
export default FavoritiesCardBarber;
