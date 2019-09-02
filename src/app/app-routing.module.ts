import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SchedulesListResolver} from './resolvers/schedules-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
    resolve: {
      schedules: SchedulesListResolver
    }
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
