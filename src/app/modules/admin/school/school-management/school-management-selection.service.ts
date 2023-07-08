import { Injectable } from '@angular/core';
import { SchoolSummary } from './model/SchoolSummary';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagementSelectionService {

  private selectedItem!: SchoolSummary | null;

  private refreshTrigger$ = new Subject<boolean>;


  constructor() {

  }

  selectItem(item: SchoolSummary) {
    this.selectedItem = item;
  }

  getSelectedItem(): SchoolSummary | null {
    return this.selectedItem;
  }

  clearSelection(){
    this.selectedItem = null;
  }

  refreshView() {
    this.refreshTrigger$.next(true);
  }

  getRefreshTrigger$(): Observable<boolean> {
    return this.refreshTrigger$.asObservable();
  }


}
