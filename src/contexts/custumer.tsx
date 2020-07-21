import React, { createContext, useState, useEffect, useContext } from 'react';
import { IAppointment, IFavorites, ICoupons } from './types-custumer';
import { useAuth } from './auth';
import api from '../services/api';

interface IUser {
  id: number;
  name: string;
  email: string;
}
interface ICustumerData {
  favorites: IFavorites[];
  coupons: ICoupons[];
  appointments: IAppointment[];
  setAppointments: (appointments: IAppointment[]) => void;
  setFavorites: (favorites: IFavorites[]) => void;
  setCoupons: (coupons: ICoupons[]) => void;
}
interface ILogin {
  email: string;
  password: string;
}
const CustumerContext = createContext<ICustumerData>({} as ICustumerData);

export const CustumerProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<IFavorites[]>([]);
  const [coupons, setCoupons] = useState<ICoupons[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    async function loadFavoritiesData() {
      if (user) {
        const response = await api.get(`/favorites/custumers/${user.id}`);
        if (response) {
          setFavorities(response.data);
        }
      }
    }
    loadFavoritiesData();
  }, [user]);
  useEffect(() => {
    async function loadCouponsData() {
      if (user) {
        const response = await api.get(`/coupons/custumers/${user.id}`);
        if (response) {
          setCoupons(response.data);
        }
      }
    }
    loadCouponsData();
  }, [user]);
  useEffect(() => {
    async function loadAppointmentsData() {
      if (user) {
        const response = await api.get(`/appointments/custumers/${user.id}`);
        setAppointments(response.data);
      }
    }
    loadAppointmentsData();
  }, [user]);
  return (
    <CustumerContext.Provider
      value={{
        favorites,
        coupons,
        appointments,
        setAppointments,
        setCoupons,
        setFavorites,
      }}>
      {children}
    </CustumerContext.Provider>
  );
};

export function useCustumer() {
  const context = useContext(CustumerContext);

  return context;
}
