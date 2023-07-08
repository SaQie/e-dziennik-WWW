import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolSummary } from '../../../../model/SchoolSummary';
import { SchoolManagementService } from '../../../../school-management.service';
import { SchoolManagementSelectionService } from '../../../../school-management-selection.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';


@Component({
  selector: 'app-delete-school',
  templateUrl: './delete-school.component.html',
  styleUrls: ['./delete-school.component.scss']
})
export class DeleteSchoolComponent {


  readonly selectedItem: SchoolSummary;
  deletingInProgress = false;

  constructor(
    private schoolManagementService: SchoolManagementService,
    private schoolManagementSelectionService: SchoolManagementSelectionService,
    @Inject(MAT_DIALOG_DATA) private dialogData: SchoolSummary,
    private dialogRef: DialogRef,
    private errorDialog: Dialog) {

    this.selectedItem = this.dialogData;
  }


  onConfirmButton() {
    this.deletingInProgress = true;

    this.schoolManagementService.deleteSchool(this.selectedItem.schoolId).subscribe({
      next: () => {
        this.deletingInProgress = false;
        this.schoolManagementSelectionService.clearSelection();
        this.schoolManagementSelectionService.refreshView();
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.log(error);
        this.dialogRef.close();
        this.errorDialog.open(ErrorDialogComponent, {
          data: {
            message: 'An error occured during delete schools.',
            error: error
          }
        });
        this.deletingInProgress = false;
      }
    });

  }
}
