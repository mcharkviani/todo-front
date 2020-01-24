import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  public title: string;
  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit() {
  }

}
