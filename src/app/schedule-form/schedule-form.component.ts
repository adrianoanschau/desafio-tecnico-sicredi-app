import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../models/Schedule';
import {ScheduleService} from '../services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
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

  private createForm(schedule: Schedule) {
    this.formGroup = this.formBuilder.group({
      title: [schedule.title, Validators.required],
      description: [schedule.description],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.scheduleService.storeSchedule(this.formGroup.value);
    this.formGroup.reset(new Schedule());
  }
}
