import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { IBarber, IAvailables } from '../../../contexts/types-barber';
import { colors } from '../../../utils/styles';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface IDay {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface IHourSelected {
  setHourSelected: Dispatcher<IAvailables>;
  hourSelected: IAvailables;
  schedule: IAvailables[];
}
const ModalHour: React.FC<{
  setHourIsVisible: Dispatcher<boolean>;
  setHourSelectedFunc: IHourSelected;
  barberSelected: IBarber;
}> = ({ setHourIsVisible, setHourSelectedFunc, barberSelected }) => {
  const [hour, setHour] = useState<IAvailables>(
    setHourSelectedFunc.hourSelected
  );

  function confirmButton() {
    setHourSelectedFunc.setHourSelected(hour);
    setHourIsVisible(false);
  }
  // eslint-disable-next-line no-shadow
  function item(schedule: IAvailables) {
    return (
      <TouchableOpacity
        key={schedule.time}
        disabled={schedule.available ? false : true}
        style={[
          styles.cntnrItem,
          schedule.time === hour.time && styles.cntnrItemSelected,
          !schedule.available && styles.cntnrItemBusy,
        ]}
        onPress={() => setHour(schedule)}>
        <Text
          style={[styles.textItem, !schedule.available && styles.textItemBusy]}>
          {schedule.time}
        </Text>
      </TouchableOpacity>
    );
  }
  function Hours() {
    const arr = [];
    if (setHourSelectedFunc.schedule.length > 0) {
      for (let i = 0; i < setHourSelectedFunc.schedule.length; i++) {
        arr.push(item(setHourSelectedFunc.schedule[i]));
      }
    }
    return arr;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários Disponíveis</Text>
      <Text style={styles.description}>Selecione o horário desejado</Text>
      {setHourSelectedFunc.schedule.length <= 0 ? (
        <Text
          style={
            styles.textItemDayOff
          }>{`${barberSelected.name} estará de folga nesse dia`}</Text>
      ) : (
        <View style={styles.cntnerHours}>{Hours()}</View>
      )}
      <View style={styles.cntnrButtons}>
        <TouchableOpacity
          onPress={() => setHourIsVisible(false)}
          style={styles.cntnrButtonBack}>
          <Text style={styles.textButtonBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => confirmButton()}
          style={styles.cntnrButton}>
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.secondaryColor,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Comfortaa-Regular',
    color: colors.secondaryColor,
    fontSize: 12,
    marginBottom: 5,
  },
  cntnerHours: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cntnrItem: {
    height: 50,
    width: 50,
    backgroundColor: colors.secondaryColor,
    borderRadius: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cntnrItemSelected: {
    backgroundColor: colors.orange,
  },
  cntnrItemBusy: {
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderColor: '#333',
  },
  textItemBusy: {
    color: '#333',
  },
  textItem: {
    fontFamily: 'Anton-Regular',
    fontSize: 16,
    color: colors.primaryColor,
  },
  textItemDayOff: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    color: colors.secondaryColor,
  },
  cntnrButtons: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  cntnrButtonBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonBack: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    color: colors.secondaryColor,
  },
  cntnrButton: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  textButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 16,
    color: colors.primaryColor,
  },
});
export default ModalHour;
