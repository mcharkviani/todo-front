import { NgModule } from '@angular/core';
import {
  MAT_CHECKBOX_CLICK_ACTION,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';
import {DialogBoxComponent} from '../tasks/dialog-box/dialog-box.component';
import {EditDialogComponent} from '../tasks/edit-dialog/edit-dialog.component';

const materials = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [],
  imports: [
    materials
  ],
  exports: [
    materials
  ],
  entryComponents: [
    DialogBoxComponent,
    EditDialogComponent
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class MaterialModule { }
