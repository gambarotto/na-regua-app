import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { addDays } from 'date-fns';
import { colors } from '../../../utils/styles';
import { localesPt, themeCalendar } from '../../../config/calendarsConfig';
LocaleConfig.locales.pt = localesPt;
LocaleConfig.defaultLocale = 'pt';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IDay {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
interface IDaySelected {
  setDaySelected: Dispatcher<IDay>;
  daySelected: IDay;
}

const SubTitles: React.FC<{ color: string; description: string }> = ({
  color,
  description,
}) => {
  return (
    <View style={styles.cntnrSubTitle}>
      <View style={[styles.cntnrColor, { backgroundColor: color }]} />
      <Text style={styles.textDescription}>{description}</Text>
    </View>
  );
};

const ModalCalendar: React.FC<{
  setDayIsVisible: Dispatcher<boolean>;
  setDaySelectedFunc: IDaySelected;
}> = ({ setDayIsVisible, setDaySelectedFunc }) => {
  const [dayMarked, setDayMarked] = useState<IDay>({} as IDay);
  function maxDays() {
    const time = new Date(new Date().toISOString());
    const outraData = new Date().setDate(time.getDate() + 6);
    return outraData;
  }
  function selectDay(day: IDay) {
    const dayAtt = {
      ...day,
      timestamp: new Date(addDays(day.timestamp, 1)).getTime(),
    };
    setDayMarked(dayAtt);
  }

  function confirmDate() {
    setDaySelectedFunc.setDaySelected(dayMarked);
    setDayIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={new Date()}
        minDate={new Date()}
        maxDate={maxDays()}
        onDayPress={day => selectDay(day)}
        monthFormat={'MMM/yy'}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        disableArrowLeft={false}
        theme={themeCalendar}
        markingType={'custom'}
        markedDates={{
          [dayMarked?.dateString]: {
            customStyles: {
              container: {
                backgroundColor: colors.orange,
                borderRadius: 4,
              },
              text: {
                color: colors.primaryColor,
                fontSize: 18,
                alignSelf: 'center',
              },
            },
          },
        }}
      />
      <View style={styles.cntnrSubTitles}>
        <SubTitles color={colors.secondaryColor} description="Disponível" />
        <SubTitles color={colors.blue} description="Dia Atual" />
        <SubTitles color={colors.orange} description="Dia Selecionado" />
      </View>
      <View style={styles.cntnrButtons}>
        <TouchableOpacity
          style={styles.cntnrButtonBack}
          onPress={() => setDayIsVisible(false)}>
          <Text style={styles.textButtonBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cntnrButton} onPress={confirmDate}>
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryColor,
    padding: 20,
    borderRadius: 4,
  },
  calendar: {
    //backgroundColor: colors.secondaryColor,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    padding: 5,
  },
  cntnrSubTitles: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cntnrSubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cntnrColor: {
    height: 16,
    width: 16,
    borderRadius: 8,
    marginRight: 5,
  },
  textDescription: {
    color: colors.secondaryColor,
    fontSize: 12,
  },
  cntnrButtons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  cntnrButton: {
    flex: 1,
    maxHeight: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.orange,
    borderWidth: 1,
    //marginTop: 20,
  },
  cntnrButtonBack: {
    flex: 1,
    maxHeight: 60,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 20,
    color: colors.orange,
  },
  textButtonBack: {
    fontFamily: 'Anton-Regular',
    fontSize: 16,
    color: colors.orange,
  },
});
export default ModalCalendar;
