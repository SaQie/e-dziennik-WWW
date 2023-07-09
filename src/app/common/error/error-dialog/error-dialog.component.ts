import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpError } from '../HttpError';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

  errorData: HttpError[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.errorData = this.mapToErrorData(this.data);
  }


  private mapToErrorData(data:any) : HttpError[]{
    return data.error.map((item:any) => ({
      field: item.field,
      errorCode: item.errorCode,
      message: item.message
    }));
  }

}
