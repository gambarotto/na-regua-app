import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

import AppointmentContext from '../../../../contexts/appointment';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../../utils/styles';

interface IDaysAvailables {
  dayNameWeek: string;
  dayNumber: string;
  month: string;
  timestamp: number | null;
}

const SelectDay: React.FC = () => {
  const { daySelected, setDaySelected, daysAvailables } = useContext(
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
    outputRange: [widthScreen, 0],
  });

  function handleSelectDay(item: IDaysAvailables) {
    setDaySelected(item);
  }

  return (
    <Animated.View style={[styles.container, { marginLeft: margin }]}>
      <View style={styles.containerMonth}>
        <Text style={styles.textMonth}>Julho</Text>
        <Text style={styles.textYear}>2020</Text>
      </View>
      <View style={styles.containerListDays}>
        <FlatList
          data={daysAvailables}
          keyExtractor={item => String(item.dayNumber)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.containerItem}
              onPress={() => handleSelectDay(item)}>
              <Text style={styles.textDayName}>{item.dayNameWeek}</Text>
              <LinearGradient
                colors={
                  daySelected.dayNumber === item.dayNumber
                    ? [colors.firstGradientColor, colors.firstGradientColor]
                    : [colors.primaryColor, colors.primaryColor]
                }
                style={[
                  styles.containerDayNumber,
                  daySelected.dayNumber === item.dayNumber &&
                    styles.daySelected,
                ]}>
                <Text
                  style={[
                    styles.textDayNumber,
                    daySelected.dayNumber === item.dayNumber &&
                      styles.textDayNumberSelected,
                  ]}>
                  {item.dayNumber}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    //backgroundColor: colors.tertiaryColor,
    //borderRadius: 30,
    //elevation: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  calendar: {
    height: 200,
    width: '100%',
    padding: 50,
  },
  containerMonth: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  textMonth: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  textYear: {},
  containerListDays: {
    marginTop: 8,
  },
  containerItem: {
    height: 60,
    width: 55,
    marginRight: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDayName: {
    fontWeight: 'bold',
    color: colors.backgroundWhite,
    marginBottom: 5,
  },
  containerDayNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  textDayNumber: {
    color: colors.backgroundWhite,
    fontWeight: 'bold',
  },
  textDayNumberSelected: {
    color: colors.white,
  },
  daySelected: {
    width: 55,
    borderRadius: 20,
    backgroundColor: colors.aqua,
  },
});
export default SelectDay;
