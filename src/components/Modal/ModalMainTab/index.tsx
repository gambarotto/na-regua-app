import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IBarbershop } from '../../../contexts/types-barbershop';
import { colors } from '../../../utils/styles';
import api from '../../../services/api';
import { IBarber } from '../../../types/barbers';

interface IAvatar {
  id: number;
  avatarUrl(url: string): void;
  name: string;
}

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

const ModalMainTab: React.FC<{
  setIsVisible: Dispatcher<boolean>;
  barbershop: IBarbershop;
}> = ({ setIsVisible, barbershop }) => {
  const [barbers, setBarbers] = useState<IBarber[]>();
  const navigation = useNavigation();

  useEffect(() => {
    async function loadBarbers() {
      const response = await api.get(`/stores/${barbershop.id}/employees`);
      if (response) {
        setBarbers(response.data);
      }
    }
    loadBarbers();
  }, [barbershop.id]);

  function closeModal() {
    setIsVisible(false);
  }
  function goToDetail() {
    setIsVisible(false);
    navigation.navigate('Detail', { data: { barbershop, barbers } });
  }
  return (
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
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.containerItemService}>
              <Text style={styles.textService}>{item.name}</Text>
              <Text style={styles.textServicePrice}>
                {item.price ? `R$ ${item.price}` : '-'}
              </Text>
            </View>
          )}
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
            <View style={styles.containerItemBarber}>
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
            </View>
          )}
          style={styles.flatlistBarbers}
        />
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={closeModal} style={styles.buttonBack}>
          <Text style={styles.textButtonBack} onPress={closeModal}>
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToDetail} style={styles.buttonSee}>
          <Text style={styles.textButtonSee}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
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
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistServices: {
    height: 130,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
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
});
export default ModalMainTab;
