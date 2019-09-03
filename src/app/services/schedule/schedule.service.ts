import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Schedule} from '../../models/schedule';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  static API = 'schedules';

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.cache().get<Schedule[]>(ScheduleService.API);
  }

  storeSchedule(schedule: Schedule): Observable<Schedule> {
    if (!schedule.description) {
      delete schedule.description;
    }
    return this.http.post<Schedule>(ScheduleService.API, schedule);
  }

  openSession(scheduleId: number, time: number = 60) {
    console.log({ time });
    return this.http.put<Schedule>(`${ScheduleService.API}/${scheduleId}/openSession`, {
      time
    });
  }

  vote(scheduleId: number, option: 'Y'|'N', name: string, document: string) {
    return this.http.put<Schedule>(`${ScheduleService.API}/${scheduleId}/vote`, {
      option, associate: { name, document }
    });
  }
}
