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
