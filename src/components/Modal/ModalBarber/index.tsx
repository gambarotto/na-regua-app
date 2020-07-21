import React, { Dispatch, SetStateAction } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../utils/styles';
import { IBarber } from '../../../contexts/types-barber';
type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IBarberSelected {
  setBarberSelected: Dispatcher<IBarber>;
  barberSelected: IBarber;
}

const ModalBarber: React.FC<{
  setBarberIsVisible: Dispatcher<boolean>;
  barbers: IBarber[];
  setBarberSelectedFunc: IBarberSelected;
}> = ({ setBarberIsVisible, barbers, setBarberSelectedFunc }) => {
  function barberFunc(item: IBarber) {
    setBarberSelectedFunc.setBarberSelected({
      ...item,
    });
    setBarberIsVisible(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barbeiro</Text>
      <FlatList
        data={barbers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cntnrItem}
            activeOpacity={0.6}
            onPress={() => barberFunc(item)}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: item.avatar.url }} />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textItem}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatlist}
      />
      <TouchableOpacity
        style={styles.cntnrButton}
        onPress={() => setBarberIsVisible(false)}>
        <Text style={styles.textButton}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.primaryColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
    marginBottom: 10,
  },
  flatlist: {
    height: '50%',
    width: '100%',
  },
  cntnrItem: {
    height: 70,
    width: '80%',
    paddingHorizontal: 10,
    margin: 2,
    borderRadius: 25,
    //dborderWidth: 2,
    borderColor: colors.secondaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    borderColor: colors.secondaryColor,
    borderRadius: 35,
    borderWidth: 3,
    zIndex: 1,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 35,
    borderWidth: 2,
    zIndex: 1,
  },
  containerText: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
    borderWidth: 2,
    backgroundColor: colors.secondaryColor,
    //borderColor: colors.secondaryColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.primaryColor,
  },
  cntnrButton: {
    height: 60,
    width: '100%',
    backgroundColor: colors.secondaryColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.primaryColor,
  },
});
export default ModalBarber;
