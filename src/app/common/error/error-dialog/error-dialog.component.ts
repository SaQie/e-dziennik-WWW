import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class ErrorDialogComponent {

  dialogData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: DialogRef) {
      console.log(data);
    this.dialogData = this.data;
  }

  onOkButtonClick(){
    console.log(this.dialogData);
    this.dialogRef.close();
  }




}
