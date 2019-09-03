import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http/http.service';
import {ReactiveFormsModule} from '@angular/forms';
import { SchedulesListComponent } from './schedules-list/schedules-list.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TextMaskModule} from 'angular2-text-mask';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    SchedulesListComponent,
    ScheduleFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TextMaskModule
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
