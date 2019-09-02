import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchedulesListResolver} from './resolvers/schedules-list.resolver';
import {SchedulesListComponent} from './schedules-list/schedules-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesListComponent,
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
