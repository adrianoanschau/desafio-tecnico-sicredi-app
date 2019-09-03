import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../models/schedule';
import {ScheduleService} from '../services/schedule/schedule.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
  animations: [
    trigger('formState', [
      state('closed', style({
        transform: 'scale(0)',
        maxHeight: '0',
      })),
      state('opened', style({
        transform: 'scale(1)',
        maxHeight: '400px',
      })),
      transition('closed => opened', animate('300ms ease-in')),
      transition('opened => closed', animate('300ms ease-out')),
    ]),
  ],
})
export class ScheduleFormComponent implements OnInit {

  @Input()
  showForm = true;
  formGroup: FormGroup;

  constructor(
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm(new Schedule());

  }

  get f() {
    return this.formGroup.controls;
  }

  get formState() {
    if (this.showForm) {
      return 'opened';
    }
    return 'closed';
  }

  private createForm(schedule: Schedule) {
    this.formGroup = this.formBuilder.group({
      title: [schedule.title, Validators.required],
      description: [schedule.description],
    });
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    await this.scheduleService.storeSchedule(this.formGroup.value).toPromise();
    window.location.reload();
  }
}
