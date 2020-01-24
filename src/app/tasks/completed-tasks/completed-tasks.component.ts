import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TasksService} from '../services/tasks.service';
import {ITask} from '../interfaces/ITask';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit, OnDestroy {
  sub: Subscription;
  completedTasks: ITask[];
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.showCompletedTasks();
  }
  showCompletedTasks() {
    this.sub = this.taskService.showCompletedTasks()
      .subscribe(result => {
        this.completedTasks = result;
        console.log(this.completedTasks);
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
