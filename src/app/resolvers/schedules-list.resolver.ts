import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ScheduleService} from '../services/schedule/schedule.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesListResolver implements Resolve<any> {

  constructor(private scheduleService: ScheduleService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.scheduleService.getSchedules();
  }
}
