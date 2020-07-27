import React, { useContext, useEffect, useRef } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

import AppointmentContext from '../../../../contexts/appointment';
import { colors } from '../../../../utils/styles';

const SelectHour: React.FC = () => {
  const { schedule, setHourSelected, hourSelected } = useContext(
    AppointmentContext
  );
  const widthScreen = Dimensions.get('screen').width;
  const animatedValue = useRef(new Animated.Value(0)).current;
  //const opacity = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);

  const margin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-widthScreen, 0],
  });

  return (
    <Animated.View style={[styles.container, { marginLeft: margin }]}>
      {schedule.length > 0 && !schedule[0].dayOff ? (
        <FlatList
          data={schedule}
          keyExtractor={item => item.time}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.containerItem,
                hourSelected.time === item.time && styles.containerItemSelected,
              ]}
              onPress={() => setHourSelected(item)}>
              <Text
                style={[
                  styles.textItem,
                  hourSelected.time === item.time && styles.textItemSelected,
                ]}>
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.flatlist}
        />
      ) : schedule.length === 1 && schedule[0].dayOff ? (
        <Text style={styles.textDayOff}>Está de folga nesse dia</Text>
      ) : (
        <Text style={styles.textNoSchedule}>
          Selecione um dia para ver os horários disponíveis
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 66,
    width: '100%',
    //backgroundColor: colors.tertiaryColor,
    borderRadius: 33,
    //elevation: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  flatlist: {
    //height: 48,
    //marginTop: 12,
  },
  containerItem: {
    height: 45,
    width: 55,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItemSelected: {
    height: 40,
    width: 55,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: colors.firstGradientColor,
  },
  textItem: {
    fontWeight: 'bold',
    color: colors.backgroundWhite,
    marginBottom: 5,
  },
  textItemSelected: {
    color: colors.backgroundWhite,
  },
  textDayOff: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.aqua,
  },
  textNoSchedule: {
    alignSelf: 'center',
    fontSize: 10,
    color: colors.aqua,
  },
});
export default SelectHour;
