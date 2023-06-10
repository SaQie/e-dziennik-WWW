import { Component } from '@angular/core';
import { SchoolManagementSelectionService } from '../../school-management-selection.service';

@Component({
  selector: 'school-management-options',
  templateUrl: './school-management-options.component.html',
  styleUrls: ['./school-management-options.component.scss']
})
export class SchoolManagementOptionsComponent {

  constructor(private schoolManagementSelectionService:SchoolManagementSelectionService){

  }

  onAddButtonClick(){
    const identifiers = this.schoolManagementSelectionService.getItems();
    console.log(identifiers);
  }

  onEditButtonClick(){
    const identifiers = this.schoolManagementSelectionService.getItems();
    console.log(identifiers);
  }

  onShowButtonClick(){
    const identifiers = this.schoolManagementSelectionService.getItems();
    console.log(identifiers);
  }

  onRemoveButtonClick(){
    const identifiers = this.schoolManagementSelectionService.getItems();
    console.log(identifiers);
  }

}
