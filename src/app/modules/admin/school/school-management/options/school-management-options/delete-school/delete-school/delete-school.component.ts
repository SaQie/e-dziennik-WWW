import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SchoolSummary } from '../../../../model/SchoolSummary';
import { SchoolManagementService } from '../../../../school-management.service';
import { SchoolManagementSelectionService } from '../../../../school-management-selection.service';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessOperationComponent } from 'src/app/common/success/success-operation/success-operation.component';


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
    private dialogRef: MatDialogRef<DeleteSchoolComponent>,
    private errorDialog: MatDialog,
    private snackBar: MatSnackBar) {
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
        this.snackBar.openFromComponent(SuccessOperationComponent, {
          duration: 5000
        });
      },
      error: (error: any) => {
        console.log(error);
        this.dialogRef.close(true);
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
