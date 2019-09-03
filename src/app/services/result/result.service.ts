import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ResultType {
  is_open: boolean;
  total: number;
  Y: number;
  N: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  static API = 'votes/result';

  constructor(private http: HttpClient) { }

  getResult(scheduleId: number): Observable<ResultType> {
    return this.http.get<ResultType>(`${ResultService.API}?schedule_id=${scheduleId}`);
  }
}
