import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface IUser {
  id: number;
  name: string;
  email: string;
}
interface IAuthContextData {
  signed: boolean;
  user: IUser;
  signIn(data: ILogin): Promise<void>;
  signOut(): void;
  loading: boolean;
}
interface ILogin {
  email: string;
  password: string;
}
const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(true);

  async function signIn(data: ILogin) {
    try {
      const response = await api.post('/sessions', {
        email: data.email,
        password: data.password,
      });
      setUser(response.data.user);
      await AsyncStorage.setItem('@RNUser', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('@RNToken', response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const asyncUser = await AsyncStorage.getItem('@RNUser');
        const asyncToken = await AsyncStorage.getItem('@RNToken');
        if (asyncUser && asyncToken) {
          setUser(JSON.parse(asyncUser));
          api.defaults.headers.Authorization = `Bearer ${asyncToken}`;
        }
        setLoading(false);
      } catch (error) {
        console.log(
          'Error on loadUserData :: AuthContext(auth.tsx) => ',
          error
        );
      }
    }
    loadUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
