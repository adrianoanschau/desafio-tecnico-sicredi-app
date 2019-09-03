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
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-' , /\d/, /\d/];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder
  ) { }

  get f() {
    return this.voteForm.controls;
  }

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
      name: [null],
      document: [null, [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]],
    });
  }

  vote(option: 'Y'|'N', id: number) {
    if (this.voteForm.invalid) {
      return;
    }
    const { name, document } = this.voteForm.value;
    const associate: { name?: string, document: string } = { document: document.replace(/[^0-9]+/g, '') };
    if (name) {
      associate.name = name;
    }
    this.scheduleService.vote(id, option, associate)
      .subscribe(data => {
        console.log({data});
      });
  }
}
