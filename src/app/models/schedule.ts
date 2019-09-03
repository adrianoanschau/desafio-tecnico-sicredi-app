import {ScheduleSession} from './schedule-session';

export class Schedule {
  id?: number;
  title: string;
  description: string;
  session_opened: ScheduleSession;
}
