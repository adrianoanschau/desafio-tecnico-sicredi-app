import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Schedule} from '../../models/Schedule';
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
    return this.http.post<Schedule>(ScheduleService.API, schedule);
  }
}
