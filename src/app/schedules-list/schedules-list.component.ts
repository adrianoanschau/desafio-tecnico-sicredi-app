import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss'],
})
export class SchedulesListComponent implements OnInit {

  schedules: any[] = this.route.snapshot.data.schedules;
  current = 0;
  carouselLeftOffset = 45;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events.subscribe(data => {
      console.log('events', { data });
    });
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
}
