import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks.component';
import {CompletedTasksComponent} from './completed-tasks/completed-tasks.component';

const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'completed', component: CompletedTasksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
export const tasksRoutingComponents = [
  TasksComponent,
  CompletedTasksComponent
];
