import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SchoolManagementService } from '../../../../school-management.service';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SchoolLevel } from '../../../../model/SchoolLevel';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateSchoolRequest } from '../../../../model/CreateSchoolRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessOperationComponent } from 'src/app/common/success/success-operation/success-operation.component';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss']
})
export class CreateSchoolComponent implements AfterViewInit {

  schoolLevels!: SchoolLevel[];
  createSchoolForm: FormGroup;

  constructor(
    private schoolManagementService: SchoolManagementService,
    private errorDialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {

    this.createSchoolForm = formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      nip: ['', Validators.required],
      regon: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      schoolLevelId: ['', Validators.required]
    })

  }
  ngAfterViewInit(): void {
    this.schoolManagementService.getSchoolLevels().subscribe({
      next: (response) => {
        this.schoolLevels = response;
      },
      error: (error) => {
        this.errorDialog.open(ErrorDialogComponent, {
          data: {
            message: 'An error occured during fetch school levels.',
            error: error
          }
        });
      }
    })
  }

  onCancelButton() {
    this.router.navigateByUrl('/admin/school-management');
  }

  onCreateButtonClick() {
    if (this.createSchoolForm.valid) {
      let request = this.mapToRequest();
      this.schoolManagementService.createSchool(request).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/school-management');
          this.snackBar.openFromComponent(SuccessOperationComponent, {
            duration: 5000
          });
        },
        error: (error: any) => {
          this.errorDialog.open(ErrorDialogComponent, {
            data: {
              message: 'An error occurred during create school.',
              error: error
            }
          });
        }
      });
    }
  }

  private mapToRequest() {
    console.log(this.createSchoolForm.value);
    const createSchoolRequest: CreateSchoolRequest = { ...this.createSchoolForm.value };
    return createSchoolRequest;
  }

}
