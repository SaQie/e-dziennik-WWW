import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolSummary } from '../../model/SchoolSummary';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SchoolManagementService } from '../../school-management.service';
import { SchoolManagementSelectionService } from '../../school-management-selection.service';
import { Page } from 'src/app/common/Page';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-school-management-table',
  templateUrl: './school-management-table.component.html',
  styleUrls: ['./school-management-table.component.scss']
})
export class SchoolManagementTableComponent implements OnInit, AfterViewInit{

  isDataLoaded: boolean = false;
  tableContent!: MatTableDataSource<SchoolSummary>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'position', 'name', 'identifier'];
  selection = new SelectionModel<SchoolSummary>(true, []);

  refreshTrigger: boolean = false;

  length!: number;
  pageSizeOptions = [25, 50, 100];
  actualPageSize!: number;
  actualPage!: number;

  constructor(
    private schoolManagementSerice: SchoolManagementService,
    private schoolManagementSelectionService: SchoolManagementSelectionService) {

  }

  ngAfterViewInit() {
    this.fetchTableData(0, 25);
    // Refresh view trigger
    this.schoolManagementSelectionService.getRefreshTrigger$().subscribe((refresh) => {
      if (refresh) {
        this.fetchTableData(this.actualPage, this.actualPageSize);
        this.refreshTrigger = false;
      } 
    })
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
      this.selection.clear();
      this.selection.toggle(row);
      this.schoolManagementSelectionService.selectItem(row);
    } else {
      this.selection.clear();
      this.selection.toggle(row);
      this.schoolManagementSelectionService.clearSelection();
    }
  }

  private fetchTableData(pageIndex: number, pageSize: number) {
    console.log("Laduje dane")
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
