import { Component } from '@angular/core';
import { SchoolManagementSelectionService } from '../../school-management-selection.service';
import { SchoolManagementService } from '../../school-management.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSchoolComponent } from './delete-school/delete-school/delete-school.component';
import { CreateSchoolComponent } from './create-school/create-school/create-school.component';
import { Router } from '@angular/router';

@Component({
  selector: 'school-management-options',
  templateUrl: './school-management-options.component.html',
  styleUrls: ['./school-management-options.component.scss']
})
export class SchoolManagementOptionsComponent {

  constructor(
    private schoolManagementSelectionService: SchoolManagementSelectionService,
    private schoolManagementService: SchoolManagementService,
    private dialog: MatDialog,
    private router: Router) {

  }

  onAddButtonClick() {
    this.router.navigateByUrl('/admin/school-management/create-school');

  }

  onEditButtonClick() {

    
  }

  onShowButtonClick() {
    const selectedItem = this.schoolManagementSelectionService.getSelectedItem();
    if (selectedItem){
      this.router.navigateByUrl(`/admin/school-management/show-school?id=${selectedItem.schoolId}`);
    }
  }

  onRemoveButtonClick() {
    const selectedItem = this.schoolManagementSelectionService.getSelectedItem();
    if (selectedItem){
      this.dialog.open(DeleteSchoolComponent, { data: selectedItem });
    }
  }

}
