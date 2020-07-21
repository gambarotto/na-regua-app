import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  StyleSheet,
} from 'react-native';

import ScheduleCardBarber from '../../components/ScheduleCardBarber';
import { useCustumer } from '../../contexts/custumer';
import { IAppointment } from '../../contexts/types-custumer';

import { colors } from '../../utils/styles';

interface IData {
  title: string;
  data: IAppointment[];
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.containerHeaderSection}>
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  );
};

const SchedulesScreen: React.FC = () => {
  const { appointments } = useCustumer();
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const marked = appointments.filter(
      appointment => appointment.past === false
    );
    const past = appointments.filter(appointment => appointment.past === true);
    setData([
      {
        title: 'Agendamentos',
        data: marked,
      },
      {
        title: 'Histórico',
        data: past,
      },
    ]);
  }, [appointments]);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ScheduleCardBarber item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColorRgba,
    paddingTop: 30,
  },
  containerHeaderSection: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    elevation: 5,
    marginBottom: 10,
  },
  textHeader: {
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    color: colors.secondaryColor,
  },
});

export default SchedulesScreen;
