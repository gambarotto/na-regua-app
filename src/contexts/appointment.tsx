import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { eachDayOfInterval, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../services/api';
import { IBarber, IAvailables, IDaysAvailables } from './types-barber';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface IAppointment {
  timestamp: number;
  date: Date;
  employee_id: number;
  custumer_id: number;
}

interface IAppointmentDataContext {
  daysAvailables: IDaysAvailables[];
  daySelected: IDaysAvailables;
  barberSelected: IBarber;
  schedule: IAvailables[];
  hourSelected: IAvailables;
  setDaysAvailables: Dispatcher<IDaysAvailables[]>;
  setDaySelected: Dispatcher<IDaysAvailables>;
  setBarberSelected: Dispatcher<IBarber>;
  setSchedule: Dispatcher<IAvailables[]>;
  setHourSelected: Dispatcher<IAvailables>;
}

const AppointmentContext = createContext<IAppointmentDataContext>(
  {} as IAppointmentDataContext
);

export const AppointmentProvider: React.FC = ({ children }) => {
  const [daysAvailables, setDaysAvailables] = useState<IDaysAvailables[]>([]);
  const [daySelected, setDaySelected] = useState<IDaysAvailables>(
    {} as IDaysAvailables
  );
  const [barberSelected, setBarberSelected] = useState<IBarber>({} as IBarber);
  const [schedule, setSchedule] = useState<IAvailables[]>([]);
  const [hourSelected, setHourSelected] = useState<IAvailables>(
    {} as IAvailables
  );
  const loadScheduleBarber = useCallback(async () => {
    if (!barberSelected.id) {
      console.log(barberSelected.id, daySelected.timestamp);

      return console.log('oi');
    }

    try {
      const { timestamp } = daySelected;
      const response = await api.get(
        `/employees/${barberSelected.id}/availables?date=${timestamp}`
      );
      if (response) {
        setSchedule(response.data);
        //console.log(JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(
        'Error on loadScheduleBarber :: AppointmentContext(appointment.tsx) => ',
        error
      );
    }
  }, [daySelected, barberSelected.id]);
  useEffect(() => {
    loadScheduleBarber();
  }, [loadScheduleBarber]);

  useEffect(() => {
    if (daysAvailables.length === 0) {
      const days = eachDayOfInterval({
        start: new Date(),
        end: addDays(new Date(), 14),
      });

      const arrDate = days.map(day => {
        const dayNameWeek = format(day, 'EEE', { locale: pt });
        const dayNumber = format(day, 'dd');
        const month = format(day, 'L', { locale: pt });
        return {
          dayNameWeek,
          dayNumber,
          month,
          timestamp: new Date(
            `${month}/${dayNumber}/${new Date().getFullYear()}`
          ).getTime(),
        };
      });
      setDaysAvailables(arrDate);
    }
  }, [daysAvailables]);

  return (
    <AppointmentContext.Provider
      value={{
        barberSelected,
        daySelected,
        daysAvailables,
        schedule,
        hourSelected,
        setBarberSelected,
        setDaySelected,
        setDaysAvailables,
        setHourSelected,
        setSchedule,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
