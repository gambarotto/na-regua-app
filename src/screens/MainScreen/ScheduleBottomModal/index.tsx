import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AppointmentContext from '../../../contexts/appointment';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

import SelectDay from './SelectDay';
import SelectHour from './SelectHour';

import { colors } from '../../../utils/styles';
import { ISetAppointment } from 'src/contexts/types-custumer';
type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatcher<boolean>;
}

const ScheduleBottomModal: React.FC<{ props: IProps }> = ({ props }) => {
  const { barberSelected, hourSelected } = useContext(AppointmentContext);
  const { user } = useAuth();
  const widthScreen = Dimensions.get('screen').width;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);
  const marginImage = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-widthScreen, 0],
  });

  async function saveOnDB(data: ISetAppointment) {
    try {
      const res = await api.post(
        `/stores/${barberSelected.job_id}/appointments`,
        data
      );
      console.log(JSON.stringify('Success on save :: ', res.data));
      props.setIsVisible(false);
    } catch (error) {
      console.log('Error on Save :: SelectHour => ', error);
    }
  }
  function handleAppointment() {
    const data: ISetAppointment = {
      date: hourSelected.value,
      employee_id: barberSelected.id,
      custumer_id: user.id,
    };
    console.log(JSON.stringify(data));
    saveOnDB(data);
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.containerBarber}>
        <Animated.View
          style={[styles.containerAvatar, { marginLeft: marginImage }]}>
          <Image
            source={{ uri: barberSelected.avatar.url }}
            style={styles.avatar}
          />
        </Animated.View>
        <View style={styles.containerInfos}>
          <Text style={styles.nameBarber}>{barberSelected.name}</Text>
          <Text style={styles.responsibilityBarber}>
            {barberSelected.responsibility}
          </Text>
        </View>
      </View>
      <View style={styles.containerCalendarHour}>
        <View style={styles.calendarContainer}>
          <Text style={styles.descriptionSelectDay}>
            Selecione o dia e a hora desejado
          </Text>
          <SelectDay />
        </View>
        <View style={styles.hourContainer}>
          <SelectHour />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAppointment}>
        <LinearGradient
          colors={[colors.firstGradientColor, colors.secondGradientColor]}
          style={styles.buttonGradient}>
          <Text style={styles.textButton}>Agendar Atendimento</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height / 2,
    backgroundColor: colors.primaryColor,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  containerBarber: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  containerAvatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
    marginTop: -40,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primaryColor,
  },
  containerInfos: {
    //flex: 1,
    //backgroundColor: 'blue',
    marginLeft: 8,
  },
  nameBarber: {
    fontFamily: 'Anton-Regular',
    fontSize: 14,
    color: colors.firstGradientColor,
    letterSpacing: 1.5,
  },
  containerCalendarHour: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  calendarContainer: {
    //flex: 2,
    //backgroundColor: 'red',
  },
  hourContainer: {
    //flex: 1,
    //backgroundColor: 'red',
  },
  descriptionSelectDay: {
    fontSize: 10,
    color: colors.aqua,
    marginBottom: 10,
  },
  calendar: {
    height: 200,
    width: '100%',
    padding: 50,
  },
  responsibilityBarber: {
    //fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: '#777',
    letterSpacing: 1.5,
  },
  button: {
    height: 60,
    width: '100%',
  },
  buttonGradient: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 14,
    color: 'white',
    letterSpacing: 1.5,
  },
});
export default ScheduleBottomModal;
