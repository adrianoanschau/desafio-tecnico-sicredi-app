import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Schedule} from '../models/schedule';
import {ScheduleService} from '../services/schedule/schedule.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss'],
})
export class SchedulesListComponent implements OnInit {

  schedules: Schedule[] = this.route.snapshot.data.schedules;
  current = 0;
  carouselLeftOffset = 45;
  setSessionTime: boolean[] = [];
  voteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.router.events.subscribe(data => {
      console.log('events', { data });
    });
    this.createVoteForm();
  }

  updateCarouselOffset() {
    this.carouselLeftOffset = 45 + (90 * this.current);
  }

  next() {
    if (this.current < this.schedules.length - 1) {
      this.current += 1;
      this.updateCarouselOffset();
    }
  }

  prev() {
    if (this.current > 0) {
      this.current -= 1;
      this.updateCarouselOffset();
    }
  }

  openSession(scheduleId: number, time: any = 60) {
    this.setSessionTime[scheduleId] = false;
    this.scheduleService.openSession(scheduleId, parseInt(time, 10))
      .subscribe(data => {
          this.updateSchedule(data);
        });
  }

  private updateSchedule(schedule: Schedule) {
    this.schedules = this.schedules.map(sc => {
      if (sc.id === schedule.id) {
        return schedule;
      }
      return sc;
    });
  }

  private createVoteForm() {
    this.voteForm = this.formBuilder.group({
      name: [null, Validators.required],
      document: [null, [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/g)]],
    });
  }

  voteYes(id: number) {
    console.log(this.voteForm.value);
    this.scheduleService.vote(id, 'Y', name, document)
      .subscribe(data => {
        console.log({data});
      });
  }

  voteNo(id: number) {
    this.scheduleService.vote(id, 'N', name, document)
      .subscribe(data => {
        console.log({data});
      });
  }
}
