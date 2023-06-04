import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SchoolManagementService } from './school-management.service';
import { SchoolSummary } from './model/SchoolSummary';
import { Page } from 'src/app/common/Page';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent implements OnInit, AfterViewInit {


  isDataLoaded: boolean = false;
  tableContent!: MatTableDataSource<SchoolSummary>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['position', 'name', 'identifier'];
  
  length!: number;
  pageSizeOptions = [5,10,20];
  actualPageSize!: number;
  actualPage!: number;



  constructor(private schoolManagementSerice: SchoolManagementService, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterViewInit() {
   this.fetchTableData(0,5);
  }

  onPageChange(event:PageEvent){
    this.fetchTableData(event.pageIndex,event.pageSize);
  }

  ngOnInit(): void {

  }

  private fetchTableData(pageIndex:number, pageSize:number){
    this.isDataLoaded = false;
    this.schoolManagementSerice.getSchoolSummary(pageIndex,pageSize).subscribe({
      next: (response: Page<SchoolSummary[]>) => {
        console.log(response);
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
