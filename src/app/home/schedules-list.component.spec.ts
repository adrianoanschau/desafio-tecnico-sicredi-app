import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesListComponent } from './schedules-list.component';
import {AppComponent} from '../app.component';

describe('SchedulesListComponent', () => {
  let component: SchedulesListComponent;
  let fixture: ComponentFixture<SchedulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title form in a p tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.title').textContent).toEqual('Cadastre a primeira Pauta');
  });
});
