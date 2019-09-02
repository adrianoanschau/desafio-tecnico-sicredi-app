import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../models/Schedule';
import {ScheduleService} from '../services/schedule/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  async onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    await this.scheduleService.storeSchedule(this.formGroup.value).toPromise();
    window.location.reload();
  }
}
