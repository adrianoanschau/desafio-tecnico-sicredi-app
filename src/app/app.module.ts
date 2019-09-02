import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {ReactiveFormsModule} from '@angular/forms';
import { SchedulesListComponent } from './schedules-list/schedules-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulesListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
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
