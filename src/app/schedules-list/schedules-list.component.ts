import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss']
})
export class SchedulesListComponent implements OnInit {

  schedules: any[] = this.route.snapshot.data.schedules;

  current = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  calcLeft(i: number) {
    if (i === this.current) {
      return 118;
    }
    const offset = i - this.current - 1;
    if (i > this.current) {
      return 118 - (offset * 250) - 310;
    }
    return 118 - (offset * 250) - 190;
  }

  next() {
    if (this.current < this.schedules.length - 1) {
      this.current += 1;
    }
  }

  prev() {
    if (this.current > 0) {
      this.current -= 1;
    }
  }
}
