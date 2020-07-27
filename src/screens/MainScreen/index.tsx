import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import AppContext from '../../contexts/barbershops';
import AppointmentContext from '../../contexts/appointment';

import {
  IBarber,
  IDaysAvailables,
  IAvailables,
} from '../../contexts/types-barber';

import { colors } from '../../utils/styles';
import CardService from './CardService';
import ScheduleBottomModal from './ScheduleBottomModal';

const MainScreen: React.FC = () => {
  const { barbershop } = useContext(AppContext);
  const { setBarberSelected, setDaySelected, setHourSelected } = useContext(
    AppointmentContext
  );

  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function loadBarbers() {
      try {
        const response = await api.get(`/stores/${barbershop.id}/employees`);
        if (response) {
          setBarbers(response.data);
        }
      } catch (error) {
        console.log('Error MainScreen :: loadBarbers => ', error);
      }
    }

    if (barbers?.length === 0) {
      loadBarbers();
    }
  }, [barbers, barbershop.id]);

  function goToDetail() {
    setIsVisible(true);
  }
  function handleSelectBarber(item: IBarber) {
    setBarberSelected(item);
    setIsVisible(true);
  }
  function handleCloseModal() {
    setIsVisible(false);
    setHourSelected({} as IAvailables);
    setDaySelected({} as IDaysAvailables);
  }

  return (
    <>
      {barbershop.id ? (
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              style={styles.imageBarbershop}
              source={{ uri: barbershop.image.url }}
            />
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.title}>{barbershop.name}</Text>
            <Text style={styles.textInfo}>
              {`${barbershop.address.street}, ${barbershop.address.number} -  ${barbershop.address.city}`}
            </Text>
            <Text style={styles.textInfo}>{`${barbershop.tel}`}</Text>
            <Text style={styles.textAtendimento}>
              Horário de atendimento: 09:00 - 20:00
            </Text>
          </View>
          <View style={styles.containerServices}>
            <Text style={styles.titleFeatures}>Serviços</Text>
            <FlatList
              data={barbershop.services}
              horizontal={true}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <CardService item={item} />}
              style={styles.flatlistServices}
            />
          </View>
          <View style={styles.containerBarbers}>
            <Text style={styles.titleFeatures}>Barbeiros</Text>
            <FlatList
              data={barbers}
              keyExtractor={item => String(item.id)}
              horizontal={true}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.containerItemBarber}
                  onPress={() => handleSelectBarber(item)}>
                  <View style={styles.containerImageItem}>
                    <Image
                      style={styles.imageBarber}
                      source={{ uri: item.avatar.url }}
                    />
                  </View>
                  <Text
                    style={styles.textNameBarber}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.flatlistBarbers}
            />
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity onPress={goToDetail} style={styles.buttonSee}>
              <LinearGradient
                colors={[colors.firstGradientColor, colors.secondGradientColor]}
                style={styles.buttonSeeGradient}>
                <Text style={styles.textButtonSee}>Ver</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}
      <Modal
        isVisible={isVisible}
        onBackdropPress={handleCloseModal}
        useNativeDriver
        onBackButtonPress={handleCloseModal}
        deviceHeight={Dimensions.get('screen').height}
        deviceWidth={Dimensions.get('screen').width}
        style={styles.modalComponent}>
        <ScheduleBottomModal props={{ isVisible, setIsVisible }} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  containerImage: {
    height: '30%',
    width: '100%',
  },
  imageBarbershop: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  containerInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
  },
  textInfo: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  textAtendimento: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
    marginTop: 10,
  },
  containerServices: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistServices: {
    //height: 100,
    width: '100%',
  },
  containerItemService: {
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textService: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  textServicePrice: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  titleFeatures: {
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    marginBottom: 12,
    color: colors.secondaryColor,
  },
  containerBarbers: {
    height: 150,
    width: '100%',
    alignItems: 'center',
  },
  flatlistBarbers: {
    marginTop: 10,
  },
  containerItemBarber: {
    height: 100,
    width: 90,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImageItem: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  imageBarber: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  textNameBarber: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
    marginTop: 5,
  },
  containerButtons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSee: {
    flex: 1,
    elevation: 1,
    borderRadius: 50,
  },
  buttonSeeGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textButtonBack: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    color: colors.secondaryColor,
  },
  textButtonSee: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.primaryColor,
  },
  modalComponent: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
});
export default MainScreen;
