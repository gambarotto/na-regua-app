import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { IAppData, IBarbershop } from './types-barbershop';

const AppContext = createContext<IAppData>({} as IAppData);

export const AppProvider: React.FC = ({ children }) => {
  const [barbershop, setBarbershop] = useState<IBarbershop[]>([]);

  useEffect(() => {
    async function loadBarbers() {
      const response = await api.get('/stores');
      setBarbershop(response.data);
    }
    loadBarbers();
  }, []);

  return (
    <AppContext.Provider value={{ barbershop }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
