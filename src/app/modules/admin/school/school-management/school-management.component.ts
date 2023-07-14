import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class SchoolManagementComponent{



}
