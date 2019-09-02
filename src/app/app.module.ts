import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AssociatesListResolver} from './resolvers/associates-list.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    AssociatesListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
