import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './main/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'tasks', loadChildren: './tasks/tasks.module#TasksModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  PageNotFoundComponent
];
