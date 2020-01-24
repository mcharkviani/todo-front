import {Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public dialogTitle: string;
  public inputValue: string;
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit() {
  }


}
