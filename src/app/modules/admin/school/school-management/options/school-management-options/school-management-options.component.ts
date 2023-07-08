import { Component } from '@angular/core';
import { SchoolManagementSelectionService } from '../../school-management-selection.service';
import { SchoolManagementService } from '../../school-management.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSchoolComponent } from './delete-school/delete-school/delete-school.component';

@Component({
  selector: 'school-management-options',
  templateUrl: './school-management-options.component.html',
  styleUrls: ['./school-management-options.component.scss']
})
export class SchoolManagementOptionsComponent {

  constructor(
    private schoolManagementSelectionService: SchoolManagementSelectionService,
    private schoolManagementService: SchoolManagementService,
    private dialog: MatDialog) {

  }

  onAddButtonClick() {


  }

  onEditButtonClick() {

    
  }

  onShowButtonClick() {
    
  }

  onRemoveButtonClick() {
    const selectedItem = this.schoolManagementSelectionService.getSelectedItem();
    if (selectedItem){
      this.dialog.open(DeleteSchoolComponent, { data: selectedItem });
    }
  }

}
