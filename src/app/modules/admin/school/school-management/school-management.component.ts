import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SchoolManagementService } from './school-management.service';
import { SchoolSummary } from './model/SchoolSummary';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, startWith, switchMap, tap } from 'rxjs';
import { Page } from 'src/app/common/Page';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SchoolManagementSelectionService } from './school-management-selection.service';

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent implements OnInit, AfterViewInit {


  isDataLoaded: boolean = false;
  tableContent!: MatTableDataSource<SchoolSummary>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'position', 'name', 'identifier'];
  selection = new SelectionModel<SchoolSummary>(true, []);

  length!: number;
  pageSizeOptions = [25, 50, 100];
  actualPageSize!: number;
  actualPage!: number;



  constructor(private schoolManagementSerice: SchoolManagementService, private schoolManagementSelectionService: SchoolManagementSelectionService) {

  }

  ngAfterViewInit() {
    this.fetchTableData(0, 25);
  }

  onPageChange(event: PageEvent) {
    this.fetchTableData(event.pageIndex, event.pageSize);
  }

  ngOnInit(): void {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableContent.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableContent.data);
  }

  handleSelect(event: MatCheckboxChange, row: SchoolSummary) {
    if (event.checked) {
      this.selection.toggle(row);
      this.schoolManagementSelectionService.addItem(row);
    }else{
      this.selection.toggle(row);
      this.schoolManagementSelectionService.removeItem(row);
    }
  }

  handleSelectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.toggleAllRows();
      this.schoolManagementSelectionService.addItems(this.selection.selected)
    }else{
      this.toggleAllRows();
      this.schoolManagementSelectionService.clearItems();
    }
  }

  private fetchTableData(pageIndex: number, pageSize: number) {
    this.isDataLoaded = false;
    this.schoolManagementSerice.getSchoolSummary(pageIndex, pageSize).subscribe({
      next: (response: Page<SchoolSummary[]>) => {
        this.tableContent = new MatTableDataSource<SchoolSummary>(response.content);
        this.isDataLoaded = true;
        this.length = response.itemsTotalCount;
        this.actualPageSize = pageSize;
        this.actualPage = pageIndex;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
