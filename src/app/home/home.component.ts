import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  schedules: any[] = this.route.snapshot.data.schedules;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log({ s: this.schedules });
  }

}
