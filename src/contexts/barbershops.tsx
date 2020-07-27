import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { IAppData, IBarbershop } from './types-barbershop';

const AppContext = createContext<IAppData>({} as IAppData);

export const AppProvider: React.FC = ({ children }) => {
  const [barbershop, setBarbershop] = useState<IBarbershop>({} as IBarbershop);

  useEffect(() => {
    async function loadBarbers() {
      try {
        const response = await api.get('/stores');
        setBarbershop(response.data[0]);
        console.log(JSON.stringify(response.data[0]));
      } catch (error) {
        console.log(
          'Error on loadBarbers :: AppContext(barbershops.tsx) => ',
          error
        );
      }
    }
    loadBarbers();
  }, []);

  return (
    <AppContext.Provider value={{ barbershop }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
