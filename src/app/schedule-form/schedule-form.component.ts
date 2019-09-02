import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  @Input()
  showForm = true;

  constructor() { }

  ngOnInit() {
  }

}
