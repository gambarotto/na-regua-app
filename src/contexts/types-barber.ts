export interface IBarber {
  id: number;
  name: string;
  email: string;
  responsibility: string;
  job_id: number;
  schedule_id: number;
  avatar: {
    id: number;
    path: string;
    url: string;
  };
}
export interface IAvailables {
  time: string;
  value: string;
  available: boolean;
}
export interface ISchedule {
  id: number;
  holiday: string[];
  special: string[];
  owner_id: number;
  owner_type: string;
  days_week: IScheduleDay[];
}

export interface IScheduleDay {
  dayOfWeek: number;
  dayOff: boolean;
  schedule: {
    entrance: string[];
    exit: string[];
    lunch: string[];
  };
  scheduleParsed: string[] | undefined;
}
