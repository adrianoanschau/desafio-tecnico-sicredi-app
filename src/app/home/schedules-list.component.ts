import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss']
})
export class SchedulesListComponent implements OnInit {

  schedules: any[] = this.route.snapshot.data.schedules;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log({ s: this.schedules });
  }

}
