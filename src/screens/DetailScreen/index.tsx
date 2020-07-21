import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { setHours, setMinutes, setSeconds, format } from 'date-fns';

import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { useCustumer } from '../../contexts/custumer';
import ModalBarber from '../../components/Modal/ModalBarber';
import ModalHour from '../../components/Modal/ModalHour';
import ModalCalendar from '../../components/Modal/ModalCalendar';
import { IBarber, IAvailables } from '../../contexts/types-barber';
import { IAppointment } from '../../contexts/types-custumer';
import { DetailStackRouteProp } from '../../routes/types';
import { colors } from '../../utils/styles';

interface IBarbers {
  id: number;
  name: string;
  email: string;
  responsibility: string;
  days_off: number[];
  job_id: number;
  schedule_id: number | null;
}

interface IDay {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
interface IData {
  day: string | ''; //'2020-06-18T17:00:00-03:00'
  hour: string;
  employeeId: number;
  custumerId: number;
}
interface IRating {
  id: number;
  rating: number;
}
const DetailScreen: React.FC = () => {
  const { setAppointments } = useCustumer();
  const [ratingUser, setRatingUser] = useState<IRating>({} as IRating);
  const [favored, setFavored] = useState(false);
  const [barberIsVisible, setBarberIsVisible] = useState(false);
  const [dayIsVisible, setDayIsVisible] = useState(false);
  const [hourIsVisible, setHourIsVisible] = useState(false);
  const [barberSelected, setBarberSelected] = useState<IBarber>({} as IBarber);
  const [daySelected, setDaySelected] = useState<IDay>({} as IDay);
  const [schedule, setSchedule] = useState<IAvailables[]>([]);
  const [hourSelected, setHourSelected] = useState<IAvailables>(
    {} as IAvailables
  );

  const { user } = useAuth();
  const route = useRoute<DetailStackRouteProp>();
  const { barbers, barbershop } = route.params.data;

  useEffect(() => {
    //TODO ajustar update de rating

    async function loadRatingCustumerStore() {
      if (user?.id) {
        const response = await api(
          `/avaliation/stores/${barbershop.id}/custumer/${user.id}`
        );
        if (response) {
          setRatingUser(response.data);
        }
      }
    }
    loadRatingCustumerStore();
  }, [barbershop.id, user]);
  useEffect(() => {
    async function loadScheduleBarber() {
      const { timestamp } = daySelected;
      try {
        const response = await api.get(
          `/employees/${barberSelected.id}/availables?date=${timestamp}`
        );
        if (response) {
          setSchedule(response.data);
        }
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
    if (daySelected.timestamp) {
      loadScheduleBarber();
    }
  }, [barberSelected.id, daySelected]);

  function handleRating(value: number) {
    setRatingUser({ ...ratingUser, rating: value });
  }
  async function attAppointmentsInContext() {
    if (user) {
      const response = await api.get<IAppointment[]>(
        `/appointments/custumers/${user.id}`
      );
      setAppointments(response.data);
    }
  }

  async function handleConfirm() {
    const [hour, minute] = hourSelected.time.split(':');
    const value: Date | string = setSeconds(
      setMinutes(setHours(daySelected.timestamp, Number(hour)), Number(minute)),
      0
    );
    const data = {
      date: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      employee_id: barberSelected.id,
      custumer_id: user?.id,
    };
    try {
      const response = await api.post(
        `/stores/${barbershop.id}/appointments`,
        data
      );
      console.log('response --> ', JSON.stringify(response.data));
      attAppointmentsInContext();
    } catch (error) {
      console.log('error --> ', JSON.stringify(error));
    }
  }
  // async function handleFavorite(){
  //   const response = await api.post()
  // }
  return (
    <View style={styles.container}>
      <View style={styles.cntnrImage}>
        <Image style={styles.image} source={{ uri: barbershop.image.url }} />
      </View>
      <View style={styles.cntnrInfo}>
        <Animatable.View
          animation="bounceIn"
          style={[styles.cntnrFav, favored && styles.cntnrFavTrue]}>
          <TouchableOpacity onPress={() => setFavored(!favored)}>
            <Icon
              name="grade"
              size={24}
              color={favored ? colors.secondaryColor : colors.primaryColor}
            />
          </TouchableOpacity>
        </Animatable.View>
        <View style={styles.cntnrTextInfos}>
          <Text style={styles.textInfosTitle}>{barbershop.name}</Text>
          <Text style={styles.textInfos}>
            {`${barbershop.address.street}, ${barbershop.address.number} -  ${barbershop.address.city}`}
          </Text>
          <Text style={styles.textInfos}>
            Horário de Atendimento: 09:00 - 21:30
          </Text>
        </View>
      </View>
      <View style={styles.cntnrRatings}>
        <View style={styles.cntnrRating}>
          <Text style={styles.textRating}>Sua avaliação para Loja</Text>
          <Rating
            type="custom"
            ratingCount={5}
            startingValue={ratingUser.rating}
            showRating={false}
            imageSize={20}
            onFinishRating={value => handleRating(value)}
            ratingBackgroundColor={colors.secondaryColor}
            ratingColor="#992929"
            tintColor="#191d21"
          />
        </View>
        <View style={styles.cntnrRating}>
          <Text style={styles.textRating}>Avaliação da Loja</Text>
          <Rating
            type="custom"
            ratingCount={5}
            startingValue={barbershop.rating.rating}
            showRating={false}
            imageSize={20}
            ratingBackgroundColor={colors.secondaryColor}
            ratingColor="#992929"
            readonly={true}
            tintColor="#191d21"
          />
        </View>
      </View>
      <View style={styles.cntnrAppointments}>
        <View style={styles.cntnrTitleAppointments}>
          <View style={styles.cntnrLineTitle} />
          <Text style={styles.titleAppointments}>Agendamentos</Text>
          <View style={styles.cntnrLineTitle} />
        </View>
        <View style={styles.cntnrTextAppointments}>
          <Text style={styles.textAppointments}>
            Selecione as opções abaixo para realizar um
          </Text>
          <Text style={styles.textAppointments}>agendamento</Text>
        </View>
        <View style={styles.cntnrActionsButtonsAppointments}>
          <View style={styles.cntnrButtonBarber}>
            <Text style={styles.titleButtons}>Barbeiro</Text>
            <TouchableOpacity
              style={styles.buttonBarber}
              onPress={() => setBarberIsVisible(true)}>
              <Text style={styles.textButtons}>{barberSelected.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cntnrButtonDay}>
            <Text style={styles.titleButtons}>Dia</Text>
            <TouchableOpacity
              disabled={barberSelected.name ? false : true}
              style={[
                styles.buttonDay,
                !barberSelected.name && styles.buttonNull,
              ]}
              onPress={() => setDayIsVisible(true)}>
              <Text style={styles.textButtons}>{daySelected?.dateString}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cntnrButtonHour}>
            <Text style={styles.titleButtons}>Horário</Text>
            <TouchableOpacity
              disabled={daySelected?.dateString ? false : true}
              style={[
                styles.buttonHour,
                !daySelected?.dateString && styles.buttonNull,
              ]}
              onPress={() => setHourIsVisible(true)}>
              <Text style={styles.textButtons}>{hourSelected.time}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.cntnrConfirmButton}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.textConfirmButton}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={barberIsVisible}
        animationIn="pulse"
        animationOut="fadeOut">
        <ModalBarber
          setBarberIsVisible={setBarberIsVisible}
          barbers={barbers}
          setBarberSelectedFunc={{ setBarberSelected, barberSelected }}
        />
      </Modal>
      <Modal
        isVisible={dayIsVisible}
        animationIn="pulse"
        animationOut="fadeOut">
        <ModalCalendar
          setDayIsVisible={setDayIsVisible}
          setDaySelectedFunc={{ setDaySelected, daySelected }}
        />
      </Modal>
      <Modal
        isVisible={hourIsVisible}
        animationIn="pulse"
        useNativeDriver={true}>
        <ModalHour
          setHourIsVisible={setHourIsVisible}
          setHourSelectedFunc={{ hourSelected, setHourSelected, schedule }}
          barberSelected={barberSelected}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cntnrImage: {
    height: '30%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  cntnrInfo: {
    flex: 1,
    maxHeight: 90,
    width: '100%',
    //backgroundColor: 'blue',
  },
  cntnrFav: {
    height: 56,
    width: 56,
    backgroundColor: colors.secondaryColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: -28,
    elevation: 5,
  },
  cntnrFavTrue: {
    backgroundColor: '#992929',
  },
  cntnrTextInfos: {
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfosTitle: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
  },
  textInfos: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
    marginBottom: 8,
  },
  cntnrRatings: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cntnrRating: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textRating: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 10,
    color: colors.secondaryColor,
  },
  cntnrAppointments: {
    height: 180,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
    //backgroundColor: 'blue',
  },
  cntnrTitleAppointments: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cntnrLineTitle: {
    backgroundColor: colors.secondaryColor,
    height: 1,
    width: 90,
  },
  titleAppointments: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
  },
  cntnrTextAppointments: {
    height: 80,
    width: '100%',
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAppointments: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    marginHorizontal: 10,
    color: colors.secondaryColor,
  },
  cntnrActionsButtonsAppointments: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cntnrButtonBarber: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBarber: {
    height: 50,
    width: 90,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cntnrButtonDay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDay: {
    height: 50,
    width: 110,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNull: {
    borderColor: '#333',
  },
  cntnrButtonHour: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHour: {
    height: 50,
    width: 90,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleButtons: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 10,
    marginBottom: 10,
    color: colors.secondaryColor,
  },
  textButtons: {
    fontFamily: 'Anton-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  cntnrConfirmButton: {
    height: 60,
    width: '100%',
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
  },
  confirmButton: {
    flex: 1,
    maxHeight: 60,
    borderRadius: 30,
    backgroundColor: colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConfirmButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.primaryColor,
  },
});
export default DetailScreen;
