import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ITask} from './interfaces/ITask';
import {TasksService} from './services/tasks.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  sub: Subscription;
  subAdd: Subscription;
  subEdit: Subscription;
  subDelete: Subscription;
  tasks: ITask[];
  title = '' ;
  errorMessage = '';
  dialogRef: MatDialogRef<DialogBoxComponent>;
  editDialogRef: MatDialogRef<EditDialogComponent>
  constructor(private service: TasksService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.sub = this.service.getTasks()
      .subscribe(result => {
          this.tasks = result;
          console.log(`result - ${this.tasks}`);
        },
        error => {
          this.errorMessage = error;
          console.log(`Error - ${error}`);
          if (error instanceof HttpErrorResponse) {
            this.router.navigate(['/auth/login']);
          }
    });
  }
  addTask(title: string) {
    console.log(title);
    const newTask = {
      title: this.title
    };
    this.subAdd = this.service.addTask(newTask)
      .subscribe(result => {
        console.log(`${result} added successfully`);
          this.getTasks();
    },
        error => {
          this.errorMessage = error;
          console.log(`Error - ${error}`);
    });
  }

  deleteDialog(id) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.title = 'Delete Task';
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.subDelete = this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteTask(id).subscribe((data) => {
          console.log(`Task with the id - ${id} deleted successfully`);
          this.getTasks();
        },
          error => {
            this.errorMessage = error;
            console.log(`Error - ${error}`);
          }
        );
      }
      this.dialogRef = null;
    });
  }

  editDialog(id: any, task: any) {
    this.editDialogRef = this.dialog.open(EditDialogComponent, {
      disableClose: false
    });
    this.editDialogRef.componentInstance.dialogTitle = 'Edit Task';
    this.editDialogRef.componentInstance.inputValue = task.title;
    this.subEdit = this.editDialogRef.afterClosed().subscribe(result => {
      const newTitle = {title: this.editDialogRef.componentInstance.inputValue};
      if (result) {
        this.service.updateTask(id, newTitle).subscribe((data) => {
            console.log(result);
            console.log(newTitle);
            console.log(`Task updated successfully`);
            this.getTasks();
          },
          error => {
            this.errorMessage = error;
            console.log(`Error - ${error}`);
          }
        );
      }
      this.editDialogRef = null;
    });
  }
  completeTask(id: any, task: any) {
    task.isCompleted = true;
    this.subEdit = this.service.updateTask(id, task)
      .subscribe(result => {
        console.log(result);
        this.getTasks();
      },
      error => {
        this.errorMessage = error;
        console.log(`Error - ${error}`);
      }
    );
  }

  toggle($event) {
    console.log($event.checked);
    const isChecked = $event.checked;
    if (isChecked) {
      this.router.navigate(['tasks/completed']);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subAdd) {
      this.subAdd.unsubscribe();
    }
    if (this.subEdit) {
      this.subEdit.unsubscribe();
    }
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }

}
