export interface IDayWeek {
  dayOfWeek: number;
  dayOff: boolean;
  schedule: {
    entrance: string[];
    exit: string[];
    lunch: string[];
  };
  scheduleParsed: string[];
}
export interface IBarbershop {
  id: number;
  name: string;
  email: string;
  tel: string;
  facebook_url: string;
  instagram_url: string;
  address: {
    street: string;
    number: string;
    complement: string;
    state: string;
    city: string;
    zipcode: string;
  };
  schedule: {
    holiday: string[];
    special: string[];
    days_week: IDayWeek[];
  };
  image: {
    id: number;
    url: string;
  };
  services: IService[];
  rating: {
    qty: number;
    rating: number;
  };
}
export interface IService {
  id: number;
  name: string;
  price: string;
}
export interface IAppData {
  barbershop: IBarbershop[];
}
