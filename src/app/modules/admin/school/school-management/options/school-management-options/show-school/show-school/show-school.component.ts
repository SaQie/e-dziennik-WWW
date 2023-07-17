import { AfterViewInit, Component } from '@angular/core';
import { SchoolSummary } from '../../../../model/SchoolSummary';
import { SchoolManagementSelectionService } from '../../../../school-management-selection.service';
import { SchoolManagementService } from '../../../../school-management.service';
import { SchoolDetails } from '../../../../model/SchoolDetails';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-school',
  templateUrl: './show-school.component.html',
  styleUrls: ['./show-school.component.scss']
})
export class ShowSchoolComponent implements AfterViewInit {

  selectedItem!: string;
  schoolDetails!: SchoolDetails;
  isDataLoading: boolean = true;

  constructor(
    private schoolManagementSelectionService: SchoolManagementSelectionService,
    private schoolManagementService: SchoolManagementService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {

    route.queryParams.subscribe(params => {
      this.selectedItem = params['id'];
    })
  }

  ngAfterViewInit(): void {
    if (this.selectedItem) {
      this.schoolManagementService.getSchool(this.selectedItem).subscribe({
        next: (schoolDetails: SchoolDetails) => {
          console.log(schoolDetails);
          this.schoolDetails = schoolDetails;
          this.isDataLoading = false;
        },
        error: (error: any) => {
          this.errorDialog.open(ErrorDialogComponent, {
            data: {
              message: 'An error occurred during loading school details.',
              error: error
            }
          });
        }
      })
    }
  }
  
  onBackButton() {
    this.router.navigateByUrl('/admin/school-management');
  }




}
