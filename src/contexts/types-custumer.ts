import { IDayWeek } from './types-barbershop';

export interface IStoreAppointment {
  id: number;
  name: string;
  image: {
    url: string;
    path: string;
    id: number;
  };
}
export interface IEmployeeAppointment {
  id: number;
  name: string;
  avatar: {
    url: string;
    path: string;
    id: number;
  };
}
export interface IAppointment {
  past: boolean;
  cancelable: boolean;
  id: number;
  date: string;
  canceled_at: string | null;
  validated: string | null;
  employee: IEmployeeAppointment;
  store: IStoreAppointment;
}
export interface ISetAppointment {
  date: string;
  employee_id: number;
  custumer_id: number;
}

export interface IAddress {
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  zipcode: string;
}
export interface IRatingFavorite {
  id: number;
  qty: number;
  rating: number;
}
export interface IServiceFavorite {
  id: number;
  name: string;
  price: string;
}
export interface IStoreFavorite {
  id: number;
  name: string;
  email: string;
  tel: string;
  facebook_url: string;
  instagram_url: string;
  address: IAddress;
  image: {
    url: string;
    id: number;
    path: string;
  };
  services: IServiceFavorite[];
  rating: IRatingFavorite;
  schedule: {
    holiday: string[];
    special: string[];
    days_week: IDayWeek[];
  };
  employees: IEmployeeFavorite;
}
export interface IEmployeeFavorite {
  id: number | string;
  name?: string;
  email?: string;
  responsibility?: string;
  schedule_id?: number | null;
  avatar?: {
    url?: string;
    id?: number;
    path?: string;
  };
  empty?: boolean;
}
export interface IFavorites {
  id: number;
  favorite: boolean;
  store: IStoreFavorite;
  employees: IEmployeeFavorite[];
}
export interface IStoreCoupon {
  id: number;
  name: string;
  email: string;
  tel: string;
  facebook_url: string;
  instagram_url: string;
  address: IAddress;
  image: {
    url: string;
    id: number;
    path: string;
  };
  rating: IRatingFavorite;
}
export interface ICoupons {
  id: number;
  coupons: number;
  tickets: number;
  store_id: number;
  store: IStoreCoupon;
  custumer_id: number;
}
