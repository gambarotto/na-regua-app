import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { IAppointment } from '../../contexts/types-custumer';
import { colors } from '../../utils/styles';

const ScheduleCardBarber: React.FC<{ item: IAppointment }> = ({ item }) => {
  const { user } = useAuth();

  async function handleCancel() {
    try {
      const response = await api.delete(
        `/appointments/${item.id}/custumers/${user?.id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function parseDate() {
    const dateParsed = new Date(item.date);
    if (isBefore(dateParsed, new Date())) {
      return format(dateParsed, "'Foi' dd'/'MM - hh:mm BB'", {
        locale: pt,
      });
    }
    return format(dateParsed, "'Dia' dd '-' hh:mm BB'", { locale: pt });
  }

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.imageBackgroung}
      source={{ uri: item.store.image.url }}>
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
        style={styles.containerInfos}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={{ uri: item.employee.avatar.url }}
          />
        </View>
        <View style={styles.infosContainer}>
          <Text style={styles.title}>{item.store.name}</Text>
          <Text style={styles.agendamento}>Agendamento:</Text>
          <Text style={styles.schedule}>{`${parseDate()}, com ${
            item.employee.name
          }`}</Text>
        </View>
        <TouchableOpacity style={styles.buttom} onPress={handleCancel}>
          <Icon name="cancel" size={25} color={colors.secondaryColor} />
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '98%',
    borderRadius: 8,
    elevation: 5,
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 8,
  },
  imageBackgroung: {
    flex: 1,
    borderRadius: 8,
  },
  containerInfos: {
    height: 100,
    width: '98%',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  infosContainer: {
    marginLeft: 20,
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    color: colors.secondaryColor,
  },
  agendamento: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    color: colors.secondaryColor,
  },
  schedule: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  buttom: {
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 2,
  },
  textButtom: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 18,
    color: colors.secondaryColor,
  },
});

export default ScheduleCardBarber;
