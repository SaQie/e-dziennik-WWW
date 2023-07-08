import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'src/app/common/Page';
import { environment } from 'src/environments/environment';
import { SchoolSummary } from './model/SchoolSummary';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagementService {

  constructor(private httpClient: HttpClient) { }

  getSchoolSummary(pageIndex:number, pageSize:number){
    return this.httpClient.get<Page<SchoolSummary[]>>(`${environment.apiAddress}/schools?page=${pageIndex}&size=${pageSize}`);
  }

  deleteSchool(uuid:String){
    return this.httpClient.delete(`${environment.apiAddress}/schools/${uuid}`);
  }

}
