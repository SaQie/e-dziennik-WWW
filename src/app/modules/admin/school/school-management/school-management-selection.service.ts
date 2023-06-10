import { Injectable } from '@angular/core';
import { SchoolSummary } from './model/SchoolSummary';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagementSelectionService {

  private selectedItems: SchoolSummary[] = [];


  constructor() {

  }

  addItem(item: SchoolSummary) {
    this.selectedItems.push(item);
  }

  addItems(identifiers: SchoolSummary[]) {
    this.selectedItems.push(...identifiers);
  }

  getItems(): SchoolSummary[] {
    return this.selectedItems;
  }

  clearItems(){
    this.selectedItems = [];
  }

  removeItem(item: SchoolSummary){
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }



}
