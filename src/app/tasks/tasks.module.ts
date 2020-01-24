import { NgModule } from '@angular/core';
import {tasksRoutingComponents, TasksRoutingModule} from './tasks-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    tasksRoutingComponents,
    DialogBoxComponent,
    EditDialogComponent,
  ],
  imports: [
    TasksRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class TasksModule { }
